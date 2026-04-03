'use client'

import { useState, useEffect, useRef } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

type Phase = 'intro' | 'test' | 'cr' | 'grading' | 'results'

const SF = { fontFamily: 'var(--font-sans)' }
const SE = { fontFamily: 'var(--font-serif)' }

// ── 25 Questions ──────────────────────────────────────────────────────────────
interface Question {
  id: number
  subarea: 1 | 2 | 3 | 4
  subareaName: string
  text: string
  choices: string[]
  correct: number
  explanation: string
}

const QUESTIONS: Question[] = [
  // ── Subarea I: Phonological and Phonemic Awareness (Q1–5) ──
  {
    id: 1, subarea: 1, subareaName: 'Phonological and Phonemic Awareness',
    text: 'A first-grade student can recognize that "cat" and "bat" rhyme but cannot identify the individual sounds in either word. Which level of phonological awareness is the student demonstrating?',
    choices: ['Phoneme level', 'Onset-rime level', 'Syllable level', 'Word level'],
    correct: 1,
    explanation: 'Recognizing rhyme is an onset-rime skill — the student hears that two words share the same rime (-at) but has not yet developed phoneme-level awareness.',
  },
  {
    id: 2, subarea: 1, subareaName: 'Phonological and Phonemic Awareness',
    text: 'Which of the following best represents a phoneme?',
    choices: ['The word "ship"', 'The syllable "ship"', 'The /sh/ sound in "ship"', 'The letter "s" in "ship"'],
    correct: 2,
    explanation: 'A phoneme is the smallest unit of sound. /sh/ is one phoneme — two letters representing a single sound (a digraph).',
  },
  {
    id: 3, subarea: 1, subareaName: 'Phonological and Phonemic Awareness',
    text: 'A kindergarten teacher asks students to clap once for each syllable in "butterfly." How many claps should students produce?',
    choices: ['2', '3', '4', '5'],
    correct: 1,
    explanation: '"But-ter-fly" has three syllables. Syllable segmentation is an early phonological awareness skill that precedes phoneme-level work.',
  },
  {
    id: 4, subarea: 1, subareaName: 'Phonological and Phonemic Awareness',
    text: 'A teacher asks students to say "batch" and then say it again without the /b/ sound. Which phonemic awareness skill is this task targeting?',
    choices: ['Phoneme identification', 'Phoneme blending', 'Phoneme deletion', 'Phoneme categorization'],
    correct: 2,
    explanation: 'Phoneme deletion requires students to mentally remove a phoneme from a word — a higher-order manipulation skill that supports both reading and spelling.',
  },
  {
    id: 5, subarea: 1, subareaName: 'Phonological and Phonemic Awareness',
    text: 'Which of the following is the correct developmental sequence for phonological awareness skills?',
    choices: [
      'Phoneme segmentation → rhyme recognition → syllable blending → onset-rime manipulation',
      'Rhyme recognition → syllable awareness → onset-rime blending → phoneme manipulation',
      'Phoneme manipulation → onset-rime blending → syllable awareness → rhyme recognition',
      'Onset-rime blending → phoneme segmentation → rhyme recognition → syllable awareness',
    ],
    correct: 1,
    explanation: 'Phonological awareness develops from larger to smaller units: students first develop rhyme awareness, then syllable awareness, then onset-rime skills, and finally phoneme manipulation.',
  },

  // ── Subarea II: Phonics, Spelling, and Word Study (Q6–10) ──
  {
    id: 6, subarea: 2, subareaName: 'Phonics, Spelling, and Word Study Skills',
    text: 'A student reads "make" as "mak." This error most likely indicates a weakness in:',
    choices: ['Consonant digraph knowledge', 'CVCe (silent-e) pattern recognition', 'Consonant blend decoding', 'Short vowel discrimination'],
    correct: 1,
    explanation: '"Make" follows the CVCe pattern where the final silent-e signals a long vowel. The student read it as a short-vowel CVC word, indicating they have not internalized this pattern.',
  },
  {
    id: 7, subarea: 2, subareaName: 'Phonics, Spelling, and Word Study Skills',
    text: 'Which of the following is an example of an inflectional morpheme?',
    choices: ['-tion in "nation"', 'un- in "unhappy"', '-s in "cats"', '-er in "teacher" (meaning one who teaches)'],
    correct: 2,
    explanation: 'Inflectional morphemes change the grammatical form of a word without changing its meaning or part of speech. The plural -s in "cats" is inflectional; the others are derivational.',
  },
  {
    id: 8, subarea: 2, subareaName: 'Phonics, Spelling, and Word Study Skills',
    text: 'A teacher introduces the word "unhappy" by analyzing its morphemes. Which analysis is correct?',
    choices: [
      'un- (prefix meaning again) + happy (root word)',
      'un- (prefix meaning not) + happy (root word)',
      'un- (root word) + -happy (suffix)',
      'unhap- (root word) + -py (suffix)',
    ],
    correct: 1,
    explanation: 'The prefix un- means "not." Combined with the root word "happy," it creates the meaning "not happy." Morphological awareness directly supports both vocabulary and spelling development.',
  },
  {
    id: 9, subarea: 2, subareaName: 'Phonics, Spelling, and Word Study Skills',
    text: 'A student spells "night" as "nit." This spelling most likely indicates the student:',
    choices: [
      'Has mastered long vowel patterns',
      'Has not yet learned vowel team and silent letter patterns',
      'Is in the Derivational Relations spelling stage',
      'Understands the CVCe spelling pattern',
    ],
    correct: 1,
    explanation: 'The student is spelling phonetically (representing sounds heard) but has not yet learned the igh vowel pattern. This is characteristic of the Phonetic/Letter Name spelling stage.',
  },
  {
    id: 10, subarea: 2, subareaName: 'Phonics, Spelling, and Word Study Skills',
    text: 'Which sequence best represents the correct developmental order of spelling stages?',
    choices: [
      'Phonetic → Transitional → Within Word Pattern → Derivational Relations',
      'Semiphonetic → Phonetic → Within Word Pattern → Derivational Relations',
      'Within Word Pattern → Transitional → Phonetic → Derivational Relations',
      'Derivational Relations → Within Word Pattern → Phonetic → Semiphonetic',
    ],
    correct: 1,
    explanation: 'Spelling development moves from Preliterate → Semiphonetic → Phonetic (Letter Name) → Within Word Pattern → Syllables & Affixes → Derivational Relations, reflecting increasing orthographic knowledge.',
  },

  // ── Subarea III: Fluency (Q11–13) ──
  {
    id: 11, subarea: 3, subareaName: 'Fluency',
    text: 'A second-grade student reads quickly and accurately but uses no expression or phrasing. Which component of reading fluency is most in need of development?',
    choices: ['Accuracy', 'Rate', 'Automaticity', 'Prosody'],
    correct: 3,
    explanation: 'Prosody refers to reading with appropriate expression, intonation, and phrasing. Reading accurately and quickly without prosody suggests the student has not yet internalized text meaning as they read.',
  },
  {
    id: 12, subarea: 3, subareaName: 'Fluency',
    text: 'Which of the following is the most effective, evidence-based strategy for building oral reading fluency?',
    choices: [
      'Silent sustained reading of self-selected books',
      'Repeated oral reading with corrective feedback',
      'Vocabulary worksheet completion before reading',
      'Round-robin reading in small groups',
    ],
    correct: 1,
    explanation: 'Repeated reading — rereading the same passage with teacher feedback — is one of the most research-supported fluency strategies. Silent reading alone does not provide the corrective feedback needed to build accurate, fluent reading.',
  },
  {
    id: 13, subarea: 3, subareaName: 'Fluency',
    text: 'A third-grade student reads 68 words per minute with 94% accuracy. Based on research-based oral reading fluency norms, this student\'s reading is best described as:',
    choices: ['Well above grade level', 'At grade level', 'Below grade level', 'Unable to determine without more information'],
    correct: 2,
    explanation: 'Research-based ORF norms for grade 3 mid-year suggest approximately 90–107 wpm for proficiency. At 68 wpm, this student is below the expected range and would benefit from targeted fluency intervention.',
  },

  // ── Subarea IV: Vocabulary, Comprehension, and Writing (Q14–25) ──
  {
    id: 14, subarea: 4, subareaName: 'Vocabulary, Reading Comprehension, and Reading-Writing Connections',
    text: 'Which type of vocabulary instruction has the strongest evidence base for improving reading comprehension?',
    choices: [
      'Having students look up and copy dictionary definitions',
      'Direct instruction of high-frequency Tier 1 words',
      'Rich, explicit instruction of Tier 2 academic vocabulary words',
      'Asking students to use context clues independently and guess meaning',
    ],
    correct: 2,
    explanation: 'Tier 2 words (e.g., "analyze," "significant") are high-utility academic words that appear across subject areas and are rarely learned through everyday conversation. Explicit, rich instruction in these words most directly benefits comprehension.',
  },
  {
    id: 15, subarea: 4, subareaName: 'Vocabulary, Reading Comprehension, and Reading-Writing Connections',
    text: 'Which of the following best describes a Tier 2 vocabulary word?',
    choices: [
      'Basic words that most students learn through everyday oral language (e.g., "run," "happy")',
      'High-utility academic words that appear across multiple subject areas (e.g., "analyze," "factor")',
      'Domain-specific technical words used in a particular field (e.g., "photosynthesis," "integer")',
      'High-frequency sight words that do not follow phonics patterns (e.g., "they," "said")',
    ],
    correct: 1,
    explanation: 'Beck, McKeown, and Kucan\'s three-tier model classifies Tier 2 words as sophisticated, academic words used across disciplines. These are the highest-leverage words to teach because they appear often in text but are rarely encountered in conversation.',
  },
  {
    id: 16, subarea: 4, subareaName: 'Vocabulary, Reading Comprehension, and Reading-Writing Connections',
    text: 'A teacher asks students to predict what will happen next in a story, then read on to confirm or revise their predictions. This strategy primarily develops which aspect of reading comprehension?',
    choices: [
      'Literal recall of story details',
      'Active comprehension monitoring',
      'Understanding of narrative text structure',
      'Vocabulary knowledge',
    ],
    correct: 1,
    explanation: 'Predict-and-confirm is a metacognitive strategy that teaches students to actively monitor their understanding as they read, checking whether their predictions were accurate and adjusting their thinking accordingly.',
  },
  {
    id: 17, subarea: 4, subareaName: 'Vocabulary, Reading Comprehension, and Reading-Writing Connections',
    text: 'A student reads an informational text about ecosystems accurately but is unable to summarize the main idea. This most likely indicates difficulty with:',
    choices: [
      'Decoding multisyllabic words',
      'Reading fluency and rate',
      'Comprehension monitoring and understanding of text structure',
      'Phonemic awareness',
    ],
    correct: 2,
    explanation: 'The student can decode (reads accurately) but struggles to construct meaning — specifically to identify the central idea and how details support it. This points to a comprehension and text structure challenge, not a decoding one.',
  },
  {
    id: 18, subarea: 4, subareaName: 'Vocabulary, Reading Comprehension, and Reading-Writing Connections',
    text: 'A passage describes how a prolonged drought causes crop failures, which then leads to food shortages in a region. Which text structure is being used?',
    choices: ['Comparison-contrast', 'Problem-solution', 'Cause-and-effect', 'Chronological sequence'],
    correct: 2,
    explanation: 'The passage shows a chain of causation — drought causes crop failure, which causes food shortage. Signal words like "causes," "leads to," and "as a result" typically signal cause-and-effect text structure.',
  },
  {
    id: 19, subarea: 4, subareaName: 'Vocabulary, Reading Comprehension, and Reading-Writing Connections',
    text: 'A teacher wants to assess students\' ability to make inferences while reading. Which question best targets this skill?',
    choices: [
      '"What happened at the beginning of the story?"',
      '"What do you think the character was feeling, based on her actions in this scene?"',
      '"What word does the author use to describe the setting?"',
      '"How many characters appear in the passage?"',
    ],
    correct: 1,
    explanation: 'Making inferences requires students to combine text evidence with their own reasoning to draw conclusions not explicitly stated. Questions about character motivation or emotion based on actions are classic inference tasks.',
  },
  {
    id: 20, subarea: 4, subareaName: 'Vocabulary, Reading Comprehension, and Reading-Writing Connections',
    text: 'A student decodes "they" as "the." This error most likely indicates difficulty with:',
    choices: ['Phonemic awareness', 'Sight word recognition', 'Phonics decoding patterns', 'Reading rate'],
    correct: 1,
    explanation: '"They" is a high-frequency sight word that does not follow regular phonics patterns. Students must memorize it as a whole word. Misreading it as "the" suggests insufficient practice with this irregular word.',
  },
  {
    id: 21, subarea: 4, subareaName: 'Vocabulary, Reading Comprehension, and Reading-Writing Connections',
    text: 'A student uses the surrounding words and sentences to determine the meaning of an unfamiliar word. Which strategy is the student demonstrating?',
    choices: ['Morphological analysis', 'Syntactic analysis', 'Use of context clues', 'Phonological recoding'],
    correct: 2,
    explanation: 'Using context clues means drawing on the surrounding text to infer word meaning. It is a valuable comprehension strategy, though research suggests it works best in combination with direct vocabulary instruction.',
  },
  {
    id: 22, subarea: 4, subareaName: 'Vocabulary, Reading Comprehension, and Reading-Writing Connections',
    text: 'According to the Simple View of Reading, reading comprehension is best described as:',
    choices: [
      'Phonemic awareness × phonics ability',
      'Fluency × background knowledge',
      'Decoding ability × language comprehension',
      'Vocabulary knowledge × reading motivation',
    ],
    correct: 2,
    explanation: 'Gough and Tunmer\'s Simple View of Reading (1986) proposes that Reading Comprehension = Decoding × Language Comprehension. Both components are necessary; weakness in either limits overall reading.',
  },
  {
    id: 23, subarea: 4, subareaName: 'Vocabulary, Reading Comprehension, and Reading-Writing Connections',
    text: 'A first-grade teacher reads aloud from a picture book and stops to think aloud about how she pictures the scene in her mind as she reads. Which comprehension strategy is she modeling?',
    choices: ['Summarizing', 'Questioning', 'Making connections', 'Creating mental images'],
    correct: 3,
    explanation: 'Visualizing — forming mental images while reading — deepens comprehension by helping readers engage more actively with the text. Think-alouds are an effective way to make this invisible strategy visible to students.',
  },
  {
    id: 24, subarea: 4, subareaName: 'Vocabulary, Reading Comprehension, and Reading-Writing Connections',
    text: 'A teacher evaluates a student\'s essay to determine whether the central argument is clear and well-supported with relevant evidence. Which writing trait is being assessed?',
    choices: ['Voice', 'Organization', 'Ideas and content', 'Word choice'],
    correct: 2,
    explanation: 'The Ideas and Content trait (in the 6+1 Traits model) evaluates the clarity and development of the central message, thesis, or argument and the quality of supporting details — exactly what the teacher is assessing here.',
  },
  {
    id: 25, subarea: 4, subareaName: 'Vocabulary, Reading Comprehension, and Reading-Writing Connections',
    text: 'A teacher uses a Frayer Model to introduce new vocabulary. This graphic organizer builds word knowledge by asking students to define the word, identify essential characteristics, provide examples, and:',
    choices: [
      'Use the word in a simple sentence',
      'Look up the etymology of the word',
      'Identify non-examples of the word',
      'Practice spelling with Look-Say-Cover-Write-Check',
    ],
    correct: 2,
    explanation: 'The Frayer Model has four quadrants: Definition, Characteristics, Examples, and Non-examples. Non-examples are particularly powerful because they sharpen students\' conceptual understanding of what the word does NOT mean.',
  },
]

