'use client'

import { useState, useCallback } from 'react'

interface QuestionOption {
  label: string
  text: string
}

interface Question {
  _id: string
  questionText: string
  options: QuestionOption[]
  correctAnswer: string
  explanation: string
  subarea: string
  objectiveNumber: number
  isPublished: boolean
  isDiagnostic: boolean
}

interface SearchResults {
  questions: Question[]
  total: number
  page: number
  pages: number
}

const SF = { fontFamily: 'var(--font-sans)' }

export default function QuestionEditor() {
  const [query, setQuery] = useState('')
  const [subarea, setSubarea] = useState('')
  const [results, setResults] = useState<SearchResults | null>(null)
  const [loading, setLoading] = useState(false)
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [editState, setEditState] = useState<Record<string, Question>>({})
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)

  const search = useCallback(async (page = 1) => {
    setLoading(true)
    const params = new URLSearchParams({ page: String(page) })
    if (query) params.set('q', query)
    if (subarea) params.set('subarea', subarea)
    const res = await fetch(`/api/admin/questions?${params}`)
    const data = await res.json()
    setResults(data)
    setLoading(false)
  }, [query, subarea])

  function startEdit(q: Question) {
    setExpandedId(q._id)
    setEditState(prev => ({
      ...prev,
      [q._id]: JSON.parse(JSON.stringify(q)),
    }))
  }

  function updateOption(id: string, index: number, text: string) {
    setEditState(prev => {
      const q = { ...prev[id] }
      q.options = q.options.map((o, i) => i === index ? { ...o, text } : o)
      return { ...prev, [id]: q }
    })
  }

  function updateField(id: string, field: keyof Question, value: string) {
    setEditState(prev => ({ ...prev, [id]: { ...prev[id], [field]: value } }))
  }

  async function save(id: string) {
    const q = editState[id]
    if (!q) return
    setSaving(id)
    const res = await fetch(`/api/admin/questions/${id}`, {
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
      const { question } = await res.json()
      setResults(prev => prev ? {
        ...prev,
        questions: prev.questions.map(existing => existing._id === id ? question : existing),
      } : null)
      setSaved(id)
      setTimeout(() => setSaved(null), 2000)
      setExpandedId(null)
    } else {
      alert('Failed to save. Check console.')
    }
  }

  return (
    <div style={SF}>
      {/* Search bar */}
      <div className="flex gap-3 mb-6">
        <input
          type="text"
          placeholder="Search question text..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && search()}
          className="flex-1 rounded border border-[#e8e0e2] px-3 py-2 text-sm focus:outline-none focus:border-[#7c1c2e]"
        />
        <select
          value={subarea}
          onChange={e => setSubarea(e.target.value)}
          className="rounded border border-[#e8e0e2] px-3 py-2 text-sm focus:outline-none focus:border-[#7c1c2e]"
        >
          <option value="">All Subareas</option>
          <option value="I">Subarea I</option>
          <option value="II">Subarea II</option>
          <option value="III">Subarea III</option>
        </select>
        <button
          onClick={() => search()}
          disabled={loading}
          className="rounded bg-[#7c1c2e] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a1220] disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* Results */}
      {results && (
        <div>
          <p className="text-xs text-[#6b6b6b] mb-3">
            {results.total} question{results.total !== 1 ? 's' : ''} found
            {results.pages > 1 && ` — page ${results.page} of ${results.pages}`}
          </p>

          <div className="space-y-2">
            {results.questions.map(q => {
              const isExpanded = expandedId === q._id
              const edit = editState[q._id] || q
              const isSaving = saving === q._id
              const wasSaved = saved === q._id

              return (
                <div key={q._id} className="rounded-xl border border-[#e8e0e2] bg-white overflow-hidden">
                  {/* Header row */}
                  <div
                    className="flex items-start justify-between gap-4 p-4 cursor-pointer hover:bg-[#faf8f5]"
                    onClick={() => isExpanded ? setExpandedId(null) : startEdit(q)}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-[#7c1c2e] uppercase tracking-wide">
                          Subarea {q.subarea} · Obj {q.objectiveNumber}
                        </span>
                        {q.isDiagnostic && (
                          <span className="rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-700 font-semibold">Diagnostic</span>
                        )}
                        {!q.isPublished && (
                          <span className="rounded bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700 font-semibold">Draft</span>
                        )}
                      </div>
                      <p className="text-sm text-[#1a1a1a] line-clamp-2">{q.questionText}</p>
                      <p className="text-xs text-[#6b6b6b] mt-1">Correct: <strong>{q.correctAnswer}</strong></p>
                    </div>
                    <span className="text-[#6b6b6b] text-lg mt-0.5 flex-shrink-0">{isExpanded ? '▲' : '▼'}</span>
                  </div>

                  {/* Edit form */}
                  {isExpanded && (
                    <div className="border-t border-[#e8e0e2] p-4 space-y-4 bg-[#fdfcfb]">
                      {/* Question text */}
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wide text-[#6b6b6b] block mb-1">Question Text</label>
                        <textarea
                          rows={3}
                          value={edit.questionText}
                          onChange={e => updateField(q._id, 'questionText', e.target.value)}
                          className="w-full rounded border border-[#e8e0e2] px-3 py-2 text-sm focus:outline-none focus:border-[#7c1c2e] resize-y"
                        />
                      </div>

                      {/* Options */}
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wide text-[#6b6b6b] block mb-2">Answer Options</label>
                        <div className="space-y-2">
                          {edit.options.map((opt, i) => (
                            <div key={opt.label} className="flex items-start gap-2">
                              <span className={`mt-2 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold ${edit.correctAnswer === opt.label ? 'bg-green-600 text-white' : 'bg-[#e8e0e2] text-[#6b6b6b]'}`}>
                                {opt.label}
                              </span>
                              <textarea
                                rows={2}
                                value={opt.text}
                                onChange={e => updateOption(q._id, i, e.target.value)}
                                className="flex-1 rounded border border-[#e8e0e2] px-3 py-2 text-sm focus:outline-none focus:border-[#7c1c2e] resize-y"
                              />
                            </div>
                          ))}
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                          <label className="text-xs text-[#6b6b6b]">Correct answer:</label>
                          {edit.options.map(opt => (
                            <button
                              key={opt.label}
                              onClick={() => updateField(q._id, 'correctAnswer', opt.label)}
                              className={`h-7 w-7 rounded-full text-xs font-bold transition-colors ${edit.correctAnswer === opt.label ? 'bg-green-600 text-white' : 'bg-[#e8e0e2] text-[#6b6b6b] hover:bg-[#d0c8ca]'}`}
                            >
                              {opt.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Explanation */}
                      <div>
                        <label className="text-xs font-bold uppercase tracking-wide text-[#6b6b6b] block mb-1">Explanation</label>
                        <textarea
                          rows={4}
                          value={edit.explanation}
                          onChange={e => updateField(q._id, 'explanation', e.target.value)}
                          className="w-full rounded border border-[#e8e0e2] px-3 py-2 text-sm focus:outline-none focus:border-[#7c1c2e] resize-y"
                        />
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => setExpandedId(null)}
                          className="rounded border border-[#e8e0e2] px-4 py-2 text-sm text-[#6b6b6b] hover:bg-[#faf8f5]"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => save(q._id)}
                          disabled={isSaving}
                          className={`rounded px-5 py-2 text-sm font-semibold text-white transition-colors ${wasSaved ? 'bg-green-600' : 'bg-[#7c1c2e] hover:bg-[#5a1220]'} disabled:opacity-50`}
                        >
                          {isSaving ? 'Saving...' : wasSaved ? 'Saved ✓' : 'Save Changes'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Pagination */}
          {results.pages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {Array.from({ length: results.pages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  onClick={() => search(p)}
                  className={`h-8 w-8 rounded text-sm font-semibold ${p === results.page ? 'bg-[#7c1c2e] text-white' : 'border border-[#e8e0e2] text-[#6b6b6b] hover:bg-[#faf8f5]'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {!results && (
        <div className="text-center py-16 text-[#6b6b6b] text-sm">
          Search for a question above, or click Search to browse all.
        </div>
      )}
    </div>
  )
}
