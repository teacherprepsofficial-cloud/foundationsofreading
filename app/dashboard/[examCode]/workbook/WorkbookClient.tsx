'use client'

import { useState } from 'react'
import Link from 'next/link'
import type {
  WorkbookSubarea,
  WorkbookExercise,
  ClassifyTwoExercise,
  OrderSequenceExercise,
  WordBankMatchExercise,
  StrategyMatchExercise,
} from '@/data/workbook-190'

// ─── Utilities ────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

// ─── Design tokens ───────────────────────────────────────────────────────────
const B = '#1d4ed8'
const B_LIGHT = '#eff6ff'
const B_BORDER = '#93c5fd'

// ─── Exercise wrapper (handles reset via key) ─────────────────────────────────
function ExerciseWrapper({ exercise }: { exercise: WorkbookExercise }) {
  const [resetKey, setResetKey] = useState(0)
  const handleReset = () => setResetKey(k => k + 1)

  switch (exercise.type) {
    case 'classify-two':
      return <ClassifyTwoEx key={resetKey} ex={exercise} onReset={handleReset} />
    case 'order-sequence':
      return <OrderSequenceEx key={resetKey} ex={exercise} onReset={handleReset} />
    case 'word-bank-match':
      return <WordBankMatchEx key={resetKey} ex={exercise} onReset={handleReset} />
    case 'strategy-match':
      return <StrategyMatchEx key={resetKey} ex={exercise} onReset={handleReset} />
  }
}

// ─── Exercise label badge ─────────────────────────────────────────────────────
function ExerciseBadge({ type }: { type: WorkbookExercise['type'] }) {
  const labels: Record<WorkbookExercise['type'], string> = {
    'classify-two': 'SORT',
    'order-sequence': 'ORDER',
    'word-bank-match': 'MATCH',
    'strategy-match': 'MATCH',
  }
  const colors: Record<WorkbookExercise['type'], string> = {
    'classify-two': '#2563eb',
    'order-sequence': '#7c3aed',
    'word-bank-match': '#0d9488',
    'strategy-match': '#0d9488',
  }
  return (
    <span
      style={{
        display: 'inline-block',
        background: colors[type] + '15',
        color: colors[type],
        border: `1px solid ${colors[type]}30`,
        borderRadius: 4,
        padding: '2px 7px',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.08em',
        fontFamily: 'var(--font-sans)',
        marginBottom: 6,
      }}
    >
      {labels[type]}
    </span>
  )
}

// ─── Submit / Retry bar ───────────────────────────────────────────────────────
function SubmitBar({
  submitted,
  canSubmit,
  score,
  total,
  onSubmit,
  onReset,
}: {
  submitted: boolean
  canSubmit: boolean
  score: number
  total: number
  onSubmit: () => void
  onReset: () => void
}) {
  const pct = total > 0 ? Math.round((score / total) * 100) : 0
  const passed = pct === 100

  return (
    <div
      style={{
        marginTop: 20,
        paddingTop: 16,
        borderTop: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 10,
      }}
    >
      {!submitted ? (
        <>
          <span style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#9ca3af' }}>
            {canSubmit ? 'All items placed — ready to check' : 'Place all items to check answers'}
          </span>
          <button
            onClick={onSubmit}
            disabled={!canSubmit}
            style={{
              background: canSubmit ? B : '#e5e7eb',
              color: canSubmit ? 'white' : '#9ca3af',
              border: 'none',
              borderRadius: 7,
              padding: '8px 18px',
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 600,
              cursor: canSubmit ? 'pointer' : 'not-allowed',
              transition: 'background 0.12s',
            }}
          >
            Check Answers
          </button>
        </>
      ) : (
        <>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: passed ? '#f0fdf4' : '#fef2f2',
              border: `1px solid ${passed ? '#86efac' : '#fca5a5'}`,
              borderRadius: 8,
              padding: '8px 14px',
            }}
          >
            <span style={{ fontSize: 18 }}>{passed ? '🎉' : '💪'}</span>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: 15,
                  fontWeight: 700,
                  color: passed ? '#14532d' : '#7f1d1d',
                  margin: 0,
                }}
              >
                {score} / {total} correct{passed ? ' — Perfect!' : ''}
              </p>
              {!passed && (
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#6b7280', margin: 0, marginTop: 1 }}>
                  Review the corrections above, then try again.
                </p>
              )}
            </div>
          </div>
          <button
            onClick={onReset}
            style={{
              background: 'white',
              color: '#374151',
              border: '1.5px solid #e5e7eb',
              borderRadius: 7,
              padding: '8px 18px',
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Try Again
          </button>
        </>
      )}
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// CLASSIFY TWO
// ══════════════════════════════════════════════════════════════════════════════

