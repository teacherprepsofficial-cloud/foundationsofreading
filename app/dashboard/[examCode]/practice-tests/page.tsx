import { redirect, notFound } from 'next/navigation'
import Link from 'next/link'
import { cookies } from 'next/headers'
import { getCurrentUser } from '@/lib/auth'

interface PracticeTest {
  _id: string
  testNumber: number
  name: string
  timeLimitMinutes: number
}

export default async function PracticeTestsPage({
  params,
}: {
  params: Promise<{ examCode: string }>
}) {
  const { examCode } = await params
  if (examCode !== '190' && examCode !== '890') notFound()

  const auth = await getCurrentUser()
  if (!auth) redirect('/login')

  // Fetch practice tests from API (server-side, pass cookie)
  const cookieStore = await cookies()
  const authCookie = cookieStore.get('for-auth')?.value

  let tests: PracticeTest[] = []
  let tier: 'starter' | 'bundle' = 'starter'
  let fetchError = false

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/practice-tests?examCode=${examCode}`,
      {
        headers: {
          Cookie: `for-auth=${authCookie}`,
        },
        cache: 'no-store',
      }
    )
    if (res.ok) {
      const data = await res.json()
      tests = data.tests || []
      // Infer tier from test count — 4 tests = bundle
      tier = tests.length > 2 ? 'bundle' : 'starter'
    } else if (res.status === 403) {
      redirect('/dashboard')
    } else {
      fetchError = true
    }
  } catch {
    fetchError = true
  }

  const maxTests = tier === 'bundle' ? 4 : 2

  // Build the full list (some may be locked if user has starter)
  const allSlots = [1, 2, 3, 4].map((num) => {
    const found = tests.find((t) => t.testNumber === num)
    const locked = num > maxTests
    return {
      testNumber: num,
      _id: found?._id,
      name: found?.name || `Practice Test ${num}`,
      timeLimitMinutes: found?.timeLimitMinutes || 240,
      locked,
      available: !!found && !locked,
    }
  })

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="bg-[#7c1c2e] px-6 py-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href={`/dashboard/${examCode}`}
            className="text-sm text-[#e8b4bc] hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            ← Back to Dashboard
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>
            Practice Tests
          </h1>
          <p className="mt-1 text-sm text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>
            Foundations of Reading Exam Preparation — 100 questions · 4 hours · scored on the 100–300 NES scale
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10">
        {fetchError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-sm text-red-700" style={{ fontFamily: 'var(--font-sans)' }}>
              Unable to load practice tests. Please refresh the page.
            </p>
          </div>
        )}

        {/* Info callout */}
        <div className="mb-8 rounded-lg border border-[#e8e0e2] bg-white px-6 py-5">
          <p className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
            How practice tests are scored
          </p>
          <p className="mt-1.5 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            Each test replicates the real NES exam format — 100 multiple-choice questions scored on the 100–300 scale. Passing score is 220. After completing a test, you receive a full subarea breakdown and can review every question with explanations.
          </p>
        </div>

        {/* Test list */}
        <div className="space-y-4">
          {allSlots.map((slot) => (
            <div
              key={slot.testNumber}
              className={`rounded-lg border bg-white ${
                slot.locked
                  ? 'border-[#e8e0e2] opacity-60'
                  : 'border-[#e8e0e2] hover:border-[#7c1c2e] transition-colors'
              }`}
            >
              <div className="flex items-center gap-5 p-6">
                {/* Number badge */}
                <span
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                    slot.locked
                      ? 'bg-[#e8e0e2] text-[#6b6b6b]'
                      : 'bg-[#f9f0f2] text-[#7c1c2e]'
                  }`}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {slot.testNumber}
                </span>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
                    {slot.name}
                  </p>
                  <p className="mt-0.5 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                    100 questions · {slot.timeLimitMinutes} minutes · 100–300 scale · Passing: 220
                  </p>
                  {slot.locked && (
                    <p className="mt-1.5 text-xs font-medium text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
                      🔒 Included in the Complete Bundle — upgrade to unlock
                    </p>
                  )}
                </div>

                {/* Action */}
                {slot.available && slot._id ? (
                  <Link
                    href={`/dashboard/${examCode}/practice-test/${slot._id}`}
                    className="flex-shrink-0 rounded bg-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220] transition-colors"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Start
                  </Link>
                ) : slot.locked ? (
                  <Link
                    href={`/#pricing`}
                    className="flex-shrink-0 rounded border border-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-[#7c1c2e] hover:bg-[#f9f0f2] transition-colors"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    Upgrade
                  </Link>
                ) : null}
              </div>
            </div>
          ))}
        </div>

        {/* Bundle upsell for starters */}
        {tier === 'starter' && (
          <div className="mt-8 rounded-lg border border-[#7c1c2e] bg-[#f9f0f2] px-6 py-5">
            <p className="font-semibold text-[#7c1c2e]" style={{ fontFamily: 'var(--font-serif)' }}>
              Want all 4 practice tests?
            </p>
            <p className="mt-1 text-sm text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
              Upgrade to the Complete Bundle to unlock Practice Tests 3 and 4, plus 8 AI-graded written response prompts.
            </p>
            <Link
              href={`/#pricing`}
              className="mt-4 inline-block rounded bg-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220] transition-colors"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Upgrade to Bundle
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
