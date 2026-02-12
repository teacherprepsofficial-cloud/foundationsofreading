import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Mail, BookOpen, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Thank You for Your Purchase',
  description: 'Your purchase was successful. Check your email for your download link.',
}

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <CheckCircle2 className="h-8 w-8 text-green-600" />
        </div>
        <h1 className="mt-6 text-3xl font-bold text-gray-900 sm:text-4xl">
          Thank You for Your Purchase!
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Your order has been confirmed and your materials are on the way.
        </p>
      </div>

      <div className="mt-10 space-y-6">
        <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
            <Mail className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Check Your Email</h2>
            <p className="mt-1 text-sm text-gray-600">
              We have sent your download link to the email address you provided at checkout. The email may take a few minutes to arrive. Be sure to check your spam or promotions folder if you do not see it.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
            <BookOpen className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h2 className="font-semibold text-gray-900">Start Studying</h2>
            <p className="mt-1 text-sm text-gray-600">
              Once you download your materials, we recommend starting with Subarea I (Foundations of Reading Development), which accounts for 35% of the exam. Create a study schedule and aim for 45-60 minute focused sessions.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
        >
          Back to Homepage
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  )
}
