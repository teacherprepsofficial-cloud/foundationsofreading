import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const UserSchema = new mongoose.Schema({ email: String })
const AttemptSchema = new mongoose.Schema({ userId: mongoose.Schema.Types.ObjectId, isDiagnostic: Boolean, examCode: String, status: String })
const ProgressSchema = new mongoose.Schema({ userId: mongoose.Schema.Types.ObjectId, examCode: String, diagnosticCompleted: Boolean, diagnosticAttemptId: mongoose.Schema.Types.ObjectId, diagnosticCompletedAt: Date, practiceTestsCompleted: [mongoose.Schema.Types.ObjectId] })

const User = mongoose.models.User || mongoose.model('User', UserSchema)
const Attempt = mongoose.models.UserTestAttempt || mongoose.model('UserTestAttempt', AttemptSchema)
const Progress = mongoose.models.UserProgress || mongoose.model('UserProgress', ProgressSchema)

async function run() {
  await mongoose.connect(process.env.MONGODB_URI!)

  const userId = '69ce895e64ac0e2490659377'

  // Delete all diagnostic attempts for this user on 190
  const del = await (Attempt as any).deleteMany({ userId, isDiagnostic: true, examCode: '190' })
  console.log(`Deleted ${del.deletedCount} diagnostic attempt(s)`)

  // Reset UserProgress diagnostic fields
  const prog = await (Progress as any).findOneAndUpdate(
    { userId, examCode: '190' },
    {
      $unset: { diagnosticAttemptId: '', diagnosticCompletedAt: '' },
      $set: { diagnosticCompleted: false },
      $pull: { practiceTestsCompleted: { $in: [
        new mongoose.Types.ObjectId('69ce931917d5e1cc4988fb39'),
        new mongoose.Types.ObjectId('69ce97e6600570acececfbcc'),
      ] } },
    },
    { new: true }
  )
  console.log('UserProgress after reset:', prog)

  await mongoose.disconnect()
}
run().catch(console.error)
