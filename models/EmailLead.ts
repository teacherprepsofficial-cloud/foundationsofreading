import mongoose, { Schema, Document, Model } from 'mongoose'

export interface IEmailLead extends Document {
  email: string
  source: string // e.g. 'blog-190-foundations-of-reading'
  ip?: string
  discountExpiresAt?: Date
  createdAt: Date
}

const EmailLeadSchema = new Schema<IEmailLead>(
  {
    email: { type: String, required: true, lowercase: true, trim: true },
    source: { type: String, required: true },
    ip: { type: String },
    discountExpiresAt: { type: Date },
  },
  { timestamps: true }
)

EmailLeadSchema.index({ email: 1, source: 1 })

const EmailLead: Model<IEmailLead> =
  mongoose.models.EmailLead ||
  mongoose.model<IEmailLead>('EmailLead', EmailLeadSchema)

export default EmailLead
