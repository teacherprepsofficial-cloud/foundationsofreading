'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import DashboardHeader from '@/components/dashboard-header'

interface Question {
  _id: string
  questionText: string
  options: { label: string; text: string }[]
  subarea: string
  subareaName: string
  stimulus?: string
}

interface CompletedData {
  testId: string
  attemptId: string
  scaledScore: number
  passed: boolean
}

export default function DiagnosticPage() {
  const params = useParams()
  const router = useRouter()
  const examCode = params.examCode as string

  const [phase, setPhase] = useState<'checking' | 'intro' | 'test' | 'cr' | 'submitting'>('checking')
  const [completed, setCompleted] = useState<CompletedData | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [attemptId, setAttemptId] = useState<string | null>(null)
  const [testId, setTestId] = useState<string | null>(null)
  const [responses, setResponses] = useState<Record<string, string>>({})
  const [currentQ, setCurrentQ] = useState(0)
  const [timeLeft, setTimeLeft] = useState(45 * 60) // 45 min for diagnostic
  const [crResponse, setCrResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // On mount: check if diagnostic was already completed
  useEffect(() => {
    async function checkStatus() {
      try {
        const res = await fetch(`/api/practice-tests/diagnostic?examCode=${examCode}&check=true`)
        const data = await res.json()
        if (data.status === 'completed') {
          // Store results in localStorage so results page can read them
          localStorage.setItem('for_test_results', JSON.stringify({
            ...data.attempt,
            questionsWithAnswers: data.questionsWithAnswers,
            responses: data.attempt.responses,
            testName: 'Diagnostic Practice Test',
            submittedAt: data.attempt.submittedAt,
          }))
          setCompleted({
            testId: data.test._id,
            attemptId: data.attempt._id,
            scaledScore: data.attempt.scaledScore,
            passed: data.attempt.passed,
          })
          setPhase('intro') // show intro with completed state
        } else {
          setPhase('intro')
        }
      } catch {
        setPhase('intro')
      }
    }
    checkStatus()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (phase !== 'test') return
    const interval = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(interval)
          handleSubmitMC(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  async function startTest() {
    setLoading(true)
    try {
      // Find the diagnostic test
      const res = await fetch(`/api/practice-tests/diagnostic?examCode=${examCode}`)
      const data = await res.json()
      if (!data.test) throw new Error('Diagnostic not found')
      setTestId(data.test._id)
      setAttemptId(data.attempt._id)
      setQuestions(data.questions)
      setPhase('test')
    } catch {
      setError('Failed to load diagnostic. Please refresh and try again.')
    }
    setLoading(false)
  }

  async function handleSubmitMC(autoSubmit = false) {
    if (!autoSubmit && Object.keys(responses).length < questions.length) {
      if (!confirm('You have unanswered questions. Submit anyway?')) return
    }
    setPhase('cr')
  }

  async function handleFinalSubmit() {
    if (!crResponse.trim()) {
      setError('Please write your response before submitting.')
      return
    }
    setLoading(true)
    try {
      const responseArray = questions.map((q) => ({
        questionId: q._id,
        selectedAnswer: responses[q._id] || null,
        timeSpent: 0,
        isMarked: false,
      }))

      const res = await fetch(`/api/practice-tests/${testId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          attemptId,
          responses: responseArray,
          timeSpentSeconds: 45 * 60 - timeLeft,
          crResponse,
        }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)

      localStorage.setItem('for_test_results', JSON.stringify({
        ...data.results,
        questionsWithAnswers: data.questionsWithAnswers,
        responses: data.responses,
        testName: 'Diagnostic Practice Test',
        submittedAt: new Date().toISOString(),
      }))
      router.push(`/dashboard/${examCode}/practice-test/${testId}/results?attemptId=${attemptId}&diagnostic=true`)
    } catch {
      setError('Failed to submit. Please try again.')
    }
    setLoading(false)
  }

  const fmt = (s: number) => `${Math.floor(s / 60).toString().padStart(2, '0')}:${(s % 60).toString().padStart(2, '0')}`
  const q = questions[currentQ]

  // Loading/checking state
  if (phase === 'checking') {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <DashboardHeader />
        <div className="flex items-center justify-center py-32">
          <p className="text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Loading…</p>
        </div>
      </div>
    )
  }

  // Intro screen
  if (phase === 'intro') {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <DashboardHeader />
        <div className="bg-[#7c1c2e] px-6 py-6">
          <div className="mx-auto max-w-3xl">
            <Link href={`/dashboard/${examCode}`} className="text-sm text-[#e8b4bc] hover:text-white" style={{ fontFamily: 'var(--font-sans)' }}>← Back to Dashboard</Link>
            <h1 className="mt-2 text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>Module 2: Diagnostic Practice Test</h1>
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-6 py-10">
          {completed ? (
            /* Already completed — show score + options */
            <div className="rounded-lg border border-[#e8e0e2] bg-white p-8">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <span className="text-green-700 font-bold text-lg">✓</span>
                </div>
                <div>
                  <p className="font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)', fontSize: '18px' }}>Diagnostic Complete</p>
                  <p className="text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>You have already taken the diagnostic.</p>
                </div>
              </div>
              <div className="mt-6 flex items-center gap-4 rounded-lg bg-[#f9f0f2] px-5 py-4">
                <p className="text-3xl font-bold text-[#7c1c2e]" style={{ fontFamily: 'var(--font-serif)' }}>{completed.scaledScore}</p>
                <span
                  className={`rounded px-3 py-1 text-xs font-bold ${completed.passed ? 'bg-green-600 text-white' : 'bg-[#7c1c2e] text-white'}`}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {completed.passed ? 'PASSED' : 'NOT YET'}
                </span>
              </div>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  onClick={() => router.push(`/dashboard/${examCode}/practice-test/${completed.testId}/results?attemptId=${completed.attemptId}&diagnostic=true`)}
                  className="flex-1 rounded bg-[#7c1c2e] py-3 text-sm font-semibold text-white hover:bg-[#5a1220]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  View Full Results
                </button>
                <button
                  onClick={() => { setCompleted(null); startTest() }}
                  disabled={loading}
                  className="flex-1 rounded border border-[#e8e0e2] bg-white py-3 text-sm font-semibold text-[#6b6b6b] hover:border-[#7c1c2e] disabled:opacity-60"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {loading ? 'Loading…' : 'Retake Diagnostic'}
                </button>
              </div>
              {error && <p className="mt-4 rounded bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>}
            </div>
          ) : (
            /* Not yet taken */
            <div className="rounded-lg border border-[#e8e0e2] bg-white p-8">
              <h2 className="text-xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>Before you start</h2>
              <div className="mt-4 space-y-3 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                <p>This diagnostic test has <strong className="text-[#1a1a1a]">25 multiple-choice questions + 1 written response</strong>, distributed across all 4 subareas.</p>
                <p>Time allowed: <strong className="text-[#1a1a1a]">45 minutes</strong></p>
                <p>After completing the diagnostic, your full study program will unlock and you&apos;ll see a breakdown of your performance by subarea — so you know exactly where to focus your studying.</p>
                <p>Take this seriously. The more honestly you perform, the more useful your diagnostic results will be.</p>
              </div>
              {error && <p className="mt-4 rounded bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>}
              <button
                onClick={startTest}
                disabled={loading}
                className="mt-6 w-full rounded bg-[#7c1c2e] py-3.5 text-sm font-semibold text-white hover:bg-[#5a1220] disabled:opacity-60"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {loading ? 'Loading...' : 'Start Diagnostic Test'}
              </button>
            </div>
          )}
        </div>
      </div>
    )
  }

  // Written Response phase
  if (phase === 'cr') {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <DashboardHeader />
        <div className="bg-[#7c1c2e] px-6 py-4">
          <div className="mx-auto max-w-3xl flex items-center justify-between">
            <p className="font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>Written Response</p>
            <p className="text-sm text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>MC Complete — now complete your written response</p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl px-6 py-8">
          <div className="rounded-lg border border-[#e8e0e2] bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Written Response Item</p>
            <p className="mt-3 font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)', fontSize: '16px' }}>
              A first-grade teacher notices that several students struggle to blend phonemes when reading unfamiliar words.
              Describe two evidence-based instructional strategies the teacher could use to develop phonemic awareness and phonics skills in these students.
              For each strategy, explain how it would be implemented and why it is effective for early readers.
            </p>
            <p className="mt-3 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
              Write a thorough response of at least 150 words. Address all parts of the prompt.
            </p>
            <textarea
              value={crResponse}
              onChange={(e) => setCrResponse(e.target.value)}
              className="mt-4 w-full rounded border border-[#e8e0e2] p-4 text-sm text-[#1a1a1a] outline-none focus:border-[#7c1c2e] focus:ring-1 focus:ring-[#7c1c2e]"
              style={{ fontFamily: 'var(--font-sans)', minHeight: '280px', resize: 'vertical' }}
              placeholder="Write your response here..."
            />
            <div className="mt-2 flex justify-between text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
              <span>{crResponse.trim().split(/\s+/).filter(Boolean).length} words</span>
              <span>Minimum: 150 words recommended</span>
            </div>
            {error && <p className="mt-3 rounded bg-red-50 px-4 py-2.5 text-sm text-red-700">{error}</p>}
            <button
              onClick={handleFinalSubmit}
              disabled={loading}
              className="mt-4 w-full rounded bg-[#7c1c2e] py-3.5 text-sm font-semibold text-white hover:bg-[#5a1220] disabled:opacity-60"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {loading ? 'Submitting...' : 'Submit Diagnostic'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Test screen
  if (!q) return <div className="p-10 text-center">Loading...</div>

  const answered = Object.keys(responses).length
  const urgent = timeLeft < 300

  return (
    <div className="flex min-h-screen flex-col bg-[#faf8f5]">
      {/* Top bar */}
      <div className="bg-[#7c1c2e] px-4 py-3">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <p className="text-sm font-semibold text-white" style={{ fontFamily: 'var(--font-sans)' }}>Diagnostic Test</p>
          <div className="flex items-center gap-6">
            <p className="text-sm text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>{currentQ + 1} / {questions.length}</p>
            <p className={`font-bold tabular-nums ${urgent ? 'text-yellow-300' : 'text-white'}`} style={{ fontFamily: 'var(--font-sans)' }}>
              {fmt(timeLeft)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Question */}
        <div className="flex-1 p-6">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
              Subarea {q.subarea} — {q.subareaName}
            </p>
            {q.stimulus && (
              <div
                className="mb-4 rounded border border-[#c8c0c4] bg-[#fdfcfb] p-4 text-sm text-[#1a1a1a]"
                style={{ fontFamily: 'var(--font-sans)' }}
                dangerouslySetInnerHTML={{ __html: q.stimulus }}
              />
            )}
            <p className="mt-3 text-lg font-semibold text-[#1a1a1a] leading-relaxed" style={{ fontFamily: 'var(--font-serif)' }}>
              {q.questionText}
            </p>
            <div className="mt-6 space-y-3">
              {q.options.map((opt) => {
                const selected = responses[q._id] === opt.label
                return (
                  <button
                    key={opt.label}
                    onClick={() => setResponses((r) => ({ ...r, [q._id]: opt.label }))}
                    className={`w-full rounded-lg border-2 p-4 text-left text-sm transition-colors ${
                      selected
                        ? 'border-[#7c1c2e] bg-[#f9f0f2] font-semibold text-[#7c1c2e]'
                        : 'border-[#e8e0e2] bg-white text-[#1a1a1a] hover:border-[#7c1c2e]'
                    }`}
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    <span className="mr-3 font-bold">{opt.label}.</span>{opt.text}
                  </button>
                )
              })}
            </div>
            <div className="mt-6 flex justify-between">
              <button onClick={() => setCurrentQ((i) => Math.max(0, i - 1))} disabled={currentQ === 0}
                className="rounded border border-[#e8e0e2] bg-white px-6 py-2.5 text-sm font-semibold text-[#6b6b6b] disabled:opacity-40 hover:border-[#7c1c2e]"
                style={{ fontFamily: 'var(--font-sans)' }}>← Previous</button>
              {currentQ < questions.length - 1 ? (
                <button onClick={() => setCurrentQ((i) => i + 1)}
                  className="rounded bg-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220]"
                  style={{ fontFamily: 'var(--font-sans)' }}>Next →</button>
              ) : (
                <button onClick={() => handleSubmitMC(false)}
                  className="rounded bg-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220]"
                  style={{ fontFamily: 'var(--font-sans)' }}>Continue to Written Response →</button>
              )}
            </div>
          </div>
        </div>

        {/* Question palette */}
        <div className="w-full border-t border-[#e8e0e2] bg-white p-4 lg:w-48 lg:border-l lg:border-t-0">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Questions ({answered}/{questions.length})</p>
          <div className="grid grid-cols-5 gap-1.5 lg:grid-cols-4">
            {questions.map((q_, i) => (
              <button
                key={q_._id}
                onClick={() => setCurrentQ(i)}
                className={`flex h-8 w-8 items-center justify-center rounded text-xs font-semibold transition-colors ${
                  i === currentQ
                    ? 'bg-[#7c1c2e] text-white'
                    : responses[q_._id]
                    ? 'bg-[#f9f0f2] text-[#7c1c2e] border border-[#7c1c2e]'
                    : 'bg-[#f5f5f5] text-[#6b6b6b]'
                }`}
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
