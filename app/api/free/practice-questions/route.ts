export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import Question from '@/models/Question'
import mongoose from 'mongoose'

// 25 hand-picked published questions (10 Sub I, 8 Sub II, 7 Sub III)
const QUESTION_IDS = [
  '69cfec4928a8f4d88398c5e9','69cfec4928a8f4d88398c5ea','69cfec4928a8f4d88398c5eb',
  '69cfec4928a8f4d88398c5ec','69cfec4928a8f4d88398c5ed','69cfec4928a8f4d88398c5ee',
  '69cfec4928a8f4d88398c5ef','69cfec4928a8f4d88398c5f0','69cfec4928a8f4d88398c5f1',
  '69cfec4928a8f4d88398c5f2','69ce9163cc7b8da5c542858f','69ce9163cc7b8da5c5428599',
  '69ce9163cc7b8da5c5428580','69ce9163cc7b8da5c54285a3','69ce9163cc7b8da5c5428585',
  '69ce9163cc7b8da5c542858a','69cfec4928a8f4d88398c615','69cfec4928a8f4d88398c616',
  '69ce9163cc7b8da5c54285bc','69ce9163cc7b8da5c54285b7','69ce9163cc7b8da5c54285c1',
  '69ce9163cc7b8da5c54285a8','69ce9163cc7b8da5c54285ad','69cfec4928a8f4d88398c636',
  '69cfec4928a8f4d88398c637',
]

export async function GET() {
  try {
    await connectDB()
    const ids = QUESTION_IDS.map(id => new mongoose.Types.ObjectId(id))
    const questions = await Question.find({ _id: { $in: ids } })
      .select('questionText options correctAnswer explanation subarea subareaName')
      .lean()

    return NextResponse.json({ questions })
  } catch (err) {
    console.error('Free practice questions error:', err)
    return NextResponse.json({ error: 'Failed to load questions' }, { status: 500 })
  }
}
