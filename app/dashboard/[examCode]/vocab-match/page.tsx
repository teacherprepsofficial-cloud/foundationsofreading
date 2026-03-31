'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface VocabItem {
  _id: string
  term: string
  definition: string
  subarea: 'I' | 'II' | 'III' | 'IV'
  subareaName: string
  objectiveNumber: number
  example?: string
}

type GamePhase = 'loading' | 'error' | 'playing' | 'complete'

interface RoundItem {
  id: string
  term: string
  definition: string
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

const ROUND_SIZE = 10

export default function VocabMatchPage() {
  const params = useParams()
  const examCode = params.examCode as string

  const [allVocab, setAllVocab] = useState<VocabItem[]>([])
  const [phase, setPhase] = useState<GamePhase>('loading')
  const [errorMsg, setErrorMsg] = useState('')

  // Round state
  const [roundItems, setRoundItems] = useState<RoundItem[]>([])
  const [termOrder, setTermOrder] = useState<string[]>([]) // ids
  const [defOrder, setDefOrder] = useState<string[]>([]) // ids
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedDef, setSelectedDef] = useState<string | null>(null)

  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [wrongPair, setWrongPair] = useState<{ term: string; def: string } | null>(null)
  const [score, setScore] = useState(0)
  const [roundNumber, setRoundNumber] = useState(1)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [completedTime, setCompletedTime] = useState(0)
  const [bestScore, setBestScore] = useState(0)
  const [sessionScores, setSessionScores] = useState<number[]>([])
  const [usedIndices, setUsedIndices] = useState<Set<number>>(new Set())

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Fetch vocab on mount
  useEffect(() => {
    const fetchVocab = async () => {
      try {
        const res = await fetch(`/api/vocabulary?examCode=${examCode}`)
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json()
        const vocab: VocabItem[] = data.vocab || []
        setAllVocab(vocab)
        if (vocab.length === 0) {
          setErrorMsg('No vocabulary available yet.')
          setPhase('error')
        } else {
          startRound(vocab, new Set(), 1, 0)
          setPhase('playing')
        }
      } catch {
        setErrorMsg('Could not load vocabulary. Please refresh.')
        setPhase('error')
      }
    }
    fetchVocab()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [examCode])

  // Timer
  useEffect(() => {
    if (phase === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeElapsed((t) => t + 1)
      }, 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [phase])

  const startRound = useCallback(
    (vocab: VocabItem[], used: Set<number>, rNum: number, currentScore: number) => {
      const available = vocab
        .map((v, i) => i)
        .filter((i) => !used.has(i))

      let indices: number[]
      let newUsed: Set<number>

      if (available.length >= ROUND_SIZE) {
        // Pick ROUND_SIZE from available
        const shuffledAvail = shuffle(available)
        indices = shuffledAvail.slice(0, ROUND_SIZE)
        newUsed = new Set(Array.from(used).concat(indices))
      } else {
        // Not enough unused — reset used pool and pick from full list
        const all = vocab.map((_, i) => i)
        const shuffledAll = shuffle(all)
        indices = shuffledAll.slice(0, Math.min(ROUND_SIZE, vocab.length))
        newUsed = new Set(indices)
      }

      const items: RoundItem[] = indices.map((i) => ({
        id: vocab[i]._id,
        term: vocab[i].term,
        definition: vocab[i].definition,
      }))

      setRoundItems(items)
      setTermOrder(shuffle(items.map((it) => it.id)))
      setDefOrder(shuffle(items.map((it) => it.id)))
      setMatched(new Set())
      setSelectedTerm(null)
      setSelectedDef(null)
      setWrongPair(null)
      setRoundNumber(rNum)
      setTimeElapsed(0)
      setUsedIndices(newUsed)
      setScore(currentScore)
    },
    []
  )

  // Handle a term click
  const handleTermClick = (id: string) => {
    if (matched.has(id) || wrongPair) return
    setSelectedTerm((prev) => (prev === id ? null : id))
  }

  // Handle a definition click
  const handleDefClick = useCallback(
    (id: string) => {
      if (matched.has(id) || wrongPair) return

      if (!selectedTerm) {
        // No term selected — clicking def does nothing unless we allow def-first
        return
      }

      if (selectedTerm === id) {
        // Correct match
        const newMatched = new Set(matched)
        newMatched.add(id)
        setMatched(newMatched)
        setScore((s) => s + 10)
        setSelectedTerm(null)
        setSelectedDef(null)

        if (newMatched.size === roundItems.length) {
          // Round complete
          setCompletedTime(timeElapsed)
          if (timerRef.current) clearInterval(timerRef.current)
          const finalScore = score + 10
          setBestScore((best) => Math.max(best, finalScore))
          setSessionScores((prev) => [...prev, finalScore])
          setPhase('complete')
        }
      } else {
        // Wrong match
        setWrongPair({ term: selectedTerm, def: id })
        setSelectedDef(id)
        setScore((s) => Math.max(0, s - 2))
        setTimeout(() => {
          setWrongPair(null)
          setSelectedTerm(null)
          setSelectedDef(null)
        }, 800)
      }
    },
    [selectedTerm, matched, roundItems.length, score, timeElapsed]
  )

  const handleNextRound = () => {
    setPhase('playing')
    startRound(allVocab, usedIndices, roundNumber + 1, score)
  }

  // Color helpers
  const getTermStyle = (id: string): React.CSSProperties => {
    const isMatched = matched.has(id)
    const isSelected = selectedTerm === id
    const isWrong = wrongPair?.term === id

    if (isMatched) {
      return {
        background: '#f0fdf4',
        border: '2px solid #16a34a',
        color: '#15803d',
        opacity: 0.7,
        cursor: 'default',
      }
    }
    if (isWrong) {
      return {
        background: '#fef2f2',
        border: '2px solid #dc2626',
        color: '#dc2626',
      }
    }
    if (isSelected) {
      return {
        background: '#7c1c2e',
        border: '2px solid #5a1220',
        color: 'white',
        cursor: 'pointer',
      }
    }
    return {
      background: 'white',
      border: '2px solid #e8e0e2',
      color: '#1a1a1a',
      cursor: 'pointer',
    }
  }

  const getDefStyle = (id: string): React.CSSProperties => {
    const isMatched = matched.has(id)
    const isWrong = wrongPair?.def === id

    if (isMatched) {
      return {
        background: '#f0fdf4',
        border: '2px solid #16a34a',
        color: '#15803d',
        opacity: 0.7,
        cursor: 'default',
      }
    }
    if (isWrong) {
      return {
        background: '#fef2f2',
        border: '2px solid #dc2626',
        color: '#dc2626',
      }
    }
    if (selectedTerm) {
      return {
        background: 'white',
        border: '2px solid #e8e0e2',
        color: '#1a1a1a',
        cursor: 'pointer',
      }
    }
    return {
      background: 'white',
      border: '2px solid #e8e0e2',
      color: '#1a1a1a',
      cursor: 'default',
    }
  }

  const termById = (id: string) => roundItems.find((it) => it.id === id)

  // --- Loading ---
  if (phase === 'loading') {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <p style={{ fontFamily: 'var(--font-sans)', color: '#6b6b6b', fontSize: 16 }}>
          Loading vocabulary…
        </p>
      </div>
    )
  }

  // --- Error ---
  if (phase === 'error') {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <p style={{ fontFamily: 'var(--font-sans)', color: '#7c1c2e', fontSize: 16 }}>{errorMsg}</p>
      </div>
    )
  }

