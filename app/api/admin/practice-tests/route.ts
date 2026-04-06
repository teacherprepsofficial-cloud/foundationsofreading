export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUserFromRequest } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import PracticeTest from '@/models/PracticeTest'
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

  await connectDB()
  const tests = await PracticeTest.find({ examCode: '190' })
    .select('name testNumber isDiagnostic questionIds')
    .sort({ isDiagnostic: -1, testNumber: 1 })
    .lean()

  return NextResponse.json({ tests })
}
