import Link from 'next/link'

const RESOURCES = [
  { href: '/study-guide', label: 'Study Guide' },
  { href: '/practice-test', label: 'Practice Test' },
  { href: '/bundle', label: 'Prep Bundle' },
]

const EXAM_LINKS = [
  { href: '/blog/foundations-of-reading-test-format', label: 'Test Format' },
  { href: '/blog/foundations-of-reading-passing-score', label: 'Passing Scores' },
  { href: '/blog/foundations-of-reading-registration', label: 'Registration' },
]

const SITE_LINKS = [
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms of Use' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-ivory-200 bg-gray-900">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <p className="font-serif text-lg font-bold text-white">
              Foundations of Reading
            </p>
            <p className="mt-1 text-xs uppercase tracking-wider text-gray-400">
              Test Preparation
            </p>
            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              Comprehensive study materials for the FORT 190/890 teacher certification exam.
            </p>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Resources
            </p>
            <ul className="mt-4 space-y-2.5">
              {RESOURCES.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Exam Info */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Exam Information
            </p>
            <ul className="mt-4 space-y-2.5">
              {EXAM_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              Site
            </p>
            <ul className="mt-4 space-y-2.5">
              {SITE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-800 pt-6">
          <p className="text-center text-xs text-gray-500">
            All rights reserved. Not affiliated with Pearson Education or any state licensing board.
          </p>
        </div>
      </div>
    </footer>
  )
}
