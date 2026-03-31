import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import UserAccess from '@/models/UserAccess'
import type { ExamCode, AccessTier } from '@/models/UserAccess'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')!

  let event
  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as {
      id: string
      customer: string | null
      customer_details?: { email?: string; name?: string }
      payment_intent: string | null
      metadata: { examCode?: string; tier?: string; userId?: string }
      amount_total: number
    }

    await connectDB()

    const examCode = session.metadata.examCode as ExamCode
    const tier = session.metadata.tier as AccessTier
    const customerEmail = session.customer_details?.email
    const customerName = session.customer_details?.name

    if (!examCode || !tier || !customerEmail) {
      console.error('Webhook missing metadata', session.metadata)
      return NextResponse.json({ received: true })
    }

    // Find or create user
    let user = await User.findOne({ email: customerEmail.toLowerCase() })
    if (!user) {
      // New user — create account with temp password (they'll set one via email)
      const tempPassword = Math.random().toString(36).slice(-12)
      user = await User.create({
        name: customerName || customerEmail.split('@')[0],
        email: customerEmail,
        password: tempPassword,
        stripeCustomerId: session.customer || undefined,
      })
    } else if (session.customer && !user.stripeCustomerId) {
      user.stripeCustomerId = session.customer
      await user.save()
    }

    // Grant 30-day access
    const purchaseDate = new Date()
    const expiresAt = new Date(purchaseDate)
    expiresAt.setDate(expiresAt.getDate() + 30)

    await UserAccess.create({
      userId: user._id,
      examCode,
      tier,
      purchaseDate,
      expiresAt,
      stripeSessionId: session.id,
      stripePaymentIntentId: session.payment_intent || undefined,
    })

    // Send welcome email with login link
    const loginUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/login`
    const dashboardUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard/${examCode}`
    const examName = examCode === '190' ? 'NES Foundations of Reading 190' : 'NES Foundations of Reading 890'

    await resend.emails.send({
      from: 'Foundations of Reading <prep@foundationsofreading.com>',
      to: customerEmail,
      subject: `You're enrolled — ${examName} Prep`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #7c1c2e; padding: 32px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Foundations of Reading</h1>
            <p style="color: #f0d0d5; margin: 8px 0 0; font-size: 14px;">Test Preparation</p>
          </div>
          <div style="padding: 40px 32px;">
            <h2 style="color: #7c1c2e; margin: 0 0 16px;">You're enrolled, ${customerName?.split(' ')[0] || 'there'}.</h2>
            <p>Your 30-day access to the <strong>${examName}</strong> ${tier === 'bundle' ? 'Complete Bundle' : 'Starter Pack'} is now active.</p>
            <p>Your access expires on <strong>${expiresAt.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</strong>.</p>
            <div style="margin: 32px 0; text-align: center;">
              <a href="${dashboardUrl}" style="background: #7c1c2e; color: white; padding: 14px 32px; border-radius: 4px; text-decoration: none; font-size: 16px; display: inline-block;">
                Start Studying Now
              </a>
            </div>
            <p style="font-size: 14px; color: #666;">
              Login at <a href="${loginUrl}" style="color: #7c1c2e;">${loginUrl}</a> with your email address.
              ${!session.metadata.userId ? `<br><br>You'll be prompted to set your password on first login.` : ''}
            </p>
          </div>
          <div style="background: #f9f5f5; padding: 20px 32px; font-size: 12px; color: #999; text-align: center;">
            © Foundations of Reading Test Prep. All rights reserved.
          </div>
        </div>
      `,
    })
  }

  return NextResponse.json({ received: true })
}

export const dynamic = 'force-dynamic'
