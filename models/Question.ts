import mongoose, { Schema, Document, Model } from 'mongoose'
import type { ExamCode } from './UserAccess'

export type SubareaRoman = 'I' | 'II' | 'III'

export interface IQuestionOption {
  label: string
  text: string
}

export interface IQuestion extends Document {
  _id: mongoose.Types.ObjectId
  examCode: ExamCode
  questionText: string
  options: IQuestionOption[]
  correctAnswer: string // 'A' | 'B' | 'C' | 'D'
  explanation: string
  subarea: SubareaRoman
  subareaName: string
  objectiveNumber: number
  difficulty: 'easy' | 'medium' | 'hard'
  isPublished: boolean
  isDiagnostic: boolean // can appear in diagnostic test
  createdAt: Date
  updatedAt: Date
}

const QuestionOptionSchema = new Schema<IQuestionOption>(
  { label: { type: String, required: true }, text: { type: String, required: true } },
  { _id: false }
)

const QuestionSchema = new Schema<IQuestion>(
  {
    examCode: { type: String, enum: ['190', '890'], required: true },
    questionText: { type: String, required: true },
    options: { type: [QuestionOptionSchema], required: true },
    correctAnswer: { type: String, required: true },
    explanation: { type: String, required: true },
    subarea: { type: String, enum: ['I', 'II', 'III'], required: true },
    subareaName: { type: String, required: true },
    objectiveNumber: { type: Number, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], default: 'medium' },
    isPublished: { type: Boolean, default: false },
    isDiagnostic: { type: Boolean, default: false },
  },
  { timestamps: true }
)

QuestionSchema.index({ examCode: 1, subarea: 1, isPublished: 1 })
QuestionSchema.index({ examCode: 1, isDiagnostic: 1 })

const Question: Model<IQuestion> =
  mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema)
export default Question
