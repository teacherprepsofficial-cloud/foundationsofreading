import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Foundations of Reading Test Prep | Study Guide & Practice Test',
    template: '%s | Foundations of Reading Test Prep',
  },
  description:
    'Pass the Foundations of Reading Test (FORT 190/890) with our comprehensive study guide and full-length practice test. Required in 13 states. 61.5% of test-takers fail — be prepared.',
  metadataBase: new URL('https://foundationsofreading.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Foundations of Reading Test Prep',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <SiteHeader />
        <main className="min-h-screen">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
