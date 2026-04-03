'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const SF = { fontFamily: 'var(--font-sans)' }

interface Card { term: string; definition: string; example: string; obj: number }

const CARDS: Card[] = [
  // Objective 1
  { term: 'Alphabetic principle', definition: 'The understanding that letters and letter combinations systematically represent the sounds of spoken language. Once students grasp this concept, they can apply phonics patterns to decode unfamiliar words.', example: '', obj: 1 },
  { term: 'Concepts of print', definition: 'The understandings about how written language works that children must acquire before or alongside phonics: print carries meaning, English is read left-to-right and top-to-bottom, spaces mark word boundaries, and books have orientation conventions.', example: 'During a shared reading, the teacher points word-by-word to demonstrate one-to-one correspondence between spoken and printed words.', obj: 1 },
  { term: 'Dialogic reading', definition: 'An interactive read-aloud technique where the teacher prompts children to retell, elaborate, and engage with the text rather than listening passively. It is especially effective for building oral vocabulary and narrative comprehension in young children.', example: '', obj: 1 },
  { term: 'Elkonin (sound) boxes', definition: 'A phonemic awareness instructional tool: a row of connected boxes, one per phoneme, where students push a token into each box as they say each sound in a word. Boxes can be extended into phonics by having students write letters instead of using tokens.', example: 'A student says "ship" and pushes tokens: one for /ʃ/, one for /ɪ/, one for /p/ — three boxes total.', obj: 1 },
  { term: 'Invented (phonetic) spelling', definition: 'Writing words using known letter-sound knowledge rather than conventional spelling (e.g., "kat" for "cat"). Analyzing invented spellings reveals a student\'s current phonemic awareness and phonics development and simultaneously reinforces both skills.', example: '', obj: 1 },
  { term: 'Onset-rime awareness', definition: 'Awareness that each syllable can be divided into an onset (the initial consonant or consonant cluster before the vowel) and a rime (the vowel and everything that follows). Rhyming and word-family tasks operate at this level.', example: 'In "bat," the onset is /b/ and the rime is -at; bat, cat, sat, and hat all share the same rime.', obj: 1 },
  { term: 'Phoneme blending', definition: 'Combining isolated phonemes spoken in sequence into a recognizable word. It is an important predictor of decoding success because it mirrors what the brain does when reading phonetically.', example: 'Teacher says /d/ /ɒ/ /g/ slowly; students respond "dog."', obj: 1 },
  { term: 'Phoneme manipulation', definition: 'The most advanced phonemic awareness skill — changing a word by deleting, adding, or substituting a phoneme. These tasks require the student to hold the word in working memory while altering one sound.', example: '"Say cat without /k/" → "at" (deletion); "change /b/ in bat to /s/" → "sat" (substitution).', obj: 1 },
  { term: 'Phoneme segmentation', definition: 'Breaking a spoken word into all of its individual sounds in sequence. It is the single strongest predictor of early reading achievement and a prerequisite for phonics decoding.', example: 'Students push a token into each Elkonin box for every sound they hear: "cat" → /k/ /æ/ /t/ = 3 boxes.', obj: 1 },
  { term: 'Phonemic awareness', definition: 'A specific subset of phonological awareness focused exclusively on individual phonemes — the smallest units of sound in spoken language. All tasks are completely oral; the moment print appears, the task becomes phonics.', example: 'Segmenting "dog" into /d/ /ɒ/ /g/ or blending /s/ /t/ /ɒ/ /p/ into "stop."', obj: 1 },
  { term: 'Phonological awareness', definition: 'The broad understanding that spoken language is made up of smaller sound units — words, syllables, and onset-rime patterns. It is a listening and speaking skill; no print is involved.', example: 'Clapping syllables in "butterfly" or identifying that "cat" rhymes with "bat."', obj: 1 },
  // Objective 2
  { term: 'CVCe (magic e) pattern', definition: 'A syllable pattern where a silent final e causes the medial vowel to produce its long sound. One of the earliest multi-letter phonics patterns taught in the scope and sequence.', example: '"cake," "bike," "home," and "cute" each follow the CVCe pattern.', obj: 2 },
  { term: 'Consonant blend', definition: 'Two or three consonants appearing together where each sound is still pronounced separately. Blends differ from digraphs because all individual sounds remain intact.', example: '"str-" in "street" is a blend: /s/, /t/, and /r/ are all pronounced.', obj: 2 },
  { term: 'Consonant digraph', definition: 'Two consecutive consonants that together represent a single phoneme, with each letter losing its individual sound. Common digraphs include sh, ch, th, wh, ph, ck, and ng.', example: 'In "ship," the letters s and h form the digraph sh, representing one sound /ʃ/.', obj: 2 },
  { term: 'Decodable text', definition: 'Text written specifically to use only phonics patterns that students have already been explicitly taught. It is the appropriate independent practice vehicle for early readers who are consolidating newly learned phonics patterns.', example: '', obj: 2 },
  { term: 'Diphthong', definition: 'A vowel sound that glides between two positions within a single syllable. Diphthongs are technically distinct from vowel teams because the sound shifts rather than remaining stable.', example: '"oi/oy" in "coin" and "boy"; "ou/ow" in "cloud" and "now."', obj: 2 },
  { term: 'High-frequency words', definition: 'Words that appear most often in written text. Many are phonetically irregular and must be memorized as whole words; others are phonetically regular but require automaticity. The Dolch list (220 words) and Fry list (1,000 words) are the two most widely used.', example: 'The Fry top 100 words ("the," "of," "and," "a") account for roughly half of all words in written text.', obj: 2 },
  { term: 'Homograph', definition: 'A word spelled identically to another word but with a different meaning and sometimes a different pronunciation depending on context. Semantic and syntactic context must be used to confirm the correct pronunciation.', example: '"Tear" can mean a drop of water (/tɪər/) or to rip (/tɛr/) — only sentence context resolves which meaning applies.', obj: 2 },
  { term: 'Inflectional morpheme', definition: 'A suffix that signals a grammatical relationship without changing a word\'s part of speech. The eight English inflectional morphemes are -s, -es, -ed, -ing, -er (comparative), -est, -\'s, and -s\' (possessives).', example: '"Jumped" adds -ed to show past tense; "taller" adds -er to show comparison — both stay adjectives/verbs.', obj: 2 },
  { term: 'R-controlled vowel', definition: 'A vowel followed immediately by the letter r, causing the vowel to produce a sound that is neither its short nor its long form. The r modifies the vowel\'s pronunciation.', example: '"ar" in "car," "er/ir/ur" in "fern/bird/burn," and "or" in "corn."', obj: 2 },
  { term: 'Systematic explicit phonics', definition: 'Phonics instruction that presents letter-sound relationships in a deliberate scope and sequence from simple to complex. Research consistently shows this produces better outcomes than embedded or incidental approaches.', example: '', obj: 2 },
  { term: 'Vowel team', definition: 'Two adjacent vowels that together represent a single vowel sound. Often described by "when two vowels go walking, the first one does the talking," though this rule has many exceptions.', example: '"ai" in "rain," "ea" in "meat," and "oa" in "boat" are vowel teams.', obj: 2 },
  { term: 'Word sorts', definition: 'A phonics activity where students categorize words by spelling pattern (e.g., CVC vs. CVCe). Closed sorts provide the categories; open sorts let students determine their own. Word sorts build pattern recognition and spelling awareness.', example: '', obj: 2 },
  // Objective 3
  { term: 'Closed syllable', definition: 'A syllable that ends in one or more consonants, causing the vowel to be short. It is the most common syllable type in English.', example: '"cat," "sit," and the first syllable of "hap-pen" are all closed syllables.', obj: 3 },
  { term: 'Cognate awareness instruction', definition: 'Explicitly teaching English learners to recognize words that share the same Latin or Greek root in both English and their home language. This is a powerful vocabulary strategy for EL students.', example: 'A Spanish speaker recognizes that "nation" and "nación" share meaning, unlocking related words like "national" and "nationality."', obj: 3 },
  { term: 'Derivational morpheme', definition: 'A prefix or suffix that creates a new word, often changing its part of speech. Unlike inflectional morphemes, derivational morphemes alter meaning and frequently shift grammatical category.', example: '"act" (verb) + -ion → "action" (noun); "happy" (adj) + -ness → "happiness" (noun).', obj: 3 },
  { term: 'Free vs. bound morpheme', definition: 'A free morpheme can stand alone as a word (play, friend, act). A bound morpheme must attach to another morpheme and cannot stand alone — all prefixes and suffixes are bound morphemes.', example: '', obj: 3 },
  { term: 'Latin and Greek roots', definition: 'Core morphemes from Latin or Greek that carry primary meaning and appear in hundreds of English academic words. Knowledge of 20 common roots (port, dict, bio, graph, phon, geo) unlocks vocabulary across subjects.', example: 'The root "port" (carry) appears in transport, import, export, portable, and porter.', obj: 3 },
  { term: 'Morpheme analysis', definition: 'A vocabulary and decoding strategy in which students decompose an unfamiliar word into its meaningful parts (prefix + root + suffix) to infer its meaning. Morpheme analysis scales vocabulary learning efficiently across content areas.', example: 'Seeing "biosphere," a student uses bio (life) + sphere (globe) to infer "the zone of life surrounding Earth."', obj: 3 },
  { term: 'Open syllable', definition: 'A syllable that ends with a vowel, causing that vowel to say its long sound. The VC/CV and V/CV syllabication rules help students find open syllables in multisyllabic words.', example: '"me," "go," and the first syllable of "ba-by" or "ti-ger" are open syllables.', obj: 3 },
  { term: 'Orthographic rules', definition: 'Spelling patterns that govern how words change when suffixes are added: drop the silent e before a vowel suffix (make → making), double the final consonant in a CVC word (hop → hopping), and change y to i before most suffixes (happy → happiness).', example: '', obj: 3 },
  { term: 'Six syllable types', definition: 'Every English syllable fits one of six categories: closed, open, vowel-consonant-e, vowel team, r-controlled, and consonant-le. Teaching these gives students a reliable system for decoding any multisyllabic word.', example: '', obj: 3 },
  { term: 'Syllabication strategies (VC/CV, V/CV)', definition: 'Rules for dividing multisyllabic words into syllables. VC/CV splits between two consonants (hap-pen); V/CV tries splitting before a single consonant to attempt an open syllable first (ti-ger).', example: '', obj: 3 },
  // Objective 4
  { term: 'Automaticity', definition: 'Fast, effortless word recognition that requires minimal conscious attention. When decoding is automatic, cognitive resources are freed for comprehension. Automaticity develops through wide, repeated reading at the independent level.', example: '', obj: 4 },
  { term: 'Echo reading', definition: 'A fluency instructional technique where the teacher reads a phrase or sentence aloud and students immediately repeat it, mimicking the teacher\'s phrasing and expression. Provides a fluent model and immediate prosody practice.', example: '', obj: 4 },
  { term: 'Independent reading level', definition: 'The text difficulty level at which a student reads with 95%+ accuracy and full comprehension without support. Wide reading at the independent level is the primary vehicle for building automaticity over time.', example: '', obj: 4 },
  { term: 'Instructional reading level', definition: 'The text difficulty level at which a student reads with 90–94% accuracy and needs some teacher support to comprehend. This is the appropriate level for guided reading instruction.', example: '', obj: 4 },
  { term: 'Phrase-cued reading', definition: 'Text is marked with slash marks at natural phrase boundaries so students pause at meaningful chunks rather than word by word. Directly develops prosody by teaching syntactically appropriate phrasing.', example: '', obj: 4 },
  { term: 'Prosody', definition: 'The component of fluency involving reading with appropriate expression, phrasing, intonation, and rhythm that reflects the meaning of the text. Prosody is the bridge between fluency and comprehension.', example: 'A student reading "Was she really going to jump?" with rising intonation demonstrates prosodic understanding.', obj: 4 },
  { term: 'Reader\'s Theater', definition: 'Students rehearse and perform scripts adapted from books, reading their assigned parts aloud for an audience. The authentic motivation to perform drives repeated reading and builds fluency, prosody, and engagement simultaneously.', example: '', obj: 4 },
  { term: 'Reading fluency', definition: 'Reading connected text with three integrated components: accuracy (decoding words correctly), rate (reading at an appropriate pace), and prosody (reading with expression and phrasing that reflects meaning). All three are required.', example: '', obj: 4 },
  { term: 'Repeated reading', definition: 'The most research-supported fluency intervention: students read the same passage multiple times, with a fluent model first, aiming to improve rate and prosody. Most effective when text is at the instructional level and corrective feedback is provided.', example: '', obj: 4 },
  { term: 'WCPM (words correct per minute)', definition: 'The standard metric for oral reading fluency — the number of words read correctly during a timed one-minute oral reading. Errors reduce the count. WCPM is compared to grade-level benchmarks to identify students below benchmark.', example: 'A student reads a 100-word passage in one minute with 6 errors; WCPM = 94.', obj: 4 },
]

