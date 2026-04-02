import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const Q = mongoose.models.Question || mongoose.model('Question', new mongoose.Schema({
  examCode: String, questionText: String,
  options: [{ label: String, text: String }],
  correctAnswer: String, isDiagnostic: Boolean, objectiveNumber: Number,
}))

async function run() {
  await mongoose.connect(process.env.MONGODB_URI!)
  const qs = await (Q as any).find({ examCode: '190', isDiagnostic: true }).sort({ createdAt: 1 })
  for (let i = 0; i < qs.length; i++) {
    const q = qs[i]
    console.log(`\n--- Q${i+1} (correct=${q.correctAnswer}) ---`)
    for (const o of q.options) {
      const marker = o.label === q.correctAnswer ? ' ✓' : '  '
      console.log(`  ${o.label}${marker}: ${o.text}`)
    }
  }
  await mongoose.disconnect()
}
run().catch(console.error)
