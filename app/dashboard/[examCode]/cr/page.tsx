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

const PERF_COLOR: Record<string, string> = {
  Thorough: '#16a34a',
  Adequate: '#ca8a04',
  Limited: '#ea580c',
  Weak: '#dc2626',
}

const TYPE_LABEL: Record<string, string> = {
  foundational_reading_skills: 'Foundational Reading Skills',
  reading_comprehension: 'Reading Comprehension',
}

const SF = { fontFamily: 'var(--font-sans)' }
const SE = { fontFamily: 'var(--font-serif)' }

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
      setAttempts((prev) => [{ ...data, submittedAt: new Date().toISOString() } as Attempt, ...prev])
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
    <div className="flex h-screen flex-col overflow-hidden bg-[#faf8f5]">

      {/* ── Top bar ───────────────────────────────────────────── */}
      <div className="flex-shrink-0 bg-[#7c1c2e] px-6 py-4 flex items-center gap-6">
        <Link href={`/dashboard/${examCode}`} className="text-sm text-[#e8b4bc] hover:text-white transition-colors" style={SF}>
          ← Back to Dashboard
        </Link>
        <div className="border-l border-[#a04060] pl-6">
          <h1 className="text-lg font-bold text-white leading-none" style={SE}>Written Response Practice</h1>
          <p className="mt-0.5 text-xs text-[#e8b4bc]" style={SF}>Read the scenario. Type your response. Get scored by AI — same rubric as the real exam.</p>
        </div>
      </div>

      {/* ── Body: sidebar + content ───────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Sidebar */}
        <aside className="w-64 flex-shrink-0 overflow-y-auto border-r border-[#e8e0e2] bg-white">
          <div className="px-4 py-4 border-b border-[#e8e0e2]">
            <p className="text-[11px] font-bold uppercase tracking-widest text-[#6b6b6b]" style={SF}>
              {crs.length} Prompts Available
            </p>
          </div>
          <nav className="py-2">
            {crs.map((cr) => {
              const active = selected?._id === cr._id
              return (
                <button
                  key={cr._id}
                  onClick={() => selectCR(cr)}
                  className="w-full text-left px-4 py-3.5 transition-colors relative"
                  style={{
                    background: active ? '#f9f0f2' : 'transparent',
                    borderLeft: active ? '3px solid #7c1c2e' : '3px solid transparent',
                  }}
                >
                  <p className="text-sm font-semibold text-[#1a1a1a] leading-none" style={SF}>
                    Written Response {cr.crNumber}
                  </p>
                  <p className="mt-1 text-[11px] text-[#7c1c2e]" style={SF}>
                    {TYPE_LABEL[cr.crType]}
                  </p>
                  {cr.bundleOnly && (
                    <span className="mt-1.5 inline-block rounded bg-[#7c1c2e] px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white" style={SF}>
                      Bundle
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {!selected ? (
            <div className="flex h-full items-center justify-center">
              <div className="text-center">
                <p className="text-2xl mb-3" style={SE}>←</p>
                <p className="text-[#6b6b6b] text-sm" style={SF}>Select a prompt from the left to begin</p>
              </div>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto px-8 py-8 space-y-6">

              {/* Prompt header */}
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#7c1c2e]" style={SF}>
                  Written Response {selected.crNumber} — {TYPE_LABEL[selected.crType]}
                </p>
              </div>

              {/* Scenario / exhibits */}
              {selected.scenarioContext && (
                <div className="rounded-xl border border-[#e8e0e2] bg-white overflow-hidden shadow-sm">
                  <div className="bg-[#7c1c2e] px-5 py-3">
                    <p className="text-[11px] font-bold uppercase tracking-widest text-white" style={SF}>Student Scenario &amp; Exhibits</p>
                  </div>
                  <div className="p-6">
                    <pre className="text-sm leading-7 text-[#1a1a1a] whitespace-pre-wrap break-words" style={SF}>
                      {selected.scenarioContext}
                    </pre>
                  </div>
                </div>
              )}

              {/* Assignment */}
              <div className="rounded-xl border border-[#e8e0e2] bg-white p-6 shadow-sm">
                <p className="text-[11px] font-bold uppercase tracking-widest text-[#7c1c2e] mb-4" style={SF}>Assignment</p>
                <div className="text-sm leading-relaxed text-[#1a1a1a] whitespace-pre-wrap" style={SF}>
                  {selected.prompt}
                </div>
              </div>

              {/* Response or result */}
              {!result ? (
                <div className="rounded-xl border border-[#e8e0e2] bg-white p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-semibold text-[#1a1a1a]" style={SF}>Your Response</p>
                    <span className={`text-xs font-semibold ${wordCount >= 150 ? 'text-green-600' : 'text-[#6b6b6b]'}`} style={SF}>
                      {wordCount} words {wordCount >= 150 ? '✓' : '· aim for 150–300'}
                    </span>
                  </div>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    disabled={grading}
                    className="w-full rounded-lg border border-[#e8e0e2] bg-[#faf8f5] p-4 text-sm text-[#1a1a1a] leading-relaxed outline-none focus:border-[#7c1c2e] focus:ring-1 focus:ring-[#7c1c2e] disabled:opacity-60 resize-y"
                    style={{ ...SF, minHeight: '300px' }}
                    placeholder="Write your response here…"
                  />
                  {error && (
                    <p className="mt-3 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700" style={SF}>{error}</p>
                  )}
                  <button
                    onClick={handleGrade}
                    disabled={grading || !responseText.trim()}
                    className="mt-4 w-full rounded-lg bg-[#7c1c2e] py-3.5 text-sm font-semibold text-white hover:bg-[#5a1220] disabled:opacity-50 transition-colors"
                    style={SF}
                  >
                    {grading ? 'Grading your response…' : 'Submit for Grading'}
                  </button>
                </div>
              ) : (
                <div className="rounded-xl border border-[#e8e0e2] bg-white p-6 shadow-sm space-y-5">
                  {/* Score */}
                  <div className="flex items-center gap-4">
                    <span className="text-5xl font-bold" style={{ ...SE, color: PERF_COLOR[result.performanceLevel] || '#1a1a1a' }}>
                      {result.score}/2
                    </span>
                    <div>
                      <span className="inline-block rounded-full px-3 py-1 text-sm font-bold text-white" style={{ ...SF, backgroundColor: PERF_COLOR[result.performanceLevel] || '#1a1a1a' }}>
                        {result.performanceLevel}
                      </span>
                      <p className="mt-1 text-xs text-[#6b6b6b]" style={SF}>{result.wordCount} words</p>
                    </div>
                  </div>

                  {/* Feedback */}
                  <p className="text-sm leading-relaxed text-[#1a1a1a] border-t border-[#e8e0e2] pt-5" style={SF}>{result.feedback}</p>

                  {/* Strengths */}
                  {result.strengths.length > 0 && (
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-green-700 mb-2" style={SF}>Strengths</p>
                      <ul className="space-y-1.5">
                        {result.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#1a1a1a]" style={SF}>
                            <span className="text-green-600 flex-shrink-0">✓</span>{s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Improvements */}
                  {result.improvements.length > 0 && (
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#7c1c2e] mb-2" style={SF}>To Improve</p>
                      <ul className="space-y-1.5">
                        {result.improvements.map((s, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-[#1a1a1a]" style={SF}>
                            <span className="text-[#7c1c2e] flex-shrink-0">→</span>{s}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button
                    onClick={() => { setResult(null); setResponseText('') }}
                    className="rounded-lg border-2 border-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-[#7c1c2e] hover:bg-[#f9f0f2] transition-colors"
                    style={SF}
                  >
                    Try Again
                  </button>
                </div>
              )}

              {/* Previous attempts */}
              {attempts.length > 0 && !result && (
                <div className="rounded-xl border border-[#e8e0e2] bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold text-[#1a1a1a] mb-3" style={SF}>Previous Attempts ({attempts.length})</p>
                  <div className="space-y-2">
                    {attempts.slice(0, 5).map((a, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border border-[#e8e0e2] px-4 py-2.5">
                        <p className="text-sm text-[#6b6b6b]" style={SF}>{new Date(a.submittedAt).toLocaleDateString()}</p>
                        <span className="text-sm font-bold" style={{ ...SF, color: PERF_COLOR[a.performanceLevel] || '#1a1a1a' }}>
                          {a.score}/2 — {a.performanceLevel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}
        </main>
      </div>
    </div>
  )
}
