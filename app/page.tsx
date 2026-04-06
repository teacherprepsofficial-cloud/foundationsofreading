import type { Metadata } from 'next'
import { PricingSection } from '@/components/pricing-section'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { SubareaGrid } from '@/components/subarea-modal'
import { HeroImage } from '@/components/hero-image'

export const metadata: Metadata = {
  title: 'Pass the NES Foundations of Reading Test | Interactive Online Prep',
  description:
    'The most complete prep for the NES Foundations of Reading (190 & 890). Diagnostic test, full study guide, 4 practice tests, AI-graded written responses, flashcards, and more. 30-day access.',
}


const FAQS = [
  {
    q: "What's the difference between the 190 and the 890?",
    a: "Different test editions used in different states. The content and format are essentially the same — both assess knowledge of evidence-based reading instruction. Your state determines which number you take.",
  },
  {
    q: 'How long does my access last?',
    a: 'As long as your subscription is active. Cancel anytime from your account — no contracts, no commitment. Most students pass within 30–60 days.',
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
    a: 'Yes — billed monthly, cancel anytime. You keep full access as long as your subscription is active. Cancel before your next billing date and you won\'t be charged again.',
  },
  {
    q: 'When can I start after purchasing?',
    a: 'Immediately. You\'ll receive an email within seconds of checkout with a link to set your password and access your dashboard.',
  },
]


const FEATURES = [
  { img: '/features/diagnostic.jpg', title: 'Diagnostic Practice Test', desc: '25 MC + 1 written response across all 4 subareas. See exactly where you stand before you start studying.', href: '/free/diagnostic', cta: 'Try free sample →' },
  { img: '/features/study-guide.jpg', title: 'Complete Study Guide', desc: 'All 4 subareas, all 11 objectives covered in depth. Written specifically for this exam.', href: '/free/study-guide', cta: 'Read free preview →' },
  { img: '/features/practice-tests.jpg', title: '2–4 Full-Length Practice Tests', desc: '100 MC per test, timed, scored on the real 100–300 NES scale. Results mirror your actual score report.', href: '/free/practice-test', cta: 'Try 10-question sample →' },
  { img: '/features/written-response.jpg', title: 'AI-Graded Written Responses', desc: 'Type your response. Get scored 0–2 with individualized feedback — same rubric as the real exam.', href: '/free/written-response', cta: 'Try one free →' },
  { img: '/features/flashcards.jpg', title: 'Flashcards + Vocab Matching', desc: '150+ terms across all objectives. Study with cards or the interactive matching game.', href: '/free/flashcards', cta: 'Try 10 sample cards →' },
  { img: '/features/exam-results.jpg', title: 'Real Exam Results Format', desc: 'Pass/Not Pass, scaled score, and subarea performance — identical to what you see on test day.', href: '/free/results-demo', cta: 'See example results →' },
]

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="bg-[#7c1c2e] text-white">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>
                  Foundations of Reading Exam Preparation
                </p>
                <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>
                  Passing the Foundations of Reading Test Made Simple.
                </h1>
                <ul className="mt-6 space-y-2.5">
                  {[
                    'Diagnostic practice test',
                    'Full study guide — all 4 subareas',
                    'Timed full-length practice tests',
                    'AI-graded constructed responses',
                    'Flashcards + vocab matching',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-3 text-base text-[#f0d0d5]" style={{ fontFamily: 'var(--font-sans)' }}>
                      <span className="text-[#39ff14] font-bold text-lg leading-none">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <a href="#pricing" className="inline-flex items-center justify-center rounded bg-white px-8 py-4 text-sm font-semibold text-[#7c1c2e] transition-colors hover:bg-[#f9f0f2]" style={{ fontFamily: 'var(--font-sans)' }}>
                    Get Instant Access
                  </a>
                  <a href="#what-you-get" className="inline-flex items-center justify-center rounded border border-white/40 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-white/10" style={{ fontFamily: 'var(--font-sans)' }}>
                    See What&apos;s Included
                  </a>
                </div>
                <p className="mt-5 text-sm text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>
                  Get instant access, and put yourself on the path to pass.
                </p>
              </div>

              <HeroImage />
            </div>
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
          <div className="mx-auto max-w-6xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>What&apos;s Included</p>
            <h2 className="mt-3 text-3xl font-bold text-[#1a1a1a] sm:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>Everything You Need To Pass in One Place.</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map(({ img, title, desc, href, cta }) => (
                <div key={title} className="flex flex-col overflow-hidden rounded-lg border border-[#e8e0e2] bg-white shadow-sm">
                  <div className="h-48 w-full overflow-hidden">
                    <img src={img} alt={title} className="h-full w-full object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>{title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>{desc}</p>
                    <a
                      href={href}
                      className="mt-5 inline-flex w-full items-center justify-center rounded bg-[#7c1c2e] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#6a1726]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Subareas */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Exam Structure</p>
            <h2 className="mt-3 text-3xl font-bold text-[#1a1a1a] sm:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>Our Prep Aligns Exactly To Your Exam.</h2>
            <p className="mt-2 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>Click any subarea to explore the objectives it covers.</p>
            <SubareaGrid />
          </div>
        </section>

        {/* Pricing */}
        <PricingSection />

        {/* FAQ */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>FAQ</p>
            <h2 className="mt-3 text-3xl font-bold text-[#1a1a1a] sm:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>Common questions.</h2>
            <div className="mt-10 space-y-0 divide-y divide-[#e8e0e2] border-y border-[#e8e0e2]">
              {FAQS.map((faq) => (
                <div key={faq.q} className="py-6">
                  <p className="font-semibold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>{faq.q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="bg-[#7c1c2e] py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-3xl font-bold text-white sm:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>Start preparing today.</h2>
            <p className="mx-auto mt-4 max-w-md text-lg text-[#f0d0d5]" style={{ fontFamily: 'var(--font-sans)' }}>Monthly subscription. Cancel anytime. Everything included.</p>
            <a
              href="#pricing"
              className="mt-10 inline-flex items-center justify-center rounded bg-white px-10 py-4 text-sm font-semibold text-[#7c1c2e] transition-colors hover:bg-[#f9f0f2]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Get Instant Access
            </a>
            <p className="mt-4 text-sm text-[#e8b4bc]" style={{ fontFamily: 'var(--font-sans)' }}>Monthly subscription · Cancel anytime · Instant access</p>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  )
}
