export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getCurrentUser } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://foundationsofreading.com').trim()

export async function GET() {
  try {
    const auth = await getCurrentUser()
    if (!auth) return NextResponse.redirect(`${BASE_URL}/login`)

    await connectDB()
    const user = await User.findById(auth.userId)
    if (!user?.stripeCustomerId) {
      return NextResponse.redirect(`${BASE_URL}/dashboard`)
    }

    const stripe = getStripe()
    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripeCustomerId,
      return_url: `${BASE_URL}/dashboard`,
    })

    return NextResponse.redirect(session.url)
  } catch (err) {
    console.error('Stripe portal error:', err)
    return NextResponse.redirect(`${BASE_URL}/dashboard`)
  }
}
