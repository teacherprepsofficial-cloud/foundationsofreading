'use client'

import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface CR {
  _id: string
  crNumber: number
  crType: 'foundational_reading_skills' | 'reading_comprehension'
  prompt: string
  scenarioContext?: string
  bundleOnly: boolean
}

interface CriteriaScores {
  purpose: number
  knowledge: number
  support: number
  rationale: number
}

interface Attempt {
  _id: string
  score: 1 | 2 | 3 | 4
  criteria?: CriteriaScores
  performanceLevel: string
  wordCount: number
  feedback: string
  strengths: string[]
  improvements: string[]
  submittedAt: string
}

const PERF_COLOR: Record<string, string> = {
  Thorough: '#16a34a',
  Adequate: '#2563eb',
  Limited: '#d97706',
  Weak: '#dc2626',
}

const TYPE_LABEL: Record<string, string> = {
  foundational_reading_skills: 'Foundational Reading Skills',
  reading_comprehension: 'Reading Comprehension',
}

const SF = { fontFamily: 'var(--font-sans)' }
const SE = { fontFamily: 'var(--font-serif)' }

// ── Scenario parsing ──────────────────────────────────────────────────────────

function parseScenario(raw: string) {
  const parts = raw.split(/─{8,}/).map((s) => s.trim()).filter(Boolean)
  const header = parts[0] || ''
  const exhibits: { title: string; content: string }[] = []
  for (let i = 1; i < parts.length; i += 2) {
    exhibits.push({
      title: parts[i]?.trim() || '',
      content: parts[i + 1]?.trim() || '',
    })
  }
  return { header, exhibits }
}

function parseStudentLine(header: string) {
  const sm = header.match(/STUDENT:\s*([^|]+)/)
  const gm = header.match(/GRADE:\s*([^|]+)/)
  const cm = header.match(/CONTEXT:\s*([\s\S]+)/)
  return {
    student: sm?.[1]?.trim() ?? '',
    grade: gm?.[1]?.trim() ?? '',
    context: cm?.[1]?.trim() ?? '',
  }
}

// ── Exhibit content renderers ─────────────────────────────────────────────────

function FluencyRubric({ content }: { content: string }) {
  const lines = content.split('\n').map((l) => l.trimEnd())
  const benchmarkLine = lines.find((l) => l.trim().startsWith('Benchmark'))
  const dataLines = lines.filter(
    (l) => l.trim() && !l.trim().startsWith('Benchmark') && l.trim() !== 'Prosody:'
  )

  const rows: { label: string; value: string; indent: boolean }[] = []
  for (const line of dataLines) {
    const m = line.match(/^(\s*)(.*?):\s+(.+)$/)
    if (m) rows.push({ label: m[2].trim(), value: m[3].trim(), indent: m[1].length > 0 })
  }

  return (
    <div style={SF}>
      <div className="rounded-lg overflow-hidden border border-[#e8e0e2]">
        <table className="w-full text-sm">
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={i % 2 === 0 ? 'bg-[#faf8f5]' : 'bg-white'}>
                <td className={`py-2.5 font-medium text-[#4a4a4a] pr-6 ${r.indent ? 'pl-10' : 'pl-4'}`}>
                  {r.label}
                </td>
                <td className="py-2.5 font-bold text-[#1a1a1a] pr-4 text-right">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {benchmarkLine && (
        <div className="mt-3 flex items-start gap-2 rounded-lg bg-[#f9f0f2] border border-[#e0ccd0] px-4 py-3">
          <span className="text-[#7c1c2e] flex-shrink-0 font-bold text-sm">→</span>
          <p className="text-sm text-[#5a1220] font-medium leading-snug">{benchmarkLine.trim()}</p>
        </div>
      )}
    </div>
  )
}

