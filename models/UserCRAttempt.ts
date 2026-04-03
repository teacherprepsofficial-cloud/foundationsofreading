import mongoose, { Schema, Document, Model } from 'mongoose'

export type CRScore = 1 | 2 | 3 | 4
export type CRPerformanceLevel = 'Thorough' | 'Adequate' | 'Limited' | 'Weak'

export interface IUserCRAttempt extends Document {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  crId: mongoose.Types.ObjectId
  examCode: '190' | '890'
  responseText: string
  wordCount: number
  score: CRScore
  performanceLevel: CRPerformanceLevel
  feedback: string
  strengths: string[]
  improvements: string[]
  submittedAt: Date
  createdAt: Date
  updatedAt: Date
}

const UserCRAttemptSchema = new Schema<IUserCRAttempt>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    crId: { type: Schema.Types.ObjectId, ref: 'ConstructedResponse', required: true },
    examCode: { type: String, enum: ['190', '890'], required: true },
    responseText: { type: String, required: true },
    wordCount: { type: Number, required: true },
    score: { type: Number, enum: [1, 2, 3, 4], required: true },
    performanceLevel: {
      type: String,
      enum: ['Thorough', 'Adequate', 'Limited', 'Weak'],
      required: true,
    },
    feedback: { type: String, required: true },
    strengths: [{ type: String }],
    improvements: [{ type: String }],
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
)

UserCRAttemptSchema.index({ userId: 1, crId: 1 })
UserCRAttemptSchema.index({ userId: 1, examCode: 1 })

const UserCRAttempt: Model<IUserCRAttempt> =
  mongoose.models.UserCRAttempt ||
  mongoose.model<IUserCRAttempt>('UserCRAttempt', UserCRAttemptSchema)
export default UserCRAttempt
