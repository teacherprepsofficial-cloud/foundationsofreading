import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import UserAccess from '@/models/UserAccess'
import UserProgress from '@/models/UserProgress'
import UserTestAttempt from '@/models/UserTestAttempt'
import DashboardHeader from '@/components/dashboard-header'

function DaysLeft({ expiresAt }: { expiresAt: Date }) {
  const days = Math.max(0, Math.ceil((new Date(expiresAt).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
  return (
    <span className={`text-sm font-semibold ${days <= 5 ? 'text-red-600' : 'text-[#7c1c2e]'}`} style={{ fontFamily: 'var(--font-sans)' }}>
      {days} day{days !== 1 ? 's' : ''} left
    </span>
  )
}

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

  const access = await UserAccess.findOne({
    userId: auth.userId,
    examCode,
    isActive: true,
    expiresAt: { $gt: now },
  })

  if (!access) redirect('/dashboard')

  const progress = await UserProgress.findOne({ userId: auth.userId, examCode })

  // Get diagnostic attempt if completed
  let diagnosticScore = null
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

  const diagnosticDone = progress?.diagnosticCompleted || false
  const module1Done = progress?.module1Completed || false
  const practiceTestsCount = progress?.practiceTestsCompleted?.length || 0
  const crCount = progress?.crAttemptsCompleted?.length || 0
  const isBundle = access.tier === 'bundle'

  const MODULES = [
    {
      number: 1,
      title: 'About This Test',
      description: 'Exam overview, format, timing, and what to expect on test day.',
      href: `/dashboard/${examCode}/module-1`,
      completed: module1Done,
      locked: false,
    },
    {
      number: 2,
      title: 'Diagnostic Practice Test',
      description: `25 MC + 1 written response. See your current level across all 4 subareas${diagnosticDone ? '' : ' — required before starting your prep'}.`,
      href: `/dashboard/${examCode}/diagnostic`,
      completed: diagnosticDone,
      locked: !module1Done,
      badge: diagnosticScore ? `Score: ${diagnosticScore.scaledScore}` : undefined,
    },
    {
      number: 3,
      title: 'Study Guide',
      description: 'All 4 subareas, all 11 objectives. Read at your own pace.',
      href: `/dashboard/${examCode}/study-guide`,
      completed: false,
      locked: !diagnosticDone,
    },
    {
      number: 4,
      title: 'Practice Tests',
      description: `Full-length timed tests on the NES 100–300 scale. ${isBundle ? '4 tests available.' : '2 tests available.'}`,
      href: `/dashboard/${examCode}/practice-tests`,
      completed: practiceTestsCount >= (isBundle ? 4 : 2),
      locked: !diagnosticDone,
      badge: practiceTestsCount > 0 ? `${practiceTestsCount} completed` : undefined,
    },
    {
      number: 5,
      title: 'Flashcards',
      description: '150+ terms across all subareas and objectives.',
      href: `/dashboard/${examCode}/flashcards`,
      completed: progress?.flashcardsCompleted || false,
      locked: !diagnosticDone,
    },
    {
      number: 6,
      title: `Written Response Practice${isBundle ? ' (8 prompts)' : ' (4 prompts)'}`,
      description: 'Type your response. Get scored 0–2 with feedback from AI — same rubric as the real exam.',
      href: `/dashboard/${examCode}/cr`,
      completed: crCount >= (isBundle ? 8 : 4),
      locked: !diagnosticDone,
      badge: crCount > 0 ? `${crCount} submitted` : undefined,
    },
  ]

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <DashboardHeader />
      {/* Dashboard Header */}
      <div className="bg-[#7c1c2e] px-6 py-8">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>
                NES Foundations of Reading {examCode}
              </p>
              <h1 className="mt-1 text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                Your Prep Dashboard
              </h1>
            </div>
            <div className="text-right">
              <DaysLeft expiresAt={access.expiresAt} />
              <p className="mt-0.5 text-xs text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>
                {access.tier === 'bundle' ? 'Complete Bundle' : 'Starter'}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          {diagnosticScore && (
            <div className="mt-6 rounded-lg bg-[#5a1220] px-6 py-4">
              <p className="text-sm font-semibold text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>
                Diagnostic Score
              </p>
              <div className="mt-2 flex items-center gap-4">
                <p className="text-3xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                  {diagnosticScore.scaledScore}
                </p>
                <span
                  className={`rounded px-3 py-1 text-xs font-bold ${
                    diagnosticScore.passed
                      ? 'bg-green-600 text-white'
                      : 'bg-[#7c1c2e] text-white border border-white/30'
                  }`}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {diagnosticScore.passed ? 'PASSED' : 'NOT YET — KEEP STUDYING'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modules */}
      <div className="mx-auto max-w-4xl px-6 py-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
          Your Study Program
        </p>
        <div className="mt-4 space-y-3">
          {MODULES.map((mod) => (
            <div
              key={mod.number}
              className={`relative rounded-lg border bg-white ${
                mod.locked ? 'border-[#e8e0e2] opacity-50' : 'border-[#e8e0e2] hover:border-[#7c1c2e] transition-colors'
              }`}
            >
              {mod.completed && (
                <div className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-green-500">
                  <span className="text-xs text-white">✓</span>
                </div>
              )}
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <span
                    className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                      mod.completed
                        ? 'bg-[#7c1c2e] text-white'
                        : mod.locked
                        ? 'bg-[#e8e0e2] text-[#6b6b6b]'
                        : 'bg-[#f9f0f2] text-[#7c1c2e]'
                    }`}
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {mod.number}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
                        {mod.title}
                      </p>
                      {mod.badge && (
                        <span className="rounded-full bg-[#f9f0f2] px-2.5 py-0.5 text-xs font-semibold text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
                          {mod.badge}
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                      {mod.description}
                    </p>
                    {mod.locked && (
                      <p className="mt-2 text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                        🔒 Complete the previous step to unlock
                      </p>
                    )}
                  </div>
                  {!mod.locked && (
                    <Link
                      href={mod.href}
                      className="flex-shrink-0 rounded bg-[#7c1c2e] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a1220]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {mod.completed ? 'Review' : 'Start'}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
