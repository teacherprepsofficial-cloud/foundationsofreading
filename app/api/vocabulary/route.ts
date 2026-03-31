import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Vocabulary from '@/models/Vocabulary'
import UserAccess from '@/models/UserAccess'
import { getCurrentUserFromRequest } from '@/lib/auth'

// GET /api/vocabulary?examCode=190
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

    const vocab = await Vocabulary.find({ examCode, isPublished: true })
      .select('term definition subarea subareaName objectiveNumber example')
      .sort({ subarea: 1, objectiveNumber: 1 })

    return NextResponse.json({ vocab })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
