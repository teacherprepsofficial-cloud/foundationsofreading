export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import PracticeTest from '@/models/PracticeTest'
import Question from '@/models/Question'
import UserAccess from '@/models/UserAccess'
import UserTestAttempt from '@/models/UserTestAttempt'
import { getCurrentUserFromRequest } from '@/lib/auth'

// GET /api/practice-tests/diagnostic?examCode=190
// Returns the diagnostic test with questions, creates or resumes an attempt
export async function GET(request: NextRequest) {
  try {
    const auth = getCurrentUserFromRequest(request)
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const examCode = request.nextUrl.searchParams.get('examCode') as '190' | '890'
    if (!examCode) return NextResponse.json({ error: 'examCode required' }, { status: 400 })

    await connectDB()

    const access = await UserAccess.findOne({
      userId: auth.userId,
      examCode,
      isActive: true,
      expiresAt: { $gt: new Date() },
    })
    if (!access) return NextResponse.json({ error: 'Access required' }, { status: 403 })

    const test = await PracticeTest.findOne({ examCode, isDiagnostic: true, isPublished: true })
    if (!test) {
      return NextResponse.json({ error: 'Diagnostic test not available yet' }, { status: 404 })
    }

    // Check for existing in-progress attempt
    const inProgress = await UserTestAttempt.findOne({
      userId: auth.userId,
      testId: test._id,
      status: 'in_progress',
    })

    const questions = await Question.find({
      _id: { $in: test.questionIds },
    }).select('questionText options subarea subareaName objectiveNumber stimulus')

    if (inProgress) {
      return NextResponse.json({
        test: { _id: test._id, name: test.name, timeLimitMinutes: test.timeLimitMinutes, isDiagnostic: true },
        questions,
        attempt: { _id: inProgress._id, responses: inProgress.responses, startedAt: inProgress.startedAt, timeSpentSeconds: inProgress.timeSpentSeconds },
        resumed: true,
      })
    }

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
    })

    return NextResponse.json({
      test: { _id: test._id, name: test.name, timeLimitMinutes: test.timeLimitMinutes, isDiagnostic: true },
      questions,
      attempt: { _id: attempt._id, responses: [], startedAt: attempt.startedAt, timeSpentSeconds: 0 },
      resumed: false,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
