'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function SiteHeader() {
  const [user, setUser] = useState<{ name: string } | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    fetch('/api/auth/me')
      .then((r) => r.json())
      .then((d) => { if (d.user) setUser(d.user) })
      .catch(() => {})
  }, [])

  return (
    <header className="border-b border-[#e8e0e2] bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex flex-col">
          <span className="text-xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
            Foundations of Reading
          </span>
          <span className="text-[10px] font-medium uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
            Test Preparation
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex" style={{ fontFamily: 'var(--font-sans)' }}>
          <a href="#what-you-get" className="text-sm text-[#6b6b6b] hover:text-[#1a1a1a]">What&apos;s Included</a>
          <a href="#pricing" className="text-sm text-[#6b6b6b] hover:text-[#1a1a1a]">Pricing</a>
          <Link href="/blog" className="text-sm text-[#6b6b6b] hover:text-[#1a1a1a]">Blog</Link>
          {user ? (
            <Link href="/dashboard" className="rounded bg-[#7c1c2e] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a1220]">
              My Prep
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-semibold text-[#7c1c2e] hover:text-[#5a1220]">Log in</Link>
              <a href="#pricing" className="rounded bg-[#7c1c2e] px-5 py-2 text-sm font-semibold text-white hover:bg-[#5a1220]">
                Get Access
              </a>
            </div>
          )}
        </nav>

        {/* Mobile */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Menu"
        >
          <span className={`block h-0.5 w-5 bg-[#1a1a1a] transition-all ${mobileOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`block h-0.5 w-5 bg-[#1a1a1a] transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-5 bg-[#1a1a1a] transition-all ${mobileOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-[#e8e0e2] bg-white px-6 pb-4 pt-3 md:hidden" style={{ fontFamily: 'var(--font-sans)' }}>
          <a href="#what-you-get" className="block py-2.5 text-sm text-[#6b6b6b]" onClick={() => setMobileOpen(false)}>What&apos;s Included</a>
          <a href="#pricing" className="block py-2.5 text-sm text-[#6b6b6b]" onClick={() => setMobileOpen(false)}>Pricing</a>
          <Link href="/blog" className="block py-2.5 text-sm text-[#6b6b6b]" onClick={() => setMobileOpen(false)}>Blog</Link>
          {user ? (
            <Link href="/dashboard" className="mt-2 block rounded bg-[#7c1c2e] px-5 py-2.5 text-center text-sm font-semibold text-white">My Prep</Link>
          ) : (
            <Link href="/login" className="mt-2 block rounded bg-[#7c1c2e] px-5 py-2.5 text-center text-sm font-semibold text-white">Log in</Link>
          )}
        </div>
      )}
    </header>
  )
}
