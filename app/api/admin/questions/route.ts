export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserFromRequest } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import Question from '@/models/Question'
import mongoose from 'mongoose'

async function requireAdmin(request: NextRequest) {
  const auth = getCurrentUserFromRequest(request)
  if (!auth) return null
  await connectDB()
  const user = await User.findById(new mongoose.Types.ObjectId(auth.userId)).select('isAdmin')
  return user?.isAdmin ? auth : null
}

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request)
  if (!auth) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') || ''
  const subarea = searchParams.get('subarea') || ''
  const page = parseInt(searchParams.get('page') || '1')
  const limit = 20

  const filter: Record<string, unknown> = { examCode: '190' }
  if (subarea) filter.subarea = subarea
  if (q) filter.questionText = { $regex: q, $options: 'i' }

  await connectDB()
  const [questions, total] = await Promise.all([
    Question.find(filter)
      .select('questionText options correctAnswer explanation subarea objectiveNumber isPublished isDiagnostic')
      .sort({ subarea: 1, objectiveNumber: 1, createdAt: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean(),
    Question.countDocuments(filter),
  ])

  return NextResponse.json({ questions, total, page, pages: Math.ceil(total / limit) })
}
