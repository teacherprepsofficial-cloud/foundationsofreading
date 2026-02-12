import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { EXAM_INFO, SUBAREA_COLORS } from '@/data/exam'
import { PRODUCTS, formatPrice } from '@/data/products'
import { STATES } from '@/data/states'
import { TOPICS } from '@/data/topics'
import { ProductCard } from '@/components/product-card'
import { StateCard } from '@/components/state-card'
import { ExamFacts } from '@/components/exam-facts'
import { FaqSection } from '@/components/faq-section'
import { CtaBanner } from '@/components/cta-banner'

export const metadata: Metadata = {
  title: 'Pass the Foundations of Reading Test | FORT 190/890 Study Guide & Practice Test',
  description:
    'Comprehensive study guide and full-length practice test for the Foundations of Reading Test (FORT 190/890). Required in 13 states for teacher certification. 61.5% of test-takers fail — be prepared.',
  openGraph: {
    title: 'Pass the Foundations of Reading Test | FORT 190/890 Prep',
    description:
      'Study guide, practice test, and everything you need to pass the FORT. Required in 13 states. 61.5% fail rate — be prepared.',
    url: 'https://foundationsofreading.com',
  },
}

export default function HomePage() {
  const bundle = PRODUCTS.bundle

  return (
    <>
      {/* ─── Hero Section ─── */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-b from-ivory-100/60 to-white" />
        <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-serif text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Pass the Foundations of Reading Test
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600 sm:text-xl">
              Comprehensive study guide and full-length practice test for the
              FORT {EXAM_INFO.codes.join('/')}. Required in 13 states for teacher
              certification.
            </p>

            {/* Stat callout */}
            <div className="mx-auto mt-8 inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-5 py-2.5">
              <span className="text-2xl font-bold text-red-600">
                {EXAM_INFO.passRate}%
              </span>
              <span className="text-sm font-medium text-red-700">
                of test-takers fail. Be prepared.
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/bundle"
                className="inline-flex items-center gap-2 rounded-lg bg-maroon-800 px-8 py-4 text-base font-semibold text-white shadow-sm transition-colors hover:bg-maroon-900"
              >
                Get the Bundle &mdash; {formatPrice(bundle.price)}
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/study-guide"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-8 py-4 text-base font-semibold text-gray-700 transition-colors hover:bg-gray-50"
              >
                View Study Guide
              </Link>
            </div>

            <p className="mt-4 text-sm text-gray-500">
              Instant digital download. One-time purchase.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Exam Quick Facts ─── */}
      <ExamFacts />

      {/* ─── What's On the Test ─── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
              What&#39;s On the Test
            </h2>
            <p className="mt-3 text-gray-600">
              The FORT covers 4 subareas with 11 objectives. Here&#39;s how the test breaks down.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {EXAM_INFO.subareas.map((subarea) => (
              <div
                key={subarea.number}
                className="rounded-xl border border-ivory-200 bg-white p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-bold text-white"
                      style={{ backgroundColor: SUBAREA_COLORS[subarea.number] }}
                    >
                      {subarea.number}
                    </span>
                    <h3 className="font-serif text-lg font-semibold text-gray-900">
                      {subarea.name}
                    </h3>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-6">
                  <div>
                    <p className="text-2xl font-bold text-gray-900">{subarea.weight}%</p>
                    <p className="text-xs text-gray-500">of total score</p>
                  </div>
                  <div className="h-8 w-px bg-ivory-200" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {subarea.objectives.length}
                    </p>
                    <p className="text-xs text-gray-500">
                      objective{subarea.objectives.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="h-8 w-px bg-ivory-200" />
                  <div>
                    <p className="text-2xl font-bold text-gray-900">
                      {subarea.questionRange}
                    </p>
                    <p className="text-xs text-gray-500">questions</p>
                  </div>
                </div>

                {/* Weight bar */}
                <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${subarea.weight}%`,
                      backgroundColor: SUBAREA_COLORS[subarea.number],
                    }}
                  />
                </div>

                <ul className="mt-4 space-y-1.5">
                  {subarea.objectives.map((obj) => (
                    <li key={obj.number} className="flex items-start gap-2 text-sm text-gray-600">
                      <span
                        className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-xs font-medium text-white"
                        style={{ backgroundColor: SUBAREA_COLORS[subarea.number] }}
                      >
                        {obj.number}
                      </span>
                      {obj.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Products Section ─── */}
      <section className="bg-ivory-100 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
              Everything You Need to Pass
            </h2>
            <p className="mt-3 text-gray-600">
              Digital downloads delivered instantly. Study at your own pace.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            <ProductCard product={PRODUCTS.studyGuide} />
            <ProductCard product={PRODUCTS.bundle} featured />
            <ProductCard product={PRODUCTS.practiceTest} />
          </div>
        </div>
      </section>

      {/* ─── State Requirements Grid ─── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
              Required in 13 States
            </h2>
            <p className="mt-3 text-gray-600">
              Click your state to see specific requirements and passing score.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STATES.map((state) => (
              <StateCard key={state.slug} state={state} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Study Topics ─── */}
      <section className="bg-ivory-100 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="text-center">
            <h2 className="font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
              What You&#39;ll Learn
            </h2>
            <p className="mt-3 text-gray-600">
              In-depth study guides for every objective on the FORT exam.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS.filter((t) => t.objectiveNumber > 0).map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="group flex items-start gap-4 rounded-xl border border-ivory-200 bg-white p-5 transition-all hover:border-maroon-300 hover:shadow-sm"
              >
                <span
                  className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                  style={{
                    backgroundColor:
                      SUBAREA_COLORS[topic.subareaNumber] || '#6b7280',
                  }}
                >
                  {topic.objectiveNumber}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-gray-900 group-hover:text-maroon-800">
                    {topic.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Subarea {topic.subareaNumber}: {topic.subareaName}
                  </p>
                </div>
              </Link>
            ))}
            {/* Study Tips link */}
            <Link
              href="/topics/study-tips"
              className="group flex items-start gap-4 rounded-xl border border-ivory-200 bg-white p-5 transition-all hover:border-maroon-300 hover:shadow-sm"
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gray-700 text-sm font-bold text-white">
                <BookOpen className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 group-hover:text-maroon-800">
                  How to Study for the FORT
                </p>
                <p className="mt-1 text-xs text-gray-500">
                  Study strategies and exam day tips
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <FaqSection />

      {/* ─── CTA Banner ─── */}
      <CtaBanner />
    </>
  )
}
