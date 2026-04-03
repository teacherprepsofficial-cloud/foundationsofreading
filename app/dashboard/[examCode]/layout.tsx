import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import UserAccess from '@/models/UserAccess'
import UserProgress from '@/models/UserProgress'
import DashboardSidebar from '@/components/dashboard-sidebar'

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

  const [access, progress] = await Promise.all([
    UserAccess.findOne({ userId: auth.userId, examCode, isActive: true, expiresAt: { $gt: now } }),
    UserProgress.findOne({ userId: auth.userId, examCode }),
  ])

  if (!access) redirect('/dashboard')

  const module1Done = progress?.module1Completed || false
  const diagnosticDone = progress?.diagnosticCompleted || false
  const practiceTestsCount = progress?.practiceTestsCompleted?.length || 0
  const crCount = progress?.crAttemptsCompleted?.length || 0

  const NAV = [
    { label: 'Overview', href: `/dashboard/${examCode}`, icon: '⊞' },
    { label: 'About This Test', href: `/dashboard/${examCode}/module-1`, icon: '1', done: module1Done },
    { label: 'Diagnostic', href: `/dashboard/${examCode}/diagnostic`, icon: '2', done: diagnosticDone, locked: !module1Done },
    { label: 'Study Guide', href: `/dashboard/${examCode}/study-guide`, icon: '3', locked: !diagnosticDone },
    { label: 'Practice Tests', href: `/dashboard/${examCode}/practice-tests`, icon: '4', locked: !diagnosticDone, badge: practiceTestsCount > 0 ? `${practiceTestsCount}` : undefined },
    { label: 'Flashcards', href: `/dashboard/${examCode}/flashcards`, icon: '5', locked: !diagnosticDone },
    { label: 'Written Response', href: `/dashboard/${examCode}/cr`, icon: '6', locked: !diagnosticDone, badge: crCount > 0 ? `${crCount}` : undefined },
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
