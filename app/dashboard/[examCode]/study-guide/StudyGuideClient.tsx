'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import type { StudyGuideSubarea } from '@/data/study-guide-190'
import { studyGuideQuizzes, sampleCRPrompt, sampleCRResponse } from '@/data/study-guide-quizzes'

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
  const contentRef = useRef<HTMLDivElement>(null)

  const currentSubarea = guide.find((s) => s.id === activeSection)!
  const questions = activeSection !== 'IV' ? studyGuideQuizzes[activeSection as 'I' | 'II' | 'III'] : []
  const nextSection = SECTION_ORDER[SECTION_ORDER.indexOf(activeSection) + 1]

  // Reset quiz state when switching sections
  useEffect(() => {
    setPhase('content')
    setAnswers({})
    setSubmitted(false)
    contentRef.current?.scrollTo({ top: 0 })
    window.scrollTo({ top: 0 })
  }, [activeSection])

  function handleSectionClick(id: SectionId) {
    setActiveSection(id)
  }

  function handleObjClick(sectionId: SectionId, objId: string) {
    if (sectionId !== activeSection) {
      setActiveSection(sectionId)
      // Wait for render then scroll
      setTimeout(() => {
        document.getElementById(objId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
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
    }, 50)
  }

  const score = submitted
    ? questions.filter((q) => answers[q.id] === q.correct).length
    : 0

  const pct = submitted ? Math.round((score / questions.length) * 100) : 0

  return (
    <div className="flex min-h-screen bg-[#faf8f5]">

      {/* ── Fixed Sidebar ── */}
      <aside
        className="fixed left-0 top-0 h-screen overflow-y-auto bg-white border-r border-[#e8e0e2] z-20 flex flex-col"
        style={{ width: sidebarOpen ? 232 : 0, minWidth: sidebarOpen ? 232 : 0, transition: 'width 0.2s, min-width 0.2s' }}
      >
        {/* Sidebar Header */}
        <div className="px-4 py-4 border-b border-[#e8e0e2] flex-shrink-0">
          <Link
            href={`/dashboard/${examCode}`}
            className="text-xs text-[#7c1c2e] hover:underline"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            ← Dashboard
          </Link>
          <p className="mt-2 text-sm font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
            NES {examCode} Study Guide
          </p>
          <p className="mt-0.5 text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            4 sections · 11 objectives
          </p>
        </div>

        {/* Section Nav */}
        <nav className="flex-1 py-3 px-2">
          {guide.map((subarea) => {
            const isActive = activeSection === subarea.id
            return (
              <div key={subarea.id} className="mb-1">
                {/* Section header button */}
                <button
                  onClick={() => handleSectionClick(subarea.id as SectionId)}
                  className={`w-full text-left rounded-md px-3 py-2 text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-[#f9f0f2] text-[#7c1c2e]'
                      : 'text-[#1a1a1a] hover:bg-[#faf8f5] hover:text-[#7c1c2e]'
                  }`}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e] mb-0.5">
                    Subarea {subarea.id}
                  </span>
                  <span className="leading-tight">{subarea.name}</span>
                </button>

                {/* Objectives (only show under active section) */}
                {isActive && (
                  <div className="mt-0.5 ml-2 space-y-0.5">
                    {subarea.sections.map((sec) => (
                      <button
                        key={sec.id}
                        onClick={() => handleObjClick(subarea.id as SectionId, sec.id)}
                        className="w-full text-left rounded px-2.5 py-1.5 text-xs text-[#6b6b6b] hover:bg-[#f9f0f2] hover:text-[#7c1c2e] transition-colors"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {subarea.id !== 'IV' ? `${sec.objectiveNum}. ` : ''}{sec.title}
                      </button>
                    ))}

                    {/* Quiz / Sample CR link */}
                    {subarea.id !== 'IV' ? (
                      <button
                        onClick={() => setPhase(phase === 'content' ? 'quiz' : 'content')}
                        className="w-full text-left rounded px-2.5 py-1.5 text-xs font-semibold text-[#7c1c2e] hover:bg-[#f9f0f2] transition-colors"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        ✓ Section Quiz
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          document.getElementById('sample-cr')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                        }}
                        className="w-full text-left rounded px-2.5 py-1.5 text-xs font-semibold text-[#7c1c2e] hover:bg-[#f9f0f2] transition-colors"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        ✍ Sample Prompt & Response
                      </button>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </nav>

        {/* Progress indicator */}
        <div className="px-4 py-3 border-t border-[#e8e0e2] flex-shrink-0">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-[#6b6b6b] mb-2" style={{ fontFamily: 'var(--font-sans)' }}>
            Sections
          </p>
          <div className="flex gap-1">
            {SECTION_ORDER.map((id) => (
              <button
                key={id}
                onClick={() => handleSectionClick(id)}
                className={`flex-1 h-1.5 rounded-full transition-colors ${
                  id === activeSection ? 'bg-[#7c1c2e]' : 'bg-[#e8e0e2]'
                }`}
                title={`Section ${id}`}
              />
            ))}
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div
        className="flex-1 min-h-screen"
        style={{ marginLeft: sidebarOpen ? 232 : 0, transition: 'margin-left 0.2s' }}
      >
        {/* Toggle button */}
        <button
          onClick={() => setSidebarOpen((v) => !v)}
          className="fixed top-4 z-30 bg-white border border-[#e8e0e2] rounded-r-md px-2 py-2 text-[#7c1c2e] hover:bg-[#f9f0f2] transition-colors shadow-sm"
          style={{ left: sidebarOpen ? 232 : 0, transition: 'left 0.2s' }}
          title={sidebarOpen ? 'Hide sidebar' : 'Show sidebar'}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            {sidebarOpen ? (
              <path d="M10 2L5 7L10 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            ) : (
              <path d="M4 2L9 7L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            )}
          </svg>
        </button>

        {/* Section Header */}
        <div className="bg-[#7c1c2e] px-8 py-6">
          <p className="text-xs font-bold uppercase tracking-widest text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>
            Subarea {activeSection}
          </p>
          <h1 className="mt-1 text-xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>
            {currentSubarea.name}
          </h1>
          <p className="mt-1 text-sm text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>
            {currentSubarea.sections.length} objective{currentSubarea.sections.length !== 1 ? 's' : ''}
            {activeSection !== 'IV' ? ' · Section quiz at the end' : ' · Sample exam prompt & response at the end'}
          </p>
        </div>

        {/* Learning Outcomes Box */}
        <div className="px-8 py-6">
          <div className="rounded-lg border border-[#e8e0e2] bg-white p-5 mb-6">
            <p className="text-xs font-bold uppercase tracking-widest text-[#7c1c2e] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>
              Learning Outcomes
            </p>
            <p className="text-xs text-[#6b6b6b] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>
              After studying this section, you should be able to:
            </p>
            <ol className="space-y-1.5" style={{ fontFamily: 'var(--font-sans)' }}>
              {currentSubarea.sections.map((sec, i) => (
                <li key={sec.id} className="text-sm text-[#1a1a1a] flex gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#f9f0f2] text-[#7c1c2e] text-xs font-bold flex items-center justify-center mt-0.5">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">
                    {sec.subareaId !== 'IV'
                      ? `Explain the key concepts, instructional strategies, and assessment approaches for Objective ${sec.objectiveNum}: ${sec.title}`
                      : sec.title}
                  </span>
                </li>
              ))}
              {activeSection !== 'IV' && (
                <li className="text-sm text-[#1a1a1a] flex gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#f9f0f2] text-[#7c1c2e] text-xs font-bold flex items-center justify-center mt-0.5">
                    ✓
                  </span>
                  <span className="leading-relaxed">Pass the 10-question section quiz with at least 80% accuracy</span>
                </li>
              )}
            </ol>
          </div>

          {/* ── Objective Content ── */}
          {phase === 'content' || phase === 'quiz' || phase === 'results' ? (
            <div className="space-y-8 mb-8">
              {currentSubarea.sections.map((sec) => (
                <div key={sec.id} id={sec.id} className="scroll-mt-6">
                  <div className="rounded-t-lg px-5 py-3.5" style={{ backgroundColor: '#7c1c2e' }}>
                    <p className="text-xs font-semibold uppercase tracking-widest text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>
                      {sec.subareaId !== 'IV' ? `Objective ${sec.objectiveNum}` : 'Written Response'}
                    </p>
                    <h2 className="mt-0.5 text-base font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>
                      {sec.title}
                    </h2>
                  </div>
                  <div className="rounded-b-lg border border-t-0 border-[#e8e0e2] bg-white px-6 py-6">
                    <div
                      className="prose-sm text-[#1a1a1a] leading-relaxed"
                      style={{ fontFamily: 'var(--font-sans)' }}
                      dangerouslySetInnerHTML={{ __html: sec.content }}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {/* ── Sample CR Section (Subarea IV only) ── */}
          {activeSection === 'IV' && (
            <div id="sample-cr" className="scroll-mt-6 space-y-6 mb-8">
              <div className="rounded-lg border border-[#e8e0e2] bg-white overflow-hidden">
                <div className="px-5 py-3 border-b border-[#e8e0e2] bg-[#fffbeb]">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#92400e]" style={{ fontFamily: 'var(--font-sans)' }}>
                    Sample Exam Prompt — Similar to What You Will See on Test Day
                  </p>
                </div>
                <div className="px-6 py-5">
                  <p className="text-xs text-[#6b6b6b] mb-4 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    The following prompt is representative of Assignment 1 on NES 190/890. Read the data carefully, then study the exemplary response below.
                  </p>
                  <div
                    className="rounded-lg border border-[#e8e0e2] bg-[#faf8f5] px-5 py-4 text-sm text-[#1a1a1a] leading-relaxed whitespace-pre-wrap"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {sampleCRPrompt}
                  </div>
                </div>
              </div>

              <div className="rounded-lg border border-[#e8e0e2] bg-white overflow-hidden">
                <div className="px-5 py-3 border-b border-[#e8e0e2] bg-[#f0f9ff]">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0369a1]" style={{ fontFamily: 'var(--font-sans)' }}>
                    Exemplary Response — Score 4 / Thorough
                  </p>
                </div>
                <div className="px-6 py-5">
                  <p className="text-xs text-[#6b6b6b] mb-4 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                    This response would receive a 4 (Thorough) on the official NES rubric. Notice: specific claims lead each paragraph, all evidence is drawn from the scenario data, and reasoning explicitly connects the evidence to the recommendation.
                  </p>
                  <CRResponseDisplay text={sampleCRResponse} />
                </div>
              </div>

              {/* Scoring breakdown */}
              <div className="rounded-lg border border-[#e8e0e2] bg-white px-6 py-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#7c1c2e] mb-3" style={{ fontFamily: 'var(--font-sans)' }}>
                  Why This Response Scores a 4
                </p>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    { label: 'Purpose', text: 'Both parts of the prompt are fully addressed — skill identification (Part A) and two complete instructional strategies (Part B).' },
                    { label: 'Subject Knowledge', text: 'PSF and NWF data are correctly interpreted as phonemic awareness and phonics deficits. The Simple View connection is implicit but accurate.' },
                    { label: 'Support', text: 'All claims reference specific numbers from the scenario (PSF: 18, benchmark: 35+, NWF-WWR: 4). No unsupported generalizations.' },
                    { label: 'Reasoning', text: 'Each strategy is explicitly connected to Maya\'s specific data profile — not just "good strategies in general."' },
                  ].map((item) => (
                    <div key={item.label} className="rounded-md bg-[#faf8f5] border border-[#e8e0e2] p-3">
                      <p className="text-xs font-bold text-[#7c1c2e] mb-1" style={{ fontFamily: 'var(--font-sans)' }}>{item.label}</p>
                      <p className="text-xs text-[#1a1a1a] leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── Quiz Section (Subareas I–III) ── */}
          {activeSection !== 'IV' && phase === 'content' && (
            <div className="rounded-lg border-2 border-dashed border-[#e8e0e2] bg-white px-6 py-8 text-center mb-8">
              <p className="text-2xl mb-2">✓</p>
              <h3 className="text-base font-bold text-[#1a1a1a] mb-1" style={{ fontFamily: 'var(--font-serif)' }}>
                Ready to check your understanding?
              </h3>
              <p className="text-sm text-[#6b6b6b] mb-4" style={{ fontFamily: 'var(--font-sans)' }}>
                10 questions based on Subarea {activeSection} content. Answers and explanations revealed after you submit.
              </p>
              <button
                onClick={() => {
                  setPhase('quiz')
                  setTimeout(() => {
                    document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                  }, 50)
                }}
                className="inline-flex items-center gap-2 rounded-md bg-[#7c1c2e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220] transition-colors"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Start Section Quiz →
              </button>
            </div>
          )}

          {activeSection !== 'IV' && (phase === 'quiz' || phase === 'results') && (
            <div id="quiz-section" className="scroll-mt-6 mb-8">
              <div className="rounded-t-lg bg-[#7c1c2e] px-5 py-4">
                <p className="text-xs font-bold uppercase tracking-widest text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>
                  Section Quiz
                </p>
                <h3 className="text-base font-bold text-white mt-0.5" style={{ fontFamily: 'var(--font-serif)' }}>
                  Subarea {activeSection} — Check Your Understanding
                </h3>
                <p className="text-xs text-[#e8b4bc] mt-0.5" style={{ fontFamily: 'var(--font-sans)' }}>
                  {questions.length} questions · Select one answer per question · Submit when ready
                </p>
              </div>

              <div className="rounded-b-lg border border-t-0 border-[#e8e0e2] bg-white px-5 py-5 space-y-8">
                {questions.map((q, i) => {
                  const chosen = answers[q.id]
                  const isCorrect = submitted && chosen === q.correct

                  return (
                    <div key={q.id} className={`${submitted ? (isCorrect ? 'opacity-100' : 'opacity-100') : ''}`}>
                      <p className="text-sm font-semibold text-[#1a1a1a] mb-3 leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
                        <span className="text-[#7c1c2e] font-bold">{i + 1}.</span>{' '}{q.question}
                      </p>
                      <div className="space-y-2">
                        {(['A', 'B', 'C', 'D'] as const).map((letter) => {
                          const isChosen = chosen === letter
                          const isCorrectLetter = q.correct === letter

                          let bg = 'bg-[#faf8f5] border-[#e8e0e2] text-[#1a1a1a] hover:border-[#7c1c2e] hover:bg-[#f9f0f2]'
                          if (submitted && isCorrectLetter) {
                            bg = 'bg-[#f0fdf4] border-[#86efac] text-[#14532d]'
                          } else if (submitted && isChosen && !isCorrectLetter) {
                            bg = 'bg-[#fef2f2] border-[#fca5a5] text-[#7f1d1d]'
                          } else if (!submitted && isChosen) {
                            bg = 'bg-[#f9f0f2] border-[#7c1c2e] text-[#1a1a1a]'
                          }

                          return (
                            <button
                              key={letter}
                              onClick={() => handleAnswer(q.id, letter)}
                              disabled={submitted}
                              className={`w-full text-left rounded-md border px-4 py-2.5 text-sm transition-colors ${bg} ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                              style={{ fontFamily: 'var(--font-sans)' }}
                            >
                              <span className="font-semibold mr-2">{letter}.</span>
                              {q.options[letter]}
                              {submitted && isCorrectLetter && <span className="ml-2 text-xs font-bold text-green-700">✓ Correct</span>}
                              {submitted && isChosen && !isCorrectLetter && <span className="ml-2 text-xs font-bold text-red-700">✗ Your answer</span>}
                            </button>
                          )
                        })}
                      </div>

                      {submitted && (
                        <div className="mt-3 rounded-md bg-[#fffbeb] border border-[#fcd34d] px-4 py-3">
                          <p className="text-xs font-bold text-[#92400e] mb-1" style={{ fontFamily: 'var(--font-sans)' }}>Explanation</p>
                          <p className="text-xs text-[#1a1a1a] leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  )
                })}

                {/* Submit / Results bar */}
                {!submitted ? (
                  <div className="border-t border-[#e8e0e2] pt-5 flex items-center justify-between">
                    <p className="text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                      {Object.keys(answers).length} / {questions.length} answered
                    </p>
                    <button
                      onClick={handleSubmitQuiz}
                      disabled={Object.keys(answers).length < questions.length}
                      className="rounded-md bg-[#7c1c2e] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      Submit Quiz
                    </button>
                  </div>
                ) : (
                  <div id="quiz-results" className="border-t border-[#e8e0e2] pt-5 scroll-mt-6">
                    <div className={`rounded-lg px-6 py-5 mb-4 ${pct >= 80 ? 'bg-[#f0fdf4] border border-[#86efac]' : pct >= 60 ? 'bg-[#fffbeb] border border-[#fcd34d]' : 'bg-[#fef2f2] border border-[#fca5a5]'}`}>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ fontFamily: 'var(--font-sans)', color: pct >= 80 ? '#14532d' : pct >= 60 ? '#92400e' : '#7f1d1d' }}>
                            {pct >= 80 ? 'Great work!' : pct >= 60 ? 'Almost there' : 'Keep studying'}
                          </p>
                          <p className="text-2xl font-bold" style={{ fontFamily: 'var(--font-serif)', color: pct >= 80 ? '#15803d' : pct >= 60 ? '#d97706' : '#dc2626' }}>
                            {score} / {questions.length} correct — {pct}%
                          </p>
                          <p className="text-xs mt-1" style={{ fontFamily: 'var(--font-sans)', color: pct >= 80 ? '#14532d' : pct >= 60 ? '#92400e' : '#7f1d1d' }}>
                            {pct >= 80 ? 'You\'re ready to move on.' : pct >= 60 ? 'Review the explanations above, then try the next section.' : 'Re-read the objectives above, then come back to review the explanations.'}
                          </p>
                        </div>
                        <div className="text-4xl">
                          {pct >= 80 ? '🎉' : pct >= 60 ? '📖' : '💪'}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={() => {
                          setAnswers({})
                          setSubmitted(false)
                          setPhase('quiz')
                          setTimeout(() => {
                            document.getElementById('quiz-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                          }, 50)
                        }}
                        className="rounded-md border border-[#e8e0e2] bg-white px-4 py-2 text-sm font-semibold text-[#1a1a1a] hover:bg-[#faf8f5] transition-colors"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        Retake Quiz
                      </button>
                      {nextSection && (
                        <button
                          onClick={() => setActiveSection(nextSection)}
                          className="rounded-md bg-[#7c1c2e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5a1220] transition-colors"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          Continue to Subarea {nextSection} →
                        </button>
                      )}
                      {!nextSection && (
                        <Link
                          href={`/dashboard/${examCode}`}
                          className="rounded-md bg-[#7c1c2e] px-4 py-2 text-sm font-semibold text-white hover:bg-[#5a1220] transition-colors"
                          style={{ fontFamily: 'var(--font-sans)' }}
                        >
                          Back to Dashboard →
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Bottom navigation */}
          <div className="flex items-center justify-between py-6 border-t border-[#e8e0e2]">
            {SECTION_ORDER.indexOf(activeSection) > 0 ? (
              <button
                onClick={() => setActiveSection(SECTION_ORDER[SECTION_ORDER.indexOf(activeSection) - 1])}
                className="text-sm text-[#7c1c2e] hover:underline"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                ← Subarea {SECTION_ORDER[SECTION_ORDER.indexOf(activeSection) - 1]}
              </button>
            ) : <div />}
            {nextSection ? (
              <button
                onClick={() => setActiveSection(nextSection)}
                className="text-sm text-[#7c1c2e] hover:underline"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Subarea {nextSection} →
              </button>
            ) : (
              <Link href={`/dashboard/${examCode}`} className="text-sm text-[#7c1c2e] hover:underline" style={{ fontFamily: 'var(--font-sans)' }}>
                Back to Dashboard →
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Renders the sample CR response with markdown-style bold
function CRResponseDisplay({ text }: { text: string }) {
  const paragraphs = text.split('\n\n').filter(Boolean)
  return (
    <div className="space-y-4">
      {paragraphs.map((para, i) => {
        // Bold text: **...**
        const parts = para.split(/\*\*(.+?)\*\*/g)
        const rendered = parts.map((part, j) =>
          j % 2 === 1 ? <strong key={j} className="font-semibold text-[#1a1a1a]">{part}</strong> : part
        )
        return (
          <p key={i} className="text-sm text-[#1a1a1a] leading-relaxed" style={{ fontFamily: 'var(--font-sans)' }}>
            {rendered}
          </p>
        )
      })}
    </div>
  )
}
