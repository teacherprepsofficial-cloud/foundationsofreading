'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

interface NavItem {
  label: string
  href: string
  icon: string
  done?: boolean
  locked?: boolean
  badge?: string
}

interface DashboardSidebarProps {
  nav: NavItem[]
}

export default function DashboardSidebar({ nav }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
  }

  return (
    <aside style={{ width: 240, minWidth: 240, background: '#1a0a0e', display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto' }}>

      {/* Logo */}
      <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 15, fontWeight: 700, color: '#e8b4bc', lineHeight: 1.2 }}>
            Foundations of Reading
          </p>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'rgba(255,255,255,0.4)', marginTop: 2, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            NES 190 &amp; 890 Prep
          </p>
        </Link>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, padding: '12px 0' }}>
        {nav.map((item) => {
          const isActive = pathname === item.href
          const isOverview = item.icon === '⊞'

          return (
            <div key={item.href}>
              {item.locked ? (
                <div
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 20px',
                    opacity: 0.35,
                    cursor: 'not-allowed',
                  }}
                >
                  <span style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)',
                    fontFamily: 'var(--font-sans)', flexShrink: 0,
                  }}>
                    🔒
                  </span>
                  <span style={{ fontFamily: 'var(--font-sans)', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                    {item.label}
                  </span>
                </div>
              ) : (
                <Link
                  href={item.href}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '10px 20px',
                    textDecoration: 'none',
                    background: isActive ? 'rgba(124,28,46,0.5)' : 'transparent',
                    borderLeft: isActive ? '3px solid #e8b4bc' : '3px solid transparent',
                    transition: 'background 0.15s',
                  }}
                >
                  <span style={{
                    width: 24, height: 24, borderRadius: '50%',
                    background: isActive ? '#7c1c2e' : item.done ? '#166534' : 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: isOverview ? 14 : 11, fontWeight: 700,
                    color: isActive || item.done ? 'white' : 'rgba(255,255,255,0.5)',
                    fontFamily: 'var(--font-sans)', flexShrink: 0,
                  }}>
                    {item.done && !isActive ? '✓' : item.icon}
                  </span>
                  <span style={{
                    fontFamily: 'var(--font-sans)', fontSize: 13,
                    color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                    fontWeight: isActive ? 600 : 400,
                    flex: 1,
                  }}>
                    {item.label}
                  </span>
                  {item.badge && (
                    <span style={{
                      background: '#7c1c2e', color: 'white',
                      borderRadius: 10, padding: '1px 7px',
                      fontSize: 10, fontWeight: 700, fontFamily: 'var(--font-sans)',
                    }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 20px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <a
          href="/api/stripe/portal"
          style={{
            fontFamily: 'var(--font-sans)', fontSize: 13,
            color: 'rgba(255,255,255,0.4)',
            textDecoration: 'none',
          }}
        >
          Manage Subscription
        </a>
        <button
          onClick={handleLogout}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontFamily: 'var(--font-sans)', fontSize: 13,
            color: 'rgba(255,255,255,0.4)',
            padding: 0, width: '100%', textAlign: 'left',
          }}
        >
          Log Out
        </button>
      </div>
    </aside>
  )
}
