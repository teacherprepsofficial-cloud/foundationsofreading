import mongoose, { Schema, Document, Model } from 'mongoose'
import type { ExamCode } from './UserAccess'

export type CRType = 'foundational_reading_skills' | 'reading_comprehension'

export interface IConstructedResponse extends Document {
  _id: mongoose.Types.ObjectId
  examCode: ExamCode
  crNumber: number
  crType: CRType
  prompt: string
  scenarioContext?: string
  rubric: {
    score4: string
    score3: string
    score2: string
    score1: string
  }
  bundleOnly: boolean
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

const ConstructedResponseSchema = new Schema<IConstructedResponse>(
  {
    examCode: { type: String, enum: ['190', '890'], required: true },
    crNumber: { type: Number, required: true },
    crType: {
      type: String,
      enum: ['foundational_reading_skills', 'reading_comprehension'],
      required: true,
    },
    prompt: { type: String, required: true },
    scenarioContext: { type: String },
    rubric: {
      score4: { type: String, required: true },
      score3: { type: String, required: true },
      score2: { type: String, required: true },
      score1: { type: String, required: true },
    },
    bundleOnly: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
)

ConstructedResponseSchema.index({ examCode: 1, crNumber: 1 })

const ConstructedResponse: Model<IConstructedResponse> =
  mongoose.models.ConstructedResponse ||
  mongoose.model<IConstructedResponse>('ConstructedResponse', ConstructedResponseSchema)
export default ConstructedResponse
