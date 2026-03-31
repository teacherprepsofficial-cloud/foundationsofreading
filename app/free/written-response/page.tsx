'use client'

import { useState, useEffect } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const PROMPT = `A third-grade teacher notices that several students read words accurately but very slowly and without expression. The students can decode unfamiliar words using phonics, but they do not read fluently.

Describe TWO specific, evidence-based instructional strategies the teacher should use to develop oral reading fluency for these students. For each strategy:
• Name and describe the strategy
• Explain how it supports fluency development
• Describe how you would implement it in this classroom context`

const WORD_MIN = 150

const SCORE_LABELS: Record<number, { label: string; color: string; bg: string }> = {
  2: { label: 'Thorough', color: '#166534', bg: '#f0fdf4' },
  1: { label: 'Adequate', color: '#854d0e', bg: '#fefce8' },
  0: { label: 'Limited/Weak', color: '#991b1b', bg: '#fef2f2' },
}

interface GradeResult {
  score: number
  performanceLevel: string
  feedback: string
  strengths: string[]
  improvements: string[]
}

const FREE_KEY = 'for_free_wr_used'

export default function FreeWrittenResponsePage() {
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<GradeResult | null>(null)
  const [error, setError] = useState('')
  const [alreadyUsed, setAlreadyUsed] = useState(false)

  useEffect(() => {
    setAlreadyUsed(!!localStorage.getItem(FREE_KEY))
  }, [])

  const wordCount = response.trim().split(/\s+/).filter(Boolean).length

  async function handleSubmit() {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/free/grade-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: PROMPT, response }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to grade')
      setResult(data)
      localStorage.setItem(FREE_KEY, '1')
      setAlreadyUsed(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#faf8f5]">
        <div className="border-b border-[#e8e0e2] bg-white px-6 py-3 text-center">
          <p className="text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            One free AI grading — no login required.{' '}
            <a href="/#pricing" className="font-semibold text-[#7c1c2e] hover:underline">Get 4–8 graded responses →</a>
          </p>
        </div>

        <div className="mx-auto max-w-2xl px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Free Preview · One Use</p>
          <h1 className="mt-2 text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>AI-Graded Written Response</h1>
          <p className="mt-2 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            Type your response below. Our AI scores it 0–2 using the same rubric as the real NES exam.
          </p>

          {/* Prompt */}
          <div className="mt-7 rounded-lg border border-[#e8e0e2] bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Prompt</p>
            <div className="mt-3 space-y-3">
              {PROMPT.split('\n\n').map((para, i) => (
                <p key={i} className="text-sm leading-relaxed text-[#1a1a1a] whitespace-pre-wrap" style={{ fontFamily: 'var(--font-sans)' }}>{para}</p>
              ))}
            </div>
          </div>

          {/* Rubric reference */}
          <div className="mt-4 rounded-lg border border-[#e8e0e2] bg-[#faf8f5] p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Scoring Rubric</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {[['2 — Thorough', 'Demonstrates strong, accurate knowledge with specific, well-supported strategies'], ['1 — Adequate', 'Demonstrates adequate knowledge; strategies are relevant but may lack depth or specificity'], ['0 — Limited/Weak', 'Demonstrates limited knowledge; strategies are vague, inaccurate, or off-topic']].map(([label, desc]) => (
                <div key={label} className="rounded border border-[#e8e0e2] bg-white p-2.5">
                  <p className="text-xs font-bold text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>{label}</p>
                  <p className="mt-1 text-xs text-[#6b6b6b] leading-snug" style={{ fontFamily: 'var(--font-sans)' }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>

          {!result ? (
            <>
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>Your Response</label>
                  <span className={`text-xs ${wordCount >= WORD_MIN ? 'text-green-700' : 'text-[#6b6b6b]'}`} style={{ fontFamily: 'var(--font-sans)' }}>
                    {wordCount} words {wordCount < WORD_MIN ? `(min ${WORD_MIN})` : '✓'}
                  </span>
                </div>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  placeholder="Write your response here. Aim for 150–400 words. Address both strategies with specific detail."
                  rows={14}
                  disabled={alreadyUsed}
                  className="mt-2 w-full rounded-lg border border-[#e8e0e2] p-4 text-sm text-[#1a1a1a] outline-none focus:border-[#7c1c2e] focus:ring-1 focus:ring-[#7c1c2e] disabled:bg-[#faf8f5] disabled:text-[#6b6b6b]"
                  style={{ fontFamily: 'var(--font-sans)', resize: 'vertical' }}
                />
              </div>

              {error && <p className="mt-3 rounded bg-red-50 px-4 py-2.5 text-sm text-red-700" style={{ fontFamily: 'var(--font-sans)' }}>{error}</p>}

              {alreadyUsed ? (
                <div className="mt-4 rounded-xl border-2 border-[#7c1c2e] bg-white p-5 text-center">
                  <p className="font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>You&apos;ve used your free grading.</p>
                  <p className="mt-1 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Get 4–8 graded written responses with the full prep.</p>
                  <a href="/#pricing" className="mt-3 inline-block rounded bg-[#7c1c2e] px-8 py-3 text-sm font-semibold text-white hover:bg-[#5a1220]" style={{ fontFamily: 'var(--font-sans)' }}>
                    Get Full Access — $49
                  </a>
                </div>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading || wordCount < WORD_MIN}
                  className="mt-4 w-full rounded bg-[#7c1c2e] py-4 text-sm font-semibold text-white transition-colors hover:bg-[#5a1220] disabled:opacity-40"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {loading ? 'Grading with AI...' : wordCount < WORD_MIN ? `Write at least ${WORD_MIN} words (${wordCount}/${WORD_MIN})` : 'Submit for AI Grading'}
                </button>
              )}
            </>
          ) : (
            <div className="mt-6 space-y-4">
              {/* Score */}
              <div className="rounded-xl p-5 text-center" style={{ background: SCORE_LABELS[result.score]?.bg }}>
                <p className="text-4xl font-bold" style={{ fontFamily: 'var(--font-serif)', color: SCORE_LABELS[result.score]?.color }}>
                  {result.score} / 2
                </p>
                <p className="mt-1 text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', color: SCORE_LABELS[result.score]?.color }}>
                  {result.performanceLevel}
                </p>
              </div>

              {/* Feedback */}
              <div className="rounded-lg border border-[#e8e0e2] bg-white p-5">
                <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Overall Feedback</p>
                <p className="mt-2 text-sm leading-relaxed text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>{result.feedback}</p>
              </div>

              {result.strengths?.length > 0 && (
                <div className="rounded-lg border border-green-200 bg-green-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-green-800" style={{ fontFamily: 'var(--font-sans)' }}>Strengths</p>
                  <ul className="mt-2 space-y-1.5">
                    {result.strengths.map((s, i) => <li key={i} className="flex gap-2 text-sm text-green-900" style={{ fontFamily: 'var(--font-sans)' }}><span>✓</span>{s}</li>)}
                  </ul>
                </div>
              )}

              {result.improvements?.length > 0 && (
                <div className="rounded-lg border border-amber-200 bg-amber-50 p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-amber-800" style={{ fontFamily: 'var(--font-sans)' }}>Areas to Improve</p>
                  <ul className="mt-2 space-y-1.5">
                    {result.improvements.map((s, i) => <li key={i} className="flex gap-2 text-sm text-amber-900" style={{ fontFamily: 'var(--font-sans)' }}><span>→</span>{s}</li>)}
                  </ul>
                </div>
              )}

              <div className="rounded-xl border-2 border-[#7c1c2e] bg-white p-6 text-center">
                <p className="font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>Get 4–8 graded responses with the full prep.</p>
                <p className="mt-1 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Each with detailed feedback, strengths, and improvement areas — same rubric as the real exam.</p>
                <a href="/#pricing" className="mt-4 inline-block rounded bg-[#7c1c2e] px-8 py-3 text-sm font-semibold text-white hover:bg-[#5a1220]" style={{ fontFamily: 'var(--font-sans)' }}>
                  Get Full Access — $49
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
