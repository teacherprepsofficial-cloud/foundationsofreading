import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import UserAccess from '@/models/UserAccess'
import { getCurrentUser } from '@/lib/auth'

export async function GET() {
  try {
    const auth = await getCurrentUser()
    if (!auth) return NextResponse.json({ user: null })

    await connectDB()
    const user = await User.findById(auth.userId)
    if (!user) return NextResponse.json({ user: null })

    // Get all active access records
    const now = new Date()
    const accesses = await UserAccess.find({
      userId: user._id,
      isActive: true,
      expiresAt: { $gt: now },
    })

    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
      accesses: accesses.map((a) => ({
        examCode: a.examCode,
        tier: a.tier,
        expiresAt: a.expiresAt,
      })),
    })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
