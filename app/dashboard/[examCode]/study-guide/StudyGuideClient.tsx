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
  const [sidebarOpen, setSidebarOpen] = useState(true)
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

  function handleObjClick(sectionId: SectionId, objId: string) {
    if (sectionId !== activeSection) {
      setActiveSection(sectionId)
      setTimeout(() => {
        document.getElementById(objId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 120)
    } else {
      document.getElementById(objId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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

  const SIDEBAR_W = 248

  return (
    <div className="flex min-h-screen" style={{ background: '#f8f9fa' }}>

      {/* ── Fixed Sidebar ── */}
      <aside
        className="fixed left-0 top-0 h-screen overflow-y-auto z-20 flex flex-col"
        style={{
          width: sidebarOpen ? SIDEBAR_W : 0,
          minWidth: sidebarOpen ? SIDEBAR_W : 0,
          transition: 'width 0.2s, min-width 0.2s',
          background: '#ffffff',
          borderRight: '1px solid #e5e7eb',
          overflowX: 'hidden',
        }}
      >
        <div style={{ width: SIDEBAR_W, minWidth: SIDEBAR_W }}>
          {/* Logo / Back */}
          <div className="px-4 py-4 border-b border-[#e5e7eb]">
            <Link
              href={`/dashboard/${examCode}`}
              className="text-xs text-[#6b7280] hover:text-[#111827] transition-colors"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              ← Back to Dashboard
            </Link>
            <p className="mt-2 text-sm font-bold text-[#111827]" style={{ fontFamily: 'var(--font-serif)' }}>
              NES {examCode} Study Guide
            </p>
            <p className="mt-0.5 text-xs text-[#9ca3af]" style={{ fontFamily: 'var(--font-sans)' }}>
              4 subareas · 11 objectives
            </p>
          </div>

          {/* Section nav */}
          <nav className="py-3 px-2">
            {guide.map((subarea) => {
              const isActive = activeSection === subarea.id
              return (
                <div key={subarea.id} className="mb-1">
                  <button
                    onClick={() => setActiveSection(subarea.id as SectionId)}
                    className="w-full text-left rounded-md px-3 py-2 transition-colors"
                    style={{
                      background: isActive ? '#eff6ff' : 'transparent',
                      fontFamily: 'var(--font-sans)',
                    }}
                  >
                    <span className="block text-[10px] font-bold uppercase tracking-widest mb-0.5" style={{ color: '#9ca3af' }}>
                      Subarea {subarea.id} · {subarea.weight}
                    </span>
                    <span
                      className="text-xs leading-tight font-semibold"
                      style={{ color: isActive ? '#1d4ed8' : '#374151' }}
                    >
                      {subarea.name}
                    </span>
                  </button>

                  {isActive && (
                    <div className="mt-0.5 ml-3 space-y-px">
                      {subarea.sections.map((sec) => (
                        <button
                          key={sec.id}
                          onClick={() => handleObjClick(subarea.id as SectionId, sec.id)}
                          className="w-full text-left rounded px-2.5 py-1.5 text-xs text-[#6b7280] hover:bg-[#f3f4f6] hover:text-[#111827] transition-colors"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          {subarea.id !== 'IV' ? `Obj ${sec.objectiveNum}: ` : ''}{sec.title}
                        </button>
                      ))}
                      {activeSection !== 'IV' && (
                        <button
                          onClick={() => {
                            setPhase('quiz')
                            setTimeout(() => {
                              document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                            }, 50)
                          }}
                          className="w-full text-left rounded px-2.5 py-1.5 text-xs font-semibold text-[#1d4ed8] hover:bg-[#eff6ff] transition-colors"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          ✓ Section Quiz (10 questions)
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Section progress dots */}
          <div className="px-4 py-3 border-t border-[#e5e7eb]">
            <p className="text-[10px] font-semibold uppercase tracking-widest text-[#9ca3af] mb-2" style={{ fontFamily: 'var(--font-sans)' }}>
              Progress
            </p>
            <div className="flex gap-1.5">
              {SECTION_ORDER.map((id) => (
                <button
                  key={id}
                  onClick={() => setActiveSection(id)}
                  title={`Subarea ${id}`}
                  className="flex-1 h-1.5 rounded-full transition-colors"
                  style={{ background: id === activeSection ? '#3b82f6' : '#e5e7eb' }}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar toggle */}
      <button
        onClick={() => setSidebarOpen((v) => !v)}
        className="fixed top-4 z-30 bg-white border border-[#e5e7eb] rounded-r px-1.5 py-2 text-[#6b7280] hover:bg-[#f9fafb] transition-colors shadow-sm"
        style={{ left: sidebarOpen ? SIDEBAR_W : 0, transition: 'left 0.2s' }}
        title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          {sidebarOpen
            ? <path d="M8 2L4 6L8 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            : <path d="M4 2L8 6L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          }
        </svg>
      </button>

      {/* ── Main Content ── */}
      <div
        ref={mainRef}
        className="flex-1 min-h-screen"
        style={{ marginLeft: sidebarOpen ? SIDEBAR_W : 0, transition: 'margin-left 0.2s' }}
      >
        {/* Section header — clean white */}
        <div className="bg-white border-b border-[#e5e7eb] px-8 py-6">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#9ca3af]" style={{ fontFamily: 'var(--font-sans)' }}>
                Subarea {activeSection}
              </span>
              <span className="text-[10px] text-[#d1d5db]">·</span>
              <span className="text-[10px] font-semibold text-[#9ca3af]" style={{ fontFamily: 'var(--font-sans)' }}>
                {currentSubarea.weight} of exam
              </span>
              <span className="text-[10px] text-[#d1d5db]">·</span>
              <span className="text-[10px] font-semibold text-[#9ca3af]" style={{ fontFamily: 'var(--font-sans)' }}>
                {currentSubarea.questions}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#111827]" style={{ fontFamily: 'var(--font-serif)' }}>
              {currentSubarea.name}
            </h1>
          </div>
        </div>

        <div className="px-8 py-8 max-w-3xl">

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
                  <h2 className="text-lg font-bold text-[#111827]" style={{ fontFamily: 'var(--font-serif)' }}>
                    {sec.title}
                  </h2>
                </div>
                {/* Content */}
                <div className="rounded-b-lg border border-[#e5e7eb] bg-white px-6 py-6 border-t border-[#f3f4f6]">
                  <div
                    className="text-[#111827]"
                    style={{ fontFamily: 'var(--font-sans)' }}
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
