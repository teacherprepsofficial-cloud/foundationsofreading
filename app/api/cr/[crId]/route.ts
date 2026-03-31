export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import ConstructedResponse from '@/models/ConstructedResponse'
import UserAccess from '@/models/UserAccess'
import UserCRAttempt from '@/models/UserCRAttempt'
import { getCurrentUserFromRequest } from '@/lib/auth'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ crId: string }> }
) {
  try {
    const auth = getCurrentUserFromRequest(request)
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { crId } = await params
    await connectDB()

    const cr = await ConstructedResponse.findById(crId)
    if (!cr) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const access = await UserAccess.findOne({
      userId: auth.userId,
      examCode: cr.examCode,
      isActive: true,
      expiresAt: { $gt: new Date() },
    })
    if (!access) return NextResponse.json({ error: 'Access required' }, { status: 403 })
    if (cr.bundleOnly && access.tier === 'starter') {
      return NextResponse.json({ error: 'Bundle access required' }, { status: 403 })
    }

    // Get previous attempts
    const attempts = await UserCRAttempt.find({ userId: auth.userId, crId })
      .sort({ submittedAt: -1 })
      .limit(5)

    return NextResponse.json({ cr, attempts })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
