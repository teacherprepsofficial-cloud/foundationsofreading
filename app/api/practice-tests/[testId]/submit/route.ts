import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import PracticeTest from '@/models/PracticeTest'
import type { ICRPrompt } from '@/models/PracticeTest'
import Question from '@/models/Question'
import UserTestAttempt from '@/models/UserTestAttempt'
import UserProgress from '@/models/UserProgress'
import { getCurrentUserFromRequest } from '@/lib/auth'

export const maxDuration = 60

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

// Build a text summary of exhibit data to include in grading context
function buildExhibitContext(cr: ICRPrompt | undefined): string {
  if (!cr) return ''
  const lines: string[] = []
  lines.push(`Objective: ${cr.objective}`)
  lines.push(`Assignment: ${cr.assignmentIntro}`)
  lines.push(`Parts the candidate must address: ${(cr.assignmentParts || []).join(' | ')}`)
  for (const exhibit of (cr.exhibits || [])) {
    lines.push(`\n--- ${exhibit.title} ---`)
    if (exhibit.exhibitType === 'teacher_record') {
      lines.push(exhibit.context)
      const errors: string[] = []
      for (const line of (exhibit.lines || [])) {
        for (const word of line) {
          if (word.mark === 'sub') errors.push(`"${word.text}" → student read "${word.student}" (substitution, no correction)`)
          if (word.mark === 'sc') errors.push(`"${word.text}" → student attempted "${word.student}" then self-corrected`)
          if (word.mark === 'omit') errors.push(`"${word.text}" — omitted`)
          if (word.mark === 'insert') errors.push(`"${word.text}" — student inserted "${word.student}"`)
          if (word.mark === 'rep') errors.push(`"${word.text}" — repetition (went back and re-read)`)
          if (word.mark === 'lp') errors.push(`"${word.text}" — long pause before reading`)
        }
      }
      if (errors.length) lines.push(`Reading errors: ${errors.join('; ')}`)
    } else if (exhibit.exhibitType === 'fluency_rubric') {
      lines.push(exhibit.context)
      lines.push(`Scores — ${exhibit.rows.filter(r => r.score).map(r => `${r.label}: ${r.score}`).join(', ')}`)
      lines.push(`Benchmark: ${exhibit.benchmark}`)
    } else if (exhibit.exhibitType === 'anecdotal') {
      lines.push(exhibit.context)
      for (const note of (exhibit.notes || [])) lines.push(`- ${note.label}: ${note.text}`)
    } else if (exhibit.exhibitType === 'word_list') {
      lines.push(exhibit.context)
      for (const group of (exhibit.groups || [])) {
        const correct = group.rows.filter(r => r.correct).length
        lines.push(`${group.groupLabel}: ${correct}/${group.rows.length} correct`)
        const errs = group.rows.filter(r => !r.correct).map(r => `"${r.word}" -> "${r.response}"`)
        if (errs.length) lines.push(`  Errors: ${errs.join(', ')}`)
      }
    } else if (exhibit.exhibitType === 'passage') {
      lines.push(`Title: "${exhibit.passageTitle}"`)
      lines.push(exhibit.text)
    } else if (exhibit.exhibitType === 'written_response') {
      lines.push(exhibit.context)
      for (const item of (exhibit.items || [])) {
        lines.push(`Q: ${item.question}`)
        lines.push(`Student response: ${item.response}`)
      }
    }
  }
  return lines.join('\n')
}

