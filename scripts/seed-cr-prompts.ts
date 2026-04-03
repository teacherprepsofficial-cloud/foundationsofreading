/**
 * Adds 2 written-response prompts to each practice test (mirrors real NES 190 exam format)
 * Run: npx tsx scripts/seed-cr-prompts.ts
 */
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import connectDB from '../lib/mongodb'
import PracticeTest from '../models/PracticeTest'

const pt1CRs = [
  {
    promptNumber: 1 as const,
    crType: 'foundational_reading_skills' as const,
    scenarioContext: `Ms. Rivera is a first-grade teacher who conducted running records on a 70-word text with her students. One student, Marcus, made 9 errors. Seven of those errors were substitutions of visually similar words: he read "then" for "them," "horse" for "house," "went" for "want," "this" for "his," "that" for "what," "from" for "form," and "when" for "where." Marcus self-corrected only 1 time out of 9 error opportunities. When he reached an unfamiliar word, he consistently looked at the first letter and guessed based on initial consonant without checking whether his response made sense in the sentence.`,
    prompt: `Based on Marcus's running record data, identify the primary error pattern and explain what it reveals about his current stage of word-reading development according to research on how readers develop. Then describe two specific, evidence-based instructional strategies that directly address this word-reading pattern. For each strategy, explain how it would be implemented in the classroom and why it targets the specific challenge Marcus is demonstrating.`,
  },
  {
    promptNumber: 2 as const,
    crType: 'reading_comprehension' as const,
    scenarioContext: `A third-grade teacher has been monitoring reading comprehension after independent reading of informational texts. She asks students, "What is the main idea of this passage?" and consistently receives answers that name the topic only. For example, after reading a passage about how beavers build dams, students respond: "It's about beavers" or "Beaver dams." When the teacher prompts, "Tell me more — what does the author most want you to understand?" students repeat the topic or begin retelling details. This pattern appears across students of varying reading levels.`,
    prompt: `Explain the conceptual distinction between a topic and a main idea, and describe why students at this stage commonly conflate the two. Then describe two instructional strategies the teacher could use to develop students' ability to identify the main idea of informational text. For each strategy, explain how it would be implemented and how it specifically addresses the comprehension challenge described above.`,
  },
]

const pt2CRs = [
  {
    promptNumber: 1 as const,
    crType: 'foundational_reading_skills' as const,
    scenarioContext: `A kindergarten teacher administered a phonological awareness screening to all 24 students in her class in October. Results showed that 22 of 24 students correctly segmented spoken sentences into individual words and clapped syllables in two-syllable compound words (e.g., "sun-shine," "cup-cake"). However, only 6 of 24 students could correctly isolate the first sound in a spoken word when asked, "What is the first sound you hear in the word 'dog'?" The other 18 students either named the letter "d," said the whole word, said a syllable, or did not respond.`,
    prompt: `Interpret what these screening results reveal about where the majority of students are in their phonological awareness development, and explain why the performance gap between syllable segmentation and phoneme isolation is developmentally significant. Then describe two specific instructional activities the teacher should use next with the 18 students who have not yet developed phoneme isolation. For each activity, explain why it is appropriate for this developmental stage and how it should be delivered to move students toward phonemic awareness.`,
  },
  {
    promptNumber: 2 as const,
    crType: 'reading_comprehension' as const,
    scenarioContext: `A second-grade teacher is working with a guided reading group reading a realistic fiction chapter book. Students accurately answer literal questions — they can recall what characters did, name the setting, and retell the sequence of events. However, when the teacher asks inferential questions such as "Why do you think Lily looked worried even though she said she was fine?" or "What does this part tell us about how Diego really feels about his new school?" students respond with "It doesn't say that in the book" or they answer with personal opinions unconnected to text evidence. The teacher wants to address this gap directly.`,
    prompt: `Explain why inferential comprehension is more cognitively demanding than literal comprehension, and identify two specific cognitive challenges that cause students at this level to struggle with making text-based inferences. Then describe two instructional strategies the teacher could use to scaffold inferential thinking during guided or shared reading. For each strategy, explain what specific inferential skills it develops and how it should be implemented to build students' ability to use text evidence to support their thinking.`,
  },
]

async function seed() {
  await connectDB()

  const pt1 = await PracticeTest.findOne({ examCode: '190', testNumber: 1, isDiagnostic: false })
  const pt2 = await PracticeTest.findOne({ examCode: '190', testNumber: 2, isDiagnostic: false })

  if (!pt1 || !pt2) {
    console.error('PT1 or PT2 not found. Seed practice tests first.')
    process.exit(1)
  }

  await PracticeTest.updateOne({ _id: pt1._id }, { $set: { crPrompts: pt1CRs } })
  console.log('✅ PT1 CR prompts added')

  await PracticeTest.updateOne({ _id: pt2._id }, { $set: { crPrompts: pt2CRs } })
  console.log('✅ PT2 CR prompts added')

  process.exit(0)
}

seed().catch((err) => { console.error(err); process.exit(1) })
