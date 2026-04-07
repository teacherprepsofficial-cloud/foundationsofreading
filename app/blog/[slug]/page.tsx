import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'
import { getBlogPostBySlug, BLOG_POSTS } from '@/data/blog-posts'
import { BlogEmailOptin } from '@/components/blog-email-optin'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export function generateMetadata({ params }: PageProps): Metadata {
  const post = getBlogPostBySlug(params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.metaDescription,
  }
}

export default function BlogPostPage({ params }: PageProps) {
  const post = getBlogPostBySlug(params.slug)
  if (!post) notFound()

  const otherPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      {/* Back link */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        All posts
      </Link>

      {/* Header */}
      <article className="mt-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <time dateTime={post.publishedAt}>{post.publishedAt}</time>
        </div>
        <h1 className="mt-3 font-serif text-3xl font-bold text-gray-900 sm:text-4xl">
          {post.title}
        </h1>

        {/* Sections */}
        <div className="mt-8 space-y-8">
          {post.sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-serif text-xl font-bold text-gray-900">{section.heading}</h2>
              <p className="mt-3 leading-relaxed text-gray-600">{section.content}</p>
            </section>
          ))}
        </div>
      </article>

      {/* CTA */}
      <section className="mt-14 rounded-2xl bg-maroon-900 px-6 py-12 text-center sm:px-12">
        <h2 className="font-serif text-2xl font-bold text-white">Ready to Start Studying?</h2>
        <p className="mx-auto mt-3 max-w-xl text-maroon-100">
          Our study guide and practice test cover all 4 subareas and 11 objectives of the FORT.
        </p>
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/bundle"
            className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-maroon-900 transition-colors hover:bg-ivory-100"
          >
            Get the Prep Bundle
          </Link>
          <Link
            href="/study-guide"
            className="rounded-lg border border-maroon-400 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-maroon-800"
          >
            Study Guide
          </Link>
        </div>
      </section>

      {/* Email opt-in slide-in */}
      {post.optin && (
        <BlogEmailOptin
          postSlug={post.slug}
          pdfSlug={post.optin.pdfSlug}
          headline={post.optin.headline}
          subheadline={post.optin.subheadline}
          pdfLabel={post.optin.pdfLabel}
        />
      )}

      {/* Other Posts */}
      <section className="mt-14">
        <h2 className="font-serif text-xl font-bold text-gray-900">More Articles</h2>
        <div className="mt-4 space-y-2">
          {otherPosts.map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}`}
              className="group flex items-center justify-between rounded-lg border border-ivory-200 bg-white px-4 py-3 transition-all hover:border-maroon-300 hover:shadow-sm"
            >
              <span className="text-sm font-medium text-gray-700 group-hover:text-maroon-800">
                {p.title}
              </span>
              <ArrowRight className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-maroon-800" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
