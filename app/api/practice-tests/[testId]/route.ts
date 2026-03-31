import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import PracticeTest from '@/models/PracticeTest'
import Question from '@/models/Question'
import UserAccess from '@/models/UserAccess'
import UserTestAttempt from '@/models/UserTestAttempt'
import { getCurrentUserFromRequest } from '@/lib/auth'

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
      examCode: test.examCode,
      isActive: true,
      expiresAt: { $gt: new Date() },
    })
    if (!access) return NextResponse.json({ error: 'Access required' }, { status: 403 })

    // Check if bundle test (3 or 4) and user has starter
    if (test.testNumber > 2 && access.tier === 'starter') {
      return NextResponse.json({ error: 'Bundle access required' }, { status: 403 })
    }

    // Check for in-progress attempt
    const inProgress = await UserTestAttempt.findOne({
      userId: auth.userId,
      testId,
      status: 'in_progress',
    })

    // Fetch questions (shuffle on new attempt, preserve order on resume)
    const questions = await Question.find({
      _id: { $in: test.questionIds },
    }).select('questionText options subarea subareaName objectiveNumber difficulty')

    if (inProgress) {
      return NextResponse.json({
        test: { _id: test._id, name: test.name, timeLimitMinutes: test.timeLimitMinutes, isDiagnostic: test.isDiagnostic },
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

    // Create new attempt
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
    })

    return NextResponse.json({
      test: { _id: test._id, name: test.name, timeLimitMinutes: test.timeLimitMinutes, isDiagnostic: test.isDiagnostic },
      questions,
      attempt: { _id: attempt._id, responses: [], startedAt: attempt.startedAt, timeSpentSeconds: 0 },
      resumed: false,
    })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
