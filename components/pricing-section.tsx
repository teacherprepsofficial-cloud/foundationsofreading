'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

const SF = { fontFamily: 'var(--font-sans)' }
const SE = { fontFamily: 'var(--font-serif)' }

const CARDS = [
  {
    tier: 'starter' as const,
    name: 'Foundations of Reading Prep',
    regularPrice: 3900,
    discountedPrice: 3120,
    description: 'Everything you need to pass.',
    features: [
      'Module 1: Test overview',
      'Diagnostic Practice Test',
      'Full Study Guide — all 3 subareas, all 11 objectives',
      '2 Full-Length Practice Tests (100 MC each)',
      '4 AI-Graded Written Responses',
      'Flashcards + Vocab Matching (150+ terms)',
    ],
    isFeatured: false,
  },
  {
    tier: 'bundle' as const,
    name: 'Foundations of Reading Prep Plus',
    regularPrice: 4900,
    discountedPrice: 3920,
    description: 'Maximum practice, maximum confidence.',
    features: [
      'Everything in Foundations Prep, plus:',
      '2 additional full-length practice tests (4 total)',
      '4 more AI-graded constructed response prompts (8 total)',
    ],
    isFeatured: true,
  },
]

export function PricingSection() {
  const [loadingTier, setLoadingTier] = useState<'starter' | 'bundle' | null>(null)
  const searchParams = useSearchParams()
  const discountActive = searchParams.get('discount') === 'SAVE20'

  async function handleSelect(tier: 'starter' | 'bundle') {
    setLoadingTier(tier)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tier, discounted: discountActive }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        setLoadingTier(null)
      }
    } catch {
      setLoadingTier(null)
    }
  }

  return (
    <section id="pricing" className="border-y border-[#e8e0e2] bg-[#faf8f5] py-16 sm:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={SF}>
          Get Started
        </p>
        <h2 className="mt-3 text-center text-3xl font-bold text-[#1a1a1a] sm:text-4xl" style={SE}>
          Complete prep for NES 190 &amp; 890.
        </h2>
        <p className="mt-2 text-center text-sm text-[#6b6b6b]" style={SF}>
          One program. Covers both exam editions.
        </p>

        {discountActive && (
          <p className="mt-4 text-center text-sm font-semibold text-[#7c1c2e]" style={SF}>
            20% discount active — expires soon
          </p>
        )}

        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {CARDS.map((card) => {
            const price = discountActive ? card.discountedPrice : card.regularPrice
            return (
              <div
                key={card.tier}
                className={`relative flex flex-col rounded-lg border-2 bg-white p-8 ${
                  card.isFeatured ? 'border-[#7c1c2e]' : 'border-[#e8e0e2]'
                }`}
              >
                {card.isFeatured && (
                  <span
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#7c1c2e] px-4 py-1 text-xs font-bold text-white"
                    style={SF}
                  >
                    MOST POPULAR
                  </span>
                )}
                <p className="text-xs font-semibold uppercase tracking-widest text-[#7c1c2e]" style={SF}>
                  {card.name}
                </p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-[#1a1a1a]" style={SE}>
                    ${Math.round(price / 100)}
                  </span>
                  <span className="text-sm text-[#6b6b6b]" style={SF}>/mo</span>
                  {discountActive && (
                    <span className="ml-1 text-lg text-[#6b6b6b] line-through" style={SF}>
                      ${Math.round(card.regularPrice / 100)}
                    </span>
                  )}
                </div>
                {discountActive && (
                  <p className="mt-1 text-sm font-semibold text-[#7c1c2e]" style={SF}>
                    20% off — limited time
                  </p>
                )}
                <p className="mt-2 text-sm text-[#6b6b6b]" style={SF}>
                  {card.description}
                </p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {card.features.map((f, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2.5 text-sm ${
                        i === 0 && card.isFeatured ? 'font-semibold text-[#1a1a1a]' : 'text-[#1a1a1a]'
                      }`}
                      style={SF}
                    >
                      <span className="mt-0.5 shrink-0 text-[#7c1c2e]">
                        {i === 0 && card.isFeatured ? '' : '✓'}
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleSelect(card.tier)}
                  disabled={loadingTier === card.tier}
                  className={`mt-8 w-full rounded py-3.5 text-sm font-semibold transition-colors ${
                    card.isFeatured
                      ? 'bg-[#7c1c2e] text-white hover:bg-[#5a1220] disabled:opacity-60'
                      : 'border-2 border-[#7c1c2e] text-[#7c1c2e] hover:bg-[#f9f0f2] disabled:opacity-60'
                  }`}
                  style={SF}
                >
                  {loadingTier === card.tier ? 'Loading...' : 'Get Instant Access'}
                </button>
                <p className="mt-3 text-center text-xs text-[#6b6b6b]" style={SF}>
                  Monthly Subscription · Cancel anytime
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
