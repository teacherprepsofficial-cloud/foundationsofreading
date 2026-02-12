'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '/study-guide', label: 'Study Guide' },
  { href: '/practice-test', label: 'Practice Test' },
  { href: '/bundle', label: 'Prep Bundle' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
]

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="w-full">
      {/* Top utility bar — dark, institutional */}
      <div className="bg-maroon-900 text-ivory-200 text-xs">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 sm:px-6">
          <span>Exam Prep for the Foundations of Reading Test (FORT 190/890)</span>
          <span className="hidden sm:inline">Required in 13 States</span>
        </div>
      </div>

      {/* Main navigation — light, clean */}
      <nav className="border-b border-ivory-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="flex flex-col">
            <span className="font-serif text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
              Foundations of Reading
            </span>
            <span className="text-xs tracking-wide text-gray-500">
              TEST PREPARATION
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 transition-colors hover:text-maroon-800"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-ivory-100 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="border-t border-ivory-200 bg-white px-4 pb-4 pt-2 md:hidden">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block rounded-md px-3 py-2.5 text-base text-gray-600 transition-colors hover:bg-ivory-100 hover:text-maroon-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </header>
  )
}
