/**
 * Search PT3 questions for known content issues
 * Run: npx tsx scripts/find-pt3-issues.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Question from '../models/Question'
import PracticeTest from '../models/PracticeTest'

async function main() {
  await connectDB()

  const pt3 = await PracticeTest.findOne({ examCode: '190', testNumber: 3, isDiagnostic: false })
  if (!pt3) { console.error('PT3 not found'); process.exit(1) }

  const questions = await Question.find({ _id: { $in: pt3.questionIds } }).lean()

  // Map ID → position
  const posMap: Record<string, number> = {}
  pt3.questionIds.forEach((id: mongoose.Types.ObjectId, i: number) => {
    posMap[id.toString()] = i + 1
  })

  console.log(`Searching ${questions.length} PT3 questions for known issues...\n`)

  type Q = { _id: mongoose.Types.ObjectId; questionText: string; explanation: string; options: {label: string; text: string}[]; correctAnswer: string; subarea: string; objectiveNumber: number }

  // Issue 1: "effortful" when it should be "effortless"
  const effortful = questions.filter((q: Q) =>
    q.explanation.toLowerCase().includes('effortful') ||
    q.questionText.toLowerCase().includes('effortful') ||
    q.options.some((o: {label: string; text: string}) => o.text.toLowerCase().includes('effortful'))
  ) as Q[]
  if (effortful.length) {
    console.log('=== "effortful" found ===')
    effortful.forEach((q: Q) => {
      const pos = posMap[q._id.toString()]
      console.log(`Q${pos} (${q._id}): ${q.questionText.substring(0, 80)}`)
      // Show which field contains it
      if (q.explanation.toLowerCase().includes('effortful')) {
        const idx = q.explanation.toLowerCase().indexOf('effortful')
        console.log(`  EXPLANATION: ...${q.explanation.substring(Math.max(0,idx-30), idx+50)}...`)
      }
      q.options.forEach((o: {label: string; text: string}) => {
        if (o.text.toLowerCase().includes('effortful')) console.log(`  OPTION ${o.label}: ${o.text}`)
      })
      console.log()
    })
  } else {
    console.log('No "effortful" issues found.\n')
  }

  // Issue 2: Duplicate "Option D is incorrect" in explanation
  const dupD = questions.filter((q: Q) => {
    const count = (q.explanation.match(/Option D is incorrect/gi) || []).length
    return count > 1
  }) as Q[]
  if (dupD.length) {
    console.log('=== Duplicate "Option D is incorrect" ===')
    dupD.forEach((q: Q) => {
      const pos = posMap[q._id.toString()]
      console.log(`Q${pos} (${q._id}): ${q.questionText.substring(0, 80)}`)
      console.log(`EXPLANATION:\n${q.explanation}\n`)
    })
  } else {
    console.log('No duplicate "Option D is incorrect" found.\n')
  }

  // Issue 3: stanine description
  const stanine = questions.filter((q: Q) =>
    q.explanation.toLowerCase().includes('stanine') ||
    q.questionText.toLowerCase().includes('stanine')
  ) as Q[]
  if (stanine.length) {
    console.log('=== Stanine questions ===')
    stanine.forEach((q: Q) => {
      const pos = posMap[q._id.toString()]
      console.log(`Q${pos} (${q._id}): ${q.questionText.substring(0, 80)}`)
      console.log(`EXPLANATION:\n${q.explanation}\n`)
    })
  } else {
    console.log('No stanine issues found.\n')
  }

  // Issue 4: Any question where explanation letter doesn't match correctAnswer
  console.log('=== Explanation header mismatches ===')
  const mismatches = questions.filter((q: Q) => {
    const match = q.explanation.match(/^Correct Response:\s*([A-D])/)
    if (!match) return false
    return match[1] !== q.correctAnswer
  }) as Q[]
  if (mismatches.length) {
    mismatches.forEach((q: Q) => {
      const pos = posMap[q._id.toString()]
      const match = q.explanation.match(/^Correct Response:\s*([A-D])/)
      console.log(`Q${pos}: stored correct=${q.correctAnswer}, explanation says=${match![1]}`)
    })
  } else {
    console.log('None found.\n')
  }

  // Issue 5: Option where explanation body says "Option X is incorrect" but X = correctAnswer
  console.log('\n=== Explanation body letter errors ===')
  const bodyErrors = questions.filter((q: Q) => {
    const matches = q.explanation.matchAll(/Option ([A-D]) is incorrect/gi)
    for (const m of matches) {
      if (m[1] === q.correctAnswer) return true
    }
    return false
  }) as Q[]
  if (bodyErrors.length) {
    bodyErrors.forEach((q: Q) => {
      const pos = posMap[q._id.toString()]
      console.log(`Q${pos}: correct=${q.correctAnswer}, explanation body calls it incorrect`)
      console.log(`  ${q.explanation}\n`)
    })
  } else {
    console.log('None found.\n')
  }

  // Issue 6: Any option where explanation says "Option X is correct" but X != correctAnswer
  console.log('=== Explanation says wrong option is correct ===')
  const wrongCorrect = questions.filter((q: Q) => {
    const matches = q.explanation.matchAll(/Option ([A-D]) is correct/gi)
    for (const m of matches) {
      if (m[1] !== q.correctAnswer) return true
    }
    return false
  }) as Q[]
  if (wrongCorrect.length) {
    wrongCorrect.forEach((q: Q) => {
      const pos = posMap[q._id.toString()]
      console.log(`Q${pos}: correct=${q.correctAnswer}`)
      console.log(`  ${q.explanation}\n`)
    })
  } else {
    console.log('None found.\n')
  }

  await mongoose.disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
