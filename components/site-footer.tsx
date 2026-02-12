import Link from 'next/link'

const FOOTER_LINKS = [
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy' },
  { href: '/terms', label: 'Terms' },
  { href: '/blog', label: 'Blog' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-maroon-950 bg-maroon-900">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <p className="font-serif font-semibold text-ivory-200">
              Foundations of Reading Test Prep
            </p>
            <p className="mt-1 text-sm text-ivory-200/60">
              All rights reserved.
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {FOOTER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-ivory-100 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
