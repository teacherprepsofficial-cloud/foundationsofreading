import mongoose, { Schema, Document, Model } from 'mongoose'

export type ExamCode = '190' | '890'
export type AccessTier = 'starter' | 'bundle'

export interface IUserAccess extends Document {
  _id: mongoose.Types.ObjectId
  userId: mongoose.Types.ObjectId
  examCode: ExamCode
  tier: AccessTier
  purchaseDate: Date
  expiresAt: Date
  stripePaymentIntentId?: string
  stripeSessionId?: string
  stripeSubscriptionId?: string
  stripeCustomerId?: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const UserAccessSchema = new Schema<IUserAccess>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    examCode: { type: String, enum: ['190', '890'], required: true },
    tier: { type: String, enum: ['starter', 'bundle'], required: true },
    purchaseDate: { type: Date, required: true, default: Date.now },
    expiresAt: { type: Date, required: true },
    stripePaymentIntentId: { type: String },
    stripeSessionId: { type: String },
    stripeSubscriptionId: { type: String, index: true },
    stripeCustomerId: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
)

UserAccessSchema.index({ userId: 1, examCode: 1 })

const UserAccess: Model<IUserAccess> =
  mongoose.models.UserAccess || mongoose.model<IUserAccess>('UserAccess', UserAccessSchema)
export default UserAccess
