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
    <div className="w-full px-6 py-12 sm:px-10 sm:py-16">
      <section className="text-center">
        <h1 className="font-serif text-3xl font-bold text-gray-900 sm:text-4xl">Blog</h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
          Study tips, exam strategies, and everything you need to know about the Foundations of Reading Test.
        </p>
      </section>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {BLOG_POSTS.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex flex-col rounded-xl border border-[#e8e0e2] bg-white p-8 transition-all hover:border-[#7c1c2e] hover:shadow-sm"
          >
            <p className="text-sm text-gray-400 mb-3">{post.publishedAt}</p>
            <h2 className="font-serif text-xl font-bold text-[#1a1a1a] group-hover:text-[#7c1c2e] leading-snug">
              {post.title}
            </h2>
            <p className="mt-3 text-base text-[#6b6b6b] leading-relaxed line-clamp-3 flex-1">
              {post.metaDescription}
            </p>
            <div className="mt-5 flex items-center text-sm font-medium text-[#7c1c2e] gap-1">
              Read more <ArrowRight className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
    <SiteFooter />
    </>
  )
}
