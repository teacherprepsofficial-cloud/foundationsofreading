'use client'

import { useState, useEffect } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const WORD_MIN = 150

const SCORE_LABELS: Record<number, { label: string; color: string; bg: string }> = {
  4: { label: 'Thorough', color: '#166534', bg: '#f0fdf4' },
  3: { label: 'Adequate', color: '#1e40af', bg: '#eff6ff' },
  2: { label: 'Limited', color: '#854d0e', bg: '#fefce8' },
  1: { label: 'Weak', color: '#991b1b', bg: '#fef2f2' },
}

const PROMPT_TEXT = `STUDENT SCENARIO

Student: Maya | Grade: 2

Exhibit 1 — Teacher Record
Early in the school year, Maya reads aloud a passage from an unfamiliar narrative text. The teacher records the following:

Passage text with Maya's reading:
• "Sam and his dog Rex ran down the muddy trail."
  Maya read "muddy" as "mudy" (substitution)
• "Rex jumped over a log and landed in a puddle."
  Maya read "jumped" as "jumpt" then self-corrected | read "landed" as "land" (substitution)
• "Sam laughed and wiped mud from his face."
  Maya paused long on "laughed" | read "wiped" as "wipe" (substitution)
• "They raced all the way home as the sun began to set."
  Maya repeated "raced" | read "began" as "begin" (substitution)

Exhibit 2 — Oral Fluency Reading Rubric
Words correct per minute: 71 wcpm
Accuracy: 88%
Pace (1–4): 3
Smoothness (1–4): 2
Phrasing (1–4): 3
Note: Second-grade 50th percentile fall benchmark is 72 wcpm.

ASSIGNMENT
Using your knowledge of foundational reading skills (e.g., phonemic awareness, phonics, recognition of high-frequency words, syllabication, morphemic analysis, automaticity, reading fluency [accuracy, rate, and prosody], self-correcting), write a response of approximately 150–300 words in which you:
1. Identify one significant strength that Maya demonstrates related to foundational reading skills.
2. Identify one significant need that Maya demonstrates related to foundational reading skills.
3. Based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Maya.
4. Explain why the instructional strategy, activity, or intervention you described would be effective for Maya.

Be sure to cite specific evidence from the information provided to support all parts of your response.`

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
      const res = await fetch('/api/free/grade-cr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: PROMPT_TEXT, response }),
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

        <div className="mx-auto max-w-5xl px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Free Preview · One Use</p>
          <h1 className="mt-2 text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>AI-Graded Written Response</h1>
          <p className="mt-2 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            Type your response below. Our AI scores it 1–4 using the same rubric as the real NES exam.
          </p>

          {/* Prompt */}
          <div className="mt-7 rounded-lg border border-[#e8e0e2] bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e] mb-4" style={{ fontFamily: 'var(--font-sans)' }}>Prompt</p>

            {/* Student Scenario header */}
            <p className="text-sm font-bold text-[#1a1a1a] uppercase tracking-wide mb-3" style={{ fontFamily: 'var(--font-sans)' }}>Student Scenario</p>
            <p className="text-sm text-[#1a1a1a] mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
              <strong>Student:</strong> Maya &nbsp;|&nbsp; <strong>Grade:</strong> 2
            </p>

            {/* Exhibit 1 */}
            <div className="mb-4">
              <p className="text-sm font-bold text-[#1a1a1a] mb-1" style={{ fontFamily: 'var(--font-sans)' }}>Exhibit 1 — Teacher Record</p>
              <p className="text-sm text-[#1a1a1a] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>
                Early in the school year, Maya reads aloud a passage from an unfamiliar narrative text. The teacher records the following:
              </p>
              <div className="rounded-md bg-[#faf8f5] border border-[#e8e0e2] p-4 space-y-3">
                {[
                  { quote: '"Sam and his dog Rex ran down the muddy trail."', note: 'Maya read "muddy" as "mudy" (substitution)' },
                  { quote: '"Rex jumped over a log and landed in a puddle."', note: 'Maya read "jumped" as "jumpt" then self-corrected | read "landed" as "land" (substitution)' },
                  { quote: '"Sam laughed and wiped mud from his face."', note: 'Maya paused long on "laughed" | read "wiped" as "wipe" (substitution)' },
                  { quote: '"They raced all the way home as the sun began to set."', note: 'Maya repeated "raced" | read "began" as "begin" (substitution)' },
                ].map(({ quote, note }, i) => (
                  <div key={i}>
                    <p className="text-sm text-[#1a1a1a] italic" style={{ fontFamily: 'var(--font-sans)' }}>{quote}</p>
                    <p className="text-xs text-[#6b6b6b] mt-0.5 pl-3" style={{ fontFamily: 'var(--font-sans)' }}>↳ {note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Exhibit 2 */}
            <div className="mb-5">
              <p className="text-sm font-bold text-[#1a1a1a] mb-2" style={{ fontFamily: 'var(--font-sans)' }}>Exhibit 2 — Oral Fluency Reading Rubric</p>
              <div className="rounded-md bg-[#faf8f5] border border-[#e8e0e2] p-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1.5">
                  {[
                    ['Words correct per minute', '71 wcpm'],
                    ['Accuracy', '88%'],
                    ['Pace (1–4)', '3'],
                    ['Smoothness (1–4)', '2'],
                    ['Phrasing (1–4)', '3'],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between gap-2">
                      <span className="text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>{label}</span>
                      <span className="text-xs font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>{val}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-2 text-xs text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
                  Note: Second-grade 50th percentile fall benchmark is 72 wcpm.
                </p>
              </div>
            </div>

            {/* Assignment */}
            <div>
              <p className="text-sm font-bold text-[#1a1a1a] mb-2" style={{ fontFamily: 'var(--font-sans)' }}>Assignment</p>
              <p className="text-sm text-[#1a1a1a] mb-3 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                Using your knowledge of foundational reading skills (e.g., phonemic awareness, phonics, recognition of high-frequency words, syllabication, morphemic analysis, automaticity, reading fluency [accuracy, rate, and prosody], self-correcting), write a response of approximately 150–300 words in which you:
              </p>
              <ol className="space-y-1.5 pl-1">
                {[
                  'Identify one significant strength that Maya demonstrates related to foundational reading skills.',
                  'Identify one significant need that Maya demonstrates related to foundational reading skills.',
                  'Based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Maya.',
                  'Explain why the instructional strategy, activity, or intervention you described would be effective for Maya.',
                ].map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
                    <span className="font-bold text-[#7c1c2e] shrink-0">{i + 1}.</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-xs text-[#6b6b6b] italic" style={{ fontFamily: 'var(--font-sans)' }}>
                Be sure to cite specific evidence from the information provided to support all parts of your response.
              </p>
            </div>
          </div>

          {/* Rubric reference */}
          <div className="mt-4 rounded-lg border border-[#e8e0e2] bg-[#faf8f5] p-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b6b] mb-2" style={{ fontFamily: 'var(--font-sans)' }}>Scoring Rubric</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {[
                ['4 — Thorough', 'Purpose fully achieved. Substantial, accurate knowledge. Sound evidence and high-quality examples.'],
                ['3 — Adequate', 'Purpose largely achieved. Generally accurate knowledge. Adequate evidence with relevant examples.'],
                ['2 — Limited', 'Purpose partially achieved. Limited or possibly inaccurate knowledge. Few relevant examples.'],
                ['1 — Weak', 'Purpose not achieved. Little or no accurate knowledge. Weak or absent evidence.'],
              ].map(([label, desc]) => (
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
                  placeholder="Write your response here. Aim for 150–300 words. Address all four parts with specific evidence from the exhibits."
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
                    Get Full Access →
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
                  {result.score} / 4
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
                  Get Full Access →
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
