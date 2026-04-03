'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const SF = { fontFamily: 'var(--font-sans)' }
const SE = { fontFamily: 'var(--font-serif)' }

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

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildMatch(cards: Card[]) {
  const pool = shuffle(cards).slice(0, 15)
  return pool.map((card) => {
    const others = shuffle(cards.filter((c) => c.term !== card.term)).slice(0, 3)
    return { card, options: shuffle([card, ...others]) }
  })
}

type Mode = 'flashcard' | 'matching' | 'glossary'

export default function FreeFlashcardsPage() {
  const router = useRouter()
  const [mode, setMode] = useState<Mode>('flashcard')

  // Flashcard state
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [seen, setSeen] = useState<Set<number>>(new Set([0]))

  // Matching state
  const [matchRound, setMatchRound] = useState(() => buildMatch(CARDS))
  const [matchIdx, setMatchIdx] = useState(0)
  const [selected, setSelected] = useState<string | null>(null)
  const [matchCorrect, setMatchCorrect] = useState(0)
  const [matchDone, setMatchDone] = useState(false)

  const card = CARDS[index]

  function goCard(dir: 1 | -1) {
    const next = (index + dir + CARDS.length) % CARDS.length
    setIndex(next)
    setFlipped(false)
    setSeen((prev) => new Set(Array.from(prev).concat(next)))
  }

  function jumpCard(i: number) {
    setIndex(i)
    setFlipped(false)
    setSeen((prev) => new Set(Array.from(prev).concat(i)))
  }

  const handleSubarea = useCallback((sa: string) => {
    if (sa === 'II' || sa === 'III') router.push('/#pricing')
  }, [router])

  function pickMatch(term: string) {
    if (selected !== null) return
    setSelected(term)
    const q = matchRound[matchIdx]
    const correct = term === q.card.term
    if (correct) setMatchCorrect((n) => n + 1)
    setTimeout(() => {
      if (matchIdx + 1 >= matchRound.length) {
        setMatchDone(true)
      } else {
        setMatchIdx((n) => n + 1)
        setSelected(null)
      }
    }, 800)
  }

  function restartMatch() {
    setMatchRound(buildMatch(CARDS))
    setMatchIdx(0)
    setSelected(null)
    setMatchCorrect(0)
    setMatchDone(false)
  }

  const objLabels: Record<number, string> = {
    1: 'Phonological & Phonemic Awareness, Concepts of Print',
    2: 'Phonics, High-Frequency Words & Spelling',
    3: 'Word Analysis, Syllabication & Morphemic Analysis',
    4: 'Reading Fluency',
  }

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

        <div className="mx-auto max-w-5xl px-6 py-10">

          {/* Header + subarea selector */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#7c1c2e]" style={SF}>Free · Subarea I · 43 Terms</p>
              <h1 className="mt-1 text-3xl font-bold text-[#1a1a1a]" style={SE}>Flashcards</h1>
            </div>
            <div className="flex gap-2">
              {(['I', 'II', 'III'] as const).map((sa) => (
                <button
                  key={sa}
                  onClick={() => handleSubarea(sa)}
                  className={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                    sa === 'I'
                      ? 'border-[#7c1c2e] bg-[#7c1c2e] text-white'
                      : 'border-[#e8e0e2] text-[#6b6b6b] hover:border-[#7c1c2e] hover:text-[#7c1c2e]'
                  }`}
                  style={SF}
                >
                  Subarea {sa}{sa !== 'I' && ' 🔒'}
                </button>
              ))}
            </div>
          </div>

          {/* Mode tabs */}
          <div className="mt-6 flex gap-1 rounded-lg border border-[#e8e0e2] bg-white p-1">
            {(['flashcard', 'matching', 'glossary'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 rounded-md py-2 text-sm font-semibold capitalize transition-colors ${
                  mode === m ? 'bg-[#7c1c2e] text-white' : 'text-[#6b6b6b] hover:text-[#1a1a1a]'
                }`}
                style={SF}
              >
                {m === 'flashcard' ? 'Flashcards' : m === 'matching' ? 'Matching' : 'Glossary'}
              </button>
            ))}
          </div>

          {/* ── FLASHCARD MODE ── */}
          {mode === 'flashcard' && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-[#6b6b6b]" style={SF}>{seen.size} / {CARDS.length} seen</p>
                <p className="text-xs text-[#6b6b6b]" style={SF}>{index + 1} of {CARDS.length}</p>
              </div>
              <div className="h-1.5 rounded-full bg-[#e8e0e2] mb-6">
                <div className="h-1.5 rounded-full bg-[#7c1c2e] transition-all" style={{ width: `${(seen.size / CARDS.length) * 100}%` }} />
              </div>

              {/* Objective label */}
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b9b9b] mb-2" style={SF}>
                Objective {card.obj} — {objLabels[card.obj]}
              </p>

              {/* Card */}
              <button
                onClick={() => setFlipped(!flipped)}
                className="w-full min-h-[240px] rounded-xl border-2 border-[#e8e0e2] bg-white p-8 text-left hover:border-[#7c1c2e] hover:shadow-md transition-all active:scale-[0.99]"
              >
                {!flipped ? (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e] mb-4" style={SF}>Term</p>
                    <p className="text-2xl font-bold text-[#1a1a1a]" style={SE}>{card.term}</p>
                    <p className="mt-8 text-xs text-[#9b9b9b]" style={SF}>Click to reveal definition →</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e] mb-4" style={SF}>Definition</p>
                    <p className="text-base leading-relaxed text-[#1a1a1a]" style={SF}>{card.definition}</p>
                    {card.example && (
                      <p className="mt-4 text-sm text-[#6b6b6b] italic border-l-2 border-[#e8e0e2] pl-3" style={SF}>
                        Example: {card.example}
                      </p>
                    )}
                    <p className="mt-6 text-xs text-[#9b9b9b]" style={SF}>Click to see term →</p>
                  </div>
                )}
              </button>

              {/* Nav */}
              <div className="mt-4 flex items-center justify-between">
                <button onClick={() => goCard(-1)} className="rounded border border-[#e8e0e2] px-5 py-2.5 text-sm font-semibold text-[#6b6b6b] hover:border-[#7c1c2e] hover:text-[#7c1c2e]" style={SF}>← Prev</button>
                <button onClick={() => setFlipped(!flipped)} className="rounded border border-[#7c1c2e] px-5 py-2.5 text-sm font-semibold text-[#7c1c2e] hover:bg-[#7c1c2e] hover:text-white transition-colors" style={SF}>Flip</button>
                <button onClick={() => goCard(1)} className="rounded border border-[#e8e0e2] px-5 py-2.5 text-sm font-semibold text-[#6b6b6b] hover:border-[#7c1c2e] hover:text-[#7c1c2e]" style={SF}>Next →</button>
              </div>

              {/* Term chips */}
              <div className="mt-8 rounded-xl border border-[#e8e0e2] bg-white p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-[#6b6b6b] mb-3" style={SF}>All 43 terms — jump to any</p>
                <div className="flex flex-wrap gap-2">
                  {CARDS.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => jumpCard(i)}
                      className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
                        i === index ? 'border-[#7c1c2e] bg-[#7c1c2e] text-white'
                        : seen.has(i) ? 'border-[#7c1c2e] text-[#7c1c2e]'
                        : 'border-[#e8e0e2] text-[#6b6b6b]'
                      }`}
                      style={SF}
                    >
                      {c.term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── MATCHING MODE ── */}
          {mode === 'matching' && (
            <div className="mt-6">
              {matchDone ? (
                <div className="rounded-xl border border-[#e8e0e2] bg-white p-10 text-center">
                  <p className="text-4xl font-bold text-[#7c1c2e]" style={SE}>{matchCorrect} / {matchRound.length}</p>
                  <p className="mt-2 text-sm text-[#6b6b6b]" style={SF}>
                    {matchCorrect === matchRound.length ? 'Perfect score!' : matchCorrect >= matchRound.length * 0.8 ? 'Great work!' : 'Keep practicing!'}
                  </p>
                  <button
                    onClick={restartMatch}
                    className="mt-6 rounded bg-[#7c1c2e] px-8 py-3 text-sm font-semibold text-white hover:bg-[#5a1220]"
                    style={SF}
                  >
                    Play Again (new set)
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <p className="text-sm text-[#6b6b6b]" style={SF}>Question {matchIdx + 1} of {matchRound.length}</p>
                    <p className="text-sm font-semibold text-[#7c1c2e]" style={SF}>{matchCorrect} correct</p>
                  </div>
                  <div className="h-1.5 rounded-full bg-[#e8e0e2] mb-6">
                    <div className="h-1.5 rounded-full bg-[#7c1c2e] transition-all" style={{ width: `${(matchIdx / matchRound.length) * 100}%` }} />
                  </div>

                  {/* Definition prompt */}
                  <div className="rounded-xl border-2 border-[#7c1c2e] bg-white p-6 mb-5">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e] mb-3" style={SF}>Match this definition to the correct term:</p>
                    <p className="text-base leading-relaxed text-[#1a1a1a]" style={SF}>{matchRound[matchIdx].card.definition}</p>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-3">
                    {matchRound[matchIdx].options.map((opt) => {
                      const isCorrect = opt.term === matchRound[matchIdx].card.term
                      const isSelected = selected === opt.term
                      let cls = 'w-full rounded-lg border-2 px-5 py-4 text-left text-sm font-semibold transition-colors '
                      if (selected === null) cls += 'border-[#e8e0e2] text-[#1a1a1a] hover:border-[#7c1c2e]'
                      else if (isCorrect) cls += 'border-green-500 bg-green-50 text-green-800'
                      else if (isSelected) cls += 'border-red-400 bg-red-50 text-red-800'
                      else cls += 'border-[#e8e0e2] text-[#9b9b9b]'
                      return (
                        <button key={opt.term} onClick={() => pickMatch(opt.term)} className={cls} style={SF}>
                          {opt.term}
                        </button>
                      )
                    })}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── GLOSSARY MODE ── */}
          {mode === 'glossary' && (
            <div className="mt-6 space-y-3">
              <p className="text-xs text-[#6b6b6b]" style={SF}>43 terms — Subarea I: Foundations of Reading Development</p>
              {[1, 2, 3, 4].map((obj) => (
                <div key={obj} className="rounded-xl border border-[#e8e0e2] bg-white overflow-hidden">
                  <div className="bg-[#faf8f5] border-b border-[#e8e0e2] px-5 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e]" style={SF}>Objective {obj}</p>
                    <p className="text-sm font-semibold text-[#1a1a1a]" style={SE}>{objLabels[obj]}</p>
                  </div>
                  <div className="divide-y divide-[#e8e0e2]">
                    {CARDS.filter((c) => c.obj === obj).map((c) => (
                      <div key={c.term} className="px-5 py-4">
                        <p className="text-sm font-bold text-[#1a1a1a]" style={SF}>{c.term}</p>
                        <p className="mt-1 text-sm leading-relaxed text-[#444]" style={SF}>{c.definition}</p>
                        {c.example && (
                          <p className="mt-2 text-xs text-[#6b6b6b] italic border-l-2 border-[#e8e0e2] pl-3" style={SF}>
                            {c.example}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="mt-10 rounded-xl border-2 border-[#7c1c2e] bg-white p-6 text-center">
            <p className="font-bold text-[#1a1a1a]" style={SE}>Get Subareas II & III + full prep access</p>
            <p className="mt-1 text-sm text-[#6b6b6b]" style={SF}>150+ terms across all subareas, practice tests, study guide, and AI-graded written responses.</p>
            <a href="/#pricing" className="mt-4 inline-block rounded-lg bg-[#7c1c2e] px-10 py-3.5 text-sm font-semibold text-white hover:bg-[#5a1220] transition-colors" style={SF}>
              Get Full Access →
            </a>
          </div>

        </div>
      </main>
      <SiteFooter />
    </>
  )
}
