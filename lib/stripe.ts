import Stripe from 'stripe'

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not set')
  return new Stripe(key, {
    apiVersion: '2025-08-27.basil',
    // Node http client fails in Vercel serverless; use native fetch instead
    httpClient: Stripe.createFetchHttpClient(),
  })
}
