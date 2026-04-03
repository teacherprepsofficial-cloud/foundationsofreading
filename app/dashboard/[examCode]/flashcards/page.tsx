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

interface MatchQuestion {
  item: VocabItem
  options: VocabItem[]
}

interface MatchResult {
  item: VocabItem
  selectedId: string
  correct: boolean
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildMatchQuestions(items: VocabItem[]): MatchQuestion[] {
  if (items.length < 4) return []
  return shuffle(items).map((item) => {
    const distractors = shuffle(items.filter((v) => v._id !== item._id)).slice(0, 3)
    return { item, options: shuffle([item, ...distractors]) }
  })
}

export default function FlashcardsPage() {
  const params = useParams()
  const examCode = params.examCode as string

  const [vocab, setVocab] = useState<VocabItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // ── Flashcard state ──────────────────────────────────────────
  const [order, setOrder] = useState<number[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownSet, setKnownSet] = useState<Set<string>>(new Set())
  const [subareaFilter, setSubareaFilter] = useState<SubareaFilter>('all')
  const [reviewedSet, setReviewedSet] = useState<Set<string>>(new Set())
  const [done, setDone] = useState(false)

  // ── Matching activity state ──────────────────────────────────
  const [matchQuestions, setMatchQuestions] = useState<MatchQuestion[]>([])
  const [matchIndex, setMatchIndex] = useState(0)
  const [matchSelectedId, setMatchSelectedId] = useState<string | null>(null)
  const [matchCorrect, setMatchCorrect] = useState<boolean | null>(null)
  const [matchResults, setMatchResults] = useState<MatchResult[]>([])
  const [matchPhase, setMatchPhase] = useState<'playing' | 'results'>('playing')
  const matchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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

  // Build flashcard order whenever vocab or filter changes
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

  // Build matching questions whenever vocab or filter changes
  useEffect(() => {
    const filtered = vocab.filter(
      (v) => subareaFilter === 'all' || v.subarea === subareaFilter
    )
    const questions = buildMatchQuestions(filtered)
    setMatchQuestions(questions)
    setMatchIndex(0)
    setMatchSelectedId(null)
    setMatchCorrect(null)
    setMatchResults([])
    setMatchPhase('playing')
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
      if (next.has(card._id)) next.delete(card._id)
      else next.add(card._id)
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

  // Matching: handle option click
  const handleMatchSelect = (selectedItem: VocabItem) => {
    if (matchSelectedId !== null) return // already answered
    const current = matchQuestions[matchIndex]
    if (!current) return
    const isCorrect = selectedItem._id === current.item._id
    setMatchSelectedId(selectedItem._id)
    setMatchCorrect(isCorrect)

    const result: MatchResult = {
      item: current.item,
      selectedId: selectedItem._id,
      correct: isCorrect,
    }

    if (matchTimerRef.current) clearTimeout(matchTimerRef.current)
    matchTimerRef.current = setTimeout(() => {
      const newResults = [...matchResults, result]
      if (matchIndex + 1 >= matchQuestions.length) {
        setMatchResults(newResults)
        setMatchPhase('results')
      } else {
        setMatchResults(newResults)
        setMatchIndex((i) => i + 1)
        setMatchSelectedId(null)
        setMatchCorrect(null)
      }
    }, 750)
  }

  const handleRestartMatch = () => {
    const filtered = vocab.filter(
      (v) => subareaFilter === 'all' || v.subarea === subareaFilter
    )
    setMatchQuestions(buildMatchQuestions(filtered))
    setMatchIndex(0)
    setMatchSelectedId(null)
    setMatchCorrect(null)
    setMatchResults([])
    setMatchPhase('playing')
  }

  // Keyboard navigation for flashcards
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

  const SF = { fontFamily: 'var(--font-sans)' }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <p style={{ ...SF, color: '#6b6b6b', fontSize: 16 }}>Loading flashcards…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <p style={{ ...SF, color: '#7c1c2e', fontSize: 16 }}>{error}</p>
      </div>
    )
  }

  // Shared header
  const Header = (
    <div style={{ background: '#7c1c2e', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <Link href={`/dashboard/${examCode}`} style={{ color: '#e8b4bc', fontSize: 14, ...SF, textDecoration: 'none' }}>
          ← Back to Dashboard
        </Link>
        <span style={{ color: 'white', fontSize: 18, fontFamily: 'var(--font-serif)', fontWeight: 700 }}>
          Flashcards
        </span>
      </div>
      <span style={{ color: '#e8b4bc', fontSize: 14, ...SF }}>
        Card {total === 0 ? 0 : currentIndex + 1} of {total}
      </span>
    </div>
  )

  // Done screen (flashcards complete)
  if (done) {
    return (
      <div className="min-h-screen bg-[#faf8f5]">
        {Header}
        <div style={{ maxWidth: 520, margin: '80px auto', textAlign: 'center', padding: '0 24px' }}>
          <p style={{ fontSize: 48 }}>🎉</p>
          <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 28, fontWeight: 700, color: '#1a1a1a', margin: '16px 0 8px' }}>
            You&apos;ve reviewed all {total} cards!
          </h2>
          <p style={{ ...SF, color: '#6b6b6b', fontSize: 15, marginBottom: 32 }}>
            {knownSet.size} marked as known · {total - knownSet.size} still practicing
          </p>
          <button onClick={handleRestart} style={{ background: '#7c1c2e', color: 'white', border: 'none', borderRadius: 8, padding: '12px 32px', fontSize: 15, ...SF, fontWeight: 600, cursor: 'pointer' }}>
            Restart Deck
          </button>
        </div>
      </div>
    )
  }

  // Current match question
  const currentMatch = matchQuestions[matchIndex]

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {Header}

      {/* ── Controls bar ──────────────────────────────────────── */}
      <div style={{ background: 'white', borderBottom: '1px solid #e8e0e2', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button onClick={handleShuffle} style={{ background: '#f9f0f2', border: '1px solid #e8e0e2', borderRadius: 6, padding: '7px 16px', fontSize: 13, ...SF, fontWeight: 600, color: '#7c1c2e', cursor: 'pointer' }}>
          ⇌ Shuffle
        </button>
        <select
          value={subareaFilter}
          onChange={(e) => setSubareaFilter(e.target.value as SubareaFilter)}
          style={{ border: '1px solid #e8e0e2', borderRadius: 6, padding: '7px 12px', fontSize: 13, ...SF, color: '#1a1a1a', background: 'white', cursor: 'pointer' }}
        >
          <option value="all">All Subareas</option>
          <option value="I">Subarea I</option>
          <option value="II">Subarea II</option>
          <option value="III">Subarea III</option>
        </select>
        <span style={{ fontSize: 13, ...SF, color: '#6b6b6b' }}>
          {knownSet.size} known · {total - knownSet.size} remaining
        </span>
      </div>

      {/* ── Progress bar ──────────────────────────────────────── */}
      <div style={{ height: 4, background: '#e8e0e2' }}>
        <div style={{ height: '100%', width: `${progressPct}%`, background: '#7c1c2e', transition: 'width 0.3s ease' }} />
      </div>

      {/* ── Flashcard area ────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 24px 32px' }}>
        {total === 0 ? (
          <p style={{ ...SF, color: '#6b6b6b', fontSize: 15 }}>No cards available for this filter.</p>
        ) : (
          <>
            {/* Flip card */}
            <div onClick={() => setIsFlipped((f) => !f)} style={{ width: '100%', maxWidth: 600, height: 400, cursor: 'pointer', perspective: '1000px' }}>
              <div style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transition: 'transform 0.45s ease', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                {/* Front — Term */}
                <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', background: 'white', border: '1px solid #e8e0e2', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 48px', textAlign: 'center' }}>
                  <p style={{ ...SF, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b6b6b', marginBottom: 24 }}>TERM</p>
                  <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2, marginBottom: 20 }}>{card?.term}</h2>
                  <span style={{ background: '#f9f0f2', color: '#7c1c2e', borderRadius: 20, padding: '4px 14px', fontSize: 12, ...SF, fontWeight: 600 }}>Subarea {card?.subarea}</span>
                  <p style={{ marginTop: 24, fontSize: 12, ...SF, color: '#6b6b6b' }}>Click to flip · Space bar to flip</p>
                </div>
                {/* Back — Definition */}
                <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: '#5a1220', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 48px', textAlign: 'center' }}>
                  <p style={{ ...SF, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#e8b4bc', marginBottom: 20 }}>DEFINITION</p>
                  <p style={{ ...SF, fontSize: 17, color: 'white', lineHeight: 1.6, marginBottom: card?.example ? 24 : 0 }}>{card?.definition}</p>
                  {card?.example && <p style={{ ...SF, fontSize: 14, color: '#e8b4bc', fontStyle: 'italic', lineHeight: 1.5 }}>{card.example}</p>}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
              <button onClick={() => goTo(-1)} disabled={currentIndex === 0} style={{ background: 'white', border: '1px solid #e8e0e2', borderRadius: 8, padding: '10px 24px', fontSize: 14, ...SF, fontWeight: 600, color: currentIndex === 0 ? '#c0b4b8' : '#1a1a1a', cursor: currentIndex === 0 ? 'not-allowed' : 'pointer' }}>← Previous</button>
              <button onClick={handleMarkKnown} style={{ background: card && knownSet.has(card._id) ? '#7c1c2e' : 'white', border: `1px solid ${card && knownSet.has(card._id) ? '#7c1c2e' : '#e8e0e2'}`, borderRadius: 8, padding: '10px 24px', fontSize: 14, ...SF, fontWeight: 600, color: card && knownSet.has(card._id) ? 'white' : '#1a1a1a', cursor: 'pointer' }}>
                {card && knownSet.has(card._id) ? '✓ Known' : 'Mark as Known'}
              </button>
              <button onClick={() => goTo(1)} style={{ background: '#7c1c2e', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 14, ...SF, fontWeight: 600, color: 'white', cursor: 'pointer' }}>Next →</button>
            </div>
            <p style={{ marginTop: 20, fontSize: 12, ...SF, color: '#6b6b6b' }}>← → arrow keys to navigate</p>
          </>
        )}
      </div>

      {/* ── Matching Activity ─────────────────────────────────── */}
      {matchQuestions.length > 0 && (
        <div style={{ borderTop: '2px solid #e8e0e2', background: '#faf8f5', padding: '48px 24px 64px' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>

            {/* Section header */}
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <p style={{ ...SF, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7c1c2e', marginBottom: 8 }}>Matching Activity</p>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 700, color: '#1a1a1a', margin: 0 }}>Match the definition to the correct term</h3>
            </div>

            {matchPhase === 'playing' && currentMatch ? (
              <>
                {/* Progress */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ ...SF, fontSize: 13, color: '#6b6b6b' }}>Question {matchIndex + 1} of {matchQuestions.length}</span>
                  <span style={{ ...SF, fontSize: 13, color: '#6b6b6b' }}>{matchResults.filter(r => r.correct).length} correct so far</span>
                </div>
                <div style={{ height: 4, background: '#e8e0e2', borderRadius: 2, marginBottom: 28 }}>
                  <div style={{ height: '100%', width: `${((matchIndex) / matchQuestions.length) * 100}%`, background: '#7c1c2e', borderRadius: 2, transition: 'width 0.3s ease' }} />
                </div>

                {/* Definition card */}
                <div style={{ background: 'white', border: '1px solid #e8e0e2', borderRadius: 12, padding: '28px 32px', marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <p style={{ ...SF, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7c1c2e', marginBottom: 12 }}>Definition</p>
                  <p style={{ ...SF, fontSize: 17, color: '#1a1a1a', lineHeight: 1.65, margin: 0 }}>{currentMatch.item.definition}</p>
                  {currentMatch.item.example && (
                    <p style={{ ...SF, fontSize: 14, color: '#6b6b6b', fontStyle: 'italic', marginTop: 12, marginBottom: 0, lineHeight: 1.5 }}>{currentMatch.item.example}</p>
                  )}
                </div>

                {/* Term options */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {currentMatch.options.map((opt) => {
                    const isSelected = matchSelectedId === opt._id
                    const isCorrectOpt = opt._id === currentMatch.item._id
                    let bg = 'white'
                    let border = '1px solid #e8e0e2'
                    let color = '#1a1a1a'
                    if (matchSelectedId !== null) {
                      if (isCorrectOpt) {
                        bg = '#f0fdf4'; border = '1px solid #86efac'; color = '#166534'
                      } else if (isSelected) {
                        bg = '#fff1f2'; border = '1px solid #fca5a5'; color = '#991b1b'
                      }
                    }
                    return (
                      <button
                        key={opt._id}
                        onClick={() => handleMatchSelect(opt)}
                        disabled={matchSelectedId !== null}
                        style={{ background: bg, border, borderRadius: 10, padding: '16px 20px', fontSize: 15, ...SF, fontWeight: 600, color, cursor: matchSelectedId !== null ? 'default' : 'pointer', textAlign: 'center', transition: 'background 0.2s, border 0.2s', lineHeight: 1.3 }}
                      >
                        {opt.term}
                      </button>
                    )
                  })}
                </div>
              </>
            ) : matchPhase === 'results' ? (
              <>
                {/* Results header */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 80, height: 80, borderRadius: '50%', background: '#f9f0f2', marginBottom: 16 }}>
                    <span style={{ fontSize: 36 }}>{matchResults.filter(r => r.correct).length === matchResults.length ? '🎉' : '📝'}</span>
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 26, fontWeight: 700, color: '#1a1a1a', margin: '0 0 8px' }}>
                    {matchResults.filter(r => r.correct).length} of {matchResults.length} correct
                  </h4>
                  <p style={{ ...SF, fontSize: 15, color: '#6b6b6b', margin: '0 0 24px' }}>
                    {matchResults.filter(r => r.correct).length === matchResults.length
                      ? 'Perfect score — you know your terms!'
                      : 'Review the highlighted items below and try again.'}
                  </p>
                  <button onClick={handleRestartMatch} style={{ background: '#7c1c2e', color: 'white', border: 'none', borderRadius: 8, padding: '10px 28px', fontSize: 14, ...SF, fontWeight: 600, cursor: 'pointer' }}>
                    Try Again
                  </button>
                </div>

                {/* Per-question review */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 48 }}>
                  {matchResults.map((r, i) => (
                    <div key={i} style={{ background: r.correct ? '#f0fdf4' : '#fff1f2', border: `1px solid ${r.correct ? '#86efac' : '#fca5a5'}`, borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <span style={{ fontSize: 16, marginTop: 1, flexShrink: 0 }}>{r.correct ? '✓' : '✗'}</span>
                      <div>
                        <p style={{ ...SF, fontSize: 14, fontWeight: 700, color: r.correct ? '#166534' : '#991b1b', margin: '0 0 4px' }}>{r.item.term}</p>
                        <p style={{ ...SF, fontSize: 13, color: '#374151', margin: 0, lineHeight: 1.5 }}>{r.item.definition}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Full glossary */}
                <div style={{ borderTop: '2px solid #e8e0e2', paddingTop: 40 }}>
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: '#1a1a1a', marginBottom: 24 }}>Full Glossary</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {vocab
                      .filter((v) => subareaFilter === 'all' || v.subarea === subareaFilter)
                      .sort((a, b) => a.objectiveNumber - b.objectiveNumber || a.term.localeCompare(b.term))
                      .map((v) => (
                        <div key={v._id}>
                          <p style={{ ...SF, fontSize: 15, color: '#1a1a1a', margin: '0 0 4px', lineHeight: 1.5 }}>
                            <strong>{v.term}:</strong> {v.definition}
                          </p>
                          {v.example && (
                            <p style={{ ...SF, fontSize: 13, color: '#6b6b6b', fontStyle: 'italic', margin: 0, lineHeight: 1.5 }}>{v.example}</p>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      )}
    </div>
  )
}
