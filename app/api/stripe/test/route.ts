export const dynamic = 'force-dynamic'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test 1: raw fetch to Stripe
    const res = await fetch('https://api.stripe.com/v1/prices/' + process.env.STRIPE_PRICE_STARTER, {
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
      },
    })
    const data = await res.json()
    return NextResponse.json({ status: res.status, active: data.active, id: data.id, error: data.error })
  } catch (err: unknown) {
    return NextResponse.json({ fetchError: err instanceof Error ? err.message : String(err) })
  }
}
