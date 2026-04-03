'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface Option {
  label: 'A' | 'B' | 'C' | 'D'
  text: string
}

interface Question {
  _id: string
  questionText: string
  options: Option[]
  subarea: string
  subareaName: string
  stimulus?: string
}

interface CRPrompt {
  promptNumber: 1 | 2
  crType: 'foundational_reading_skills' | 'reading_comprehension'
  scenarioContext: string
  prompt: string
}

interface TestData {
  _id: string
  name: string
  timeLimitMinutes: number
  isDiagnostic: boolean
  crPrompts?: CRPrompt[]
}

export default function PracticeTestPage() {
  const params = useParams()
  const router = useRouter()
  const examCode = params.examCode as string
  const testId = params.testId as string

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [test, setTest] = useState<TestData | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [attemptId, setAttemptId] = useState<string>('')
  const [phase, setPhase] = useState<'mc' | 'cr'>('mc')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, string | null>>({})
  const [marked, setMarked] = useState<Set<string>>(new Set())
  const [cr1Response, setCr1Response] = useState('')
  const [cr2Response, setCr2Response] = useState('')
  const [timeLeft, setTimeLeft] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [autoSubmitting, setAutoSubmitting] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(Date.now())
  const hasSubmittedRef = useRef(false)

  // Load test data
  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/practice-tests/${testId}`)
        if (!res.ok) {
          setError(res.status === 403 ? 'You do not have access to this test.' : 'Failed to load test. Please try again.')
          return
        }
        const data = await res.json()
        setTest(data.test)
        setQuestions(data.questions)
        setAttemptId(data.attempt._id)
        startTimeRef.current = Date.now()

        const initialResponses: Record<string, string | null> = {}
        for (const q of data.questions) initialResponses[q._id] = null
        if (data.attempt.responses?.length) {
          for (const r of data.attempt.responses) initialResponses[r.questionId] = r.selectedAnswer
        }
        setResponses(initialResponses)

        const limitSeconds = data.test.timeLimitMinutes * 60
        const alreadySpent = data.attempt.timeSpentSeconds || 0
        setTimeLeft(Math.max(0, limitSeconds - alreadySpent))
      } catch {
        setError('Failed to load test. Please check your connection.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [testId])

  const submitTest = useCallback(
    async (isAutoSubmit = false) => {
      if (hasSubmittedRef.current) return
      hasSubmittedRef.current = true

      if (timerRef.current) clearInterval(timerRef.current)
      if (isAutoSubmit) setAutoSubmitting(true)
      else setSubmitting(true)

      const timeSpentSeconds = Math.round((Date.now() - startTimeRef.current) / 1000)
      const responseArray = Object.entries(responses).map(([questionId, selectedAnswer]) => ({
        questionId,
        selectedAnswer,
        timeSpent: 0,
        isMarked: marked.has(questionId),
      }))

      const hasCRPrompts = test?.crPrompts && test.crPrompts.length > 0

      try {
        const res = await fetch(`/api/practice-tests/${testId}/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            attemptId,
            responses: responseArray,
            timeSpentSeconds,
            ...(hasCRPrompts
              ? { cr1Response: cr1Response.trim() || undefined, cr2Response: cr2Response.trim() || undefined }
              : {}),
          }),
        })

        if (!res.ok) {
          hasSubmittedRef.current = false
          setSubmitting(false)
          setAutoSubmitting(false)
          setError('Submission failed. Please try again.')
          return
        }

        const data = await res.json()
        try {
          localStorage.setItem(
            'for_test_results',
            JSON.stringify({
              ...data.results,
              questionsWithAnswers: data.questionsWithAnswers,
              responses: data.responses,
              testName: test?.name,
              submittedAt: new Date().toISOString(),
            })
          )
        } catch {
          // localStorage write failed — not critical
        }

        router.push(`/dashboard/${examCode}/practice-test/${testId}/results?attemptId=${data.results.attemptId}`)
      } catch {
        hasSubmittedRef.current = false
        setSubmitting(false)
        setAutoSubmitting(false)
        setError('Submission failed. Please check your connection and try again.')
      }
    },
    [responses, marked, cr1Response, cr2Response, attemptId, testId, examCode, router, test]
  )

  // Countdown timer
  useEffect(() => {
    if (!test || loading) return
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!)
          submitTest(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test, loading])

  function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  function selectAnswer(answer: string) {
    const qId = questions[currentIndex]._id
    setResponses((prev) => ({ ...prev, [qId]: answer }))
  }

  function toggleMark() {
    const qId = questions[currentIndex]._id
    setMarked((prev) => {
      const next = new Set(prev)
      if (next.has(qId)) next.delete(qId)
      else next.add(qId)
      return next
    })
  }

  const answeredCount = Object.values(responses).filter((v) => v !== null).length
  const hasCRPrompts = test?.crPrompts && test.crPrompts.length > 0

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f5]">
        <p className="text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Loading test…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f5] px-4 text-center">
        <p className="text-xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>Something went wrong</p>
        <p className="mt-2 text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>{error}</p>
        <button
          onClick={() => router.push(`/dashboard/${examCode}/practice-tests`)}
          className="mt-6 rounded bg-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Back to Practice Tests
        </button>
      </div>
    )
  }

  if (autoSubmitting) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f5] px-4 text-center">
        <p className="text-xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
          Time&apos;s up — submitting your test…
        </p>
        <p className="mt-2 text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
          Please wait while we grade your responses.
        </p>
      </div>
    )
  }

  if (!test || questions.length === 0) return null

  const currentQuestion = questions[currentIndex]
  const currentResponse = responses[currentQuestion._id]
  const isMarkedCurrent = marked.has(currentQuestion._id)
  const isTimeLow = timeLeft < 300
  const isLastMCQuestion = currentIndex === questions.length - 1
  const cr1 = test.crPrompts?.find((p) => p.promptNumber === 1)
  const cr2 = test.crPrompts?.find((p) => p.promptNumber === 2)

  // ── CR Written Response Phase ──
  if (phase === 'cr') {
    const cr1Words = cr1Response.trim().split(/\s+/).filter(Boolean).length
    const cr2Words = cr2Response.trim().split(/\s+/).filter(Boolean).length

    return (
      <div className="flex min-h-screen flex-col bg-[#faf8f5]">
        {/* Top bar */}
        <div className="sticky top-0 z-20 border-b border-[#e8e0e2] bg-white shadow-sm">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
            <div className="flex items-center gap-2">
              <span
                className={`text-lg font-bold tabular-nums ${isTimeLow ? 'text-red-600' : 'text-[#1a1a1a]'}`}
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {formatTime(timeLeft)}
              </span>
              {isTimeLow && (
                <span className="text-xs font-semibold text-red-600" style={{ fontFamily: 'var(--font-sans)' }}>
                  TIME LOW
                </span>
              )}
            </div>

            <div className="text-center">
              <p className="text-xs font-semibold text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                {test.name}
              </p>
              <p className="text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                Written Response
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setPhase('mc')}
                className="rounded border border-[#e8e0e2] px-3 py-1.5 text-xs font-semibold text-[#6b6b6b] hover:border-[#7c1c2e] hover:text-[#7c1c2e] transition-colors"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                ← MC Questions
              </button>
              <button
                onClick={() => setShowConfirm(true)}
                disabled={submitting}
                className="rounded bg-[#7c1c2e] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#5a1220] disabled:opacity-50 transition-colors"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Submit Test
              </button>
            </div>
          </div>
          <div className="h-1 w-full bg-[#e8e0e2]">
            <div className="h-full bg-[#7c1c2e]" style={{ width: '100%' }} />
          </div>
        </div>

        <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 space-y-8">
          <div>
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
              Written Response Section
            </h2>
            <p className="text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
              This section contains two written assignments. Each is worth 10% of your total score. Aim for 150+ words per response.
            </p>
          </div>

          {/* CR 1 */}
          {cr1 && (
            <div className="rounded-lg border border-[#e8e0e2] bg-white shadow-sm overflow-hidden">
              <div className="bg-[#f9f0f2] border-b border-[#e8e0e2] px-6 py-3 flex items-center justify-between">
                <span className="text-sm font-bold text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
                  Written Assignment 1 of 2
                </span>
                <span className="text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                  {cr1.crType === 'foundational_reading_skills' ? 'Foundational Reading Skills' : 'Reading Comprehension'}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div
                  className="rounded border border-[#c8c0c4] bg-[#fdfcfb] p-4 text-sm text-[#1a1a1a] leading-relaxed"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  <p className="text-xs font-bold text-[#6b6b6b] uppercase tracking-wide mb-2">Scenario</p>
                  {cr1.scenarioContext}
                </div>
                <div
                  className="rounded border border-[#7c1c2e]/20 bg-[#f9f0f2] p-4 text-sm text-[#1a1a1a] leading-relaxed"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  <p className="text-xs font-bold text-[#7c1c2e] uppercase tracking-wide mb-2">Assignment</p>
                  {cr1.prompt}
                </div>
                <div>
                  <textarea
                    value={cr1Response}
                    onChange={(e) => setCr1Response(e.target.value)}
                    placeholder="Type your response here…"
                    rows={10}
                    className="w-full rounded border border-[#e8e0e2] bg-white p-4 text-sm text-[#1a1a1a] leading-relaxed resize-y focus:border-[#7c1c2e] focus:outline-none focus:ring-1 focus:ring-[#7c1c2e]"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  />
                  <p
                    className={`mt-1.5 text-right text-xs ${cr1Words >= 150 ? 'text-green-600 font-semibold' : 'text-[#6b6b6b]'}`}
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {cr1Words} {cr1Words === 1 ? 'word' : 'words'}{cr1Words < 150 ? ` — aim for 150+` : ' ✓'}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* CR 2 */}
          {cr2 && (
            <div className="rounded-lg border border-[#e8e0e2] bg-white shadow-sm overflow-hidden">
              <div className="bg-[#f9f0f2] border-b border-[#e8e0e2] px-6 py-3 flex items-center justify-between">
                <span className="text-sm font-bold text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
                  Written Assignment 2 of 2
                </span>
                <span className="text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                  {cr2.crType === 'foundational_reading_skills' ? 'Foundational Reading Skills' : 'Reading Comprehension'}
                </span>
              </div>
              <div className="p-6 space-y-4">
                <div
                  className="rounded border border-[#c8c0c4] bg-[#fdfcfb] p-4 text-sm text-[#1a1a1a] leading-relaxed"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  <p className="text-xs font-bold text-[#6b6b6b] uppercase tracking-wide mb-2">Scenario</p>
                  {cr2.scenarioContext}
                </div>
                <div
                  className="rounded border border-[#7c1c2e]/20 bg-[#f9f0f2] p-4 text-sm text-[#1a1a1a] leading-relaxed"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  <p className="text-xs font-bold text-[#7c1c2e] uppercase tracking-wide mb-2">Assignment</p>
                  {cr2.prompt}
                </div>
                <div>
                  <textarea
                    value={cr2Response}
                    onChange={(e) => setCr2Response(e.target.value)}
                    placeholder="Type your response here…"
                    rows={10}
                    className="w-full rounded border border-[#e8e0e2] bg-white p-4 text-sm text-[#1a1a1a] leading-relaxed resize-y focus:border-[#7c1c2e] focus:outline-none focus:ring-1 focus:ring-[#7c1c2e]"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  />
                  <p
                    className={`mt-1.5 text-right text-xs ${cr2Words >= 150 ? 'text-green-600 font-semibold' : 'text-[#6b6b6b]'}`}
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {cr2Words} {cr2Words === 1 ? 'word' : 'words'}{cr2Words < 150 ? ` — aim for 150+` : ' ✓'}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pb-8">
            <button
              onClick={() => setShowConfirm(true)}
              disabled={submitting}
              className="rounded bg-[#7c1c2e] px-8 py-3 text-sm font-semibold text-white hover:bg-[#5a1220] disabled:opacity-50 transition-colors"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Submit Test
            </button>
          </div>
        </div>

        {/* Submit Confirmation */}
        {showConfirm && (
          <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-xl border border-[#e8e0e2] bg-white p-8 shadow-xl">
              <p className="text-xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
                Submit Test?
              </p>
              <p className="mt-2 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                You have answered {answeredCount} of {questions.length} multiple-choice questions.
                {hasCRPrompts && (
                  <span>
                    {' '}Written responses: {cr1Words > 0 ? `WR1 (${cr1Words}w)` : 'WR1 blank'},{' '}
                    {cr2Words > 0 ? `WR2 (${cr2Words}w)` : 'WR2 blank'}.
                  </span>
                )}{' '}
                Once submitted, you cannot change your answers.
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 rounded border border-[#e8e0e2] bg-white py-2.5 text-sm font-semibold text-[#6b6b6b] hover:border-[#7c1c2e] transition-colors"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Go Back
                </button>
                <button
                  onClick={() => { setShowConfirm(false); submitTest(false) }}
                  disabled={submitting}
                  className="flex-1 rounded bg-[#7c1c2e] py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220] disabled:opacity-50 transition-colors"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {submitting ? 'Submitting…' : 'Yes, Submit'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // ── MC Phase ──
  return (
    <div className="flex min-h-screen flex-col bg-[#faf8f5]">
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b border-[#e8e0e2] bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-2">
            <span
              className={`text-lg font-bold tabular-nums ${isTimeLow ? 'text-red-600' : 'text-[#1a1a1a]'}`}
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {formatTime(timeLeft)}
            </span>
            {isTimeLow && (
              <span className="text-xs font-semibold text-red-600" style={{ fontFamily: 'var(--font-sans)' }}>
                TIME LOW
              </span>
            )}
          </div>

          <div className="text-center">
            <p className="text-xs font-semibold text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
              {test.name}
            </p>
            <p className="text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
              Question {currentIndex + 1} of {questions.length}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {hasCRPrompts ? (
              <button
                onClick={() => setPhase('cr')}
                className="rounded border border-[#e8e0e2] px-3 py-1.5 text-xs font-semibold text-[#6b6b6b] hover:border-[#7c1c2e] hover:text-[#7c1c2e] transition-colors"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Written →
              </button>
            ) : null}
            <button
              onClick={() => setShowConfirm(true)}
              disabled={submitting}
              className="rounded bg-[#7c1c2e] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#5a1220] disabled:opacity-50 transition-colors"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Submit Test
            </button>
          </div>
        </div>

        <div className="h-1 w-full bg-[#e8e0e2]">
          <div
            className="h-full bg-[#7c1c2e] transition-all"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question area */}
      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        {/* Subarea label + mark button */}
        <div className="mb-4 flex items-center justify-between">
          <span
            className="rounded-full bg-[#f9f0f2] px-3 py-1 text-xs font-semibold text-[#7c1c2e]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Subarea {currentQuestion.subarea} — {currentQuestion.subareaName}
          </span>
          <button
            onClick={toggleMark}
            className={`flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs font-semibold transition-colors ${
              isMarkedCurrent
                ? 'border-yellow-400 bg-yellow-50 text-yellow-700'
                : 'border-[#e8e0e2] bg-white text-[#6b6b6b] hover:border-yellow-400 hover:text-yellow-700'
            }`}
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {isMarkedCurrent ? '★ Marked' : '☆ Mark for Review'}
          </button>
        </div>

        {/* Question card */}
        <div className="rounded-lg border border-[#e8e0e2] bg-white p-6 shadow-sm">
          {currentQuestion.stimulus && (
            <div
              className="mb-5 rounded border border-[#c8c0c4] bg-[#fdfcfb] p-4 text-sm text-[#1a1a1a]"
              style={{ fontFamily: 'var(--font-sans)' }}
              dangerouslySetInnerHTML={{ __html: currentQuestion.stimulus }}
            />
          )}
          <p
            className="text-base leading-relaxed text-[#1a1a1a]"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '15px' }}
          >
            {currentQuestion.questionText}
          </p>

          <div className="mt-6 space-y-3">
            {currentQuestion.options.map((opt) => {
              const isSelected = currentResponse === opt.label
              return (
                <button
                  key={opt.label}
                  onClick={() => selectAnswer(opt.label)}
                  className={`flex w-full items-start gap-4 rounded-lg border p-4 text-left transition-colors ${
                    isSelected
                      ? 'border-[#7c1c2e] bg-[#7c1c2e] text-white'
                      : 'border-[#e8e0e2] bg-white text-[#1a1a1a] hover:border-[#7c1c2e] hover:bg-[#f9f0f2]'
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-sm font-bold ${
                      isSelected
                        ? 'border-white bg-white text-[#7c1c2e]'
                        : 'border-[#e8e0e2] bg-[#f9f0f2] text-[#7c1c2e]'
                    }`}
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {opt.label}
                  </span>
                  <span
                    className="flex-1 leading-relaxed"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '14px' }}
                  >
                    {opt.text}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            className="rounded border border-[#e8e0e2] bg-white px-6 py-2.5 text-sm font-semibold text-[#6b6b6b] disabled:opacity-40 hover:border-[#7c1c2e] transition-colors"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            ← Previous
          </button>

          <span className="text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            {answeredCount} of {questions.length} answered
          </span>

          {isLastMCQuestion && hasCRPrompts ? (
            <button
              onClick={() => setPhase('cr')}
              className="rounded bg-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220] transition-colors"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Written Responses →
            </button>
          ) : (
            <button
              onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
              disabled={isLastMCQuestion}
              className="rounded border border-[#e8e0e2] bg-white px-6 py-2.5 text-sm font-semibold text-[#6b6b6b] disabled:opacity-40 hover:border-[#7c1c2e] transition-colors"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Next →
            </button>
          )}
        </div>

        {/* Question navigator grid (always visible) */}
        <div className="mt-8 rounded-lg border border-[#e8e0e2] bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
              Question Navigator
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
              <span className="flex items-center gap-1">
                <span className="inline-block h-3 w-3 rounded-full bg-[#7c1c2e]" /> Answered
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-3 w-3 rounded-full border-2 border-yellow-400 bg-yellow-50" /> Marked
              </span>
              <span className="flex items-center gap-1">
                <span className="inline-block h-3 w-3 rounded-full bg-[#e8e0e2]" /> Unanswered
              </span>
            </div>
          </div>

          <div className="grid grid-cols-10 gap-1.5">
            {questions.map((q, i) => {
              const answered = responses[q._id] !== null
              const isMarkedQ = marked.has(q._id)
              const isCurrent = i === currentIndex
              return (
                <button
                  key={q._id}
                  onClick={() => setCurrentIndex(i)}
                  title={`Question ${i + 1}${isMarkedQ ? ' — Marked' : answered ? ' — Answered' : ' — Unanswered'}`}
                  className={`flex h-8 w-full items-center justify-center rounded text-xs font-bold transition-colors ${
                    isCurrent ? 'ring-2 ring-[#7c1c2e] ring-offset-1' : ''
                  } ${
                    isMarkedQ
                      ? 'border border-yellow-400 bg-yellow-50 text-yellow-700'
                      : answered
                      ? 'bg-[#7c1c2e] text-white'
                      : 'bg-[#e8e0e2] text-[#6b6b6b] hover:bg-[#d0c8ca]'
                  }`}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {i + 1}
                </button>
              )
            })}
            {hasCRPrompts && (
              <>
                <button
                  onClick={() => setPhase('cr')}
                  title="Written Response 1"
                  className={`flex h-8 w-full items-center justify-center rounded text-xs font-bold transition-colors ${
                    cr1Response.trim()
                      ? 'bg-[#7c1c2e] text-white'
                      : 'bg-[#e8e0e2] text-[#6b6b6b] hover:bg-[#d0c8ca]'
                  }`}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  WR1
                </button>
                <button
                  onClick={() => setPhase('cr')}
                  title="Written Response 2"
                  className={`flex h-8 w-full items-center justify-center rounded text-xs font-bold transition-colors ${
                    cr2Response.trim()
                      ? 'bg-[#7c1c2e] text-white'
                      : 'bg-[#e8e0e2] text-[#6b6b6b] hover:bg-[#d0c8ca]'
                  }`}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  WR2
                </button>
              </>
            )}
          </div>

          <p className="mt-3 text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            {answeredCount} of {questions.length} answered · {marked.size} marked for review
          </p>
        </div>
      </div>

      {/* Submit Confirmation Dialog */}
      {showConfirm && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-xl border border-[#e8e0e2] bg-white p-8 shadow-xl">
            <p className="text-xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
              Submit Test?
            </p>
            <p className="mt-2 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
              You have answered {answeredCount} of {questions.length} questions.{' '}
              {answeredCount < questions.length && (
                <span className="font-semibold text-[#7c1c2e]">
                  {questions.length - answeredCount} question{questions.length - answeredCount !== 1 ? 's' : ''} unanswered.
                </span>
              )}{' '}
              {hasCRPrompts && 'You have not completed the Written Response section. '}
              Once submitted, you cannot change your answers.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded border border-[#e8e0e2] bg-white py-2.5 text-sm font-semibold text-[#6b6b6b] hover:border-[#7c1c2e] transition-colors"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Go Back
              </button>
              <button
                onClick={() => { setShowConfirm(false); submitTest(false) }}
                disabled={submitting}
                className="flex-1 rounded bg-[#7c1c2e] py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220] disabled:opacity-50 transition-colors"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {submitting ? 'Submitting…' : 'Yes, Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
