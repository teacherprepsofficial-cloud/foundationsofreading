import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Privacy Policy | Foundations of Reading Prep',
  description: 'Privacy Policy for Foundations of Reading Exam Preparation. Learn how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>Privacy Policy</h1>
        <p className="mt-4 text-sm text-gray-500" style={{ fontFamily: 'var(--font-sans)' }}>Last updated: April 3, 2026</p>

        <div className="mt-8 space-y-8 leading-relaxed text-gray-600" style={{ fontFamily: 'var(--font-sans)' }}>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">1. Who We Are</h2>
            <p className="mt-2">
              Foundations of Reading Exam Preparation (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates the website at foundationsofreading.com. We provide an online subscription-based study program for the NES Foundations of Reading test (exam codes 190 and 890), including diagnostic tests, a full study guide, timed practice tests, AI-graded written responses, and flashcards.
            </p>
            <p className="mt-2">
              Questions about this policy can be directed to: <a href="mailto:prep@foundationsofreading.com" className="text-[#7c1c2e] underline">prep@foundationsofreading.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">2. Information We Collect</h2>
            <p className="mt-2">We collect the following categories of information:</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li><strong>Account information:</strong> Your name and email address, collected when you purchase a subscription or create an account.</li>
              <li><strong>Payment information:</strong> Payment is processed entirely by Stripe. We do not store your credit card number, CVV, or full billing details on our servers. We receive a Stripe customer ID and subscription ID to manage your access.</li>
              <li><strong>Usage data:</strong> Your progress through the program — modules completed, diagnostic results, practice test scores, written response submissions, and flashcard activity — stored to power your dashboard and track your progress.</li>
              <li><strong>Written responses:</strong> Text you submit for AI grading is sent to Anthropic&apos;s Claude API for scoring and feedback. Submitted responses are stored in our database so you can review your history.</li>
              <li><strong>Technical data:</strong> Browser type, device, and general usage patterns collected via analytics tools to improve the platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">3. How We Use Your Information</h2>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>To create and manage your account and subscription access</li>
              <li>To deliver your study program: diagnostic tests, practice tests, study guide, flashcards, and AI-graded written response feedback</li>
              <li>To track and display your progress on your dashboard</li>
              <li>To send transactional emails: account setup, password reset, subscription confirmation, billing failures, and cancellation confirmations</li>
              <li>To process subscription renewals and cancellations via Stripe</li>
              <li>To improve the platform based on aggregate usage patterns</li>
            </ul>
            <p className="mt-2">We do not sell your personal information to third parties. We do not use your data for advertising.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">4. AI-Graded Written Responses</h2>
            <p className="mt-2">
              When you submit a written response for grading, the text is transmitted to Anthropic&apos;s API (Claude) for scoring. Anthropic processes this data according to their own privacy policy and API terms. We store your submitted text and the resulting score/feedback in our database so you can view your history. We do not use your written responses to train our own models.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">5. Third-Party Services</h2>
            <p className="mt-2">We use the following third-party services:</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li><strong>Stripe</strong> — payment processing and subscription management. Stripe may store your payment method, billing address, and transaction history. See <a href="https://stripe.com/privacy" className="text-[#7c1c2e] underline" target="_blank" rel="noopener noreferrer">stripe.com/privacy</a>.</li>
              <li><strong>Anthropic (Claude API)</strong> — AI scoring of written response submissions.</li>
              <li><strong>Resend</strong> — transactional email delivery (account setup, password reset, billing notifications).</li>
              <li><strong>MongoDB Atlas</strong> — cloud database hosting for your account and progress data.</li>
              <li><strong>Vercel</strong> — website hosting and deployment.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">6. Subscriptions and Billing</h2>
            <p className="mt-2">
              We offer monthly subscriptions billed through Stripe. You may cancel at any time through your account&apos;s &quot;Manage Subscription&quot; link, which opens the Stripe Customer Portal. Upon cancellation, your access remains active until the end of the current billing period, after which it is revoked. We do not issue prorated refunds for partial months unless required by applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">7. Data Retention</h2>
            <p className="mt-2">
              We retain your account and progress data for as long as your account is active. If you cancel your subscription and wish to have your data deleted, contact us at <a href="mailto:prep@foundationsofreading.com" className="text-[#7c1c2e] underline">prep@foundationsofreading.com</a> and we will delete your account and associated data within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">8. Data Security</h2>
            <p className="mt-2">
              All data is transmitted over SSL/TLS encryption. Passwords are hashed using bcrypt and never stored in plaintext. Payment data is never stored on our servers — it is handled entirely by Stripe. We take reasonable technical measures to protect your information from unauthorized access or disclosure.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">9. Your Rights</h2>
            <p className="mt-2">You have the right to:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Access the personal information we hold about you</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your account and data</li>
              <li>Unsubscribe from marketing emails at any time</li>
            </ul>
            <p className="mt-2">To exercise any of these rights, email us at <a href="mailto:prep@foundationsofreading.com" className="text-[#7c1c2e] underline">prep@foundationsofreading.com</a>.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">10. Children&apos;s Privacy</h2>
            <p className="mt-2">
              Our program is designed for adults preparing for teacher licensure examinations. We do not knowingly collect personal information from anyone under the age of 13. If we become aware that a child under 13 has provided us with personal information, we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">11. Changes to This Policy</h2>
            <p className="mt-2">
              We may update this privacy policy from time to time. When we do, we will update the &quot;Last updated&quot; date at the top of this page. Continued use of the platform after changes are posted constitutes acceptance of the updated policy.
            </p>
          </section>

        </div>
      </div>
      <SiteFooter />
    </>
  )
}
