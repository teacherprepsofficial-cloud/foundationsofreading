import type { Metadata } from 'next'
import { CountdownBanner } from '@/components/countdown-banner'
import { PricingSection } from '@/components/pricing-section'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Pass the NES Foundations of Reading Test | Interactive Online Prep',
  description:
    'The most complete prep for the NES Foundations of Reading (190 & 890). Diagnostic test, full study guide, 4 practice tests, AI-graded written responses, flashcards, and more. 30-day access.',
}

const SUBAREAS = [
  { roman: 'I', name: 'Foundations of Reading Development', weight: '35%', questions: '35–37 questions', color: '#7c1c2e' },
  { roman: 'II', name: 'Development of Reading Comprehension', weight: '27%', questions: '25–29 questions', color: '#9b2439' },
  { roman: 'III', name: 'Reading Assessment and Instruction', weight: '21%', questions: '19–23 questions', color: '#b52b44' },
  { roman: 'IV', name: 'Integration of Knowledge and Understanding', weight: '17%', questions: '2 written responses', color: '#c73350' },
]

const STARTER_INCLUDES = [
  'Module 1: Complete test overview & what to expect on exam day',
  'Diagnostic Practice Test (25 MC + 1 written response)',
  'Full Study Guide — all 4 subareas, all 11 objectives',
  '2 Full-Length Timed Practice Tests (100 MC each)',
  'Scores on real NES 100–300 scale with Pass/Not Pass',
  'Subarea performance breakdown — identical to your real score report',
  '4 AI-Graded Written Response prompts with rubric feedback',
  'Flashcard deck (150+ terms)',
  'Interactive Vocabulary Matching activity',
  '30-day full access',
]

const BUNDLE_ADDS = [
  '2 additional full-length Practice Tests (Tests 3 & 4)',
  '4 additional AI-Graded Written Response prompts',
]

const STATES = [
  { code: 'AZ', state: 'Arizona', exam: '890' },
  { code: 'ID', state: 'Idaho', exam: '190' },
  { code: 'IN', state: 'Indiana', exam: '190' },
  { code: 'KY', state: 'Kentucky', exam: '190' },
  { code: 'MA', state: 'Massachusetts', exam: '190' },
  { code: 'NM', state: 'New Mexico', exam: '190' },
  { code: 'OH', state: 'Ohio', exam: '190' },
  { code: 'OK', state: 'Oklahoma', exam: '190' },
  { code: 'OR', state: 'Oregon', exam: '190' },
  { code: 'UT', state: 'Utah', exam: '190' },
  { code: 'VA', state: 'Virginia', exam: '190' },
  { code: 'WA', state: 'Washington', exam: '190' },
  { code: 'WI', state: 'Wisconsin', exam: '190' },
]

const FAQS = [
  {
    q: "What's the difference between the 190 and the 890?",
    a: "Different test editions used in different states. The content and format are essentially the same — both assess knowledge of evidence-based reading instruction. Your state determines which number you take.",
  },
  {
    q: 'How long does my access last?',
    a: '30 days from the date of purchase. That gives you plenty of time to complete the diagnostic, work through the study guide, and take all your practice tests.',
  },
  {
    q: "What's the AI-graded written response?",
    a: 'The real exam has 2 open-ended written assignments. You type your response, and our system scores it 0–2 using the same rubric framework as the NES — with specific feedback on what to improve.',
  },
  {
    q: 'How are practice test scores reported?',
    a: 'On the 100–300 NES scaled score. Passing is 220 in most states. Your results page shows your score, pass/not pass status, and performance in each subarea — exactly like the real score report.',
  },
  {
    q: 'Is this a subscription?',
    a: 'No. One payment, 30-day access. No recurring charges ever.',
  },
]

