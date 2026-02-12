import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: 'Terms of Use for Foundations of Reading Test Prep. Read our terms for purchasing and using digital study materials.',
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Terms of Use</h1>
      <p className="mt-4 text-sm text-gray-500">Last updated: February 11, 2026</p>

      <div className="mt-8 space-y-8 text-gray-600 leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-gray-900">1. Acceptance of Terms</h2>
          <p className="mt-2">
            By accessing or using our website and purchasing our products, you agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use our website or purchase our products.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">2. Products and Digital Downloads</h2>
          <p className="mt-2">
            Our products are digital study materials delivered electronically. Upon purchase, you will receive access to your materials via email. All sales of digital downloads are final.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">3. Refund Policy</h2>
          <p className="mt-2">
            Due to the digital nature of our products, all sales are final and no refunds will be issued once the digital product has been delivered. By completing your purchase, you acknowledge and agree to this policy.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">4. Intellectual Property</h2>
          <p className="mt-2">
            All content on this website and in our products, including text, graphics, and design, is the property of Foundations of Reading Test Prep. You may not reproduce, distribute, or share our materials without written permission.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">5. License to Use</h2>
          <p className="mt-2">
            When you purchase a product, you receive a personal, non-transferable, non-exclusive license to use the materials for your own individual test preparation. You may not share, resell, or distribute the materials to others.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">6. Disclaimer</h2>
          <p className="mt-2">
            Our study materials are designed to help you prepare for the Foundations of Reading Test. We do not guarantee that you will pass the exam. Exam results depend on many factors, including your individual preparation and effort. We are not affiliated with Pearson, NES, or any state department of education.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">7. Limitation of Liability</h2>
          <p className="mt-2">
            To the maximum extent permitted by law, Foundations of Reading Test Prep shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our products or website.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">8. Modifications</h2>
          <p className="mt-2">
            We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to this page. Your continued use of the website constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900">9. Governing Law</h2>
          <p className="mt-2">
            These terms shall be governed by and construed in accordance with the laws of the United States. Any disputes arising from these terms shall be resolved in the appropriate courts.
          </p>
        </section>
      </div>
    </div>
  )
}