// ── CR Prompt ─────────────────────────────────────────────────────────────────
const CR_PROMPT = `STUDENT SCENARIO

Student: Marcus | Grade: 2

Running Record (from "The River Path," Guided Reading Level I — 108 words)
• Accuracy: 95% (5 errors)
• Self-corrections: 1
• Rate: 74 words per minute (grade-level benchmark: 90 wpm)
• Error pattern: Substituted meaning-based words ("dad" for "father," "big" for "large")
• Prosody: Monotone; did not pause at commas or sentence-ending punctuation

Comprehension Questions (after independent reading)
• Literal: "What did Marcus and his father bring on the trip?" — Answered correctly.
• Inferential: "Why do you think Marcus's father smiled at the end?" — Marcus said, "Because he was happy." Could not elaborate or cite text evidence.
• Text structure: "How did the author organize this story?" — No response.

Teacher Observation
Marcus rarely self-corrects when meaning breaks down. During partner reading, he does not revisit confusing sentences. He decodes most words correctly but reads in a flat, word-by-word manner.

ASSIGNMENT
Using the information above:
1. Identify ONE specific reading strength evident in the data.
2. Identify ONE reading need that is most significantly affecting Marcus's comprehension.
3. Describe ONE specific, evidence-based instructional strategy to address that need.
4. Explain why that strategy would be effective for a student with Marcus's profile, referencing specific evidence from the scenario.`

