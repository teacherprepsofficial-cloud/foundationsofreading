import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import UserAccess from '@/models/UserAccess'
import UserProgress from '@/models/UserProgress'
import UserTestAttempt from '@/models/UserTestAttempt'
import User from '@/models/User'
import DashboardSidebar from '@/components/dashboard-sidebar'

export default async function ExamDashboardPage({
  params,
}: {
  params: Promise<{ examCode: string }>
}) {
  const { examCode } = await params
  if (examCode !== '190' && examCode !== '890') notFound()

  const auth = await getCurrentUser()
  if (!auth) redirect('/login')

  await connectDB()
  const now = new Date()

  const [access, user] = await Promise.all([
    UserAccess.findOne({ userId: auth.userId, examCode, isActive: true, expiresAt: { $gt: now } }),
    User.findById(auth.userId).select('name email'),
  ])

  if (!access) redirect('/dashboard')

  const progress = await UserProgress.findOne({ userId: auth.userId, examCode })

  // Diagnostic score
  let diagnosticScore: { scaledScore: number; passed: boolean; subareaScores: { subarea: string; subareaName: string; percentage: number }[] } | null = null
  if (progress?.diagnosticAttemptId) {
    const attempt = await UserTestAttempt.findById(progress.diagnosticAttemptId)
    if (attempt) {
      diagnosticScore = {
        scaledScore: attempt.scaledScore,
        passed: attempt.passed,
        subareaScores: attempt.subareaScores,
      }
    }
  }

  // All completed practice test attempts (non-diagnostic)
  const practiceAttempts = await UserTestAttempt.find({
    userId: auth.userId,
    examCode,
    isDiagnostic: false,
    status: 'completed',
  }).sort({ completedAt: 1 }).lean()

  const diagnosticDone = progress?.diagnosticCompleted || false
  const module1Done = progress?.module1Completed || false
  const practiceTestsCount = progress?.practiceTestsCompleted?.length || 0
  const crCount = progress?.crAttemptsCompleted?.length || 0
  const isBundle = access.tier === 'bundle'

  const daysLeft = Math.max(0, Math.ceil((new Date(access.expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))

  const NAV = [
    { label: 'Overview', href: `/dashboard/${examCode}`, icon: '⊞' },
    { label: 'About This Test', href: `/dashboard/${examCode}/module-1`, icon: '1', done: module1Done },
    { label: 'Diagnostic', href: `/dashboard/${examCode}/diagnostic`, icon: '2', done: diagnosticDone, locked: !module1Done },
    { label: 'Study Guide', href: `/dashboard/${examCode}/study-guide`, icon: '3', locked: !diagnosticDone },
    { label: 'Practice Tests', href: `/dashboard/${examCode}/practice-tests`, icon: '4', locked: !diagnosticDone, badge: practiceTestsCount > 0 ? `${practiceTestsCount}` : undefined },
    { label: 'Flashcards', href: `/dashboard/${examCode}/flashcards`, icon: '5', locked: !diagnosticDone },
    { label: 'Written Response', href: `/dashboard/${examCode}/cr`, icon: '6', locked: !diagnosticDone, badge: crCount > 0 ? `${crCount}` : undefined },
  ]

  const firstName = user?.name?.split(' ')[0] || 'there'

  return (
    <div className="flex min-h-screen bg-[#faf8f5]">

      {/* ── Left Sidebar ── */}
      <DashboardSidebar nav={NAV} />

      {/* ── Main Content ── */}
      <div className="flex-1 overflow-auto">

        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-[#e8e0e2] bg-white px-8 py-4">
          <div>
            <p className="text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
              {user?.email}
            </p>
            <h1 className="text-xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
              Welcome back, {firstName}.
            </h1>
          </div>
          <div className="text-right">
            <p
              className={`text-sm font-semibold ${daysLeft <= 5 ? 'text-red-600' : 'text-[#7c1c2e]'}`}
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
            </p>
            <p className="text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
              NES 190 &amp; 890 · {isBundle ? 'Bundle' : 'Starter'}
            </p>
          </div>
        </div>

        <div className="px-8 py-8 max-w-3xl">

          {/* ── My Progress ── */}
          <p className="text-xs font-bold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>My Progress</p>

          {/* Diagnostic */}
          <div className="mt-3 rounded-xl border border-[#e8e0e2] bg-white p-5">
            <p className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>Diagnostic Practice Test</p>
            {diagnosticScore ? (
              <div className="mt-3 flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-[#7c1c2e]" style={{ fontFamily: 'var(--font-serif)' }}>{diagnosticScore.scaledScore}</p>
                  <p className="text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Scaled Score</p>
                </div>
                <span
                  className={`rounded px-3 py-1 text-xs font-bold ${diagnosticScore.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {diagnosticScore.passed ? 'PASS' : 'NOT YET'}
                </span>
                <div className="ml-auto flex gap-6">
                  {diagnosticScore.subareaScores.map((s) => (
                    <div key={s.subarea} className="text-center">
                      <p className="text-sm font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>{Math.round(s.percentage)}%</p>
                      <p className="text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Subarea {s.subarea}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-2 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                {!module1Done ? 'Complete Module 1 first to unlock.' : 'Not yet taken.'}
                {module1Done && !diagnosticDone && (
                  <Link href={`/dashboard/${examCode}/diagnostic`} className="ml-2 font-semibold text-[#7c1c2e] underline">
                    Start now →
                  </Link>
                )}
              </p>
            )}
          </div>

          {/* Practice Tests */}
          <div className="mt-4 rounded-xl border border-[#e8e0e2] bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>Practice Tests</p>
              <p className="text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                {practiceTestsCount} of {isBundle ? 4 : 2} completed
              </p>
            </div>
            {practiceAttempts.length > 0 ? (
              <div className="mt-3 overflow-hidden rounded-lg border border-[#e8e0e2]">
                <table className="w-full text-sm" style={{ fontFamily: 'var(--font-sans)' }}>
                  <thead>
                    <tr className="border-b border-[#e8e0e2] bg-[#faf8f5]">
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-[#6b6b6b]">Test</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-[#6b6b6b]">Score</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-[#6b6b6b]">Result</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-[#6b6b6b]">Mode</th>
                      <th className="px-4 py-2.5 text-left text-xs font-semibold text-[#6b6b6b]">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {practiceAttempts.map((a, i) => (
                      <tr key={String(a._id)} className={i < practiceAttempts.length - 1 ? 'border-b border-[#e8e0e2]' : ''}>
                        <td className="px-4 py-3 font-semibold text-[#1a1a1a]">Practice Test {i + 1}</td>
                        <td className="px-4 py-3 font-bold text-[#7c1c2e]">{a.scaledScore}</td>
                        <td className="px-4 py-3">
                          <span className={`rounded px-2 py-0.5 text-xs font-bold ${a.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {a.passed ? 'PASS' : 'NOT YET'}
                          </span>
                        </td>
                        <td className="px-4 py-3 capitalize text-[#6b6b6b]">{a.mode}</td>
                        <td className="px-4 py-3 text-[#6b6b6b]">
                          {a.completedAt ? new Date(a.completedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="mt-2 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                {!diagnosticDone ? 'Complete the diagnostic first to unlock.' : 'No tests taken yet.'}
                {diagnosticDone && (
                  <Link href={`/dashboard/${examCode}/practice-tests`} className="ml-2 font-semibold text-[#7c1c2e] underline">
                    Start now →
                  </Link>
                )}
              </p>
            )}
          </div>

          {/* Written Response */}
          <div className="mt-4 rounded-xl border border-[#e8e0e2] bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>AI-Graded Written Responses</p>
              <p className="text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                {crCount} of {isBundle ? 8 : 4} submitted
              </p>
            </div>
            {crCount === 0 && (
              <p className="mt-2 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                {!diagnosticDone ? 'Complete the diagnostic first to unlock.' : 'No responses submitted yet.'}
                {diagnosticDone && (
                  <Link href={`/dashboard/${examCode}/cr`} className="ml-2 font-semibold text-[#7c1c2e] underline">
                    Start now →
                  </Link>
                )}
              </p>
            )}
            {crCount > 0 && (
              <div className="mt-2">
                <div className="h-2 rounded-full bg-[#e8e0e2]">
                  <div
                    className="h-2 rounded-full bg-[#7c1c2e] transition-all"
                    style={{ width: `${(crCount / (isBundle ? 8 : 4)) * 100}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                  {crCount} submitted
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
