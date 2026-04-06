export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import PracticeTest from '@/models/PracticeTest'
import Question from '@/models/Question'
import UserAccess from '@/models/UserAccess'
import UserTestAttempt from '@/models/UserTestAttempt'
import { getCurrentUserFromRequest } from '@/lib/auth'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface RawOption { label: string; text: string }

function shuffleOptions(options: RawOption[], correctAnswer: string, explanation: string) {
  const shuffled = shuffle(options)
  const labels = ['A', 'B', 'C', 'D']
  const oldToNew: Record<string, string> = {}
  const relabeled = shuffled.map((opt, i) => {
    oldToNew[opt.label] = labels[i]
    return { label: labels[i], text: opt.text }
  })
  const newCorrect = oldToNew[correctAnswer]
  const newExplanation = explanation
    .replace(/Correct Response:\s*([A-D])/g, (_, l) => 'Correct Response: ' + (oldToNew[l] || l))
    .replace(/Option ([A-D])\b/g, (_, l) => 'Option ' + (oldToNew[l] || l))
  return { options: relabeled, correctAnswer: newCorrect, explanation: newExplanation }
}

// GET /api/practice-tests/[testId] — start or resume a test
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ testId: string }> }
) {
  try {
    const auth = getCurrentUserFromRequest(request)
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { testId } = await params
    await connectDB()

    const test = await PracticeTest.findById(testId)
    if (!test) return NextResponse.json({ error: 'Test not found' }, { status: 404 })

    // Check access
    const access = await UserAccess.findOne({
      userId: auth.userId,
      examCode: { $in: ['190', '890'] },
      isActive: true,
      expiresAt: { $gt: new Date() },
    })
    if (!access) return NextResponse.json({ error: 'Access required' }, { status: 403 })

    if (test.testNumber > 2 && access.tier === 'starter') {
      return NextResponse.json({ error: 'Bundle access required' }, { status: 403 })
    }

    // Check for in-progress attempt
    const inProgress = await UserTestAttempt.findOne({
      userId: auth.userId,
      testId,
      status: 'in_progress',
    })

    if (inProgress) {
      // Resume: restore the exact shuffled order the student originally saw
      if (inProgress.questionData?.length) {
        const dbQuestions = await Question.find({ _id: { $in: test.questionIds } })
          .select('questionText stimulus subarea subareaName objectiveNumber difficulty')
          .lean()
        const dbMap = Object.fromEntries(dbQuestions.map(q => [String(q._id), q]))
        // Preserve the original shuffled question order from questionData
        const questions = inProgress.questionData.map((d: { questionId: unknown; options: RawOption[] }) => ({
          ...dbMap[String(d.questionId)],
          _id: d.questionId,
          options: d.options,
        }))
        return NextResponse.json({
          test: { _id: test._id, name: test.name, timeLimitMinutes: test.timeLimitMinutes, isDiagnostic: test.isDiagnostic, crPrompts: test.crPrompts ?? [] },
          questions,
          attempt: {
            _id: inProgress._id,
            responses: inProgress.responses,
            startedAt: inProgress.startedAt,
            timeSpentSeconds: inProgress.timeSpentSeconds,
          },
          resumed: true,
        })
      }
      // Fallback for old attempts without questionData
      const questions = await Question.find({ _id: { $in: test.questionIds } })
        .select('questionText options subarea subareaName objectiveNumber difficulty stimulus')
      return NextResponse.json({
        test: { _id: test._id, name: test.name, timeLimitMinutes: test.timeLimitMinutes, isDiagnostic: test.isDiagnostic, crPrompts: test.crPrompts ?? [] },
        questions,
        attempt: {
          _id: inProgress._id,
          responses: inProgress.responses,
          startedAt: inProgress.startedAt,
          timeSpentSeconds: inProgress.timeSpentSeconds,
        },
        resumed: true,
      })
    }

    // New attempt: fetch questions, shuffle order, shuffle options within each question
    const questions = await Question.find({ _id: { $in: test.questionIds } })
      .select('questionText options correctAnswer explanation subarea subareaName objectiveNumber difficulty stimulus')
      .lean()

    const shuffledQuestions = shuffle(questions)
    const questionData = shuffledQuestions.map(q => {
      const { options, correctAnswer, explanation } = shuffleOptions(
        q.options as RawOption[],
        q.correctAnswer as string,
        q.explanation as string
      )
      return { questionId: q._id, options, correctAnswer, explanation }
    })

    const attempt = await UserTestAttempt.create({
      userId: auth.userId,
      testId,
      examCode: test.examCode,
      isDiagnostic: test.isDiagnostic,
      mode: 'timed',
      responses: [],
      totalQuestions: questions.length,
      timeLimitSeconds: test.timeLimitMinutes * 60,
      startedAt: new Date(),
      questionData,
    })

    // Return to client: shuffled options, no correctAnswer/explanation during test
    const clientQuestions = shuffledQuestions.map((q, i) => ({
      _id: q._id,
      questionText: q.questionText,
      stimulus: q.stimulus,
      subarea: q.subarea,
      subareaName: q.subareaName,
      objectiveNumber: q.objectiveNumber,
      difficulty: q.difficulty,
      options: questionData[i].options,
    }))

    return NextResponse.json({
      test: { _id: test._id, name: test.name, timeLimitMinutes: test.timeLimitMinutes, isDiagnostic: test.isDiagnostic, crPrompts: test.crPrompts ?? [] },
      questions: clientQuestions,
      attempt: { _id: attempt._id, responses: [], startedAt: attempt.startedAt, timeSpentSeconds: 0 },
      resumed: false,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
