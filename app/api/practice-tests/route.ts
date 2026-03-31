export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import PracticeTest from '@/models/PracticeTest'
import UserAccess from '@/models/UserAccess'
import { getCurrentUserFromRequest } from '@/lib/auth'

// GET /api/practice-tests?examCode=190
export async function GET(request: NextRequest) {
  try {
    const auth = getCurrentUserFromRequest(request)
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const examCode = request.nextUrl.searchParams.get('examCode') as '190' | '890'
    if (!examCode) return NextResponse.json({ error: 'examCode required' }, { status: 400 })

    await connectDB()

    // Check access
    const access = await UserAccess.findOne({
      userId: auth.userId,
      examCode,
      isActive: true,
      expiresAt: { $gt: new Date() },
    })
    if (!access) return NextResponse.json({ error: 'Access required' }, { status: 403 })

    // Starter gets tests 1-2, bundle gets 1-4
    const maxTest = access.tier === 'bundle' ? 4 : 2
    const tests = await PracticeTest.find({
      examCode,
      isDiagnostic: false,
      testNumber: { $lte: maxTest },
      isPublished: true,
    }).select('testNumber name timeLimitMinutes subareaDistribution').sort({ testNumber: 1 })

    return NextResponse.json({ tests })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
