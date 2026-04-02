/**
 * Patch Script — adds 5 missing questions to Practice Test 1
 * Subarea II needs +2 (Obj 0007), Subarea III needs +3 (Obj 0008 +1, Obj 0009 +2)
 * Run: npx tsx scripts/patch-practice-test-1.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Question from '../models/Question'
import PracticeTest from '../models/PracticeTest'

const newQuestions = [

  // ── Objective 0007 — Informational Text Comprehension (+2) ────────────────

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A fourth-grade teacher is using a nonfiction text about the water cycle. After reading a passage together, the teacher asks: "What details in the first two paragraphs support the main idea that water is constantly moving through the environment?" This question is best described as targeting which comprehension skill?',
    options: [
      { label: 'A', text: 'Identifying the text structure by asking students to recognize cause-and-effect organization' },
      { label: 'B', text: 'Evaluating the author\'s argument by identifying whether the evidence is logically sufficient' },
      { label: 'C', text: 'Identifying key details and explaining how they support the main idea of a specific section of text' },
      { label: 'D', text: 'Applying text features by analyzing how headings and diagrams contribute to overall meaning' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. The teacher\'s question explicitly asks students to locate specific supporting details within a defined portion of the text and explain their relationship to the main idea. This is a key ideas and details task — one of the foundational comprehension skills for informational text. Option A is incorrect because while the text may have a cause-and-effect structure, the question is not asking students to identify the structure; it is asking them to identify supporting details for a specific claim. Option B is incorrect because evaluating an argument\'s logic is an evaluative-level skill requiring students to judge the quality of evidence, not merely identify it. Option D is incorrect because text features such as headings and diagrams are not mentioned in the question; the task focuses on paragraph-level print rather than graphic/structural features.',
  },

  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A fifth-grade teacher has students read two short articles on the same topic — one published by a government science agency and one published by a private advocacy group. The teacher then asks students to compare how each author presents the same set of facts and to identify any differences in emphasis or framing. Which comprehension skill is the teacher most directly targeting?',
    options: [
      { label: 'A', text: 'Literal comprehension — locating facts stated explicitly in both texts' },
      { label: 'B', text: 'Integration of knowledge across texts — comparing and contrasting how two authors present the same topic and evaluating potential differences in perspective or purpose' },
      { label: 'C', text: 'Vocabulary development — comparing how each author uses technical terminology related to the topic' },
      { label: 'D', text: 'Text structure — identifying whether each article uses chronological or problem/solution organization' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Asking students to compare how two different authors present the same information — and to consider how source, emphasis, and framing may differ — is a classic integration of knowledge and ideas task for informational text. This skill requires students to move beyond each individual text to analyze them in relationship to each other, which is also a form of critical thinking about author perspective and purpose. Option A is incorrect because literal comprehension involves simply locating stated facts, not analyzing how two authors differently frame or emphasize those facts. Option C is incorrect because while vocabulary comparison could be a component, the primary task is about perspective and framing rather than word choice or technical terminology. Option D is incorrect because text structure analysis examines organizational patterns within a single text, not cross-text comparisons of perspective or argument.',
  },

  // ── Objective 0008 — Assessment of Reading Development (+1) ──────────────

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 8,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A second-grade teacher administers a pseudoword reading assessment to a student who recently scored below the benchmark on an oral reading fluency measure. The student reads pseudowords such as "fim," "brat," and "plost" accurately and without hesitation. What does this assessment result most likely indicate?',
    options: [
      { label: 'A', text: 'The student has memorized a large number of sight words, which inflated the oral reading fluency score.' },
      { label: 'B', text: 'The student has solid phonics decoding skills and the fluency difficulty is more likely caused by limited automaticity, vocabulary, or comprehension rather than phonics gaps.' },
      { label: 'C', text: 'The student\'s poor performance on the fluency measure was a testing anomaly, and no further assessment is needed.' },
      { label: 'D', text: 'The student reads pseudowords well only because pseudoword reading does not require meaning-making, so no conclusion can be drawn.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. Pseudoword reading (reading nonsense words like "fim" or "plost") is specifically designed to assess phonics decoding ability in isolation from sight-word memorization or contextual guessing. A student who reads pseudowords fluently and accurately has internalized letter-sound relationships and can apply them to novel words — the core skill assessed. If this student is nonetheless struggling with oral reading fluency, the difficulty is unlikely to be a phonics gap. Instead, the teacher should investigate other fluency disruptors: limited reading automaticity with real words, unfamiliar vocabulary, or comprehension difficulties. Option A is incorrect because pseudowords cannot be memorized as sight words — they are nonsense words. Strong pseudoword reading indicates decoding skill, not sight-word memorization. Option C is incorrect because below-benchmark fluency is a real finding that warrants investigation; strong pseudoword reading simply narrows the diagnostic picture. Option D is incorrect because pseudoword reading is a well-validated, widely used diagnostic tool precisely because it isolates decoding; strong performance on it is diagnostically meaningful.',
  },

  // ── Objective 0009 — Reading Instruction Principles (+2) ─────────────────

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A reading coach is helping a first-grade teacher select texts for phonics instruction. The teacher has recently completed instruction on short vowels and CVC words. Which text type would most effectively support students in applying and consolidating this phonics knowledge?',
    options: [
      { label: 'A', text: 'A predictable big book with repetitive sentence patterns and colorful illustrations that allow students to anticipate the text' },
      { label: 'B', text: 'A high-interest chapter book read aloud by the teacher so students can focus on listening comprehension rather than decoding' },
      { label: 'C', text: 'A decodable reader that contains a high proportion of CVC words and previously taught phonics patterns, with minimal reliance on pictures to convey meaning' },
      { label: 'D', text: 'A grade-level anthology story selected for its rich vocabulary and complex plot structure' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Decodable texts are specifically designed to contain a high proportion of words that follow recently taught phonics patterns, allowing students to practice applying their phonics knowledge to connected text in an authentic reading context. When students have just learned short vowels and CVC words, decodable texts with those patterns give them the repetitions needed to develop automatic decoding. Option A is incorrect because predictable texts with repetitive patterns and picture support encourage students to guess or memorize text rather than decode; these texts do not give students the focused practice with specific phonics patterns that decodable texts provide. Option B is incorrect because a teacher read-aloud, while valuable for comprehension development, does not give students practice decoding for themselves. Option D is incorrect because grade-level anthology stories typically contain a wide variety of word patterns, including many not yet taught; students who have just learned CVC words will be unable to decode much of the text, making it inappropriate for phonics application practice.',
  },

  {
    examCode: '190' as const,
    subarea: 'III' as const,
    subareaName: 'Reading Assessment and Instruction',
    objectiveNumber: 9,
    difficulty: 'hard' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A school adopts a Multi-Tiered System of Supports (MTSS) framework for reading. A first-grade student is not responding to Tier 2 small-group reading intervention after eight weeks of consistent implementation. Which of the following represents the most appropriate next step within the MTSS framework?',
    options: [
      { label: 'A', text: 'Immediately refer the student for a special education evaluation, as lack of Tier 2 response confirms a learning disability.' },
      { label: 'B', text: 'Continue Tier 2 intervention for the remainder of the year before making any decisions, as reading growth requires a full academic year to evaluate.' },
      { label: 'C', text: 'Review the fidelity of Tier 2 implementation, analyze progress monitoring data more closely, and consider moving to Tier 3 with more intensive, individualized instruction while continuing to collect data.' },
      { label: 'D', text: 'Remove the student from Tier 2 and return to Tier 1 only, since Tier 2 has not been effective.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Correct Response: C. Within MTSS, lack of response to Tier 2 intervention should trigger a systematic problem-solving process before any eligibility determination. The first steps are: (1) verify that the intervention was implemented with fidelity — if not, fix implementation before drawing conclusions; (2) examine progress monitoring data carefully to determine whether the student made any growth, and whether the instructional approach or intensity needs adjustment; and (3) consider moving to Tier 3, which provides more intensive, individualized instruction with more frequent progress monitoring. Data collected across tiers informs future decisions, including whether an evaluation for special education is warranted. Option A is incorrect because lack of Tier 2 response alone does not confirm a learning disability; eligibility for special education requires a comprehensive evaluation, and MTSS data is one input among many. Option B is incorrect because eight weeks of non-response warrants a data-driven response — waiting a full year without adjusting is inconsistent with MTSS principles of continuous progress monitoring and instructional adjustment. Option D is incorrect because returning a student who did not respond to Tier 2 back to only Tier 1 would mean providing less support, which is the opposite of what the data indicates is needed.',
  },

]

async function patch() {
  await connectDB()
  console.log('Connected to MongoDB.')

  const practiceTest = await PracticeTest.findOne({ examCode: '190', testNumber: 1, isDiagnostic: false })
  if (!practiceTest) {
    console.error('Practice Test 1 not found. Run seed-practice-test-1.ts first.')
    process.exit(1)
  }

  console.log(`Found Practice Test 1 (${practiceTest._id}). Currently has ${practiceTest.questionIds.length} questions.`)
  console.log(`Inserting ${newQuestions.length} additional questions...`)

  const inserted = await Question.insertMany(newQuestions)
  console.log(`Inserted ${inserted.length} questions.`)

  const newIds = inserted.map((q) => q._id)
  practiceTest.questionIds.push(...newIds)

  // Recount subarea distribution
  const allQuestions = await Question.find({ _id: { $in: practiceTest.questionIds } }, 'subarea')
  const subareaI = allQuestions.filter((q) => q.subarea === 'I').length
  const subareaII = allQuestions.filter((q) => q.subarea === 'II').length
  const subareaIII = allQuestions.filter((q) => q.subarea === 'III').length

  practiceTest.subareaDistribution = [
    { subarea: 'I', count: subareaI },
    { subarea: 'II', count: subareaII },
    { subarea: 'III', count: subareaIII },
  ]

  await practiceTest.save()

  console.log(`Updated Practice Test 1: ${practiceTest.questionIds.length} total questions.`)
  console.log(`Subarea distribution: I=${subareaI}, II=${subareaII}, III=${subareaIII}`)
  process.exit(0)
}

patch().catch((err) => {
  console.error('Patch error:', err)
  process.exit(1)
})
