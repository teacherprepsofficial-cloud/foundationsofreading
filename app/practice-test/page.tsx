import type { Metadata } from 'next'
import Link from 'next/link'
import { Check } from 'lucide-react'
import { PRODUCTS, formatPrice } from '@/data/products'
import { CtaBanner } from '@/components/cta-banner'

export const metadata: Metadata = {
  title: 'Full-Length Practice Test',
  description:
    'Full-length FORT practice test with 100 multiple-choice questions and 2 constructed response prompts. Detailed answer explanations and score breakdown by subarea.',
}

export default function PracticeTestPage() {
  const product = PRODUCTS.practiceTest

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Hero */}
      <section className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
          Practice Test
        </p>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
          Full-Length FORT Practice Test
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
          href="/checkout?product=practice-test"
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
        <ul className="mt-6 space-y-3">
          {product.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4">
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Exam Match */}
      <section className="mt-14 rounded-xl border border-gray-200 bg-gray-50 p-6">
        <h2 className="text-xl font-bold text-gray-900">
          Matches the Real Exam
        </h2>
        <p className="mt-2 text-gray-600">
          Our practice test mirrors the actual Foundations of Reading Test in every way:
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg bg-white p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">100</p>
            <p className="text-sm text-gray-500">Multiple-choice questions</p>
          </div>
          <div className="rounded-lg bg-white p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">2</p>
            <p className="text-sm text-gray-500">Constructed responses</p>
          </div>
          <div className="rounded-lg bg-white p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">4</p>
            <p className="text-sm text-gray-500">Subareas covered</p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="mt-16">
        <CtaBanner
          heading="Save $10 with the Complete Bundle"
          subtext="Get the Practice Test and Study Guide together for just $59.99 — everything you need to pass the FORT."
          buttonText="View Bundle"
          buttonHref="/bundle"
        />
      </section>
    </div>
  )
}
