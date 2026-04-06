export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserFromRequest } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import PracticeTest from '@/models/PracticeTest'
import Question from '@/models/Question'
import mongoose from 'mongoose'

async function requireAdmin(request: NextRequest) {
  const auth = getCurrentUserFromRequest(request)
  if (!auth) return null
  await connectDB()
  const user = await User.findById(new mongoose.Types.ObjectId(auth.userId)).select('isAdmin')
  return user?.isAdmin ? auth : null
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireAdmin(request)
  if (!auth) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

  const { id } = await params
  await connectDB()

  const test = await PracticeTest.findById(new mongoose.Types.ObjectId(id))
    .select('name testNumber isDiagnostic questionIds')
    .lean()

  if (!test) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  // Fetch questions in the order they appear in the test
  const questions = await Question.find({ _id: { $in: test.questionIds } })
    .select('questionText options correctAnswer explanation subarea objectiveNumber stimulus')
    .lean()

  // Preserve test order
  const idToQ = Object.fromEntries(questions.map(q => [String(q._id), q]))
  const ordered = test.questionIds.map(id => idToQ[String(id)]).filter(Boolean)

  return NextResponse.json({ test, questions: ordered })
}
