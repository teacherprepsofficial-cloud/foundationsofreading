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

// Clean SVG icons
function IconClipboard() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c1c2e" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
function IconBook() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c1c2e" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      <line x1="9" y1="7" x2="15" y2="7" />
      <line x1="9" y1="11" x2="15" y2="11" />
    </svg>
  )
}
function IconPencil() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c1c2e" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}
function IconSparkle() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c1c2e" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
    </svg>
  )
}
function IconCards() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c1c2e" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="16" height="13" rx="2" />
      <path d="M6 7V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-2" />
    </svg>
  )
}
function IconChart() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7c1c2e" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  )
}

const FEATURES = [
  { Icon: IconClipboard, title: 'Diagnostic Practice Test', desc: '25 MC + 1 written response across all 4 subareas. See exactly where you stand before you start studying.', href: '/free/diagnostic', cta: 'Try free sample →' },
  { Icon: IconBook, title: 'Complete Study Guide', desc: 'All 4 subareas, all 11 objectives covered in depth. Written specifically for this exam.', href: '/free/study-guide', cta: 'Read free preview →' },
  { Icon: IconPencil, title: '2–4 Full-Length Practice Tests', desc: '100 MC per test, timed, scored on the real 100–300 NES scale. Results mirror your actual score report.', href: '/free/practice-test', cta: 'Try 10-question sample →' },
  { Icon: IconSparkle, title: 'AI-Graded Written Responses', desc: 'Type your response. Get scored 0–2 with individualized feedback — same rubric as the real exam.', href: '/free/written-response', cta: 'Try one free →' },
  { Icon: IconCards, title: 'Flashcards + Vocab Matching', desc: '150+ terms across all objectives. Study with cards or the interactive matching game.', href: '/free/flashcards', cta: 'Try 10 sample cards →' },
  { Icon: IconChart, title: 'Real Exam Results Format', desc: 'Pass/Not Pass, scaled score, and subarea performance — identical to what you see on test day.', href: '/free/results-demo', cta: 'See example results →' },
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
                  NES Foundations of Reading 190 &amp; 890
                </p>
                <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl" style={{ fontFamily: 'var(--font-serif)' }}>
                  Pass the Foundations of Reading Test.
                </h1>
                <p className="mt-6 text-lg leading-relaxed text-[#f0d0d5]" style={{ fontFamily: 'var(--font-sans)' }}>
                  Our exam preparation program includes a diagnostic test, comprehensive study guide, timed practice tests, AI-graded constructed responses, and flashcards. Everything in one place.
                </p>
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
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>What&apos;s Included</p>
            <h2 className="mt-3 text-3xl font-bold text-[#1a1a1a] sm:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>A complete study system — not just notes.</h2>
            <div className="mt-12 grid gap-6 md:grid-cols-2">
              {FEATURES.map(({ Icon, title, desc, href, cta }) => (
                <a key={title} href={href} className="group flex gap-5 rounded-lg border border-[#e8e0e2] bg-white p-6 transition-all hover:border-[#7c1c2e] hover:shadow-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f3eef0]">
                    <Icon />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>{desc}</p>
                    <p className="mt-2 text-xs font-semibold text-[#7c1c2e] group-hover:underline" style={{ fontFamily: 'var(--font-sans)' }}>{cta}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Subareas */}
        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>Exam Structure</p>
            <h2 className="mt-3 text-3xl font-bold text-[#1a1a1a] sm:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>4 Subareas. 11 Objectives.</h2>
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
