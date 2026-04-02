import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const QuestionSchema = new mongoose.Schema({
  examCode: String,
  questionText: String,
  options: [{ label: String, text: String }],
  correctAnswer: String,
  explanation: String,
  subarea: String,
  subareaName: String,
  objectiveNumber: Number,
  difficulty: String,
  isPublished: Boolean,
  isDiagnostic: Boolean,
  stimulus: String,
}, { timestamps: true })

const Question = mongoose.models.Question || mongoose.model('Question', QuestionSchema)

async function run() {
  await mongoose.connect(process.env.MONGODB_URI!)
  console.log('Connected.')

  const updates: Array<{ match: RegExp; index: number; text: string; label?: string }> = [
    // Q3 — C: shorten correct answer
    {
      match: /teacher says the individual sounds \/m\//,
      index: 2,
      text: 'Blend separately spoken phonemes into a word',
    },
    // Q4 — D: shorten correct answer
    {
      match: /sound board with colored dots/,
      index: 3,
      text: 'Segmenting each phoneme in words with final consonant blends',
    },
    // Q6 — B: shorten correct answer
    {
      match: /which letter-sound relationship should a first-grade teacher introduce earliest/,
      index: 1,
      text: 'Short vowel /a/ in CVC words using consonants',
    },
    // Q7 — C: shorten correct answer
    {
      match: /consistently spells watch as .wach./,
      index: 2,
      text: 'Trigraph patterns and their use in orthography',
    },
    // Q9 — A: shorten correct answer
    {
      match: /encounters the word .unbreakable./,
      index: 0,
      text: 'Analyzing the prefix, the base, and the suffix',
    },
    // Q10 — B: shorten correct answer
    {
      match: /improve students. oral reading fluency by increasing both rate and expression/,
      index: 1,
      text: 'Having students reread the same passage multiple times',
    },
    // Q11 — C: shorten correct answer
    {
      match: /oral reading fluency probes on the same 100-word passage over three consecutive weeks/,
      index: 2,
      text: 'Initial growth has plateaued; maintain repeated reading',
    },
    // Q12 — D: shorten correct answer
    {
      match: /best describes Tier 2 vocabulary words/,
      index: 3,
      text: 'High-frequency academic words used across multiple content areas (e.g., analyze)',
    },
    // Q13 — B: shorten correct answer
    {
      match: /build students. deep understanding of the word .infer./,
      index: 1,
      text: 'Generating sentences using "infer" and discussing how meaning shifts',
    },
    // Q14 — C: shorten correct answer
    {
      match: /encounters .reluctant. in this sentence/,
      index: 2,
      text: "Identify the surrounding words that signal the word's meaning",
    },
    // Q15 — A: shorten correct answer
    {
      match: /primary purpose of teaching students to identify the narrator.s point of view/,
      index: 0,
      text: "To understand the narrator's perspective and how it shapes the story",
    },
    // Q19 — A: shorten correct answer
    {
      match: /monitor their own understanding while reading a complex informational text about the water cycle/,
      index: 0,
      text: 'Stopping at each section to summarize key ideas and record points of confusion',
    },
    // Q21 — B: shorten correct answer
    {
      match: /monitors a second-grade student.s oral reading fluency every two weeks/,
      index: 1,
      text: 'The student shows slow growth; the intervention should be reviewed',
    },
    // Q22 — C: shorten correct answer
    {
      match: /takes a running record as a student reads a grade-level text aloud/,
      index: 2,
      text: 'The student is applying phonics strategies and self-monitoring',
    },
    // Q23 — A: shorten correct answer
    {
      match: /best describes the purpose of Tier 2 intervention/,
      index: 0,
      text: 'Targeted instruction for students who do not respond adequately to core instruction',
    },
    // Q24 — D: shorten correct answer
    {
      match: /students reading at significantly different levels/,
      index: 3,
      text: 'Flexible groups revised regularly as assessment data changes',
    },
    // Q25 — B: shorten correct answer
    {
      match: /no measurable growth in oral reading fluency after 10 weeks/,
      index: 1,
      text: 'Conduct a targeted diagnostic assessment to identify skill deficits',
    },
  ]

  for (const u of updates) {
    const q = await Question.findOne({ examCode: '190', isDiagnostic: true, questionText: u.match })
    if (!q) { console.warn('NOT FOUND:', u.match); continue }
    q.options[u.index].text = u.text
    q.markModified('options')
    await q.save()
    console.log(`Updated Q (index ${u.index}): ${u.text.substring(0, 60)}`)
  }

  // Q16 — replace ALL THREE distractors (A, B, C) with plausible literary analysis distractors
  const q16 = await Question.findOne({ examCode: '190', isDiagnostic: true, questionText: /fifth-grade teacher uses this passage to teach literary analysis/ })
  if (q16) {
    q16.options[0].text = 'How does the author use the peach as a recurring symbol to develop the central theme of the passage?'
    q16.options[1].text = "What can the reader infer about Grandma Rosa's feelings toward nature based on her actions in the story?"
    q16.options[2].text = "How does the author's use of sensory imagery in the final sentence contribute to the mood of the passage?"
    q16.markModified('options')
    await q16.save()
    console.log('Updated Q16 distractors (A, B, C)')
  } else {
    console.warn('Q16 NOT FOUND')
  }

  await mongoose.disconnect()
  console.log('Done.')
}

run().catch(console.error)
