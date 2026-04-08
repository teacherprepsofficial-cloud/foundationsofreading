'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import type { StudyGuideSubarea } from '@/data/study-guide-190'
import { studyGuideQuizzes } from '@/data/study-guide-quizzes'

type SectionId = 'I' | 'II' | 'III' | 'IV'
type PagePhase = 'content' | 'quiz' | 'results'

const SECTION_ORDER: SectionId[] = ['I', 'II', 'III', 'IV']

export default function StudyGuideClient({
  guide,
  examCode,
}: {
  guide: StudyGuideSubarea[]
  examCode: string
}) {
  const [activeSection, setActiveSection] = useState<SectionId>('I')
  const [phase, setPhase] = useState<PagePhase>('content')
  const [answers, setAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D'>>({})
  const [submitted, setSubmitted] = useState(false)
  const mainRef = useRef<HTMLDivElement>(null)

  const currentSubarea = guide.find((s) => s.id === activeSection)!
  const questions = activeSection !== 'IV' ? studyGuideQuizzes[activeSection as 'I' | 'II' | 'III'] : []
  const nextSection = SECTION_ORDER[SECTION_ORDER.indexOf(activeSection) + 1]
  const prevSection = SECTION_ORDER[SECTION_ORDER.indexOf(activeSection) - 1]

  useEffect(() => {
    setPhase('content')
    setAnswers({})
    setSubmitted(false)
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [activeSection])

  function handleAnswer(qId: string, choice: 'A' | 'B' | 'C' | 'D') {
    if (submitted) return
    setAnswers((prev) => ({ ...prev, [qId]: choice }))
  }

  function handleSubmitQuiz() {
    if (Object.keys(answers).length < questions.length) return
    setSubmitted(true)
    setPhase('results')
    setTimeout(() => {
      document.getElementById('quiz-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 60)
  }

  const score = submitted ? questions.filter((q) => answers[q.id] === q.correct).length : 0
  const pct = submitted ? Math.round((score / questions.length) * 100) : 0

  return (
    <div className="min-h-screen" style={{ background: '#f8f9fa' }}>

      {/* ── Chapter Navigation ── */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="px-8 pt-8 pb-6">
          <h1 className="text-2xl font-bold text-[#111827] mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
            Study Guide
          </h1>
          <p className="text-sm text-[#9ca3af] mb-6" style={{ fontFamily: 'var(--font-sans)' }}>
            4 chapters covering all 11 objectives on the exam
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guide.map((subarea, i) => {
              const isActive = activeSection === subarea.id
              return (
                <button
                  key={subarea.id}
                  onClick={() => setActiveSection(subarea.id as SectionId)}
                  className="group text-left rounded-xl border-2 px-5 py-4 transition-all"
                  style={{
                    borderColor: isActive ? '#7c1c2e' : '#e5e7eb',
                    background: isActive ? '#fdf2f4' : 'white',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                      style={{
                        background: isActive ? '#7c1c2e' : '#f3f4f6',
                        color: isActive ? 'white' : '#6b7280',
                      }}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p
                        className="text-sm font-semibold leading-tight"
                        style={{
                          color: isActive ? '#7c1c2e' : '#111827',
                          fontFamily: 'var(--font-sans)',
                        }}
                      >
                        {subarea.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[#9ca3af]" style={{ fontFamily: 'var(--font-sans)' }}>
                        {subarea.weight} of exam score
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div
        ref={mainRef}
        className="min-h-screen"
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        {/* Section header */}
        <div className="px-8 pt-8 pb-2">
          <h2 className="text-2xl font-bold text-[#111827]" style={{ fontFamily: 'var(--font-serif)' }}>
            {currentSubarea.name}
          </h2>
          <p className="mt-1 text-sm text-[#9ca3af]" style={{ fontFamily: 'var(--font-sans)' }}>
            {currentSubarea.weight} of exam · {currentSubarea.questions}
          </p>
        </div>

        <div className="px-8 py-8">

          {/* Learning Outcomes */}
          <div className="rounded-lg border border-[#e5e7eb] bg-white p-5 mb-8">
            <p className="text-[10.5px] font-bold uppercase tracking-widest text-[#6b7280] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>
              Learning Outcomes
            </p>
            <ol className="space-y-2">
              {currentSubarea.sections.map((sec, i) => (
                <li key={sec.id} className="flex gap-3 text-sm text-[#374151]" style={{ fontFamily: 'var(--font-sans)' }}>
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#eff6ff] text-[#1d4ed8] text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">
                    {activeSection !== 'IV'
                      ? `Understand and apply the key concepts, strategies, and assessment approaches for Objective ${sec.objectiveNum}: ${sec.title}`
                      : sec.title + ' — understand what the scorer expects and write a score-4 response'}
                  </span>
                </li>
              ))}
              {activeSection !== 'IV' && (
                <li className="flex gap-3 text-sm text-[#374151]" style={{ fontFamily: 'var(--font-sans)' }}>
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#f0fdf4] text-[#15803d] text-xs font-bold flex items-center justify-center mt-0.5">
                    ✓
                  </span>
                  <span className="leading-relaxed">Score 80% or higher on the 10-question section quiz</span>
                </li>
              )}
            </ol>
          </div>

          {/* ── Objective Sections ── */}
          <div className="space-y-8 mb-8">
            {currentSubarea.sections.map((sec) => (
              <div key={sec.id} id={sec.id} className="scroll-mt-6">
                {/* Objective header */}
                <div className="rounded-t-lg bg-white border border-[#e5e7eb] px-5 py-4 border-b-0">
                  <p
                    className="text-[10.5px] font-bold uppercase tracking-widest mb-1"
                    style={{ fontFamily: 'var(--font-sans)', color: '#9ca3af' }}
                  >
                    {activeSection !== 'IV' ? `Objective ${sec.objectiveNum}` : `Open Response — 10% of Score`}
                  </p>
                  <h2 className="text-xl font-bold text-[#111827]" style={{ fontFamily: 'var(--font-serif)' }}>
                    {sec.title}
                  </h2>
                </div>
                {/* Content */}
                <div className="rounded-b-lg border border-[#e5e7eb] bg-white px-8 py-8 border-t border-[#f3f4f6]">
                  <div
                    className="text-[#111827] study-guide-prose"
                    style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', lineHeight: '1.8' }}
                    dangerouslySetInnerHTML={{ __html: sec.content }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* ── Quiz CTA (Subareas I–III only) ── */}
          {activeSection !== 'IV' && phase === 'content' && (
            <div className="rounded-lg border-2 border-dashed border-[#e5e7eb] bg-white px-6 py-8 text-center mb-8">
              <div className="text-3xl mb-2">📝</div>
              <h3 className="text-base font-bold text-[#111827] mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                Check your understanding
              </h3>
              <p className="text-sm text-[#6b7280] mb-5" style={{ fontFamily: 'var(--font-sans)' }}>
                10 questions on Subarea {activeSection}. Answers and explanations revealed after you submit.
              </p>
              <button
                onClick={() => {
                  setPhase('quiz')
                  setTimeout(() => {
                    document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }, 50)
                }}
                className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-colors"
                style={{ background: '#1d4ed8', fontFamily: 'var(--font-sans)' }}
              >
                Start Section Quiz →
              </button>
            </div>
          )}

          {/* ── Quiz (Subareas I–III) ── */}
          {activeSection !== 'IV' && (phase === 'quiz' || phase === 'results') && (
            <div id="quiz-section" className="scroll-mt-6 mb-8">
              <div className="rounded-t-lg bg-[#1e293b] px-5 py-4">
                <p className="text-[10.5px] font-bold uppercase tracking-widest text-[#94a3b8] mb-0.5" style={{ fontFamily: 'var(--font-sans)' }}>
                  Section Quiz
                </p>
                <h3 className="text-base font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                  Subarea {activeSection} — {questions.length} Questions
                </h3>
              </div>

              <div className="rounded-b-lg border border-t-0 border-[#e5e7eb] bg-white px-5 py-6 space-y-8">
                {questions.map((q, i) => {
                  const chosen = answers[q.id]
                  return (
                    <div key={q.id}>
                      <p className="text-sm font-semibold text-[#111827] mb-3 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                        <span className="text-[#3b82f6] font-bold">{i + 1}.</span>{' '}{q.question}
                      </p>
                      <div className="space-y-2">
                        {(['A', 'B', 'C', 'D'] as const).map((letter) => {
                          const isChosen = chosen === letter
                          const isCorrectLetter = q.correct === letter

                          let style: React.CSSProperties = {
                            background: '#f9fafb',
                            border: '1px solid #e5e7eb',
                            color: '#111827',
                          }
                          if (submitted && isCorrectLetter) {
                            style = { background: '#f0fdf4', border: '1px solid #86efac', color: '#14532d' }
                          } else if (submitted && isChosen && !isCorrectLetter) {
                            style = { background: '#fef2f2', border: '1px solid #fca5a5', color: '#7f1d1d' }
                          } else if (!submitted && isChosen) {
                            style = { background: '#eff6ff', border: '1px solid #93c5fd', color: '#1e3a8a' }
                          }

                          return (
                            <button
                              key={letter}
                              onClick={() => handleAnswer(q.id, letter)}
                              disabled={submitted}
                              className="w-full text-left rounded-md px-4 py-2.5 text-sm transition-colors"
                              style={{ ...style, fontFamily: 'var(--font-sans)', cursor: submitted ? 'default' : 'pointer' }}
                            >
                              <span className="font-semibold mr-2">{letter}.</span>
                              {q.options[letter]}
                              {submitted && isCorrectLetter && <span className="ml-2 text-xs font-bold text-green-700"> ✓</span>}
                              {submitted && isChosen && !isCorrectLetter && <span className="ml-2 text-xs font-bold text-red-700"> ✗</span>}
                            </button>
                          )
                        })}
                      </div>

                      {submitted && (
                        <div className="mt-3 rounded-md bg-[#fffbeb] border border-[#fde68a] px-4 py-3">
                          <p className="text-[10.5px] font-bold uppercase tracking-widest text-[#92400e] mb-1" style={{ fontFamily: 'var(--font-sans)' }}>Explanation</p>
                          <p className="text-xs text-[#374151] leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  )
                })}

                {/* Submit bar */}
                {!submitted ? (
                  <div className="border-t border-[#e5e7eb] pt-5 flex items-center justify-between">
                    <p className="text-xs text-[#9ca3af]" style={{ fontFamily: 'var(--font-sans)' }}>
                      {Object.keys(answers).length} / {questions.length} answered
                    </p>
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(answers).length < questions.length}
                      className="rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ background: '#1d4ed8', fontFamily: 'var(--font-sans)' }}
                    >
                      Submit Quiz
                    </button>
                  </div>
                ) : (
                  <div id="quiz-results" className="border-t border-[#e5e7eb] pt-5 scroll-mt-6">
                    <div
                      className="rounded-lg px-6 py-5 mb-5 flex items-center justify-between"
                      style={{
                        background: pct >= 80 ? '#f0fdf4' : pct >= 60 ? '#fffbeb' : '#fef2f2',
                        border: `1px solid ${pct >= 80 ? '#86efac' : pct >= 60 ? '#fde68a' : '#fca5a5'}`,
                      }}
                    >
                      <div>
                        <p
                          className="text-[10.5px] font-bold uppercase tracking-widest mb-1"
                          style={{ fontFamily: 'var(--font-sans)', color: pct >= 80 ? '#14532d' : pct >= 60 ? '#92400e' : '#7f1d1d' }}
                        >
                          {pct >= 80 ? 'Great work!' : pct >= 60 ? 'Almost there' : 'Review and retry'}
                        </p>
                        <p
                          className="text-2xl font-bold"
                          style={{ fontFamily: 'var(--font-serif)', color: pct >= 80 ? '#15803d' : pct >= 60 ? '#d97706' : '#dc2626' }}
                        >
                          {score} / {questions.length} — {pct}%
                        </p>
                        <p
                          className="text-xs mt-1"
                          style={{ fontFamily: 'var(--font-sans)', color: pct >= 80 ? '#15803d' : pct >= 60 ? '#d97706' : '#dc2626' }}
                        >
                          {pct >= 80 ? 'You\'re ready to continue.' : pct >= 60 ? 'Review the explanations, then move on.' : 'Re-read the objectives above, then retake.'}
                        </p>
                      </div>
                      <span className="text-4xl">{pct >= 80 ? '🎉' : pct >= 60 ? '📖' : '💪'}</span>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={() => { setAnswers({}); setSubmitted(false); setPhase('quiz'); window.scrollTo({ top: 0 }) }}
                        className="rounded-md border border-[#e5e7eb] bg-white px-4 py-2 text-sm font-semibold text-[#374151] hover:bg-[#f9fafb] transition-colors"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        Retake Quiz
                      </button>
                      {nextSection && (
                        <button
                          onClick={() => setActiveSection(nextSection)}
                          className="rounded-md px-4 py-2 text-sm font-semibold text-white transition-colors"
                          style={{ background: '#1d4ed8', fontFamily: 'var(--font-sans)' }}
                        >
                          Continue to Subarea {nextSection} →
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Subarea IV — completion message */}
          {activeSection === 'IV' && (
            <div className="rounded-lg border border-[#e5e7eb] bg-white px-6 py-8 text-center mb-8">
              <div className="text-3xl mb-2">✅</div>
              <h3 className="text-base font-bold text-[#111827] mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                Study guide complete
              </h3>
              <p className="text-sm text-[#6b7280] mb-5" style={{ fontFamily: 'var(--font-sans)' }}>
                You have reviewed all 4 subareas and 11 objectives. Use the sample prompts above to practice writing before your exam.
              </p>
              <Link
                href={`/dashboard/${examCode}`}
                className="inline-flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold text-white transition-colors"
                style={{ background: '#1d4ed8', fontFamily: 'var(--font-sans)' }}
              >
                Back to Dashboard →
              </Link>
            </div>
          )}

          {/* Bottom nav */}
          <div className="flex items-center justify-between pt-6 border-t border-[#e5e7eb]">
            {prevSection ? (
              <button
                onClick={() => setActiveSection(prevSection)}
                className="text-sm text-[#6b7280] hover:text-[#111827] transition-colors"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                ← Subarea {prevSection}
              </button>
            ) : <div />}
            {nextSection ? (
              <button
                onClick={() => setActiveSection(nextSection)}
                className="text-sm text-[#3b82f6] font-semibold hover:text-[#1d4ed8] transition-colors"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Subarea {nextSection}: {guide.find(s => s.id === nextSection)?.name} →
              </button>
            ) : (
              <Link href={`/dashboard/${examCode}`} className="text-sm text-[#3b82f6] font-semibold hover:text-[#1d4ed8]" style={{ fontFamily: 'var(--font-sans)' }}>
                Back to Dashboard →
              </Link>
            )}
          </div>

        </div>
      </div>
    </div>
  )
}
