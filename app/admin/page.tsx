import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import mongoose from 'mongoose'
import QuestionEditor from './QuestionEditor'

const SF = { fontFamily: 'var(--font-sans)' }
const SE = { fontFamily: 'var(--font-serif)' }

export default async function AdminPage() {
  const auth = await getCurrentUser()
  if (!auth) redirect('/login')

  await connectDB()
  const user = await User.findById(new mongoose.Types.ObjectId(auth.userId)).select('isAdmin name')
  if (!user?.isAdmin) redirect('/')

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="border-b border-[#e8e0e2] bg-white px-8 py-4 flex items-center justify-between">
        <div>
          <p className="text-xs text-[#7c1c2e] font-bold uppercase tracking-widest" style={SF}>Admin</p>
          <h1 className="text-xl font-bold text-[#1a1a1a]" style={SE}>Question Editor</h1>
        </div>
        <p className="text-sm text-[#6b6b6b]" style={SF}>{auth.email}</p>
      </div>

      <div className="mx-auto max-w-4xl px-8 py-8">
        <p className="text-sm text-[#6b6b6b] mb-6" style={SF}>
          Search and edit question text, answer options, correct answer, and explanations.
          Changes take effect immediately for all students.
        </p>
        <QuestionEditor />
      </div>
    </div>
  )
}
