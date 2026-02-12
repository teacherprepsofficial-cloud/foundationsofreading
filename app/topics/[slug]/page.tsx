import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BookOpen, Lightbulb, CheckCircle2, XCircle } from 'lucide-react'
import { getTopicBySlug, TOPICS } from '@/data/topics'
import { SUBAREA_COLORS } from '@/data/exam'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return TOPICS.map((topic) => ({ slug: topic.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const topic = getTopicBySlug(params.slug)
  if (!topic) return {}
  return {
    title: topic.title,
    description: topic.metaDescription,
  }
}

export default function TopicPage({ params }: PageProps) {
  const topic = getTopicBySlug(params.slug)
  if (!topic) notFound()

  const otherTopics = TOPICS.filter((t) => t.slug !== topic.slug)
  const subareaColor = SUBAREA_COLORS[topic.subareaNumber] || '#2563eb'

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Subarea Badge */}
      <div>
        <span
          className="inline-block rounded-full px-3 py-1 text-xs font-semibold text-white"
          style={{ backgroundColor: subareaColor }}
        >
          Subarea {topic.subareaNumber}: {topic.subareaName} &mdash; {topic.weight}
        </span>
      </div>

      {/* Title */}
      <h1 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
        {topic.title}
      </h1>

      {/* Introduction */}
      <p className="mt-6 text-lg leading-relaxed text-gray-600">
        {topic.introduction}
      </p>

      {/* Key Concepts */}
      <section className="mt-10">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-bold text-gray-900">Key Concepts</h2>
        </div>
        <ul className="mt-4 space-y-3">
          {topic.keyConcepts.map((concept, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
              <span className="mt-1 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600" />
              <span>{concept}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Key Terms */}
      {topic.keyTerms.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900">Key Terms</h2>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="pb-3 pr-4 font-semibold text-gray-900">Term</th>
                  <th className="pb-3 font-semibold text-gray-900">Definition</th>
                </tr>
              </thead>
              <tbody>
                {topic.keyTerms.map((term, i) => (
                  <tr key={i} className="border-b border-gray-100">
                    <td className="py-3 pr-4 font-medium text-gray-900 whitespace-nowrap">
                      {term.term}
                    </td>
                    <td className="py-3 text-gray-600">{term.definition}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Sample Question */}
      {topic.sampleQuestion && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900">Sample Question</h2>
          <div className="mt-4 rounded-xl border border-gray-200 bg-white p-6">
            <p className="font-medium text-gray-900">{topic.sampleQuestion.question}</p>
            <ul className="mt-4 space-y-2">
              {topic.sampleQuestion.options.map((option, i) => {
                const letter = String.fromCharCode(65 + i)
                const isCorrect = i === topic.sampleQuestion!.correctAnswer
                return (
                  <li
                    key={i}
                    className={`flex items-start gap-3 rounded-lg border p-3 text-sm ${
                      isCorrect
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-100 bg-gray-50'
                    }`}
                  >
                    {isCorrect ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                    ) : (
                      <XCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400" />
                    )}
                    <span className={isCorrect ? 'font-medium text-green-900' : 'text-gray-600'}>
                      {letter}. {option}
                    </span>
                  </li>
                )
              })}
            </ul>
            <div className="mt-4 rounded-lg bg-blue-50 p-4">
              <p className="text-sm font-semibold text-blue-900">Explanation</p>
              <p className="mt-1 text-sm text-blue-800">
                {topic.sampleQuestion.explanation}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* Study Tip */}
      <section className="mt-10">
        <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-5">
          <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
          <div>
            <p className="font-semibold text-amber-900">Study Tip</p>
            <p className="mt-1 text-sm text-amber-800">{topic.studyTip}</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-14 rounded-2xl bg-blue-600 px-6 py-12 text-center sm:px-12">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          Master This Topic and More
        </h2>
        <p className="mx-auto mt-3 max-w-2xl text-blue-100">
          Our study guide covers all 11 objectives in depth, and our practice test lets you apply what you&apos;ve learned.
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

      {/* Other Topics */}
      <section className="mt-14">
        <h2 className="text-xl font-bold text-gray-900">
          Explore Other Topics
        </h2>
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {otherTopics.map((t) => (
            <Link
              key={t.slug}
              href={`/topics/${t.slug}`}
              className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 text-sm transition-all hover:border-blue-300 hover:shadow-sm"
            >
              <span
                className="block h-2 w-2 flex-shrink-0 rounded-full"
                style={{ backgroundColor: SUBAREA_COLORS[t.subareaNumber] || '#2563eb' }}
              />
              <span className="text-gray-700">{t.title}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
