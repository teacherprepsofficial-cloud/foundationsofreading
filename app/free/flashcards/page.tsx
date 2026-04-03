'use client'

import { useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const CARDS = [
  { term: 'Phoneme', definition: 'The smallest unit of sound in spoken language. English has approximately 44 phonemes. Example: "cat" has 3 phonemes — /k/ /æ/ /t/.' },
  { term: 'Grapheme', definition: 'A letter or combination of letters that represents a phoneme. Example: "sh" is a grapheme representing one phoneme /ʃ/.' },
  { term: 'Phonological Awareness', definition: 'The ability to hear and manipulate the sound structure of spoken language, including words, syllables, onset-rime, and phonemes.' },
  { term: 'Phonemic Awareness', definition: 'A subset of phonological awareness — the ability to hear and manipulate individual phonemes in spoken words.' },
  { term: 'Decoding', definition: 'Using letter-sound relationships (phonics) to translate written words into spoken language. Example: reading "b-i-g" as "big."' },
  { term: 'Fluency', definition: 'Reading with accuracy, appropriate rate, and prosody (expression). Fluent readers can focus cognitive resources on comprehension.' },
  { term: 'Morpheme', definition: 'The smallest meaningful unit in language. Example: "unhappy" has two morphemes — "un-" (prefix meaning not) and "happy."' },
  { term: 'Digraph', definition: 'Two letters that represent a single phoneme. Examples: "sh," "ch," "th," "wh," "ph." The letters work together as one sound unit.' },
  { term: 'Onset', definition: 'The consonant sound(s) before the vowel in a syllable. Example: In "frog," the onset is /fr/.' },
  { term: 'Rime', definition: 'The vowel and any consonants following it in a syllable. Example: In "frog," the rime is /-og/. Rimes are the basis of rhyme families.' },
]

export default function FreeFlashcardsPage() {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [seen, setSeen] = useState<Set<number>>(new Set([0]))

  const card = CARDS[index]

  function go(dir: 1 | -1) {
    const next = (index + dir + CARDS.length) % CARDS.length
    setIndex(next)
    setFlipped(false)
    setSeen((prev) => new Set(Array.from(prev).concat(next)))
  }

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#faf8f5]">
        <div className="border-b border-[#e8e0e2] bg-white px-6 py-3 text-center">
          <p className="text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            Free sample — 10 of 150+ terms.{' '}
            <a href="/#pricing" className="font-semibold text-[#7c1c2e] hover:underline">Get the full deck →</a>
          </p>
        </div>

        <div className="mx-auto max-w-xl px-6 py-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Free Preview</p>
          <h1 className="mt-2 text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>Flashcards</h1>
          <p className="mt-2 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Click any card to flip. {seen.size}/{CARDS.length} seen.</p>

          {/* Progress bar */}
          <div className="mt-4 h-1.5 rounded-full bg-[#e8e0e2]">
            <div
              className="h-1.5 rounded-full bg-[#7c1c2e] transition-all"
              style={{ width: `${(seen.size / CARDS.length) * 100}%` }}
            />
          </div>

          {/* Card */}
          <button
            onClick={() => setFlipped(!flipped)}
            className="mt-8 min-h-[220px] w-full rounded-xl border-2 border-[#e8e0e2] bg-white p-8 text-left transition-all hover:border-[#7c1c2e] hover:shadow-md active:scale-[0.99]"
          >
            {!flipped ? (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Term</p>
                <p className="mt-4 text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>{card.term}</p>
                <p className="mt-6 text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Click to see definition →</p>
              </div>
            ) : (
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Definition</p>
                <p className="mt-4 text-base leading-relaxed text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>{card.definition}</p>
                <p className="mt-4 text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Click to see term →</p>
              </div>
            )}
          </button>

          {/* Navigation */}
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={() => go(-1)}
              className="rounded border border-[#e8e0e2] px-5 py-2.5 text-sm font-semibold text-[#6b6b6b] hover:border-[#7c1c2e] hover:text-[#7c1c2e]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              ← Previous
            </button>
            <p className="text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
              {index + 1} / {CARDS.length}
            </p>
            <button
              onClick={() => go(1)}
              className="rounded border border-[#e8e0e2] px-5 py-2.5 text-sm font-semibold text-[#6b6b6b] hover:border-[#7c1c2e] hover:text-[#7c1c2e]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Next →
            </button>
          </div>

          {/* Term list */}
          <div className="mt-10 rounded-lg border border-[#e8e0e2] bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>All 10 sample terms</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {CARDS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => { setIndex(i); setFlipped(false); setSeen((prev) => new Set(Array.from(prev).concat(i))) }}
                  className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                    i === index
                      ? 'border-[#7c1c2e] bg-[#7c1c2e] text-white'
                      : seen.has(i)
                      ? 'border-[#7c1c2e] text-[#7c1c2e]'
                      : 'border-[#e8e0e2] text-[#6b6b6b]'
                  }`}
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {c.term}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 rounded-xl border-2 border-[#7c1c2e] bg-white p-6 text-center">
            <p className="font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>150+ terms in the full deck.</p>
            <p className="mt-1 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Every key term across all 4 subareas, plus the Vocab Matching game.</p>
            <a href="/#pricing" className="mt-4 inline-block rounded bg-[#7c1c2e] px-8 py-3 text-sm font-semibold text-white hover:bg-[#5a1220]" style={{ fontFamily: 'var(--font-sans)' }}>
              Get Full Access →
            </a>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  )
}
