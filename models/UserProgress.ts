import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IUserProgress extends Document {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  examCode: '190' | '890'
  // Module 1: About the Test
  module1Completed: boolean
  module1CompletedAt?: Date
  // Diagnostic
  diagnosticCompleted: boolean
  diagnosticAttemptId?: mongoose.Types.ObjectId
  diagnosticCompletedAt?: Date
  // Study activities
  studyGuideLastRead?: Date
  studyGuideSectionsRead: string[]
  flashcardsCompleted: boolean
  vocabMatchHighScore: number
  // Practice tests completed
  practiceTestsCompleted: mongoose.Types.ObjectId[]
  // CR attempts completed
  crAttemptsCompleted: mongoose.Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const UserProgressSchema = new Schema<IUserProgress>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    examCode: { type: String, enum: ['190', '890'], required: true },
    module1Completed: { type: Boolean, default: false },
    module1CompletedAt: { type: Date },
    diagnosticCompleted: { type: Boolean, default: false },
    diagnosticAttemptId: { type: Schema.Types.ObjectId, ref: 'UserTestAttempt' },
    diagnosticCompletedAt: { type: Date },
    studyGuideLastRead: { type: Date },
    studyGuideSectionsRead: [{ type: String }],
    flashcardsCompleted: { type: Boolean, default: false },
    vocabMatchHighScore: { type: Number, default: 0 },
    practiceTestsCompleted: [{ type: Schema.Types.ObjectId, ref: 'UserTestAttempt' }],
    crAttemptsCompleted: [{ type: Schema.Types.ObjectId, ref: 'UserCRAttempt' }],
  },
  { timestamps: true }
)

UserProgressSchema.index({ userId: 1, examCode: 1 }, { unique: true })

const UserProgress: Model<IUserProgress> =
  mongoose.models.UserProgress ||
  mongoose.model<IUserProgress>('UserProgress', UserProgressSchema)
export default UserProgress
