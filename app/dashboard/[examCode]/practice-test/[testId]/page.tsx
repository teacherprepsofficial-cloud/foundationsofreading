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

interface TestData {
  _id: string
  name: string
  timeLimitMinutes: number
  isDiagnostic: boolean
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
  const [currentIndex, setCurrentIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, string | null>>({})
  const [marked, setMarked] = useState<Set<string>>(new Set())
  const [timeLeft, setTimeLeft] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [showPalette, setShowPalette] = useState(false)
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
          if (res.status === 403) {
            setError('You do not have access to this test.')
          } else {
            setError('Failed to load test. Please try again.')
          }
          return
        }
        const data = await res.json()
        setTest(data.test)
        setQuestions(data.questions)
        setAttemptId(data.attempt._id)
        startTimeRef.current = Date.now()

        // Initialize responses from existing attempt (resume)
        const initialResponses: Record<string, string | null> = {}
        for (const q of data.questions) {
          initialResponses[q._id] = null
        }
        if (data.attempt.responses?.length) {
          for (const r of data.attempt.responses) {
            initialResponses[r.questionId] = r.selectedAnswer
          }
        }
        setResponses(initialResponses)

        // Set timer — subtract time already spent if resuming
        const limitSeconds = data.test.timeLimitMinutes * 60
        const alreadySpent = data.attempt.timeSpentSeconds || 0
        const remaining = Math.max(0, limitSeconds - alreadySpent)
        setTimeLeft(remaining)
      } catch {
        setError('Failed to load test. Please check your connection.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [testId])

  // Submit handler (extracted so timer can call it)
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

      try {
        const res = await fetch(`/api/practice-tests/${testId}/submit`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ attemptId, responses: responseArray, timeSpentSeconds }),
        })

        if (!res.ok) {
          hasSubmittedRef.current = false
          setSubmitting(false)
          setAutoSubmitting(false)
          setError('Submission failed. Please try again.')
          return
        }

        const data = await res.json()

        // Store results in localStorage for the results page
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

        router.push(
          `/dashboard/${examCode}/practice-test/${testId}/results?attemptId=${data.results.attemptId}`
        )
      } catch {
        hasSubmittedRef.current = false
        setSubmitting(false)
        setAutoSubmitting(false)
        setError('Submission failed. Please check your connection and try again.')
      }
    },
    [responses, marked, attemptId, testId, examCode, router, test]
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

    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f5]">
        <p className="text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
          Loading test…
        </p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f5] px-4 text-center">
        <p className="text-xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
          Something went wrong
        </p>
        <p className="mt-2 text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
          {error}
        </p>
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

  return (
    <div className="flex min-h-screen flex-col bg-[#faf8f5]">
      {/* Top bar */}
      <div className="sticky top-0 z-20 border-b border-[#e8e0e2] bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          {/* Timer */}
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

          {/* Center — exam name + progress */}
          <div className="text-center">
            <p className="text-xs font-semibold text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
              {test.name}
            </p>
            <p className="text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
              Question {currentIndex + 1} of {questions.length}
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowPalette((v) => !v)}
              className="rounded border border-[#e8e0e2] px-3 py-1.5 text-xs font-semibold text-[#6b6b6b] hover:border-[#7c1c2e] hover:text-[#7c1c2e] transition-colors"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Questions
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

        {/* Progress bar */}
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

          <button
            onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
            disabled={currentIndex === questions.length - 1}
            className="rounded border border-[#e8e0e2] bg-white px-6 py-2.5 text-sm font-semibold text-[#6b6b6b] disabled:opacity-40 hover:border-[#7c1c2e] transition-colors"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Next →
          </button>
        </div>
      </div>

      {/* Question Palette Drawer */}
      {showPalette && (
        <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40 sm:items-center">
          <div className="w-full max-w-lg rounded-t-xl border border-[#e8e0e2] bg-white p-6 shadow-xl sm:rounded-xl">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
                Question Navigator
              </p>
              <button
                onClick={() => setShowPalette(false)}
                className="text-[#6b6b6b] hover:text-[#1a1a1a] text-xl leading-none"
              >
                ×
              </button>
            </div>

            {/* Legend */}
            <div className="mb-4 flex flex-wrap gap-4 text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-4 w-4 rounded-full bg-[#7c1c2e]" /> Answered
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-4 w-4 rounded-full border-2 border-yellow-400 bg-yellow-50" /> Marked
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-4 w-4 rounded-full bg-[#e8e0e2]" /> Unanswered
              </span>
            </div>

            {/* Grid */}
            <div className="grid max-h-64 grid-cols-10 gap-1.5 overflow-y-auto">
              {questions.map((q, i) => {
                const answered = responses[q._id] !== null
                const isMarkedQ = marked.has(q._id)
                const isCurrent = i === currentIndex
                return (
                  <button
                    key={q._id}
                    onClick={() => {
                      setCurrentIndex(i)
                      setShowPalette(false)
                    }}
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                      isCurrent
                        ? 'ring-2 ring-offset-1 ring-[#7c1c2e]'
                        : ''
                    } ${
                      isMarkedQ
                        ? 'border-2 border-yellow-400 bg-yellow-50 text-yellow-700'
                        : answered
                        ? 'bg-[#7c1c2e] text-white'
                        : 'bg-[#e8e0e2] text-[#6b6b6b]'
                    }`}
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {i + 1}
                  </button>
                )
              })}
            </div>

            <p className="mt-4 text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
              {answeredCount} of {questions.length} answered · {marked.size} marked for review
            </p>
          </div>
        </div>
      )}

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
                onClick={() => {
                  setShowConfirm(false)
                  submitTest(false)
                }}
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
