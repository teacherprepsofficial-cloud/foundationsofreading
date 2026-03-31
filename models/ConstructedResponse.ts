import mongoose, { Schema, Document, Model } from 'mongoose'
import type { ExamCode } from './UserAccess'

// CR type: which open-response assignment this maps to
export type CRType = 'foundational_reading_skills' | 'reading_comprehension'

export interface IConstructedResponse extends Document {
  _id: mongoose.Types.ObjectId
  examCode: ExamCode
  crNumber: number // 1-4 for starter, 5-8 for bundle-only
  crType: CRType
  prompt: string
  scenarioContext?: string // background/stimulus text
  rubric: {
    score2: string // what earns a 2 (Thorough)
    score1: string // what earns a 1 (Adequate/Limited)
    score0: string // what earns a 0 (Weak/No credit)
  }
  bundleOnly: boolean // true = only bundle users can access
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
      score2: { type: String, required: true },
      score1: { type: String, required: true },
      score0: { type: String, required: true },
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
