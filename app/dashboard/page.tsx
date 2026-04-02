import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import UserAccess from '@/models/UserAccess'
import Link from 'next/link'
import DashboardHeader from '@/components/dashboard-header'

export default async function DashboardPage() {
  const auth = await getCurrentUser()
  if (!auth) redirect('/login')

  await connectDB()
  const now = new Date()
  const accesses = await UserAccess.find({
    userId: auth.userId,
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
        <Link
          href="/#pricing"
          className="mt-6 rounded bg-[#7c1c2e] px-8 py-3 text-sm font-semibold text-white"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Get Access
        </Link>
      </div>
    )
  }

  if (accesses.length === 1) {
    redirect(`/dashboard/${accesses[0].examCode}`)
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <DashboardHeader />
      <div className="flex flex-col items-center justify-center px-4 py-24">
      <p className="text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
        Choose your exam
      </p>
      <div className="mt-8 flex gap-4">
        {accesses.map((a) => (
          <Link
            key={a.examCode}
            href={`/dashboard/${a.examCode}`}
            className="rounded-lg border-2 border-[#7c1c2e] bg-white px-10 py-6 text-center transition-colors hover:bg-[#f9f0f2]"
          >
            <p className="text-2xl font-bold text-[#7c1c2e]" style={{ fontFamily: 'var(--font-serif)' }}>
              NES {a.examCode}
            </p>
            <p className="mt-1 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
              {a.tier === 'bundle' ? 'Complete Bundle' : 'Starter'}
            </p>
          </Link>
        ))}
      </div>
      </div>
    </div>
  )
}
