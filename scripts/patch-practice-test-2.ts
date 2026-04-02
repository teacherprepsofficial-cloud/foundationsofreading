/**
 * Patch Script — adds 1 missing Obj 0007 question to Practice Test 2
 * Run: npx tsx scripts/patch-practice-test-2.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Question from '../models/Question'
import PracticeTest from '../models/PracticeTest'

const newQuestions = [
  {
    examCode: '190' as const,
    subarea: 'II' as const,
    subareaName: 'Development of Reading Comprehension',
    objectiveNumber: 7,
    difficulty: 'medium' as const,
    isPublished: true,
    isDiagnostic: false,
    questionText:
      'A fourth-grade teacher has students read an informational article about the water cycle, then asks them to use a cause-and-effect graphic organizer to map how each stage of the cycle leads to the next (evaporation → condensation → precipitation → collection → evaporation). Which comprehension skill does this task primarily develop?',
    options: [
      { label: 'A', text: 'Evaluating the author\'s credibility — judging whether the science in the article is accurate' },
      { label: 'B', text: 'Identifying key ideas and relationships — tracing how events, concepts, and processes are causally connected within an informational text' },
      { label: 'C', text: 'Analyzing figurative language — identifying metaphors the author uses to describe the water cycle' },
      { label: 'D', text: 'Building phonemic awareness — attending to the sounds of science vocabulary as students read the article aloud' },
    ],
    correctAnswer: 'B',
    explanation:
      'Correct Response: B. The cause-and-effect graphic organizer requires students to trace the logical relationships between stages in the water cycle — showing how each stage causes or leads to the next. This is a key informational text comprehension skill: understanding how events, concepts, steps, or ideas are logically connected within a text. The organizer makes the relationships explicit and visual, supporting both comprehension and retention. Option A is incorrect because evaluating the author\'s credibility involves judging the source, expertise, and evidence the author provides — the task here is to trace relationships within the text, not to evaluate the author. Option C is incorrect because the task is about content relationships (cause and effect), not about identifying figurative language; informational science articles typically use literal rather than figurative language to describe processes. Option D is incorrect because phonemic awareness is an oral language skill focused on manipulating sounds in spoken words, completely unrelated to mapping cause-and-effect relationships in informational text.',
  },
]

async function patch() {
  await connectDB()
  console.log('Connected to MongoDB.')

  const practiceTest = await PracticeTest.findOne({ examCode: '190', testNumber: 2, isDiagnostic: false })
  if (!practiceTest) {
    console.error('Practice Test 2 not found.')
    process.exit(1)
  }

  console.log(`Found Practice Test 2 (${practiceTest._id}). Currently has ${practiceTest.questionIds.length} questions.`)

  const inserted = await Question.insertMany(newQuestions)
  console.log(`Inserted ${inserted.length} question.`)

  const newIds = inserted.map((q) => q._id)
  practiceTest.questionIds.push(...newIds)

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

  console.log(`Updated Practice Test 2: ${practiceTest.questionIds.length} total questions.`)
  console.log(`Subarea distribution: I=${subareaI}, II=${subareaII}, III=${subareaIII}`)
  process.exit(0)
}

patch().catch((err) => {
  console.error('Patch error:', err)
  process.exit(1)
})