function ClassifyTwoEx({ ex, onReset }: { ex: ClassifyTwoExercise; onReset: () => void }) {
  const [bank, setBank] = useState<string[]>(() => shuffle(ex.items.map(i => i.id)))
  const [placed, setPlaced] = useState<{ A: string[]; B: string[] }>({ A: [], B: [] })
  const [selected, setSelected] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const allPlaced = bank.length === 0
  const getItem = (id: string) => ex.items.find(i => i.id === id)!

  function handleItemClick(id: string) {
    if (submitted) return
    setSelected(s => (s === id ? null : id))
  }

  function handleCategoryClick(cat: 'A' | 'B') {
    if (submitted || !selected) return
    const sel = selected
    setBank(b => b.filter(id => id !== sel))
    setPlaced(p => ({
      A: cat === 'A'
        ? [...p.A.filter(id => id !== sel), sel]
        : p.A.filter(id => id !== sel),
      B: cat === 'B'
        ? [...p.B.filter(id => id !== sel), sel]
        : p.B.filter(id => id !== sel),
    }))
    setSelected(null)
  }

  function handleSubmit() {
    if (!allPlaced) return
    setSubmitted(true)
  }

  function isItemCorrect(id: string) {
    const item = getItem(id)
    return placed[item.correct].includes(id)
  }

  const score = submitted
    ? [...placed.A, ...placed.B].filter(id => isItemCorrect(id)).length
    : 0

  const catALines = ex.categoryA.split('\n')
  const catBLines = ex.categoryB.split('\n')

  return (
    <div>
      <ExerciseBadge type="classify-two" />
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>
        {ex.title}
      </h3>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#6b7280', margin: '0 0 16px', lineHeight: 1.5 }}>
        {ex.instruction}
      </p>

      {/* Bank */}
      {bank.length > 0 && (
        <div style={{ marginBottom: 14 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
            Items to sort
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {bank.map(id => {
              const item = getItem(id)
              const isSel = selected === id
              return (
                <button
                  key={id}
                  onClick={() => handleItemClick(id)}
                  style={{
                    background: isSel ? B : 'white',
                    color: isSel ? 'white' : '#111827',
                    border: `1.5px solid ${isSel ? B : '#d1d5db'}`,
                    borderRadius: 8,
                    padding: '8px 13px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    fontWeight: isSel ? 600 : 400,
                    cursor: 'pointer',
                    textAlign: 'left',
                    lineHeight: 1.4,
                    transition: 'all 0.12s',
                    maxWidth: 380,
                  }}
                >
                  {item.primary}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Categories */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {(['A', 'B'] as const).map(cat => {
          const catItems = placed[cat]
          const label = cat === 'A' ? catALines : catBLines
          return (
            <div
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              style={{
                border: `2px ${selected && !submitted ? 'dashed' : 'solid'} ${selected && !submitted ? B : '#e5e7eb'}`,
                borderRadius: 12,
                padding: 14,
                minHeight: 100,
                background: selected && !submitted ? B_LIGHT : '#f9fafb',
                cursor: selected && !submitted ? 'pointer' : 'default',
                transition: 'all 0.12s',
              }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, fontWeight: 700, color: B, margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                {label[0]}
              </p>
              {label[1] && (
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#6b7280', margin: '-6px 0 10px', lineHeight: 1.3 }}>
                  {label[1]}
                </p>
              )}
              {catItems.length === 0 && (
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#d1d5db', fontStyle: 'italic' }}>
                  {selected ? 'Click to place here' : 'Empty'}
                </p>
              )}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {catItems.map(id => {
                  const item = getItem(id)
                  const isSel = selected === id
                  const correct = submitted ? isItemCorrect(id) : undefined
                  let bg = isSel ? B : 'white'
                  let border = isSel ? B : '#d1d5db'
                  let color = isSel ? 'white' : '#111827'
                  if (submitted) {
                    bg = correct ? '#f0fdf4' : '#fef2f2'
                    border = correct ? '#86efac' : '#fca5a5'
                    color = correct ? '#14532d' : '#7f1d1d'
                  }
                  return (
                    <button
                      key={id}
                      onClick={e => { e.stopPropagation(); handleItemClick(id) }}
                      style={{
                        background: bg,
                        color,
                        border: `1.5px solid ${border}`,
                        borderRadius: 7,
                        padding: '6px 11px',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 12,
                        fontWeight: isSel ? 600 : 400,
                        cursor: submitted ? 'default' : 'pointer',
                        textAlign: 'left',
                        lineHeight: 1.4,
                        transition: 'all 0.12s',
                      }}
                    >
                      {submitted && (
                        <span style={{ marginRight: 4 }}>{correct ? '✓' : '✗'}</span>
                      )}
                      {item.primary}
                      {submitted && !correct && (
                        <span style={{ display: 'block', fontSize: 10, marginTop: 2, color: '#9ca3af' }}>
                          → should be {item.correct === 'A' ? catALines[0] : catBLines[0]}
                        </span>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      <SubmitBar
        submitted={submitted}
        canSubmit={allPlaced}
        score={score}
        total={ex.items.length}
        onSubmit={handleSubmit}
        onReset={onReset}
      />
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// ORDER SEQUENCE
// ══════════════════════════════════════════════════════════════════════════════

function OrderSequenceEx({ ex, onReset }: { ex: OrderSequenceExercise; onReset: () => void }) {
  const [order, setOrder] = useState<string[]>(() => shuffle(ex.items.map(i => i.id)))
  const [selected, setSelected] = useState<number | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const getItem = (id: string) => ex.items.find(i => i.id === id)!

  function handleSlotClick(idx: number) {
    if (submitted) return
    if (selected === null) {
      setSelected(idx)
      return
    }
    if (selected === idx) {
      setSelected(null)
      return
    }
    // Swap
    setOrder(o => {
      const next = [...o]
      ;[next[selected], next[idx]] = [next[idx], next[selected]]
      return next
    })
    setSelected(null)
  }

  function isSlotCorrect(idx: number) {
    const item = getItem(order[idx])
    return item.correctIndex === idx
  }

  const score = submitted ? order.filter((id, idx) => getItem(id).correctIndex === idx).length : 0

  return (
    <div>
      <ExerciseBadge type="order-sequence" />
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>
        {ex.title}
      </h3>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#6b7280', margin: '0 0 16px', lineHeight: 1.5 }}>
        {ex.instruction}
      </p>

      {/* Direction label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
        <span style={{ fontFamily: 'var(--font-sans)', fontSize: 11, color: '#6b7280', fontWeight: 600, whiteSpace: 'nowrap' }}>
          {ex.directionLabel}
        </span>
        <span style={{ flex: 1, height: 1, background: '#e5e7eb' }} />
      </div>

      {/* Slots */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(order.length, 4)}, 1fr)`,
          gap: 8,
        }}
      >
        {order.map((id, idx) => {
          const item = getItem(id)
          const isSel = selected === idx
          const correct = submitted ? isSlotCorrect(idx) : undefined
          const correctItem = submitted && !correct
            ? ex.items.find(i => i.correctIndex === idx)
            : null

          let bg = isSel ? B_LIGHT : 'white'
          let border = isSel ? B : '#e5e7eb'
          let numBg = isSel ? B : '#f3f4f6'
          let numColor = isSel ? 'white' : '#6b7280'
          if (submitted) {
            bg = correct ? '#f0fdf4' : '#fef2f2'
            border = correct ? '#86efac' : '#fca5a5'
            numBg = correct ? '#dcfce7' : '#fee2e2'
            numColor = correct ? '#14532d' : '#7f1d1d'
          }

          return (
            <button
              key={id}
              onClick={() => handleSlotClick(idx)}
              style={{
                background: bg,
                border: `2px solid ${border}`,
                borderRadius: 10,
                padding: '12px 10px 10px',
                cursor: submitted ? 'default' : 'pointer',
                textAlign: 'center',
                transition: 'all 0.12s',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  background: numBg,
                  color: numColor,
                  fontSize: 11,
                  fontWeight: 700,
                  fontFamily: 'var(--font-sans)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                {idx + 1}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  fontWeight: isSel ? 600 : 400,
                  color: submitted ? (correct ? '#14532d' : '#7f1d1d') : (isSel ? B : '#111827'),
                  lineHeight: 1.35,
                }}
              >
                {item.label}
              </span>
              {submitted && !correct && correctItem && (
                <span style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: '#9ca3af', lineHeight: 1.3 }}>
                  → Should be: {correctItem.label}
                </span>
              )}
              {submitted && correct && (
                <span style={{ fontSize: 12 }}>✓</span>
              )}
              {submitted && !correct && (
                <span style={{ fontSize: 12 }}>✗</span>
              )}
            </button>
          )
        })}
      </div>

      {selected !== null && !submitted && (
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: B, marginTop: 8, fontWeight: 500 }}>
          Slot {selected + 1} selected — click another slot to swap
        </p>
      )}

      <SubmitBar
        submitted={submitted}
        canSubmit={true}
        score={score}
        total={ex.items.length}
        onSubmit={() => setSubmitted(true)}
        onReset={onReset}
      />
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// WORD BANK MATCH
// ══════════════════════════════════════════════════════════════════════════════

type WBState = {
  slots: Record<string, string | null>
  bank: string[]
  selected: string | null
}

function WordBankMatchEx({ ex, onReset }: { ex: WordBankMatchExercise; onReset: () => void }) {
  const [state, setState] = useState<WBState>(() => ({
    slots: Object.fromEntries(ex.pairs.map(p => [p.id, null])),
    bank: shuffle(ex.pairs.map(p => p.id)),
    selected: null,
  }))
  const [submitted, setSubmitted] = useState(false)

  const getTerm = (id: string) => ex.pairs.find(p => p.id === id)!.term

  function handleTermClick(termId: string) {
    if (submitted) return
    setState(s => ({ ...s, selected: s.selected === termId ? null : termId }))
  }

  function handleSlotClick(pairId: string) {
    if (submitted) return
    setState(s => {
      if (!s.selected) {
        const termInSlot = s.slots[pairId]
        if (termInSlot) return { ...s, selected: termInSlot }
        return s
      }
      const sel = s.selected
      const destCurrent = s.slots[pairId]
      const sourceSlot = Object.entries(s.slots).find(([, v]) => v === sel)?.[0]

      const newSlots = { ...s.slots }
      let newBank = [...s.bank]

      if (sourceSlot) {
        newSlots[sourceSlot] = null
      } else {
        newBank = newBank.filter(id => id !== sel)
      }

      if (destCurrent && destCurrent !== sel) {
        if (sourceSlot) {
          newSlots[sourceSlot] = destCurrent
        } else {
          newBank = [...newBank, destCurrent]
        }
      }

      newSlots[pairId] = sel
      return { slots: newSlots, bank: newBank, selected: null }
    })
  }

  const allFilled = Object.values(state.slots).every(v => v !== null)
  const score = submitted
    ? Object.entries(state.slots).filter(([pairId, termId]) => termId === pairId).length
    : 0

  function isCorrect(pairId: string) {
    return state.slots[pairId] === pairId
  }

  return (
    <div>
      <ExerciseBadge type="word-bank-match" />
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>
        {ex.title}
      </h3>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#6b7280', margin: '0 0 16px', lineHeight: 1.5 }}>
        {ex.instruction}
      </p>

      {/* Term bank */}
      {state.bank.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
            Term bank
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {state.bank.map(termId => {
              const isSel = state.selected === termId
              return (
                <button
                  key={termId}
                  onClick={() => handleTermClick(termId)}
                  style={{
                    background: isSel ? B : 'white',
                    color: isSel ? 'white' : '#111827',
                    border: `1.5px solid ${isSel ? B : '#d1d5db'}`,
                    borderRadius: 7,
                    padding: '6px 13px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 13,
                    fontWeight: isSel ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.12s',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {getTerm(termId)}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Pairs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {ex.pairs.map(pair => {
          const placedTermId = state.slots[pair.id]
          const correct = submitted ? isCorrect(pair.id) : undefined
          const isSel = state.selected === placedTermId && placedTermId !== null

          return (
            <div
              key={pair.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto',
                gap: 10,
                alignItems: 'center',
                background: submitted
                  ? correct ? '#f0fdf4' : '#fef2f2'
                  : 'white',
                border: `1px solid ${submitted
                  ? correct ? '#86efac' : '#fca5a5'
                  : '#e5e7eb'}`,
                borderRadius: 9,
                padding: '10px 14px',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 13,
                  color: submitted ? (correct ? '#14532d' : '#374151') : '#374151',
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {submitted && (
                  <span style={{ marginRight: 6 }}>{correct ? '✓' : '✗'}</span>
                )}
                {pair.definition}
                {submitted && !correct && (
                  <span style={{ display: 'block', marginTop: 3, fontSize: 11, color: '#15803d', fontWeight: 600 }}>
                    → {pair.term}
                  </span>
                )}
              </p>
              <button
                onClick={() => handleSlotClick(pair.id)}
                style={{
                  background: placedTermId
                    ? (submitted ? (correct ? '#dcfce7' : '#fee2e2') : (isSel ? B : B_LIGHT))
                    : (state.selected ? B_LIGHT : '#f9fafb'),
                  color: placedTermId
                    ? (submitted ? (correct ? '#14532d' : '#7f1d1d') : (isSel ? 'white' : B))
                    : '#9ca3af',
                  border: `1.5px solid ${placedTermId
                    ? (submitted ? (correct ? '#86efac' : '#fca5a5') : (isSel ? B : B_BORDER))
                    : (state.selected ? B_BORDER : '#e5e7eb')}`,
                  borderRadius: 7,
                  padding: '6px 12px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: submitted ? 'default' : 'pointer',
                  minWidth: 140,
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.12s',
                  flexShrink: 0,
                }}
              >
                {placedTermId ? getTerm(placedTermId) : (state.selected ? 'Place here' : 'Empty slot')}
              </button>
            </div>
          )
        })}
      </div>

      <SubmitBar
        submitted={submitted}
        canSubmit={allFilled}
        score={score}
        total={ex.pairs.length}
        onSubmit={() => setSubmitted(true)}
        onReset={onReset}
      />
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// STRATEGY MATCH
// ══════════════════════════════════════════════════════════════════════════════

type SMState = {
  slots: Record<string, string | null>
  bank: string[]
  selected: string | null
}

function StrategyMatchEx({ ex, onReset }: { ex: StrategyMatchExercise; onReset: () => void }) {
  const [state, setState] = useState<SMState>(() => ({
    slots: Object.fromEntries(ex.pairs.map(p => [p.id, null])),
    bank: shuffle(ex.pairs.map(p => p.id)),
    selected: null,
  }))
  const [submitted, setSubmitted] = useState(false)

  const getRight = (id: string) => ex.pairs.find(p => p.id === id)!.right

  function handleChipClick(pairId: string) {
    if (submitted) return
    setState(s => ({ ...s, selected: s.selected === pairId ? null : pairId }))
  }

  function handleSlotClick(slotPairId: string) {
    if (submitted) return
    setState(s => {
      if (!s.selected) {
        const inSlot = s.slots[slotPairId]
        if (inSlot) return { ...s, selected: inSlot }
        return s
      }
      const sel = s.selected
      const destCurrent = s.slots[slotPairId]
      const sourceSlot = Object.entries(s.slots).find(([, v]) => v === sel)?.[0]

      const newSlots = { ...s.slots }
      let newBank = [...s.bank]

      if (sourceSlot) {
        newSlots[sourceSlot] = null
      } else {
        newBank = newBank.filter(id => id !== sel)
      }

      if (destCurrent && destCurrent !== sel) {
        if (sourceSlot) {
          newSlots[sourceSlot] = destCurrent
        } else {
          newBank = [...newBank, destCurrent]
        }
      }

      newSlots[slotPairId] = sel
      return { slots: newSlots, bank: newBank, selected: null }
    })
  }

  const allFilled = Object.values(state.slots).every(v => v !== null)
  const score = submitted
    ? Object.entries(state.slots).filter(([pairId, placed]) => placed === pairId).length
    : 0

  function isCorrect(pairId: string) {
    return state.slots[pairId] === pairId
  }

  return (
    <div>
      <ExerciseBadge type="strategy-match" />
      <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontWeight: 700, color: '#111827', margin: '0 0 4px' }}>
        {ex.title}
      </h3>
      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#6b7280', margin: '0 0 16px', lineHeight: 1.5 }}>
        {ex.instruction}
      </p>

      {/* Bank */}
      {state.bank.length > 0 && (
        <div style={{ marginBottom: 16 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>
            {ex.rightLabel} — select then place
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
            {state.bank.map(pairId => {
              const isSel = state.selected === pairId
              return (
                <button
                  key={pairId}
                  onClick={() => handleChipClick(pairId)}
                  style={{
                    background: isSel ? B : 'white',
                    color: isSel ? 'white' : '#111827',
                    border: `1.5px solid ${isSel ? B : '#d1d5db'}`,
                    borderRadius: 7,
                    padding: '6px 13px',
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    fontWeight: isSel ? 600 : 400,
                    cursor: 'pointer',
                    transition: 'all 0.12s',
                    lineHeight: 1.4,
                    textAlign: 'left',
                    maxWidth: 340,
                  }}
                >
                  {getRight(pairId)}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Column headers */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 6 }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>
          {ex.leftLabel}
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.07em', margin: 0 }}>
          {ex.rightLabel}
        </p>
      </div>

      {/* Pairs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {ex.pairs.map(pair => {
          const placedId = state.slots[pair.id]
          const correct = submitted ? isCorrect(pair.id) : undefined
          const isSel = state.selected === placedId && placedId !== null

          return (
            <div
              key={pair.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 8,
                alignItems: 'start',
              }}
            >
              {/* Left: strategy name */}
              <div
                style={{
                  background: submitted ? (correct ? '#f0fdf4' : '#fef2f2') : 'white',
                  border: `1px solid ${submitted ? (correct ? '#86efac' : '#fca5a5') : '#e5e7eb'}`,
                  borderRadius: 8,
                  padding: '9px 13px',
                }}
              >
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#111827', margin: 0, lineHeight: 1.4, fontWeight: 500 }}>
                  {pair.left}
                </p>
              </div>

              {/* Right: slot */}
              <button
                onClick={() => handleSlotClick(pair.id)}
                style={{
                  background: placedId
                    ? (submitted ? (correct ? '#dcfce7' : '#fee2e2') : (isSel ? B : B_LIGHT))
                    : (state.selected ? B_LIGHT : '#f9fafb'),
                  color: placedId
                    ? (submitted ? (correct ? '#14532d' : '#7f1d1d') : (isSel ? 'white' : B))
                    : '#9ca3af',
                  border: `1.5px solid ${placedId
                    ? (submitted ? (correct ? '#86efac' : '#fca5a5') : (isSel ? B : B_BORDER))
                    : (state.selected ? B_BORDER : '#e5e7eb')}`,
                  borderRadius: 8,
                  padding: '9px 13px',
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  fontWeight: placedId ? 500 : 400,
                  cursor: submitted ? 'default' : 'pointer',
                  textAlign: 'left',
                  lineHeight: 1.4,
                  transition: 'all 0.12s',
                  display: 'block',
                  width: '100%',
                }}
              >
                {placedId ? (
                  <>
                    {submitted && <span style={{ marginRight: 4 }}>{correct ? '✓' : '✗'}</span>}
                    {getRight(placedId)}
                    {submitted && !correct && (
                      <span style={{ display: 'block', fontSize: 10, marginTop: 3, color: '#15803d', fontWeight: 600 }}>
                        → {pair.right}
                      </span>
                    )}
                  </>
                ) : (
                  state.selected ? 'Place here →' : 'Empty — select from bank above'
                )}
              </button>
            </div>
          )
        })}
      </div>

      <SubmitBar
        submitted={submitted}
        canSubmit={allFilled}
        score={score}
        total={ex.pairs.length}
        onSubmit={() => setSubmitted(true)}
        onReset={onReset}
      />
    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN WORKBOOK CLIENT
// ══════════════════════════════════════════════════════════════════════════════

export default function WorkbookClient({
  workbook,
  examCode,
}: {
  workbook: WorkbookSubarea[]
  examCode: string
}) {
  const [activeSub, setActiveSub] = useState<'I' | 'II' | 'III'>('I')
  const current = workbook.find(s => s.id === activeSub)!
  const subIndex = workbook.findIndex(s => s.id === activeSub)
  const prevSub = subIndex > 0 ? workbook[subIndex - 1] : null
  const nextSub = subIndex < workbook.length - 1 ? workbook[subIndex + 1] : null

  return (
    <div className="min-h-screen" style={{ background: '#f8f9fa' }}>

      {/* ── Header + Subarea Nav ── */}
      <div className="bg-white border-b border-[#e5e7eb]">
        <div className="px-8 pt-8 pb-6">
          <h1
            className="text-2xl font-bold text-[#111827] mb-1"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Workbook
          </h1>
          <p
            className="text-sm text-[#9ca3af] mb-2"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Interactive exercises covering all 9 objectives on the exam
          </p>
          <p
            className="text-sm text-[#6b7280] mb-6 leading-relaxed max-w-2xl"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            This workbook is the interactive version of your study guide. Work through each exercise to actively test your recall and solidify content knowledge before exam day.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {workbook.map((sub, i) => {
              const isActive = activeSub === sub.id
              return (
                <button
                  key={sub.id}
                  onClick={() => { setActiveSub(sub.id as 'I' | 'II' | 'III'); window.scrollTo({ top: 0, behavior: 'instant' }) }}
                  className="group text-left rounded-xl border-2 px-5 py-4 transition-all"
                  style={{
                    borderColor: isActive ? B : '#e5e7eb',
                    background: isActive ? B_LIGHT : 'white',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold"
                      style={{
                        background: isActive ? B : '#f3f4f6',
                        color: isActive ? 'white' : '#6b7280',
                        fontFamily: 'var(--font-sans)',
                      }}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <p
                        className="text-sm font-semibold leading-tight"
                        style={{
                          color: isActive ? B : '#111827',
                          fontFamily: 'var(--font-sans)',
                        }}
                      >
                        {sub.name}
                      </p>
                      <p className="mt-0.5 text-xs text-[#9ca3af]" style={{ fontFamily: 'var(--font-sans)' }}>
                        {sub.weight} of exam
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Objectives + Exercises ── */}
      <div className="px-8 py-8 space-y-10">
        {current.objectives.map(obj => (
          <div key={obj.id}>
            {/* Objective header */}
            <div
              className="rounded-t-lg bg-white border border-[#e5e7eb] px-5 py-4"
              style={{ borderBottomColor: '#f3f4f6' }}
            >
              <p
                className="text-[10.5px] font-bold uppercase tracking-widest mb-1"
                style={{ fontFamily: 'var(--font-sans)', color: '#9ca3af' }}
              >
                Objective {obj.objectiveNum}
              </p>
              <h2
                className="text-xl font-bold text-[#111827]"
                style={{ fontFamily: 'var(--font-serif)' }}
              >
                {obj.title}
              </h2>
            </div>

            {/* Exercise cards */}
            {obj.exercises.map((ex, exIdx) => (
              <div
                key={ex.id}
                className="bg-white border border-t-0 border-[#e5e7eb] px-6 py-6"
                style={{
                  borderRadius: exIdx === obj.exercises.length - 1 ? '0 0 12px 12px' : 0,
                  borderTopColor: '#f3f4f6',
                }}
              >
                {exIdx > 0 && (
                  <hr style={{ border: 'none', borderTop: '1px solid #f3f4f6', marginBottom: 20 }} />
                )}
                <ExerciseWrapper exercise={ex} />
              </div>
            ))}
          </div>
        ))}

        {/* ── Bottom Nav ── */}
        <div className="flex items-center justify-between pt-6 border-t border-[#e5e7eb]">
          {prevSub ? (
            <button
              onClick={() => { setActiveSub(prevSub.id as 'I' | 'II' | 'III'); window.scrollTo({ top: 0, behavior: 'instant' }) }}
              className="text-sm text-[#6b7280] hover:text-[#111827] transition-colors"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              ← {prevSub.name}
            </button>
          ) : <div />}

          {nextSub ? (
            <button
              onClick={() => { setActiveSub(nextSub.id as 'I' | 'II' | 'III'); window.scrollTo({ top: 0, behavior: 'instant' }) }}
              className="text-sm text-[#3b82f6] font-semibold hover:text-[#1d4ed8] transition-colors"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {nextSub.name} →
            </button>
          ) : (
            <Link
              href={`/dashboard/${examCode}`}
              className="text-sm text-[#3b82f6] font-semibold hover:text-[#1d4ed8]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Back to Dashboard →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