// ── Subarea config ─────────────────────────────────────────────────────────────
const SUBAREAS = [
  { id: 1, name: 'Phonological and Phonemic Awareness', abbr: 'Subarea I' },
  { id: 2, name: 'Phonics, Spelling, and Word Study Skills', abbr: 'Subarea II' },
  { id: 3, name: 'Fluency', abbr: 'Subarea III' },
  { id: 4, name: 'Vocabulary, Reading Comprehension, and Reading-Writing Connections', abbr: 'Subarea IV' },
]

function getLevel(pct: number): { label: string; color: string; bg: string } {
  if (pct >= 75) return { label: 'Most objectives', color: '#166534', bg: '#f0fdf4' }
  if (pct >= 50) return { label: 'Many objectives', color: '#1e40af', bg: '#eff6ff' }
  if (pct >= 25) return { label: 'Some objectives', color: '#92400e', bg: '#fffbeb' }
  return { label: 'Few objectives', color: '#991b1b', bg: '#fef2f2' }
}

function calcScaledScore(mcCorrect: number, crScore: number): number {
  const mcPct = mcCorrect / QUESTIONS.length
  const crPct = (crScore - 1) / 3
  const combined = mcPct * 0.8 + crPct * 0.2
  return Math.max(100, Math.min(300, Math.round(100 + combined * 200)))
}

