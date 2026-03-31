'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'

const SECTIONS = [
  {
    id: 'overview',
    title: 'What is the NES Foundations of Reading Test?',
    content: `The NES Foundations of Reading test (code 190 and 890) is a teacher certification exam administered by Pearson that assesses your knowledge of evidence-based reading instruction. It is required for teacher licensure in 13+ states, primarily for elementary education and special education candidates.

The exam is designed to ensure that teachers entering classrooms have the foundational knowledge needed to teach reading effectively — understanding phonics, phonemic awareness, reading comprehension, vocabulary, fluency, and how to assess and instruct students at different reading levels.`,
  },
  {
    id: 'format',
    title: 'Exam Format',
    content: `The exam consists of:
• 100 Multiple-Choice Questions — each with 4 answer choices (A, B, C, D)
• 2 Open-Response Items (Written Assignments) — you write extended responses evaluated by trained scorers

Time Limit: 4 hours (240 minutes) total
Appointment Time: 4 hours 15 minutes at a testing center (includes check-in time)
Delivery: Computer-based at Pearson VUE testing centers

Test Fee: $139 (varies by state)
Score Reporting: Approximately 5 weeks after testing`,
  },
  {
    id: 'subareas',
    title: 'The 4 Subareas',
    content: `Your score is broken down into 4 subareas:

SUBAREA I — Foundations of Reading Development (35% / 35–37 questions)
Covers phonological awareness, phonemic awareness, phonics, word recognition, word analysis skills, and reading fluency. This is the largest section.

SUBAREA II — Development of Reading Comprehension (27% / 25–29 questions)
Covers vocabulary development, academic language, background knowledge, comprehension of literary texts, comprehension of informational texts, and reading engagement.

SUBAREA III — Reading Assessment and Instruction (21% / 19–23 questions)
Covers formal and informal assessment, data-based instruction, intervention strategies, and supporting diverse learners.

SUBAREA IV — Integration of Knowledge and Understanding (17% / 2 written responses)
This is the open-response section. You will respond in writing to two prompts — one focused on Foundational Reading Skills and one on Reading Comprehension. Responses are scored 0–2 based on a rubric.`,
  },
  {
    id: 'scoring',
    title: 'How Scoring Works',
    content: `The NES Foundations of Reading test uses a scaled score system:
• Score range: 100–300
• Passing score: 220 in most states (check your state's specific requirement)
• Your actual score is NOT reported if you pass — only "Met the Requirement" appears on your official score report for passing candidates

Score Breakdown:
• Multiple-choice questions are worth 83% of your total score
• Open-response items are worth 17% of your total score

Subarea Performance Report:
You receive a diagnostic breakdown showing your performance in each subarea:
• Multiple-Choice: Most/Many/Some/Few items answered correctly
• Open-Response: Thorough/Adequate/Limited/Weak

Our practice tests replicate this exact format.`,
  },
  {
    id: 'passing',
    title: 'What Does It Take to Pass?',
    content: `The fail rate for the NES Foundations of Reading test is approximately 61.5% — meaning most first-time test takers do NOT pass. This is one of the most challenging teacher certification exams.

The most common reasons candidates fail:
• Underestimating the depth of phonics knowledge required
• Weak constructed-response writing (not enough specificity or pedagogical depth)
• Running out of time (100 questions + 2 essays in 4 hours is demanding)
• Not studying the assessment and instruction subarea (often neglected)

How to pass:
1. Work through the entire study guide, not just the areas you feel confident about
2. Practice the constructed-response writing multiple times — it accounts for 17% of your score
3. Take all practice tests under timed conditions
4. Pay special attention to Subarea I (Foundations of Reading Development) — it's 35% of the exam`,
  },
  {
    id: 'next',
    title: 'Your Study Program',
    content: `Here is how your prep is structured:

Step 1 — Diagnostic Test (coming next)
A shortened practice test that shows you exactly where you stand right now. 25 MC + 1 written response across all subareas. This helps you understand which areas need the most attention before you start studying.

Step 2 — Study Guide
After your diagnostic, the full study guide opens. Work through all 4 subareas systematically.

Step 3 — Practice Tests
Take 2 (or 4 with bundle) full-length timed tests. Each one is scored on the 100–300 NES scale with a full subarea breakdown.

Step 4 — Written Response Practice
Submit written responses to practice prompts. Get scored 0–2 with specific feedback on how to improve.

Step 5 — Flashcards & Vocabulary
Reinforce key terms and concepts. The vocab matching activity is a great way to self-test quickly.

You have 30 days of access. Most candidates who work through all the material spend 2–4 weeks preparing. Start your diagnostic now.`,
  },
]

export default function Module1Page() {
  const params = useParams()
  const router = useRouter()
  const examCode = params.examCode as string
  const [currentSection, setCurrentSection] = useState(0)
  const [completing, setCompleting] = useState(false)

  const section = SECTIONS[currentSection]
  const isLast = currentSection === SECTIONS.length - 1

  async function handleComplete() {
    setCompleting(true)
    await fetch('/api/progress', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        examCode,
        updates: { module1Completed: true, module1CompletedAt: new Date() },
      }),
    })
    router.push(`/dashboard/${examCode}`)
  }

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      {/* Header */}
      <div className="bg-[#7c1c2e] px-6 py-6">
        <div className="mx-auto max-w-3xl">
          <Link href={`/dashboard/${examCode}`} className="text-sm text-[#e8b4bc] hover:text-white" style={{ fontFamily: 'var(--font-sans)' }}>
            ← Back to Dashboard
          </Link>
          <h1 className="mt-2 text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>
            Module 1: About This Test
          </h1>
          <p className="mt-1 text-sm text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>
            {currentSection + 1} of {SECTIONS.length}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-6 py-10">
        {/* Progress */}
        <div className="flex gap-1.5 mb-8">
          {SECTIONS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentSection(i)}
              className={`h-1.5 flex-1 rounded-full transition-colors ${i <= currentSection ? 'bg-[#7c1c2e]' : 'bg-[#e8e0e2]'}`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="rounded-lg border border-[#e8e0e2] bg-white p-8">
          <h2 className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
            {section.title}
          </h2>
          <div className="mt-6 whitespace-pre-line text-[#1a1a1a] leading-relaxed" style={{ fontFamily: 'var(--font-sans)', fontSize: '15px' }}>
            {section.content}
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-6 flex justify-between">
          <button
            onClick={() => setCurrentSection((s) => Math.max(0, s - 1))}
            disabled={currentSection === 0}
            className="rounded border border-[#e8e0e2] bg-white px-6 py-2.5 text-sm font-semibold text-[#6b6b6b] disabled:opacity-40 hover:border-[#7c1c2e]"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Previous
          </button>
          {isLast ? (
            <button
              onClick={handleComplete}
              disabled={completing}
              className="rounded bg-[#7c1c2e] px-8 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220] disabled:opacity-60"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {completing ? 'Saving...' : 'Complete Module 1 →'}
            </button>
          ) : (
            <button
              onClick={() => setCurrentSection((s) => s + 1)}
              className="rounded bg-[#7c1c2e] px-8 py-2.5 text-sm font-semibold text-white hover:bg-[#5a1220]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
