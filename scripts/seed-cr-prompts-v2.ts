/**
 * seed-cr-prompts-v2.ts
 * Seeds exhibit-based CR prompts into Practice Test 1 and Practice Test 2.
 * Run: CONFIRM_RESEED=true npx tsx scripts/seed-cr-prompts-v2.ts
 */
import connectDB from '../lib/mongodb'
import PracticeTest from '../models/PracticeTest'

if (process.env.CONFIRM_RESEED !== 'true') {
  console.error('🔴 This will overwrite crPrompts on PT1 and PT2.')
  console.error('To proceed: CONFIRM_RESEED=true npx tsx scripts/seed-cr-prompts-v2.ts')
  process.exit(1)
}

// ── PT1 CR1 — Maya, 2nd grade, Foundational Reading Skills (Objective 0010) ──

const pt1Cr1 = {
  promptNumber: 1,
  crType: 'foundational_reading_skills',
  objective: '0010',
  objectiveIntro: 'Prepare an organized, developed analysis on a topic related to the development of foundational reading skills.',
  assignmentIntro: 'Using your knowledge of foundational reading skills (e.g., phonemic awareness, phonics, recognition of high-frequency words, syllabication, morphemic analysis, automaticity, reading fluency [i.e., accuracy, rate, and prosody], self-correcting), write a response of approximately 150–300 words in which you:',
  assignmentParts: [
    'identify one significant strength that Maya demonstrates related to foundational reading skills',
    'identify one significant need that Maya demonstrates related to foundational reading skills',
    'based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Maya',
    'explain why the instructional strategy, activity, or intervention you described would be effective for Maya',
  ],
  citeNote: 'Be sure to cite specific evidence from the information provided to support all parts of your response.',
  exhibits: [
    {
      exhibitType: 'teacher_record',
      title: 'Exhibit 1 — Teacher Record',
      context: 'Early in the school year, Maya, a second-grade student, reads aloud a passage from an unfamiliar narrative text. As Maya reads, the teacher notes her performance on a separate copy of the text. Below is the teacher\'s record of Maya\'s oral reading performance.',
      lines: [
        // Line 1: "Sam and his dog Rex ran down the muddy trail."
        [
          { text: 'Sam' },
          { text: 'and' },
          { text: 'his' },
          { text: 'dog' },
          { text: 'Rex' },
          { text: 'ran' },
          { text: 'down' },
          { text: 'the' },
          { text: 'muddy', student: 'mudy', mark: 'sub' },
          { text: 'trail.' },
        ],
        // Line 2: "Rex jumped over a log and landed in a puddle."
        [
          { text: 'Rex' },
          { text: 'jumped', student: 'jumpt', mark: 'sc' },
          { text: 'over' },
          { text: 'a' },
          { text: 'log' },
          { text: 'and' },
          { text: 'landed', student: 'land', mark: 'sub' },
          { text: 'in' },
          { text: 'a' },
          { text: 'puddle.' },
        ],
        // Line 3: "Sam laughed and wiped mud from his face."
        [
          { text: 'Sam' },
          { text: 'laughed', mark: 'lp' },
          { text: 'and' },
          { text: 'wiped', student: 'wipe', mark: 'sub' },
          { text: 'mud' },
          { text: 'from' },
          { text: 'his' },
          { text: 'face.' },
        ],
        // Line 4: "They raced all the way home as the sun began to set."
        [
          { text: 'They' },
          { text: 'raced', mark: 'rep' },
          { text: 'all' },
          { text: 'the' },
          { text: 'way' },
          { text: 'home' },
          { text: 'as' },
          { text: 'the' },
          { text: 'sun' },
          { text: 'began', student: 'begin', mark: 'sub' },
          { text: 'to' },
          { text: 'set.' },
        ],
      ],
    },
    {
      exhibitType: 'fluency_rubric',
      title: 'Exhibit 2 — Oral Fluency Reading Rubric',
      context: 'Afterward, the teacher calculates Maya\'s oral reading fluency (words correct per minute) and accuracy scores. The teacher also assigns Maya a holistic score of 1–4 in three dimensions of her oral reading performance, with 4 representing the highest score for that dimension. These additional notes are shown below.',
      rows: [
        { label: 'Words correct per minute', score: '71 wcpm' },
        { label: 'Accuracy', score: '88%' },
        { label: 'Pace', score: '3' },
        { label: 'Prosody', score: '' },
        { label: 'Smoothness', score: '2', sub: true },
        { label: 'Phrasing', score: '3', sub: true },
      ],
      benchmark: 'Second-grade 50th percentile fall benchmark is 72 wcpm.',
    },
  ],
}

// ── PT1 CR2 — Sofia, 3rd grade, Reading Comprehension (Objective 0011) ────────

