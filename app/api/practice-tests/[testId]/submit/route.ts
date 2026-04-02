import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

export const maxDuration = 60
import connectDB from '@/lib/mongodb'
import PracticeTest from '@/models/PracticeTest'
import Question from '@/models/Question'
import UserTestAttempt from '@/models/UserTestAttempt'
import UserProgress from '@/models/UserProgress'
import { getCurrentUserFromRequest } from '@/lib/auth'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

// NES scaled score: raw % maps to 100-300 scale, passing is 220
function rawToScaled(percentage: number): number {
  return Math.round(100 + (percentage / 100) * 200)
}

function crScoreToLevel(score: number): 'Thorough' | 'Adequate' | 'Limited' | 'Weak' | 'No Response' {
  if (score >= 4) return 'Thorough'
  if (score === 3) return 'Adequate'
  if (score === 2) return 'Limited'
  if (score === 1) return 'Weak'
  return 'No Response'
}

async function gradeCR(responseText: string): Promise<{ score: number; feedback: string }> {
  const wordCount = responseText.trim().split(/\s+/).filter(Boolean).length
  if (wordCount < 50) return { score: 0, feedback: `Response is only ${wordCount} words. A thorough response requires 150+ words addressing all parts of the prompt.` }

  const message = await anthropic.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 600,
    system: `You are a scorer for the NES Foundations of Reading exam (190/890) written assignment. Use the official 4-point rubric exactly:

4 – THOROUGH KNOWLEDGE: The purpose of the assignment is fully achieved. The response demonstrates a thorough understanding of the relevant subject matter and applies this knowledge to the assignment with substantial accuracy. The response provides strong, relevant supporting evidence and demonstrates well-reasoned understanding of the subject.

3 – ADEQUATE KNOWLEDGE: The purpose of the assignment is largely achieved. The response demonstrates an adequate understanding of the relevant subject matter and applies this knowledge to the assignment with general accuracy. The response provides relevant supporting evidence and demonstrates adequately reasoned understanding of the subject.

2 – LIMITED KNOWLEDGE: The purpose of the assignment is partially achieved. The response demonstrates a limited or potentially inaccurate understanding of the relevant subject matter and applies this knowledge to the assignment with limited accuracy. The response provides few relevant examples and demonstrates poorly reasoned understanding of the subject.

1 – WEAK KNOWLEDGE: The purpose of the assignment is not achieved. The response demonstrates little appropriate knowledge of the relevant subject matter and applies this knowledge to the assignment with poor accuracy. The response provides weak or absent supporting evidence and demonstrates minimal reasoning about the subject.

0 – UNSCOREABLE/BLANK: Response is blank, off-topic, illegible, or does not address the prompt.

Evaluate on four dimensions: (1) Purpose — assignment goals achieved, (2) Subject Matter Knowledge — accuracy and depth, (3) Support — quality of evidence and examples, (4) Rationale — soundness of reasoning.

Respond ONLY with valid JSON: {"score": 0|1|2|3|4, "feedback": "3-4 sentence analysis referencing the four dimensions — be specific about what was strong and what was missing"}`,
    messages: [{
      role: 'user',
      content: `WRITTEN ASSIGNMENT PROMPT: A first-grade teacher notices that several students struggle to blend phonemes when reading unfamiliar words. Describe two evidence-based instructional strategies the teacher could use to develop phonemic awareness and phonics skills in these students. For each strategy, explain how it would be implemented and why it is effective for early readers.

CANDIDATE RESPONSE (${wordCount} words):
${responseText}`
    }],
  })

  const text = message.content[0].type === 'text' ? message.content[0].text : ''
  try {
    const parsed = JSON.parse(text)
    return { score: Math.min(4, Math.max(0, parseInt(parsed.score))), feedback: parsed.feedback || '' }
  } catch {
    return { score: 2, feedback: 'Your response demonstrates some understanding of phonics and phonemic awareness instruction.' }
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const auth = getCurrentUserFromRequest(request)
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { testId } = await params
    const { attemptId, responses, timeSpentSeconds, crResponse } = await request.json()

    await connectDB()

    const [test, attempt] = await Promise.all([
      PracticeTest.findById(testId),
      UserTestAttempt.findById(attemptId),
    ])

    if (!test || !attempt) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    if (attempt.userId.toString() !== auth.userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    // Fetch all questions with correct answers
    const questions = await Question.find({ _id: { $in: test.questionIds } })
    const questionMap = new Map(questions.map((q) => [q._id.toString(), q]))

    // Grade responses
    let totalCorrect = 0
    let totalIncorrect = 0
    let totalSkipped = 0

    const gradedResponses = responses.map((r: { questionId: string; selectedAnswer: string | null; timeSpent: number; isMarked: boolean }) => {
      const q = questionMap.get(r.questionId)
      if (!q) return r
      const isCorrect = r.selectedAnswer === q.correctAnswer
      if (!r.selectedAnswer) totalSkipped++
      else if (isCorrect) totalCorrect++
      else totalIncorrect++
      return { ...r, isCorrect }
    })

    const mcPercentage = (totalCorrect / questions.length) * 100

    // Grade CR if present (diagnostic only) — never let grading failure block submission
    let crScore = 0
    let crPerformanceLevel: 'Thorough' | 'Adequate' | 'Limited' | 'Weak' | 'No Response' = 'No Response'
    let crFeedback = ''
    if (crResponse?.trim()) {
      try {
        const graded = await gradeCR(crResponse)
        crScore = graded.score
        crFeedback = graded.feedback
        crPerformanceLevel = crScoreToLevel(crScore)
      } catch (crErr) {
        const errMsg = crErr instanceof Error ? `${crErr.name}: ${crErr.message}` : String(crErr)
        console.error('CR grading failed:', errMsg)
        crScore = 2
        crFeedback = `[DEBUG] CR grading error: ${errMsg}`
        crPerformanceLevel = 'Limited'
      }
    }

    // Combined score: 80% MC + 20% CR (CR scored 0–4, normalized to 0–100)
    const hasCR = crResponse?.trim()
    const combinedPercentage = hasCR
      ? (mcPercentage * 0.80) + ((crScore / 4) * 100 * 0.20)
      : mcPercentage
    const score = Math.round(mcPercentage)
    const scaledScore = rawToScaled(combinedPercentage)
    const passed = scaledScore >= 220

    // Calculate subarea scores
    const subareaMap = new Map<string, { name: string; total: number; correct: number }>()
    for (const q of questions) {
      const key = q.subarea
      if (!subareaMap.has(key)) {
        subareaMap.set(key, { name: q.subareaName, total: 0, correct: 0 })
      }
      subareaMap.get(key)!.total++
    }
    for (const r of gradedResponses) {
      const q = questionMap.get(r.questionId)
      if (q && r.isCorrect) {
        subareaMap.get(q.subarea)!.correct++
      }
    }

    const subareaScores = Array.from(subareaMap.entries()).map(([subarea, data]) => {
      const pct = Math.round((data.correct / data.total) * 100)
      return {
        subarea: subarea as 'I' | 'II' | 'III',
        subareaName: data.name,
        totalQuestions: data.total,
        correctAnswers: data.correct,
        percentage: pct,
        performanceLevel: pct >= 80 ? 'most' : pct >= 60 ? 'many' : pct >= 40 ? 'some' : 'few' as 'most' | 'many' | 'some' | 'few',
      }
    })

    // Update attempt
    attempt.responses = gradedResponses
    attempt.score = score
    attempt.scaledScore = scaledScore
    attempt.totalCorrect = totalCorrect
    attempt.totalIncorrect = totalIncorrect
    attempt.totalSkipped = totalSkipped
    attempt.timeSpentSeconds = timeSpentSeconds
    attempt.subareaScores = subareaScores
    attempt.passed = passed
    if (crResponse?.trim()) {
      attempt.crResponse = crResponse
      attempt.crScore = crScore
      attempt.crPerformanceLevel = crPerformanceLevel
      attempt.crFeedback = crFeedback
    }
    attempt.completedAt = new Date()
    attempt.status = 'completed'
    await attempt.save()

    // Update user progress
    await UserProgress.findOneAndUpdate(
      { userId: auth.userId, examCode: test.examCode },
      attempt.isDiagnostic
        ? {
            diagnosticCompleted: true,
            diagnosticAttemptId: attempt._id,
            diagnosticCompletedAt: new Date(),
            $addToSet: { practiceTestsCompleted: attempt._id },
          }
        : { $addToSet: { practiceTestsCompleted: attempt._id } },
      { upsert: true }
    )

    // Return results with full explanations
    const questionsWithAnswers = questions.map((q) => ({
      _id: q._id,
      questionText: q.questionText,
      stimulus: q.stimulus,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      subarea: q.subarea,
      subareaName: q.subareaName,
    }))

    return NextResponse.json({
      success: true,
      results: {
        score,
        scaledScore,
        passed,
        totalCorrect,
        totalIncorrect,
        totalSkipped,
        totalQuestions: questions.length,
        subareaScores,
        timeSpentSeconds,
        attemptId: attempt._id,
        isDiagnostic: attempt.isDiagnostic,
        crScore: crResponse?.trim() ? crScore : undefined,
        crPerformanceLevel: crResponse?.trim() ? crPerformanceLevel : undefined,
        crFeedback: crResponse?.trim() ? crFeedback : undefined,
      },
      questionsWithAnswers,
      responses: gradedResponses,
    })
  } catch (err) {
    console.error('Submit route error:', err)
    const msg = err instanceof Error ? err.message : 'Server error'
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}
