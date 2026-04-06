/**
 * Trim PT3 answer options — two rules only:
 *   Rule 1: Cut definitional glosses from concept-name options
 *   Rule 2: Trim correct answer when it is longer than distractors
 *
 * No new words are added — only removal.
 * Run: npx tsx scripts/trim-pt3-options.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Question from '../models/Question'

interface Trim {
  pos: number
  id: string
  label: string
  from: string
  to: string
}

const trims: Trim[] = [

  // ── Q12 — Syllable types: cut definitional glosses from all distractors ──────
  // "Closed syllable with a short vowel" → concept name only
  { pos: 12, id: '69cfeeabecad19198e7eb451', label: 'B',
    from: 'Closed syllable with a short vowel',
    to:   'Closed syllable' },
  // "Vowel team syllable with two vowels" → concept name only
  { pos: 12, id: '69cfeeabecad19198e7eb451', label: 'C',
    from: 'Vowel team syllable with two vowels',
    to:   'Vowel team syllable' },
  // "Open syllable ending in a long vowel" → concept name only
  { pos: 12, id: '69cfeeabecad19198e7eb451', label: 'D',
    from: 'Open syllable ending in a long vowel',
    to:   'Open syllable' },

  // ── Q21 — Word sort (correct A): cut rationale tail ──────────────────────────
  { pos: 21, id: '69cfeeabecad19198e7eb45a', label: 'A',
    from: 'Conducting a word sort in which students categorize words as open or closed syllable, then articulate the rule they discovered from the pattern',
    to:   'Conducting a word sort in which students categorize words as open or closed syllable' },

  // ── Q22 — Morphemic chunks (correct C): cut "as their first move..." tail ────
  { pos: 22, id: '69cfeeabecad19198e7eb45b', label: 'C',
    from: 'Explicitly teaching students to identify and bracket morphemic chunks — prefix, root, suffix — as their first move when encountering an unfamiliar multisyllabic word',
    to:   'Explicitly teaching students to identify and bracket morphemic chunks — prefix, root, suffix' },

  // ── Q25 — Morphemic analysis (correct A): cut "then combine meanings" tail ───
  { pos: 25, id: '69cfeeabecad19198e7eb45e', label: 'A',
    from: 'Prompting the student to identify the prefix "mal-" (meaning bad or wrong) and the base word "function," then combine their meanings to construct a definition',
    to:   'Prompting the student to identify the prefix "mal-" (meaning bad or wrong) and the base word "function"' },

  // ── Q29 — Vocabulary gap (correct A): cut "that requires students..." tail ───
  { pos: 29, id: '69cfeeabecad19198e7eb462', label: 'A',
    from: 'Students have developed passive word recognition but not active word production; instruction should add structured speaking and writing practice that requires students to generate the words in new contexts',
    to:   'Students have developed passive word recognition but not active word production; instruction should add structured speaking and writing practice' },

  // ── Q32 — Context clue types: cut definitional glosses ───────────────────────
  { pos: 32, id: '69cfeeabecad19198e7eb465', label: 'A',
    from: 'A restatement clue that directly defines the word in the sentence',
    to:   'A restatement clue' },
  { pos: 32, id: '69cfeeabecad19198e7eb465', label: 'C',
    from: 'An antonym clue contrasting the target word with a known opposite',
    to:   'An antonym clue' },
  { pos: 32, id: '69cfeeabecad19198e7eb465', label: 'D',
    from: 'A synonym clue pairing the target word with a familiar equivalent',
    to:   'A synonym clue' },

  // ── Q34 — Prosody/expression (correct B): cut list of three to one example ───
  { pos: 34, id: '69cfeeabecad19198e7eb467', label: 'B',
    from: "Modeling expressive, character-differentiated reading and having the student practice with scripts, dialogue-heavy texts, or reader's theater",
    to:   "Modeling expressive, character-differentiated reading and having the student practice with reader's theater" },

  // ── Q39 — MTSS flat data (correct A): cut "and consider whether..." tail ─────
  { pos: 39, id: '69cfeeabecad19198e7eb46c', label: 'A',
    from: 'Convene a problem-solving team to examine intervention fidelity and intensity, and consider whether the approach needs to be adjusted or the support level intensified',
    to:   'Convene a problem-solving team to examine intervention fidelity and intensity' },

  // ── Q40 — Screener triage (correct B): cut "to identify specific gaps" tail ──
  { pos: 40, id: '69cfeeabecad19198e7eb46d', label: 'B',
    from: 'Provide all 24 students with Tier 1 core instruction; begin Tier 2 supplemental support for the 6 some-risk students; conduct diagnostic assessment for the 3 significant-risk students to identify specific skill gaps before assigning intervention',
    to:   'Provide all 24 students with Tier 1 core instruction; begin Tier 2 supplemental support for the 6 some-risk students; conduct diagnostic assessment for the 3 significant-risk students' },

  // ── Q45 — Question level sequence (correct A): cut rubric instruction ─────────
  { pos: 45, id: '69cfeeabecad19198e7eb472', label: 'A',
    from: '"What does the article say caused the flooding?" → "Why might future storms produce even worse flooding?" → "Should the city have built stronger levees sooner? Support your position with text evidence."',
    to:   '"What does the article say caused the flooding?" → "Why might future storms produce even worse flooding?" → "Should the city have built stronger levees sooner?"' },

  // ── Q50 — Story map (correct C): cut "that scaffolds the student" ────────────
  { pos: 50, id: '69cfeeabecad19198e7eb477', label: 'C',
    from: 'A story map graphic organizer that scaffolds the student to identify setting, problem, sequence of events, and resolution',
    to:   'A story map graphic organizer to identify setting, problem, sequence of events, and resolution' },

  // ── Q52 — Visualization (correct A): cut "pausing at key moments..." tail ────
  { pos: 52, id: '69cfeeabecad19198e7eb479', label: 'A',
    from: 'Teaching students to construct mental images of characters, settings, and events while reading — pausing at key moments to describe what they see, hear, and sense in their minds',
    to:   'Teaching students to construct mental images of characters, settings, and events while reading' },

  // ── Q53 — Critical literacy (correct B): cut "to construct a richer..." tail ─
  { pos: 53, id: '69cfeeabecad19198e7eb47a', label: 'B',
    from: 'Critical literacy — evaluating different text types, considering author perspective and purpose, and synthesizing across sources to construct a richer understanding',
    to:   'Critical literacy — evaluating different text types, considering author perspective and purpose, and synthesizing across sources' },

  // ── Q61 — Genre conventions (correct B): cut "distinguishing them..." tail ───
  { pos: 61, id: '69cfeeabecad19198e7eb482', label: 'B',
    from: 'Understanding of genre conventions — that specific literary forms carry structural requirements distinguishing them from other forms',
    to:   'Understanding of genre conventions — that specific literary forms carry structural requirements' },

  // ── Q64 — Theme vs. plot (correct A): cut "and applies to human experience" ──
  { pos: 64, id: '69cfeeabecad19198e7eb485', label: 'A',
    from: 'Student C — articulates a universal life principle that transcends the specific story events and applies to human experience broadly',
    to:   'Student C — articulates a universal life principle that transcends the specific story events' },

  // ── Q65 — Conflict types: cut definitional glosses from all options ───────────
  { pos: 65, id: '69cfeeabecad19198e7eb486', label: 'A',
    from: 'Character versus nature conflict with environmental forces',
    to:   'Character versus nature conflict' },
  { pos: 65, id: '69cfeeabecad19198e7eb486', label: 'B',
    from: 'Character versus self conflict involving internal doubt',
    to:   'Character versus self conflict' },
  { pos: 65, id: '69cfeeabecad19198e7eb486', label: 'C',
    from: 'Character versus character conflict over a shared goal',
    to:   'Character versus character conflict' },
  { pos: 65, id: '69cfeeabecad19198e7eb486', label: 'D',
    from: 'Character versus society conflict with cultural expectations',
    to:   'Character versus society conflict' },

  // ── Q67 — Text structure gap (correct D): cut "and using a graphic org..." ───
  { pos: 67, id: '69cfeeabecad19198e7eb488', label: 'D',
    from: 'Explicitly teaching cause-and-effect signal words ("because," "therefore," "as a result") and using a graphic organizer that maps causes to their effects',
    to:   'Explicitly teaching cause-and-effect signal words ("because," "therefore," "as a result")' },

  // ── Q68 — Text walk (correct C): cut "to build a content framework..." tail ──
  { pos: 68, id: '69cfeeabecad19198e7eb489', label: 'C',
    from: 'Conducting a text walk in which students preview the diagram, table, bolded terms, and sidebar to build a content framework before reading the full prose',
    to:   'Conducting a text walk in which students preview the diagram, table, bolded terms, and sidebar' },

  // ── Q70 — Multimodal gap (correct B): cut "and needs explicit instruction..." ─
  { pos: 70, id: '69cfeeabecad19198e7eb48b', label: 'B',
    from: 'A multimodal reading gap — the student has not learned to read visual information in coordination with prose, and needs explicit instruction in integrating text and graphic sources',
    to:   'A multimodal reading gap — the student has not learned to read visual information in coordination with prose' },

  // ── Q72 — Signal words (correct A): cut "and use it as a framework..." tail ──
  { pos: 72, id: '69cfeeabecad19198e7eb48d', label: 'A',
    from: 'Preparing students to recognize compare-and-contrast text structure and use it as a framework for organizing their comprehension as they read',
    to:   'Preparing students to recognize compare-and-contrast text structure' },

  // ── Q73 — Inform vs. persuade (correct D): cut "asking whether..." tail ──────
  { pos: 73, id: '69cfeeabecad19198e7eb48e', label: 'D',
    from: "Guiding students to analyze each text's purpose, intended audience, and type of evidence — asking whether the author is explaining how something works or attempting to change the reader's behavior or beliefs",
    to:   "Guiding students to analyze each text's purpose, intended audience, and type of evidence" },

  // ── Q78 — Diagnostic after screen (correct B): cut "then use findings" tail ──
  { pos: 78, id: '69cfeeabecad19198e7eb493', label: 'B',
    from: "Administer diagnostic assessments to identify each student's specific skill gaps, then use those findings to design appropriately targeted interventions",
    to:   "Administer diagnostic assessments to identify each student's specific skill gaps" },

  // ── Q82 — IRI frustrational level (correct D): cut recommendation tail ───────
  { pos: 82, id: '69cfeeabecad19198e7eb497', label: 'D',
    from: "The student is receiving all reading instruction at the frustrational level, which produces comprehension breakdown and reading avoidance and should be immediately addressed by matching instructional materials to the student's instructional level",
    to:   'The student is receiving all reading instruction at the frustrational level, which produces comprehension breakdown and reading avoidance' },

  // ── Q85 — MTSS screener triage (correct B): cut "to determine..." tail ───────
  { pos: 85, id: '69cfeeabecad19198e7eb49a', label: 'B',
    from: 'Provide all 22 students with Tier 1 core instruction; deliver Tier 2 small-group intervention targeting the 5 some-risk students; conduct diagnostic follow-up for the 3 significant-risk students to determine specific skill gaps before assigning an intervention approach',
    to:   'Provide all 22 students with Tier 1 core instruction; deliver Tier 2 small-group intervention targeting the 5 some-risk students; conduct diagnostic follow-up for the 3 significant-risk students' },

  // ── Q86 — Formative assessment (correct C): cut "or which specific aspect..." ─
  { pos: 86, id: '69cfeeabecad19198e7eb49b', label: 'C',
    from: 'It is an informal formative check that provides quick whole-class feedback during instruction, but it does not reveal why individual students produced an incorrect response or which specific aspect of the pattern is misunderstood',
    to:   'It is an informal formative check that provides quick whole-class feedback during instruction, but it does not reveal why individual students produced an incorrect response' },

  // ── Q89 — Winter benchmark no growth (correct C): cut "and make data..." tail ─
  { pos: 89, id: '69cfeeabecad19198e7eb49e', label: 'C',
    from: "Convene a problem-solving team to review the intervention's fidelity and intensity and make data-based decisions about adjusting or intensifying the approach",
    to:   "Convene a problem-solving team to review the intervention's fidelity and intensity" },

  // ── Q94 — Family literacy (correct D): cut "explaining that..." rationale ─────
  { pos: 94, id: '69cfeeabecad19198e7eb4a3', label: 'D',
    from: 'Providing multilingual take-home books and encouraging families to engage in rich storytelling, discussion, and reading in the home language — explaining that home-language literacy and oral language strength directly support English literacy development',
    to:   'Providing multilingual take-home books and encouraging families to engage in rich storytelling, discussion, and reading in the home language' },

  // ── Q99 — Schedule misalignment (correct D): cut "that has already proven..." ─
  { pos: 99, id: '69cfeeabecad19198e7eb4a8', label: 'D',
    from: 'The schedule provides no time for differentiated small-group instruction, leaving the 42% of below-benchmark students with only the whole-class instruction that has already proven insufficient for them',
    to:   'The schedule provides no time for differentiated small-group instruction, leaving the 42% of below-benchmark students with only whole-class instruction' },
]

async function main() {
  await connectDB()

  // Group by question ID so we only load each question once
  const byId: Record<string, Trim[]> = {}
  for (const t of trims) {
    if (!byId[t.id]) byId[t.id] = []
    byId[t.id].push(t)
  }

  let applied = 0
  let errors = 0

  for (const [id, qTrims] of Object.entries(byId)) {
    const q = await Question.findById(id) as any
    if (!q) {
      console.error(`❌ Q${qTrims[0].pos} (${id}) not found`)
      errors++
      continue
    }

    for (const trim of qTrims) {
      const opt = q.options.find((o: any) => o.label === trim.label)
      if (!opt) {
        console.error(`❌ Q${trim.pos} option ${trim.label} not found`)
        errors++
        continue
      }
      if (opt.text !== trim.from) {
        console.warn(`⚠  Q${trim.pos} ${trim.label} text mismatch — skipping`)
        console.warn(`   Expected: ${trim.from.substring(0, 100)}`)
        console.warn(`   Found:    ${opt.text.substring(0, 100)}`)
        errors++
        continue
      }
      opt.text = trim.to
      console.log(`✓  Q${trim.pos} ${trim.label} → trimmed`)
      applied++
    }

    q.markModified('options')
    await q.save()
  }

  console.log(`\n─────────────────────────────`)
  console.log(`Done: ${applied} trims applied, ${errors} errors`)
  await mongoose.disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
