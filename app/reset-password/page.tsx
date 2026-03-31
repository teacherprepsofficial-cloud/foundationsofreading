'use client'

import { useState, useEffect, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!token) setError('Invalid reset link.')
  }, [token])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (password !== confirm) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Something went wrong')
        setLoading(false)
        return
      }

      setSuccess(true)
      setTimeout(() => router.push('/login'), 3000)
    } catch {
      setError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg border border-[#e8e0e2] bg-white p-8">
      {success ? (
        <>
          <h1 className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
            Password updated
          </h1>
          <p className="mt-3 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            Your password has been reset. Redirecting you to log in...
          </p>
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
            Set new password
          </h1>
          <p className="mt-1 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            Choose a strong password for your account.
          </p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
                New password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
                className="mt-1 w-full rounded border border-[#e8e0e2] px-4 py-2.5 text-sm text-[#1a1a1a] outline-none focus:border-[#7c1c2e] focus:ring-1 focus:ring-[#7c1c2e]"
                style={{ fontFamily: 'var(--font-sans)' }}
                placeholder="At least 8 characters"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
                Confirm password
              </label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
                minLength={8}
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
              disabled={loading || !token}
              className="w-full rounded bg-[#7c1c2e] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#5a1220] disabled:opacity-60"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {loading ? 'Updating...' : 'Update password'}
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
  )
}

export default function ResetPasswordPage() {
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
        <Suspense fallback={<div className="rounded-lg border border-[#e8e0e2] bg-white p-8 text-center text-sm text-[#6b6b6b]">Loading...</div>}>
          <ResetPasswordForm />
        </Suspense>
      </div>
    </div>
  )
}
