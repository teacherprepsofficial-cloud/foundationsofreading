'use client'

import { useState, useEffect } from 'react'

const STORAGE_KEY = 'for_timer_start'

function isDiscountActive(): boolean {
  if (typeof window === 'undefined') return false
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return false
  return parseInt(stored, 10) > Date.now()
}

interface PriceCardProps {
  examCode: '190' | '890'
  tier: 'starter' | 'bundle'
  regularPrice: number
  discountedPrice: number
  name: string
  description: string
  features: string[]
  isFeatured?: boolean
  discountActive: boolean
  loading: boolean
  onSelect: (examCode: '190' | '890', tier: 'starter' | 'bundle') => void
}

function PriceCard({
  examCode, tier, regularPrice, discountedPrice, name, description,
  features, isFeatured, discountActive, loading, onSelect,
}: PriceCardProps) {
  const price = discountActive ? discountedPrice : regularPrice

  return (
    <div
      className={`relative flex flex-col rounded-lg border-2 bg-white p-8 ${
        isFeatured ? 'border-[#7c1c2e]' : 'border-[#e8e0e2]'
      }`}
    >
      {isFeatured && (
        <span
          className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#7c1c2e] px-4 py-1 text-xs font-bold text-white"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          MOST POPULAR
        </span>
      )}
      <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
        {name}
      </p>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-4xl font-bold text-[#1a1a1a]" style={{ fontFamily: 'var(--font-serif)' }}>
          ${price / 100}
        </span>
        {discountActive && (
          <span className="text-lg text-[#6b6b6b] line-through" style={{ fontFamily: 'var(--font-sans)' }}>
            ${regularPrice / 100}
          </span>
        )}
      </div>
      {discountActive && (
        <p className="mt-1 text-sm font-semibold text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
          20% off — limited time
        </p>
      )}
      <p className="mt-2 text-sm text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
        {description}
      </p>
      <ul className="mt-6 flex-1 space-y-2.5">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-sm text-[#1a1a1a]" style={{ fontFamily: 'var(--font-sans)' }}>
            <span className="mt-0.5 text-[#7c1c2e]">✓</span>
            {f}
          </li>
        ))}
      </ul>
      <button
        onClick={() => onSelect(examCode, tier)}
        disabled={loading}
        className={`mt-8 w-full rounded py-3.5 text-sm font-semibold transition-colors ${
          isFeatured
            ? 'bg-[#7c1c2e] text-white hover:bg-[#5a1220] disabled:opacity-60'
            : 'border-2 border-[#7c1c2e] text-[#7c1c2e] hover:bg-[#f9f0f2] disabled:opacity-60'
        }`}
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {loading ? 'Loading...' : 'Get Instant Access'}
      </button>
      <p className="mt-3 text-center text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
        30-day access · One-time payment
      </p>
    </div>
  )
}

export function PricingSection() {
  const [discountActive, setDiscountActive] = useState(false)
  const [selectedExam, setSelectedExam] = useState<'190' | '890'>('190')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setDiscountActive(isDiscountActive())
    const interval = setInterval(() => {
      setDiscountActive(isDiscountActive())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  async function handleSelect(examCode: '190' | '890', tier: 'starter' | 'bundle') {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ examCode, tier, discounted: discountActive }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setLoading(false)
    }
  }

  const CARDS = [
    {
      tier: 'starter' as const,
      name: `NES ${selectedExam} Starter`,
      regularPrice: 4900,
      discountedPrice: 3920,
      description: 'Everything you need to pass.',
      features: [
        'Module 1: Test overview',
        'Diagnostic Practice Test',
        'Full Study Guide',
        '2 Full-Length Practice Tests',
        '4 AI-Graded Written Responses',
        'Flashcards + Vocab Matching',
        '30-day access',
      ],
      isFeatured: false,
    },
    {
      tier: 'bundle' as const,
      name: `NES ${selectedExam} Complete Bundle`,
      regularPrice: 5900,
      discountedPrice: 4720,
      description: 'Maximum practice, maximum confidence.',
      features: [
        'Everything in Starter',
        '4 Full-Length Practice Tests',
        '8 AI-Graded Written Responses',
        'Flashcards + Vocab Matching',
        '30-day access',
      ],
      isFeatured: true,
    },
  ]

  return (
    <section id="pricing" className="border-y border-[#e8e0e2] bg-[#faf8f5] py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
          Get Started
        </p>
        <h2 className="mt-3 text-center text-3xl font-bold text-[#1a1a1a] sm:text-4xl" style={{ fontFamily: 'var(--font-serif)' }}>
          Choose your exam
        </h2>

        {/* Exam toggle */}
        <div className="mt-8 flex justify-center">
          <div className="flex rounded-lg border border-[#e8e0e2] bg-white p-1" style={{ fontFamily: 'var(--font-sans)' }}>
            {(['190', '890'] as const).map((code) => (
              <button
                key={code}
                onClick={() => setSelectedExam(code)}
                className={`rounded px-8 py-2.5 text-sm font-semibold transition-colors ${
                  selectedExam === code
                    ? 'bg-[#7c1c2e] text-white'
                    : 'text-[#6b6b6b] hover:text-[#1a1a1a]'
                }`}
              >
                NES {code}
              </button>
            ))}
          </div>
        </div>

        {discountActive && (
          <p className="mt-4 text-center text-sm font-semibold text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
            20% discount active — expires soon
          </p>
        )}

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {CARDS.map((card) => (
            <PriceCard
              key={card.tier}
              examCode={selectedExam}
              {...card}
              discountActive={discountActive}
              loading={loading}
              onSelect={handleSelect}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
