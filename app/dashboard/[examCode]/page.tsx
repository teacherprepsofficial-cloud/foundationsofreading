import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { getCurrentUser } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import UserAccess from '@/models/UserAccess'
import UserProgress from '@/models/UserProgress'
import UserTestAttempt from '@/models/UserTestAttempt'
import User from '@/models/User'
import PracticeTest from '@/models/PracticeTest'
import ConstructedResponse from '@/models/ConstructedResponse'
import UserCRAttempt from '@/models/UserCRAttempt'
import mongoose from 'mongoose'

const SF = { fontFamily: 'var(--font-sans)' }
const SE = { fontFamily: 'var(--font-serif)' }

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
  const uid = new mongoose.Types.ObjectId(auth.userId)

  const [access, user] = await Promise.all([
    UserAccess.findOne({ userId: uid, examCode, isActive: true, expiresAt: { $gt: now } }),
    User.findById(uid).select('name email'),
  ])

  if (!access) redirect('/dashboard')

  const progress = await UserProgress.findOne({ userId: uid, examCode })

  // Diagnostic score
  let diagnosticScore: { scaledScore: number; passed: boolean } | null = null
  if (progress?.diagnosticAttemptId) {
    const attempt = await UserTestAttempt.findById(progress.diagnosticAttemptId).select('scaledScore passed')
    if (attempt) diagnosticScore = { scaledScore: attempt.scaledScore, passed: attempt.passed }
  }

  // Practice tests (non-diagnostic, ordered)
  const practiceTests = await PracticeTest.find({ examCode, isDiagnostic: false }).lean()
  const completedPracticeIds = new Set((progress?.practiceTestsCompleted || []).map(String))

  // CRs
  const crs = await ConstructedResponse.find({ examCode }).lean()
  const crAttempts = await UserCRAttempt.find({ userId: uid, examCode }).select('crId').lean()
  const completedCRIds = new Set(crAttempts.map((a: { crId: unknown }) => String(a.crId)))

  const diagnosticDone = progress?.diagnosticCompleted || false
  const module1Done = progress?.module1Completed || false
  const isBundle = access.tier === 'bundle'
  const firstName = user?.name?.split(' ')[0] || 'there'


  return (
    <div className="flex-1 overflow-auto">

      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-[#e8e0e2] bg-white px-8 py-4">
        <div>
          <p className="text-xs text-[#6b6b6b]" style={SF}>{user?.email}</p>
          <h1 className="text-xl font-bold text-[#1a1a1a]" style={SE}>Welcome, {firstName}.</h1>
        </div>
        <Link
          href="/account"
          className="rounded border border-[#e8e0e2] px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#faf8f5] transition-colors"
          style={SF}
        >
          My Account
        </Link>
      </div>

      <div className="px-8 py-8 max-w-3xl space-y-4">
        <p className="text-xs font-bold uppercase tracking-widest text-[#7c1c2e]" style={SF}>My Progress</p>

        {/* ── Step 1: About This Test ── */}
        <div className="rounded-xl border border-[#e8e0e2] bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {module1Done
                ? <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white" style={SF}>✓</span>
                : <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7c1c2e] text-xs font-bold text-white" style={SF}>1</span>
              }
              <p className="text-sm font-semibold text-[#1a1a1a]" style={SF}>About This Test</p>
            </div>
            {module1Done ? (
              <Link href={`/dashboard/${examCode}/module-1`} className="rounded px-4 py-1.5 text-xs font-semibold text-[#7c1c2e] border border-[#7c1c2e] hover:bg-[#faf8f5] transition-colors" style={SF}>
                Review
              </Link>
            ) : (
              <Link href={`/dashboard/${examCode}/module-1`} className="rounded bg-[#7c1c2e] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#5a1220] transition-colors" style={SF}>
                Start Now
              </Link>
            )}
          </div>
          {!module1Done && (
            <p className="mt-2 text-xs text-[#6b6b6b] ml-9" style={SF}>Learn what the exam covers before you begin.</p>
          )}
        </div>

        {/* ── Step 2: Diagnostic ── */}
        <div className={`rounded-xl border bg-white p-5 ${!module1Done ? 'opacity-60' : 'border-[#e8e0e2]'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {diagnosticDone
                ? <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white" style={SF}>✓</span>
                : <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#7c1c2e] text-xs font-bold text-white" style={SF}>2</span>
              }
              <p className="text-sm font-semibold text-[#1a1a1a]" style={SF}>Diagnostic Practice Test</p>
            </div>
            {!module1Done ? (
              <span className="text-lg">🔒</span>
            ) : diagnosticDone ? (
              <Link href={`/dashboard/${examCode}/diagnostic`} className="rounded px-4 py-1.5 text-xs font-semibold text-[#7c1c2e] border border-[#7c1c2e] hover:bg-[#faf8f5] transition-colors" style={SF}>
                View Results
              </Link>
            ) : (
              <Link href={`/dashboard/${examCode}/diagnostic`} className="rounded bg-[#7c1c2e] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#5a1220] transition-colors" style={SF}>
                Take Diagnostic Test
              </Link>
            )}
          </div>
          {diagnosticScore && (
            <div className="mt-3 ml-9 flex items-center gap-3">
              <span className="text-2xl font-bold text-[#7c1c2e]" style={SE}>{diagnosticScore.scaledScore}</span>
              <span className="text-xs text-[#6b6b6b]" style={SF}>Scaled Score</span>
              <span className={`ml-1 rounded px-2 py-0.5 text-xs font-bold ${diagnosticScore.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`} style={SF}>
                {diagnosticScore.passed ? 'PASS' : 'NOT YET'}
              </span>
            </div>
          )}
          {!diagnosticDone && module1Done && (
            <p className="mt-2 text-xs text-[#6b6b6b] ml-9" style={SF}>See exactly where you stand before you start studying.</p>
          )}
        </div>

        {/* ── Practice Tests ── */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#6b6b6b]" style={SF}>Practice Tests</p>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((num) => {
              const test = practiceTests[num - 1]
              const testId = test ? String(test._id) : null
              const isCompleted = testId ? completedPracticeIds.has(testId) : false
              const isBundleOnly = num > 2
              const isLocked = !diagnosticDone || (isBundleOnly && !isBundle)

              return (
                <div
                  key={num}
                  className={`rounded-xl border bg-white p-4 flex items-center justify-between ${isLocked ? 'opacity-60' : 'border-[#e8e0e2]'}`}
                >
                  <div className="flex items-center gap-3">
                    {isCompleted
                      ? <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white" style={SF}>✓</span>
                      : <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e8e0e2] text-xs font-bold text-[#6b6b6b]" style={SF}>{num}</span>
                    }
                    <div>
                      <p className="text-sm font-semibold text-[#1a1a1a]" style={SF}>Practice Test {num}</p>
                      {isBundleOnly && <p className="text-xs text-[#7c1c2e]" style={SF}>Bundle only</p>}
                    </div>
                  </div>
                  {isLocked ? (
                    <span className="text-lg">🔒</span>
                  ) : testId ? (
                    <Link
                      href={`/dashboard/${examCode}/practice-test/${testId}`}
                      className={`rounded px-4 py-1.5 text-xs font-semibold transition-colors ${isCompleted ? 'border border-[#7c1c2e] text-[#7c1c2e] hover:bg-[#faf8f5]' : 'bg-[#7c1c2e] text-white hover:bg-[#5a1220]'}`}
                      style={SF}
                    >
                      {isCompleted ? 'Retake' : 'Start Now'}
                    </Link>
                  ) : (
                    <span className="text-xs text-[#6b6b6b]" style={SF}>Coming soon</span>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Written Responses ── */}
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#6b6b6b]" style={SF}>AI-Graded Written Responses</p>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => {
              const cr = crs[num - 1]
              const crId = cr ? String(cr._id) : null
              const isCompleted = crId ? completedCRIds.has(crId) : false
              const isBundleOnly = num > 4
              const isLocked = !diagnosticDone || (isBundleOnly && !isBundle)

              return (
                <div
                  key={num}
                  className={`rounded-xl border bg-white p-4 flex items-center justify-between ${isLocked ? 'opacity-60' : 'border-[#e8e0e2]'}`}
                >
                  <div className="flex items-center gap-3">
                    {isCompleted
                      ? <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white" style={SF}>✓</span>
                      : <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e8e0e2] text-xs font-bold text-[#6b6b6b]" style={SF}>{num}</span>
                    }
                    <div>
                      <p className="text-sm font-semibold text-[#1a1a1a]" style={SF}>Written Response {num}</p>
                      {isBundleOnly && <p className="text-xs text-[#7c1c2e]" style={SF}>Bundle only</p>}
                    </div>
                  </div>
                  {isLocked ? (
                    <span className="text-lg">🔒</span>
                  ) : (
                    <Link
                      href={`/dashboard/${examCode}/cr`}
                      className={`rounded px-4 py-1.5 text-xs font-semibold transition-colors ${isCompleted ? 'border border-[#7c1c2e] text-[#7c1c2e] hover:bg-[#faf8f5]' : 'bg-[#7c1c2e] text-white hover:bg-[#5a1220]'}`}
                      style={SF}
                    >
                      {isCompleted ? 'Review' : 'Start Now'}
                    </Link>
                  )}
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