const pt1Cr2 = {
  promptNumber: 2,
  crType: 'reading_comprehension',
  objective: '0011',
  objectiveIntro: 'Prepare an organized, developed analysis on a topic related to reading comprehension.',
  assignmentIntro: 'Using your knowledge of reading comprehension (e.g., literal comprehension, inferential comprehension, evaluative comprehension, monitoring for understanding, using text structure, making connections, author\'s purpose and perspective), write a response of approximately 150–300 words in which you:',
  assignmentParts: [
    'identify one significant strength that Sofia demonstrates related to reading comprehension',
    'identify one significant need that Sofia demonstrates related to reading comprehension',
    'based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Sofia',
    'explain why the instructional strategy, activity, or intervention you described would be effective for Sofia',
  ],
  citeNote: 'Be sure to cite specific evidence from the information provided to support all parts of your response.',
  exhibits: [
    {
      exhibitType: 'passage',
      title: 'Exhibit 1 — Reading Passage',
      passageTitle: 'The Missing Notebook',
      text: 'Lena had searched everywhere for her notebook. It held every drawing she had made since kindergarten — birds, horses, her grandmother\'s face. When she finally found it under the couch, the cover was torn and several pages were damp. She sat quietly for a long time before picking it up. Then she pressed it carefully against her chest and carried it to her room.',
    },
    {
      exhibitType: 'anecdotal',
      title: 'Exhibit 2 — Teacher\'s Anecdotal Notes',
      context: 'After Sofia reads the passage independently, her third-grade teacher asks several comprehension questions and records observations about Sofia\'s responses.',
      notes: [
        {
          label: 'Literal Retell',
          text: 'Sofia accurately retold the main events of the passage in sequence. She identified that Lena searched for her notebook, found it under the couch, saw it was damaged, and then carried it to her room.',
        },
        {
          label: 'Inferential Question: "Why did Lena sit quietly for a long time before picking up the notebook?"',
          text: 'Sofia responded: "Because it was wet." She did not infer the emotional significance — that Lena was processing the damage to a deeply personal collection of memories.',
        },
        {
          label: 'Inferential Question: "What does the notebook mean to Lena?"',
          text: 'Sofia responded: "It\'s her drawing book." She identified the literal function but missed the deeper personal significance described in the text (every drawing since kindergarten, including her grandmother\'s face).',
        },
        {
          label: 'Evidence Use',
          text: 'When asked literal questions, Sofia immediately located the relevant sentence in the text. When asked inferential questions, she paused and frequently said "I don\'t know" before giving a surface-level answer.',
        },
      ],
    },
  ],
}

// ── PT2 CR1 — Priya, 1st grade, Foundational Reading Skills (Objective 0010) ─

const pt2Cr1 = {
  promptNumber: 1,
  crType: 'foundational_reading_skills',
  objective: '0010',
  objectiveIntro: 'Prepare an organized, developed analysis on a topic related to the development of foundational reading skills.',
  assignmentIntro: 'Using your knowledge of foundational reading skills (e.g., phonemic awareness, phonics, recognition of high-frequency words, syllabication, morphemic analysis, automaticity, reading fluency [i.e., accuracy, rate, and prosody], self-correcting), write a response of approximately 150–300 words in which you:',
  assignmentParts: [
    'identify one significant strength that Priya demonstrates related to foundational reading skills',
    'identify one significant need that Priya demonstrates related to foundational reading skills',
    'based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Priya',
    'explain why the instructional strategy, activity, or intervention you described would be effective for Priya',
  ],
  citeNote: 'Be sure to cite specific evidence from the information provided to support all parts of your response.',
  exhibits: [
    {
      exhibitType: 'word_list',
      title: 'Exhibit 1 — Phonics Word Reading Assessment',
      context: 'In November of first grade, Priya\'s teacher administers a phonics word reading assessment. The teacher presents each word on an individual card and records exactly what Priya says. The results are shown below.',
      groups: [
        {
          groupLabel: 'Category 1 — CVC Words',
          rows: [
            { word: 'mat', response: 'mat', correct: true },
            { word: 'hop', response: 'hop', correct: true },
            { word: 'big', response: 'big', correct: true },
            { word: 'sun', response: 'sun', correct: true },
            { word: 'pet', response: 'pet', correct: true },
          ],
        },
        {
          groupLabel: 'Category 2 — Initial Consonant Blends',
          rows: [
            { word: 'slip', response: 'sip', correct: false },
            { word: 'clap', response: 'cap', correct: false },
            { word: 'drop', response: 'dop', correct: false },
            { word: 'frog', response: 'fog', correct: false },
            { word: 'trip', response: 'tip', correct: false },
          ],
        },
        {
          groupLabel: 'Category 3 — CVCe Words (Long Vowel)',
          rows: [
            { word: 'cake', response: 'cak', correct: false },
            { word: 'hope', response: 'hop', correct: false },
            { word: 'time', response: 'tim', correct: false },
            { word: 'cute', response: 'cut', correct: false },
            { word: 'bike', response: 'bik', correct: false },
          ],
        },
      ],
    },
    {
      exhibitType: 'anecdotal',
      title: 'Exhibit 2 — Teacher\'s Observational Notes',
      context: 'The teacher records the following observations about Priya\'s behaviors and strategies during the word reading assessment.',
      notes: [
        {
          label: 'CVC Words',
          text: 'Priya decoded all five CVC words quickly and accurately with no hesitation. She did not sound out individual letters — she recognized and read the words as whole units.',
        },
        {
          label: 'Consonant Blends',
          text: 'On every blend word, Priya read only the first consonant and skipped the second (e.g., "sip" for "slip," "cap" for "clap"). She did not pause or appear to notice the error.',
        },
        {
          label: 'CVCe Words',
          text: 'On every CVCe word, Priya ignored the final e and assigned the short vowel sound (e.g., "cak" for "cake," "hop" for "hope"). She treated CVCe words as CVC words.',
        },
        {
          label: 'Self-Monitoring',
          text: 'Priya did not attempt to re-read or self-correct any errors across either category. When she encountered a word she was unsure of, she looked up and waited rather than applying a decoding strategy.',
        },
      ],
    },
  ],
}

