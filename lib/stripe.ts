import Stripe from 'stripe'

export function getStripe(): Stripe {
  return new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2026-01-28.clover',
    httpClient: Stripe.createFetchHttpClient(),
  })
}
