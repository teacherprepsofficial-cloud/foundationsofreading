import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react'
import { getBlogPostBySlug, BLOG_POSTS } from '@/data/blog-posts'
import { BlogEmailOptin } from '@/components/blog-email-optin'
import { FreePracticeQuiz } from '@/components/free-practice-quiz'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

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
    <>
      <SiteHeader />
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
                {section.html ? (
                  <div className="mt-3 leading-relaxed text-gray-600 blog-html" dangerouslySetInnerHTML={{ __html: section.content }} />
                ) : (
                  <p className="mt-3 leading-relaxed text-gray-600">{section.content}</p>
                )}
              </section>
            ))}
          </div>

          {/* Interactive quiz (if enabled for this post) */}
          {post.quiz && (
            <div className="mt-10">
              <h2 className="font-serif text-xl font-bold text-gray-900 mb-4">
                Free 25-Question Practice Test
              </h2>
              <FreePracticeQuiz />
            </div>
          )}
        </article>

        {/* CTA */}
        <section className="mt-14 rounded-2xl bg-[#7c1c2e] px-6 py-12 text-center sm:px-12">
          <h2 className="font-serif text-2xl font-bold text-white">Ready to Start Studying?</h2>
          <p className="mx-auto mt-3 max-w-xl text-[#e8c8cc]">
            Everything you need to pass the Foundations of Reading Test — study guide, practice tests, flashcards, and AI-graded written responses.
          </p>
          <div className="mt-6 flex justify-center">
            <Link
              href="/#pricing"
              className="rounded-lg bg-white px-8 py-3 text-sm font-semibold text-[#7c1c2e] transition-colors hover:bg-[#faf8f5]"
            >
              Start Studying
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
                className="group flex items-center justify-between rounded-lg border border-[#e8e0e2] bg-white px-4 py-3 transition-all hover:border-[#7c1c2e] hover:shadow-sm"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-[#7c1c2e]">
                  {p.title}
                </span>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-gray-400 group-hover:text-[#7c1c2e]" />
              </Link>
            ))}
          </div>
        </section>
      </div>
      <SiteFooter />
    </>
  )
}
