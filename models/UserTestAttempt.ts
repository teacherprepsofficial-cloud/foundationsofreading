import mongoose, { Schema, Document } from 'mongoose'

export interface IQuestionResponse {
  questionId: mongoose.Types.ObjectId
  selectedAnswer: string | null
  isCorrect: boolean
  timeSpent: number
  isMarked: boolean
}

export interface ISubareaScore {
  subarea: 'I' | 'II' | 'III'
  subareaName: string
  totalQuestions: number
  correctAnswers: number
  percentage: number
  // NES performance descriptor
  performanceLevel: 'most' | 'many' | 'some' | 'few'
}

export interface IUserTestAttempt extends Document {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  testId: mongoose.Types.ObjectId
  examCode: '190' | '890'
  isDiagnostic: boolean
  mode: 'timed' | 'practice'
  responses: IQuestionResponse[]
  score: number // percentage 0-100
  scaledScore: number // 100-300 scale
  totalCorrect: number
  totalIncorrect: number
  totalSkipped: number
  totalQuestions: number
  timeSpentSeconds: number
  timeLimitSeconds: number
  subareaScores: ISubareaScore[]
  passed: boolean
  // Constructed response (diagnostic: single CR)
  crResponse?: string
  crScore?: number // 0-4
  crPerformanceLevel?: 'Thorough' | 'Adequate' | 'Limited' | 'Weak' | 'No Response'
  crFeedback?: string
  // Constructed responses (practice tests: 2 CRs)
  cr1Response?: string
  cr1Score?: number
  cr1PerformanceLevel?: 'Thorough' | 'Adequate' | 'Limited' | 'Weak' | 'No Response'
  cr1Feedback?: string
  cr2Response?: string
  cr2Score?: number
  cr2PerformanceLevel?: 'Thorough' | 'Adequate' | 'Limited' | 'Weak' | 'No Response'
  cr2Feedback?: string
  startedAt: Date
  completedAt?: Date
  status: 'in_progress' | 'completed' | 'abandoned'
  createdAt: Date
  updatedAt: Date
}

const QuestionResponseSchema = new Schema<IQuestionResponse>(
  {
    questionId: { type: Schema.Types.ObjectId, required: true },
    selectedAnswer: { type: String, default: null },
    isCorrect: { type: Boolean, default: false },
    timeSpent: { type: Number, default: 0 },
    isMarked: { type: Boolean, default: false },
  },
  { _id: false }
)

const SubareaScoreSchema = new Schema(
  {
    subarea: { type: String, enum: ['I', 'II', 'III'], required: true },
    subareaName: { type: String, required: true },
    totalQuestions: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    percentage: { type: Number, required: true },
    performanceLevel: { type: String, enum: ['most', 'many', 'some', 'few'], required: true },
  },
  { _id: false }
)

const UserTestAttemptSchema = new Schema<IUserTestAttempt>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    testId: { type: Schema.Types.ObjectId, ref: 'PracticeTest', required: true },
    examCode: { type: String, enum: ['190', '890'], required: true },
    isDiagnostic: { type: Boolean, default: false },
    mode: { type: String, enum: ['timed', 'practice'], required: true },
    responses: [QuestionResponseSchema],
    score: { type: Number, default: 0 },
    scaledScore: { type: Number, default: 0 },
    totalCorrect: { type: Number, default: 0 },
    totalIncorrect: { type: Number, default: 0 },
    totalSkipped: { type: Number, default: 0 },
    totalQuestions: { type: Number, required: true },
    timeSpentSeconds: { type: Number, default: 0 },
    timeLimitSeconds: { type: Number, required: true },
    subareaScores: [SubareaScoreSchema],
    passed: { type: Boolean, default: false },
    crResponse: { type: String },
    crScore: { type: Number },
    crPerformanceLevel: { type: String, enum: ['Thorough', 'Adequate', 'Limited', 'Weak', 'No Response'] },
    crFeedback: { type: String },
    cr1Response: { type: String },
    cr1Score: { type: Number },
    cr1PerformanceLevel: { type: String, enum: ['Thorough', 'Adequate', 'Limited', 'Weak', 'No Response'] },
    cr1Feedback: { type: String },
    cr2Response: { type: String },
    cr2Score: { type: Number },
    cr2PerformanceLevel: { type: String, enum: ['Thorough', 'Adequate', 'Limited', 'Weak', 'No Response'] },
    cr2Feedback: { type: String },
    startedAt: { type: Date, required: true },
    completedAt: { type: Date },
    status: { type: String, enum: ['in_progress', 'completed', 'abandoned'], default: 'in_progress' },
  },
  { timestamps: true }
)

UserTestAttemptSchema.index({ userId: 1, examCode: 1 })
UserTestAttemptSchema.index({ userId: 1, testId: 1 })

export default mongoose.models.UserTestAttempt ||
  mongoose.model<IUserTestAttempt>('UserTestAttempt', UserTestAttemptSchema)