  // --- Round Complete ---
  if (phase === 'complete') {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <div
          style={{
            background: '#7c1c2e',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <Link
            href={`/dashboard/${examCode}`}
            style={{ color: '#e8b4bc', fontSize: 14, fontFamily: 'var(--font-sans)', textDecoration: 'none' }}
          >
            ← Back to Dashboard
          </Link>
          <span style={{ color: 'white', fontSize: 18, fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            Vocabulary Match
          </span>
        </div>

        <div
          style={{
            maxWidth: 480,
            margin: '80px auto',
            textAlign: 'center',
            padding: '0 24px',
          }}
        >
          <p style={{ fontSize: 48 }}>🏆</p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 30,
              fontWeight: 700,
              color: '#1a1a1a',
              margin: '16px 0 8px',
            }}
          >
            Round {roundNumber} Complete!
          </h2>

          {/* Stats */}
          <div
            style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              marginTop: 24,
              marginBottom: 32,
              flexWrap: 'wrap',
            }}
          >
            <div
              style={{
                background: 'white',
                border: '1px solid #e8e0e2',
                borderRadius: 12,
                padding: '16px 24px',
                minWidth: 120,
              }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#6b6b6b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                Score
              </p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, color: '#7c1c2e' }}>
                {score}
              </p>
            </div>
            <div
              style={{
                background: 'white',
                border: '1px solid #e8e0e2',
                borderRadius: 12,
                padding: '16px 24px',
                minWidth: 120,
              }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#6b6b6b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                Time
              </p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, color: '#1a1a1a' }}>
                {formatTime(completedTime)}
              </p>
            </div>
            <div
              style={{
                background: 'white',
                border: '1px solid #e8e0e2',
                borderRadius: 12,
                padding: '16px 24px',
                minWidth: 120,
              }}
            >
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#6b6b6b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
                Best
              </p>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, color: '#1a1a1a' }}>
                {bestScore}
              </p>
            </div>
          </div>

          {sessionScores.length > 1 && (
            <p style={{ fontFamily: 'var(--font-sans)', color: '#6b6b6b', fontSize: 13, marginBottom: 24 }}>
              Session scores:{' '}
              {sessionScores.map((s, i) => (
                <span key={i} style={{ marginRight: 6, fontWeight: 600, color: '#1a1a1a' }}>
                  {s}
                </span>
              ))}
            </p>
          )}

          <button
            onClick={handleNextRound}
            style={{
              background: '#7c1c2e',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              padding: '12px 36px',
              fontSize: 15,
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Next Round →
          </button>
        </div>
      </div>
    )
  }

  // --- Playing ---
  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div
        style={{
          background: '#7c1c2e',
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link
            href={`/dashboard/${examCode}`}
            style={{ color: '#e8b4bc', fontSize: 14, fontFamily: 'var(--font-sans)', textDecoration: 'none' }}
          >
            ← Back to Dashboard
          </Link>
          <span style={{ color: 'white', fontSize: 18, fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            Vocabulary Match
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <span style={{ color: '#e8b4bc', fontSize: 13, fontFamily: 'var(--font-sans)' }}>
            Round {roundNumber}
          </span>
          <span
            style={{
              background: '#5a1220',
              borderRadius: 6,
              padding: '4px 14px',
              color: 'white',
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            Score: {score}
          </span>
          <span
            style={{
              background: '#5a1220',
              borderRadius: 6,
              padding: '4px 14px',
              color: '#e8b4bc',
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 600,
              minWidth: 60,
              textAlign: 'center',
            }}
          >
            {formatTime(timeElapsed)}
          </span>
        </div>
      </div>

      {/* Instructions */}
      <div
        style={{
          background: 'white',
          borderBottom: '1px solid #e8e0e2',
          padding: '10px 24px',
          textAlign: 'center',
        }}
      >
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#6b6b6b' }}>
          Click a <strong style={{ color: '#7c1c2e' }}>term</strong> on the left, then click its matching <strong style={{ color: '#7c1c2e' }}>definition</strong> on the right.
          {matched.size > 0 && (
            <span style={{ marginLeft: 12, color: '#16a34a', fontWeight: 600 }}>
              {matched.size}/{roundItems.length} matched
            </span>
          )}
        </p>
      </div>

      {/* Game grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          maxWidth: 900,
          margin: '32px auto',
          padding: '0 24px',
        }}
      >
        {/* Terms column */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#6b6b6b',
              marginBottom: 12,
            }}
          >
            Terms
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {termOrder.map((id) => {
              const item = termById(id)
              if (!item) return null
              return (
                <button
                  key={id}
                  onClick={() => handleTermClick(id)}
                  disabled={matched.has(id)}
                  style={{
                    ...getTermStyle(id),
                    borderRadius: 10,
                    padding: '14px 16px',
                    fontSize: 14,
                    fontFamily: 'var(--font-sans)',
                    fontWeight: 600,
                    textAlign: 'left',
                    transition: 'background 0.15s, border-color 0.15s, transform 0.1s',
                    transform: selectedTerm === id ? 'scale(1.02)' : 'scale(1)',
                    lineHeight: 1.4,
                  }}
                >
                  {item.term}
                </button>
              )
            })}
          </div>
        </div>

        {/* Definitions column */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: '#6b6b6b',
              marginBottom: 12,
            }}
          >
            Definitions
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {defOrder.map((id) => {
              const item = termById(id)
              if (!item) return null
              return (
                <button
                  key={id}
                  onClick={() => handleDefClick(id)}
                  disabled={matched.has(id) || !selectedTerm}
                  style={{
                    ...getDefStyle(id),
                    borderRadius: 10,
                    padding: '14px 16px',
                    fontSize: 13,
                    fontFamily: 'var(--font-sans)',
                    textAlign: 'left',
                    transition: 'background 0.15s, border-color 0.15s',
                    lineHeight: 1.5,
                    fontWeight: matched.has(id) ? 600 : 400,
                  }}
                >
                  {item.definition}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Best score footer */}
      {bestScore > 0 && (
        <div style={{ textAlign: 'center', paddingBottom: 32 }}>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: '#6b6b6b' }}>
            Session best: <strong style={{ color: '#1a1a1a' }}>{bestScore}</strong>
          </p>
        </div>
      )}
    </div>
  )
}
