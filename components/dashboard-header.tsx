'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function DashboardHeader() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  return (
    <header className="border-b border-[#e8e0e2] bg-white px-6 py-3">
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <span className="text-base">📕</span>
          <span
            className="font-bold text-[#7c1c2e] group-hover:opacity-80 transition-opacity"
            style={{ fontFamily: 'var(--font-serif)', fontSize: '15px' }}
          >
            Foundations of Reading
          </span>
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="/dashboard"
            className="text-sm text-[#6b6b6b] hover:text-[#7c1c2e] transition-colors"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-[#6b6b6b] hover:text-[#7c1c2e] transition-colors"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Log Out
          </button>
        </div>
      </div>
    </header>
  )
}
