'use client'

import { useState, useEffect } from 'react'

interface QuestionOption { label: string; text: string }
interface Question {
  _id: string
  questionText: string
  options: QuestionOption[]
  correctAnswer: string
  explanation: string
  subarea: string
  objectiveNumber: number
  stimulus?: string
}
interface PracticeTest {
  _id: string
  name: string
  testNumber: number
  isDiagnostic: boolean
  questionIds: string[]
}

const SF = { fontFamily: 'var(--font-sans)' }

function EditableField({
  value,
  onChange,
  rows = 2,
  className = '',
}: {
  value: string
  onChange: (v: string) => void
  rows?: number
  className?: string
}) {
  return (
    <textarea
      rows={rows}
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`w-full rounded border border-transparent px-2 py-1 text-sm text-[#1a1a1a] bg-transparent hover:border-[#e8e0e2] focus:border-[#7c1c2e] focus:bg-white focus:outline-none resize-none transition-colors ${className}`}
    />
  )
}

export default function QuestionEditor() {
  const [tests, setTests] = useState<PracticeTest[]>([])
  const [selectedTest, setSelectedTest] = useState<PracticeTest | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [edits, setEdits] = useState<Record<string, Question>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<Record<string, boolean>>({})
  const [loadingTest, setLoadingTest] = useState(false)

  useEffect(() => {
    fetch('/api/admin/practice-tests')
      .then(r => r.json())
      .then(d => setTests(d.tests || []))
  }, [])

  async function loadTest(test: PracticeTest) {
    setSelectedTest(test)
    setLoadingTest(true)
    setEdits({})
    setSaved({})
    const res = await fetch(`/api/admin/practice-tests/${test._id}`)
    const data = await res.json()
    const qs: Question[] = data.questions || []
    setQuestions(qs)
    // Initialize edits with current values
    const initial: Record<string, Question> = {}
    qs.forEach(q => { initial[q._id] = JSON.parse(JSON.stringify(q)) })
    setEdits(initial)
    setLoadingTest(false)
  }

  function updateOption(qId: string, index: number, text: string) {
    setEdits(prev => {
      const q = { ...prev[qId], options: [...prev[qId].options] }
      q.options[index] = { ...q.options[index], text }
      return { ...prev, [qId]: q }
    })
  }

  function updateField(qId: string, field: keyof Question, value: string) {
    setEdits(prev => ({ ...prev, [qId]: { ...prev[qId], [field]: value } }))
  }

  async function saveQuestion(qId: string) {
    const q = edits[qId]
    if (!q) return
    setSaving(qId)
    const res = await fetch(`/api/admin/questions/${qId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        questionText: q.questionText,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
      }),
    })
    setSaving(null)
    if (res.ok) {
      setSaved(prev => ({ ...prev, [qId]: true }))
      setTimeout(() => setSaved(prev => { const n = { ...prev }; delete n[qId]; return n }), 3000)
    } else {
      alert('Save failed.')
    }
  }

  const diagnosticTest = tests.find(t => t.isDiagnostic)
  const practicetests = tests.filter(t => !t.isDiagnostic)

  return (
    <div style={SF}>
      {/* Test selector */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-[#6b6b6b] mb-3">Select a Practice Test</p>
        <div className="flex flex-wrap gap-3">
          {diagnosticTest && (
            <button
              onClick={() => loadTest(diagnosticTest)}
              className={`rounded-lg border px-5 py-3 text-sm font-semibold transition-colors ${selectedTest?._id === diagnosticTest._id ? 'bg-[#7c1c2e] border-[#7c1c2e] text-white' : 'bg-white border-[#e8e0e2] text-[#1a1a1a] hover:border-[#7c1c2e]'}`}
            >
              Diagnostic Test
              <span className="ml-2 text-xs opacity-70">{diagnosticTest.questionIds.length}q</span>
            </button>
          )}
          {practicetests.map(t => (
            <button
              key={t._id}
              onClick={() => loadTest(t)}
              className={`rounded-lg border px-5 py-3 text-sm font-semibold transition-colors ${selectedTest?._id === t._id ? 'bg-[#7c1c2e] border-[#7c1c2e] text-white' : 'bg-white border-[#e8e0e2] text-[#1a1a1a] hover:border-[#7c1c2e]'}`}
            >
              Practice Test {t.testNumber}
              <span className="ml-2 text-xs opacity-70">{t.questionIds.length}q</span>
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {loadingTest && (
        <div className="text-center py-16 text-[#6b6b6b] text-sm">Loading questions...</div>
      )}

      {/* Question list */}
      {!loadingTest && selectedTest && questions.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-semibold text-[#1a1a1a]">
              {selectedTest.isDiagnostic ? 'Diagnostic Test' : `Practice Test ${selectedTest.testNumber}`}
              <span className="ml-2 text-xs text-[#6b6b6b] font-normal">{questions.length} questions</span>
            </p>
            <p className="text-xs text-[#6b6b6b]">Click any field to edit, then save.</p>
          </div>

          <div className="space-y-4">
            {questions.map((q, idx) => {
              const edit = edits[q._id] || q
              const isSaving = saving === q._id
              const wasSaved = saved[q._id]

              return (
                <div key={q._id} className="rounded-xl border border-[#e8e0e2] bg-white overflow-hidden">
                  {/* Question header */}
                  <div className="flex items-center justify-between px-4 pt-4 pb-2">
                    <span className="text-xs font-bold text-[#7c1c2e] uppercase tracking-wide">
                      Q{idx + 1} &nbsp;·&nbsp; Subarea {q.subarea} · Obj {q.objectiveNumber}
                    </span>
                    <button
                      onClick={() => saveQuestion(q._id)}
                      disabled={isSaving}
                      className={`rounded px-4 py-1.5 text-xs font-semibold text-white transition-colors disabled:opacity-50 ${wasSaved ? 'bg-green-600' : 'bg-[#7c1c2e] hover:bg-[#5a1220]'}`}
                    >
                      {isSaving ? 'Saving…' : wasSaved ? 'Saved ✓' : 'Save'}
                    </button>
                  </div>

                  <div className="px-4 pb-4 space-y-3">
                    {/* Stimulus (if any) */}
                    {q.stimulus && (
                      <div className="rounded bg-[#faf8f5] border border-[#e8e0e2] p-3">
                        <p className="text-xs font-bold text-[#6b6b6b] uppercase tracking-wide mb-1">Stimulus (read-only)</p>
                        <p className="text-xs text-[#6b6b6b]">This question has a stimulus passage.</p>
                      </div>
                    )}

                    {/* Stem */}
                    <div>
                      <p className="text-xs font-bold text-[#6b6b6b] uppercase tracking-wide mb-1">Stem</p>
                      <EditableField
                        rows={3}
                        value={edit.questionText}
                        onChange={v => updateField(q._id, 'questionText', v)}
                        className="font-medium"
                      />
                    </div>

                    {/* Options */}
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-xs font-bold text-[#6b6b6b] uppercase tracking-wide">Answer Options</p>
                        <span className="text-xs text-[#6b6b6b]">— correct answer:</span>
                        {edit.options.map(opt => (
                          <button
                            key={opt.label}
                            onClick={() => updateField(q._id, 'correctAnswer', opt.label)}
                            className={`h-6 w-6 rounded-full text-xs font-bold transition-colors ${edit.correctAnswer === opt.label ? 'bg-green-600 text-white' : 'bg-[#e8e0e2] text-[#6b6b6b] hover:bg-[#d0c8ca]'}`}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                      <div className="space-y-1">
                        {edit.options.map((opt, i) => (
                          <div key={opt.label} className="flex items-start gap-2">
                            <span className={`mt-1.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${edit.correctAnswer === opt.label ? 'bg-green-600 text-white' : 'bg-[#e8e0e2] text-[#6b6b6b]'}`}>
                              {opt.label}
                            </span>
                            <EditableField
                              rows={2}
                              value={opt.text}
                              onChange={v => updateOption(q._id, i, v)}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Explanation */}
                    <div>
                      <p className="text-xs font-bold text-[#6b6b6b] uppercase tracking-wide mb-1">Explanation</p>
                      <EditableField
                        rows={3}
                        value={edit.explanation}
                        onChange={v => updateField(q._id, 'explanation', v)}
                        className="text-[#444]"
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {!loadingTest && !selectedTest && (
        <div className="text-center py-16 text-[#6b6b6b] text-sm">
          Select a practice test above to view and edit its questions.
        </div>
      )}
    </div>
  )
}
