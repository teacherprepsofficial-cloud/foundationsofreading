import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import PracticeTest from '../models/PracticeTest'

async function main() {
  await connectDB()
  const pt = await PracticeTest.findOne({ examCode: '190', testNumber: 3, isDiagnostic: false })
  pt.questionIds.forEach((id: any, i: number) => {
    console.log(`${i+1}\t${id.toString()}`)
  })
  await mongoose.disconnect()
}
main().catch(console.error)
