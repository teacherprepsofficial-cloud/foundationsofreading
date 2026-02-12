import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, FileText, Package } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About',
  description:
    'About Foundations of Reading Test Prep. We help aspiring teachers pass the FORT with comprehensive study guides and practice tests.',
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
        About Foundations of Reading Test Prep
      </h1>

      <div className="mt-8 space-y-6 text-gray-600 leading-relaxed">
        <p>
          We help aspiring teachers pass the Foundations of Reading Test (FORT) on their first attempt. The FORT is required for teacher licensure in 13 states, and with a pass rate of only 61.5%, preparation is essential.
        </p>
        <p>
          Our study materials are built by educators who understand the exam inside and out. Every study guide section, practice question, and constructed response tip is aligned with the evidence-based reading instruction principles tested on the FORT.
        </p>
        <p>
          We believe every aspiring teacher deserves affordable, high-quality test prep. Our materials cover all 4 subareas and 11 objectives of the exam, giving you the knowledge and confidence you need to succeed.
        </p>
      </div>

      <section className="mt-12">
        <h2 className="font-serif text-xl font-bold text-gray-900">Our Products</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link
            href="/study-guide"
            className="flex flex-col items-center rounded-xl border border-ivory-200 bg-white p-6 text-center transition-all hover:border-maroon-300 hover:shadow-md"
          >
            <BookOpen className="h-8 w-8 text-maroon-800" />
            <p className="mt-3 font-semibold text-gray-900">Study Guide</p>
            <p className="mt-1 text-sm text-gray-500">All 11 objectives covered</p>
          </Link>
          <Link
            href="/practice-test"
            className="flex flex-col items-center rounded-xl border border-ivory-200 bg-white p-6 text-center transition-all hover:border-maroon-300 hover:shadow-md"
          >
            <FileText className="h-8 w-8 text-maroon-800" />
            <p className="mt-3 font-semibold text-gray-900">Practice Test</p>
            <p className="mt-1 text-sm text-gray-500">100 MCQ + 2 CR prompts</p>
          </Link>
          <Link
            href="/bundle"
            className="flex flex-col items-center rounded-xl border border-ivory-200 bg-white p-6 text-center transition-all hover:border-maroon-300 hover:shadow-md"
          >
            <Package className="h-8 w-8 text-maroon-800" />
            <p className="mt-3 font-semibold text-gray-900">Prep Bundle</p>
            <p className="mt-1 text-sm text-gray-500">Save $10 on both</p>
          </Link>
        </div>
      </section>
    </div>
  )
}
