'use client'

import { useState } from 'react'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

export default function ContactPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      if (!res.ok) throw new Error()
      setStatus('sent')
      setName('')
      setEmail('')
      setMessage('')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-6 py-16" style={{ fontFamily: 'var(--font-sans)' }}>
        <h1
          className="text-3xl font-bold text-[#1a1a1a] sm:text-4xl"
          style={{ fontFamily: 'var(--font-serif)' }}
        >
          Contact Us
        </h1>
        <p className="mt-3 text-[#6b6b6b]">
          Have a question about the Foundations of Reading test or your prep? Send us a message and we&apos;ll get back to you as soon as we can.
        </p>

        {status === 'sent' ? (
          <div className="mt-8 rounded-lg border border-green-200 bg-green-50 p-6">
            <p className="font-semibold text-green-800">Message sent!</p>
            <p className="mt-1 text-sm text-green-700">
              Thanks for reaching out. We&apos;ll get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#1a1a1a]">
                Name
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#e8e0e2] px-4 py-2.5 text-sm text-[#1a1a1a] outline-none transition focus:border-[#7c1c2e] focus:ring-2 focus:ring-[#7c1c2e]/20"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#1a1a1a]">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-[#e8e0e2] px-4 py-2.5 text-sm text-[#1a1a1a] outline-none transition focus:border-[#7c1c2e] focus:ring-2 focus:ring-[#7c1c2e]/20"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#1a1a1a]">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="mt-1.5 w-full resize-y rounded-lg border border-[#e8e0e2] px-4 py-2.5 text-sm text-[#1a1a1a] outline-none transition focus:border-[#7c1c2e] focus:ring-2 focus:ring-[#7c1c2e]/20"
                placeholder="How can we help?"
              />
            </div>

            {status === 'error' && (
              <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="rounded-lg bg-[#7c1c2e] px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-[#5a1220] disabled:opacity-60"
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </main>
      <SiteFooter />
    </>
  )
}
