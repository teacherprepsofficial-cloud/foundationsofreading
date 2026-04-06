import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Question from '../models/Question'
import PracticeTest from '../models/PracticeTest'

async function main() {
  await connectDB()
  const pt = await PracticeTest.findOne({ examCode: '190', testNumber: 3, isDiagnostic: false })
  const questions = await Question.find({ _id: { $in: pt.questionIds } }).lean() as any[]
  const posMap: Record<string, number> = {}
  pt.questionIds.forEach((id: any, i: number) => { posMap[id.toString()] = i + 1 })

  for (const q of questions) {
    const pos = posMap[q._id.toString()]
    console.log(`\nQ${pos} | S${q.subarea} O${q.objectiveNumber} | Correct:${q.correctAnswer}`)
    console.log(`STEM: ${q.questionText}`)
    q.options.forEach((o: any) => console.log(`  ${o.label}${o.label===q.correctAnswer?'✓':' '}: ${o.text}`))
    console.log(`EXPL: ${q.explanation.substring(0, 120)}...`)
  }
  await mongoose.disconnect()
}
main().catch(console.error)
