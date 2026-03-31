'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface CR {
  _id: string
  crNumber: number
  crType: 'foundational_reading_skills' | 'reading_comprehension'
  prompt: string
  scenarioContext?: string
  bundleOnly: boolean
}

interface Attempt {
  _id: string
  score: 0 | 1 | 2
  performanceLevel: string
  wordCount: number
  feedback: string
  strengths: string[]
  improvements: string[]
  submittedAt: string
}

const PERFORMANCE_COLORS: Record<string, string> = {
  Thorough: '#16a34a',
  Adequate: '#ca8a04',
  Limited: '#ea580c',
  Weak: '#dc2626',
}

const CR_TYPE_LABELS: Record<string, string> = {
  foundational_reading_skills: 'Foundational Reading Skills',
  reading_comprehension: 'Reading Comprehension',
}

export default function CRPage() {
  const params = useParams()
  const examCode = params.examCode as string

  const [crs, setCrs] = useState<CR[]>([])
  const [selected, setSelected] = useState<CR | null>(null)
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [responseText, setResponseText] = useState('')
  const [grading, setGrading] = useState(false)
  const [result, setResult] = useState<Attempt | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/cr?examCode=${examCode}`)
      .then((r) => r.json())
      .then((d) => { setCrs(d.crs || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [examCode])

  async function selectCR(cr: CR) {
    setSelected(cr)
    setResponseText('')
    setResult(null)
    setError('')
    const res = await fetch(`/api/cr/${cr._id}`)
    const data = await res.json()
    setAttempts(data.attempts || [])
  }

  async function handleGrade() {
    if (!selected || !responseText.trim()) return
    setGrading(true)
    setError('')
    try {
      const res = await fetch(`/api/cr/${selected._id}/grade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responseText }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data)
      setAttempts((prev) => [{ ...data, submittedAt: new Date().toISOString(), responseText } as Attempt, ...prev])
    } catch {
      setError('Failed to grade response. Please try again.')
    }
    setGrading(false)
  }

  const wordCount = responseText.trim().split(/\s+/).filter(Boolean).length

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f5]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e8e0e2] border-t-[#7c1c2e]" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <div className="bg-[#7c1c2e] px-6 py-6">
        <div className="mx-auto max-w-5xl">
          <Link href={`/dashboard/${examCode}`} className="text-sm text-[#e8b4bc] hover:text-white" style={{ fontFamily: 'var(--font-sans)' }}>
            ← Back to Dashboard
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>
            Written Response Practice
          </h1>
          <p className="mt-1 text-sm text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>
            Type your response. Get scored 0–2 with AI feedback — same rubric as the real exam.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* CR List */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
              {crs.length} Prompts Available
            </p>
            <div className="mt-3 space-y-2">
              {crs.map((cr) => {
                return (
                  <button
                    key={cr._id}
                    onClick={() => selectCR(cr)}
                    className={`w-full rounded-lg border-2 p-4 text-left transition-colors ${
                      selected?._id === cr._id
                        ? 'border-[#7c1c2e] bg-[#f9f0f2]'
                        : 'border-[#e8e0e2] bg-white hover:border-[#7c1c2e]'
                    }`}
                  >
                    <p className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
                      Written Response {cr.crNumber}
                    </p>
                    <p className="mt-0.5 text-xs text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
                      {CR_TYPE_LABELS[cr.crType]}
                    </p>
                    {cr.bundleOnly && (
                      <span className="mt-1 inline-block rounded bg-[#7c1c2e] px-2 py-0.5 text-[10px] font-semibold text-white">Bundle</span>
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {/* CR Practice Area */}
          <div className="lg:col-span-2">
            {!selected ? (
              <div className="flex h-64 items-center justify-center rounded-lg border border-[#e8e0e2] bg-white">
                <p className="text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                  Select a written response prompt to begin
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="rounded-lg border border-[#e8e0e2] bg-white p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
                    Written Response {selected.crNumber} — {CR_TYPE_LABELS[selected.crType]}
                  </p>
                  {selected.scenarioContext && (
                    <div className="mt-4 rounded border-l-4 border-[#7c1c2e] bg-[#faf8f5] p-4">
                      <p className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>Scenario</p>
                      <p className="mt-1 text-sm leading-relaxed text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
                        {selected.scenarioContext}
                      </p>
                    </div>
                  )}
                  <p className="mt-4 font-semibold leading-relaxed text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)', fontSize: '16px' }}>
                    {selected.prompt}
                  </p>
                </div>

                {/* Response area */}
                {!result ? (
                  <div className="rounded-lg border border-[#e8e0e2] bg-white p-6">
                    <p className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>Your Response</p>
                    <p className="mt-1 text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                      Write a thorough, developed response. Address all parts of the prompt with specific strategies and examples.
                    </p>
                    <textarea
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      disabled={grading}
                      className="mt-3 w-full rounded border border-[#e8e0e2] p-4 text-sm text-[#1a1a1a] outline-none focus:border-[#7c1c2e] focus:ring-1 focus:ring-[#7c1c2e] disabled:opacity-60"
                      style={{ fontFamily: 'var(--font-sans)', minHeight: '280px', resize: 'vertical' }}
                      placeholder="Write your response here..."
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <span className={`text-xs font-semibold ${wordCount >= 150 ? 'text-green-600' : 'text-[#6b6b6b]'}`} style={{ fontFamily: 'var(--font-sans)' }}>
                        {wordCount} words {wordCount >= 150 ? '✓' : '(aim for 150+)'}
                      </span>
                    </div>
                    {error && (
                      <p className="mt-3 rounded bg-red-50 px-4 py-2.5 text-sm text-red-700" style={{ fontFamily: 'var(--font-sans)' }}>{error}</p>
                    )}
                    <button
                      onClick={handleGrade}
                      disabled={grading || !responseText.trim()}
                      className="mt-4 w-full rounded bg-[#7c1c2e] py-3.5 text-sm font-semibold text-white hover:bg-[#5a1220] disabled:opacity-60"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {grading ? 'Grading your response...' : 'Submit for Grading'}
                    </button>
                  </div>
                ) : (
                  /* Results */
                  <div className="rounded-lg border border-[#e8e0e2] bg-white p-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>Your Score</p>
                      <div className="flex items-center gap-3">
                        <span
                          className="text-3xl font-bold"
                          style={{ fontFamily: 'var(--font-serif)', color: PERFORMANCE_COLORS[result.performanceLevel] || '#1a1a1a' }}
                        >
                          {result.score} / 2
                        </span>
                        <span
                          className="rounded-full px-3 py-1 text-sm font-bold text-white"
                          style={{ fontFamily: 'var(--font-sans)', backgroundColor: PERFORMANCE_COLORS[result.performanceLevel] || '#1a1a1a' }}
                        >
                          {result.performanceLevel}
                        </span>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
                      {result.feedback}
                    </p>
                    {result.strengths.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-widest text-green-700" style={{ fontFamily: 'var(--font-sans)' }}>Strengths</p>
                        <ul className="mt-2 space-y-1">
                          {result.strengths.map((s, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
                              <span className="text-green-600">✓</span>{s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {result.improvements.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>To Improve</p>
                        <ul className="mt-2 space-y-1">
                          {result.improvements.map((s, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
                              <span className="text-[#7c1c2e]">→</span>{s}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    <button
                      onClick={() => { setResult(null); setResponseText('') }}
                      className="mt-6 rounded border-2 border-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-[#7c1c2e] hover:bg-[#f9f0f2]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      Try Again
                    </button>
                  </div>
                )}

                {/* Previous attempts */}
                {attempts.length > 0 && !result && (
                  <div className="rounded-lg border border-[#e8e0e2] bg-white p-6">
                    <p className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
                      Previous Attempts ({attempts.length})
                    </p>
                    <div className="mt-3 space-y-2">
                      {attempts.slice(0, 3).map((a, i) => (
                        <div key={i} className="flex items-center justify-between rounded border border-[#e8e0e2] px-4 py-2.5">
                          <p className="text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                            {new Date(a.submittedAt).toLocaleDateString()}
                          </p>
                          <span
                            className="text-sm font-bold"
                            style={{ fontFamily: 'var(--font-sans)', color: PERFORMANCE_COLORS[a.performanceLevel] || '#1a1a1a' }}
                          >
                            {a.score}/2 — {a.performanceLevel}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
