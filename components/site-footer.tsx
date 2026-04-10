import Link from 'next/link'

export function SiteFooter() {
  return (
    <footer className="border-t border-[#e8e0e2] bg-[#1a1a1a]">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-block">
              <p className="text-lg font-bold text-white hover:text-gray-200" style={{ fontFamily: 'var(--font-serif)' }}>
                Foundations of Reading
              </p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-widest text-[#7c1c2e]" style={{ fontFamily: 'var(--font-sans)' }}>
                Test Preparation
              </p>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[#9b9b9b]" style={{ fontFamily: 'var(--font-sans)' }}>
              Complete online prep for the NES Foundations of Reading test (190 &amp; 890).
            </p>
          </div>

          <div style={{ fontFamily: 'var(--font-sans)' }}>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6b6b6b]">Prep</p>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: '/#pricing', label: 'Pricing' },
                { href: '/login', label: 'Log in' },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-[#9b9b9b] hover:text-white">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ fontFamily: 'var(--font-sans)' }}>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6b6b6b]">Learn</p>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: '/blog', label: 'Blog' },
                { href: '/#what-you-get', label: 'What\'s Included' },
              ].map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-[#9b9b9b] hover:text-white">{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div style={{ fontFamily: 'var(--font-sans)' }}>
            <p className="text-xs font-semibold uppercase tracking-wider text-[#6b6b6b]">Company</p>
            <ul className="mt-4 space-y-2.5">
              {[
                { href: '/contact', label: 'Contact' },
                { href: '/privacy', label: 'Privacy Policy' },
                { href: '/terms', label: 'Terms of Use' },
              ].map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-[#9b9b9b] hover:text-white">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#2a2a2a] pt-6">
          <p className="text-center text-xs text-[#6b6b6b]" style={{ fontFamily: 'var(--font-sans)' }}>
            © Foundations of Reading Test Prep. All rights reserved. Not affiliated with Pearson Education or any state licensing board.
          </p>
        </div>
      </div>
    </footer>
  )
}
