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

// GET /api/practice-tests/diagnostic?examCode=190
export async function GET(request: NextRequest) {
  try {
    const auth = getCurrentUserFromRequest(request)
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const examCode = request.nextUrl.searchParams.get('examCode') as '190' | '890'
    if (!examCode) return NextResponse.json({ error: 'examCode required' }, { status: 400 })

    await connectDB()

    const access = await UserAccess.findOne({
      userId: auth.userId,
      examCode: { $in: ['190', '890'] },
      isActive: true,
      expiresAt: { $gt: new Date() },
    })
    if (!access) return NextResponse.json({ error: 'Access required' }, { status: 403 })

    const test = await PracticeTest.findOne({ examCode, isDiagnostic: true, isPublished: true })
    if (!test) {
      return NextResponse.json({ error: 'Diagnostic test not available yet' }, { status: 404 })
    }

    // ?check=true — return status only, no attempt creation
    if (request.nextUrl.searchParams.get('check') === 'true') {
      const completed = await UserTestAttempt.findOne({
        userId: auth.userId,
        testId: test._id,
        status: 'completed',
      }).sort({ completedAt: -1 })

      if (completed) {
        // Use stored shuffled question data for results if available
        let questionsWithAnswers
        if (completed.questionData?.length) {
          const dbQuestions = await Question.find({ _id: { $in: test.questionIds } })
            .select('questionText stimulus subarea subareaName')
            .lean()
          const dbMap = Object.fromEntries(dbQuestions.map(q => [String(q._id), q]))
          questionsWithAnswers = completed.questionData.map((d: { questionId: unknown; options: RawOption[]; correctAnswer: string; explanation: string }) => ({
            ...dbMap[String(d.questionId)],
            _id: d.questionId,
            options: d.options,
            correctAnswer: d.correctAnswer,
            explanation: d.explanation,
          }))
        } else {
          questionsWithAnswers = await Question.find({ _id: { $in: test.questionIds } })
            .select('questionText options correctAnswer explanation subarea subareaName')
        }
        return NextResponse.json({
          status: 'completed',
          test: { _id: test._id, name: test.name },
          attempt: {
            _id: completed._id,
            scaledScore: completed.scaledScore,
            passed: completed.passed,
            score: completed.score,
            totalCorrect: completed.totalCorrect,
            totalIncorrect: completed.totalIncorrect,
            totalSkipped: completed.totalSkipped,
            totalQuestions: completed.totalQuestions,
            timeSpentSeconds: completed.timeSpentSeconds,
            subareaScores: completed.subareaScores,
            responses: completed.responses,
            submittedAt: completed.completedAt,
          },
          questionsWithAnswers,
        })
      }

      const inProgressCheck = await UserTestAttempt.findOne({
        userId: auth.userId,
        testId: test._id,
        status: 'in_progress',
      })
      return NextResponse.json({
        status: inProgressCheck ? 'in_progress' : 'not_started',
        test: { _id: test._id },
      })
    }

    // Check for existing in-progress attempt
    const inProgress = await UserTestAttempt.findOne({
      userId: auth.userId,
      testId: test._id,
      status: 'in_progress',
    })

    if (inProgress) {
      if (inProgress.questionData?.length) {
        const dbQuestions = await Question.find({ _id: { $in: test.questionIds } })
          .select('questionText stimulus subarea subareaName objectiveNumber')
          .lean()
        const dbMap = Object.fromEntries(dbQuestions.map(q => [String(q._id), q]))
        const questions = inProgress.questionData.map((d: { questionId: unknown; options: RawOption[] }) => ({
          ...dbMap[String(d.questionId)],
          _id: d.questionId,
          options: d.options,
        }))
        return NextResponse.json({
          test: { _id: test._id, name: test.name, timeLimitMinutes: test.timeLimitMinutes, isDiagnostic: true },
          questions,
          attempt: { _id: inProgress._id, responses: inProgress.responses, startedAt: inProgress.startedAt, timeSpentSeconds: inProgress.timeSpentSeconds },
          resumed: true,
        })
      }
      // Fallback for old attempts without questionData
      const questions = await Question.find({ _id: { $in: test.questionIds } })
        .select('questionText options subarea subareaName objectiveNumber stimulus')
      return NextResponse.json({
        test: { _id: test._id, name: test.name, timeLimitMinutes: test.timeLimitMinutes, isDiagnostic: true },
        questions,
        attempt: { _id: inProgress._id, responses: inProgress.responses, startedAt: inProgress.startedAt, timeSpentSeconds: inProgress.timeSpentSeconds },
        resumed: true,
      })
    }

    // New attempt: shuffle question order and options
    const questions = await Question.find({ _id: { $in: test.questionIds } })
      .select('questionText options correctAnswer explanation subarea subareaName objectiveNumber stimulus')
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
      testId: test._id,
      examCode,
      isDiagnostic: true,
      mode: 'timed',
      responses: [],
      totalQuestions: questions.length,
      timeLimitSeconds: test.timeLimitMinutes * 60,
      startedAt: new Date(),
      questionData,
    })

    const clientQuestions = shuffledQuestions.map((q, i) => ({
      _id: q._id,
      questionText: q.questionText,
      stimulus: q.stimulus,
      subarea: q.subarea,
      subareaName: q.subareaName,
      objectiveNumber: q.objectiveNumber,
      options: questionData[i].options,
    }))

    return NextResponse.json({
      test: { _id: test._id, name: test.name, timeLimitMinutes: test.timeLimitMinutes, isDiagnostic: true },
      questions: clientQuestions,
      attempt: { _id: attempt._id, responses: [], startedAt: attempt.startedAt, timeSpentSeconds: 0 },
      resumed: false,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
