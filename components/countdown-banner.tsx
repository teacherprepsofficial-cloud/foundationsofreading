'use client'

import { useEffect, useState } from 'react'

const DISMISS_KEY = 'for_banner_dismissed'

export function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [expired, setExpired] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (localStorage.getItem(DISMISS_KEY) === '1') {
      setDismissed(true)
      return
    }

    let intervalId: ReturnType<typeof setInterval>

    async function init() {
      // Get fingerprint
      let fp: string | undefined
      try {
        const FingerprintJS = await import('@fingerprintjs/fingerprintjs')
        const agent = await FingerprintJS.load()
        const result = await agent.get()
        fp = result.visitorId
      } catch {
        // fingerprinting failed — proceed without it
      }

      // Fetch deadline from server (cookie + fingerprint + IP)
      const url = fp ? `/api/deadline?fp=${fp}` : '/api/deadline'
      const res = await fetch(url)
      const data = await res.json()
      const expiresAt: number = data.expiresAt

      const remaining = expiresAt - Date.now()
      if (remaining <= 0) {
        setExpired(true)
        return
      }

      setTimeLeft(remaining)

      intervalId = setInterval(() => {
        const left = expiresAt - Date.now()
        if (left <= 0) {
          setExpired(true)
          clearInterval(intervalId)
        } else {
          setTimeLeft(left)
        }
      }, 1000)
    }

    init()
    return () => clearInterval(intervalId)
  }, [])

  function handleDismiss() {
    localStorage.setItem(DISMISS_KEY, '1')
    setDismissed(true)
  }

  if (expired || timeLeft === null || dismissed) return null

  const totalSeconds = Math.floor(timeLeft / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const isUrgent = totalSeconds < 300

  const fmt = (n: number) => n.toString().padStart(2, '0')
  const SF = { fontFamily: 'var(--font-sans)' }

  return (
    <div
      className={`w-full py-2.5 text-center text-sm ${isUrgent ? 'animate-pulse-slow' : ''}`}
      style={{ fontFamily: 'var(--font-sans)', background: '#0f766e', color: '#fff' }}
    >
      <span className="font-medium">20% off expires in </span>
      <span className="font-bold tabular-nums bg-[#0d5c56] px-2 py-0.5 rounded">
        {fmt(minutes)}:{fmt(seconds)}
      </span>
      <span className="mx-3 opacity-50">|</span>
      <a href="/#pricing" className="font-semibold underline underline-offset-2 hover:opacity-80" style={SF}>
        Claim discount
      </a>
      <button
        onClick={handleDismiss}
        aria-label="Dismiss"
        style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: 18, lineHeight: 1, opacity: 0.7 }}
        onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
        onMouseLeave={e => (e.currentTarget.style.opacity = '0.7')}
      >
        ✕
      </button>
    </div>
  )
}
