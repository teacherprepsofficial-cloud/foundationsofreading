/**
 * Fix PT3 content issues
 * Run: npx tsx scripts/fix-pt3-issues.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Question from '../models/Question'

const fixes = [
  {
    id: '69cfeeabecad19198e7eb471', // Q44
    field: 'explanation',
    find: 'automatic, effortful reading',
    replace: 'automatic, effortless reading',
    desc: 'Q44: effortful → effortless',
  },
  {
    id: '69cfeeabecad19198e7eb473', // Q46
    field: 'explanation',
    // First "Option D" is about question-writing = actually Option A
    find: 'Option D is incorrect because QAR is a reading strategy for locating and generating answers, not primarily a question-writing instructional tool.',
    replace: 'Option A is incorrect because QAR is a reading strategy for locating and generating answers, not primarily a question-writing instructional tool.',
    desc: 'Q46: first Option D → Option A (question-writing)',
  },
  {
    id: '69cfeeabecad19198e7eb47b', // Q54
    field: 'explanation',
    // First "Option D" is about one strategy per year = Option A
    find: 'Option D is incorrect because proficient readers use multiple strategies flexibly; limiting instruction to one strategy per year fails to build the integrated, flexible strategy repertoire that supports comprehension across texts.',
    replace: 'Option A is incorrect because proficient readers use multiple strategies flexibly; limiting instruction to one strategy per year fails to build the integrated, flexible strategy repertoire that supports comprehension across texts.',
    desc: 'Q54: first Option D → Option A (one strategy per year)',
  },
  {
    id: '69cfeeabecad19198e7eb48a', // Q69
    field: 'explanation',
    // First "Option D" is about figurative language = Option A
    find: 'Option D is incorrect because figurative language analysis focuses on specific literary devices; the task described requires cross-text synthesis of informational content.',
    replace: 'Option A is incorrect because figurative language analysis focuses on specific literary devices; the task described requires cross-text synthesis of informational content.',
    desc: 'Q69: first Option D → Option A (figurative language)',
  },
  {
    id: '69cfeeabecad19198e7eb49d', // Q88
    field: 'explanation',
    // Stanine 4 is in the average range — "below-average-to-average zone" contradicts correct answer D
    find: 'A stanine of 4 places the student in the below-average-to-average zone, with 5 being the midpoint of the average band.',
    replace: 'A stanine of 4 places the student in the average range, with stanine 5 representing the midpoint of the average band.',
    desc: 'Q88: stanine 4 described as average range (not "below-average-to-average zone")',
  },
]

async function main() {
  await connectDB()

  for (const fix of fixes) {
    const q = await Question.findById(fix.id).lean() as any
    if (!q) { console.log(`SKIP: ${fix.id} not found`); continue }

    const current = q[fix.field] as string
    if (!current.includes(fix.find)) {
      console.log(`SKIP: "${fix.find.substring(0, 60)}" not found in Q ${fix.id}`)
      continue
    }

    const updated = current.replace(fix.find, fix.replace)
    await Question.findByIdAndUpdate(fix.id, { [fix.field]: updated })
    console.log(`✓ ${fix.desc}`)
  }

  console.log('\nAll PT3 fixes applied.')
  await mongoose.disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
