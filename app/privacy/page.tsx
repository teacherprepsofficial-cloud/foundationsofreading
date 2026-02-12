import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Foundations of Reading Test Prep. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Privacy Policy</h1>
      <p className="mt-4 text-sm text-gray-500">Last updated: February 11, 2026</p>

      <div className="mt-8 space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Information We Collect</h2>
          <p className="mt-2">
            When you purchase our products, we collect your name, email address, and payment information. Payment processing is handled securely by Stripe. We do not store your full credit card number on our servers.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. How We Use Your Information</h2>
          <p className="mt-2">
            We use your information to process your purchase, deliver your digital products via email, and communicate with you about your order. We may also send occasional product updates or tips related to the Foundations of Reading Test. You can unsubscribe from marketing emails at any time.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Cookies and Analytics</h2>
          <p className="mt-2">
            We use cookies and analytics tools to understand how visitors use our website. This helps us improve our content and user experience. We do not sell your personal information to third parties.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Third-Party Services</h2>
          <p className="mt-2">
            We use the following third-party services to operate our business:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Stripe for payment processing</li>
            <li>Vercel for website hosting</li>
            <li>Email delivery services for order confirmations</li>
          </ul>
          <p className="mt-2">
            Each of these services has its own privacy policy governing how they handle your data.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. Data Security</h2>
          <p className="mt-2">
            We take reasonable measures to protect your personal information from unauthorized access, alteration, or destruction. All data is transmitted using SSL encryption.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Your Rights</h2>
          <p className="mt-2">
            You have the right to access, correct, or delete your personal information. To make a request, please contact us at the email address provided on our website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">7. Children&apos;s Privacy</h2>
          <p className="mt-2">
            Our products are designed for adults preparing for teacher licensure exams. We do not knowingly collect personal information from children under the age of 13.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">8. Changes to This Policy</h2>
          <p className="mt-2">
            We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
          </p>
        </section>
      </div>
    </div>
  )
}
