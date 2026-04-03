'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'for_timer_start'
const DURATION_MS = 30 * 60 * 1000 // 30 minutes

function getOrCreateEndTime(): number {
  if (typeof window === 'undefined') return Date.now() + DURATION_MS
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored) {
    const end = parseInt(stored, 10)
    if (end > Date.now()) return end
  }
  // Start a new timer
  const end = Date.now() + DURATION_MS
  localStorage.setItem(STORAGE_KEY, end.toString())
  return end
}

export function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [expired, setExpired] = useState(false)

  useEffect(() => {
    const endTime = getOrCreateEndTime()
    const remaining = endTime - Date.now()
    if (remaining <= 0) {
      setExpired(true)
      return
    }
    setTimeLeft(remaining)

    const interval = setInterval(() => {
      const left = endTime - Date.now()
      if (left <= 0) {
        setExpired(true)
        clearInterval(interval)
        localStorage.removeItem(STORAGE_KEY)
      } else {
        setTimeLeft(left)
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  if (expired || timeLeft === null) return null

  const totalSeconds = Math.floor(timeLeft / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  const isUrgent = totalSeconds < 300 // last 5 minutes

  const fmt = (n: number) => n.toString().padStart(2, '0')

  return (
    <div
      className={`w-full py-2.5 text-center text-sm ${isUrgent ? 'animate-pulse-slow' : ''}`}
      style={{ fontFamily: 'var(--font-sans)', background: '#b45309', color: '#fff' }}
    >
      <span className="font-medium">20% off expires in </span>
      <span className="font-bold tabular-nums bg-[#92400e] px-2 py-0.5 rounded">
        {fmt(minutes)}:{fmt(seconds)}
      </span>
      <span className="mx-3 opacity-50">|</span>
      <a href="#pricing" className="font-semibold underline underline-offset-2 hover:opacity-80">
        Claim discount
      </a>
    </div>
  )
}