function fmtTime(s: number): string {
  const m = Math.floor(s / 60)
  const sec = s % 60
  return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`
}

interface CRResult {
  score: number
  performanceLevel: string
  feedback: string
  strengths: string[]
  improvements: string[]
}

const CR_COLORS: Record<string, string> = {
  Thorough: '#166534',
  Adequate: '#1e40af',
  Limited: '#92400e',
  Weak: '#991b1b',
}

// ── Main component ────────────────────────────────────────────────────────────
export default function FreeDiagnosticPage() {
  const [phase, setPhase] = useState<Phase>('intro')
  const [currentQ, setCurrentQ] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeLeft, setTimeLeft] = useState(60 * 60)
  const [crResponse, setCrResponse] = useState('')
  const [crResult, setCrResult] = useState<CRResult | null>(null)
  const [gradingError, setGradingError] = useState('')
  const [showReview, setShowReview] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Timer runs only during MC test phase
  useEffect(() => {
    if (phase !== 'test') return
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!)
          setPhase('cr')
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [phase])

  function startTest() {
    setPhase('test')
  }

  function handleAnswer(qId: number, choiceIdx: number) {
    setAnswers((prev) => ({ ...prev, [qId]: choiceIdx }))
  }

  function handleFinishMC() {
    const unanswered = QUESTIONS.length - Object.keys(answers).length
    if (unanswered > 0 && !confirm(`You have ${unanswered} unanswered question${unanswered > 1 ? 's' : ''}. Submit MC section anyway?`)) return
    if (timerRef.current) clearInterval(timerRef.current)
    setPhase('cr')
  }

  async function handleSubmitDiagnostic() {
    const wordCount = crResponse.trim().split(/\s+/).filter(Boolean).length
    if (wordCount < 50) {
      setGradingError('Please write at least 50 words before submitting.')
      return
    }
    setGradingError('')
    setPhase('grading')

    try {
      const res = await fetch('/api/free/grade-cr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: CR_PROMPT, response: crResponse }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Grading failed')
      setCrResult(data)
      setPhase('results')
    } catch (err) {
      setGradingError(err instanceof Error ? err.message : 'Grading failed. Please try again.')
      setPhase('cr')
    }
  }

  const q = QUESTIONS[currentQ]
  const answeredCount = Object.keys(answers).length
  const urgent = timeLeft < 300

  // ── Intro ──────────────────────────────────────────────────────────────────
  if (phase === 'intro') {
    return (
      <>
        <SiteHeader />
        <main className="min-h-screen bg-[#faf8f5]">
          <div className="border-b border-[#e8e0e2] bg-white px-6 py-3 text-center">
            <p className="text-sm text-[#6b6b6b]" style={SF}>
              Free diagnostic test — 25 questions + 1 written response.{' '}
              <a href="/#pricing" className="font-semibold text-[#7c1c2e] hover:underline">Get the full FoRT prep here →</a>
            </p>
          </div>

          <div className="mx-auto max-w-2xl px-6 py-14">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e] mb-3" style={SF}>Free Diagnostic</p>
            <h1 className="text-4xl font-bold text-[#1a1a1a] leading-snug mb-4" style={SE}>
              Diagnostic Practice Test
            </h1>
            <p className="text-base text-[#5a5a5a] leading-relaxed mb-10" style={SF}>
              This diagnostic practice test is designed to help you understand your current readiness to pass the NES Foundations of Reading exam (190 &amp; 890). You&apos;ll receive a detailed breakdown by subarea so you know exactly where to focus your studying.
            </p>

            {/* About the test */}
            <div className="rounded-xl border border-[#e8e0e2] bg-white p-7 mb-6">
              <h2 className="text-lg font-bold text-[#1a1a1a] mb-4" style={SE}>About This Test</h2>
              <div className="grid grid-cols-2 gap-4 mb-5">
                {[
                  { label: 'Questions', value: '25 Multiple Choice' },
                  { label: 'Written Response', value: '1 Constructed Response' },
                  { label: 'Time Allowed', value: '60 Minutes' },
                  { label: 'Subareas', value: 'All 4 covered' },
                ].map((item) => (
                  <div key={item.label} className="rounded-lg bg-[#faf8f5] px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b9b9b]" style={SF}>{item.label}</p>
                    <p className="mt-1 text-sm font-semibold text-[#1a1a1a]" style={SF}>{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2 text-sm text-[#5a5a5a] leading-relaxed" style={SF}>
                <p>The multiple-choice section covers all four NES subareas: Phonological and Phonemic Awareness, Phonics and Word Study, Fluency, and Vocabulary and Reading Comprehension.</p>
                <p>After completing the MC section, you will write a short response to a student scenario — the same format as the written response item on the real exam, scored 1–4.</p>
                <p>Your results will appear on a 100–300 scale mirroring the real NES score report, with a breakdown of performance by subarea.</p>
              </div>
            </div>

            {/* Instructions */}
            <div className="rounded-xl border border-[#e8e0e2] bg-white p-7 mb-8">
              <h2 className="text-lg font-bold text-[#1a1a1a] mb-4" style={SE}>Before You Begin</h2>
              <ul className="space-y-3">
                {[
                  'Set aside 60 minutes of uninterrupted time. A countdown timer will be shown during the MC section.',
                  'Answer every question — there is no penalty for guessing. Unanswered questions count as wrong.',
                  'After the MC section you will see a student scenario. Read it carefully and write a thorough response of at least 150 words.',
                  'Work independently and honestly. The more accurately you perform, the more useful your diagnostic results will be.',
                  'Your results are not saved to any account — they appear immediately on screen when you finish.',
                ].map((tip, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#3a3a3a]" style={SF}>
                    <span className="flex-shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#f9f0f2] text-[10px] font-bold text-[#7c1c2e]">{i + 1}</span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={startTest}
              className="w-full rounded-lg bg-[#7c1c2e] py-4 text-base font-bold text-white hover:bg-[#5a1220] transition-colors"
              style={SF}
            >
              Start Diagnostic Test →
            </button>
            <p className="mt-3 text-center text-xs text-[#9b9b9b]" style={SF}>No login required. Free.</p>
          </div>
        </main>
        <SiteFooter />
      </>
    )
  }

  // ── MC Test ────────────────────────────────────────────────────────────────
  if (phase === 'test') {
    const pct = ((currentQ) / QUESTIONS.length) * 100

    return (
      <div className="flex min-h-screen flex-col bg-[#faf8f5]">
        {/* Top bar */}
        <div className="flex-shrink-0 bg-[#7c1c2e] px-5 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <p className="text-sm font-bold text-white" style={SF}>Diagnostic Test</p>
            <span className="text-[#a04060] text-sm">|</span>
            <p className="text-sm text-[#e8b4bc]" style={SF}>Q {currentQ + 1} of {QUESTIONS.length}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xs text-[#e8b4bc]" style={SF}>{answeredCount} answered</p>
            <div className={`font-bold tabular-nums text-base ${urgent ? 'text-yellow-300' : 'text-white'}`} style={SF}>
              {fmtTime(timeLeft)}
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="flex-shrink-0 h-1 bg-[#5a1220]">
          <div className="h-full bg-white transition-all duration-300" style={{ width: `${pct}%` }} />
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Question area */}
          <div className="flex-1 overflow-y-auto p-6 lg:p-10">
            <div className="mx-auto max-w-2xl">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e] mb-3" style={SF}>
                {SUBAREAS.find(s => s.id === q.subarea)?.abbr} — {q.subareaName}
              </p>
              <p className="text-lg font-semibold text-[#1a1a1a] leading-relaxed mb-7" style={SE}>
                {q.text}
              </p>
              <div className="space-y-3">
                {q.choices.map((choice, ci) => {
                  const selected = answers[q.id] === ci
                  return (
                    <button
                      key={ci}
                      onClick={() => handleAnswer(q.id, ci)}
                      className={`w-full rounded-lg border-2 px-5 py-3.5 text-left text-sm transition-colors ${
                        selected
                          ? 'border-[#7c1c2e] bg-[#f9f0f2] font-semibold text-[#7c1c2e]'
                          : 'border-[#e8e0e2] bg-white text-[#1a1a1a] hover:border-[#7c1c2e]'
                      }`}
                      style={SF}
                    >
                      <span className="font-bold mr-3">{String.fromCharCode(65 + ci)}.</span>{choice}
                    </button>
                  )
                })}
              </div>

              {/* Nav */}
              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentQ((i) => Math.max(0, i - 1))}
                  disabled={currentQ === 0}
                  className="rounded border border-[#e8e0e2] bg-white px-6 py-2.5 text-sm font-semibold text-[#6b6b6b] disabled:opacity-40 hover:border-[#7c1c2e]"
                  style={SF}
                >
                  ← Previous
                </button>
                {currentQ < QUESTIONS.length - 1 ? (
                  <button
                    onClick={() => setCurrentQ((i) => i + 1)}
                    className="rounded bg-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220]"
                    style={SF}
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    onClick={handleFinishMC}
                    className="rounded bg-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220]"
                    style={SF}
                  >
                    Continue to Written Response →
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Question palette */}
          <div className="hidden lg:block w-44 flex-shrink-0 border-l border-[#e8e0e2] bg-white overflow-y-auto p-4">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-[#9b9b9b]" style={SF}>
              {answeredCount}/{QUESTIONS.length}
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {QUESTIONS.map((qItem, i) => (
                <button
                  key={qItem.id}
                  onClick={() => setCurrentQ(i)}
                  className={`flex h-8 w-8 items-center justify-center rounded text-xs font-semibold transition-colors ${
                    i === currentQ
                      ? 'bg-[#7c1c2e] text-white'
                      : answers[qItem.id] !== undefined
                      ? 'bg-[#f9f0f2] text-[#7c1c2e] border border-[#7c1c2e]'
                      : 'bg-[#f5f5f5] text-[#6b6b6b]'
                  }`}
                  style={SF}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button
              onClick={handleFinishMC}
              className="mt-5 w-full rounded bg-[#7c1c2e] py-2 text-xs font-bold text-white hover:bg-[#5a1220]"
              style={SF}
            >
              Finish MC →
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── CR Phase ───────────────────────────────────────────────────────────────
  if (phase === 'cr') {
    const wordCount = crResponse.trim().split(/\s+/).filter(Boolean).length

    return (
      <div className="min-h-screen bg-[#faf8f5]">
        <div className="flex-shrink-0 bg-[#7c1c2e] px-6 py-3.5 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-white" style={SF}>Written Response</p>
            <p className="text-[11px] text-[#e8b4bc]" style={SF}>Multiple choice complete — now write your response</p>
          </div>
          <span className="rounded bg-[#5a1220] px-3 py-1 text-xs font-semibold text-[#e8b4bc]" style={SF}>
            {answeredCount}/25 MC answered
          </span>
        </div>

        <div className="mx-auto max-w-3xl px-6 py-8 space-y-5">
          {/* Scenario */}
          <div className="rounded-xl border border-[#e8e0e2] bg-white overflow-hidden shadow-sm select-none">
            <div className="border-b border-[#e8e0e2] px-5 py-2.5">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e]" style={SF}>Student Scenario</p>
            </div>
            <div className="p-5">
              <pre className="whitespace-pre-wrap text-sm text-[#1a1a1a] leading-relaxed" style={SF}>{CR_PROMPT}</pre>
            </div>
          </div>

          {/* Response area */}
          <div className="rounded-xl border border-[#e8e0e2] bg-white overflow-hidden shadow-sm">
            <div className="border-b border-[#e8e0e2] px-5 py-2.5 flex items-center justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e]" style={SF}>Your Response</p>
              <span className={`text-xs font-semibold ${wordCount >= 150 ? 'text-green-700' : 'text-[#9b9b9b]'}`} style={SF}>
                {wordCount} words {wordCount >= 150 ? '✓' : '(aim for 150–300)'}
              </span>
            </div>
            <div className="p-5">
              <textarea
                value={crResponse}
                onChange={(e) => setCrResponse(e.target.value)}
                placeholder="Write your response here. Address all four parts of the assignment."
                className="w-full rounded-lg border border-[#e8e0e2] p-4 text-sm text-[#1a1a1a] outline-none focus:border-[#7c1c2e] focus:ring-1 focus:ring-[#7c1c2e]"
                style={{ ...SF, minHeight: '280px', resize: 'vertical' }}
              />
            </div>
          </div>

          {gradingError && (
            <p className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700" style={SF}>{gradingError}</p>
          )}

          <button
            onClick={handleSubmitDiagnostic}
            disabled={wordCount < 50}
            className="w-full rounded-lg bg-[#7c1c2e] py-4 text-sm font-bold text-white hover:bg-[#5a1220] transition-colors disabled:opacity-40"
            style={SF}
          >
            {wordCount < 50 ? `Write at least 50 words to submit (${wordCount} words)` : 'Submit Diagnostic & See Results →'}
          </button>
        </div>
      </div>
    )
  }

  // ── Grading ────────────────────────────────────────────────────────────────
  if (phase === 'grading') {
    return (
      <div className="min-h-screen bg-[#faf8f5] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#e8e0e2] border-t-[#7c1c2e] mb-5" />
          <p className="text-base font-semibold text-[#1a1a1a]" style={SE}>One moment as we grade your FoRT diagnostic test…</p>
        </div>
      </div>
    )
  }

  // ── Results ────────────────────────────────────────────────────────────────
  if (phase === 'results' && crResult) {
    const mcCorrect = QUESTIONS.filter((qq) => answers[qq.id] === qq.correct).length
    const scaledScore = calcScaledScore(mcCorrect, crResult.score)
    const passed = scaledScore >= 220

    const subareaResults = SUBAREAS.map((sa) => {
      const qs = QUESTIONS.filter((qq) => qq.subarea === sa.id)
      const correct = qs.filter((qq) => answers[qq.id] === qq.correct).length
      const pct = Math.round((correct / qs.length) * 100)
      return { ...sa, total: qs.length, correct, pct, level: getLevel(pct) }
    })

    const crColor = CR_COLORS[crResult.performanceLevel] || '#6b6b6b'

    return (
      <>
        <SiteHeader />
        <main className="min-h-screen bg-[#faf8f5]">
          <div className="border-b border-[#e8e0e2] bg-white px-6 py-3 text-center">
            <p className="text-sm text-[#6b6b6b]" style={SF}>
              Ready to start your full prep?{' '}
              <a href="/#pricing" className="font-semibold text-[#7c1c2e] hover:underline">Get the full FoRT prep here →</a>
            </p>
          </div>

          <div className="mx-auto max-w-3xl px-6 py-10 space-y-6">

            {/* Score header */}
            <div className={`rounded-xl p-8 text-center ${passed ? 'bg-green-50 border border-green-200' : 'bg-[#faf8f5] border border-[#e8e0e2]'}`}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e] mb-2" style={SF}>
                NES Foundations of Reading — Diagnostic Results
              </p>
              <p className="text-7xl font-bold mb-3" style={{ ...SE, color: passed ? '#166534' : '#7c1c2e' }}>
                {scaledScore}
              </p>
              <p className="text-sm text-[#6b6b6b] mb-3" style={SF}>Score range: 100–300 &nbsp;·&nbsp; Passing: 220</p>
              <span className={`inline-block rounded px-4 py-1.5 text-sm font-bold ${passed ? 'bg-green-600 text-white' : 'bg-[#7c1c2e] text-white'}`} style={SF}>
                {passed ? 'PASSED' : 'NOT YET — KEEP STUDYING'}
              </span>
              <div className="mt-5 flex justify-center gap-8 text-sm" style={SF}>
                <div className="text-center">
                  <p className="text-[#9b9b9b] text-xs uppercase tracking-widest">MC Correct</p>
                  <p className="font-bold text-[#1a1a1a] text-lg">{mcCorrect} / {QUESTIONS.length}</p>
                </div>
                <div className="text-center">
                  <p className="text-[#9b9b9b] text-xs uppercase tracking-widest">Written Response</p>
                  <p className="font-bold text-lg" style={{ color: crColor }}>{crResult.score} / 4 — {crResult.performanceLevel}</p>
                </div>
              </div>
            </div>

            {/* Subarea performance */}
            <div className="rounded-xl border border-[#e8e0e2] bg-white overflow-hidden">
              <div className="border-b border-[#e8e0e2] px-6 py-3">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e]" style={SF}>Performance by Objective Area</p>
              </div>
              <div className="divide-y divide-[#e8e0e2]">
                {subareaResults.map((sa) => (
                  <div key={sa.id} className="px-6 py-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-[#9b9b9b]" style={SF}>{sa.abbr}</p>
                        <p className="text-sm font-semibold text-[#1a1a1a]" style={SF}>{sa.name}</p>
                      </div>
                      <div className="text-right flex-shrink-0 ml-4">
                        <p className="text-sm font-bold" style={{ ...SF, color: sa.level.color }}>{sa.correct}/{sa.total}</p>
                        <p className="text-xs font-semibold" style={{ ...SF, color: sa.level.color }}>{sa.level.label}</p>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-[#f0ece8]">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${sa.pct}%`, background: sa.level.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Written response result */}
            <div className="rounded-xl border border-[#e8e0e2] bg-white overflow-hidden">
              <div className="border-b border-[#e8e0e2] px-6 py-3 flex items-center justify-between">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e]" style={SF}>Written Response</p>
                <span className="text-sm font-bold" style={{ ...SF, color: crColor }}>
                  {crResult.score}/4 — {crResult.performanceLevel}
                </span>
              </div>
              <div className="px-6 py-5 space-y-4">
                <p className="text-sm text-[#1a1a1a] leading-relaxed" style={SF}>{crResult.feedback}</p>

                {crResult.strengths.length > 0 && (
                  <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-green-800 mb-2" style={SF}>Strengths</p>
                    <ul className="space-y-1.5">
                      {crResult.strengths.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-green-900" style={SF}>
                          <span className="mt-0.5 text-green-600">✓</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {crResult.improvements.length > 0 && (
                  <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-amber-800 mb-2" style={SF}>Areas to Strengthen</p>
                    <ul className="space-y-1.5">
                      {crResult.improvements.map((s, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-amber-900" style={SF}>
                          <span className="mt-0.5">→</span>{s}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Question review */}
            <div className="rounded-xl border border-[#e8e0e2] bg-white overflow-hidden">
              <button
                onClick={() => setShowReview((v) => !v)}
                className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#faf8f5] transition-colors"
              >
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#7c1c2e]" style={SF}>Review MC Questions</p>
                <span className="text-sm text-[#6b6b6b]" style={SF}>{showReview ? '▲ Hide' : '▼ Show'}</span>
              </button>
              {showReview && (
                <div className="border-t border-[#e8e0e2] divide-y divide-[#e8e0e2]">
                  {QUESTIONS.map((qq, i) => {
                    const chosen = answers[qq.id]
                    const correct = chosen === qq.correct
                    return (
                      <div key={qq.id} className="px-6 py-5">
                        <div className="flex items-start gap-3 mb-3">
                          <span className={`flex-shrink-0 mt-0.5 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white ${correct ? 'bg-green-500' : 'bg-red-500'}`}>
                            {correct ? '✓' : '✗'}
                          </span>
                          <p className="text-sm font-semibold text-[#1a1a1a]" style={SF}>{i + 1}. {qq.text}</p>
                        </div>
                        <div className="space-y-1 ml-8">
                          {qq.choices.map((c, ci) => {
                            let cls = 'rounded px-3 py-1.5 text-xs'
                            if (ci === qq.correct) cls += ' bg-green-100 text-green-800 font-semibold'
                            else if (ci === chosen && !correct) cls += ' bg-red-100 text-red-700'
                            else cls += ' text-[#6b6b6b]'
                            return <p key={ci} className={cls} style={SF}>{String.fromCharCode(65 + ci)}. {c}</p>
                          })}
                        </div>
                        <div className="ml-8 mt-2 rounded bg-[#f9f0f2] px-3 py-2">
                          <p className="text-xs text-[#7c1c2e]" style={SF}><strong>Explanation:</strong> {qq.explanation}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* CTA */}
            <div className="rounded-xl border-2 border-[#7c1c2e] bg-white p-8 text-center">
              <p className="text-2xl font-bold text-[#1a1a1a] mb-2" style={SE}>
                {passed ? 'Great start — now prep to make it official.' : 'You know where to focus. Now put in the work.'}
              </p>
              <p className="text-sm text-[#6b6b6b] mb-6 max-w-lg mx-auto" style={SF}>
                The full prep includes a complete study guide across all 4 subareas, 4 timed practice tests on the real 100–300 scale, 8 AI-graded written responses, and flashcards — everything in one place.
              </p>
              <a
                href="/#pricing"
                className="inline-block rounded-lg bg-[#7c1c2e] px-10 py-4 text-base font-bold text-white hover:bg-[#5a1220] transition-colors"
                style={SF}
              >
                Get the full FoRT prep here →
              </a>
              <p className="mt-3 text-xs text-[#9b9b9b]" style={SF}>Instant access. No subscription.</p>
            </div>

          </div>
        </main>
        <SiteFooter />
      </>
    )
  }

  return null
}
