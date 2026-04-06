export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { removeAuthCookie } from '@/lib/auth'

export async function POST() {
  await removeAuthCookie()
  return NextResponse.redirect(new URL('/login', process.env.NEXT_PUBLIC_BASE_URL || 'https://foundationsofreading.com'))
}
