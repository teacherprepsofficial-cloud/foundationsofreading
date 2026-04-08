import { redirect } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import UserAccess from '@/models/UserAccess'
import UserProgress from '@/models/UserProgress'
import DashboardSidebar from '@/components/dashboard-sidebar'
import mongoose from 'mongoose'

const SF = { fontFamily: 'var(--font-sans)' }

export default async function ExamDashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ examCode: string }>
}) {
  const { examCode } = await params

  const auth = await getCurrentUser()
  if (!auth) redirect('/login')

  await connectDB()
  const now = new Date()

  const uid = new mongoose.Types.ObjectId(auth.userId)

  // Accept either 190 or 890 — same content
  const [access, progress] = await Promise.all([
    UserAccess.findOne({ userId: uid, examCode: { $in: ['190', '890'] }, isActive: true, expiresAt: { $gt: now } }),
    UserProgress.findOne({ userId: uid, examCode }),
  ])

  if (!access) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f5] px-4 text-center">
        <p className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
          No active access
        </p>
        <p className="mt-3 text-[#6b6b6b]" style={SF}>
          Your access may have expired, or you haven&apos;t purchased yet.
        </p>
        <p className="mt-1 text-sm text-[#9b9b9b]" style={SF}>
          Logged in as: {auth.email}
        </p>
        <Link
          href="/#pricing"
          className="mt-6 rounded bg-[#7c1c2e] px-8 py-3 text-sm font-semibold text-white"
          style={SF}
        >
          Get Access
        </Link>
        <form action="/api/auth/logout" method="POST" className="mt-3">
          <button type="submit" className="text-sm text-[#6b6b6b] underline hover:text-[#1a1a1a]" style={SF}>
            Log out and switch accounts
          </button>
        </form>
      </div>
    )
  }

  const module1Done = progress?.module1Completed || false
  const diagnosticDone = progress?.diagnosticCompleted || false
  const practiceTestsCount = progress?.practiceTestsCompleted?.length || 0
  const crCount = progress?.crAttemptsCompleted?.length || 0

  const NAV = [
    { label: 'My Progress', href: '/dashboard', icon: '⊞' },
    { label: 'About This Test', href: '/dashboard/module-1', icon: '1', done: module1Done },
    { label: 'Diagnostic', href: '/dashboard/diagnostic', icon: '2', done: diagnosticDone, locked: !module1Done },
    { label: 'Study Guide', href: '/dashboard/study-guide', icon: '3', locked: !diagnosticDone },
    { label: 'Practice Tests', href: '/dashboard/practice-tests', icon: '4', locked: !diagnosticDone, badge: practiceTestsCount > 0 ? `${practiceTestsCount}` : undefined },
    { label: 'Flashcards', href: '/dashboard/flashcards', icon: '5', locked: !diagnosticDone },
    { label: 'Written Response', href: '/dashboard/cr', icon: '6', locked: !diagnosticDone, badge: crCount > 0 ? `${crCount}` : undefined },
  ]

  return (
    <div className="flex min-h-screen bg-[#faf8f5]">
      <DashboardSidebar nav={NAV} />
      <div className="flex-1 min-h-screen overflow-auto">
        {children}
      </div>
    </div>
  )
}