// ── PT2 CR2 — Jordan, 2nd grade, Reading Comprehension (Objective 0011) ──────

const pt2Cr2 = {
  promptNumber: 2,
  crType: 'reading_comprehension',
  objective: '0011',
  objectiveIntro: 'Prepare an organized, developed analysis on a topic related to reading comprehension.',
  assignmentIntro: 'Using your knowledge of reading comprehension (e.g., literal comprehension, inferential comprehension, evaluative comprehension, monitoring for understanding, using text structure, making connections, author\'s purpose and perspective), write a response of approximately 150–300 words in which you:',
  assignmentParts: [
    'identify one significant strength that Jordan demonstrates related to reading comprehension',
    'identify one significant need that Jordan demonstrates related to reading comprehension',
    'based on the need you identified, describe an appropriate instructional strategy, activity, or intervention to use with Jordan',
    'explain why the instructional strategy, activity, or intervention you described would be effective for Jordan',
  ],
  citeNote: 'Be sure to cite specific evidence from the information provided to support all parts of your response.',
  exhibits: [
    {
      exhibitType: 'passage',
      title: 'Exhibit 1 — Reading Passage',
      passageTitle: 'How Bats Find Food',
      text: 'Most bats hunt at night when it is too dark to see. Instead of using their eyes, bats use sound. A bat sends out a high-pitched squeak that travels through the air. When the sound hits an object — such as a moth — it bounces back to the bat\'s ears. This is called echolocation. By listening to the echoes, a bat can tell exactly where its prey is, how fast it is moving, and even how large it is. Echolocation is so accurate that bats can catch a single moth in complete darkness.',
    },
    {
      exhibitType: 'written_response',
      title: 'Exhibit 2 — Jordan\'s Written Comprehension Responses',
      context: 'After reading the passage independently, Jordan answers three comprehension questions in writing. The teacher records Jordan\'s exact responses below.',
      items: [
        {
          question: 'Literal: According to the passage, how does a bat find food in the dark?',
          response: 'It uses sounds that bounce back to tell it where things are.',
          correct: true,
        },
        {
          question: 'Inferential: Why would a bat have trouble hunting if it lost its hearing?',
          response: 'Because bats need to hear to find food, also because it is dark.',
          correct: false,
        },
        {
          question: 'Evaluative: The author says echolocation is "so accurate" that bats can catch prey in complete darkness. What evidence in the passage best supports this claim?',
          response: 'The bats catch moths.',
          correct: false,
        },
      ],
    },
  ],
}

async function main() {
  await connectDB()

  // Update PT1
  const pt1 = await PracticeTest.findOne({ examCode: '190', testNumber: 1, isDiagnostic: false })
  if (!pt1) { console.error('❌ PT1 not found'); process.exit(1) }
  pt1.crPrompts = [pt1Cr1 as any, pt1Cr2 as any]
  await pt1.save()
  console.log('✅ PT1 CR prompts updated (Maya + Sofia)')

  // Update PT2
  const pt2 = await PracticeTest.findOne({ examCode: '190', testNumber: 2, isDiagnostic: false })
  if (!pt2) { console.error('❌ PT2 not found'); process.exit(1) }
  pt2.crPrompts = [pt2Cr1 as any, pt2Cr2 as any]
  await pt2.save()
  console.log('✅ PT2 CR prompts updated (Priya + Jordan)')

  process.exit(0)
}

main().catch((e) => { console.error(e); process.exit(1) })