function RunningRecord({ content }: { content: string }) {
  const lines = content.split('\n')
  const groups: { lineLabel: string; passage: string; annotations: string[] }[] = []
  let preamble = ''

  for (const line of lines) {
    const trimmed = line.trim()
    const lineMatch = trimmed.match(/^(Line \d+):\s*(.*)/)
    if (lineMatch) {
      groups.push({ lineLabel: lineMatch[1], passage: lineMatch[2], annotations: [] })
    } else if (trimmed.startsWith('→') && groups.length > 0) {
      groups[groups.length - 1].annotations.push(trimmed.replace(/^→\s*/, ''))
    } else if (groups.length === 0 && trimmed) {
      preamble += (preamble ? ' ' : '') + trimmed
    }
  }

  return (
    <div className="space-y-3" style={SF}>
      {preamble && (
        <p className="text-xs font-semibold uppercase tracking-wide text-[#6b6b6b] mb-1">{preamble}</p>
      )}
      {groups.map((g, i) => (
        <div key={i} className="rounded-lg border border-[#e8e0e2] overflow-hidden">
          <div className="bg-[#f4f0f1] px-3 py-1.5 border-b border-[#e8e0e2] flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e]">{g.lineLabel}</span>
          </div>
          <div className="px-4 py-3">
            <p className="text-sm font-mono text-[#1a1a1a] leading-relaxed">{g.passage}</p>
            {g.annotations.length > 0 && (
              <ul className="mt-2 space-y-1.5 border-t border-[#f0eaeb] pt-2">
                {g.annotations.map((a, j) => (
                  <li key={j} className="flex items-start gap-1.5 text-xs text-[#5a6070]">
                    <span className="text-[#7c1c2e] flex-shrink-0 font-bold mt-0.5">→</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

function ReadingPassage({ content }: { content: string }) {
  return (
    <div className="rounded-lg bg-[#fdfcfb] border border-[#e8e0e2] px-6 py-5">
      <p className="text-sm leading-[1.85] text-[#1a1a1a]" style={SE}>{content}</p>
    </div>
  )
}

function LabeledSections({ content }: { content: string }) {
  const blocks = content.split(/\n\n+/).map((b) => b.trim()).filter(Boolean)

  return (
    <div className="space-y-4" style={SF}>
      {blocks.map((block, i) => {
        const blockLines = block.split('\n')
        const firstLine = blockLines[0].trim()
        const restLines = blockLines.slice(1)
        const restText = restLines.join('\n').trim()

        // Detect label: ends with colon, or short first line followed by content
        const isLabel = firstLine.endsWith(':') && restText.length > 0
        if (isLabel) {
          const label = firstLine.slice(0, -1)
          // Check if restText has sub-annotations (→ lines)
          const hasAnnotations = restLines.some((l) => l.trim().startsWith('→'))
          if (hasAnnotations) {
            const mainLines: string[] = []
            const annotationLines: string[] = []
            for (const l of restLines) {
              if (l.trim().startsWith('→')) annotationLines.push(l.trim().replace(/^→\s*/, ''))
              else if (l.trim()) mainLines.push(l.trim())
            }
            return (
              <div key={i} className="rounded-lg border border-[#e8e0e2] overflow-hidden">
                <div className="bg-[#f4f0f1] px-4 py-2 border-b border-[#e8e0e2]">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e]">{label}</span>
                </div>
                <div className="px-4 py-3 space-y-2">
                  {mainLines.map((l, j) => <p key={j} className="text-sm text-[#1a1a1a] leading-relaxed">{l}</p>)}
                  {annotationLines.map((a, j) => (
                    <div key={j} className="flex items-start gap-2 text-xs text-[#5a6070] bg-[#faf8f5] rounded px-3 py-2">
                      <span className="text-[#7c1c2e] font-bold flex-shrink-0">→</span>
                      <span>{a}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          }
          return (
            <div key={i}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e] mb-1.5">{label}</p>
              <p className="text-sm leading-relaxed text-[#1a1a1a]">{restText}</p>
            </div>
          )
        }

        // No label — check for inline annotations in block
        const hasArrows = blockLines.some((l) => l.trim().startsWith('→') || l.trim().startsWith('✓') || l.trim().startsWith('✗'))
        if (hasArrows) {
          return (
            <div key={i} className="rounded-lg border border-[#e8e0e2] overflow-hidden">
              <div className="px-4 py-3 space-y-2">
                {blockLines.map((l, j) => {
                  const t = l.trim()
                  if (t.startsWith('→')) {
                    return (
                      <div key={j} className="flex items-start gap-2 text-xs text-[#5a6070] bg-[#faf8f5] rounded px-3 py-2">
                        <span className="text-[#7c1c2e] font-bold flex-shrink-0">→</span>
                        <span>{t.replace(/^→\s*/, '')}</span>
                      </div>
                    )
                  }
                  if (t) return <p key={j} className="text-sm text-[#1a1a1a] leading-relaxed font-medium">{t}</p>
                  return null
                })}
              </div>
            </div>
          )
        }

        // Plain paragraph
        return <p key={i} className="text-sm leading-relaxed text-[#1a1a1a]">{block}</p>
      })}
    </div>
  )
}

function ExhibitContent({ title, content }: { title: string; content: string }) {
  if (content.includes('Words Correct Per Minute')) return <FluencyRubric content={content} />
  if (title.toUpperCase().includes('PASSAGE')) return <ReadingPassage content={content} />
  if (/Line \d+:/.test(content)) return <RunningRecord content={content} />
  return <LabeledSections content={content} />
}

// ── Prompt renderer ───────────────────────────────────────────────────────────

function PromptBody({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/).map((p) => p.trim()).filter(Boolean)
  return (
    <div className="space-y-4 text-sm text-[#1a1a1a]" style={SF}>
      {paragraphs.map((para, i) => {
        if (para.startsWith('•')) {
          const items = para.split(/\n/).map((l) => l.replace(/^•\s*/, '').trim()).filter(Boolean)
          return (
            <ul key={i} className="space-y-2 pl-1">
              {items.map((item, j) => (
                <li key={j} className="flex items-start gap-2.5">
                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#7c1c2e] flex-shrink-0" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          )
        }
        return <p key={i} className="leading-relaxed text-[#2a2a2a]">{para}</p>
      })}
    </div>
  )
}

// ── Main page ─────────────────────────────────────────────────────────────────

const CRITERION_LABEL: Record<string, string> = {
  purpose: 'Purpose',
  knowledge: 'Subject Knowledge',
  support: 'Support',
  rationale: 'Rationale',
}

function criterionColor(score: number) {
  if (score === 4) return '#16a34a'
  if (score === 3) return '#2563eb'
  if (score === 2) return '#d97706'
  return '#dc2626'
}

export default function CRPage() {
  const params = useParams()
  const examCode = params.examCode as string

  const [crs, setCrs] = useState<CR[]>([])
  const [selected, setSelected] = useState<CR | null>(null)
  const [attempts, setAttempts] = useState<Attempt[]>([])
  const [attemptedIds, setAttemptedIds] = useState<Set<string>>(new Set())
  const [responseText, setResponseText] = useState('')
  const [grading, setGrading] = useState(false)
  const [loadingCR, setLoadingCR] = useState(false)
  const [result, setResult] = useState<Attempt | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    fetch(`/api/cr?examCode=${examCode}`)
      .then((r) => r.json())
      .then((d) => { setCrs(d.crs || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [examCode])

  async function selectCR(cr: CR) {
    setSelected(cr)
    setResponseText('')
    setResult(null)
    setError('')
    setLoadingCR(true)
    try {
      const res = await fetch(`/api/cr/${cr._id}`)
      const data = await res.json()
      if (data.cr) setSelected(data.cr)
      const fetchedAttempts = data.attempts || []
      setAttempts(fetchedAttempts)
      if (fetchedAttempts.length > 0) {
        setAttemptedIds((prev) => new Set(Array.from(prev).concat(cr._id)))
      }
    } finally {
      setLoadingCR(false)
    }
  }

  async function handleGrade() {
    if (!selected || !responseText.trim()) return
    setGrading(true)
    setError('')
    try {
      const res = await fetch(`/api/cr/${selected._id}/grade`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ responseText }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data)
      setAttemptedIds((prev) => new Set(Array.from(prev).concat(selected._id)))
      setAttempts((prev) => [{ ...data, submittedAt: new Date().toISOString() } as Attempt, ...prev])
    } catch {
      setError('Failed to grade response. Please try again.')
    }
    setGrading(false)
  }

  function handleTryAgain() {
    setResult(null)
    setResponseText('')
    setTimeout(() => {
      textareaRef.current?.focus()
      textareaRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 50)
  }

  const wordCount = responseText.trim().split(/\s+/).filter(Boolean).length

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#faf8f5]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#e8e0e2] border-t-[#7c1c2e]" />
      </div>
    )
  }

  // Parse selected CR scenario
  const scenario = selected?.scenarioContext ? parseScenario(selected.scenarioContext) : null
  const studentInfo = scenario ? parseStudentLine(scenario.header) : null

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#faf8f5] select-none">

      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <div className="flex-shrink-0 bg-[#7c1c2e] px-6 py-3.5 flex items-center gap-5">
        <Link
          href={`/dashboard/${examCode}`}
          className="text-sm text-[#e8b4bc] hover:text-white transition-colors"
          style={SF}
        >
          ← Dashboard
        </Link>
        <div className="border-l border-[#a04060] pl-5">
          <h1 className="text-base font-bold text-white leading-none" style={SE}>Written Response Practice</h1>
          <p className="mt-0.5 text-[11px] text-[#e8b4bc]" style={SF}>
            Read the scenario · Write your response · Get scored 1–4 by AI
          </p>
        </div>
      </div>

      {/* ── Prompt selector row ─────────────────────────────────────────────── */}
      <div className="flex-shrink-0 border-b border-[#e8e0e2] bg-white px-6 py-3 flex items-center gap-2 overflow-x-auto">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b9b9b] flex-shrink-0 mr-1" style={SF}>
          {crs.length} Prompts
        </p>
        {crs.map((cr) => {
          const active = selected?._id === cr._id
          const done = attemptedIds.has(cr._id)
          return (
            <button
              key={cr._id}
              onClick={() => selectCR(cr)}
              className="flex-shrink-0 flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-colors"
              style={{
                ...SF,
                background: active ? '#7c1c2e' : done ? '#f0fdf4' : 'white',
                borderColor: active ? '#7c1c2e' : done ? '#86efac' : '#e8e0e2',
                color: active ? 'white' : done ? '#16a34a' : '#1a1a1a',
              }}
            >
              {done && !active && <span>✓</span>}
              <span>Response {cr.crNumber}</span>
              {cr.bundleOnly && !active && (
                <span className="text-[9px] opacity-60">🔒</span>
              )}
            </button>
          )
        })}
      </div>

      {/* ── Body ────────────────────────────────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* Main content */}
        <main className="flex-1 overflow-y-auto relative">
          {loadingCR && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-[#faf8f5]/80">
              <div className="h-6 w-6 animate-spin rounded-full border-4 border-[#e8e0e2] border-t-[#7c1c2e]" />
            </div>
          )}
          {!selected ? (
            <div className="px-10 py-10">
              {/* Header */}
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e] mb-3" style={SF}>Written Response Practice</p>
              <h2 className="text-3xl font-bold text-[#1a1a1a] leading-snug mb-3" style={SE}>
                Practice writing like the real exam.
              </h2>
              <p className="text-base text-[#5a5a5a] leading-relaxed mb-8 max-w-3xl" style={SF}>
                Each prompt gives you a real student scenario — a running record, phonics assessment, or comprehension observation — then asks you to analyze it in writing. Your response is scored 1–4 using the rubric below.
              </p>

              {/* Scoring rubric — 2-column grid */}
              <div className="mb-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e] mb-3" style={SF}>Scoring Rubric</p>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {
                      score: '4',
                      label: 'Thorough',
                      color: '#16a34a',
                      bg: '#f0fdf4',
                      border: '#86efac',
                      summary: 'Shows thorough knowledge and understanding of the subject matter.',
                      bullets: [
                        'The purpose of the assignment is fully achieved.',
                        'Subject matter knowledge is applied substantially, accurately, and appropriately.',
                        'Supporting evidence is sound, with high-quality and relevant examples.',
                        'The response demonstrates ably reasoned, comprehensive understanding.',
                      ],
                    },
                    {
                      score: '3',
                      label: 'Adequate',
                      color: '#2563eb',
                      bg: '#eff6ff',
                      border: '#93c5fd',
                      summary: 'Shows adequate knowledge and understanding of the subject matter.',
                      bullets: [
                        'The purpose of the assignment is largely achieved.',
                        'Subject matter knowledge is generally accurate and appropriately applied.',
                        'Supporting evidence is adequate, with some relevant examples.',
                        'The response demonstrates adequately reasoned understanding.',
                      ],
                    },
                    {
                      score: '2',
                      label: 'Limited',
                      color: '#d97706',
                      bg: '#fffbeb',
                      border: '#fcd34d',
                      summary: 'Shows limited knowledge and understanding of the subject matter.',
                      bullets: [
                        'The purpose of the assignment is only partially achieved.',
                        'Subject matter knowledge is limited and may be inaccurate or inappropriate.',
                        'Supporting evidence is limited, with few relevant examples.',
                        'The response demonstrates limited, poorly reasoned understanding.',
                      ],
                    },
                    {
                      score: '1',
                      label: 'Weak',
                      color: '#dc2626',
                      bg: '#fef2f2',
                      border: '#fca5a5',
                      summary: 'Shows weak knowledge and understanding of the subject matter.',
                      bullets: [
                        'The purpose of the assignment is not achieved.',
                        'There is little or no accurate or appropriate application of subject matter knowledge.',
                        'Supporting evidence, if present, is weak with few or no relevant examples.',
                        'The response reflects little or no reasoning or understanding of the topic.',
                      ],
                    },
                  ].map((row) => (
                    <div key={row.score} className="rounded-xl border p-5" style={{ background: row.bg, borderColor: row.border }}>
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-3xl font-bold" style={{ color: row.color }}>{row.score}</span>
                        <span className="text-sm font-bold uppercase tracking-wide" style={{ color: row.color }}>{row.label}</span>
                      </div>
                      <p className="text-sm font-semibold text-[#1a1a1a] mb-2" style={SF}>{row.summary}</p>
                      <ul className="space-y-1.5">
                        {row.bullets.map((b, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-[#4a4a4a] leading-relaxed" style={SF}>
                            <span className="mt-1.5 flex-shrink-0 h-1 w-1 rounded-full bg-[#9b9b9b]" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <button
                onClick={() => crs[0] && selectCR(crs[0])}
                disabled={crs.length === 0}
                className="rounded-lg bg-[#7c1c2e] px-8 py-3 text-sm font-semibold text-white hover:bg-[#5a1220] transition-colors disabled:opacity-40"
                style={SF}
              >
                Start with Response 1 →
              </button>
            </div>
          ) : (
            <div className="px-10 py-8 space-y-5">

              {/* Prompt label */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e]" style={SF}>
                  Written Response {selected.crNumber} · {TYPE_LABEL[selected.crType]}
                </p>
              </div>

              {/* Student info banner */}
              {studentInfo && (
                <div className="rounded-xl border border-[#e8e0e2] bg-white overflow-hidden shadow-sm">
                  <div className="bg-[#7c1c2e] px-5 py-2.5 flex items-center gap-4">
                    <div>
                      <p className="text-xs font-bold text-white" style={SF}>{studentInfo.student}</p>
                      <p className="text-[10px] text-[#e8b4bc]" style={SF}>Grade {studentInfo.grade}</p>
                    </div>
                  </div>
                  <div className="px-5 py-3">
                    <p className="text-sm text-[#3a3a3a] leading-relaxed" style={SF}>{studentInfo.context}</p>
                  </div>
                </div>
              )}

              {/* Exhibits */}
              {scenario && scenario.exhibits.map((ex, i) => (
                <div key={i} className="rounded-xl border border-[#e8e0e2] bg-white overflow-hidden shadow-sm">
                  <div className="border-b border-[#e8e0e2] px-5 py-2.5 flex items-center gap-2">
                    <span className="inline-flex items-center justify-center h-5 w-5 rounded bg-[#7c1c2e] text-white text-[9px] font-bold flex-shrink-0">
                      {i + 1}
                    </span>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e]" style={SF}>
                      {ex.title.replace(/^EXHIBIT \d+ — /, '')}
                    </p>
                  </div>
                  <div className="p-5">
                    <ExhibitContent title={ex.title} content={ex.content} />
                  </div>
                </div>
              ))}

              {/* Assignment */}
              <div className="rounded-xl border border-[#e8e0e2] bg-white overflow-hidden shadow-sm">
                <div className="border-b border-[#e8e0e2] px-5 py-2.5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e]" style={SF}>Assignment</p>
                </div>
                <div className="p-5">
                  <PromptBody text={selected.prompt} />
                </div>
              </div>

              {/* Response or Result */}
              {!result ? (
                <div className="rounded-xl border border-[#e8e0e2] bg-white overflow-hidden shadow-sm">
                  <div className="border-b border-[#e8e0e2] px-5 py-2.5 flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e]" style={SF}>Your Response</p>
                    <span
                      className={`text-xs font-semibold ${wordCount >= 150 ? 'text-green-600' : 'text-[#9b9b9b]'}`}
                      style={SF}
                    >
                      {wordCount} words{wordCount >= 150 ? ' ✓' : ' · aim for 150–300'}
                    </span>
                  </div>
                  <div className="p-5">
                    <textarea
                      ref={textareaRef}
                      value={responseText}
                      onChange={(e) => setResponseText(e.target.value)}
                      disabled={grading}
                      className="w-full rounded-lg border border-[#e8e0e2] bg-[#faf8f5] p-4 text-sm text-[#1a1a1a] leading-relaxed outline-none focus:border-[#7c1c2e] focus:ring-1 focus:ring-[#7c1c2e] disabled:opacity-60 resize-y select-text"
                      style={{ ...SF, minHeight: '280px' }}
                      placeholder="Write your response here…"
                    />
                    {error && (
                      <p className="mt-3 rounded-lg bg-red-50 px-4 py-2.5 text-sm text-red-700" style={SF}>{error}</p>
                    )}
                    <button
                      onClick={handleGrade}
                      disabled={grading || !responseText.trim()}
                      className="mt-4 w-full rounded-lg bg-[#7c1c2e] py-3 text-sm font-semibold text-white hover:bg-[#5a1220] disabled:opacity-50 transition-colors"
                      style={SF}
                    >
                      {grading ? 'Grading your response…' : 'Submit for Grading'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl border border-[#e8e0e2] bg-white overflow-hidden shadow-sm">
                  {/* Score header */}
                  <div
                    className="px-6 py-5 flex items-center gap-5"
                    style={{ borderBottom: '1px solid #e8e0e2' }}
                  >
                    <span
                      className="text-5xl font-bold leading-none"
                      style={{ ...SE, color: PERF_COLOR[result.performanceLevel] || '#1a1a1a' }}
                    >
                      {result.score}/4
                    </span>
                    <div>
                      <span
                        className="inline-block rounded-full px-3 py-1 text-sm font-bold text-white"
                        style={{ ...SF, backgroundColor: PERF_COLOR[result.performanceLevel] || '#1a1a1a' }}
                      >
                        {result.performanceLevel}
                      </span>
                      <p className="mt-1 text-xs text-[#9b9b9b]" style={SF}>{result.wordCount} words</p>
                    </div>
                  </div>

                  <div className="p-6 space-y-5">
                    {/* Per-criterion scores */}
                    {result.criteria && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b9b9b] mb-2.5" style={SF}>Score by Criterion</p>
                        <div className="grid grid-cols-2 gap-2">
                          {(Object.keys(CRITERION_LABEL) as (keyof CriteriaScores)[]).map((key) => {
                            const val = result.criteria![key]
                            return (
                              <div key={key} className="flex items-center justify-between rounded-lg border border-[#e8e0e2] px-3 py-2">
                                <span className="text-xs text-[#4a4a4a]" style={SF}>{CRITERION_LABEL[key]}</span>
                                <span className="text-xs font-bold" style={{ ...SF, color: criterionColor(val) }}>{val}/4</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}

                    {/* Feedback */}
                    <p className="text-sm leading-relaxed text-[#1a1a1a] border-t border-[#f0eaeb] pt-4" style={SF}>{result.feedback}</p>

                    {/* Strengths */}
                    {result.strengths.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-green-700 mb-2.5" style={SF}>Strengths</p>
                        <ul className="space-y-2">
                          {result.strengths.map((s, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-[#1a1a1a]" style={SF}>
                              <span className="text-green-600 flex-shrink-0 font-bold mt-0.5">✓</span>
                              <span className="leading-relaxed">{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Improvements */}
                    {result.improvements.length > 0 && (
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e] mb-2.5" style={SF}>To Improve</p>
                        <ul className="space-y-2">
                          {result.improvements.map((s, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-[#1a1a1a]" style={SF}>
                              <span className="text-[#7c1c2e] flex-shrink-0 font-bold mt-0.5">→</span>
                              <span className="leading-relaxed">{s}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Rubric reminder */}
                    <div className="rounded-lg bg-[#faf8f5] border border-[#e8e0e2] px-4 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b9b9b] mb-1.5" style={SF}>Official Scoring Scale</p>
                      <div className="grid grid-cols-4 gap-2">
                        {([['4', 'Thorough', '#16a34a'], ['3', 'Adequate', '#2563eb'], ['2', 'Limited', '#d97706'], ['1', 'Weak', '#dc2626']] as const).map(([n, label, color]) => (
                          <div key={n} className="text-center">
                            <p className="text-sm font-bold" style={{ ...SF, color }}>{n}</p>
                            <p className="text-[10px] text-[#6b6b6b]" style={SF}>{label}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={handleTryAgain}
                      className="rounded-lg border-2 border-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-[#7c1c2e] hover:bg-[#f9f0f2] transition-colors"
                      style={SF}
                    >
                      Try Again
                    </button>
                  </div>
                </div>
              )}

              {/* Previous attempts */}
              {attempts.length > 0 && !result && (
                <div className="rounded-xl border border-[#e8e0e2] bg-white overflow-hidden shadow-sm">
                  <div className="border-b border-[#e8e0e2] px-5 py-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b9b9b]" style={SF}>
                      Previous Attempts ({attempts.length})
                    </p>
                  </div>
                  <div className="p-4 space-y-2">
                    {attempts.slice(0, 5).map((a, i) => (
                      <div key={i} className="flex items-center justify-between rounded-lg border border-[#f0eaeb] px-4 py-2.5">
                        <p className="text-sm text-[#9b9b9b]" style={SF}>
                          {new Date(a.submittedAt).toLocaleDateString()}
                        </p>
                        <span
                          className="text-sm font-bold"
                          style={{ ...SF, color: PERF_COLOR[a.performanceLevel] || '#1a1a1a' }}
                        >
                          {a.score}/4 — {a.performanceLevel}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="h-6" />
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
