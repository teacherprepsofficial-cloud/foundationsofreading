import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Terms of Use | Foundations of Reading Prep',
  description: 'Terms of Use for Foundations of Reading Exam Preparation. Read our terms for subscribing to and using our online study program.',
}

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>Terms of Use</h1>
        <p className="mt-4 text-sm text-gray-500" style={{ fontFamily: 'var(--font-sans)' }}>Last updated: April 3, 2026</p>

        <div className="mt-8 space-y-8 leading-relaxed text-gray-600" style={{ fontFamily: 'var(--font-sans)' }}>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">1. Acceptance of Terms</h2>
            <p className="mt-2">
              By accessing or using foundationsofreading.com or purchasing a subscription, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree, do not use the platform or subscribe.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">2. Service Description</h2>
            <p className="mt-2">
              Foundations of Reading Exam Preparation (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides an online, subscription-based study program for the NES Foundations of Reading test (exam codes 190 and 890). The program includes diagnostic tests, a full study guide, timed practice tests, AI-graded written response practice, and flashcards — all accessible through a password-protected web account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">3. Subscriptions and Billing</h2>
            <p className="mt-2">
              Access to the program is provided through a monthly subscription billed via Stripe. By subscribing, you authorize us to charge your payment method on a recurring monthly basis.
            </p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li><strong>Cancellation:</strong> You may cancel at any time through the &quot;Manage Subscription&quot; link in your account, which opens the Stripe Customer Portal. Cancellation takes effect at the end of the current billing period — access remains active until then.</li>
              <li><strong>Refunds:</strong> We do not issue prorated refunds for partial billing periods, except where required by applicable law.</li>
              <li><strong>Failed payments:</strong> If a payment fails, we will notify you by email. Access may be suspended until payment is resolved. Stripe will automatically retry failed charges according to its retry schedule.</li>
              <li><strong>Plan changes:</strong> If you upgrade or downgrade your subscription tier, the change takes effect at the start of the next billing cycle.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">4. Account Registration</h2>
            <p className="mt-2">
              After subscribing, you will receive an email with a link to set your password. You are responsible for keeping your login credentials confidential. Do not share your account with others — your subscription is for individual use only. If you believe your account has been compromised, contact us immediately at <a href="mailto:noreply@foundationsofreading.com" className="text-[#7c1c2e] underline">noreply@foundationsofreading.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">5. License to Use</h2>
            <p className="mt-2">
              Your subscription grants you a personal, non-transferable, non-exclusive license to access and use the platform and its content solely for your own individual exam preparation. This license is active for as long as your subscription remains in good standing and is immediately revoked upon cancellation or termination.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">6. Acceptable Use</h2>
            <p className="mt-2">You agree not to:</p>
            <ul className="mt-2 list-disc space-y-2 pl-5">
              <li>Share, resell, redistribute, or publicly post any content from the platform</li>
              <li>Use automated tools to scrape, download, or extract platform content</li>
              <li>Attempt to circumvent access controls or use another person&apos;s account</li>
              <li>Use the platform in any way that violates applicable law</li>
            </ul>
            <p className="mt-2">We reserve the right to terminate access without refund if these terms are violated.</p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">7. AI-Graded Written Responses</h2>
            <p className="mt-2">
              The platform includes written response practice graded by Anthropic&apos;s Claude AI. By submitting a response, you consent to that text being transmitted to Anthropic&apos;s API for scoring. AI-generated feedback is provided for study purposes only and does not guarantee performance on the actual exam. We are not responsible for inaccuracies in AI-generated feedback.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">8. Intellectual Property</h2>
            <p className="mt-2">
              All content on this platform — including study guide text, practice questions, flashcards, written response prompts, diagnostic tests, and site design — is the property of Foundations of Reading Exam Preparation and is protected by copyright. You may not reproduce, distribute, publish, or create derivative works from any platform content without our prior written permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">9. Disclaimer</h2>
            <p className="mt-2">
              Our study program is designed to help you prepare for the NES Foundations of Reading test (190/890). We do not guarantee that you will pass the exam. Results depend on many individual factors including your preparation, effort, and test-taking conditions. We are not affiliated with Pearson, the National Evaluation Series (NES), or any state department of education. &quot;NES&quot; and &quot;Foundations of Reading&quot; are referenced solely to describe the exam our program prepares you for.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">10. Limitation of Liability</h2>
            <p className="mt-2">
              To the maximum extent permitted by law, Foundations of Reading Exam Preparation shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the platform, including but not limited to exam failure, interruption of service, or AI feedback inaccuracies. Our total liability for any claim arising under these terms shall not exceed the amount you paid in the 30 days prior to the claim.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">11. Modifications to These Terms</h2>
            <p className="mt-2">
              We may update these Terms of Use at any time. When we do, we will update the &quot;Last updated&quot; date at the top of this page. Continued use of the platform after changes are posted constitutes your acceptance of the updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">12. Governing Law</h2>
            <p className="mt-2">
              These terms are governed by the laws of the United States. Any disputes arising from these terms shall be resolved in the appropriate courts.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-gray-900">13. Contact</h2>
            <p className="mt-2">
              Questions about these terms can be directed to: <a href="mailto:noreply@foundationsofreading.com" className="text-[#7c1c2e] underline">noreply@foundationsofreading.com</a>
            </p>
          </section>

        </div>
      </div>
      <SiteFooter />
    </>
  )
}
