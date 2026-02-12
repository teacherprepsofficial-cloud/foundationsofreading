import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BLOG_POSTS } from '@/data/blog-posts'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Study tips, exam strategies, and guides for the Foundations of Reading Test (FORT 190/890). Expert advice to help you pass on your first attempt.',
}

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Blog</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Study tips, exam strategies, and everything you need to know about the Foundations of Reading Test.
        </p>
      </section>

      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-blue-300 hover:shadow-md"
          >
            <p className="text-xs text-gray-500">{post.publishedAt}</p>
            <h2 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-blue-600">
              {post.title}
            </h2>
            <p className="mt-2 flex-1 text-sm text-gray-600">
              {post.metaDescription}
            </p>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-blue-600">
              Read more
              <ArrowRight className="h-3.5 w-3.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
