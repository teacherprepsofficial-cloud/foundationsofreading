'use client'

import { useState } from 'react'

import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const QUESTIONS = [
  {
    id: 1,
    text: 'A first-grade student can recognize that "cat" and "bat" rhyme but cannot identify the individual sounds in either word. Which level of phonological awareness is the student demonstrating?',
    choices: ['Phoneme level', 'Onset-rime level', 'Syllable level', 'Word level'],
    correct: 1,
    explanation: 'Recognizing rhyme is an onset-rime skill — the student can hear that two words share the same rime (-at) but has not yet developed phoneme-level awareness.',
  },
  {
    id: 2,
    text: 'Which of the following best represents a phoneme?',
    choices: ['The word "ship"', 'The syllable "ship"', 'The /sh/ sound in "ship"', 'The letter "s" in "ship"'],
    correct: 2,
    explanation: 'A phoneme is the smallest unit of sound. /sh/ is one phoneme — two letters that represent a single sound (a digraph).',
  },
  {
    id: 3,
    text: 'A second-grade student reads quickly and accurately but uses no expression or phrasing. Which component of reading fluency is most in need of development?',
    choices: ['Accuracy', 'Rate', 'Automaticity', 'Prosody'],
    correct: 3,
    explanation: 'Prosody refers to reading with appropriate expression, intonation, and phrasing — the "musical" quality of fluent reading.',
  },
  {
    id: 4,
    text: 'Which of the following is the most effective, evidence-based strategy for building oral reading fluency?',
    choices: [
      'Silent sustained reading of self-selected books',
      'Repeated oral reading with corrective feedback',
      'Vocabulary worksheet completion before reading',
      'Round-robin reading in small groups',
    ],
    correct: 1,
    explanation: 'Repeated reading — rereading the same passage with feedback — is one of the most research-supported strategies for developing fluency (NRP, 2000).',
  },
  {
    id: 5,
    text: 'A student decodes "they" as "the." This error most likely indicates difficulty with:',
    choices: [
      'Phonemic awareness',
      'Sight word recognition',
      'Phonics decoding patterns',
      'Reading rate',
    ],
    correct: 1,
    explanation: '"They" is a high-frequency sight word that does not follow regular phonics patterns. Students must memorize it as a whole word.',
  },
]

type Answers = Record<number, number>

export default function FreeDiagnosticPage() {
  const [answers, setAnswers] = useState<Answers>({})
  const [submitted, setSubmitted] = useState(false)

  const score = submitted
    ? QUESTIONS.filter((q) => answers[q.id] === q.correct).length
    : 0

  const pct = Math.round((score / QUESTIONS.length) * 100)

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#faf8f5]">
        {/* Banner */}
        <div className="border-b border-[#e8e0e2] bg-white px-6 py-3 text-center">
          <p className="text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            Free sample — 5 of 25 diagnostic questions.{' '}
            <a href="/#pricing" className="font-semibold text-[#7c1c2e] hover:underline">Get the full diagnostic →</a>
          </p>
        </div>

        <div className="mx-auto max-w-2xl px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Free Preview</p>
          <h1 className="mt-2 text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>Diagnostic Practice Test</h1>
          <p className="mt-2 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>5 sample questions across all subareas. No login required.</p>

          {submitted ? (
            <div className="mt-8">
              {/* Score card */}
              <div className={`rounded-xl p-6 text-center ${pct >= 60 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className="text-4xl font-bold" style={{ fontFamily: 'var(--font-serif)', color: pct >= 60 ? '#166534' : '#991b1b' }}>
                  {score} / {QUESTIONS.length}
                </p>
                <p className="mt-1 text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', color: pct >= 60 ? '#166534' : '#991b1b' }}>
                  {pct}% correct
                </p>
                <p className="mt-3 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                  {pct >= 80
                    ? 'Strong start! The full prep will sharpen your weak spots.'
                    : pct >= 60
                    ? 'Good foundation. The full study guide will fill the gaps.'
                    : 'The full prep program is designed to build exactly these skills — start with the study guide and diagnostic.'}
                </p>
              </div>

              {/* Review */}
              <div className="mt-8 space-y-6">
                {QUESTIONS.map((q, i) => {
                  const chosen = answers[q.id]
                  const correct = chosen === q.correct
                  return (
                    <div key={q.id} className="rounded-lg border border-[#e8e0e2] bg-white p-5">
                      <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Question {i + 1}</p>
                      <p className="mt-2 text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>{q.text}</p>
                      <div className="mt-3 space-y-1.5">
                        {q.choices.map((c, ci) => {
                          let cls = 'rounded px-3 py-2 text-sm'
                          if (ci === q.correct) cls += ' bg-green-100 text-green-800 font-semibold'
                          else if (ci === chosen && !correct) cls += ' bg-red-100 text-red-700'
                          else cls += ' text-[#6b6b6b]'
                          return <p key={ci} className={cls} style={{ fontFamily: 'var(--font-sans)' }}>{String.fromCharCode(65 + ci)}. {c}</p>
                        })}
                      </div>
                      <div className="mt-3 rounded bg-[#f3eef0] px-3 py-2.5">
                        <p className="text-xs font-semibold text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
                          {correct ? '✓ Correct' : '✗ Incorrect'} — {q.explanation}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-10 rounded-xl border-2 border-[#7c1c2e] bg-white p-6 text-center">
                <p className="font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>Ready for the full diagnostic?</p>
                <p className="mt-1 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>25 MC + 1 written response across all 4 subareas. Scored on the real NES 100–300 scale.</p>
                <a href="/#pricing" className="mt-4 inline-block rounded bg-[#7c1c2e] px-8 py-3 text-sm font-semibold text-white hover:bg-[#5a1220]" style={{ fontFamily: 'var(--font-sans)' }}>
                  Get Full Access — $49
                </a>
              </div>
            </div>
          ) : (
            <div className="mt-8 space-y-6">
              {QUESTIONS.map((q, i) => (
                <div key={q.id} className="rounded-lg border border-[#e8e0e2] bg-white p-5">
                  <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Question {i + 1} of {QUESTIONS.length}</p>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>{q.text}</p>
                  <div className="mt-4 space-y-2">
                    {q.choices.map((c, ci) => (
                      <button
                        key={ci}
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: ci }))}
                        className={`w-full rounded border px-4 py-3 text-left text-sm transition-colors ${
                          answers[q.id] === ci
                            ? 'border-[#7c1c2e] bg-[#f3eef0] text-[#7c1c2e] font-semibold'
                            : 'border-[#e8e0e2] text-[#1a1a1a] hover:border-[#7c1c2e]'
                        }`}
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        <span className="font-bold">{String.fromCharCode(65 + ci)}.</span> {c}
                      </button>
                    ))}
                  </div>
                </div>
              ))}

              <button
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(answers).length < QUESTIONS.length}
                className="w-full rounded bg-[#7c1c2e] py-4 text-sm font-semibold text-white transition-colors hover:bg-[#5a1220] disabled:opacity-40"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {Object.keys(answers).length < QUESTIONS.length
                  ? `Answer all questions (${Object.keys(answers).length}/${QUESTIONS.length})`
                  : 'Submit & See Results'}
              </button>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
