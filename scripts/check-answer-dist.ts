import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const PT = mongoose.models.PracticeTest || mongoose.model('PracticeTest', new mongoose.Schema({
  examCode: String, isDiagnostic: Boolean, questionIds: [mongoose.Schema.Types.ObjectId]
}))
const Q = mongoose.models.Question || mongoose.model('Question', new mongoose.Schema({
  correctAnswer: String
}))

async function run() {
  await mongoose.connect(process.env.MONGODB_URI!)
  const test = await (PT as any).findOne({ examCode: '190', isDiagnostic: true })
  const questions = await (Q as any).find({ _id: { $in: test.questionIds } })
  const dist: Record<string, number> = { A: 0, B: 0, C: 0, D: 0 }
  for (const q of questions) dist[q.correctAnswer]++
  console.log('Total questions:', questions.length)
  console.log(`A: ${dist.A} | B: ${dist.B} | C: ${dist.C} | D: ${dist.D}`)
  await mongoose.disconnect()
}
run().catch(console.error)
