/**
 * Read PT3 questions at positions 20, 35, 48, 60, 71 for review
 * Run: npx tsx scripts/review-pt3-issues.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Question from '../models/Question'
import PracticeTest from '../models/PracticeTest'

async function main() {
  await connectDB()

  const pt3 = await PracticeTest.findOne({ examCode: '190', testNumber: 3, isDiagnostic: false })
  if (!pt3) { console.error('PT3 not found'); process.exit(1) }

  console.log(`PT3: ${pt3.name} — ${pt3.questionIds.length} questions\n`)

  const positions = [20, 35, 48, 60, 71] // 1-indexed

  for (const pos of positions) {
    const qId = pt3.questionIds[pos - 1]
    const q = await Question.findById(qId).lean()
    if (!q) { console.log(`Q${pos}: NOT FOUND`); continue }

    console.log(`═══════════════════════════════════════════`)
    console.log(`Q${pos} (ID: ${q._id})`)
    console.log(`Subarea: ${q.subarea} | Obj: ${q.objectiveNumber} | Correct: ${q.correctAnswer}`)
    console.log(`\nSTEM:\n${q.questionText}`)
    console.log(`\nOPTIONS:`)
    q.options.forEach((o: { label: string; text: string }) => {
      const marker = o.label === q.correctAnswer ? ' ← CORRECT' : ''
      console.log(`  ${o.label}: ${o.text}${marker}`)
    })
    console.log(`\nEXPLANATION:\n${q.explanation}`)
    console.log()
  }

  await mongoose.disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
