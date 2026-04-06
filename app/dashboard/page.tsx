import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import UserAccess from '@/models/UserAccess'
import Link from 'next/link'
import mongoose from 'mongoose'

export default async function DashboardPage() {
  const auth = await getCurrentUser()
  if (!auth) redirect('/login')

  await connectDB()
  const now = new Date()
  const accesses = await UserAccess.find({
    userId: new mongoose.Types.ObjectId(auth.userId),
    isActive: true,
    expiresAt: { $gt: now },
  })

  if (accesses.length === 0) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f5] px-4 text-center">
        <p className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
          No active access
        </p>
        <p className="mt-3 text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
          Your access may have expired, or you haven&apos;t purchased yet.
        </p>
        <p className="mt-1 text-sm text-[#9b9b9b]" style={{ fontFamily: 'var(--font-sans)' }}>
          Logged in as: {auth.email}
        </p>
        <Link
          href="/#pricing"
          className="mt-6 rounded bg-[#7c1c2e] px-8 py-3 text-sm font-semibold text-white"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Get Access
        </Link>
        <form action="/api/auth/logout" method="POST" className="mt-3">
          <button
            type="submit"
            className="text-sm text-[#6b6b6b] underline hover:text-[#1a1a1a]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Log out and switch accounts
          </button>
        </form>
      </div>
    )
  }

  // Redirect to first active access — one unified prep
  redirect(`/dashboard/${accesses[0].examCode}`)
}
