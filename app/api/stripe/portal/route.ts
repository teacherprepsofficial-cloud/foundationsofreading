export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { getCurrentUser } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import UserAccess from '@/models/UserAccess'

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://foundationsofreading.com').trim()

export async function GET() {
  try {
    const auth = await getCurrentUser()
    if (!auth) return NextResponse.redirect(`${BASE_URL}/login`)

    await connectDB()
    const user = await User.findById(auth.userId)
    if (!user?.stripeCustomerId) {
      return NextResponse.redirect(`${BASE_URL}/account?error=no-subscription`)
    }

    // Find the active subscription to target for cancellation
    const access = await UserAccess.findOne({
      userId: user._id,
      isActive: true,
      stripeSubscriptionId: { $exists: true, $ne: null },
    }).lean() as { stripeSubscriptionId?: string } | null

    const stripe = getStripe()

    const sessionParams: Parameters<typeof stripe.billingPortal.sessions.create>[0] = {
      customer: user.stripeCustomerId,
      return_url: `${BASE_URL}/account`,
    }

    // If we have a subscription ID, drop the user directly into the cancel flow
    if (access?.stripeSubscriptionId) {
      sessionParams.flow_data = {
        type: 'subscription_cancel',
        subscription_cancel: {
          subscription: access.stripeSubscriptionId,
        },
      }
    }

    const session = await stripe.billingPortal.sessions.create(sessionParams)
    return NextResponse.redirect(session.url)
  } catch (err) {
    console.error('Stripe portal error:', err)
    return NextResponse.redirect(`${BASE_URL}/account`)
  }
}
