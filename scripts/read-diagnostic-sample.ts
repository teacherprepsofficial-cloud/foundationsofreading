import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Question from '../models/Question'
import PracticeTest from '../models/PracticeTest'

async function main() {
  await connectDB()
  const pt = await PracticeTest.findOne({ examCode: '190', isDiagnostic: true })
  if (!pt) { console.log('not found'); process.exit(1) }
  console.log(`${pt.name} — ${pt.questionIds.length} questions\n`)

  for (let i = 0; i < 4; i++) {
    const q = await Question.findById(pt.questionIds[i]).lean() as any
    console.log(`Q${i+1} (${q._id}) correct=${q.correctAnswer}`)
    console.log(`STEM: ${q.questionText.substring(0,100)}`)
    console.log(`OPTIONS:`)
    q.options.forEach((o: any) => console.log(`  ${o.label}${o.label===q.correctAnswer?'✓':' '}: ${o.text}`))
    console.log(`EXPLANATION:\n${q.explanation}\n`)
  }

  await mongoose.disconnect()
}
main().catch(console.error)
