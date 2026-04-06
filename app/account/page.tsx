import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import UserAccess from '@/models/UserAccess'
import User from '@/models/User'
import mongoose from 'mongoose'

const SF = { fontFamily: 'var(--font-sans)' }
const SE = { fontFamily: 'var(--font-serif)' }

export default async function AccountPage() {
  const auth = await getCurrentUser()
  if (!auth) redirect('/login')

  await connectDB()
  const uid = new mongoose.Types.ObjectId(auth.userId)

  const [user, accesses] = await Promise.all([
    User.findById(uid).select('name email createdAt'),
    UserAccess.find({ userId: uid, isActive: true }).lean(),
  ])

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="border-b border-[#e8e0e2] bg-white px-8 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="text-sm text-[#6b6b6b] hover:text-[#1a1a1a] transition-colors" style={SF}>
          ← Back to Dashboard
        </Link>
      </div>

      <div className="mx-auto max-w-2xl px-8 py-10 space-y-6">
        <h1 className="text-2xl font-bold text-[#1a1a1a]" style={SE}>My Account</h1>

        {/* Profile */}
        <div className="rounded-xl border border-[#e8e0e2] bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#7c1c2e] mb-4" style={SF}>Profile</p>
          <div className="space-y-3">
            <div>
              <p className="text-xs text-[#6b6b6b]" style={SF}>Name</p>
              <p className="text-sm font-semibold text-[#1a1a1a]" style={SF}>{user?.name}</p>
            </div>
            <div>
              <p className="text-xs text-[#6b6b6b]" style={SF}>Email</p>
              <p className="text-sm font-semibold text-[#1a1a1a]" style={SF}>{user?.email}</p>
            </div>
            <div>
              <p className="text-xs text-[#6b6b6b]" style={SF}>Member since</p>
              <p className="text-sm font-semibold text-[#1a1a1a]" style={SF}>
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '—'}
              </p>
            </div>
          </div>
        </div>

        {/* Subscriptions */}
        <div className="rounded-xl border border-[#e8e0e2] bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#7c1c2e] mb-4" style={SF}>Active Access</p>
          {accesses.length === 0 ? (
            <p className="text-sm text-[#6b6b6b]" style={SF}>No active access. <Link href="/#pricing" className="text-[#7c1c2e] underline">Get access →</Link></p>
          ) : (
            <div className="space-y-3">
              {accesses.map((a: { _id: unknown; examCode: string; tier: string; expiresAt: Date }) => (
                <div key={String(a._id)} className="flex items-center justify-between rounded-lg border border-[#e8e0e2] p-4">
                  <div>
                    <p className="text-sm font-semibold text-[#1a1a1a]" style={SF}>
                      NES {a.examCode} — {a.tier === 'bundle' ? 'Prep Plus (Bundle)' : 'Prep (Starter)'}
                    </p>
                    <p className="text-xs text-[#6b6b6b] mt-0.5" style={SF}>
                      Access expires: {new Date(a.expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </p>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-800" style={SF}>Active</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="rounded-xl border border-[#e8e0e2] bg-white p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#7c1c2e] mb-4" style={SF}>Account Actions</p>
          <div className="space-y-3">
            <a
              href="/api/stripe/portal"
              className="block w-full rounded border border-[#e8e0e2] px-4 py-3 text-sm font-semibold text-[#1a1a1a] hover:bg-[#faf8f5] transition-colors text-center"
              style={SF}
            >
              Manage Subscription / Billing
            </a>
            <form action="/api/auth/logout" method="POST">
              <button
                type="submit"
                className="w-full rounded border border-red-200 px-4 py-3 text-sm font-semibold text-red-700 hover:bg-red-50 transition-colors"
                style={SF}
              >
                Log Out
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
