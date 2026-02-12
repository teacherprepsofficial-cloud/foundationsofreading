import { EXAM_INFO } from '@/data/exam'
import { BookOpen, Clock, FileText, Award, DollarSign, BarChart3 } from 'lucide-react'

const facts = [
  {
    icon: FileText,
    label: 'Questions',
    value: `${EXAM_INFO.totalQuestions} MCQ + ${EXAM_INFO.constructedResponses} CR`,
  },
  {
    icon: Clock,
    label: 'Time Limit',
    value: `${EXAM_INFO.timeLimitMinutes / 60} Hours`,
  },
  {
    icon: Award,
    label: 'Score Range',
    value: EXAM_INFO.scoreScale,
  },
  {
    icon: BarChart3,
    label: 'Pass Rate',
    value: `${100 - EXAM_INFO.passRate}%`,
    subtext: 'of test-takers pass',
  },
  {
    icon: DollarSign,
    label: 'Test Fee',
    value: `$${EXAM_INFO.testFee}`,
  },
  {
    icon: BookOpen,
    label: 'Provider',
    value: EXAM_INFO.provider,
  },
]

export function ExamFacts() {
  return (
    <section className="bg-ivory-100 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="font-serif text-2xl font-bold text-gray-900 sm:text-3xl">
            FORT Exam Quick Facts
          </h2>
          <p className="mt-3 text-gray-600">
            Key numbers you need to know about the Foundations of Reading Test (FORT {EXAM_INFO.codes.join('/')})
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex items-start gap-4 rounded-xl border border-ivory-200 bg-white p-6"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-maroon-50">
                <fact.icon className="h-6 w-6 text-maroon-800" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">{fact.label}</p>
                <p className="mt-1 text-xl font-bold text-gray-900">{fact.value}</p>
                {fact.subtext && (
                  <p className="text-sm text-gray-500">{fact.subtext}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
