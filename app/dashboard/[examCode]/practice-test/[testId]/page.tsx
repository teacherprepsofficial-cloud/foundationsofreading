'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'

// ── Types ─────────────────────────────────────────────────────────────────────

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

interface IRRWord {
  text: string
  student?: string
  mark?: 'sub' | 'omit' | 'insert' | 'sc' | 'rep' | 'lp' | 'sp' | 'told'
}

type IExhibit =
  | { exhibitType: 'teacher_record'; title: string; context: string; lines: IRRWord[][] }
  | { exhibitType: 'fluency_rubric'; title: string; context: string; rows: { label: string; score: string; sub?: boolean }[]; benchmark: string }
  | { exhibitType: 'anecdotal'; title: string; context: string; notes: { label: string; text: string }[] }
  | { exhibitType: 'word_list'; title: string; context: string; groups: { groupLabel: string; rows: { word: string; response: string; correct: boolean }[] }[] }
  | { exhibitType: 'passage'; title: string; passageTitle: string; text: string }
  | { exhibitType: 'written_response'; title: string; context: string; items: { question: string; response: string; correct?: boolean }[] }

interface CRPrompt {
  promptNumber: 1 | 2
  crType: 'foundational_reading_skills' | 'reading_comprehension'
  objective: string
  objectiveIntro: string
  assignmentIntro: string
  assignmentParts: string[]
  citeNote: string
  exhibits: IExhibit[]
}

interface TestData {
  _id: string
  name: string
  timeLimitMinutes: number
  isDiagnostic: boolean
  crPrompts?: CRPrompt[]
}

// ── Exhibit Renderers ─────────────────────────────────────────────────────────

const SF = { fontFamily: 'var(--font-sans)' }
const SERIF = { fontFamily: 'var(--font-serif)' }

