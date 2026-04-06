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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request)
  if (!auth) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  const body = await request.json()

  const allowed: Record<string, unknown> = {}
  if (body.options !== undefined) allowed.options = body.options
  if (body.explanation !== undefined) allowed.explanation = body.explanation
  if (body.questionText !== undefined) allowed.questionText = body.questionText
  if (body.correctAnswer !== undefined) allowed.correctAnswer = body.correctAnswer

  await connectDB()
  const question = await Question.findByIdAndUpdate(
    new mongoose.Types.ObjectId(id),
    { $set: allowed },
    { new: true, runValidators: true }
  ).select('questionText options correctAnswer explanation subarea objectiveNumber isPublished isDiagnostic')

  if (!question) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ question })
}
