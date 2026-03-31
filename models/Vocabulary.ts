import mongoose, { Schema, Document, Model } from 'mongoose'
import type { ExamCode } from './UserAccess'
import type { SubareaRoman } from './Question'

export interface IVocabulary extends Document {
  _id: mongoose.Types.ObjectId
  examCode: ExamCode
  term: string
  definition: string
  subarea: SubareaRoman
  subareaName: string
  objectiveNumber: number
  example?: string
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

const VocabularySchema = new Schema<IVocabulary>(
  {
    examCode: { type: String, enum: ['190', '890'], required: true },
    term: { type: String, required: true, trim: true },
    definition: { type: String, required: true },
    subarea: { type: String, enum: ['I', 'II', 'III', 'IV'], required: true },
    subareaName: { type: String, required: true },
    objectiveNumber: { type: Number, required: true },
    example: { type: String },
    isPublished: { type: Boolean, default: false },
  },
  { timestamps: true }
)

VocabularySchema.index({ examCode: 1, subarea: 1 })

const Vocabulary: Model<IVocabulary> =
  mongoose.models.Vocabulary || mongoose.model<IVocabulary>('Vocabulary', VocabularySchema)
export default Vocabulary
