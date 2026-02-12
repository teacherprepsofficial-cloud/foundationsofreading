'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FaqItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is the Foundations of Reading Test?',
    answer:
      'The Foundations of Reading Test (FORT 190/890) is a standardized exam administered by Pearson that assesses a candidate\'s knowledge of evidence-based reading instruction. It is required for teacher certification in 13 states, primarily for elementary education and special education endorsements. The test covers phonological awareness, phonics, fluency, vocabulary, comprehension, and reading assessment.',
  },
  {
    question: 'How many questions are on the FORT?',
    answer:
      'The FORT contains 100 multiple-choice questions and 2 constructed response (open-response) written assignments. The multiple-choice questions account for 80% of your total score, while the two constructed responses account for 20% (10% each). You have 4 hours to complete the entire exam.',
  },
  {
    question: 'What is the passing score?',
    answer:
      'The passing score varies by state, ranging from 220 to 240 on a scale of 100-300. Most states require a score of 240. Alabama and Ohio have a lower threshold of 220, while Arkansas and Mississippi require 233. Check your state\'s specific requirements to know your target score.',
  },
  {
    question: 'How long is the exam?',
    answer:
      'You have 4 hours (240 minutes) to complete the entire FORT exam. This includes both the 100 multiple-choice questions and the 2 constructed response assignments. Your total appointment time at a testing center is 4 hours and 15 minutes, which includes check-in procedures. For online testing, the appointment window is 4 hours and 30 minutes.',
  },
  {
    question: 'What are the constructed response items?',
    answer:
      'The two constructed response (CR) items are open-ended written assignments. One focuses on foundational reading skills (phonemic awareness, phonics, fluency) and the other on reading comprehension (vocabulary, literary and informational text). Each prompt presents a classroom scenario with student data and asks you to analyze reading performance, identify strengths and needs, and recommend specific evidence-based strategies. Each CR is scored on a 4-point scale.',
  },
  {
    question: 'How hard is the Foundations of Reading Test?',
    answer:
      'The FORT has a pass rate of approximately 38.5%, meaning 61.5% of test-takers fail. However, with proper preparation and study of the key content areas, most candidates can pass. The test rewards understanding of the science of reading and evidence-based instructional practices. Candidates who study all 4 subareas systematically and practice writing constructed responses typically perform well.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="bg-ivory-100 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-600">
            Common questions about the Foundations of Reading Test
          </p>
        </div>

        <div className="mt-12 divide-y divide-ivory-200 border-t border-b border-ivory-200">
          {FAQ_ITEMS.map((item, index) => (
            <div key={index}>
              <button
                type="button"
                className="flex w-full items-center justify-between py-5 text-left"
                onClick={() => toggle(index)}
                aria-expanded={openIndex === index}
              >
                <span className="text-base font-semibold text-gray-900 pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 text-gray-500 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="pb-5 pr-12">
                  <p className="text-sm leading-relaxed text-gray-600">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
