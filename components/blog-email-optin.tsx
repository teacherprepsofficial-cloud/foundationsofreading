'use client'

import { useState, useEffect, useCallback } from 'react'

const SF = { fontFamily: 'var(--font-sans)' }
const SE = { fontFamily: 'var(--font-serif)' }

interface Props {
  postSlug: string
  pdfSlug: string
  headline: string
  subheadline: string
  pdfLabel: string
  emailSubject: string
  emailHeading: string
  emailBody: string
}

export function BlogEmailOptin({ postSlug, pdfSlug, headline, subheadline, pdfLabel, emailSubject, emailHeading, emailBody }: Props) {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const DISMISS_KEY = `for_optin_dismissed_${postSlug}`

  const show = useCallback(() => {
    if (!dismissed && !success) setVisible(true)
  }, [dismissed, success])

  useEffect(() => {
    // Don't re-dismiss while showing the success confirmation
    if (success) return

    if (localStorage.getItem(DISMISS_KEY) === '1') {
      setDismissed(true)
      return
    }

    // Show after 20 seconds
    const timer = setTimeout(show, 20000)

    // OR show after scrolling 50% of the page
    function onScroll() {
      const scrolled = window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (scrolled > 0.5) show()
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      clearTimeout(timer)
      window.removeEventListener('scroll', onScroll)
    }
  }, [DISMISS_KEY, show, success])

  function handleDismiss() {
    localStorage.setItem(DISMISS_KEY, '1')
    setDismissed(true)
    setVisible(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/leads/for-optin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: `blog-${postSlug}`, pdfSlug, emailSubject, emailHeading, emailBody }),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        // Show success message for 5 seconds, then dismiss
        setTimeout(() => {
          localStorage.setItem(DISMISS_KEY, '1')
          setDismissed(true)
        }, 5000)
      } else {
        setError('Something went wrong. Please try again.')
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (dismissed || !visible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Slide-in panel */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50 mx-auto max-w-lg rounded-t-2xl bg-white shadow-2xl sm:bottom-6 sm:left-auto sm:right-6 sm:max-w-sm sm:rounded-2xl"
        style={{ animation: 'slideUp 0.35s cubic-bezier(0.16,1,0.3,1)' }}
        role="dialog"
        aria-label="Free resource offer"
      >
        <style>{`
          @keyframes slideUp {
            from { transform: translateY(100%); opacity: 0; }
            to   { transform: translateY(0);    opacity: 1; }
          }
        `}</style>

        {/* Header */}
        <div className="rounded-t-2xl sm:rounded-t-2xl px-6 pt-5 pb-4" style={{ background: '#7c1c2e' }}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: '#e8b4bc', ...SF }}>
                Free Download
              </p>
              <h3 className="mt-1 text-lg font-bold leading-snug text-white" style={SE}>
                {headline}
              </h3>
            </div>
            <button
              onClick={handleDismiss}
              aria-label="Close"
              className="mt-0.5 shrink-0 text-white/60 hover:text-white transition-colors text-xl leading-none"
              style={SF}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {!success ? (
            <>
              <p className="text-sm text-[#6b6b6b] mb-1" style={SF}>{subheadline}</p>
              <p className="text-xs font-semibold text-[#7c1c2e] mb-4" style={SF}>
                📄 {pdfLabel}
              </p>
              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded border border-[#e8e0e2] px-4 py-3 text-sm text-[#1a1a1a] outline-none focus:border-[#7c1c2e]"
                  style={SF}
                />
                {error && <p className="text-xs text-red-600" style={SF}>{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded py-3 text-sm font-semibold text-white transition-colors disabled:opacity-60"
                  style={{ background: '#7c1c2e', ...SF }}
                >
                  {loading ? 'Sending…' : 'Send Me the Free Guide →'}
                </button>
              </form>
              <p className="mt-3 text-center text-xs text-[#9ca3af]" style={SF}>
                No spam. Unsubscribe any time.
              </p>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-3xl mb-2">✓</p>
              <h4 className="text-base font-bold text-[#1a1a1a] mb-1" style={SE}>Check your inbox!</h4>
              <p className="text-sm text-[#6b6b6b]" style={SF}>
                Your free guide is on its way. Check your spam folder if you don&apos;t see it within a minute.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
