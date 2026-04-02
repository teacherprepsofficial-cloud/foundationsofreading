'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import DashboardHeader from '@/components/dashboard-header'

interface Option {
  label: 'A' | 'B' | 'C' | 'D'
  text: string
}

interface QuestionWithAnswer {
  _id: string
  questionText: string
  stimulus?: string
  options: Option[]
  correctAnswer: string
  explanation: string
  subarea: string
  subareaName: string
}

interface GradedResponse {
  questionId: string
  selectedAnswer: string | null
  isCorrect: boolean
  isMarked: boolean
  timeSpent: number
}

interface SubareaScore {
  subarea: 'I' | 'II' | 'III'
  subareaName: string
  totalQuestions: number
  correctAnswers: number
  percentage: number
  performanceLevel: 'most' | 'many' | 'some' | 'few'
}

interface Results {
  score: number
  scaledScore: number
  passed: boolean
  totalCorrect: number
  totalIncorrect: number
  totalSkipped: number
  totalQuestions: number
  subareaScores: SubareaScore[]
  timeSpentSeconds: number
  attemptId: string
  isDiagnostic: boolean
  crScore?: number
  crPerformanceLevel?: string
  crFeedback?: string
  questionsWithAnswers: QuestionWithAnswer[]
  responses: GradedResponse[]
  testName: string
  submittedAt: string
}

const CR_LEVEL_COLORS: Record<string, string> = {
  Thorough: 'text-green-700',
  Adequate: 'text-blue-700',
  Limited: 'text-yellow-700',
  Weak: 'text-orange-700',
  'No Response': 'text-[#6b6b6b]',
}

