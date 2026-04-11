// ─── Types ───────────────────────────────────────────────────────────────────

export interface ClassifyItem {
  id: string
  primary: string
  secondary?: string
  correct: 'A' | 'B'
}

export interface ClassifyTwoExercise {
  type: 'classify-two'
  id: string
  title: string
  instruction: string
  categoryA: string
  categoryB: string
  items: ClassifyItem[]
}

export interface OrderItem {
  id: string
  label: string
  correctIndex: number
}

export interface OrderSequenceExercise {
  type: 'order-sequence'
  id: string
  title: string
  instruction: string
  directionLabel: string
  items: OrderItem[]
}

export interface MatchPair {
  id: string
  term: string
  definition: string
}

export interface WordBankMatchExercise {
  type: 'word-bank-match'
  id: string
  title: string
  instruction: string
  pairs: MatchPair[]
}

export interface StrategyPair {
  id: string
  left: string
  right: string
}

export interface StrategyMatchExercise {
  type: 'strategy-match'
  id: string
  title: string
  instruction: string
  leftLabel: string
  rightLabel: string
  pairs: StrategyPair[]
}

export type WorkbookExercise =
  | ClassifyTwoExercise
  | OrderSequenceExercise
  | WordBankMatchExercise
  | StrategyMatchExercise

export interface WorkbookObjective {
  id: string
  objectiveNum: number
  title: string
  exercises: WorkbookExercise[]
}

