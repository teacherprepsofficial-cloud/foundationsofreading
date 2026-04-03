export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getCurrentUser } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

const PRICE_IDS = {
  starter: process.env.STRIPE_PRICE_STARTER!,
  bundle: process.env.STRIPE_PRICE_BUNDLE!,
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://foundationsofreading.com'

export async function POST(request: NextRequest) {
  try {
    const { tier } = await request.json()
    const priceId = PRICE_IDS[tier as 'starter' | 'bundle']
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
    }

    const stripe = getStripe()
    const auth = await getCurrentUser()

    let stripeCustomerId: string | undefined
    let customerEmail: string | undefined

    if (auth) {
      await connectDB()
      const user = await User.findById(auth.userId)
      if (user?.stripeCustomerId) stripeCustomerId = user.stripeCustomerId
      customerEmail = user?.email
    }

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      ...(stripeCustomerId ? { customer: stripeCustomerId } : customerEmail ? { customer_email: customerEmail } : {}),
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      subscription_data: {
        metadata: {
          examCode: '190',
          tier,
          userId: auth?.userId || '',
        },
      },
      metadata: {
        examCode: '190',
        tier,
        userId: auth?.userId || '',
      },
      success_url: `${BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: BASE_URL,
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