export default function ResultsPage() {
  const params = useParams()
  const examCode = params.examCode as string

  const [results, setResults] = useState<Results | null>(null)
  const [showReview, setShowReview] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem('for_test_results')
      if (!raw) {
        setNotFound(true)
        return
      }
      const parsed = JSON.parse(raw) as Results
      setResults(parsed)
    } catch {
      setNotFound(true)
    }
  }, [])

  function formatDate(iso: string) {
    try {
      return new Date(iso).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    } catch {
      return '—'
    }
  }

  function formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    if (h > 0) return `${h}h ${m}m ${s}s`
    return `${m}m ${s}s`
  }

  if (notFound) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f5] px-4 text-center">
        <p className="text-xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
          Results not found
        </p>
        <p className="mt-2 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
          We couldn&apos;t find your test results. They may have been cleared from your browser.
        </p>
        <Link
          href={`/dashboard/${examCode}/practice-tests`}
          className="mt-6 rounded bg-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Back to Practice Tests
        </Link>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f5]">
        <p className="text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
          Loading results…
        </p>
      </div>
    )
  }

  // Build subarea rows — ensure subareas are sorted I, II, III
  const sortedSubareas = [...results.subareaScores].sort((a, b) => {
    const order = ['I', 'II', 'III']
    return order.indexOf(a.subarea) - order.indexOf(b.subarea)
  })

  // Build response map for review
  const responseMap = new Map<string, GradedResponse>()
  for (const r of results.responses) {
    responseMap.set(r.questionId, r)
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <DashboardHeader />
      {/* Header */}
      <div className="bg-[#7c1c2e] px-6 py-8 print:hidden">
        <div className="mx-auto max-w-4xl">
          <Link
            href={`/dashboard/${examCode}/practice-tests`}
            className="text-sm text-[#e8b4bc] hover:text-white transition-colors"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            ← Back to Practice Tests
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>
            {results.testName || 'Practice Test'} — Score Report
          </h1>
          <p className="mt-1 text-sm text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>
            NES Foundations of Reading {examCode} · Completed {formatDate(results.submittedAt)}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* ── TOP SECTION: Test Results ── */}
        <div className="rounded-lg border border-[#e8e0e2] bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#e8e0e2]" style={{ backgroundColor: '#f0e8ea' }}>
            <p className="font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)', fontSize: '16px' }}>
              Test Results
            </p>
          </div>
          <table className="w-full">
            <tbody>
              <tr className="border-b border-[#e8e0e2]">
                <td
                  className="px-6 py-3 text-sm font-semibold text-[#6b6b6b] w-1/2"
                  style={{ fontFamily: 'var(--font-sans)', backgroundColor: '#faf8f5' }}
                >
                  Test Date
                </td>
                <td className="px-6 py-3 text-sm text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
                  {formatDate(results.submittedAt)}
                </td>
              </tr>
              <tr className="border-b border-[#e8e0e2]">
                <td
                  className="px-6 py-3 text-sm font-semibold text-[#6b6b6b]"
                  style={{ fontFamily: 'var(--font-sans)', backgroundColor: '#faf8f5' }}
                >
                  Your Score
                </td>
                <td className="px-6 py-3 text-sm text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
                  {results.passed ? '—' : results.scaledScore}
                </td>
              </tr>
              <tr className="border-b border-[#e8e0e2]">
                <td
                  className="px-6 py-3 text-sm font-semibold text-[#6b6b6b]"
                  style={{ fontFamily: 'var(--font-sans)', backgroundColor: '#faf8f5' }}
                >
                  Passing Score Requirement
                </td>
                <td className="px-6 py-3 text-sm text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
                  220
                </td>
              </tr>
              <tr className="border-b border-[#e8e0e2]">
                <td
                  className="px-6 py-3 text-sm font-semibold text-[#6b6b6b]"
                  style={{ fontFamily: 'var(--font-sans)', backgroundColor: '#faf8f5' }}
                >
                  Your Status
                </td>
                <td className="px-6 py-3 text-sm font-bold" style={{ fontFamily: 'var(--font-sans)' }}>
                  {results.passed ? (
                    <span className="text-green-700">Met the Requirement</span>
                  ) : (
                    <span className="text-red-700">Did Not Meet the Requirement</span>
                  )}
                </td>
              </tr>
              <tr>
                <td
                  className="px-6 py-3 text-sm font-semibold text-[#6b6b6b]"
                  style={{ fontFamily: 'var(--font-sans)', backgroundColor: '#faf8f5' }}
                >
                  Time Used
                </td>
                <td className="px-6 py-3 text-sm text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
                  {formatTime(results.timeSpentSeconds)} &nbsp;·&nbsp; {results.totalCorrect}/{results.totalQuestions} correct ({results.score}%)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── MIDDLE SECTION: Subarea Performance ── */}
        <div className="mt-6 rounded-lg border border-[#e8e0e2] bg-white shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-[#e8e0e2]" style={{ backgroundColor: '#f0e8ea' }}>
            <p className="font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)', fontSize: '16px' }}>
              Subarea Performance
            </p>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr style={{ backgroundColor: '#faf8f5' }}>
                <th
                  className="px-5 py-3 text-left font-semibold text-[#6b6b6b] border-b border-r border-[#e8e0e2]"
                  style={{ fontFamily: 'var(--font-sans)', width: '65%' }}
                >
                  Subarea / Section
                </th>
                <th
                  className="px-5 py-3 text-center font-semibold text-[#6b6b6b] border-b border-[#e8e0e2]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Multiple-choice subarea rows */}
              {sortedSubareas.map((sa) => (
                <tr key={sa.subarea} className="border-b border-[#e8e0e2] hover:bg-[#faf8f5]">
                  <td className="px-5 py-3 border-r border-[#e8e0e2]" style={{ fontFamily: 'var(--font-sans)' }}>
                    <span className="font-semibold text-[#1a1a1a]">Subarea {sa.subarea}</span>
                    <span className="ml-2 text-[#6b6b6b]">— {sa.subareaName}</span>
                  </td>
                  <td className="px-5 py-3 text-center" style={{ fontFamily: 'var(--font-sans)' }}>
                    <span className="font-bold text-[#1a1a1a]">{sa.correctAnswers} / {sa.totalQuestions}</span>
                    <span className="ml-2 text-xs text-[#6b6b6b]">correct</span>
                  </td>
                </tr>
              ))}

              {/* Written Response row — Subarea IV */}
              <tr className="border-b border-[#e8e0e2]">
                <td className="px-5 py-3 border-r border-[#e8e0e2]" style={{ fontFamily: 'var(--font-sans)' }}>
                  <span className="font-semibold text-[#1a1a1a]">Subarea IV</span>
                  <span className="ml-2 text-[#6b6b6b]">— Written Response</span>
                </td>
                <td className="px-5 py-3" style={{ fontFamily: 'var(--font-sans)' }}>
                  {results.crScore !== undefined && results.crPerformanceLevel ? (
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1a1a1a]">{results.crScore} / 4</span>
                        <span className={`text-sm font-semibold ${CR_LEVEL_COLORS[results.crPerformanceLevel] ?? 'text-[#6b6b6b]'}`}>
                          — {results.crPerformanceLevel}
                        </span>
                      </div>
                      {results.crFeedback && (
                        <p className="mt-1 text-xs text-[#6b6b6b] leading-relaxed">{results.crFeedback}</p>
                      )}
                    </div>
                  ) : (
                    <span className="text-xs text-[#6b6b6b]">Not scored</span>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* ── BOTTOM SECTION: Buttons ── */}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            href={`/dashboard/${examCode}`}
            className="rounded border border-[#e8e0e2] bg-white px-6 py-2.5 text-sm font-semibold text-[#1a1a1a] hover:border-[#7c1c2e] transition-colors"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Back to Dashboard
          </Link>
          <button
            onClick={() => setShowReview((v) => !v)}
            className="rounded bg-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220] transition-colors"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {showReview ? 'Hide Review' : 'Review Questions'}
          </button>
        </div>

        {/* ── REVIEW SECTION ── */}
        {showReview && (
          <div className="mt-8 space-y-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
              Answer Review — {results.totalCorrect} correct, {results.totalIncorrect} incorrect, {results.totalSkipped} skipped
            </p>

            {results.questionsWithAnswers.map((q, i) => {
              const userResponse = responseMap.get(q._id)
              const userAnswer = userResponse?.selectedAnswer ?? null
              const isCorrect = userResponse?.isCorrect ?? false
              const isSkipped = userAnswer === null

              return (
                <div
                  key={q._id}
                  className={`rounded-lg border bg-white shadow-sm overflow-hidden ${
                    isSkipped
                      ? 'border-[#e8e0e2]'
                      : isCorrect
                      ? 'border-green-300'
                      : 'border-red-300'
                  }`}
                >
                  {/* Status bar */}
                  <div
                    className={`px-5 py-2.5 text-xs font-bold uppercase tracking-wide ${
                      isSkipped
                        ? 'bg-[#f9f0f2] text-[#6b6b6b]'
                        : isCorrect
                        ? 'bg-green-50 text-green-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {isSkipped ? 'Skipped' : isCorrect ? 'Correct' : 'Incorrect'} — Question {i + 1} · Subarea {q.subarea}
                  </div>

                  <div className="p-5">
                    {/* Stimulus */}
                    {q.stimulus && (
                      <div
                        className="mb-4 rounded border border-[#c8c0c4] bg-[#fdfcfb] p-4 text-sm text-[#1a1a1a]"
                        style={{ fontFamily: 'var(--font-sans)' }}
                        dangerouslySetInnerHTML={{ __html: q.stimulus }}
                      />
                    )}
                    {/* Question */}
                    <p
                      className="text-sm leading-relaxed text-[#1a1a1a] mb-4"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {q.questionText}
                    </p>

                    {/* Options */}
                    <div className="space-y-2 mb-4">
                      {q.options.map((opt) => {
                        const isUserChoice = userAnswer === opt.label
                        const isCorrectAnswer = q.correctAnswer === opt.label
                        let bg = 'bg-white border-[#e8e0e2]'
                        let labelBg = 'bg-[#f9f0f2] text-[#7c1c2e] border-[#e8e0e2]'
                        let textColor = 'text-[#1a1a1a]'

                        if (isCorrectAnswer) {
                          bg = 'bg-green-50 border-green-400'
                          labelBg = 'bg-green-600 text-white border-green-600'
                          textColor = 'text-green-900'
                        } else if (isUserChoice && !isCorrect) {
                          bg = 'bg-red-50 border-red-400'
                          labelBg = 'bg-red-600 text-white border-red-600'
                          textColor = 'text-red-900'
                        }

                        return (
                          <div
                            key={opt.label}
                            className={`flex items-start gap-3 rounded-lg border px-4 py-3 ${bg}`}
                          >
                            <span
                              className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border text-xs font-bold ${labelBg}`}
                              style={{ fontFamily: 'var(--font-sans)' }}
                            >
                              {opt.label}
                            </span>
                            <span
                              className={`text-sm leading-snug ${textColor}`}
                              style={{ fontFamily: 'var(--font-sans)' }}
                            >
                              {opt.text}
                            </span>
                            {isCorrectAnswer && (
                              <span className="ml-auto flex-shrink-0 text-xs font-bold text-green-700" style={{ fontFamily: 'var(--font-sans)' }}>
                                ✓ Correct
                              </span>
                            )}
                            {isUserChoice && !isCorrectAnswer && (
                              <span className="ml-auto flex-shrink-0 text-xs font-bold text-red-700" style={{ fontFamily: 'var(--font-sans)' }}>
                                Your answer
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </div>

                    {/* Explanation */}
                    {q.explanation && (
                      <div className="rounded-lg border border-[#e8e0e2] bg-[#faf8f5] px-4 py-3">
                        <p className="text-xs font-bold uppercase tracking-wide text-[#7c1c2e] mb-1" style={{ fontFamily: 'var(--font-sans)' }}>
                          Explanation
                        </p>
                        <p className="text-sm leading-relaxed text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
                          {q.explanation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}

            {/* Bottom nav after review */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Link
                href={`/dashboard/${examCode}`}
                className="rounded border border-[#e8e0e2] bg-white px-6 py-2.5 text-sm font-semibold text-[#1a1a1a] hover:border-[#7c1c2e] transition-colors"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Back to Dashboard
              </Link>
              <Link
                href={`/dashboard/${examCode}/practice-tests`}
                className="rounded bg-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220] transition-colors"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Back to Practice Tests
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