const ROUND_SIZE = 15

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

interface MatchQ { card: Card; options: Card[] }
interface MatchResult { card: Card; selectedTerm: string; correct: boolean }

function buildMatchQuestions(cards: Card[]): MatchQ[] {
  if (cards.length < 4) return []
  const pool = shuffle(cards).slice(0, ROUND_SIZE)
  return pool.map((card) => {
    const others = shuffle(cards.filter((c) => c.term !== card.term)).slice(0, 3)
    return { card, options: shuffle([card, ...others]) }
  })
}

const OBJ_LABELS: Record<number, string> = {
  1: 'Phonological & Phonemic Awareness, Concepts of Print',
  2: 'Phonics, High-Frequency Words & Spelling',
  3: 'Word Analysis, Syllabication & Morphemic Analysis',
  4: 'Reading Fluency',
}

export default function FreeFlashcardsPage() {
  const router = useRouter()

  // Flashcard state
  const [index, setIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [knownSet, setKnownSet] = useState<Set<number>>(new Set())
  const [reviewedSet, setReviewedSet] = useState<Set<number>>(new Set([0]))

  // Matching state
  const [matchQuestions, setMatchQuestions] = useState<MatchQ[]>(() => buildMatchQuestions(CARDS))
  const [matchIndex, setMatchIndex] = useState(0)
  const [matchSelected, setMatchSelected] = useState<string | null>(null)
  const [matchResults, setMatchResults] = useState<MatchResult[]>([])
  const [matchPhase, setMatchPhase] = useState<'playing' | 'results'>('playing')
  const matchTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const total = CARDS.length
  const card = CARDS[index]
  const progressPct = Math.round((reviewedSet.size / total) * 100)

  function goTo(delta: number) {
    const next = index + delta
    if (next < 0 || next >= total) return
    setIsFlipped(false)
    setTimeout(() => {
      setIndex(next)
      setReviewedSet((s) => { const n = new Set(s); n.add(next); return n })
    }, 150)
  }

  function jumpTo(i: number) {
    setIsFlipped(false)
    setTimeout(() => {
      setIndex(i)
      setReviewedSet((s) => { const n = new Set(s); n.add(i); return n })
    }, 150)
  }

  function handleShuffle() {
    const shuffled = shuffle(CARDS.map((_, i) => i))
    setIndex(shuffled[0])
    setIsFlipped(false)
    setReviewedSet(new Set([shuffled[0]]))
  }

  function handleMarkKnown() {
    setKnownSet((prev) => {
      const next = new Set(prev)
      if (next.has(index)) next.delete(index)
      else next.add(index)
      return next
    })
  }

  // Matching handlers
  function handleMatchSelect(term: string) {
    if (matchSelected !== null) return
    const current = matchQuestions[matchIndex]
    if (!current) return
    const correct = term === current.card.term
    setMatchSelected(term)
    const result: MatchResult = { card: current.card, selectedTerm: term, correct }
    if (matchTimerRef.current) clearTimeout(matchTimerRef.current)
    matchTimerRef.current = setTimeout(() => {
      const newResults = [...matchResults, result]
      if (matchIndex + 1 >= matchQuestions.length) {
        setMatchResults(newResults)
        setMatchPhase('results')
      } else {
        setMatchResults(newResults)
        setMatchIndex((i) => i + 1)
        setMatchSelected(null)
      }
    }, 750)
  }

  function handleRestartMatch() {
    setMatchQuestions(buildMatchQuestions(CARDS))
    setMatchIndex(0)
    setMatchSelected(null)
    setMatchResults([])
    setMatchPhase('playing')
  }

  // Keyboard nav
  const goToRef = useRef(goTo)
  goToRef.current = goTo
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToRef.current(-1)
      if (e.key === 'ArrowRight') goToRef.current(1)
      if (e.key === ' ') { e.preventDefault(); setIsFlipped((f) => !f) }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const handleSubareaClick = useCallback((sa: string) => {
    if (sa === 'II' || sa === 'III') router.push('/#pricing')
  }, [router])

  const currentMatch = matchQuestions[matchIndex]

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-[#faf8f5]">

        {/* Top banner */}
        <div className="border-b border-[#e8e0e2] bg-white px-6 py-3 text-center">
          <p className="text-sm text-[#6b6b6b]" style={SF}>
            Free — Subarea I complete (43 terms).{' '}
            <a href="/#pricing" className="font-semibold text-[#7c1c2e] hover:underline">Get all subareas →</a>
          </p>
        </div>

        {/* Controls bar */}
        <div style={{ background: 'white', borderBottom: '1px solid #e8e0e2', padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={handleShuffle}
            style={{ background: '#f9f0f2', border: '1px solid #e8e0e2', borderRadius: 6, padding: '7px 16px', fontSize: 13, ...SF, fontWeight: 600, color: '#7c1c2e', cursor: 'pointer' }}
          >
            ⇌ Shuffle
          </button>
          <div style={{ display: 'flex', gap: 6 }}>
            {(['I', 'II', 'III'] as const).map((sa) => (
              <button
                key={sa}
                onClick={() => handleSubareaClick(sa)}
                style={{
                  background: sa === 'I' ? '#7c1c2e' : 'white',
                  color: sa === 'I' ? 'white' : '#6b6b6b',
                  border: `1px solid ${sa === 'I' ? '#7c1c2e' : '#e8e0e2'}`,
                  borderRadius: 6,
                  padding: '7px 14px',
                  fontSize: 13,
                  ...SF,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Subarea {sa}{sa !== 'I' && ' 🔒'}
              </button>
            ))}
          </div>
          <span style={{ fontSize: 13, ...SF, color: '#6b6b6b' }}>
            {knownSet.size} known · {total - knownSet.size} remaining
          </span>
        </div>

        {/* Progress bar */}
        <div style={{ height: 4, background: '#e8e0e2' }}>
          <div style={{ height: '100%', width: `${progressPct}%`, background: '#7c1c2e', transition: 'width 0.3s ease' }} />
        </div>

        {/* ── Flashcard area ── */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '48px 24px 32px' }}>
          <span style={{ ...SF, fontSize: 13, color: '#6b6b6b', marginBottom: 16 }}>
            Card {index + 1} of {total} · {reviewedSet.size} reviewed
          </span>

          {/* Flip card */}
          <div onClick={() => setIsFlipped((f) => !f)} style={{ width: '100%', maxWidth: 600, height: 400, cursor: 'pointer', perspective: '1000px' }}>
            <div style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d', transition: 'transform 0.45s ease', transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
              {/* Front — Term */}
              <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', background: 'white', border: '1px solid #e8e0e2', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.08)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 48px', textAlign: 'center' }}>
                <p style={{ ...SF, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#6b6b6b', marginBottom: 8 }}>TERM</p>
                <p style={{ ...SF, fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9b9b9b', marginBottom: 20 }}>Obj {card.obj} — {OBJ_LABELS[card.obj]}</p>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 32, fontWeight: 700, color: '#1a1a1a', lineHeight: 1.2, marginBottom: 0 }}>{card.term}</h2>
                <p style={{ marginTop: 28, fontSize: 12, ...SF, color: '#6b6b6b' }}>Click to flip · Space bar to flip</p>
              </div>
              {/* Back — Definition */}
              <div style={{ position: 'absolute', inset: 0, backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden', transform: 'rotateY(180deg)', background: '#5a1220', borderRadius: 16, boxShadow: '0 4px 24px rgba(0,0,0,0.12)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 48px', textAlign: 'center' }}>
                <p style={{ ...SF, fontSize: 11, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#e8b4bc', marginBottom: 20 }}>DEFINITION</p>
                <p style={{ ...SF, fontSize: 16, color: 'white', lineHeight: 1.65, marginBottom: card.example ? 20 : 0 }}>{card.definition}</p>
                {card.example && <p style={{ ...SF, fontSize: 13, color: '#e8b4bc', fontStyle: 'italic', lineHeight: 1.5 }}>{card.example}</p>}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => goTo(-1)}
              disabled={index === 0}
              style={{ background: 'white', border: '1px solid #e8e0e2', borderRadius: 8, padding: '10px 24px', fontSize: 14, ...SF, fontWeight: 600, color: index === 0 ? '#c0b4b8' : '#1a1a1a', cursor: index === 0 ? 'not-allowed' : 'pointer' }}
            >
              ← Previous
            </button>
            <button
              onClick={handleMarkKnown}
              style={{ background: knownSet.has(index) ? '#7c1c2e' : 'white', border: `1px solid ${knownSet.has(index) ? '#7c1c2e' : '#e8e0e2'}`, borderRadius: 8, padding: '10px 24px', fontSize: 14, ...SF, fontWeight: 600, color: knownSet.has(index) ? 'white' : '#1a1a1a', cursor: 'pointer' }}
            >
              {knownSet.has(index) ? '✓ Known' : 'Mark as Known'}
            </button>
            <button
              onClick={() => goTo(1)}
              style={{ background: '#7c1c2e', border: 'none', borderRadius: 8, padding: '10px 24px', fontSize: 14, ...SF, fontWeight: 600, color: 'white', cursor: 'pointer' }}
            >
              Next →
            </button>
          </div>
          <p style={{ marginTop: 16, fontSize: 12, ...SF, color: '#6b6b6b' }}>← → arrow keys to navigate</p>

        </div>

        {/* ── Matching Activity ── */}
        <div style={{ borderTop: '2px solid #e8e0e2', background: '#faf8f5', padding: '48px 24px 64px' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <p style={{ ...SF, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7c1c2e', marginBottom: 8 }}>Matching Activity</p>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 700, color: '#1a1a1a', margin: 0 }}>Match the definition to the correct term</h3>
            </div>

            {matchPhase === 'playing' && currentMatch ? (
              <>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ ...SF, fontSize: 13, color: '#6b6b6b' }}>Question {matchIndex + 1} of {matchQuestions.length}</span>
                  <span style={{ ...SF, fontSize: 13, color: '#6b6b6b' }}>{matchResults.filter(r => r.correct).length} correct so far</span>
                </div>
                <div style={{ height: 4, background: '#e8e0e2', borderRadius: 2, marginBottom: 28 }}>
                  <div style={{ height: '100%', width: `${(matchIndex / matchQuestions.length) * 100}%`, background: '#7c1c2e', borderRadius: 2, transition: 'width 0.3s ease' }} />
                </div>

                {/* Definition card */}
                <div style={{ background: 'white', border: '1px solid #e8e0e2', borderRadius: 12, padding: '28px 32px', marginBottom: 24, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                  <p style={{ ...SF, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7c1c2e', marginBottom: 12 }}>Definition</p>
                  <p style={{ ...SF, fontSize: 17, color: '#1a1a1a', lineHeight: 1.65, margin: 0 }}>{currentMatch.card.definition}</p>
                  {currentMatch.card.example && (
                    <p style={{ ...SF, fontSize: 14, color: '#6b6b6b', fontStyle: 'italic', marginTop: 12, marginBottom: 0, lineHeight: 1.5 }}>{currentMatch.card.example}</p>
                  )}
                </div>

                {/* Term options */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {currentMatch.options.map((opt) => {
                    const isSelected = matchSelected === opt.term
                    const isCorrectOpt = opt.term === currentMatch.card.term
                    let bg = 'white', border = '1px solid #e8e0e2', color = '#1a1a1a'
                    if (matchSelected !== null) {
                      if (isCorrectOpt) { bg = '#f0fdf4'; border = '1px solid #86efac'; color = '#166534' }
                      else if (isSelected) { bg = '#fff1f2'; border = '1px solid #fca5a5'; color = '#991b1b' }
                    }
                    return (
                      <button
                        key={opt.term}
                        onClick={() => handleMatchSelect(opt.term)}
                        disabled={matchSelected !== null}
                        style={{ background: bg, border, borderRadius: 10, padding: '16px 20px', fontSize: 15, ...SF, fontWeight: 600, color, cursor: matchSelected !== null ? 'default' : 'pointer', textAlign: 'center', transition: 'background 0.2s, border 0.2s', lineHeight: 1.3 }}
                      >
                        {opt.term}
                      </button>
                    )
                  })}
                </div>
              </>
            ) : matchPhase === 'results' ? (
              <>
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
                      : 'Review the items below and try again.'}
                  </p>
                  <button onClick={handleRestartMatch} style={{ background: '#7c1c2e', color: 'white', border: 'none', borderRadius: 8, padding: '10px 28px', fontSize: 14, ...SF, fontWeight: 600, cursor: 'pointer' }}>
                    Try Again
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {matchResults.map((r, i) => (
                    <div key={i} style={{ background: r.correct ? '#f0fdf4' : '#fff1f2', border: `1px solid ${r.correct ? '#86efac' : '#fca5a5'}`, borderRadius: 10, padding: '14px 18px', display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <span style={{ fontSize: 16, marginTop: 1, flexShrink: 0 }}>{r.correct ? '✓' : '✗'}</span>
                      <div>
                        <p style={{ ...SF, fontSize: 14, fontWeight: 700, color: r.correct ? '#166534' : '#991b1b', margin: '0 0 4px' }}>{r.card.term}</p>
                        <p style={{ ...SF, fontSize: 13, color: '#374151', margin: 0, lineHeight: 1.5 }}>{r.card.definition}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        </div>

        {/* ── Full Glossary ── */}
        <div style={{ borderTop: '2px solid #e8e0e2', background: 'white', padding: '48px 24px 64px' }}>
          <div style={{ maxWidth: 680, margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <p style={{ ...SF, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: '#7c1c2e', marginBottom: 8 }}>Study Reference</p>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: 24, fontWeight: 700, color: '#1a1a1a', margin: 0 }}>Full Glossary</h3>
            </div>
            {[1, 2, 3, 4].map((obj) => (
              <div key={obj} style={{ marginBottom: 32 }}>
                <div style={{ background: '#faf8f5', border: '1px solid #e8e0e2', borderRadius: '8px 8px 0 0', padding: '10px 18px', borderBottom: 'none' }}>
                  <p style={{ ...SF, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7c1c2e', margin: '0 0 2px' }}>Objective {obj}</p>
                  <p style={{ fontFamily: 'var(--font-serif)', fontSize: 14, fontWeight: 700, color: '#1a1a1a', margin: 0 }}>{OBJ_LABELS[obj]}</p>
                </div>
                <div style={{ border: '1px solid #e8e0e2', borderRadius: '0 0 8px 8px', overflow: 'hidden' }}>
                  {CARDS.filter((c) => c.obj === obj).map((c, i, arr) => (
                    <div key={c.term} style={{ padding: '16px 18px', borderBottom: i < arr.length - 1 ? '1px solid #f0eaec' : 'none' }}>
                      <p style={{ ...SF, fontSize: 14, fontWeight: 700, color: '#1a1a1a', margin: '0 0 4px' }}>{c.term}</p>
                      <p style={{ ...SF, fontSize: 13, color: '#444', lineHeight: 1.6, margin: 0 }}>{c.definition}</p>
                      {c.example && (
                        <p style={{ ...SF, fontSize: 12, color: '#6b6b6b', fontStyle: 'italic', marginTop: 6, marginBottom: 0, lineHeight: 1.5, borderLeft: '2px solid #e8e0e2', paddingLeft: 10 }}>{c.example}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ background: '#faf8f5', borderTop: '2px solid #e8e0e2', padding: '48px 24px' }}>
          <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', background: 'white', border: '2px solid #7c1c2e', borderRadius: 16, padding: '32px 40px' }}>
            <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20, fontWeight: 700, color: '#1a1a1a', margin: '0 0 8px' }}>Get Subareas II & III + full prep</p>
            <p style={{ ...SF, fontSize: 14, color: '#6b6b6b', margin: '0 0 20px', lineHeight: 1.6 }}>150+ terms across all subareas, practice tests, study guide, and AI-graded written responses.</p>
            <a href="/#pricing" style={{ display: 'inline-block', background: '#7c1c2e', color: 'white', borderRadius: 8, padding: '12px 36px', fontSize: 14, ...SF, fontWeight: 600, textDecoration: 'none' }}>
              Get Full Access →
            </a>
          </div>
        </div>

      </main>
      <SiteFooter />
    </>
  )
}
