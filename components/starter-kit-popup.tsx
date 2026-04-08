'use client'

import { useState, useEffect, useCallback } from 'react'

const DISMISS_KEY = 'for_starter_kit_dismissed'
const SF = { fontFamily: 'var(--font-sans)' }
const SE = { fontFamily: 'var(--font-serif)' }

export function StarterKitPopup() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const show = useCallback(() => {
    if (!dismissed && !success) setVisible(true)
  }, [dismissed, success])

  useEffect(() => {
    if (success) return

    if (localStorage.getItem(DISMISS_KEY) === '1') {
      setDismissed(true)
      return
    }

    // Show after 8 seconds
    const timer = setTimeout(show, 8000)

    return () => clearTimeout(timer)
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
        body: JSON.stringify({
          email,
          source: 'homepage-starter-kit',
          pdfSlug: 'starter-kit',
          emailSubject: 'Your Free Foundations of Reading Starter Kit',
          emailHeading: 'Your Starter Kit is Ready to Download',
          emailBody: 'Here\'s your Foundations of Reading Test Prep Starter Kit — 26 pages covering the complete exam overview, 50 practice questions with answer key, key vocabulary, a constructed response template with model response, and a 20% discount code for full prep access.',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setSuccess(true)
        setTimeout(() => {
          localStorage.setItem(DISMISS_KEY, '1')
          setDismissed(true)
          setVisible(false)
        }, 6000)
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
        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
        onClick={handleDismiss}
        aria-hidden="true"
      />

      {/* Popup */}
      <div
        className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        role="dialog"
        aria-label="Free Starter Kit offer"
      >
        <div
          className="relative w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
          style={{ animation: 'popIn 0.35s cubic-bezier(0.16,1,0.3,1)' }}
        >
          <style>{`
            @keyframes popIn {
              from { transform: scale(0.9); opacity: 0; }
              to   { transform: scale(1);   opacity: 1; }
            }
          `}</style>

          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white/80 hover:bg-white/30 hover:text-white transition-colors text-lg"
            aria-label="Close"
            style={SF}
          >
            ✕
          </button>

          {/* Header */}
          <div className="px-8 pt-8 pb-6 text-center" style={{ background: '#7c1c2e' }}>
            <p className="text-[10px] font-bold uppercase tracking-[3px] text-[#e8b4bc]" style={SF}>
              Free Download
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-tight text-white sm:text-3xl" style={SE}>
              Foundations of Reading<br />Test Prep Starter Kit
            </h2>
            <p className="mt-2 text-sm text-[#e8b4bc]" style={SF}>
              The Ultimate Guide to Pass — 26 Pages, Completely Free
            </p>
          </div>

          {/* Body */}
          <div className="px-8 py-6">
            {!success ? (
              <>
                {/* What's inside */}
                <div className="mb-5 grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-[#444]" style={SF}>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#7c1c2e] font-bold">✓</span>
                    <span>50-Question Practice Test</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#7c1c2e] font-bold">✓</span>
                    <span>Full Answer Key</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#7c1c2e] font-bold">✓</span>
                    <span>Exam Overview + Tables</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#7c1c2e] font-bold">✓</span>
                    <span>20 Key Vocabulary Terms</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#7c1c2e] font-bold">✓</span>
                    <span>Constructed Response Guide</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 text-[#7c1c2e] font-bold">✓</span>
                    <span>20% Off Discount Code</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-[#e8e0e2] px-4 py-3.5 text-sm text-[#1a1a1a] outline-none focus:border-[#7c1c2e] focus:ring-1 focus:ring-[#7c1c2e]"
                    style={SF}
                  />
                  {error && <p className="text-xs text-red-600" style={SF}>{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg py-3.5 text-sm font-bold text-white transition-colors disabled:opacity-60"
                    style={{ background: '#7c1c2e', ...SF }}
                  >
                    {loading ? 'Sending...' : 'Send Me the Free Starter Kit'}
                  </button>
                </form>

                <p className="mt-3 text-center text-xs text-[#9ca3af]" style={SF}>
                  No spam. Unsubscribe any time.
                </p>
              </>
            ) : (
              <div className="py-6 text-center">
                <div className="mb-3 text-4xl">✓</div>
                <h3 className="text-lg font-bold text-[#1a1a1a]" style={SE}>
                  Check your inbox!
                </h3>
                <p className="mt-2 text-sm text-[#6b6b6b]" style={SF}>
                  Your Starter Kit is on its way. Check your spam folder if you don&apos;t see it within a minute.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
