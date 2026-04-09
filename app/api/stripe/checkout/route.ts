export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://foundationsofreading.com').trim()

// Use raw fetch to Stripe API — the Stripe SDK Node http client fails on Vercel serverless
// but native fetch works fine (confirmed via /api/stripe/test endpoint)
async function stripePost(path: string, params: Record<string, string>): Promise<Record<string, unknown>> {
  const body = new URLSearchParams(params).toString()
  const res = await fetch(`https://api.stripe.com${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY?.trim()}`,
      'Content-Type': 'application/x-www-form-urlencoded',
      'Stripe-Version': '2024-06-20',
    },
    body,
  })
  return res.json() as Promise<Record<string, unknown>>
}

export async function POST(request: NextRequest) {
  try {
    const { tier, discounted } = await request.json()

    const PRICE_IDS: Record<string, string | undefined> = {
      starter: process.env.STRIPE_PRICE_STARTER?.trim(),
      bundle: process.env.STRIPE_PRICE_BUNDLE?.trim(),
    }

    const priceId = PRICE_IDS[tier as string]
    if (!priceId) {
      return NextResponse.json({ error: `Invalid plan or missing price ID for tier: ${tier}` }, { status: 400 })
    }

    const auth = await getCurrentUser()

    let stripeCustomerId: string | undefined
    let customerEmail: string | undefined

    if (auth) {
      await connectDB()
      const user = await User.findById(auth.userId)
      if (user?.stripeCustomerId) stripeCustomerId = user.stripeCustomerId
      if (user?.email) customerEmail = user.email
    }

    const params: Record<string, string> = {
      mode: 'subscription',
      'payment_method_types[]': 'card',
      'line_items[0][price]': priceId,
      'line_items[0][quantity]': '1',
      'subscription_data[metadata][examCode]': '190',
      'subscription_data[metadata][tier]': tier,
      'subscription_data[metadata][userId]': auth?.userId || '',
      'metadata[examCode]': '190',
      'metadata[tier]': tier,
      'metadata[userId]': auth?.userId || '',
      success_url: `${BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&exam=190&tier=${tier}`,
      cancel_url: BASE_URL,
      allow_promotion_codes: 'true',
    }

    // Auto-apply 20% promo only when user came from email discount link
    const promoCode = process.env.STRIPE_PROMO_20?.trim()
    if (promoCode && discounted) {
      params['discounts[0][promotion_code]'] = promoCode
      delete params.allow_promotion_codes // can't combine with discounts[]
    }

    if (stripeCustomerId) {
      params.customer = stripeCustomerId
    } else if (customerEmail) {
      params.customer_email = customerEmail
    }

    const session = await stripePost('/v1/checkout/sessions', params)

    if (session.error) {
      console.error('Stripe error:', session.error)
      return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
    }

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session', detail: msg }, { status: 500 })
  }
}