export interface WorkbookSubarea {
  id: 'I' | 'II' | 'III'
  name: string
  weight: string
  objectives: WorkbookObjective[]
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const workbook190: WorkbookSubarea[] = [

  // ══════════════════════════════════════════════════════════════════════════
  // SUBAREA I — Foundations of Reading Development
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'I',
    name: 'Foundations of Reading Development',
    weight: '35%',
    objectives: [

      // ── Objective 1 ──────────────────────────────────────────────────────
      {
        id: 'i-obj1',
        objectiveNum: 1,
        title: 'Phonological & Phonemic Awareness, Concepts of Print, and the Alphabetic Principle',
        exercises: [

          // Exercise 1: Classify Phonological vs. Phonemic Awareness
          {
            type: 'classify-two',
            id: 'i1-e1',
            title: 'Classify: Phonological vs. Phonemic Awareness',
            instruction: 'Select an item from the bank, then click the category where it belongs. Items and tasks are mixed — classify each correctly.',
            categoryA: 'Phonological Awareness',
            categoryB: 'Phonemic Awareness',
            items: [
              {
                id: 'i1e1-1',
                primary: 'Broad awareness that oral language is made up of smaller units such as words, syllables, and onset-rimes',
                correct: 'A',
              },
              {
                id: 'i1e1-2',
                primary: 'Working with individual phonemes — the smallest units of sound — in spoken words',
                correct: 'B',
              },
              {
                id: 'i1e1-3',
                primary: 'Task: "Clap the syllables in \'butterfly.\' How many are there?"',
                correct: 'A',
              },
              {
                id: 'i1e1-4',
                primary: 'Task: "What sound does the word \'dog\' start with?"',
                correct: 'B',
              },
              {
                id: 'i1e1-5',
                primary: 'Task: "Tell me two words that rhyme with \'cat.\'"',
                correct: 'A',
              },
              {
                id: 'i1e1-6',
                primary: 'Task: "Blend these sounds together: /m/ /æ/ /p/. What word is that?"',
                correct: 'B',
              },
            ],
          },

          // Exercise 2: Order PA Continuum
          {
            type: 'order-sequence',
            id: 'i1-e2',
            title: 'Order: Phonological Awareness Continuum',
            instruction: 'Click to select a term, then click another slot to swap. Arrange all four levels from easiest (left) to hardest (right).',
            directionLabel: 'Easiest → Hardest',
            items: [
              { id: 'i1e2-1', label: 'Word awareness', correctIndex: 0 },
              { id: 'i1e2-2', label: 'Syllable awareness', correctIndex: 1 },
              { id: 'i1e2-3', label: 'Onset-rime awareness', correctIndex: 2 },
              { id: 'i1e2-4', label: 'Phoneme awareness', correctIndex: 3 },
            ],
          },

          // Exercise 3: Order PA Skills
          {
            type: 'order-sequence',
            id: 'i1-e3',
            title: 'Order: Phonemic Awareness Skills',
            instruction: 'Arrange all six phonemic awareness skills from easiest (left) to most complex (right).',
            directionLabel: 'Easiest → Most Complex',
            items: [
              { id: 'i1e3-1', label: 'Phoneme identification', correctIndex: 0 },
              { id: 'i1e3-2', label: 'Phoneme blending', correctIndex: 1 },
              { id: 'i1e3-3', label: 'Phoneme segmentation', correctIndex: 2 },
              { id: 'i1e3-4', label: 'Phoneme deletion', correctIndex: 3 },
              { id: 'i1e3-5', label: 'Phoneme addition', correctIndex: 4 },
              { id: 'i1e3-6', label: 'Phoneme substitution', correctIndex: 5 },
            ],
          },

          // Exercise 4: Match Concepts of Print
          {
            type: 'word-bank-match',
            id: 'i1-e4',
            title: 'Match: Concepts of Print',
            instruction: 'Click a term in the bank to select it, then click the slot next to the correct definition. Click a placed term to move it.',
            pairs: [
              {
                id: 'cop-1',
                term: 'Print carries meaning',
                definition: 'Text — not illustrations — is what carries the message and represents spoken language.',
              },
              {
                id: 'cop-2',
                term: 'Print directionality',
                definition: 'Written English moves left-to-right and top-to-bottom, with a return sweep at the end of each line.',
              },
              {
                id: 'cop-3',
                term: 'Word boundaries',
                definition: 'Spaces between letter groups signal where one spoken word ends and another begins.',
              },
              {
                id: 'cop-4',
                term: 'Letter vs. word',
                definition: 'Individual characters and groups of characters are distinct units; words are made up of letters.',
              },
              {
                id: 'cop-5',
                term: 'Book orientation',
                definition: 'Knowing the front/back of a book, identifying title and author on the cover, and that pages turn left to right.',
              },
              {
                id: 'cop-6',
                term: 'Punctuation awareness',
                definition: 'Marks such as periods, question marks, and exclamation points signal meaning at sentence boundaries.',
              },
            ],
          },

          // Exercise 5: Match Letter Knowledge & Alphabetic Principle
          {
            type: 'word-bank-match',
            id: 'i1-e5',
            title: 'Match: Letter Knowledge & the Alphabetic Principle',
            instruction: 'Match each term to its definition.',
            pairs: [
              {
                id: 'lk-1',
                term: 'Letter knowledge',
                definition: 'The ability to recognize and name uppercase and lowercase letters in isolation and within text.',
              },
              {
                id: 'lk-2',
                term: 'Alphabetic principle',
                definition: 'The understanding that letters and letter combinations systematically represent the sounds of spoken language.',
              },
              {
                id: 'lk-3',
                term: 'Letter-sound correspondence',
                definition: 'Knowing which phoneme(s) map to which grapheme(s).',
              },
            ],
          },

          // Exercise 6: Strategy Match
          {
            type: 'strategy-match',
            id: 'i1-e6',
            title: 'Match: Instructional Strategy → Reading Skill Developed',
            instruction: 'Each strategy primarily develops one reading skill. Select a skill from the bank and place it next to the correct strategy.',
            leftLabel: 'Instructional Strategy',
            rightLabel: 'Reading Skill Developed',
            pairs: [
              { id: 'sm1-1', left: 'Elkonin (Sound) Boxes', right: 'Phoneme Segmentation' },
              { id: 'sm1-2', left: 'Phoneme Blending Drills', right: 'Phoneme Blending' },
              { id: 'sm1-3', left: 'Shared Reading', right: 'Concepts of Print' },
              { id: 'sm1-4', left: 'Interactive Read-Alouds', right: 'Oral Language Development' },
              { id: 'sm1-5', left: 'Phonetic Spelling (Invented Spelling)', right: 'Letter-Sound Correspondence' },
              { id: 'sm1-6', left: 'Interactive Writing', right: 'Alphabetic Principle' },
            ],
          },
        ],
      },

      // ── Objective 2 ──────────────────────────────────────────────────────
      {
        id: 'i-obj2',
        objectiveNum: 2,
        title: 'Phonics, High-Frequency Words, and Spelling',
        exercises: [

          // Exercise 1: Order Phonics Scope & Sequence
          {
            type: 'order-sequence',
            id: 'i2-e1',
            title: 'Order: Phonics Scope & Sequence',
            instruction: 'Arrange these phonics patterns in instructional order from simplest (left) to most complex (right). This is the sequence students need to be taught.',
            directionLabel: 'Simplest → Most Complex',
            items: [
              { id: 'i2e1-1', label: 'CVC words (short vowels, single consonants)', correctIndex: 0 },
              { id: 'i2e1-2', label: 'Consonant digraphs & blends', correctIndex: 1 },
              { id: 'i2e1-3', label: 'CVCe (Magic E — long vowel)', correctIndex: 2 },
              { id: 'i2e1-4', label: 'CVVC (Vowel Teams)', correctIndex: 3 },
              { id: 'i2e1-5', label: 'R-controlled vowels', correctIndex: 4 },
              { id: 'i2e1-6', label: 'Multisyllabic words', correctIndex: 5 },
            ],
          },

          // Exercise 2: Classify Digraph vs. Blend
          {
            type: 'classify-two',
            id: 'i2-e2',
            title: 'Classify: Consonant Digraph vs. Consonant Blend',
            instruction: 'This distinction appears frequently on the exam. A digraph produces one new sound; a blend preserves each consonant\'s sound.',
            categoryA: 'Consonant Digraph\n(two letters → one sound)',
            categoryB: 'Consonant Blend\n(each letter keeps its sound)',
            items: [
              { id: 'i2e2-1', primary: 'sh', correct: 'A' },
              { id: 'i2e2-2', primary: 'bl', correct: 'B' },
              { id: 'i2e2-3', primary: 'ch', correct: 'A' },
              { id: 'i2e2-4', primary: 'str', correct: 'B' },
              { id: 'i2e2-5', primary: 'th', correct: 'A' },
              { id: 'i2e2-6', primary: 'sk', correct: 'B' },
              { id: 'i2e2-7', primary: 'ph', correct: 'A' },
              { id: 'i2e2-8', primary: 'cr', correct: 'B' },
            ],
          },

          // Exercise 3: Match Phonics Terminology
          {
            type: 'word-bank-match',
            id: 'i2-e3',
            title: 'Match: Phonics Terminology',
            instruction: 'Match each term to its definition. You must be able to distinguish these terms precisely on the exam.',
            pairs: [
              {
                id: 'pt-1',
                term: 'Grapheme',
                definition: 'A letter or combination of letters that represents a single phoneme. ("sh" is one grapheme representing /ʃ/.)',
              },
              {
                id: 'pt-2',
                term: 'Consonant digraph',
                definition: 'Two consecutive consonants that together represent one sound — each letter loses its individual sound. (sh, ch, th, ph, ck)',
              },
              {
                id: 'pt-3',
                term: 'Consonant blend',
                definition: 'Two or three consonants where each sound remains distinct when pronounced. (bl-, str-, sk-, cr-)',
              },
              {
                id: 'pt-4',
                term: 'Vowel team',
                definition: 'Two adjacent vowels that together represent a single vowel sound. (ai in "rain"; oa in "boat"; ee in "feet")',
              },
              {
                id: 'pt-5',
                term: 'Diphthong',
                definition: 'A vowel sound that glides between two positions within one syllable. (oi/oy in "coin"/"boy"; ou/ow in "cloud"/"now")',
              },
              {
                id: 'pt-6',
                term: 'R-controlled vowel',
                definition: 'A vowel followed by r — modified by the r, so it is neither short nor long. (ar, er, ir, ur, or)',
              },
            ],
          },

          // Exercise 4: Classify Regular vs. Irregular HFW
          {
            type: 'classify-two',
            id: 'i2-e4',
            title: 'Classify: Phonetically Regular vs. Irregular High-Frequency Words',
            instruction: 'Irregular words cannot be fully decoded using taught phonics patterns and must be memorized as whole words.',
            categoryA: 'Phonetically Regular\n(can be decoded)',
            categoryB: 'Phonetically Irregular\n(must be memorized)',
            items: [
              { id: 'i2e4-1', primary: 'the', correct: 'B' },
              { id: 'i2e4-2', primary: 'can', correct: 'A' },
              { id: 'i2e4-3', primary: 'said', correct: 'B' },
              { id: 'i2e4-4', primary: 'will', correct: 'A' },
              { id: 'i2e4-5', primary: 'of', correct: 'B' },
              { id: 'i2e4-6', primary: 'sit', correct: 'A' },
              { id: 'i2e4-7', primary: 'was', correct: 'B' },
              { id: 'i2e4-8', primary: 'at', correct: 'A' },
            ],
          },

          // Exercise 5: Match Phonics Strategies
          {
            type: 'strategy-match',
            id: 'i2-e5',
            title: 'Match: Phonics Strategy → Primary Purpose',
            instruction: 'Match each instructional strategy to what it primarily accomplishes.',
            leftLabel: 'Instructional Strategy',
            rightLabel: 'Primary Purpose',
            pairs: [
              { id: 'sm2-1', left: 'Word Sorts', right: 'Build phonics pattern recognition through categorization' },
              { id: 'sm2-2', left: 'Decodable Texts', right: 'Practice newly taught phonics patterns in connected reading' },
              { id: 'sm2-3', left: 'Dictation / Encoding', right: 'Reveal and reinforce pattern mastery through spelling application' },
              { id: 'sm2-4', left: 'Systematic Explicit Instruction', right: 'Teach patterns in deliberate scope and sequence from simple to complex' },
              { id: 'sm2-5', left: 'Oral Reading with Monitoring', right: 'Provide immediate corrective feedback to prevent error reinforcement' },
            ],
          },
        ],
      },

      // ── Objective 3 ──────────────────────────────────────────────────────
      {
        id: 'i-obj3',
        objectiveNum: 3,
        title: 'Word Analysis: Syllabication, Morphemic Analysis, and Orthography',
        exercises: [

          // Exercise 1: Match Six Syllable Types
          {
            type: 'word-bank-match',
            id: 'i3-e1',
            title: 'Match: The Six Syllable Types',
            instruction: 'Every English syllable fits one of six types. Match each type to its pattern and vowel rule.',
            pairs: [
              {
                id: 'syl-1',
                term: 'Closed',
                definition: 'Ends in a consonant; the vowel is short. (cat, hap-pen, rab-bit)',
              },
              {
                id: 'syl-2',
                term: 'Open',
                definition: 'Ends in a vowel; the vowel is long. (me, go, ba-by, mu-sic)',
              },
              {
                id: 'syl-3',
                term: 'Vowel-Consonant-e (VCe)',
                definition: 'Ends in vowel + consonant + silent e; the first vowel is long. (cake, home, bi-cycle)',
              },
              {
                id: 'syl-4',
                term: 'Vowel Team',
                definition: 'Contains two adjacent vowels representing one sound; sound varies by team. (rain, boat, meet, sea-son)',
              },
              {
                id: 'syl-5',
                term: 'R-Controlled',
                definition: 'Vowel followed by r; the vowel is neither short nor long — modified by the r. (car, fern, corn, burn)',
              },
              {
                id: 'syl-6',
                term: 'Consonant-le',
                definition: 'Final syllable with consonant + le; pronounced with schwa + consonant sound. (ta-ble, sim-ple, bot-tle)',
              },
            ],
          },

          // Exercise 2: Classify Inflectional vs. Derivational
          {
            type: 'classify-two',
            id: 'i3-e2',
            title: 'Classify: Inflectional vs. Derivational Morphemes',
            instruction: 'Inflectional morphemes change grammatical form but do NOT change part of speech. Derivational morphemes create a new word — and often change part of speech.',
            categoryA: 'Inflectional',
            categoryB: 'Derivational',
            items: [
              { id: 'i3e2-1', primary: '-ed (walked, jumped)', correct: 'A' },
              { id: 'i3e2-2', primary: '-tion (act → action)', correct: 'B' },
              { id: 'i3e2-3', primary: '-ing (running, eating)', correct: 'A' },
              { id: 'i3e2-4', primary: '-ness (happy → happiness)', correct: 'B' },
              { id: 'i3e2-5', primary: '-s / -es (cats, she runs)', correct: 'A' },
              { id: 'i3e2-6', primary: 'un- (not; unhappy)', correct: 'B' },
              { id: 'i3e2-7', primary: '-er (tall → taller)', correct: 'A' },
              { id: 'i3e2-8', primary: '-ful (hope → hopeful)', correct: 'B' },
            ],
          },

          // Exercise 3: Match Morpheme Types
          {
            type: 'word-bank-match',
            id: 'i3-e3',
            title: 'Match: Types of Morphemes',
            instruction: 'Match each morpheme type to its definition.',
            pairs: [
              {
                id: 'mt-1',
                term: 'Free morpheme',
                definition: 'Can stand alone as a complete word. (play, friend, act)',
              },
              {
                id: 'mt-2',
                term: 'Bound morpheme',
                definition: 'Cannot stand alone; must attach to another morpheme. (un-, -tion, -ed)',
              },
              {
                id: 'mt-3',
                term: 'Root',
                definition: 'Core morpheme carrying primary meaning, often from Latin or Greek; may not stand alone. (rupt, dict, port)',
              },
              {
                id: 'mt-4',
                term: 'Prefix',
                definition: 'A bound morpheme attached before the root that modifies its meaning. (un-, re-, pre-, dis-, mis-)',
              },
              {
                id: 'mt-5',
                term: 'Suffix',
                definition: 'A bound morpheme attached after the root; may be inflectional or derivational. (-tion, -ness, -ful, -ed, -ing)',
              },
            ],
          },

          // Exercise 4: Match Latin & Greek Roots
          {
            type: 'strategy-match',
            id: 'i3-e4',
            title: 'Match: Latin & Greek Roots → Meaning',
            instruction: 'Knowing these roots helps students decode and understand unfamiliar academic vocabulary. Match each root to its meaning.',
            leftLabel: 'Root',
            rightLabel: 'Meaning & Word Examples',
            pairs: [
              { id: 'rt-1', left: 'port (Latin)', right: 'carry — transport, import, portable' },
              { id: 'rt-2', left: 'dict (Latin)', right: 'say, speak — dictate, predict, contradict' },
              { id: 'rt-3', left: 'rupt (Latin)', right: 'break — rupture, disrupt, interrupt' },
              { id: 'rt-4', left: 'bio (Greek)', right: 'life — biology, biography, antibiotic' },
              { id: 'rt-5', left: 'graph (Greek)', right: 'write, record — autograph, paragraph, photograph' },
              { id: 'rt-6', left: 'phon (Greek)', right: 'sound, voice — telephone, microphone, phonics' },
            ],
          },
        ],
      },

      // ── Objective 4 ──────────────────────────────────────────────────────
      {
        id: 'i-obj4',
        objectiveNum: 4,
        title: 'Reading Fluency',
        exercises: [

          // Exercise 1: Match Fluency Components
          {
            type: 'word-bank-match',
            id: 'i4-e1',
            title: 'Match: Fluency Components & Key Concepts',
            instruction: 'Match each term to its definition. Know these precisely — the exam frequently tests the distinctions between them.',
            pairs: [
              {
                id: 'fl-1',
                term: 'Accuracy',
                definition: 'Reading words correctly without decoding errors — the foundation of fluency. Phonics gaps cause accuracy problems.',
              },
              {
                id: 'fl-2',
                term: 'Rate',
                definition: 'Reading at an appropriate pace; measured in words correct per minute (WCPM). Reflects automaticity of word recognition.',
              },
              {
                id: 'fl-3',
                term: 'Prosody',
                definition: 'Reading with appropriate expression, phrasing, intonation, and rhythm that reflects the meaning of text. The bridge between fluency and comprehension.',
              },
              {
                id: 'fl-4',
                term: 'Automaticity',
                definition: 'Fast, effortless word recognition requiring minimal conscious attention — frees cognitive resources for comprehension.',
              },
            ],
          },

          // Exercise 2: Classify Decoding vs. Fluency Problem
          {
            type: 'classify-two',
            id: 'i4-e2',
            title: 'Classify: Decoding Problem vs. Fluency Problem',
            instruction: 'This is the most important fluency distinction on the exam. If a student misreads words, that is a DECODING problem — fluency practice will not help. Classify each student description correctly.',
            categoryA: 'Decoding Problem\n(return to phonics instruction)',
            categoryB: 'Fluency Problem\n(fluency intervention appropriate)',
            items: [
              { id: 'i4e2-1', primary: 'Reads "ship" as "sip" and "stop" as "sop"', correct: 'A' },
              { id: 'i4e2-2', primary: 'Reads accurately but sounds robotic — no expression, ignores punctuation', correct: 'B' },
              { id: 'i4e2-3', primary: 'Consistently reads the vowel team "oa" as a short vowel', correct: 'A' },
              { id: 'i4e2-4', primary: 'Reads accurately without errors but very slowly, word-by-word', correct: 'B' },
              { id: 'i4e2-5', primary: 'Cannot decode CVCe words — reads "cake" as "cak"', correct: 'A' },
              { id: 'i4e2-6', primary: 'Reads at grade-level WCPM but with a flat, monotone delivery', correct: 'B' },
            ],
          },

          // Exercise 3: Match Fluency Strategies
          {
            type: 'strategy-match',
            id: 'i4-e3',
            title: 'Match: Fluency Strategy → Primary Purpose',
            instruction: 'Each fluency strategy targets something specific. Match them correctly.',
            leftLabel: 'Strategy',
            rightLabel: 'Primary Purpose',
            pairs: [
              { id: 'fs-1', left: 'Repeated Reading', right: 'Build rate and automaticity through multiple readings with feedback' },
              { id: 'fs-2', left: "Reader's Theater", right: 'Develop prosody through authentic performance without memorization' },
              { id: 'fs-3', left: 'Phrase-Cued Reading', right: 'Teach meaningful text chunking using slash marks at phrase boundaries' },
              { id: 'fs-4', left: 'Echo Reading', right: 'Model fluent reading for immediate student imitation' },
              { id: 'fs-5', left: 'Wide Independent Reading', right: 'Build automaticity over time through high-volume reading at the independent level' },
            ],
          },

          // Exercise 4: Match Reading Levels
          {
            type: 'word-bank-match',
            id: 'i4-e4',
            title: 'Match: Reading Level Definitions',
            instruction: 'Match each reading level to its accuracy threshold and instructional implication.',
            pairs: [
              {
                id: 'rl-1',
                term: 'Independent Level',
                definition: '95%+ accuracy — full comprehension, no support needed. Best level for building fluency through wide reading.',
              },
              {
                id: 'rl-2',
                term: 'Instructional Level',
                definition: '90–94% accuracy — reads with teacher support. Best level for guided instruction and repeated reading intervention.',
              },
              {
                id: 'rl-3',
                term: 'Frustration Level',
                definition: 'Below 90% accuracy — comprehension breaks down. Reading at this level does not build fluency and can reinforce errors.',
              },
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUBAREA II — Development of Reading Comprehension
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'II',
    name: 'Development of Reading Comprehension',
    weight: '27%',
    objectives: [

      // ── Objective 5 ──────────────────────────────────────────────────────
      {
        id: 'ii-obj5',
        objectiveNum: 5,
        title: 'Vocabulary and Academic Language Development',
        exercises: [

          // Exercise 1: Match Beck's Three Tiers
          {
            type: 'word-bank-match',
            id: 'ii5-e1',
            title: "Match: Beck's Three Tiers of Vocabulary",
            instruction: 'Match each tier to its description. The exam will describe a word and ask which tier it belongs to — or which words to prioritize for instruction.',
            pairs: [
              {
                id: 'bt-1',
                term: 'Tier 1',
                definition: 'Basic conversational words most students know from oral language by school entry; rarely need direct instruction. (dog, run, happy, table)',
              },
              {
                id: 'bt-2',
                term: 'Tier 2',
                definition: 'High-frequency words used across many academic subjects; rarely defined in context. HIGHEST priority for direct instruction. (analyze, significant, contrast, evidence)',
              },
              {
                id: 'bt-3',
                term: 'Tier 3',
                definition: 'Low-frequency, domain-specific vocabulary used within one subject area; teach in context of the relevant unit. (photosynthesis, Reconstruction, equilateral)',
              },
            ],
          },

          // Exercise 2: Classify Tier 1 vs. Tier 2
          {
            type: 'classify-two',
            id: 'ii5-e2',
            title: 'Classify: Tier 1 vs. Tier 2 Words',
            instruction: 'The most common exam question in this area: which words should a teacher prioritize for direct instruction? Tier 2 words appear frequently across academic texts but are rarely defined in context.',
            categoryA: 'Tier 1\n(do NOT prioritize — students know these)',
            categoryB: 'Tier 2\n(HIGHEST priority — explicit instruction needed)',
            items: [
              { id: 'ii5e2-1', primary: 'analyze', correct: 'B' },
              { id: 'ii5e2-2', primary: 'table', correct: 'A' },
              { id: 'ii5e2-3', primary: 'contrast', correct: 'B' },
              { id: 'ii5e2-4', primary: 'dog', correct: 'A' },
              { id: 'ii5e2-5', primary: 'significant', correct: 'B' },
              { id: 'ii5e2-6', primary: 'run', correct: 'A' },
              { id: 'ii5e2-7', primary: 'evidence', correct: 'B' },
              { id: 'ii5e2-8', primary: 'happy', correct: 'A' },
            ],
          },

          // Exercise 3: Match Context Clue Types
          {
            type: 'word-bank-match',
            id: 'ii5-e3',
            title: 'Match: Context Clue Types',
            instruction: 'Match each context clue type to its description. The exam presents a sentence and asks which type of context clue the author used.',
            pairs: [
              {
                id: 'cc-1',
                term: 'Definition / Explanation',
                definition: 'The author directly states the meaning of the word in the text. ("Photosynthesis, the process by which plants convert sunlight into food…")',
              },
              {
                id: 'cc-2',
                term: 'Apposition',
                definition: 'Definition placed immediately beside the word, set off by commas, dashes, or parentheses. ("The entomologist, a scientist who studies insects, examined the specimen.")',
              },
              {
                id: 'cc-3',
                term: 'Restatement / Synonym',
                definition: 'A word or phrase with similar meaning appears nearby. ("She was so loquacious — talking nonstop — that everyone grew tired.")',
              },
              {
                id: 'cc-4',
                term: 'Contrast / Antonym',
                definition: 'The opposite meaning is used, allowing the reader to infer the word\'s meaning. ("Unlike his gregarious brother, Marcus was solitary and withdrawn.")',
              },
              {
                id: 'cc-5',
                term: 'Syntax / Grammar',
                definition: "The word's grammatical role and position in the sentence provide clues about its meaning, even without context.",
              },
            ],
          },

          // Exercise 4: Match Vocabulary Strategies
          {
            type: 'strategy-match',
            id: 'ii5-e4',
            title: 'Match: Vocabulary Strategy → Primary Purpose',
            instruction: 'Match each vocabulary instructional strategy to its primary purpose.',
            leftLabel: 'Strategy',
            rightLabel: 'Primary Purpose',
            pairs: [
              {
                id: 'vs-1',
                left: 'Student-Friendly Definitions',
                right: 'Build word knowledge using accessible language and multiple contexts — not dictionary definitions',
              },
              {
                id: 'vs-2',
                left: 'Semantic Mapping',
                right: 'Connect a target word to synonyms, antonyms, examples, and related concepts to build deep word knowledge',
              },
              {
                id: 'vs-3',
                left: 'Morphological Analysis',
                right: 'Use known roots and affixes to infer the meaning of unfamiliar words',
              },
              {
                id: 'vs-4',
                left: 'Wide Reading',
                right: 'Build vocabulary incidentally through high-volume reading across genres and topics',
              },
              {
                id: 'vs-5',
                left: 'Reference Materials (dictionaries, thesauruses)',
                right: 'Teach students to use word-learning tools independently and purposefully',
              },
            ],
          },
        ],
      },

      // ── Objective 6 ──────────────────────────────────────────────────────
      {
        id: 'ii-obj6',
        objectiveNum: 6,
        title: 'Literary Text Comprehension',
        exercises: [

          // Exercise 1: Match Three Comprehension Levels
          {
            type: 'word-bank-match',
            id: 'ii6-e1',
            title: 'Match: Three Levels of Reading Comprehension',
            instruction: 'Match each comprehension level to its definition. You must be able to classify any given question or task by level.',
            pairs: [
              {
                id: 'cl-1',
                term: 'Literal',
                definition: 'Understanding explicitly stated information — what the text directly says. ("Where does the story take place?")',
              },
              {
                id: 'cl-2',
                term: 'Inferential',
                definition: 'Reading between the lines — drawing conclusions from text clues combined with background knowledge. ("Why do you think the character made that choice?")',
              },
              {
                id: 'cl-3',
                term: 'Evaluative / Critical',
                definition: "Making judgments about the text — evaluating the author's craft, perspective, bias, and purpose. (\"Was the narrator reliable? Why?\")",
              },
            ],
          },

          // Exercise 2: Classify Literal vs. Beyond-Literal
          {
            type: 'classify-two',
            id: 'ii6-e2',
            title: 'Classify: Literal vs. Beyond-Literal Questions',
            instruction: 'Classify each reading question. Literal questions are answered directly from the text. Beyond-literal questions require inference or evaluation.',
            categoryA: 'Literal\n(answer is directly in the text)',
            categoryB: 'Beyond Literal\n(inferential or evaluative)',
            items: [
              { id: 'ii6e2-1', primary: '"Where does the story take place?"', correct: 'A' },
              { id: 'ii6e2-2', primary: '"Why do you think the character chose to run away?"', correct: 'B' },
              { id: 'ii6e2-3', primary: '"What did the character do after she found the letter?"', correct: 'A' },
              { id: 'ii6e2-4', primary: '"What is the author\'s central message about friendship?"', correct: 'B' },
              { id: 'ii6e2-5', primary: '"How many characters are named in this chapter?"', correct: 'A' },
              { id: 'ii6e2-6', primary: '"Do you agree with the character\'s decision? Use text evidence to explain."', correct: 'B' },
            ],
          },

          // Exercise 3: Match Story Grammar Elements
          {
            type: 'word-bank-match',
            id: 'ii6-e3',
            title: 'Match: Story Grammar Elements',
            instruction: 'Match each narrative element to its definition.',
            pairs: [
              {
                id: 'sg-1',
                term: 'Setting',
                definition: 'The time and place of the story — and how these conditions shape the characters and conflict.',
              },
              {
                id: 'sg-2',
                term: 'Conflict / Problem',
                definition: 'The central challenge the main character faces: person vs. person, vs. nature, vs. self, or vs. society.',
              },
              {
                id: 'sg-3',
                term: 'Rising action',
                definition: 'The sequence of events building toward the climax; understanding causal relationships between events is a key comprehension skill.',
              },
              {
                id: 'sg-4',
                term: 'Climax',
                definition: 'The turning point — the moment of highest tension when the conflict comes to a head.',
              },
              {
                id: 'sg-5',
                term: 'Theme',
                definition: 'The central message or insight about life the story conveys — NOT the plot summary, but what the story says about its topic.',
              },
            ],
          },

          // Exercise 4: Match Reciprocal Teaching Strategies
          {
            type: 'strategy-match',
            id: 'ii6-e4',
            title: 'Match: Reciprocal Teaching — Four Strategies',
            instruction: 'Reciprocal teaching is a top evidence-based comprehension intervention. Students take turns leading four strategies. Match each to what the student does.',
            leftLabel: 'Strategy',
            rightLabel: 'What the Student Does',
            pairs: [
              { id: 'rts-1', left: 'Predicting', right: 'Makes educated guesses about what will come next, based on text clues and background knowledge' },
              { id: 'rts-2', left: 'Questioning', right: 'Generates questions about the text to deepen engagement and monitor comprehension' },
              { id: 'rts-3', left: 'Clarifying', right: 'Identifies and resolves confusing words, sentences, or ideas in the passage' },
              { id: 'rts-4', left: 'Summarizing', right: 'Restates the most important ideas from the passage in their own words' },
            ],
          },
        ],
      },

      // ── Objective 7 ──────────────────────────────────────────────────────
      {
        id: 'ii-obj7',
        objectiveNum: 7,
        title: 'Informational Text Comprehension',
        exercises: [

          // Exercise 1: Match Five Text Structures
          {
            type: 'word-bank-match',
            id: 'ii7-e1',
            title: 'Match: Five Informational Text Structures',
            instruction: 'Match each text structure to how information is organized within it.',
            pairs: [
              {
                id: 'ts-1',
                term: 'Description',
                definition: 'Describes characteristics, features, or attributes of a topic — what it is, what it looks like, how it works.',
              },
              {
                id: 'ts-2',
                term: 'Sequence / Chronological',
                definition: 'Events or steps presented in time order — how things happened or how to do something step by step.',
              },
              {
                id: 'ts-3',
                term: 'Compare and Contrast',
                definition: 'Examines similarities and differences between two or more things, ideas, or events.',
              },
              {
                id: 'ts-4',
                term: 'Cause and Effect',
                definition: 'Shows how one event or condition causes another — why things happen and what results.',
              },
              {
                id: 'ts-5',
                term: 'Problem and Solution',
                definition: 'Identifies a problem and presents one or more proposed solutions or responses.',
              },
            ],
          },

          // Exercise 2: Match Signal Words to Text Structure
          {
            type: 'strategy-match',
            id: 'ii7-e2',
            title: 'Match: Text Structure → Signal Words',
            instruction: 'Signal words help readers identify text structure. Match each structure to its characteristic signal language.',
            leftLabel: 'Text Structure',
            rightLabel: 'Signal Words',
            pairs: [
              { id: 'sw-1', left: 'Sequence / Chronological', right: 'first, next, then, finally, after, before, during, in [year]' },
              { id: 'sw-2', left: 'Compare and Contrast', right: 'however, but, both, similarly, unlike, in contrast, on the other hand' },
              { id: 'sw-3', left: 'Cause and Effect', right: 'because, therefore, as a result, consequently, leads to, due to' },
              { id: 'sw-4', left: 'Problem and Solution', right: 'problem, solution, resolve, one answer is, the challenge is, this can be addressed by' },
              { id: 'sw-5', left: 'Description', right: 'is, has, for example, such as, consists of, looks like, is characterized by' },
            ],
          },

          // Exercise 3: Classify Text Features
          {
            type: 'classify-two',
            id: 'ii7-e3',
            title: 'Classify: Text Features — Locate vs. Understand',
            instruction: 'Text features serve two main purposes. Classify each feature by its primary function.',
            categoryA: 'Helps Readers LOCATE Information',
            categoryB: 'Helps Readers UNDERSTAND Content',
            items: [
              { id: 'ii7e3-1', primary: 'Table of contents', correct: 'A' },
              { id: 'ii7e3-2', primary: 'Labeled diagram', correct: 'B' },
              { id: 'ii7e3-3', primary: 'Index', correct: 'A' },
              { id: 'ii7e3-4', primary: 'Glossary', correct: 'B' },
              { id: 'ii7e3-5', primary: 'Headings and subheadings', correct: 'A' },
              { id: 'ii7e3-6', primary: 'Photograph with caption', correct: 'B' },
              { id: 'ii7e3-7', primary: 'Bold / italicized key terms', correct: 'B' },
              { id: 'ii7e3-8', primary: 'Sidebar', correct: 'B' },
            ],
          },

          // Exercise 4: Match Informational Text Strategies
          {
            type: 'strategy-match',
            id: 'ii7-e4',
            title: 'Match: Informational Text Strategy → Purpose',
            instruction: 'Match each comprehension strategy to its primary purpose when reading informational text.',
            leftLabel: 'Strategy',
            rightLabel: 'Primary Purpose',
            pairs: [
              {
                id: 'it-1',
                left: 'Close Reading',
                right: 'Read a complex text multiple times, each pass for a different purpose (vocabulary, structure, craft, evidence)',
              },
              {
                id: 'it-2',
                left: 'KWL Chart',
                right: 'Activate background knowledge before reading; record new learning after reading',
              },
              {
                id: 'it-3',
                left: 'Text-Dependent Questions',
                right: 'Require students to cite specific textual evidence rather than relying on prior knowledge alone',
              },
              {
                id: 'it-4',
                left: 'Graphic Organizer (text structure)',
                right: "Visually organize information according to the text's structure (cause-effect, compare-contrast, sequence)",
              },
            ],
          },
        ],
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SUBAREA III — Reading Assessment and Instruction
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: 'III',
    name: 'Reading Assessment and Instruction',
    weight: '18%',
    objectives: [

      // ── Objective 8 ──────────────────────────────────────────────────────
      {
        id: 'iii-obj8',
        objectiveNum: 8,
        title: 'Assessing Reading Development',
        exercises: [

          // Exercise 1: Match Five Assessment Purposes
          {
            type: 'word-bank-match',
            id: 'iii8-e1',
            title: 'Match: Five Purposes of Reading Assessment',
            instruction: 'Match each assessment type to the key question it answers. This is highly tested — know when and why each type is used.',
            pairs: [
              {
                id: 'ap-1',
                term: 'Screening',
                definition: 'Which students may be at risk? Given to ALL students at the start of the year to identify who needs closer monitoring.',
              },
              {
                id: 'ap-2',
                term: 'Diagnostic',
                definition: 'Exactly which specific skills is this student missing? Given to at-risk students after screening to plan targeted intervention.',
              },
              {
                id: 'ap-3',
                term: 'Formative / Progress Monitoring',
                definition: 'Is this student responding to instruction? Given frequently (weekly or biweekly) during intervention to track growth.',
              },
              {
                id: 'ap-4',
                term: 'Summative',
                definition: 'Has this student achieved the grade-level standard? Given at end of unit, semester, or year to evaluate mastery.',
              },
              {
                id: 'ap-5',
                term: 'Pre/Post (Program Evaluation)',
                definition: 'Did this instruction produce measurable growth? Same assessment given before and after a specific instructional program.',
              },
            ],
          },

          // Exercise 2: Match Assessment Concepts
          {
            type: 'word-bank-match',
            id: 'iii8-e2',
            title: 'Match: Key Assessment Concepts',
            instruction: 'Match each assessment concept to its definition.',
            pairs: [
              {
                id: 'ac-1',
                term: 'Validity',
                definition: 'The degree to which an assessment actually measures what it claims to measure. A test with poor validity may be measuring something unintended.',
              },
              {
                id: 'ac-2',
                term: 'Reliability',
                definition: 'The degree to which an assessment produces consistent results across administrations, scorers, and settings.',
              },
              {
                id: 'ac-3',
                term: 'Norm-referenced',
                definition: "Compares a student's performance to a national sample of same-age or grade-level peers; results in percentile ranks.",
              },
              {
                id: 'ac-4',
                term: 'Criterion-referenced',
                definition: "Compares a student's performance to a specific standard or benchmark — not to other students.",
              },
            ],
          },

          // Exercise 3: Classify Screening vs. Diagnostic
          {
            type: 'classify-two',
            id: 'iii8-e3',
            title: 'Classify: Screening vs. Diagnostic Assessment',
            instruction: 'These two types are frequently confused on the exam. Screening is broad and given to all students. Diagnostic is narrow and given only to students flagged by screening.',
            categoryA: 'Screening\n(broad; given to all students)',
            categoryB: 'Diagnostic\n(narrow; given to at-risk students only)',
            items: [
              { id: 'iii8e3-1', primary: 'Given to every student at the start of the school year', correct: 'A' },
              { id: 'iii8e3-2', primary: 'Used after a student is flagged as at-risk to identify exact skill gaps', correct: 'B' },
              { id: 'iii8e3-3', primary: 'Takes 3–5 minutes per student; identifies who needs further evaluation', correct: 'A' },
              { id: 'iii8e3-4', primary: 'Uses a detailed phonics survey or spelling inventory to pinpoint specific deficits', correct: 'B' },
              { id: 'iii8e3-5', primary: 'Results place students in benchmark categories (above / at / below)', correct: 'A' },
              { id: 'iii8e3-6', primary: 'Results directly guide which phonics patterns or skills to target in intervention', correct: 'B' },
            ],
          },

          // Exercise 4: Match Assessment Tools
          {
            type: 'strategy-match',
            id: 'iii8-e4',
            title: 'Match: Assessment Tool → What It Measures',
            instruction: 'Match each tool to what it primarily assesses.',
            leftLabel: 'Assessment Tool',
            rightLabel: 'What It Measures',
            pairs: [
              { id: 'at-1', left: 'DIBELS / easyCBM', right: 'Screening: identifies students at risk in phonics, fluency, and early reading skills (universal, brief)' },
              { id: 'at-2', left: 'Running Record', right: 'Reading accuracy, error patterns, and self-correction strategies during connected text reading' },
              { id: 'at-3', left: 'Informal Reading Inventory (IRI)', right: 'Reading levels (independent, instructional, frustration) across word recognition and comprehension' },
              { id: 'at-4', left: 'Curriculum-Based Measurement (CBM)', right: 'Progress monitoring: tracks student growth on standardized probes over time' },
              { id: 'at-5', left: 'Spelling Inventory', right: 'Spelling development and specific phonics / orthographic knowledge; diagnostic of phonics stage' },
            ],
          },
        ],
      },

      // ── Objective 9 ──────────────────────────────────────────────────────
      {
        id: 'iii-obj9',
        objectiveNum: 9,
        title: 'Evidence-Based Reading Instruction',
        exercises: [

          // Exercise 1: Match Simple View of Reading
          {
            type: 'word-bank-match',
            id: 'iii9-e1',
            title: 'Match: Simple View of Reading (RC = D × LC)',
            instruction: "Gough & Tunmer's Simple View (1986) is foundational. If either component is near zero, reading comprehension collapses. Match each component to its definition.",
            pairs: [
              {
                id: 'svr-1',
                term: 'Reading Comprehension (RC)',
                definition: 'The ultimate goal of reading — understanding written text. Zero in either D or LC collapses comprehension.',
              },
              {
                id: 'svr-2',
                term: 'Decoding (D)',
                definition: 'Translating print into spoken language — encompasses phonemic awareness, phonics, and automatic word recognition.',
              },
              {
                id: 'svr-3',
                term: 'Language Comprehension (LC)',
                definition: 'Understanding spoken or written language — encompasses vocabulary, background knowledge, syntax, discourse, and reasoning.',
              },
            ],
          },

          // Exercise 2: Match Ehri's Phases
          {
            type: 'word-bank-match',
            id: 'iii9-e2',
            title: "Match: Ehri's Phases of Word Reading Development",
            instruction: "Ehri's phase model describes how word reading develops predictably. Match each phase to its description. Knowing a student's phase tells you exactly what to teach next.",
            pairs: [
              {
                id: 'ep-1',
                term: 'Pre-alphabetic',
                definition: 'Memorizes words by visual shape or distinctive features without using letter-sound knowledge; cannot read unfamiliar words.',
              },
              {
                id: 'ep-2',
                term: 'Partial-alphabetic',
                definition: 'Uses some letter-sound knowledge (typically first and last consonants) but still relies heavily on visual memory for words.',
              },
              {
                id: 'ep-3',
                term: 'Full-alphabetic',
                definition: 'Completely maps letters to phonemes; can decode unfamiliar words using phonics, but reading may still be slow and effortful.',
              },
              {
                id: 'ep-4',
                term: 'Consolidated-alphabetic',
                definition: 'Reads in chunks, morphemes, and rimes automatically; efficient, fluent word recognition across familiar and unfamiliar words.',
              },
            ],
          },

          // Exercise 3: Classify RTI Tiers
          {
            type: 'classify-two',
            id: 'iii9-e3',
            title: 'Classify: Tier 1 vs. Tier 2 / Tier 3 Instruction',
            instruction: 'In a Multi-Tiered System of Support (MTSS/RTI), instruction is organized in tiers. Tier 1 is universal — all students. Tiers 2 and 3 provide additional targeted or intensive support.',
            categoryA: 'Tier 1\n(universal — all students, core classroom)',
            categoryB: 'Tier 2 or Tier 3\n(targeted or intensive — additional support)',
            items: [
              { id: 'iii9e3-1', primary: 'Whole-class systematic phonics instruction using the core curriculum', correct: 'A' },
              { id: 'iii9e3-2', primary: 'Small-group repeated reading intervention three times per week for below-benchmark students', correct: 'B' },
              { id: 'iii9e3-3', primary: 'Grade-level read-aloud with vocabulary instruction for the entire class', correct: 'A' },
              { id: 'iii9e3-4', primary: 'Daily intensive structured literacy intervention for a student with significant phonological processing deficits', correct: 'B' },
              { id: 'iii9e3-5', primary: 'Differentiated small-group instruction targeting phonics gaps found through universal screening', correct: 'B' },
              { id: 'iii9e3-6', primary: 'Universal screening of all students three times per year to monitor grade-level benchmark progress', correct: 'A' },
            ],
          },

          // Exercise 4: Match Evidence-Based Principles
          {
            type: 'strategy-match',
            id: 'iii9-e4',
            title: 'Match: Evidence-Based Principle → What It Means in Practice',
            instruction: 'Match each research-based principle to its practical meaning for reading instruction.',
            leftLabel: 'Principle',
            rightLabel: 'What It Means in Practice',
            pairs: [
              {
                id: 'eb-1',
                left: 'Systematic, Explicit Instruction',
                right: 'Teach skills directly in a planned sequence — never rely on incidental learning or hope students will "figure it out"',
              },
              {
                id: 'eb-2',
                left: 'Structured Literacy',
                right: 'Explicit, systematic instruction in phonology, phonics, syllable patterns, morphology, syntax, and semantics — most effective for students with dyslexia',
              },
              {
                id: 'eb-3',
                left: 'Differentiated Instruction',
                right: 'Adjust content, process, or product to meet individual student needs based on assessment data — not one-size-fits-all',
              },
              {
                id: 'eb-4',
                left: 'Fidelity of Implementation',
                right: 'Implement an evidence-based program exactly as designed — cutting components reduces effectiveness and invalidates research support',
              },
            ],
          },
        ],
      },
    ],
  },
]