export default function HomePage() {
  return (
    <>
      <CountdownBanner />
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="bg-[#7c1c2e] text-white">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <p className="text-sm font-medium uppercase tracking-widest text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>
              NES Foundations of Reading 190 &amp; 890
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>
              Pass the Foundations of Reading Test.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#f0d0d5]" style={{ fontFamily: 'var(--font-sans)' }}>
              Diagnostic test, complete study guide, timed practice tests, AI-graded written responses, flashcards, and real-exam results pages. Everything in one place. 30-day access.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <a href="#pricing" className="inline-flex items-center justify-center rounded bg-white px-8 py-4 text-sm font-semibold text-[#7c1c2e] hover:bg-[#f9f0f2]" style={{ fontFamily: 'var(--font-sans)' }}>
                Get Instant Access
              </a>
              <a href="#what-you-get" className="inline-flex items-center justify-center rounded border border-white/30 px-8 py-4 text-sm font-semibold text-white hover:bg-white/10" style={{ fontFamily: 'var(--font-sans)' }}>
                See What&apos;s Included
              </a>
            </div>
            <p className="mt-5 text-sm text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>
              One-time payment. Instant access. No subscription.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-b border-[#e8e0e2] bg-white">
          <div className="mx-auto grid max-w-5xl grid-cols-2 divide-x divide-[#e8e0e2] sm:grid-cols-4">
            {[
              { value: '100 MC', label: 'Multiple-Choice Questions' },
              { value: '2', label: 'Written Response Items' },
              { value: '4 hrs', label: 'Time Limit' },
              { value: '61.5%', label: 'Fail Rate' },
            ].map((s) => (
              <div key={s.label} className="px-6 py-7 text-center">
                <p className="text-2xl font-bold text-[#7c1c2e]" style={{ fontFamily: 'var(--font-serif)' }}>{s.value}</p>
                <p className="mt-1 text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section id="what-you-get" className="bg-[#faf8f5] py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>What&apos;s Included</p>
            <h2 className="mt-3 text-3xl font-bold text-[#1a1a1a] sm:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>A complete study system — not just notes.</h2>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              {[
                { icon: '📋', title: 'Diagnostic Practice Test', desc: '25 MC + 1 written response, distributed across all 4 subareas. See exactly where you stand before you start studying.' },
                { icon: '📖', title: 'Complete Study Guide', desc: 'All 4 subareas, all 11 objectives covered in depth. Written specifically for this exam.' },
                { icon: '📝', title: '2–4 Full-Length Practice Tests', desc: '100 MC per test, timed, scored on the real 100–300 NES scale. Results mirror your actual score report.' },
                { icon: '✍️', title: 'AI-Graded Written Responses', desc: "Type your response. Get scored 0–2 with individualized feedback — same rubric as the real exam." },
                { icon: '🃏', title: 'Flashcards + Vocab Matching', desc: '150+ terms across all objectives. Study with cards or the interactive matching game.' },
                { icon: '📊', title: 'Real Exam Results Format', desc: 'Pass/Not Pass, scaled score, and subarea performance — identical to what you see on test day.' },
              ].map((f) => (
                <div key={f.title} className="rounded-lg border border-[#e8e0e2] bg-white p-7">
                  <p className="text-2xl">{f.icon}</p>
                  <h3 className="mt-4 text-lg font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subareas */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Exam Structure</p>
            <h2 className="mt-3 text-3xl font-bold text-[#1a1a1a] sm:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>4 Subareas. 11 Objectives.</h2>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {SUBAREAS.map((s) => (
                <div key={s.roman} className="flex items-start gap-4 rounded-lg border border-[#e8e0e2] bg-white p-6">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded text-sm font-bold text-white" style={{ backgroundColor: s.color, fontFamily: 'var(--font-sans)' }}>{s.roman}</span>
                  <div>
                    <p className="font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>{s.name}</p>
                    <p className="mt-1 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>{s.weight} &middot; {s.questions}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Includes */}
        <section className="border-y border-[#e8e0e2] bg-[#faf8f5] py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Starter — $49</p>
                <h3 className="mt-3 text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>Everything you need to pass.</h3>
                <ul className="mt-6 space-y-3">
                  {STARTER_INCLUDES.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
                      <span className="mt-0.5 text-[#7c1c2e]">✓</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Bundle adds</p>
                <h3 className="mt-3 text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>More practice. More confidence.</h3>
                <ul className="mt-6 space-y-3">
                  {BUNDLE_ADDS.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
                      <span className="mt-0.5 text-[#7c1c2e]">+</span>{item}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 rounded-lg border-2 border-[#7c1c2e] bg-white p-6">
                  <p className="text-sm font-semibold text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Only $10 more.</p>
                  <p className="mt-1 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>2 more full tests + 4 more AI-graded writing prompts for $59 total. Most people who want to feel fully prepared choose the bundle.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* States */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Who Needs This</p>
            <h2 className="mt-3 text-3xl font-bold text-[#1a1a1a] sm:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>Required in 13+ states.</h2>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {STATES.map((s) => (
                <div key={s.code} className="flex items-center justify-between rounded border border-[#e8e0e2] bg-white px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>{s.code}</span>
                    <span className="text-sm text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>{s.state}</span>
                  </div>
                  <span className="text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>{s.exam}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <PricingSection />

        {/* FAQ */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <h2 className="text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>Questions</h2>
            <div className="mt-8 space-y-6">
              {FAQS.map((faq) => (
                <div key={faq.q} className="border-b border-[#e8e0e2] pb-6">
                  <p className="font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>{faq.q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#7c1c2e] py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>Start preparing today.</h2>
            <p className="mx-auto mt-4 max-w-xl text-[#f0d0d5]" style={{ fontFamily: 'var(--font-sans)' }}>30-day access. Everything included. One payment.</p>
            <a href="#pricing" className="mt-8 inline-flex items-center justify-center rounded bg-white px-10 py-4 text-sm font-semibold text-[#7c1c2e] hover:bg-[#f9f0f2]" style={{ fontFamily: 'var(--font-sans)' }}>
              Get Instant Access
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
