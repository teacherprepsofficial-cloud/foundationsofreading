export interface Product {
  id: string
  name: string
  slug: string
  tagline: string
  description: string
  price: number
  comparePrice?: number
  stripePriceId: string
  features: string[]
  badge?: string
}

export const PRODUCTS: Record<string, Product> = {
  studyGuide: {
    id: 'fort-study-guide',
    name: 'Complete Study Guide',
    slug: 'study-guide',
    tagline: 'Master every objective',
    description: 'Comprehensive study guide covering all 4 subareas and 11 objectives of the Foundations of Reading Test. Includes key terms, evidence-based strategies, and constructed response writing tips.',
    price: 3999,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_STUDY_GUIDE_PRICE_ID || '',
    features: [
      'All 4 subareas covered in depth',
      '11 objectives with detailed explanations',
      'Key vocabulary and definitions for each topic',
      'Evidence-based instructional strategies',
      'Constructed response writing guide with sample essays',
      'Phonemic awareness, phonics, and fluency breakdowns',
      'Reading comprehension strategy frameworks',
      'Assessment types and intervention approaches',
    ],
  },
  practiceTest: {
    id: 'fort-practice-test',
    name: 'Full-Length Practice Test',
    slug: 'practice-test',
    tagline: 'Simulate the real exam',
    description: '100 multiple-choice questions and 2 constructed response prompts matching the real FORT exam format. Includes detailed answer explanations and score breakdown by subarea.',
    price: 2999,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRACTICE_TEST_PRICE_ID || '',
    features: [
      '100 multiple-choice questions',
      '2 open-response constructed response prompts',
      'Detailed answer explanations for every question',
      'Score breakdown by subarea',
      'Matches real exam format, difficulty, and timing',
      'Sample constructed response essays scored 4/4',
      'Questions distributed by official exam weights',
    ],
  },
  bundle: {
    id: 'fort-bundle',
    name: 'Complete Prep Bundle',
    slug: 'bundle',
    tagline: 'Everything you need to pass',
    description: 'Get both the Complete Study Guide and Full-Length Practice Test at a discount. The most comprehensive FORT prep package available.',
    price: 5999,
    comparePrice: 6998,
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_BUNDLE_PRICE_ID || '',
    badge: 'SAVE $10',
    features: [
      'Complete Study Guide (all 11 objectives)',
      'Full-Length Practice Test (100 MCQ + 2 CR)',
      'Detailed answer explanations',
      'Constructed response writing guide',
      'Score breakdown by subarea',
      'Save $10 vs buying separately',
    ],
  },
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function getProductBySlug(slug: string): Product | undefined {
  return Object.values(PRODUCTS).find(p => p.slug === slug)
}
