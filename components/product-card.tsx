import Link from 'next/link'
import { Check } from 'lucide-react'
import { type Product, formatPrice } from '@/data/products'

interface ProductCardProps {
  product: Product
  featured?: boolean
}

export function ProductCard({ product, featured = false }: ProductCardProps) {
  return (
    <div
      className={`relative flex flex-col rounded-2xl border p-8 ${
        featured
          ? 'border-blue-600 bg-white shadow-lg ring-1 ring-blue-600'
          : 'border-gray-200 bg-white'
      }`}
    >
      {product.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center rounded-full bg-blue-600 px-4 py-1 text-xs font-bold text-white">
            {product.badge}
          </span>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
        <p className="mt-2 text-sm text-gray-600">{product.tagline}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-gray-900">
            {formatPrice(product.price)}
          </span>
          {product.comparePrice && (
            <span className="text-lg text-gray-400 line-through">
              {formatPrice(product.comparePrice)}
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-gray-500">One-time purchase, instant download</p>
      </div>

      <ul className="mb-8 flex-1 space-y-3">
        {product.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3">
            <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600" />
            <span className="text-sm text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href={`/${product.slug}`}
        className={`block rounded-lg px-6 py-3 text-center text-sm font-semibold transition-colors ${
          featured
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50'
        }`}
      >
        {featured ? `Get the ${product.name}` : `View ${product.name}`}
      </Link>
    </div>
  )
}
