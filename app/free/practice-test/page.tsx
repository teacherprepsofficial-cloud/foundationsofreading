'use client'

import { useState, useEffect, useRef } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const QUESTIONS = [
  { id: 1, subarea: 'I', text: 'A kindergarten teacher says a word and asks students to tap once for each sound they hear. This activity develops which skill?', choices: ['Sight word recognition', 'Phoneme segmentation', 'Letter naming', 'Print concepts'], correct: 1, explanation: 'Tapping for each sound is a classic phoneme segmentation activity — a core phonemic awareness skill.' },
  { id: 2, subarea: 'I', text: 'Which of the following words contains a digraph?', choices: ['brim', 'chat', 'clap', 'frog'], correct: 1, explanation: '"Chat" contains "ch," a digraph — two letters representing one phoneme /tʃ/.' },
  { id: 3, subarea: 'II', text: 'A student reads aloud haltingly, sounding out every word. This most affects which reading component?', choices: ['Phonemic awareness', 'Fluency', 'Print concepts', 'Spelling'], correct: 1, explanation: 'Word-by-word reading prevents fluency — the student cannot read with accuracy, rate, and prosody simultaneously.' },
  { id: 4, subarea: 'II', text: 'A teacher wants students to infer the meaning of "persevere" from context. Which approach is most effective?', choices: ['Have students look it up in a dictionary', 'Ask students to skip it and continue reading', 'Model thinking aloud while rereading surrounding sentences', 'Provide a synonym before reading begins'], correct: 2, explanation: 'Modeling context clue strategies (rereading, using surrounding text) builds the skill students need to use independently.' },
  { id: 5, subarea: 'II', text: 'After reading, a teacher asks students to retell the story in their own words. This activity primarily develops:', choices: ['Phonological awareness', 'Decoding', 'Reading comprehension', 'Print concepts'], correct: 2, explanation: 'Retelling requires students to recall and organize information — a comprehension strategy.' },
  { id: 6, subarea: 'III', text: 'A teacher gives a brief assessment at the beginning of the year to determine which students may be at risk for reading difficulties. This is an example of:', choices: ['Summative assessment', 'Formative assessment', 'Screening assessment', 'Diagnostic assessment'], correct: 2, explanation: 'Screening assessments are given to all students early in the year to identify those who may need additional support.' },
  { id: 7, subarea: 'III', text: 'Which of the following best describes the purpose of progress monitoring?', choices: ['Measuring student performance at the end of the year', 'Tracking student growth toward learning goals over time', 'Diagnosing the specific cause of reading difficulties', 'Ranking students relative to their peers'], correct: 1, explanation: 'Progress monitoring tracks growth over time using brief, repeated assessments to determine if instruction is effective.' },
  { id: 8, subarea: 'I', text: 'A student reads "when" as "wen." This most likely indicates difficulty with:', choices: ['Syllabication', 'Phonemic awareness', 'Sight word recognition', 'The "wh" digraph'], correct: 3, explanation: '"Wh" is a digraph producing /w/. The student may be decoding letter-by-letter rather than recognizing the digraph pattern.' },
  { id: 9, subarea: 'II', text: 'Which of the following best develops reading fluency?', choices: ['Independent silent reading without feedback', 'Teacher-led choral reading with corrective feedback', 'Completing vocabulary worksheets before reading', 'Answering written comprehension questions'], correct: 1, explanation: 'Choral reading with teacher feedback — a form of supported oral reading — is an evidence-based fluency strategy.' },
  { id: 10, subarea: 'III', text: 'A student scores below benchmark on a phonics assessment. The most appropriate next step is:', choices: ['Refer the student to special education', 'Provide intensive whole-class reteaching', 'Administer a diagnostic assessment to identify the specific skill gap', 'Wait and monitor for another month'], correct: 2, explanation: 'A below-benchmark score triggers diagnostic assessment to pinpoint the specific skill(s) the student needs.' },
]

const TOTAL_TIME = 15 * 60 // 15 minutes for 10 questions

type Answers = Record<number, number>

