'use client'

import { useState, useEffect } from 'react'

interface Option {
  label: string
  text: string
}

interface Question {
  _id: string
  questionText: string
  options: Option[]
  correctAnswer: string
  explanation: string
  subarea: string
  subareaName: string
}

export function FreePracticeQuiz() {
  const [questions, setQuestions] = useState<Question[]>([])
  const [current, setCurrent] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(0)
  const [finished, setFinished] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/free/practice-questions')
      .then(r => r.json())
      .then(d => { setQuestions(d.questions || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="py-12 text-center text-gray-500">Loading questions...</div>
  if (!questions.length) return <div className="py-12 text-center text-gray-500">Unable to load questions.</div>

  const q = questions[current]

  function handleSelect(label: string) {
    if (revealed) return
    setSelected(label)
  }

  function handleCheck() {
    if (!selected) return
    setRevealed(true)
    setAnswered(a => a + 1)
    if (selected === q.correctAnswer) setScore(s => s + 1)
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setFinished(true)
      return
    }
    setCurrent(c => c + 1)
    setSelected(null)
    setRevealed(false)
  }

  function handleRestart() {
    setCurrent(0)
    setSelected(null)
    setRevealed(false)
    setScore(0)
    setAnswered(0)
    setFinished(false)
  }

  if (finished) {
    const pct = Math.round((score / questions.length) * 100)
    return (
      <div className="rounded-xl border border-[#e8e0e2] bg-white p-8 text-center">
        <h3 className="font-serif text-2xl font-bold text-[#1a1a1a]">Practice Test Complete</h3>
        <div className="mt-4">
          <span className="text-5xl font-bold" style={{ color: pct >= 85 ? '#16a34a' : '#7c1c2e' }}>{pct}%</span>
          <p className="mt-1 text-gray-500">{score} of {questions.length} correct</p>
        </div>
        <p className="mx-auto mt-4 max-w-md text-sm text-gray-600">
          {pct >= 85
            ? 'Great work! You\'re showing strong readiness for the exam.'
            : 'Keep studying — focus on the explanations for the questions you missed.'}
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={handleRestart}
            className="rounded-lg border border-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-[#7c1c2e] hover:bg-[#fdf2f4]"
          >
            Retake Quiz
          </button>
          <a
            href="/#pricing"
            className="rounded-lg bg-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1420]"
          >
            Get Full Practice Tests
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-[#e8e0e2] bg-white">
      {/* Progress bar */}
      <div className="flex items-center justify-between border-b border-[#e8e0e2] px-6 py-3">
        <span className="text-sm font-medium text-gray-500">
          Question {current + 1} of {questions.length}
        </span>
        <span className="text-sm text-gray-400">
          {score}/{answered} correct
        </span>
      </div>
      <div className="h-1 bg-[#f0e8ea]">
        <div
          className="h-1 bg-[#7c1c2e] transition-all"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="px-6 py-6">
        <p className="text-xs font-medium uppercase tracking-wide text-[#7c1c2e] mb-3">
          Subarea {q.subarea} — {q.subareaName}
        </p>
        <p className="text-base font-medium text-[#1a1a1a] leading-relaxed">{q.questionText}</p>

        {/* Options */}
        <div className="mt-5 space-y-2">
          {q.options.map(opt => {
            let bg = 'bg-white hover:bg-[#faf8f5]'
            let border = 'border-[#e8e0e2]'
            let text = 'text-[#1a1a1a]'

            if (revealed) {
              if (opt.label === q.correctAnswer) {
                bg = 'bg-green-50'
                border = 'border-green-400'
                text = 'text-green-900'
              } else if (opt.label === selected) {
                bg = 'bg-red-50'
                border = 'border-red-400'
                text = 'text-red-900'
              } else {
                bg = 'bg-gray-50'
                text = 'text-gray-400'
              }
            } else if (opt.label === selected) {
              bg = 'bg-[#fdf2f4]'
              border = 'border-[#7c1c2e]'
            }

            return (
              <button
                key={opt.label}
                onClick={() => handleSelect(opt.label)}
                className={`w-full rounded-lg border ${border} ${bg} px-4 py-3 text-left text-sm ${text} transition-all`}
              >
                <span className="mr-2 font-bold">{opt.label}.</span>
                {opt.text}
              </button>
            )
          })}
        </div>

        {/* Explanation */}
        {revealed && (
          <div className="mt-4 rounded-lg bg-[#faf8f5] border border-[#e8e0e2] px-4 py-3">
            <p className="text-sm text-gray-700 leading-relaxed">{q.explanation}</p>
          </div>
        )}

        {/* Action button */}
        <div className="mt-5">
          {!revealed ? (
            <button
              onClick={handleCheck}
              disabled={!selected}
              className="rounded-lg bg-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-white disabled:opacity-40 hover:bg-[#5a1420]"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="rounded-lg bg-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1420]"
            >
              {current + 1 >= questions.length ? 'See Results' : 'Next Question →'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
