import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'

// This page is bypassed by the beforeFiles rewrite in next.config.mjs
// (/dashboard → /dashboard/190 internally). It serves as a fallback only.
export default async function DashboardPage() {
  const auth = await getCurrentUser()
  if (!auth) redirect('/login')
  redirect('/dashboard/190')
}
