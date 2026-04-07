import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IVisitorDeadline extends Document {
  fingerprintId?: string
  cookieId: string
  ip?: string
  expiresAt: Date
  createdAt: Date
}

const VisitorDeadlineSchema = new Schema<IVisitorDeadline>(
  {
    fingerprintId: { type: String, index: true, sparse: true },
    cookieId: { type: String, required: true, unique: true, index: true },
    ip: { type: String, index: true, sparse: true },
    expiresAt: { type: Date, required: true },
  },
  { timestamps: true }
)

// Auto-delete records 7 days after creation
VisitorDeadlineSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 60 * 24 * 7 })

const VisitorDeadline: Model<IVisitorDeadline> =
  mongoose.models.VisitorDeadline ||
  mongoose.model<IVisitorDeadline>('VisitorDeadline', VisitorDeadlineSchema)

export default VisitorDeadline
