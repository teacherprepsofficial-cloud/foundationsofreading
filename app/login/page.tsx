'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Login failed')
        setLoading(false)
        return
      }

      router.push('/dashboard')
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
          <h1 className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
            Log in
          </h1>
          <p className="mt-1 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            Access your 30-day prep program.
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

            <div>
              <label className="block text-sm font-medium text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 w-full rounded border border-[#e8e0e2] px-4 py-2.5 text-sm text-[#1a1a1a] outline-none focus:border-[#7c1c2e] focus:ring-1 focus:ring-[#7c1c2e]"
                style={{ fontFamily: 'var(--font-sans)' }}
                placeholder="••••••••"
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
              {loading ? 'Logging in...' : 'Log in'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            Don&apos;t have an account?{' '}
            <Link href="/#pricing" className="font-semibold text-[#7c1c2e] hover:underline">
              Get access
            </Link>
          </p>
          <p className="mt-2 text-center text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            <Link href="/forgot-password" className="text-[#7c1c2e] hover:underline">
              Forgot password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
