'use client'

import { useState } from 'react'

interface Objective {
  num: number
  title: string
  description: string
}

interface Subarea {
  roman: string
  name: string
  weight: string
  questions: string
  color: string
  objectives: Objective[]
}

const SUBAREAS: Subarea[] = [
  {
    roman: 'I',
    name: 'Foundations of Reading Development',
    weight: '35%',
    questions: '35–37 MC questions',
    color: '#7c1c2e',
    objectives: [
      {
        num: 1,
        title: 'Phonological and Phonemic Awareness',
        description: 'Ability to identify and manipulate sounds in spoken language — including rhyme, syllable segmentation, onset-rime, phoneme isolation, blending, segmenting, and deletion.',
      },
      {
        num: 2,
        title: 'Concepts of Print and the Alphabetic Principle',
        description: 'Understanding how print works — directionality, letter-sound correspondence, and the systematic relationship between phonemes and graphemes.',
      },
      {
        num: 3,
        title: 'Phonics and Decoding',
        description: 'Systematic application of letter-sound knowledge to read words, including consonant patterns, vowel patterns, blends, digraphs, and multisyllabic word strategies.',
      },
      {
        num: 4,
        title: 'Word Analysis and Spelling',
        description: 'Morphemic analysis, syllabication, structural analysis, prefix/suffix/root knowledge, and spelling developmental stages.',
      },
    ],
  },
  {
    roman: 'II',
    name: 'Development of Reading Comprehension',
    weight: '27%',
    questions: '25–29 MC questions',
    color: '#7c1c2e',
    objectives: [
      {
        num: 5,
        title: 'Vocabulary Development',
        description: 'Direct and indirect vocabulary instruction, academic language, context clues, word relationships, and the relationship between vocabulary and comprehension.',
      },
      {
        num: 6,
        title: 'Reading Fluency',
        description: 'Accuracy, automaticity, rate, and prosody. Evidence-based fluency instruction including repeated reading, partner reading, and reader\'s theater.',
      },
      {
        num: 7,
        title: 'Reading Comprehension Strategies',
        description: 'Before, during, and after reading strategies — prediction, questioning, visualization, inferencing, summarizing, and monitoring for understanding.',
      },
    ],
  },
  {
    roman: 'III',
    name: 'Reading Assessment and Instruction',
    weight: '21%',
    questions: '19–23 MC questions',
    color: '#7c1c2e',
    objectives: [
      {
        num: 8,
        title: 'Assessment of Reading Development',
        description: 'Screening, diagnostic, progress monitoring, and outcome assessment tools. Using data to identify at-risk readers and guide instructional decisions.',
      },
      {
        num: 9,
        title: 'Reading Instruction and Intervention',
        description: 'Evidence-based reading programs, differentiated instruction, the multi-tiered support system (MTSS), and targeted intervention for struggling readers.',
      },
    ],
  },
  {
    roman: 'IV',
    name: 'Integration of Knowledge and Understanding',
    weight: '17%',
    questions: '2 written responses',
    color: '#7c1c2e',
    objectives: [
      {
        num: 10,
        title: 'Constructed Response 1 — Case Study Analysis',
        description: 'Analyze a reading case study or student work sample. Apply knowledge from all subareas to identify instructional implications and explain evidence-based responses.',
      },
      {
        num: 11,
        title: 'Constructed Response 2 — Instructional Planning',
        description: 'Synthesize foundational reading knowledge to develop or evaluate an instructional plan. Demonstrate deep understanding of reading theory and practice.',
      },
    ],
  },
]

export function SubareaGrid() {
  const [open, setOpen] = useState<Subarea | null>(null)

  return (
    <>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {SUBAREAS.map((s) => (
          <button
            key={s.roman}
            onClick={() => setOpen(s)}
            className="flex items-start gap-4 rounded-lg border border-[#e8e0e2] bg-white p-6 text-left transition-all hover:border-[#7c1c2e] hover:shadow-sm"
          >
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded text-sm font-bold text-white"
              style={{ backgroundColor: s.color, fontFamily: 'var(--font-sans)' }}
            >
              {s.roman}
            </span>
            <div>
              <p className="font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>{s.name}</p>
              <p className="mt-1 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                {s.weight} &middot; {s.questions}
              </p>
              <p className="mt-1 text-xs text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
                {s.objectives.length} objectives — click to explore
              </p>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="sticky top-0 flex items-start justify-between gap-4 rounded-t-xl border-b border-[#e8e0e2] bg-[#7c1c2e] px-6 py-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>
                  Subarea {open.roman} · {open.weight}
                </p>
                <h3 className="mt-1 text-xl font-bold text-white" style={{ fontFamily: 'var(--font-serif)' }}>{open.name}</h3>
                <p className="mt-0.5 text-sm text-[#f0d0d5]" style={{ fontFamily: 'var(--font-sans)' }}>{open.questions}</p>
              </div>
              <button
                onClick={() => setOpen(null)}
                className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/20 text-white hover:bg-white/30"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {/* Objectives */}
            <div className="divide-y divide-[#e8e0e2] px-6">
              {open.objectives.map((obj) => (
                <div key={obj.num} className="py-5">
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f3eef0] text-xs font-bold text-[#7c1c2e]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {obj.num}
                    </span>
                    <div>
                      <p className="font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>{obj.title}</p>
                      <p className="mt-1.5 text-sm leading-relaxed text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>{obj.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 pb-6">
              <a
                href="#pricing"
                onClick={() => setOpen(null)}
                className="block w-full rounded bg-[#7c1c2e] py-3 text-center text-sm font-semibold text-white hover:bg-[#5a1220]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Get Full Prep for This Exam
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
