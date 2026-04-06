/**
 * Read flagged questions from PT2 and PT4
 * Run: npx tsx scripts/read-issues-by-test.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Question from '../models/Question'
import PracticeTest from '../models/PracticeTest'

const ISSUES = [
  { testNumber: 2, positions: [23] },
  { testNumber: 4, positions: [52, 81, 84, 94, 97] },
]

async function main() {
  await connectDB()

  for (const { testNumber, positions } of ISSUES) {
    const pt = await PracticeTest.findOne({ examCode: '190', testNumber, isDiagnostic: false })
    if (!pt) { console.log(`PT${testNumber} not found`); continue }

    for (const pos of positions) {
      const qId = pt.questionIds[pos - 1]
      const q = await Question.findById(qId).lean() as any
      if (!q) { console.log(`PT${testNumber} Q${pos}: not found`); continue }

      console.log(`\n═══ PT${testNumber} Q${pos} (${q._id}) ═══`)
      console.log(`Subarea ${q.subarea} | Obj ${q.objectiveNumber} | Correct: ${q.correctAnswer}`)
      console.log(`\nSTEM: ${q.questionText}`)
      console.log('\nOPTIONS:')
      q.options.forEach((o: any) => {
        console.log(`  ${o.label}${o.label === q.correctAnswer ? '✓' : ' '}: ${o.text}`)
      })
      console.log(`\nEXPLANATION:\n${q.explanation}`)
    }
  }

  await mongoose.disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