export default function FreePracticeTestPage() {
  const [started, setStarted] = useState(false)
  const [answers, setAnswers] = useState<Answers>({})
  const [submitted, setSubmitted] = useState(false)
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (started && !submitted) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current!)
            setSubmitted(true)
            return 0
          }
          return t - 1
        })
      }, 1000)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [started, submitted])

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, '0')
  const ss = String(timeLeft % 60).padStart(2, '0')

  const score = QUESTIONS.filter((q) => answers[q.id] === q.correct).length
  const pct = Math.round((score / QUESTIONS.length) * 100)

  if (!started) {
    return (
      <>
        <SiteHeader />
        <main className="flex min-h-screen items-center justify-center bg-[#faf8f5] px-4">
          <div className="w-full max-w-md rounded-xl border border-[#e8e0e2] bg-white p-8 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Free Sample</p>
            <h1 className="mt-2 text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>Practice Test Preview</h1>
            <div className="mt-6 space-y-2 text-left">
              {[['10 questions', 'across all 3 MC subareas'], ['15 minutes', 'timed'], ['Immediate feedback', 'with explanations']].map(([a, b]) => (
                <div key={a} className="flex items-center gap-3">
                  <span className="font-bold text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>✓</span>
                  <span className="text-sm text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}><strong>{a}</strong> {b}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Full tests have 100 questions and 4 hours — scored on the real NES 100–300 scale.</p>
            <button
              onClick={() => setStarted(true)}
              className="mt-6 w-full rounded bg-[#7c1c2e] py-3.5 text-sm font-semibold text-white hover:bg-[#5a1220]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Start Practice Test
            </button>
          </div>
        </main>
        <SiteFooter />
      </>
    )
  }

  return (
    <>
      {/* Sticky test bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-[#e8e0e2] bg-white px-6 py-3">
        <p className="text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
          Free Practice Test · {Object.keys(answers).length}/{QUESTIONS.length} answered
        </p>
        <p className={`text-sm font-bold tabular-nums ${timeLeft < 120 ? 'text-red-600' : 'text-[#7c1c2e]'}`} style={{ fontFamily: 'var(--font-sans)' }}>
          {mm}:{ss}
        </p>
      </div>

      <main className="min-h-screen bg-[#faf8f5]">
        <div className="mx-auto max-w-2xl px-6 py-10">
          {submitted ? (
            <>
              <div className="space-y-5">
                {QUESTIONS.map((q, i) => {
                  const chosen = answers[q.id]
                  const correct = chosen === q.correct
                  return (
                    <div key={q.id} className="rounded-lg border border-[#e8e0e2] bg-white p-5">
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Q{i + 1} · Subarea {q.subarea}</p>
                        <span className={`text-xs font-bold ${correct ? 'text-green-700' : 'text-red-700'}`} style={{ fontFamily: 'var(--font-sans)' }}>{correct ? '✓ Correct' : '✗ Incorrect'}</span>
                      </div>
                      <p className="mt-2 text-sm font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>{q.text}</p>
                      <div className="mt-3 space-y-1">
                        {q.choices.map((c, ci) => {
                          let cls = 'rounded px-3 py-2 text-xs'
                          if (ci === q.correct) cls += ' bg-green-100 text-green-800 font-semibold'
                          else if (ci === chosen) cls += ' bg-red-100 text-red-700'
                          else cls += ' text-[#6b6b6b]'
                          return <p key={ci} className={cls} style={{ fontFamily: 'var(--font-sans)' }}>{String.fromCharCode(65 + ci)}. {c}</p>
                        })}
                      </div>
                      <p className="mt-3 rounded bg-[#f3eef0] px-3 py-2 text-xs text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>{q.explanation}</p>
                    </div>
                  )
                })}
              </div>
              <div className={`mt-6 rounded-xl p-6 text-center ${pct >= 60 ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                <p className="text-4xl font-bold" style={{ fontFamily: 'var(--font-serif)', color: pct >= 60 ? '#166534' : '#991b1b' }}>
                  {score} / {QUESTIONS.length}
                </p>
                <p className="mt-1 text-sm font-semibold" style={{ fontFamily: 'var(--font-sans)', color: pct >= 60 ? '#166534' : '#991b1b' }}>
                  {pct}% — {pct >= 60 ? 'Great start!' : 'The full study guide will build these skills.'}
                </p>
              </div>
              <div className="mt-6 rounded-xl border-2 border-[#7c1c2e] bg-white p-6 text-center">
                <p className="font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>Ready for the real deal?</p>
                <p className="mt-1 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Full tests: 100 questions, 4 hours, scored on the real NES 100–300 scale with subarea breakdown.</p>
                <a href="/#pricing" className="mt-4 inline-block rounded bg-[#7c1c2e] px-8 py-3 text-sm font-semibold text-white hover:bg-[#5a1220]" style={{ fontFamily: 'var(--font-sans)' }}>Get Full Access →</a>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-6">
                {QUESTIONS.map((q, i) => (
                  <div key={q.id} className="rounded-lg border border-[#e8e0e2] bg-white p-5">
                    <p className="text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Question {i + 1} of {QUESTIONS.length} · Subarea {q.subarea}</p>
                    <p className="mt-3 text-sm font-semibold leading-relaxed text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>{q.text}</p>
                    <div className="mt-4 space-y-2">
                      {q.choices.map((c, ci) => (
                        <button
                          key={ci}
                          onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: ci }))}
                          className={`w-full rounded border px-4 py-3 text-left text-sm transition-colors ${answers[q.id] === ci ? 'border-[#7c1c2e] bg-[#f3eef0] text-[#7c1c2e] font-semibold' : 'border-[#e8e0e2] text-[#1a1a1a] hover:border-[#7c1c2e]'}`}
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          <span className="font-bold">{String.fromCharCode(65 + ci)}.</span> {c}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={() => { clearInterval(timerRef.current!); setSubmitted(true) }}
                disabled={Object.keys(answers).length < QUESTIONS.length}
                className="mt-6 w-full rounded bg-[#7c1c2e] py-4 text-sm font-semibold text-white disabled:opacity-40 hover:bg-[#5a1220]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {Object.keys(answers).length < QUESTIONS.length ? `Answer all questions (${Object.keys(answers).length}/${QUESTIONS.length})` : 'Submit Test'}
              </button>
            </>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