async function gradeCR(responseText: string, assignmentContext: string): Promise<{ score: number; feedback: string }> {
  const wordCount = responseText.trim().split(/\s+/).filter(Boolean).length
  if (wordCount < 50) return { score: 0, feedback: `Response is only ${wordCount} words. A thorough response requires 150+ words addressing all parts of the prompt.` }

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 600,
      system: `You are a scorer for the NES Foundations of Reading exam (190/890) written assignment. Use the official 4-point rubric exactly:

4 – THOROUGH KNOWLEDGE: The purpose of the assignment is fully achieved. The response demonstrates a thorough understanding of the relevant subject matter and applies this knowledge to the assignment with substantial accuracy. The response provides strong, relevant supporting evidence and demonstrates well-reasoned understanding of the subject.

3 – ADEQUATE KNOWLEDGE: The purpose of the assignment is largely achieved. The response demonstrates an adequate understanding of the relevant subject matter and applies this knowledge to the assignment with general accuracy. The response provides relevant supporting evidence and demonstrates adequately reasoned understanding of the subject.

2 – LIMITED KNOWLEDGE: The purpose of the assignment is partially achieved. The response demonstrates a limited or potentially inaccurate understanding of the relevant subject matter and applies this knowledge to the assignment with limited accuracy. The response provides few relevant examples and demonstrates poorly reasoned understanding of the subject.

1 – WEAK KNOWLEDGE: The purpose of the assignment is not achieved. The response demonstrates little appropriate knowledge of the relevant subject matter and applies this knowledge to the assignment with poor accuracy. The response provides weak or absent supporting evidence and demonstrates minimal reasoning about the subject.

0 – UNSCOREABLE/BLANK: Response is blank, off-topic, illegible, or does not address the prompt.

Evaluate on four dimensions: (1) Purpose — assignment goals achieved, (2) Subject Matter Knowledge — accuracy and depth, (3) Support — quality and specificity of evidence cited from the exhibits, (4) Rationale — soundness of reasoning.

Respond ONLY with valid JSON: {"score": 0|1|2|3|4, "feedback": "3-4 sentence analysis referencing the four dimensions — be specific about what was strong and what was missing, and whether the candidate cited the exhibit data"}`,
      messages: [{
        role: 'user',
        content: `ASSIGNMENT CONTEXT AND STUDENT EXHIBIT DATA:\n${assignmentContext}\n\nCANDIDATE RESPONSE (${wordCount} words):\n${responseText}`,
      }],
    }),
  })

  if (!res.ok) {
    const errBody = await res.text()
    throw new Error(`Anthropic API ${res.status}: ${errBody}`)
  }

  const data = await res.json()
  const raw = data.content?.[0]?.text ?? ''
  // Strip markdown code fences if Claude wrapped the JSON
  const text = raw.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '').trim()
  try {
    const parsed = JSON.parse(text)
    return { score: Math.min(4, Math.max(0, parseInt(parsed.score))), feedback: parsed.feedback || '' }
  } catch {
    // Last resort: extract score with regex
    const scoreMatch = text.match(/"score"\s*:\s*([0-4])/)
    const feedbackMatch = text.match(/"feedback"\s*:\s*"([^"]+)"/)
    if (scoreMatch) {
      return { score: parseInt(scoreMatch[1]), feedback: feedbackMatch?.[1] ?? '' }
    }
    return { score: 2, feedback: `Parse error — raw: ${text.slice(0, 200)}` }
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
    const { attemptId, responses, timeSpentSeconds, crResponse, cr1Response, cr2Response } = await request.json()

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

    // Build shuffled correct answer map from stored questionData (if available)
    // This ensures scoring uses the same option order the student saw
    const shuffledCorrectMap = new Map<string, string>()
    const shuffledExplanationMap = new Map<string, string>()
    const shuffledOptionsMap = new Map<string, Array<{ label: string; text: string }>>()
    if (attempt.questionData?.length) {
      for (const d of attempt.questionData) {
        const id = d.questionId.toString()
        shuffledCorrectMap.set(id, d.correctAnswer)
        shuffledExplanationMap.set(id, d.explanation)
        shuffledOptionsMap.set(id, d.options)
      }
    }

    // Grade responses
    let totalCorrect = 0
    let totalIncorrect = 0
    let totalSkipped = 0

    const gradedResponses = responses.map((r: { questionId: string; selectedAnswer: string | null; timeSpent: number; isMarked: boolean }) => {
      const q = questionMap.get(r.questionId)
      if (!q) return r
      // Use shuffled correct answer if available, fall back to DB value
      const correctAnswer = shuffledCorrectMap.get(r.questionId) ?? q.correctAnswer
      const isCorrect = r.selectedAnswer === correctAnswer
      if (!r.selectedAnswer) totalSkipped++
      else if (isCorrect) totalCorrect++
      else totalIncorrect++
      return { ...r, isCorrect }
    })

    const mcPercentage = (totalCorrect / questions.length) * 100

    // Grade CR(s) — never let grading failure block submission
    // Supports: single crResponse (diagnostic), or cr1Response + cr2Response (practice tests)
    let crScore = 0
    let crPerformanceLevel: 'Thorough' | 'Adequate' | 'Limited' | 'Weak' | 'No Response' = 'No Response'
    let crFeedback = ''
    let cr1Score = 0, cr2Score = 0
    let cr1PerformanceLevel: 'Thorough' | 'Adequate' | 'Limited' | 'Weak' | 'No Response' = 'No Response'
    let cr2PerformanceLevel: 'Thorough' | 'Adequate' | 'Limited' | 'Weak' | 'No Response' = 'No Response'
    let cr1Feedback = '', cr2Feedback = ''

    // Build exhibit contexts from the test's crPrompts
    const cr1Prompt = (test.crPrompts || []).find(p => p.promptNumber === 1)
    const cr2Prompt = (test.crPrompts || []).find(p => p.promptNumber === 2)
    const cr1Context = buildExhibitContext(cr1Prompt)
    const cr2Context = buildExhibitContext(cr2Prompt)

    // Practice test: 2 CR responses (each 10% weight)
    const hasTwoCRs = cr1Response?.trim() || cr2Response?.trim()
    if (hasTwoCRs) {
      const [g1, g2] = await Promise.all([
        cr1Response?.trim() ? gradeCR(cr1Response, cr1Context).catch(() => ({ score: 2, feedback: '' })) : Promise.resolve({ score: 0, feedback: '' }),
        cr2Response?.trim() ? gradeCR(cr2Response, cr2Context).catch(() => ({ score: 2, feedback: '' })) : Promise.resolve({ score: 0, feedback: '' }),
      ])
      cr1Score = g1.score; cr1Feedback = g1.feedback; cr1PerformanceLevel = crScoreToLevel(cr1Score)
      cr2Score = g2.score; cr2Feedback = g2.feedback; cr2PerformanceLevel = crScoreToLevel(cr2Score)
      // Average of both CR scores for summary
      crScore = Math.round((cr1Score + cr2Score) / 2)
      crPerformanceLevel = crScoreToLevel(crScore)
      crFeedback = [cr1Feedback, cr2Feedback].filter(Boolean).join(' | ')
    } else if (crResponse?.trim()) {
      // Diagnostic: single CR
      try {
        const graded = await gradeCR(crResponse, '')
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

    // Combined score: 80% MC + 10% CR1 + 10% CR2 (practice) or 80% MC + 20% CR (diagnostic)
    const hasCR = crResponse?.trim()
    const combinedPercentage = hasTwoCRs
      ? (mcPercentage * 0.80) + ((cr1Score / 4) * 100 * 0.10) + ((cr2Score / 4) * 100 * 0.10)
      : hasCR
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
    if (hasTwoCRs) {
      if (cr1Response?.trim()) {
        attempt.cr1Response = cr1Response
        attempt.cr1Score = cr1Score
        attempt.cr1PerformanceLevel = cr1PerformanceLevel
        attempt.cr1Feedback = cr1Feedback
      }
      if (cr2Response?.trim()) {
        attempt.cr2Response = cr2Response
        attempt.cr2Score = cr2Score
        attempt.cr2PerformanceLevel = cr2PerformanceLevel
        attempt.cr2Feedback = cr2Feedback
      }
    } else if (crResponse?.trim()) {
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

    // Return results in the shuffled order the student saw (using questionData order if available)
    const orderedIds: string[] = attempt.questionData?.length
      ? attempt.questionData.map((d: { questionId: { toString(): string } }) => d.questionId.toString())
      : questions.map((q) => q._id.toString())

    const questionsWithAnswers = orderedIds.map((id) => {
      const q = questionMap.get(id)
      if (!q) return null
      return {
        _id: q._id,
        questionText: q.questionText,
        stimulus: q.stimulus,
        options: shuffledOptionsMap.get(id) ?? q.options,
        correctAnswer: shuffledCorrectMap.get(id) ?? q.correctAnswer,
        explanation: shuffledExplanationMap.get(id) ?? q.explanation,
        subarea: q.subarea,
        subareaName: q.subareaName,
      }
    }).filter(Boolean)

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
        crScore: crResponse?.trim() ? crScore : hasTwoCRs ? crScore : undefined,
        crPerformanceLevel: crResponse?.trim() ? crPerformanceLevel : hasTwoCRs ? crPerformanceLevel : undefined,
        crFeedback: crResponse?.trim() ? crFeedback : hasTwoCRs ? crFeedback : undefined,
        cr1Score: hasTwoCRs ? cr1Score : undefined,
        cr1PerformanceLevel: hasTwoCRs ? cr1PerformanceLevel : undefined,
        cr1Feedback: hasTwoCRs ? cr1Feedback : undefined,
        cr2Score: hasTwoCRs ? cr2Score : undefined,
        cr2PerformanceLevel: hasTwoCRs ? cr2PerformanceLevel : undefined,
        cr2Feedback: hasTwoCRs ? cr2Feedback : undefined,
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
