/**
 * Read specific PT3 questions by their MongoDB IDs
 * Run: npx tsx scripts/read-pt3-by-id.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Question from '../models/Question'
import PracticeTest from '../models/PracticeTest'

const IDS = [
  '69cfeeabecad19198e7eb471', // Q44 - effortful
  '69cfeeabecad19198e7eb473', // Q46 - dup Option D
  '69cfeeabecad19198e7eb47b', // Q54 - dup Option D
  '69cfeeabecad19198e7eb48a', // Q69 - dup Option D
  '69cfeeabecad19198e7eb49d', // Q88 - stanine
]

async function main() {
  await connectDB()

  const pt3 = await PracticeTest.findOne({ examCode: '190', testNumber: 3, isDiagnostic: false })
  const posMap: Record<string, number> = {}
  pt3.questionIds.forEach((id: mongoose.Types.ObjectId, i: number) => {
    posMap[id.toString()] = i + 1
  })

  for (const id of IDS) {
    const q = await Question.findById(id).lean() as any
    if (!q) { console.log(`ID ${id}: NOT FOUND`); continue }
    const pos = posMap[id] || '?'
    console.log(`═══ Q${pos} (${id}) ═══`)
    console.log(`Subarea ${q.subarea} | Obj ${q.objectiveNumber} | Correct: ${q.correctAnswer}`)
    console.log(`\nSTEM: ${q.questionText}`)
    console.log('\nOPTIONS:')
    q.options.forEach((o: any) => {
      console.log(`  ${o.label}${o.label === q.correctAnswer ? '✓' : ' '}: ${o.text}`)
    })
    console.log(`\nEXPLANATION:\n${q.explanation}\n`)
  }

  await mongoose.disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
