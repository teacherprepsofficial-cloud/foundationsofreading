import { NextRequest, NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'

interface ProductConfig {
  stripePriceId: string
  name: string
  slug: string
  pdfPath: string
}

const PRODUCTS_MAP: Record<string, ProductConfig> = {
  'fort-study-guide': {
    stripePriceId: process.env.STRIPE_STUDY_GUIDE_PRICE_ID || '',
    name: 'Complete Study Guide',
    slug: 'study-guide',
    pdfPath: '/downloads/fort-study-guide.pdf',
  },
  'fort-practice-test': {
    stripePriceId: process.env.STRIPE_PRACTICE_TEST_PRICE_ID || '',
    name: 'Full-Length Practice Test',
    slug: 'practice-test',
    pdfPath: '/downloads/fort-practice-test.pdf',
  },
  'fort-bundle': {
    stripePriceId: process.env.STRIPE_BUNDLE_PRICE_ID || '',
    name: 'Complete Prep Bundle',
    slug: 'bundle',
    pdfPath: '/downloads/fort-bundle.pdf',
  },
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { productId } = body as { productId: string }

    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      )
    }

    const product = PRODUCTS_MAP[productId]
    if (!product) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      )
    }

    if (!product.stripePriceId) {
      return NextResponse.json(
        { error: 'Product is not configured for checkout' },
        { status: 500 }
      )
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://foundationsofreading.com'
    const stripe = getStripe()

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: product.stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/${product.slug}?canceled=true`,
      customer_creation: 'always',
      metadata: {
        productId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)

    const message =
      error instanceof Error ? error.message : 'An unexpected error occurred'

    return NextResponse.json({ error: message }, { status: 500 })
  }
}
