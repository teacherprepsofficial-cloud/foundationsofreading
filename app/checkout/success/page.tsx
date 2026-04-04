'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

function SuccessContent() {
  const params = useSearchParams()
  const examCode = params.get('exam') as '190' | '890'
  const tier = params.get('tier')
  const [checking, setChecking] = useState(true)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    let attempts = 0
    const interval = setInterval(async () => {
      attempts++
      try {
        const res = await fetch('/api/auth/me')
        const data = await res.json()
        const access = data.accesses?.find((a: { examCode: string }) => a.examCode === examCode)
        if (access) {
          setHasAccess(true)
          setChecking(false)
          clearInterval(interval)
        } else if (attempts >= 10) {
          setChecking(false)
          clearInterval(interval)
        }
      } catch {
        if (attempts >= 10) {
          setChecking(false)
          clearInterval(interval)
        }
      }
    }, 1500)
    return () => clearInterval(interval)
  }, [examCode])

  if (checking) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f5] px-4 text-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#e8e0e2] border-t-[#7c1c2e]" />
        <p className="mt-6 text-lg font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
          Activating your access...
        </p>
        <p className="mt-2 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
          This takes just a moment.
        </p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#faf8f5] px-4">
      <div className="w-full max-w-md rounded-lg border border-[#e8e0e2] bg-white p-10 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#f9f0f2]">
          <span className="text-3xl text-[#7c1c2e]">✓</span>
        </div>
        <h1 className="mt-6 text-3xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
          You&apos;re in.
        </h1>
        <p className="mt-3 text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
          Your {tier === 'bundle' ? 'Foundations of Reading Prep Plus' : 'Foundations of Reading Prep'} subscription is active.
        </p>
        <p className="mt-2 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
          Check your email — we sent a link to set your password.
        </p>
        <div className="mt-8">
          {hasAccess ? (
            <Link
              href={`/dashboard/${examCode}`}
              className="block w-full rounded bg-[#7c1c2e] py-3.5 text-sm font-semibold text-white hover:bg-[#5a1220]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Start Studying Now
            </Link>
          ) : (
            <Link
              href="/login"
              className="block w-full rounded bg-[#7c1c2e] py-3.5 text-sm font-semibold text-white hover:bg-[#5a1220]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Log in to Start
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  )
}
