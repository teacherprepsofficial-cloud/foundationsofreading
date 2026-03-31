import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getCurrentUser } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

const PRICES = {
  '190-starter': {
    regular: 4900, // $49.00
    discounted: 3920, // $39.20 (20% off)
    name: 'NES Foundations of Reading 190 — Starter',
  },
  '190-bundle': {
    regular: 5900,
    discounted: 4720,
    name: 'NES Foundations of Reading 190 — Complete Bundle',
  },
  '890-starter': {
    regular: 4900,
    discounted: 3920,
    name: 'NES Foundations of Reading 890 — Starter',
  },
  '890-bundle': {
    regular: 5900,
    discounted: 4720,
    name: 'NES Foundations of Reading 890 — Complete Bundle',
  },
}

export async function POST(request: NextRequest) {
  try {
    const { examCode, tier, discounted } = await request.json()
    const key = `${examCode}-${tier}` as keyof typeof PRICES
    const priceInfo = PRICES[key]
    if (!priceInfo) {
      return NextResponse.json({ error: 'Invalid product selection' }, { status: 400 })
    }

    const stripe = getStripe()
    const auth = await getCurrentUser()

    let stripeCustomerId: string | undefined

    if (auth) {
      await connectDB()
      const user = await User.findById(auth.userId)
      if (user?.stripeCustomerId) {
        stripeCustomerId = user.stripeCustomerId
      }
    }

    const unitAmount = discounted ? priceInfo.discounted : priceInfo.regular

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      customer: stripeCustomerId,
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            unit_amount: unitAmount,
            product_data: {
              name: priceInfo.name,
              description: '30-day full access. Instant activation.',
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        examCode,
        tier,
        userId: auth?.userId || '',
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}&exam=${examCode}&tier=${tier}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      allow_promotion_codes: false,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
