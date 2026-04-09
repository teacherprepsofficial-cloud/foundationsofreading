import type { Metadata } from 'next'
import { Source_Serif_4, Inter } from 'next/font/google'
import './globals.css'

const sourceSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Foundations of Reading Test Prep | Pass the NES 190 & 890',
    template: '%s | Foundations of Reading Test Prep',
  },
  description:
    'The most complete online prep for the NES Foundations of Reading test (190 & 890). Diagnostic test, study guide, practice tests, flashcards, and AI-graded constructed responses. 30-day access.',
  metadataBase: new URL('https://foundationsofreading.com'),
  icons: {
    icon: '/icon',
    shortcut: '/icon',
    apple: '/icon',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Foundations of Reading Test Prep',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
