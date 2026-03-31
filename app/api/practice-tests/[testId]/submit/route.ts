import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import PracticeTest from '@/models/PracticeTest'
import Question from '@/models/Question'
import UserTestAttempt from '@/models/UserTestAttempt'
import UserProgress from '@/models/UserProgress'
import { getCurrentUserFromRequest } from '@/lib/auth'

// NES scaled score: raw % maps to 100-300 scale, passing is 220
function rawToScaled(percentage: number): number {
  // Linear approximation: 0% = 100, 100% = 300, passing = 220 at ~60%
  return Math.round(100 + (percentage / 100) * 200)
}

function getPerformanceLevel(percentage: number): 'most' | 'many' | 'some' | 'few' {
  if (percentage >= 80) return 'most'
  if (percentage >= 60) return 'many'
  if (percentage >= 40) return 'some'
  return 'few'
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const auth = getCurrentUserFromRequest(request)
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { testId } = await params
    const { attemptId, responses, timeSpentSeconds } = await request.json()

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

    const score = Math.round((totalCorrect / questions.length) * 100)
    const scaledScore = rawToScaled(score)
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
        performanceLevel: getPerformanceLevel(pct),
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
      },
      questionsWithAnswers,
      responses: gradedResponses,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
