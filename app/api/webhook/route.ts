import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { sendPurchaseEmail } from '@/lib/email'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface ProductConfig {
  name: string
  pdfPath: string
}

const PRODUCTS_MAP: Record<string, ProductConfig> = {
  'fort-study-guide': {
    name: 'Complete Study Guide',
    pdfPath: '/downloads/fort-study-guide.pdf',
  },
  'fort-practice-test': {
    name: 'Full-Length Practice Test',
    pdfPath: '/downloads/fort-practice-test.pdf',
  },
  'fort-bundle': {
    name: 'Complete Prep Bundle',
    pdfPath: '/downloads/fort-bundle.pdf',
  },
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json(
      { error: 'Missing stripe-signature header' },
      { status: 400 }
    )
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set')
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    )
  }

  let event: Stripe.Event

  try {
    const stripe = getStripe()
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    console.error('Webhook signature verification failed:', message)
    return NextResponse.json(
      { error: `Webhook Error: ${message}` },
      { status: 400 }
    )
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const customerEmail = session.customer_details?.email
    const customerName = session.customer_details?.name || undefined
    const productId = session.metadata?.productId

    if (!customerEmail) {
      console.error('No customer email found in session:', session.id)
      return NextResponse.json(
        { error: 'No customer email' },
        { status: 400 }
      )
    }

    if (!productId || !PRODUCTS_MAP[productId]) {
      console.error('Invalid product ID in session metadata:', productId)
      return NextResponse.json(
        { error: 'Invalid product in session metadata' },
        { status: 400 }
      )
    }

    const product = PRODUCTS_MAP[productId]

    try {
      await sendPurchaseEmail({
        email: customerEmail,
        customerName,
        productId,
        productName: product.name,
      })

      console.log(
        `Purchase email sent to ${customerEmail} for ${product.name}`
      )
    } catch (emailError) {
      console.error('Failed to send purchase email:', emailError)
      // Return 500 so Stripe retries the webhook
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      )
    }
  }

  return NextResponse.json({ received: true })
}
