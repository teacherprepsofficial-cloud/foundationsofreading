import mongoose, { Schema, Document, Model } from 'mongoose'
import type { ExamCode } from './UserAccess'

export interface ICRPrompt {
  promptNumber: 1 | 2
  crType: 'foundational_reading_skills' | 'reading_comprehension'
  scenarioContext: string
  prompt: string
}

export interface IPracticeTest extends Document {
  _id: mongoose.Types.ObjectId
  examCode: ExamCode
  testNumber: number // 1, 2, 3, 4 — bundle gets 3 & 4
  name: string
  isDiagnostic: boolean
  questionIds: mongoose.Types.ObjectId[]
  timeLimitMinutes: number
  // Distribution: how many questions per subarea
  subareaDistribution: {
    subarea: 'I' | 'II' | 'III'
    count: number
  }[]
  // Written response prompts (2 per practice test, mirrors real exam)
  crPrompts?: ICRPrompt[]
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

const PracticeTestSchema = new Schema<IPracticeTest>(
  {
    examCode: { type: String, enum: ['190', '890'], required: true },
    testNumber: { type: Number, required: true },
    name: { type: String, required: true },
    isDiagnostic: { type: Boolean, default: false },
    questionIds: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
    timeLimitMinutes: { type: Number, default: 240 },
    subareaDistribution: [
      {
        subarea: { type: String, enum: ['I', 'II', 'III'] },
        count: { type: Number },
        _id: false,
      },
    ],
    crPrompts: [
      {
        promptNumber: { type: Number, enum: [1, 2] },
        crType: { type: String, enum: ['foundational_reading_skills', 'reading_comprehension'] },
        scenarioContext: { type: String },
        prompt: { type: String },
        _id: false,
      },
    ],
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
)

PracticeTestSchema.index({ examCode: 1, testNumber: 1 })

const PracticeTest: Model<IPracticeTest> =
  mongoose.models.PracticeTest || mongoose.model<IPracticeTest>('PracticeTest', PracticeTestSchema)
export default PracticeTest
