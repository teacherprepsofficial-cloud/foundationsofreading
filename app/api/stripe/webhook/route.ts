export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import UserAccess from '@/models/UserAccess'
import type { ExamCode, AccessTier } from '@/models/UserAccess'
import { Resend } from 'resend'
import Stripe from 'stripe'
import crypto from 'crypto'

const resend = new Resend(process.env.RESEND_API_KEY!)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://foundationsofreading.com'

// For subscriptions, access is controlled by isActive — not a fixed expiry date.
// Set expiresAt far in the future while subscription is active.
function activeExpiresAt() {
  return new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000)
}

function tierFromPriceId(priceId: string): AccessTier {
  if (priceId === process.env.STRIPE_PRICE_BUNDLE) return 'bundle'
  return 'starter'
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  await connectDB()

  // ── checkout.session.completed ────────────────────────────────────────────
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const examCode = (session.metadata?.examCode || '190') as ExamCode
    const tier = (session.metadata?.tier || 'starter') as AccessTier
    const customerEmail = session.customer_details?.email
    const customerName = session.customer_details?.name
    const subscriptionId = session.subscription as string
    const customerId = session.customer as string

    if (!customerEmail || !subscriptionId) {
      console.error('Webhook missing email or subscription', session.id)
      return NextResponse.json({ received: true })
    }

    // Find or create user
    let user = await User.findOne({ email: customerEmail.toLowerCase() })
    if (!user) {
      user = await User.create({
        name: customerName || customerEmail.split('@')[0],
        email: customerEmail.toLowerCase(),
        password: Math.random().toString(36).slice(-12),
        stripeCustomerId: customerId,
      })
    } else if (customerId && !user.stripeCustomerId) {
      user.stripeCustomerId = customerId
      await user.save()
    }

    // Deactivate any existing access for this user+exam
    await UserAccess.updateMany(
      { userId: user._id, examCode, isActive: true },
      { isActive: false }
    )

    // Create new subscription access — active until cancelled
    await UserAccess.create({
      userId: user._id,
      examCode,
      tier,
      purchaseDate: new Date(),
      expiresAt: activeExpiresAt(),
      stripeSessionId: session.id,
      stripeSubscriptionId: subscriptionId,
      stripeCustomerId: customerId,
      isActive: true,
    })

    // Send welcome email with set-password link (7-day token)
    const token = crypto.randomBytes(32).toString('hex')
    user.resetPasswordToken = token
    user.resetPasswordExpires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    await user.save()

    const setPasswordUrl = `${BASE_URL}/reset-password?token=${token}`

    await resend.emails.send({
      from: 'Foundations of Reading <prep@foundationsofreading.com>',
      to: customerEmail,
      subject: "You're enrolled — set your password to get started",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #7c1c2e; padding: 28px 32px;">
            <p style="margin: 0; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #e8b4bc;">Foundations of Reading</p>
            <h1 style="margin: 6px 0 0; font-size: 22px; color: white; font-family: Georgia, serif;">You're enrolled.</h1>
          </div>
          <div style="padding: 36px 32px;">
            <p style="font-size: 15px; line-height: 1.7; color: #333; margin: 0 0 20px;">
              Hi ${customerName?.split(' ')[0] || 'there'}, your subscription is active. Set your password below to access your study program.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${setPasswordUrl}" style="background: #7c1c2e; color: white; padding: 14px 32px; border-radius: 4px; text-decoration: none; font-size: 15px; font-weight: 600; display: inline-block;">
                Set Your Password →
              </a>
            </div>
            <p style="font-size: 13px; color: #777; margin: 0;">This link expires in 7 days. After setting your password, log in at <a href="${BASE_URL}/login" style="color: #7c1c2e;">${BASE_URL}/login</a>.</p>
          </div>
        </div>
      `,
    })
  }

  // ── invoice.paid — monthly renewal ───────────────────────────────────────
  if (event.type === 'invoice.paid') {
    const invoice = event.data.object as Stripe.Invoice & { subscription?: string }
    const subscriptionId = invoice.subscription
    if (!subscriptionId) return NextResponse.json({ received: true })

    await UserAccess.findOneAndUpdate(
      { stripeSubscriptionId: subscriptionId },
      { isActive: true, expiresAt: activeExpiresAt() }
    )
  }

  // ── customer.subscription.deleted — cancelled ─────────────────────────────
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription
    const access = await UserAccess.findOneAndUpdate(
      { stripeSubscriptionId: subscription.id },
      { isActive: false },
      { new: true }
    )

    if (access) {
      const user = await User.findById(access.userId)
      if (user?.email) {
        await resend.emails.send({
          from: 'Foundations of Reading <prep@foundationsofreading.com>',
          to: user.email,
          subject: 'Your subscription has been cancelled',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; padding: 40px 32px;">
              <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #7c1c2e; margin: 0 0 8px;">Foundations of Reading</p>
              <h1 style="font-family: Georgia, serif; font-size: 22px; margin: 0 0 16px;">Subscription cancelled</h1>
              <p style="font-size: 15px; line-height: 1.7; color: #333; margin: 0 0 16px;">Your subscription has been cancelled and your access has ended. If this was a mistake, you can re-subscribe at any time.</p>
              <a href="${BASE_URL}/#pricing" style="background: #7c1c2e; color: white; padding: 12px 28px; border-radius: 4px; text-decoration: none; font-size: 14px; font-weight: 600; display: inline-block;">Re-subscribe</a>
            </div>
          `,
        })
      }
    }
  }

  // ── customer.subscription.updated — plan change ───────────────────────────
  if (event.type === 'customer.subscription.updated') {
    const subscription = event.data.object as Stripe.Subscription
    const priceId = subscription.items.data[0]?.price?.id
    if (!priceId) return NextResponse.json({ received: true })

    const newTier = tierFromPriceId(priceId)
    const isActive = subscription.status === 'active'

    await UserAccess.findOneAndUpdate(
      { stripeSubscriptionId: subscription.id },
      { tier: newTier, isActive, expiresAt: isActive ? activeExpiresAt() : new Date() }
    )
  }

  // ── invoice.payment_failed — warn user ───────────────────────────────────
  if (event.type === 'invoice.payment_failed') {
    const invoice = event.data.object as Stripe.Invoice & { customer_email?: string }
    const email = invoice.customer_email
    if (email) {
      await resend.emails.send({
        from: 'Foundations of Reading <prep@foundationsofreading.com>',
        to: email,
        subject: 'Payment failed — update your billing info',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto; color: #1a1a1a; padding: 40px 32px;">
            <p style="font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #7c1c2e; margin: 0 0 8px;">Foundations of Reading</p>
            <h1 style="font-family: Georgia, serif; font-size: 22px; margin: 0 0 16px;">Payment failed</h1>
            <p style="font-size: 15px; line-height: 1.7; color: #333; margin: 0 0 16px;">We were unable to process your subscription payment. Please update your billing information to keep your access active.</p>
            <a href="${BASE_URL}/api/stripe/portal" style="background: #7c1c2e; color: white; padding: 12px 28px; border-radius: 4px; text-decoration: none; font-size: 14px; font-weight: 600; display: inline-block;">Update Billing Info</a>
          </div>
        `,
      })
    }
  }

  return NextResponse.json({ received: true })
}