function TeacherRecordExhibit({ exhibit }: { exhibit: Extract<IExhibit, { exhibitType: 'teacher_record' }> }) {
  const key = [
    { sym: 'word above', meaning: 'Substitution' },
    { sym: '○', meaning: 'Omission' },
    { sym: '^word', meaning: 'Insertion' },
    { sym: 'SC', meaning: 'Self-correction' },
    { sym: '←', meaning: 'Repetition' },
    { sym: '‖', meaning: 'Long pause' },
    { sym: '|', meaning: 'Short pause' },
    { sym: 'T', meaning: 'Told by teacher' },
  ]
  return (
    <div>
      <p className="text-sm text-[#6b6b6b] mb-3 leading-relaxed" style={SF}>{exhibit.context}</p>
      <div className="mb-3 rounded border border-[#e8e0e2] bg-[#fafafa] px-3 py-2">
        <p className="text-xs font-bold uppercase tracking-wide text-[#6b6b6b] mb-1.5" style={SF}>Key</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          {key.map(k => (
            <span key={k.sym} className="text-xs text-[#6b6b6b]" style={SF}>
              <span className="font-bold font-mono">{k.sym}</span> = {k.meaning}
            </span>
          ))}
        </div>
      </div>
      <div className="rounded border border-[#e8e0e2] bg-white p-4">
        {exhibit.lines.map((line, li) => (
          <div key={li} className="flex flex-wrap items-end gap-x-1 mb-4 last:mb-0">
            {line.map((word, wi) => {
              const isPause = word.mark === 'lp' || word.mark === 'sp'
              const isRep = word.mark === 'rep'
              return (
                <span key={wi} className="inline-flex items-end gap-0.5">
                  {isPause && (
                    <span className="text-xs text-blue-500 self-end mb-0.5 font-mono" style={SF}>
                      {word.mark === 'lp' ? '‖' : '|'}
                    </span>
                  )}
                  <span className="inline-flex flex-col items-center">
                    {/* Annotation above */}
                    <span
                      className={`text-xs leading-none min-h-[14px] ${
                        word.mark === 'sub' ? 'text-red-600 font-mono' :
                        word.mark === 'sc' ? 'text-orange-500 font-mono' :
                        word.mark === 'insert' ? 'text-purple-600 font-mono' :
                        word.mark === 'told' ? 'text-blue-600 font-bold' :
                        word.mark === 'omit' ? 'text-[#6b6b6b]' : ''
                      }`}
                      style={SF}
                    >
                      {word.mark === 'sub' ? (word.student ?? '') : ''}
                      {word.mark === 'sc' ? (word.student ?? '') : ''}
                      {word.mark === 'insert' ? `^${word.student ?? ''}` : ''}
                      {word.mark === 'told' ? 'T' : ''}
                    </span>
                    {/* Word */}
                    <span
                      className={`text-sm font-serif leading-snug ${
                        word.mark === 'omit' ? 'border border-[#1a1a1a] rounded-full px-1' :
                        word.mark === 'sc' ? 'text-green-700' : 'text-[#1a1a1a]'
                      }`}
                    >
                      {word.text}
                    </span>
                  </span>
                  {isRep && (
                    <span className="text-xs text-blue-500 self-end mb-0.5 font-mono" style={SF}>←</span>
                  )}
                </span>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

function FluencyRubricExhibit({ exhibit }: { exhibit: Extract<IExhibit, { exhibitType: 'fluency_rubric' }> }) {
  return (
    <div>
      <p className="text-sm text-[#6b6b6b] mb-3 leading-relaxed" style={SF}>{exhibit.context}</p>
      <table className="sg-table w-full mb-2">
        <thead>
          <tr>
            <th style={SF}>Indicator</th>
            <th style={SF}>Score</th>
          </tr>
        </thead>
        <tbody>
          {exhibit.rows.map((row, i) => (
            <tr key={i}>
              <td className={row.sub ? 'pl-6' : ''} style={SF}>
                {row.sub ? `• ${row.label}` : row.label}
              </td>
              <td style={SF}>{row.score || <span className="text-[#e8e0e2]">—</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="text-center text-xs text-[#6b6b6b] border border-[#e8e0e2] rounded py-2" style={SF}>
        <strong>Note:</strong> {exhibit.benchmark}
      </div>
    </div>
  )
}

function AnecdotalExhibit({ exhibit }: { exhibit: Extract<IExhibit, { exhibitType: 'anecdotal' }> }) {
  return (
    <div>
      <p className="text-sm text-[#6b6b6b] mb-3 leading-relaxed" style={SF}>{exhibit.context}</p>
      <div className="space-y-3">
        {exhibit.notes.map((note, i) => (
          <div key={i} className="rounded border border-[#e8e0e2] bg-white p-3">
            <p className="text-xs font-bold text-[#7c1c2e] mb-1" style={SF}>{note.label}</p>
            <p className="text-sm text-[#1a1a1a] leading-relaxed" style={SF}>{note.text}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function WordListExhibit({ exhibit }: { exhibit: Extract<IExhibit, { exhibitType: 'word_list' }> }) {
  return (
    <div>
      <p className="text-sm text-[#6b6b6b] mb-3 leading-relaxed" style={SF}>{exhibit.context}</p>
      <div className="space-y-4">
        {exhibit.groups.map((group, gi) => {
          const correct = group.rows.filter(r => r.correct).length
          return (
            <div key={gi}>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-xs font-bold text-[#1a1a1a]" style={SF}>{group.groupLabel}</p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${correct === group.rows.length ? 'bg-green-100 text-green-700' : correct === 0 ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'}`} style={SF}>
                  {correct}/{group.rows.length}
                </span>
              </div>
              <table className="sg-table w-full">
                <thead>
                  <tr>
                    <th style={SF}>Word</th>
                    <th style={SF}>Student Read</th>
                    <th style={SF}>Correct?</th>
                  </tr>
                </thead>
                <tbody>
                  {group.rows.map((row, ri) => (
                    <tr key={ri}>
                      <td className="font-mono" style={SF}>{row.word}</td>
                      <td className={`font-mono ${!row.correct ? 'text-red-600' : ''}`} style={SF}>{row.response}</td>
                      <td style={SF}>{row.correct ? <span className="text-green-600 font-bold">✓</span> : <span className="text-red-600 font-bold">✗</span>}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PassageExhibit({ exhibit }: { exhibit: Extract<IExhibit, { exhibitType: 'passage' }> }) {
  return (
    <div className="rounded border border-[#e8e0e2] bg-white p-5">
      <p className="text-xs font-bold uppercase tracking-wide text-[#6b6b6b] mb-1" style={SF}>{exhibit.title.replace(/^Exhibit \d+ — /, '')}</p>
      <p className="text-base font-bold text-[#1a1a1a] mb-3" style={SERIF}>{exhibit.passageTitle}</p>
      <p className="text-sm text-[#1a1a1a] leading-[1.8]" style={SERIF}>{exhibit.text}</p>
    </div>
  )
}

function WrittenResponseExhibit({ exhibit }: { exhibit: Extract<IExhibit, { exhibitType: 'written_response' }> }) {
  return (
    <div>
      <p className="text-sm text-[#6b6b6b] mb-3 leading-relaxed" style={SF}>{exhibit.context}</p>
      <div className="space-y-3">
        {exhibit.items.map((item, i) => (
          <div key={i} className="rounded border border-[#e8e0e2] bg-white p-4">
            <p className="text-xs font-bold text-[#6b6b6b] mb-1" style={SF}>{item.question}</p>
            <p className="text-sm text-[#1a1a1a] leading-relaxed italic" style={SF}>&ldquo;{item.response}&rdquo;</p>
            {item.correct !== undefined && (
              <p className={`mt-1 text-xs font-bold ${item.correct ? 'text-green-600' : 'text-[#6b6b6b]'}`} style={SF}>
                {item.correct ? '✓ Addresses the question' : '— Partial or surface-level response'}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ExhibitRenderer({ exhibit }: { exhibit: IExhibit }) {
  return (
    <div className="rounded-lg border border-[#e8e0e2] bg-[#faf8f5] overflow-hidden">
      <div className="bg-[#f0eaec] border-b border-[#e8e0e2] px-4 py-2">
        <p className="text-xs font-bold text-[#7c1c2e] uppercase tracking-wide" style={SF}>{exhibit.title}</p>
      </div>
      <div className="p-4">
        {exhibit.exhibitType === 'teacher_record' && <TeacherRecordExhibit exhibit={exhibit} />}
        {exhibit.exhibitType === 'fluency_rubric' && <FluencyRubricExhibit exhibit={exhibit} />}
        {exhibit.exhibitType === 'anecdotal' && <AnecdotalExhibit exhibit={exhibit} />}
        {exhibit.exhibitType === 'word_list' && <WordListExhibit exhibit={exhibit} />}
        {exhibit.exhibitType === 'passage' && <PassageExhibit exhibit={exhibit} />}
        {exhibit.exhibitType === 'written_response' && <WrittenResponseExhibit exhibit={exhibit} />}
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────────────

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

  // MC state
  const [currentIndex, setCurrentIndex] = useState(0)
  const [responses, setResponses] = useState<Record<string, string | null>>({})
  const [marked, setMarked] = useState<Set<string>>(new Set())

  // Phase / CR state
  const [phase, setPhase] = useState<'mc' | 'cr'>('mc')
  const [crStep, setCrStep] = useState<0 | 1 | 2 | 3>(0)
  const [cr1Response, setCr1Response] = useState('')
  const [cr2Response, setCr2Response] = useState('')

  // UI state
  const [timeLeft, setTimeLeft] = useState(0)
  const [submitting, setSubmitting] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [autoSubmitting, setAutoSubmitting] = useState(false)

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startTimeRef = useRef<number>(Date.now())
  const hasSubmittedRef = useRef(false)

  // Load test
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

        const init: Record<string, string | null> = {}
        for (const q of data.questions) init[q._id] = null
        if (data.attempt.responses?.length) {
          for (const r of data.attempt.responses) init[r.questionId] = r.selectedAnswer
        }
        setResponses(init)

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
        questionId, selectedAnswer, timeSpent: 0, isMarked: marked.has(questionId),
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
            ...(hasCRPrompts ? {
              cr1Response: cr1Response.trim() || undefined,
              cr2Response: cr2Response.trim() || undefined,
            } : {}),
          }),
        })

        if (!res.ok) {
          hasSubmittedRef.current = false
          setSubmitting(false); setAutoSubmitting(false)
          setError('Submission failed. Please try again.')
          return
        }

        const data = await res.json()
        try {
          localStorage.setItem('for_test_results', JSON.stringify({
            ...data.results,
            questionsWithAnswers: data.questionsWithAnswers,
            responses: data.responses,
            testName: test?.name,
            submittedAt: new Date().toISOString(),
          }))
        } catch { /* not critical */ }

        router.push(`/dashboard/${examCode}/practice-test/${testId}/results?attemptId=${data.results.attemptId}`)
      } catch {
        hasSubmittedRef.current = false
        setSubmitting(false); setAutoSubmitting(false)
        setError('Submission failed. Please check your connection and try again.')
      }
    },
    [responses, marked, cr1Response, cr2Response, attemptId, testId, examCode, router, test]
  )

  // Timer
  useEffect(() => {
    if (!test || loading) return
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current!); submitTest(true); return 0 }
        return prev - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [test, loading])

  function formatTime(s: number) {
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`
  }

  function enterCR(step: 0 | 1 | 2 | 3 = 0) {
    setPhase('cr')
    setCrStep(step)
  }

  const answeredCount = Object.values(responses).filter(v => v !== null).length
  const hasCRPrompts = !!(test?.crPrompts && test.crPrompts.length > 0)
  const cr1Words = cr1Response.trim().split(/\s+/).filter(Boolean).length
  const cr2Words = cr2Response.trim().split(/\s+/).filter(Boolean).length

  // ── Loading / Error / AutoSubmit ───────────────────────────────────────────

  if (loading) return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf8f5]">
      <p className="text-[#6b6b6b]" style={SF}>Loading test…</p>
    </div>
  )

  if (error) return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f5] px-4 text-center">
      <p className="text-xl font-bold text-[#1a1a1a]" style={SERIF}>Something went wrong</p>
      <p className="mt-2 text-[#6b6b6b]" style={SF}>{error}</p>
      <button onClick={() => router.push(`/dashboard/${examCode}/practice-tests`)} className="mt-6 rounded bg-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220]" style={SF}>
        Back to Practice Tests
      </button>
    </div>
  )

  if (autoSubmitting) return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f5] px-4 text-center">
      <p className="text-xl font-bold text-[#1a1a1a]" style={SERIF}>Time&apos;s up — submitting your test…</p>
      <p className="mt-2 text-[#6b6b6b]" style={SF}>Please wait while we grade your responses.</p>
    </div>
  )

  if (!test || questions.length === 0) return null

  const isTimeLow = timeLeft < 300
  const cr1 = test.crPrompts?.find(p => p.promptNumber === 1)
  const cr2 = test.crPrompts?.find(p => p.promptNumber === 2)

  // ── Shared Top Bar ─────────────────────────────────────────────────────────

  function TopBar({ centerText, children }: { centerText: string; children: React.ReactNode }) {
    return (
      <div className="sticky top-0 z-20 border-b border-[#e8e0e2] bg-white shadow-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className={`text-lg font-bold tabular-nums ${isTimeLow ? 'text-red-600' : 'text-[#1a1a1a]'}`} style={SF}>
              {formatTime(timeLeft)}
            </span>
            {isTimeLow && <span className="text-xs font-semibold text-red-600" style={SF}>TIME LOW</span>}
          </div>
          <div className="text-center">
            <p className="text-xs font-semibold text-[#6b6b6b]" style={SF}>{test.name}</p>
            <p className="text-xs text-[#6b6b6b]" style={SF}>{centerText}</p>
          </div>
          <div className="flex items-center gap-2">{children}</div>
        </div>
        <div className="h-1 w-full bg-[#e8e0e2]">
          <div className="h-full bg-[#7c1c2e] transition-all" style={{ width: phase === 'cr' ? '100%' : `${((currentIndex + 1) / questions.length) * 100}%` }} />
        </div>
      </div>
    )
  }

  // ── Submit Confirm Dialog ──────────────────────────────────────────────────

  function SubmitConfirm() {
    if (!showConfirm) return null
    return (
      <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 px-4">
        <div className="w-full max-w-md rounded-xl border border-[#e8e0e2] bg-white p-8 shadow-xl">
          <p className="text-xl font-bold text-[#1a1a1a]" style={SERIF}>Submit Test?</p>
          <p className="mt-2 text-sm text-[#6b6b6b]" style={SF}>
            You have answered {answeredCount} of {questions.length} multiple-choice questions.{' '}
            {answeredCount < questions.length && (
              <span className="font-semibold text-[#7c1c2e]">{questions.length - answeredCount} unanswered. </span>
            )}
            {hasCRPrompts && (
              <span>Written responses: WR1 ({cr1Words} words), WR2 ({cr2Words} words). </span>
            )}
            Once submitted, you cannot change your answers.
          </p>
          <div className="mt-6 flex gap-3">
            <button onClick={() => setShowConfirm(false)} className="flex-1 rounded border border-[#e8e0e2] bg-white py-2.5 text-sm font-semibold text-[#6b6b6b] hover:border-[#7c1c2e] transition-colors" style={SF}>
              Go Back
            </button>
            <button onClick={() => { setShowConfirm(false); submitTest(false) }} disabled={submitting} className="flex-1 rounded bg-[#7c1c2e] py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220] disabled:opacity-50 transition-colors" style={SF}>
              {submitting ? 'Submitting…' : 'Yes, Submit'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── CR Phase ───────────────────────────────────────────────────────────────

  if (phase === 'cr') {
    // Step 0: Instructions overview
    if (crStep === 0) return (
      <div className="flex min-h-screen flex-col bg-[#faf8f5]">
        <TopBar centerText="Written Response">
          <button onClick={() => setPhase('mc')} className="rounded border border-[#e8e0e2] px-3 py-1.5 text-xs font-semibold text-[#6b6b6b] hover:border-[#7c1c2e] transition-colors" style={SF}>← MC Questions</button>
          <button onClick={() => setShowConfirm(true)} disabled={submitting} className="rounded bg-[#7c1c2e] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#5a1220] disabled:opacity-50 transition-colors" style={SF}>Submit Test</button>
        </TopBar>
        <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-12">
          <div className="rounded-xl border border-[#e8e0e2] bg-white p-10 shadow-sm">
            <p className="text-xs font-bold uppercase tracking-widest text-[#7c1c2e] mb-4" style={SF}>Written Response Section</p>
            <h1 className="text-2xl font-bold text-[#1a1a1a] mb-6" style={SERIF}>This section of the practice test contains:</h1>
            <ul className="space-y-3 mb-8">
              {[
                'Test directions for the open-response item assignments',
                'Two open-response item assignments',
                'Student exhibits you will need to complete each assignment',
                'A response box for each written assignment',
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full bg-[#f9f0f2] flex items-center justify-center text-xs font-bold text-[#7c1c2e]" style={SF}>{i + 1}</span>
                  <span className="text-sm text-[#1a1a1a] leading-relaxed" style={SF}>{item}</span>
                </li>
              ))}
            </ul>
            <button onClick={() => setCrStep(1)} className="w-full rounded bg-[#7c1c2e] py-3 text-sm font-semibold text-white hover:bg-[#5a1220] transition-colors" style={SF}>
              Next →
            </button>
          </div>
        </div>
        <SubmitConfirm />
      </div>
    )

    // Step 1: Test Directions
    if (crStep === 1) return (
      <div className="flex min-h-screen flex-col bg-[#faf8f5]">
        <TopBar centerText="Written Response — Directions">
          <button onClick={() => setPhase('mc')} className="rounded border border-[#e8e0e2] px-3 py-1.5 text-xs font-semibold text-[#6b6b6b] hover:border-[#7c1c2e] transition-colors" style={SF}>← MC Questions</button>
          <button onClick={() => setShowConfirm(true)} disabled={submitting} className="rounded bg-[#7c1c2e] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#5a1220] disabled:opacity-50 transition-colors" style={SF}>Submit Test</button>
        </TopBar>
        <div className="mx-auto w-full max-w-2xl flex-1 px-4 py-10">
          <div className="rounded-xl border border-[#e8e0e2] bg-white p-8 shadow-sm space-y-5">
            <h2 className="text-xl font-bold text-[#1a1a1a]" style={SERIF}>Test Directions for Open-Response Item Assignments</h2>
            <p className="text-sm text-[#1a1a1a] leading-relaxed" style={SF}>
              This section contains two open-response item assignments. Write a response of approximately 150–300 words for each assignment. Use your time to plan, write, review, and edit your response. You must respond to both assignments.
            </p>
            <p className="text-sm text-[#1a1a1a] leading-relaxed" style={SF}>
              For each assignment, read the topic and directions carefully before you begin. Think about how you will organize your response before writing.
            </p>
            <div className="rounded border border-[#e8e0e2] bg-[#faf8f5] p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-[#6b6b6b] mb-3" style={SF}>Your response will be evaluated on four criteria:</p>
              <div className="space-y-2">
                {[
                  ['PURPOSE', 'The extent to which the response achieves the purpose of the assignment'],
                  ['SUBJECT KNOWLEDGE', 'The appropriateness and accuracy of your application of subject knowledge'],
                  ['SUPPORT', 'The quality and relevance of your supporting evidence, including specific references to the exhibits'],
                  ['RATIONALE', 'The soundness of your reasoning and the depth of your understanding of the subject area'],
                ].map(([label, desc]) => (
                  <div key={label} className="flex gap-2">
                    <span className="text-xs font-bold text-[#7c1c2e] min-w-[130px]" style={SF}>{label}:</span>
                    <span className="text-xs text-[#6b6b6b] leading-relaxed" style={SF}>{desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-sm text-[#1a1a1a] leading-relaxed" style={SF}>
              Your responses must demonstrate an understanding of the knowledge of the field. You are expected to demonstrate depth of understanding by applying your knowledge rather than merely reciting factual information. Your responses should be written for an audience of educators in this field.
            </p>
            <p className="text-sm text-[#1a1a1a] leading-relaxed" style={SF}>
              Be sure to write about the assigned topics and respond in your own words. Your responses should be your original work.
            </p>
            <div className="flex gap-3 pt-2">
              <button onClick={() => setCrStep(0)} className="flex-1 rounded border border-[#e8e0e2] bg-white py-2.5 text-sm font-semibold text-[#6b6b6b] hover:border-[#7c1c2e] transition-colors" style={SF}>← Back</button>
              <button onClick={() => setCrStep(2)} className="flex-1 rounded bg-[#7c1c2e] py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220] transition-colors" style={SF}>Begin Assignment 1 →</button>
            </div>
          </div>
        </div>
        <SubmitConfirm />
      </div>
    )

    // Steps 2 & 3: CR Assignment cards
    const isCR2 = crStep === 3
    const crPrompt = isCR2 ? cr2 : cr1
    const crResponse = isCR2 ? cr2Response : cr1Response
    const setCRResponse = isCR2 ? setCr2Response : setCr1Response
    const wordCount = isCR2 ? cr2Words : cr1Words
    const itemNum = isCR2 ? 2 : 1

    return (
      <div className="flex min-h-screen flex-col bg-[#faf8f5]">
        <TopBar centerText={`Written Response — Assignment ${itemNum} of 2`}>
          <button onClick={() => setPhase('mc')} className="rounded border border-[#e8e0e2] px-3 py-1.5 text-xs font-semibold text-[#6b6b6b] hover:border-[#7c1c2e] transition-colors" style={SF}>← MC Questions</button>
          <button onClick={() => setShowConfirm(true)} disabled={submitting} className="rounded bg-[#7c1c2e] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#5a1220] disabled:opacity-50 transition-colors" style={SF}>Submit Test</button>
        </TopBar>

        <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 space-y-6">
          {/* Assignment header */}
          {crPrompt ? (
            <div className="rounded-xl border border-[#e8e0e2] bg-white p-6 shadow-sm space-y-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#7c1c2e]" style={SF}>Open-Response Item {itemNum}</p>
                <p className="text-sm font-semibold text-[#6b6b6b] mt-0.5" style={SF}>Objective {crPrompt.objective}</p>
              </div>
              <p className="text-sm text-[#1a1a1a] leading-relaxed" style={SF}>{crPrompt.objectiveIntro}</p>
              <div className="border-t border-[#e8e0e2] pt-3">
                <p className="text-sm font-bold text-[#1a1a1a] mb-2" style={SF}>Assignment</p>
                <p className="text-sm text-[#1a1a1a] leading-relaxed mb-3" style={SF}>Use the information in each Exhibit to complete the assignment below.</p>
                <p className="text-sm text-[#1a1a1a] leading-relaxed mb-3" style={SF}>{crPrompt.assignmentIntro}</p>
                <ul className="space-y-2 mb-3">
                  {crPrompt.assignmentParts.map((part, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <span className="flex-shrink-0 text-[#7c1c2e] text-sm mt-0.5">•</span>
                      <span className="text-sm text-[#1a1a1a] leading-relaxed" style={SF}>{part}{i < crPrompt.assignmentParts.length - 1 ? ';' : '.'}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm italic text-[#6b6b6b] leading-relaxed" style={SF}>{crPrompt.citeNote}</p>
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-[#e8e0e2] bg-white p-6 shadow-sm">
              <p className="text-sm text-[#6b6b6b]" style={SF}>Open-Response Item {itemNum}</p>
            </div>
          )}

          {/* Exhibits */}
          {crPrompt?.exhibits.map((exhibit, i) => (
            <ExhibitRenderer key={i} exhibit={exhibit} />
          ))}

          {/* Response textarea */}
          <div className="rounded-xl border border-[#e8e0e2] bg-white p-6 shadow-sm">
            <p className="text-sm font-bold text-[#1a1a1a] mb-3" style={SF}>Your Response</p>
            <textarea
              value={crResponse}
              onChange={e => setCRResponse(e.target.value)}
              placeholder="Type your response here…"
              rows={12}
              className="w-full rounded border border-[#e8e0e2] bg-[#faf8f5] p-4 text-sm text-[#1a1a1a] leading-relaxed resize-y focus:border-[#7c1c2e] focus:outline-none focus:ring-1 focus:ring-[#7c1c2e]"
              style={SF}
            />
            <p className={`mt-1.5 text-right text-xs ${wordCount >= 150 ? 'text-green-600 font-semibold' : 'text-[#6b6b6b]'}`} style={SF}>
              {wordCount} {wordCount === 1 ? 'word' : 'words'}{wordCount < 150 ? ' — aim for 150–300 words' : ' ✓'}
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-3 pb-10">
            <button onClick={() => setCrStep(isCR2 ? 2 : 1)} className="flex-1 rounded border border-[#e8e0e2] bg-white py-2.5 text-sm font-semibold text-[#6b6b6b] hover:border-[#7c1c2e] transition-colors" style={SF}>
              ← {isCR2 ? 'Assignment 1' : 'Directions'}
            </button>
            {isCR2 ? (
              <button onClick={() => setShowConfirm(true)} disabled={submitting} className="flex-1 rounded bg-[#7c1c2e] py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220] disabled:opacity-50 transition-colors" style={SF}>
                Submit Test
              </button>
            ) : (
              <button onClick={() => setCrStep(3)} className="flex-1 rounded bg-[#7c1c2e] py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220] transition-colors" style={SF}>
                Assignment 2 →
              </button>
            )}
          </div>
        </div>

        <SubmitConfirm />
      </div>
    )
  }

  // ── MC Phase ───────────────────────────────────────────────────────────────

  const currentQuestion = questions[currentIndex]
  const currentResponse = responses[currentQuestion._id]
  const isMarkedCurrent = marked.has(currentQuestion._id)
  const isLastMC = currentIndex === questions.length - 1

  function selectAnswer(answer: string) {
    setResponses(prev => ({ ...prev, [currentQuestion._id]: answer }))
  }
  function toggleMark() {
    setMarked(prev => {
      const next = new Set(prev)
      if (next.has(currentQuestion._id)) next.delete(currentQuestion._id)
      else next.add(currentQuestion._id)
      return next
    })
  }

  return (
    <div className="flex min-h-screen flex-col bg-[#faf8f5]">
      <TopBar centerText={`Question ${currentIndex + 1} of ${questions.length}`}>
        {hasCRPrompts && (
          <button onClick={() => enterCR(0)} className="rounded border border-[#e8e0e2] px-3 py-1.5 text-xs font-semibold text-[#6b6b6b] hover:border-[#7c1c2e] transition-colors" style={SF}>
            Written →
          </button>
        )}
        <button onClick={() => setShowConfirm(true)} disabled={submitting} className="rounded bg-[#7c1c2e] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#5a1220] disabled:opacity-50 transition-colors" style={SF}>
          Submit Test
        </button>
      </TopBar>

      <div className="mx-auto w-full max-w-3xl flex-1 px-4 py-8">
        {/* Subarea + mark */}
        <div className="mb-4 flex items-center justify-between">
          <span className="rounded-full bg-[#f9f0f2] px-3 py-1 text-xs font-semibold text-[#7c1c2e]" style={SF}>
            Subarea {currentQuestion.subarea} — {currentQuestion.subareaName}
          </span>
          <button
            onClick={toggleMark}
            className={`flex items-center gap-1.5 rounded border px-3 py-1.5 text-xs font-semibold transition-colors ${isMarkedCurrent ? 'border-yellow-400 bg-yellow-50 text-yellow-700' : 'border-[#e8e0e2] bg-white text-[#6b6b6b] hover:border-yellow-400 hover:text-yellow-700'}`}
            style={SF}
          >
            {isMarkedCurrent ? '★ Marked' : '☆ Mark for Review'}
          </button>
        </div>

        {/* Question card */}
        <div className="rounded-lg border border-[#e8e0e2] bg-white p-6 shadow-sm">
          {currentQuestion.stimulus && (
            <div className="mb-5 rounded border border-[#c8c0c4] bg-[#fdfcfb] p-4 text-sm text-[#1a1a1a]" style={SF} dangerouslySetInnerHTML={{ __html: currentQuestion.stimulus }} />
          )}
          <p className="leading-relaxed text-[#1a1a1a]" style={{ ...SF, fontSize: '15px' }}>
            {currentQuestion.questionText}
          </p>
          <div className="mt-6 space-y-3">
            {currentQuestion.options.map(opt => {
              const isSelected = currentResponse === opt.label
              return (
                <button
                  key={opt.label}
                  onClick={() => selectAnswer(opt.label)}
                  className={`flex w-full items-start gap-4 rounded-lg border p-4 text-left transition-colors ${isSelected ? 'border-[#7c1c2e] bg-[#7c1c2e] text-white' : 'border-[#e8e0e2] bg-white text-[#1a1a1a] hover:border-[#7c1c2e] hover:bg-[#f9f0f2]'}`}
                >
                  <span className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border text-sm font-bold ${isSelected ? 'border-white bg-white text-[#7c1c2e]' : 'border-[#e8e0e2] bg-[#f9f0f2] text-[#7c1c2e]'}`} style={SF}>
                    {opt.label}
                  </span>
                  <span className="flex-1 leading-relaxed" style={{ ...SF, fontSize: '14px' }}>{opt.text}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Nav buttons */}
        <div className="mt-6 flex items-center justify-between">
          <button onClick={() => setCurrentIndex(i => Math.max(0, i - 1))} disabled={currentIndex === 0} className="rounded border border-[#e8e0e2] bg-white px-6 py-2.5 text-sm font-semibold text-[#6b6b6b] disabled:opacity-40 hover:border-[#7c1c2e] transition-colors" style={SF}>
            ← Previous
          </button>
          <span className="text-sm text-[#6b6b6b]" style={SF}>{answeredCount} of {questions.length} answered</span>
          {isLastMC && hasCRPrompts ? (
            <button onClick={() => enterCR(0)} className="rounded bg-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220] transition-colors" style={SF}>
              Written Responses →
            </button>
          ) : (
            <button onClick={() => setCurrentIndex(i => Math.min(questions.length - 1, i + 1))} disabled={isLastMC} className="rounded border border-[#e8e0e2] bg-white px-6 py-2.5 text-sm font-semibold text-[#6b6b6b] disabled:opacity-40 hover:border-[#7c1c2e] transition-colors" style={SF}>
              Next →
            </button>
          )}
        </div>

        {/* Always-visible question navigator */}
        <div className="mt-8 rounded-lg border border-[#e8e0e2] bg-white p-4 shadow-sm">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold text-[#1a1a1a]" style={SF}>Question Navigator</p>
            <div className="flex flex-wrap gap-3 text-xs text-[#6b6b6b]" style={SF}>
              <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-[#7c1c2e] inline-block" /> Answered</span>
              <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full border-2 border-yellow-400 bg-yellow-50 inline-block" /> Marked</span>
              <span className="flex items-center gap-1"><span className="h-3 w-3 rounded-full bg-[#e8e0e2] inline-block" /> Unanswered</span>
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
                  className={`flex h-8 w-full items-center justify-center rounded text-xs font-bold transition-colors ${isCurrent ? 'ring-2 ring-[#7c1c2e] ring-offset-1' : ''} ${isMarkedQ ? 'border border-yellow-400 bg-yellow-50 text-yellow-700' : answered ? 'bg-[#7c1c2e] text-white' : 'bg-[#e8e0e2] text-[#6b6b6b] hover:bg-[#d0c8ca]'}`}
                  style={SF}
                >
                  {i + 1}
                </button>
              )
            })}
            {hasCRPrompts && (
              <>
                <button onClick={() => enterCR(2)} title="Written Response 1" className={`flex h-8 w-full items-center justify-center rounded text-xs font-bold transition-colors ${cr1Response.trim() ? 'bg-[#7c1c2e] text-white' : 'bg-[#e8e0e2] text-[#6b6b6b] hover:bg-[#d0c8ca]'}`} style={SF}>WR1</button>
                <button onClick={() => enterCR(3)} title="Written Response 2" className={`flex h-8 w-full items-center justify-center rounded text-xs font-bold transition-colors ${cr2Response.trim() ? 'bg-[#7c1c2e] text-white' : 'bg-[#e8e0e2] text-[#6b6b6b] hover:bg-[#d0c8ca]'}`} style={SF}>WR2</button>
              </>
            )}
          </div>
          <p className="mt-3 text-xs text-[#6b6b6b]" style={SF}>
            {answeredCount} of {questions.length} answered · {marked.size} marked for review
          </p>
        </div>
      </div>

      <SubmitConfirm />
    </div>
  )
}
