'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setLoading(false)
        return
      }

      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf8f5] px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-block">
            <p className="text-xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
              Foundations of Reading
            </p>
            <p className="text-[10px] font-medium uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
              Test Preparation
            </p>
          </Link>
        </div>

        <div className="rounded-lg border border-[#e8e0e2] bg-white p-8">
          {submitted ? (
            <>
              <h1 className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
                Check your email
              </h1>
              <p className="mt-3 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                If an account exists for <strong className="text-[#1a1a1a]">{email}</strong>, we sent a password reset link. Check your inbox (and spam folder).
              </p>
              <p className="mt-6 text-center text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                <Link href="/login" className="font-semibold text-[#7c1c2e] hover:underline">
                  Back to log in
                </Link>
              </p>
            </>
          ) : (
            <>
              <h1 className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
                Forgot password?
              </h1>
              <p className="mt-1 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                Enter your email and we&apos;ll send you a reset link.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="mt-1 w-full rounded border border-[#e8e0e2] px-4 py-2.5 text-sm text-[#1a1a1a] outline-none focus:border-[#7c1c2e] focus:ring-1 focus:ring-[#7c1c2e]"
                    style={{ fontFamily: 'var(--font-sans)' }}
                    placeholder="you@email.com"
                  />
                </div>

                {error && (
                  <p className="rounded bg-red-50 px-4 py-2.5 text-sm text-red-700" style={{ fontFamily: 'var(--font-sans)' }}>
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded bg-[#7c1c2e] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5a1220] disabled:opacity-60"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {loading ? 'Sending...' : 'Send reset link'}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
                <Link href="/login" className="text-[#7c1c2e] hover:underline">
                  Back to log in
                </Link>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
