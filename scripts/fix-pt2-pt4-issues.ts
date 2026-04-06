/**
 * Fix PT2 and PT4 content issues
 * Run: npx tsx scripts/fix-pt2-pt4-issues.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Question from '../models/Question'

const fixes = [
  {
    id: '69cfec4d41d84bf7e32bdddd', // PT2 Q23 — truncated explanation
    field: 'explanation',
    find: 'Correct Response: B. Beck\'s Tier 2 words are high-frequency academic words that appear across multiple subject areas and text types, making them high-value targets for explicit vocabulary instruction. "Scarce" fits this tier because students will encounter it in social studies, economics, and literary texts, not just science. ',
    replace: 'Correct Response: B. Beck\'s Tier 2 words are high-frequency academic words that appear across multiple subject areas and text types, making them high-value targets for explicit vocabulary instruction. "Scarce" fits this tier because students will encounter it in social studies, economics, and literary texts, not just science. Option A is incorrect because Tier 1 words are basic, everyday words that most students already know through oral language experience (e.g., "happy," "run," "big"); they do not require explicit instruction. Option C is incorrect because Tier 3 words are low-frequency, domain-specific technical terms used primarily within a single content area (e.g., "photosynthesis," "chlorophyll"); "scarce" is a general academic word that crosses disciplines, not a domain-specific technical term. Option D is incorrect because Beck\'s vocabulary framework uses three tiers only; Tier 4 is not a recognized category in this framework.',
    desc: 'PT2 Q23: add missing distractor explanations for Options A, C, D',
  },
  {
    id: '69cfec5ae07395d6959c454d', // PT4 Q81 — second "Option B" should be "Option A"
    field: 'explanation',
    find: 'Option B is incorrect because a grade equivalent is not a percent-correct score; the two score types are completely different measures.',
    replace: 'Option A is incorrect because a grade equivalent is not a percent-correct score; the two score types are completely different measures.',
    desc: 'PT4 Q81: second "Option B" → "Option A" (percent-correct = Option A)',
  },
  {
    id: '69cfec5ae07395d6959c4550', // PT4 Q84 — second "Option A" should be "Option B"
    field: 'explanation',
    find: 'Option A is incorrect because norm-referenced assessments compare students to a normative sample and typically use standardized test formats that do not offer multiple response options.',
    replace: 'Option B is incorrect because norm-referenced assessments compare students to a normative sample and typically use standardized test formats that do not offer multiple response options.',
    desc: 'PT4 Q84: second "Option A" → "Option B" (norm-referenced = Option B)',
  },
  {
    id: '69cfec5ae07395d6959c455a', // PT4 Q94 — second "Option A" should be "Option C"
    field: 'explanation',
    find: 'Option A is incorrect because reducing independent reading time removes the very practice students need to build fluency and a reading habit; the solution should address motivation, not eliminate the opportunity to read.',
    replace: 'Option C is incorrect because reducing independent reading time removes the very practice students need to build fluency and a reading habit; the solution should address motivation, not eliminate the opportunity to read.',
    desc: 'PT4 Q94: second "Option A" → "Option C" (reduce reading time = Option C)',
  },
  {
    id: '69cfec5ae07395d6959c455d', // PT4 Q97 — second "Option A" should be "Option C"
    field: 'explanation',
    find: 'Option A is incorrect because MTSS frameworks typically describe three tiers; Tier 4 is not a standard tier in most MTSS models.',
    replace: 'Option C is incorrect because MTSS frameworks typically describe three tiers; Tier 4 is not a standard tier in most MTSS models.',
    desc: 'PT4 Q97: second "Option A" → "Option C" (Tier 4 = Option C)',
  },
]

async function main() {
  await connectDB()

  for (const fix of fixes) {
    const q = await Question.findById(fix.id).lean() as any
    if (!q) { console.log(`SKIP: ${fix.id} not found`); continue }

    const current = q[fix.field] as string
    if (!current.includes(fix.find)) {
      console.log(`SKIP: text not found in ${fix.id}`)
      console.log(`  Looking for: "${fix.find.substring(0, 80)}..."`)
      continue
    }

    const updated = current.replace(fix.find, fix.replace)
    await Question.findByIdAndUpdate(fix.id, { [fix.field]: updated })
    console.log(`✓ ${fix.desc}`)
  }

  console.log('\nAll PT2/PT4 fixes applied.')
  await mongoose.disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
