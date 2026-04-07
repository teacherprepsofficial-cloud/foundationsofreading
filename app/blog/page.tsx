import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BLOG_POSTS } from '@/data/blog-posts'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Study tips, exam strategies, and guides for the Foundations of Reading Test (FORT 190/890). Expert advice to help you pass on your first attempt.',
}

export default function BlogPage() {
  return (
    <>
    <SiteHeader />
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
      <section className="text-center">
        <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">Blog</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Study tips, exam strategies, and everything you need to know about the Foundations of Reading Test.
        </p>
      </section>

      <div className="mt-10 flex flex-col gap-4">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-center justify-between rounded-xl border border-[#e8e0e2] bg-white px-6 py-5 transition-all hover:border-[#7c1c2e] hover:shadow-sm"
          >
            <div className="flex-1 min-w-0 pr-6">
              <p className="text-xs text-gray-400 mb-1">{post.publishedAt}</p>
              <h2 className="font-serif text-lg font-bold text-[#1a1a1a] group-hover:text-[#7c1c2e] leading-snug">
                {post.title}
              </h2>
              <p className="mt-1 text-sm text-[#6b6b6b] leading-relaxed line-clamp-2">
                {post.metaDescription}
              </p>
            </div>
            <ArrowRight className="h-5 w-5 flex-shrink-0 text-[#e8e0e2] group-hover:text-[#7c1c2e] transition-colors" />
          </Link>
        ))}
      </div>
    </div>
    <SiteFooter />
    </>
  )
}
