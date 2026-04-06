/**
 * Comprehensive review of PT2 questions for content issues
 * Run: npx tsx scripts/review-pt2-issues.ts
 */

import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })
import mongoose from 'mongoose'
import connectDB from '../lib/mongodb'
import Question from '../models/Question'
import PracticeTest from '../models/PracticeTest'

async function main() {
  await connectDB()

  const pt2 = await PracticeTest.findOne({ examCode: '190', testNumber: 2, isDiagnostic: false })
  if (!pt2) { console.error('PT2 not found'); process.exit(1) }

  const questions = await Question.find({ _id: { $in: pt2.questionIds } }).lean() as any[]

  const posMap: Record<string, number> = {}
  pt2.questionIds.forEach((id: mongoose.Types.ObjectId, i: number) => {
    posMap[id.toString()] = i + 1
  })

  console.log(`PT2: ${pt2.name} — ${questions.length} questions\n`)

  let issueCount = 0

  // 1. Explanation header letter mismatch
  console.log('─── 1. Explanation header mismatch (Correct Response: X ≠ correctAnswer) ───')
  questions.forEach(q => {
    const m = q.explanation.match(/^Correct Response:\s*([A-D])/)
    if (m && m[1] !== q.correctAnswer) {
      console.log(`  Q${posMap[q._id.toString()]}: stored=${q.correctAnswer}, header says=${m[1]}`)
      issueCount++
    }
  })
  if (issueCount === 0) console.log('  None.\n')
  else console.log()

  // 2. Explanation body calls correct answer "incorrect"
  let n = 0
  console.log('─── 2. Body says correct answer is incorrect ───')
  questions.forEach(q => {
    const matches = [...q.explanation.matchAll(/Option ([A-D]) is incorrect/gi)]
    matches.forEach(m => {
      if (m[1] === q.correctAnswer) {
        console.log(`  Q${posMap[q._id.toString()]}: correct=${q.correctAnswer}, but explanation says "Option ${m[1]} is incorrect"`)
        console.log(`    ${q.explanation.substring(0, 100)}...`)
        n++; issueCount++
      }
    })
  })
  if (n === 0) console.log('  None.\n')
  else console.log()

  // 3. Duplicate "Option X is incorrect" for same letter
  n = 0
  console.log('─── 3. Duplicate "Option X is incorrect" for same letter ───')
  questions.forEach(q => {
    const counts: Record<string, number> = {}
    const matches = [...q.explanation.matchAll(/Option ([A-D]) is incorrect/gi)]
    matches.forEach(m => { counts[m[1]] = (counts[m[1]] || 0) + 1 })
    Object.entries(counts).forEach(([letter, count]) => {
      if (count > 1) {
        console.log(`  Q${posMap[q._id.toString()]}: "Option ${letter} is incorrect" appears ${count}x`)
        n++; issueCount++
      }
    })
  })
  if (n === 0) console.log('  None.\n')
  else console.log()

  // 4. "effortful" where "effortless" is likely intended
  n = 0
  console.log('─── 4. "effortful" (check for effortless context) ───')
  questions.forEach(q => {
    const text = q.explanation + ' ' + q.questionText + ' ' + q.options.map((o: any) => o.text).join(' ')
    const matches = [...text.matchAll(/effortful/gi)]
    if (matches.length) {
      console.log(`  Q${posMap[q._id.toString()]}: contains "effortful"`)
      // Show context
      const idx = q.explanation.toLowerCase().indexOf('effortful')
      if (idx >= 0) console.log(`    ...${q.explanation.substring(Math.max(0, idx-40), idx+60)}...`)
      n++
    }
  })
  if (n === 0) console.log('  None.\n')
  else console.log()

  // 5. Wrong option count — explanations should address exactly 3 non-correct options
  n = 0
  console.log('─── 5. Missing or extra option explanations ───')
  questions.forEach(q => {
    const wrongOptions = ['A','B','C','D'].filter(l => l !== q.correctAnswer)
    const mentionedIncorrect = new Set<string>()
    const matches = [...q.explanation.matchAll(/Option ([A-D]) is incorrect/gi)]
    matches.forEach(m => mentionedIncorrect.add(m[1]))
    const missing = wrongOptions.filter(l => !mentionedIncorrect.has(l))
    const extra = [...mentionedIncorrect].filter(l => l === q.correctAnswer)
    if (missing.length > 0) {
      console.log(`  Q${posMap[q._id.toString()]}: missing explanation for option(s) ${missing.join(', ')} (correct=${q.correctAnswer})`)
      n++; issueCount++
    }
    if (extra.length > 0) {
      console.log(`  Q${posMap[q._id.toString()]}: explanation calls correct answer (${q.correctAnswer}) incorrect`)
      n++
    }
  })
  if (n === 0) console.log('  None.\n')
  else console.log()

  // 6. Explanation doesn't start with "Correct Response:"
  n = 0
  console.log('─── 6. Explanation missing "Correct Response:" header ───')
  questions.forEach(q => {
    if (!q.explanation.trim().startsWith('Correct Response:')) {
      console.log(`  Q${posMap[q._id.toString()]}: ${q.explanation.substring(0, 60)}...`)
      n++; issueCount++
    }
  })
  if (n === 0) console.log('  None.\n')
  else console.log()

  // 7. Options not exactly A, B, C, D
  n = 0
  console.log('─── 7. Options not exactly A/B/C/D ───')
  questions.forEach(q => {
    const labels = q.options.map((o: any) => o.label).sort().join('')
    if (labels !== 'ABCD') {
      console.log(`  Q${posMap[q._id.toString()]}: option labels = ${labels}`)
      n++; issueCount++
    }
  })
  if (n === 0) console.log('  None.\n')
  else console.log()

  // 8. correctAnswer not in options
  n = 0
  console.log('─── 8. correctAnswer not in options list ───')
  questions.forEach(q => {
    const optLabels = q.options.map((o: any) => o.label)
    if (!optLabels.includes(q.correctAnswer)) {
      console.log(`  Q${posMap[q._id.toString()]}: correctAnswer=${q.correctAnswer}, options=${optLabels.join(',')}`)
      n++; issueCount++
    }
  })
  if (n === 0) console.log('  None.\n')
  else console.log()

  // 9. Suspicious content — explanation body mentions a different letter as correct
  n = 0
  console.log('─── 9. Explanation body says different letter "is correct" ───')
  questions.forEach(q => {
    const matches = [...q.explanation.matchAll(/Option ([A-D]) is correct/gi)]
    matches.forEach(m => {
      if (m[1] !== q.correctAnswer) {
        console.log(`  Q${posMap[q._id.toString()]}: correct=${q.correctAnswer} but body says "Option ${m[1]} is correct"`)
        n++; issueCount++
      }
    })
  })
  if (n === 0) console.log('  None.\n')
  else console.log()

  // 10. Any question with "Option A is incorrect" but no explanation for A (i.e., Option mentioned wrong)
  // This catches cases where option letter in explanation doesn't match any distractor
  n = 0
  console.log('─── 10. Explanation mentions option letter that IS the correct answer as a distractor ───')
  questions.forEach(q => {
    const wrongOptions = ['A','B','C','D'].filter(l => l !== q.correctAnswer)
    const incorrectMatches = [...q.explanation.matchAll(/Option ([A-D]) is incorrect/gi)]
    incorrectMatches.forEach(m => {
      if (!wrongOptions.includes(m[1])) {
        console.log(`  Q${posMap[q._id.toString()]}: "Option ${m[1]} is incorrect" but ${m[1]} = correct answer`)
        n++; issueCount++
      }
    })
  })
  if (n === 0) console.log('  None.\n')
  else console.log()

  console.log(`═══ TOTAL ISSUES FOUND: ${issueCount} ═══`)

  await mongoose.disconnect()
}

main().catch(e => { console.error(e); process.exit(1) })
