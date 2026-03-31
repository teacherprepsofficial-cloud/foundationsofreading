import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import UserProgress from '@/models/UserProgress'
import UserAccess from '@/models/UserAccess'
import { getCurrentUserFromRequest } from '@/lib/auth'

// GET /api/progress?examCode=190
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

    const progress = await UserProgress.findOne({ userId: auth.userId, examCode })

    return NextResponse.json({
      progress: progress || null,
      access: { tier: access.tier, expiresAt: access.expiresAt },
    })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

// PATCH /api/progress — update a specific field
export async function PATCH(request: NextRequest) {
  try {
    const auth = getCurrentUserFromRequest(request)
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { examCode, updates } = await request.json()
    if (!examCode) return NextResponse.json({ error: 'examCode required' }, { status: 400 })

    await connectDB()

    const progress = await UserProgress.findOneAndUpdate(
      { userId: auth.userId, examCode },
      { $set: updates },
      { upsert: true, new: true }
    )

    return NextResponse.json({ success: true, progress })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
