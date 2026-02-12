import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, BookOpen, FileText, Download, MapPin } from 'lucide-react'
import { EXAM_INFO, SUBAREA_COLORS } from '@/data/exam'
import { PRODUCTS, formatPrice } from '@/data/products'
import { STATES } from '@/data/states'
import { TOPICS } from '@/data/topics'
import { FaqSection } from '@/components/faq-section'

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
      {/* ─── Hero — Full-bleed photo with overlay ─── */}
      <section className="relative min-h-[520px] bg-gray-900">
        <Image
          src="/images/hero.jpg"
          alt="Students in a classroom"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-center px-6 py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-widest text-gold-400">
            FORT 190/890 Exam Preparation
          </p>
          <h1 className="mt-4 max-w-2xl font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Foundations of Reading Test Prep
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-gray-300">
            Comprehensive study guide and full-length practice test covering all 4
            subareas and 11 objectives. Required for teacher certification in 13 states.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/bundle"
              className="inline-flex items-center gap-2 rounded bg-gold-500 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gold-600"
            >
              <Download className="h-4 w-4" />
              Download Prep Bundle — {formatPrice(bundle.price)}
            </Link>
            <Link
              href="/study-guide"
              className="inline-flex items-center gap-2 rounded border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Study Guide
            </Link>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            Instant PDF download. One-time purchase. No subscription.
          </p>
        </div>
      </section>

      {/* ─── Key Stats Bar ─── */}
      <section className="border-b border-ivory-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 divide-x divide-ivory-200 sm:grid-cols-4">
          {[
            { value: '100+2', label: 'MCQ + CR Questions' },
            { value: '4 hrs', label: 'Testing Time' },
            { value: '13', label: 'States Require It' },
            { value: '61.5%', label: 'Fail Rate' },
          ].map((stat) => (
            <div key={stat.label} className="px-6 py-6 text-center">
              <p className="font-serif text-2xl font-bold text-maroon-800">{stat.value}</p>
              <p className="mt-1 text-xs text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── About the Exam — Two-column with image ─── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
              About the Exam
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
              What is the Foundations of Reading Test?
            </h2>
            <p className="mt-4 leading-relaxed text-gray-600">
              The Foundations of Reading Test (FORT), administered by Pearson as test
              code {EXAM_INFO.codes.join('/')}, assesses your knowledge of evidence-based
              reading instruction. It is required for teacher licensure in 13 states,
              primarily for elementary education and special education endorsements.
            </p>
            <p className="mt-4 leading-relaxed text-gray-600">
              The exam consists of {EXAM_INFO.totalQuestions} multiple-choice questions
              and {EXAM_INFO.constructedResponses} constructed response assignments.
              With a fail rate of {EXAM_INFO.passRate}%, thorough preparation is essential.
            </p>
            <hr className="my-6 border-ivory-200" />
            <div className="grid grid-cols-2 gap-6">
              {EXAM_INFO.subareas.map((sub) => (
                <div key={sub.number}>
                  <p className="font-serif text-lg font-bold text-gray-900">{sub.weight}%</p>
                  <p className="text-sm text-gray-600">{sub.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image
              src="/images/classroom.jpg"
              alt="Elementary classroom"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ─── Study Materials — resource cards, not SaaS pricing ─── */}
      <section className="border-y border-ivory-200 bg-ivory-100 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
              Preparation Materials
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
              Study Resources
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Digital downloads delivered instantly to your inbox. Study at your own pace.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {/* Study Guide */}
            <div className="flex flex-col rounded-lg border border-ivory-200 bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory-100">
                <BookOpen className="h-6 w-6 text-maroon-800" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-bold text-gray-900">
                {PRODUCTS.studyGuide.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                {PRODUCTS.studyGuide.description}
              </p>
              <div className="mt-6 flex items-baseline justify-between border-t border-ivory-200 pt-6">
                <span className="font-serif text-2xl font-bold text-gray-900">
                  {formatPrice(PRODUCTS.studyGuide.price)}
                </span>
                <Link
                  href="/study-guide"
                  className="text-sm font-semibold text-maroon-800 hover:text-maroon-900"
                >
                  Learn more &rarr;
                </Link>
              </div>
            </div>

            {/* Practice Test */}
            <div className="flex flex-col rounded-lg border border-ivory-200 bg-white p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-ivory-100">
                <FileText className="h-6 w-6 text-maroon-800" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-bold text-gray-900">
                {PRODUCTS.practiceTest.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                {PRODUCTS.practiceTest.description}
              </p>
              <div className="mt-6 flex items-baseline justify-between border-t border-ivory-200 pt-6">
                <span className="font-serif text-2xl font-bold text-gray-900">
                  {formatPrice(PRODUCTS.practiceTest.price)}
                </span>
                <Link
                  href="/practice-test"
                  className="text-sm font-semibold text-maroon-800 hover:text-maroon-900"
                >
                  Learn more &rarr;
                </Link>
              </div>
            </div>

            {/* Bundle */}
            <div className="relative flex flex-col rounded-lg border-2 border-gold-500 bg-white p-8">
              <span className="absolute -top-3 right-6 rounded bg-gold-500 px-3 py-1 text-xs font-bold text-white">
                SAVE $10
              </span>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-50">
                <Download className="h-6 w-6 text-gold-700" />
              </div>
              <h3 className="mt-5 font-serif text-xl font-bold text-gray-900">
                {PRODUCTS.bundle.name}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
                {PRODUCTS.bundle.description}
              </p>
              <div className="mt-6 flex items-baseline justify-between border-t border-ivory-200 pt-6">
                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-2xl font-bold text-gray-900">
                    {formatPrice(PRODUCTS.bundle.price)}
                  </span>
                  {PRODUCTS.bundle.comparePrice && (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(PRODUCTS.bundle.comparePrice)}
                    </span>
                  )}
                </div>
                <Link
                  href="/bundle"
                  className="text-sm font-semibold text-gold-700 hover:text-gold-800"
                >
                  Get bundle &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Exam Content Breakdown ─── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
            Exam Content
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            What&rsquo;s on the Test
          </h2>
          <p className="mt-3 max-w-2xl text-gray-600">
            The FORT covers 4 subareas with 11 objectives.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {EXAM_INFO.subareas.map((subarea) => (
              <div
                key={subarea.number}
                className="rounded-lg border border-ivory-200 bg-white p-6"
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded text-sm font-bold text-white"
                    style={{ backgroundColor: SUBAREA_COLORS[subarea.number] }}
                  >
                    {subarea.number}
                  </span>
                  <h3 className="font-serif text-lg font-semibold text-gray-900">
                    {subarea.name}
                  </h3>
                </div>
                <div className="mt-4 flex items-center gap-6 text-sm">
                  <span className="font-serif text-xl font-bold text-gray-900">{subarea.weight}%</span>
                  <span className="text-gray-500">{subarea.objectives.length} objectives</span>
                  <span className="text-gray-500">{subarea.questionRange} questions</span>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-ivory-100">
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
                      <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-gray-400" />
                      {obj.title}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── State Requirements ─── */}
      <section className="border-y border-ivory-200 bg-ivory-100 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-start gap-3">
            <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-maroon-800" />
            <div>
              <h2 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
                Required in 13 States
              </h2>
              <p className="mt-2 text-gray-600">
                Select your state for specific requirements and passing score.
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {STATES.map((state) => (
              <Link
                key={state.slug}
                href={`/states/${state.slug}`}
                className="group flex items-center justify-between rounded border border-ivory-200 bg-white px-5 py-3.5 transition-all hover:border-maroon-300 hover:shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="font-serif text-sm font-bold text-maroon-800">
                    {state.abbreviation}
                  </span>
                  <span className="text-sm text-gray-700">{state.name}</span>
                </div>
                <span className="rounded bg-ivory-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                  {state.passingScore}/300
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Study Topics ─── */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-gold-600">
            Study Topics
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
            What You&rsquo;ll Learn
          </h2>

          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS.filter((t) => t.objectiveNumber > 0).map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="group flex items-start gap-3 rounded border border-ivory-200 bg-white p-5 transition-all hover:border-maroon-300 hover:shadow-sm"
              >
                <span
                  className="mt-0.5 block h-2.5 w-2.5 flex-shrink-0 rounded-full"
                  style={{
                    backgroundColor: SUBAREA_COLORS[topic.subareaNumber] || '#6b1e1e',
                  }}
                />
                <div>
                  <p className="font-semibold text-gray-900 group-hover:text-maroon-800">
                    {topic.title}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Subarea {topic.subareaNumber} &middot; {topic.subareaName}
                  </p>
                </div>
              </Link>
            ))}
            <Link
              href="/topics/study-tips"
              className="group flex items-start gap-3 rounded border border-ivory-200 bg-white p-5 transition-all hover:border-maroon-300 hover:shadow-sm"
            >
              <BookOpen className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-500" />
              <div>
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

      {/* ─── FAQ ─── */}
      <FaqSection />

      {/* ─── Bottom CTA — photo background ─── */}
      <section className="relative bg-gray-900 py-16 sm:py-20">
        <Image
          src="/images/studying.jpg"
          alt="Person studying"
          fill
          className="object-cover opacity-20"
        />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
            Start Preparing Today
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-300">
            Get the study guide and practice test together and save. Everything
            you need to pass the Foundations of Reading Test.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/bundle"
              className="inline-flex items-center gap-2 rounded bg-gold-500 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-gold-600"
            >
              <Download className="h-4 w-4" />
              Download Prep Bundle
            </Link>
            <Link
              href="/study-guide"
              className="inline-flex items-center gap-2 rounded border border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              View Study Guide
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
