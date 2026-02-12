import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { MapPin, Award, FileText, Clock, DollarSign, ExternalLink } from 'lucide-react'
import { getStateBySlug, STATES } from '@/data/states'
import { EXAM_INFO } from '@/data/exam'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return STATES.map((state) => ({ slug: state.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const state = getStateBySlug(params.slug)
  if (!state) return {}
  return {
    title: `Foundations of Reading Test in ${state.name} | Passing Score ${state.passingScore}`,
    description: `Everything you need to know about the Foundations of Reading Test (FORT) in ${state.name}. Passing score: ${state.passingScore}. Test code: ${state.testCode}. Registration, study tips, and prep materials.`,
  }
}

export default function StatePage({ params }: PageProps) {
  const state = getStateBySlug(params.slug)
  if (!state) notFound()

  const otherStates = STATES.filter((s) => s.slug !== state.slug)

  const faqItems = [
    {
      question: `What is the passing score for the Foundations of Reading Test in ${state.name}?`,
      answer: `The passing score for the Foundations of Reading Test in ${state.name} is ${state.passingScore} on a scale of ${EXAM_INFO.scoreScale}.`,
    },
    {
      question: 'How many questions are on the FORT?',
      answer: `The Foundations of Reading Test has ${EXAM_INFO.totalQuestions} multiple-choice questions and ${EXAM_INFO.constructedResponses} open-response constructed response items.`,
    },
    {
      question: 'How long is the Foundations of Reading Test?',
      answer: `You have ${EXAM_INFO.timeLimitMinutes / 60} hours of testing time. Appointment time at a testing center is ${EXAM_INFO.appointmentTimeCenter}; online proctoring appointments are ${EXAM_INFO.appointmentTimeOnline}.`,
    },
    {
      question: `Can I retake the FORT in ${state.name}?`,
      answer: `Yes. If you do not pass, you must wait at least ${EXAM_INFO.retakeWaitDays} days before retaking the exam. There is no limit on the number of attempts, but you must pay the $${EXAM_INFO.testFee} registration fee each time.`,
    },
  ]

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section>
        <div className="flex items-center gap-2 text-sm text-blue-600">
          <MapPin className="h-4 w-4" />
          <span>{state.abbreviation}</span>
        </div>
        <h1 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">
          Foundations of Reading Test in {state.name}
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          The Foundations of Reading Test (FORT) is required in {state.name} for {state.requiredFor}. Here is everything you need to know about taking the exam in {state.name}, including the passing score, registration process, and how to prepare.
        </p>
      </section>

      {/* Quick Facts */}
      <section className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-5 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
            <Award className="h-5 w-5 text-blue-600" />
          </div>
          <p className="mt-3 text-lg font-bold text-gray-900">{state.passingScore}</p>
          <p className="mt-1 text-sm text-gray-500">Passing Score</p>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-5 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <p className="mt-3 text-lg font-bold text-gray-900">{state.testCode}</p>
          <p className="mt-1 text-sm text-gray-500">Test Code</p>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-5 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
            <DollarSign className="h-5 w-5 text-blue-600" />
          </div>
          <p className="mt-3 text-lg font-bold text-gray-900">${EXAM_INFO.testFee}</p>
          <p className="mt-1 text-sm text-gray-500">Test Fee</p>
        </div>
        <div className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-5 text-center">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <p className="mt-3 text-lg font-bold text-gray-900">{EXAM_INFO.timeLimitMinutes / 60} hrs</p>
          <p className="mt-1 text-sm text-gray-500">Time Limit</p>
        </div>
      </section>

      {/* State-specific info */}
      <section className="mt-10 rounded-xl border border-gray-200 bg-white p-6">
        <h2 className="text-xl font-bold text-gray-900">
          {state.name} Licensure Information
        </h2>
        <p className="mt-2 text-gray-600">
          The FORT is administered by {EXAM_INFO.provider} and is required in {state.name} for {state.requiredFor}.
        </p>
        {state.additionalNotes && (
          <p className="mt-2 text-sm text-gray-500">{state.additionalNotes}</p>
        )}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <a
            href={state.licensureUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            {state.licensureBoard}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
          <a
            href={state.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            Register for the Exam
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* Exam Content Breakdown */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">
          Exam Content Breakdown
        </h2>
        <p className="mt-2 text-gray-600">
          The FORT covers 4 subareas. The content is the same regardless of which state you test in.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="pb-3 pr-4 font-semibold text-gray-900">Subarea</th>
                <th className="pb-3 pr-4 font-semibold text-gray-900">Weight</th>
                <th className="pb-3 font-semibold text-gray-900">Questions</th>
              </tr>
            </thead>
            <tbody>
              {EXAM_INFO.subareas.map((subarea) => (
                <tr key={subarea.number} className="border-b border-gray-100">
                  <td className="py-3 pr-4 text-gray-700">
                    {subarea.number}. {subarea.name}
                  </td>
                  <td className="py-3 pr-4 font-medium text-gray-900">{subarea.weight}%</td>
                  <td className="py-3 text-gray-600">{subarea.questionRange}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* How to Register */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">
          How to Register in {state.name}
        </h2>
        <ol className="mt-4 space-y-4">
          {[
            `Visit the ${state.name} testing portal at ${state.registrationUrl} and create a Pearson account.`,
            `Select test code ${state.testCode} (Foundations of Reading).`,
            'Choose to test at a Pearson VUE testing center or via online proctoring.',
            `Pay the $${EXAM_INFO.testFee} registration fee and select your preferred date and time.`,
            'On test day, bring your valid government-issued ID and arrive early.',
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                {i + 1}
              </span>
              <p className="text-gray-700">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="mt-10">
        <h2 className="text-xl font-bold text-gray-900">
          Frequently Asked Questions
        </h2>
        <div className="mt-4 space-y-4">
          {faqItems.map((item, i) => (
            <div key={i} className="rounded-xl border border-gray-200 bg-white p-5">
              <h3 className="font-semibold text-gray-900">{item.question}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-14 rounded-2xl bg-blue-600 px-6 py-12 text-center sm:px-12">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Prepare for the FORT in {state.name}
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-blue-100">
          Our study guide and practice test cover all 4 subareas and 11 objectives. Be ready on exam day.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/bundle"
            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 transition-colors hover:bg-blue-50"
          >
            Get the Prep Bundle
          </Link>
          <Link
            href="/study-guide"
            className="rounded-lg border border-blue-400 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Study Guide
          </Link>
        </div>
      </section>

      {/* Other States */}
      <section className="mt-14">
        <h2 className="text-xl font-bold text-gray-900">
          FORT Requirements in Other States
        </h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {otherStates.map((s) => (
            <Link
              key={s.slug}
              href={`/states/${s.slug}`}
              className="flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-all hover:border-blue-300 hover:shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="font-bold text-blue-600">{s.abbreviation}</span>
                <span className="text-gray-700">{s.name}</span>
              </div>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-600">
                {s.passingScore}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
