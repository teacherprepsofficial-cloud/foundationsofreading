import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, BookOpen, FileText, PenTool, BarChart3 } from 'lucide-react'
import { PRODUCTS, formatPrice } from '@/data/products'
import { EXAM_INFO } from '@/data/exam'
import { CtaBanner } from '@/components/cta-banner'

export const metadata: Metadata = {
  title: 'Complete Study Guide',
  description:
    'Comprehensive FORT study guide covering all 4 subareas and 11 objectives of the Foundations of Reading Test. Key terms, strategies, and constructed response tips.',
}

const SUBAREA_ICONS = [BookOpen, FileText, BarChart3, PenTool]

export default function StudyGuidePage() {
  const product = PRODUCTS.studyGuide

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Hero */}
      <section className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Study Guide
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
          Foundations of Reading Complete Study Guide
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          {product.description}
        </p>
      </section>

      {/* Price + Buy */}
      <section className="mt-10 flex flex-col items-center gap-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
        </div>
        <Link
          href="/checkout?product=study-guide"
          className="rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Buy Now
        </Link>
        <p className="text-sm text-gray-500">Instant PDF download</p>
      </section>

      {/* Features */}
      <section className="mt-14">
        <h2 className="text-xl font-bold text-gray-900">
          What You Get
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4">
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What's Covered */}
      <section className="mt-14">
        <h2 className="text-xl font-bold text-gray-900">
          What&apos;s Covered
        </h2>
        <p className="mt-2 text-gray-600">
          All 4 subareas and 11 objectives of the Foundations of Reading Test.
        </p>
        <div className="mt-6 space-y-6">
          {EXAM_INFO.subareas.map((subarea, idx) => {
            const Icon = SUBAREA_ICONS[idx]
            return (
              <div
                key={subarea.number}
                className="rounded-xl border border-gray-200 bg-white p-6"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Subarea {subarea.number}: {subarea.name}
                    </h3>
                    <p className="text-sm text-gray-500">{subarea.weight}% of the exam</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {subarea.objectives.map((obj) => (
                    <li key={obj.number} className="flex items-start gap-2 text-sm text-gray-600">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                        {obj.number}
                      </span>
                      <span>
                        <span className="font-medium text-gray-900">{obj.title}</span>
                        {' '}&mdash; {obj.description}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mt-16">
        <CtaBanner
          heading="Save $10 with the Complete Bundle"
          subtext="Get the Study Guide and Practice Test together for just $59.99 — everything you need to pass the FORT."
          buttonText="View Bundle"
          buttonHref="/bundle"
        />
      </section>
    </div>
  )
}
