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
    <header
      style={{
        background: '#1a0a0e',
        position: 'sticky',
        top: 0,
        zIndex: 40,
        width: '100%',
      }}
    >
      {/* Top row: logo + account */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <Link href="/dashboard" style={{ textDecoration: 'none', display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 15,
              fontWeight: 700,
              color: '#e8b4bc',
            }}
          >
            Foundations of Reading
          </span>
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 10,
              color: 'rgba(255,255,255,0.4)',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            NES 190 &amp; 890 Prep
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Link
            href="/account"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 12,
              color: 'rgba(255,255,255,0.4)',
              textDecoration: 'none',
            }}
          >
            My Account
          </Link>
          <button
            onClick={handleLogout}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              fontSize: 12,
              color: 'rgba(255,255,255,0.4)',
              padding: 0,
            }}
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Nav row */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          padding: '0 16px',
          overflowX: 'auto',
        }}
      >
        {nav.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href))
          const isOverview = item.icon === '⊞'

          if (item.locked) {
            return (
              <div
                key={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 14px',
                  opacity: 0.3,
                  cursor: 'not-allowed',
                  whiteSpace: 'nowrap',
                }}
              >
                <span
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 9,
                    color: 'rgba(255,255,255,0.5)',
                    fontFamily: 'var(--font-sans)',
                    flexShrink: 0,
                  }}
                >
                  🔒
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  {item.label}
                </span>
              </div>
            )
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '10px 14px',
                textDecoration: 'none',
                borderBottom: isActive ? '2px solid #e8b4bc' : '2px solid transparent',
                whiteSpace: 'nowrap',
                transition: 'border-color 0.15s',
              }}
            >
              <span
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: isActive ? '#7c1c2e' : item.done ? '#166534' : 'rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: isOverview ? 12 : 10,
                  fontWeight: 700,
                  color: isActive || item.done ? 'white' : 'rgba(255,255,255,0.5)',
                  fontFamily: 'var(--font-sans)',
                  flexShrink: 0,
                }}
              >
                {item.done && !isActive ? '✓' : item.icon}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 12,
                  color: isActive ? 'white' : 'rgba(255,255,255,0.7)',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {item.label}
              </span>
              {item.badge && (
                <span
                  style={{
                    background: '#7c1c2e',
                    color: 'white',
                    borderRadius: 10,
                    padding: '1px 6px',
                    fontSize: 9,
                    fontWeight: 700,
                    fontFamily: 'var(--font-sans)',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </nav>
    </header>
  )
}
