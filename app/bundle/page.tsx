import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, BadgePercent } from 'lucide-react'
import { PRODUCTS, formatPrice } from '@/data/products'

export const metadata: Metadata = {
  title: 'Complete Prep Bundle',
  description:
    'Get the Complete Study Guide and Full-Length Practice Test together and save $10. The most comprehensive Foundations of Reading Test prep bundle available.',
}

export default function BundlePage() {
  const bundle = PRODUCTS.bundle
  const studyGuide = PRODUCTS.studyGuide
  const practiceTest = PRODUCTS.practiceTest

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Hero */}
      <section className="text-center">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-amber-800">
          <BadgePercent className="h-4 w-4" />
          BEST VALUE
        </span>
        <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Complete FORT Prep Bundle
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          {bundle.description}
        </p>
      </section>

      {/* Price + Buy */}
      <section className="mt-10 flex flex-col items-center gap-4">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900">
            {formatPrice(bundle.price)}
          </span>
          {bundle.comparePrice && (
            <span className="text-xl text-gray-400 line-through">
              {formatPrice(bundle.comparePrice)}
            </span>
          )}
        </div>
        <p className="text-sm font-medium text-green-600">Save $10 vs buying separately</p>
        <Link
          href="/checkout?product=bundle"
          className="rounded-lg bg-blue-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Buy Now
        </Link>
        <p className="text-sm text-gray-500">Instant PDF download</p>
      </section>

      {/* Bundle Features */}
      <section className="mt-14">
        <h2 className="text-xl font-bold text-gray-900">
          Everything You Need to Pass
        </h2>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {bundle.features.map((feature, i) => (
            <li key={i} className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4">
              <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
              <span className="text-sm text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* What's Included */}
      <section className="mt-14">
        <h2 className="text-xl font-bold text-gray-900">
          What&apos;s Included
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {/* Study Guide Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-bold text-gray-900">{studyGuide.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{studyGuide.tagline}</p>
            <ul className="mt-4 space-y-2">
              {studyGuide.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Practice Test Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-6">
            <h3 className="text-lg font-bold text-gray-900">{practiceTest.name}</h3>
            <p className="mt-1 text-sm text-gray-500">{practiceTest.tagline}</p>
            <ul className="mt-4 space-y-2">
              {practiceTest.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-blue-600" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="mt-14 rounded-2xl bg-blue-600 px-6 py-12 text-center sm:px-12">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Ready to Pass the FORT?
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-blue-100">
          Join thousands of aspiring teachers who have prepared with our comprehensive study materials.
        </p>
        <Link
          href="/checkout?product=bundle"
          className="mt-6 inline-block rounded-lg bg-white px-8 py-3 text-base font-semibold text-blue-600 transition-colors hover:bg-blue-50"
        >
          Get the Bundle for {formatPrice(bundle.price)}
        </Link>
      </section>
    </div>
  )
}
