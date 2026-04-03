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

type SubareaFilter = 'all' | 'I' | 'II' | 'III' | 'IV'

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function FlashcardsPage() {
  const params = useParams()
  const examCode = params.examCode as string

  const [vocab, setVocab] = useState<VocabItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [order, setOrder] = useState<number[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownSet, setKnownSet] = useState<Set<string>>(new Set())
  const [subareaFilter, setSubareaFilter] = useState<SubareaFilter>('all')
  const [reviewedSet, setReviewedSet] = useState<Set<string>>(new Set())
  const [done, setDone] = useState(false)

  // Fetch vocab on mount
  useEffect(() => {
    const fetchVocab = async () => {
      try {
        const res = await fetch(`/api/vocabulary?examCode=${examCode}`)
        if (!res.ok) throw new Error('Failed to load')
        const data = await res.json()
        setVocab(data.vocab || [])
      } catch {
        setError('Could not load flashcards. Please refresh.')
      } finally {
        setLoading(false)
      }
    }
    fetchVocab()
  }, [examCode])

  // Build order whenever vocab or filter changes
  useEffect(() => {
    const filtered = vocab
      .map((v, i) => ({ v, i }))
      .filter(({ v }) => subareaFilter === 'all' || v.subarea === subareaFilter)
      .map(({ i }) => i)
    setOrder(filtered)
    setCurrentIndex(0)
    setIsFlipped(false)
    setDone(false)
  }, [vocab, subareaFilter])

  const filteredCards = order.map((i) => vocab[i])
  const total = filteredCards.length
  const card = filteredCards[currentIndex]

  const goTo = useCallback(
    (delta: number) => {
      setIsFlipped(false)
      setTimeout(() => {
        setCurrentIndex((prev) => {
          const next = prev + delta
          if (next < 0) return 0
          if (next >= total) {
            setDone(true)
            return prev
          }
          if (card) setReviewedSet((s) => new Set(s).add(card._id))
          return next
        })
      }, 150)
    },
    [total, card]
  )

  const handleShuffle = () => {
    setOrder((prev) => shuffle(prev))
    setCurrentIndex(0)
    setIsFlipped(false)
    setDone(false)
  }

  const handleMarkKnown = () => {
    if (!card) return
    setKnownSet((prev) => {
      const next = new Set(prev)
      if (next.has(card._id)) {
        next.delete(card._id)
      } else {
        next.add(card._id)
      }
      return next
    })
  }

  const handleRestart = () => {
    setKnownSet(new Set())
    setReviewedSet(new Set())
    setCurrentIndex(0)
    setIsFlipped(false)
    setDone(false)
  }

  // Keyboard navigation
  const goToRef = useRef(goTo)
  goToRef.current = goTo
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToRef.current(-1)
      if (e.key === 'ArrowRight') goToRef.current(1)
      if (e.key === ' ') {
        e.preventDefault()
        setIsFlipped((f) => !f)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const progressPct = total > 0 ? Math.round((reviewedSet.size / total) * 100) : 0

  // --- Loading ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <p style={{ fontFamily: 'var(--font-sans)', color: '#6b6b6b', fontSize: 16 }}>
          Loading flashcards…
        </p>
      </div>
    )
  }

  // --- Error ---
  if (error) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <p style={{ fontFamily: 'var(--font-sans)', color: '#7c1c2e', fontSize: 16 }}>{error}</p>
      </div>
    )
  }

  // --- Done screen ---
  if (done) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        {/* Header */}
        <div style={{ background: '#7c1c2e', padding: '16px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link
            href={`/dashboard/${examCode}`}
            style={{ color: '#e8b4bc', fontSize: 14, fontFamily: 'var(--font-sans)', textDecoration: 'none' }}
          >
            ← Back to Dashboard
          </Link>
          <span style={{ color: 'white', fontSize: 18, fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
            Flashcards
          </span>
        </div>

        <div
          style={{
            maxWidth: 520,
            margin: '80px auto',
            textAlign: 'center',
            padding: '0 24px',
          }}
        >
          <p style={{ fontSize: 48 }}>🎉</p>
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 28,
              fontWeight: 700,
              color: '#1a1a1a',
              margin: '16px 0 8px',
            }}
          >
            You&apos;ve reviewed all {total} cards!
          </h2>
          <p style={{ fontFamily: 'var(--font-sans)', color: '#6b6b6b', fontSize: 15, marginBottom: 32 }}>
            {knownSet.size} marked as known · {total - knownSet.size} still practicing
          </p>
          <button
            onClick={handleRestart}
            style={{
              background: '#7c1c2e',
              color: 'white',
              border: 'none',
              borderRadius: 8,
              padding: '12px 32px',
              fontSize: 15,
              fontFamily: 'var(--font-sans)',
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Restart Deck
          </button>
        </div>
      </div>
    )
  }

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
            Flashcards
          </span>
        </div>
        <span style={{ color: '#e8b4bc', fontSize: 14, fontFamily: 'var(--font-sans)' }}>
          Card {total === 0 ? 0 : currentIndex + 1} of {total}
        </span>
      </div>

      {/* Controls bar */}
      <div
        style={{
          background: 'white',
          borderBottom: '1px solid #e8e0e2',
          padding: '12px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={handleShuffle}
          style={{
            background: '#f9f0f2',
            border: '1px solid #e8e0e2',
            borderRadius: 6,
            padding: '7px 16px',
            fontSize: 13,
            fontFamily: 'var(--font-sans)',
            fontWeight: 600,
            color: '#7c1c2e',
            cursor: 'pointer',
          }}
        >
          ⇌ Shuffle
        </button>

        <select
          value={subareaFilter}
          onChange={(e) => setSubareaFilter(e.target.value as SubareaFilter)}
          style={{
            border: '1px solid #e8e0e2',
            borderRadius: 6,
            padding: '7px 12px',
            fontSize: 13,
            fontFamily: 'var(--font-sans)',
            color: '#1a1a1a',
            background: 'white',
            cursor: 'pointer',
          }}
        >
          <option value="all">All Subareas</option>
          <option value="I">Subarea I</option>
          <option value="II">Subarea II</option>
          <option value="III">Subarea III</option>
        </select>

        <span style={{ fontSize: 13, fontFamily: 'var(--font-sans)', color: '#6b6b6b' }}>
          {knownSet.size} known · {total - knownSet.size} remaining
        </span>
      </div>

      {/* Progress bar */}
      <div style={{ height: 4, background: '#e8e0e2' }}>
        <div
          style={{
            height: '100%',
            width: `${progressPct}%`,
            background: '#7c1c2e',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      {/* Card area */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '48px 24px',
          minHeight: 'calc(100vh - 180px)',
        }}
      >
        {total === 0 ? (
          <p style={{ fontFamily: 'var(--font-sans)', color: '#6b6b6b', fontSize: 15 }}>
            No cards available for this filter.
          </p>
        ) : (
          <>
            {/* Flip card */}
            <div
              onClick={() => setIsFlipped((f) => !f)}
              style={{
                width: '100%',
                maxWidth: 600,
                height: 400,
                cursor: 'pointer',
                perspective: '1000px',
              }}
            >
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                  transformStyle: 'preserve-3d',
                  transition: 'transform 0.45s ease',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                }}
              >
                {/* Front — Term */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    background: 'white',
                    border: '1px solid #e8e0e2',
                    borderRadius: 16,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px 48px',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#6b6b6b',
                      marginBottom: 24,
                    }}
                  >
                    TERM
                  </p>
                  <h2
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: 32,
                      fontWeight: 700,
                      color: '#1a1a1a',
                      lineHeight: 1.2,
                      marginBottom: 20,
                    }}
                  >
                    {card?.term}
                  </h2>
                  <span
                    style={{
                      background: '#f9f0f2',
                      color: '#7c1c2e',
                      borderRadius: 20,
                      padding: '4px 14px',
                      fontSize: 12,
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                    }}
                  >
                    Subarea {card?.subarea}
                  </span>
                  <p
                    style={{
                      marginTop: 24,
                      fontSize: 12,
                      fontFamily: 'var(--font-sans)',
                      color: '#6b6b6b',
                    }}
                  >
                    Click to flip · Space bar to flip
                  </p>
                </div>

                {/* Back — Definition */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    background: '#5a1220',
                    borderRadius: 16,
                    boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '40px 48px',
                    textAlign: 'center',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 11,
                      fontWeight: 600,
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      color: '#e8b4bc',
                      marginBottom: 20,
                    }}
                  >
                    DEFINITION
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 17,
                      color: 'white',
                      lineHeight: 1.6,
                      marginBottom: card?.example ? 24 : 0,
                    }}
                  >
                    {card?.definition}
                  </p>
                  {card?.example && (
                    <p
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: 14,
                        color: '#e8b4bc',
                        fontStyle: 'italic',
                        lineHeight: 1.5,
                      }}
                    >
                      {card.example}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                marginTop: 32,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              <button
                onClick={() => goTo(-1)}
                disabled={currentIndex === 0}
                style={{
                  background: 'white',
                  border: '1px solid #e8e0e2',
                  borderRadius: 8,
                  padding: '10px 24px',
                  fontSize: 14,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  color: currentIndex === 0 ? '#c0b4b8' : '#1a1a1a',
                  cursor: currentIndex === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                ← Previous
              </button>

              <button
                onClick={handleMarkKnown}
                style={{
                  background: card && knownSet.has(card._id) ? '#7c1c2e' : 'white',
                  border: `1px solid ${card && knownSet.has(card._id) ? '#7c1c2e' : '#e8e0e2'}`,
                  borderRadius: 8,
                  padding: '10px 24px',
                  fontSize: 14,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  color: card && knownSet.has(card._id) ? 'white' : '#1a1a1a',
                  cursor: 'pointer',
                }}
              >
                {card && knownSet.has(card._id) ? '✓ Known' : 'Mark as Known'}
              </button>

              <button
                onClick={() => goTo(1)}
                style={{
                  background: '#7c1c2e',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 24px',
                  fontSize: 14,
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  color: 'white',
                  cursor: 'pointer',
                }}
              >
                Next →
              </button>
            </div>

            <p
              style={{
                marginTop: 20,
                fontSize: 12,
                fontFamily: 'var(--font-sans)',
                color: '#6b6b6b',
              }}
            >
              ← → arrow keys to navigate
            </p>
          </>
        )}
      </div>
    </div>
  )
}
