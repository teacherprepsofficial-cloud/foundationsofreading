export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://foundationsofreading.com').trim()

export async function GET() {
  const params = new URLSearchParams({
    client_id: process.env.PINTEREST_APP_ID!,
    redirect_uri: `${BASE_URL}/api/pinterest/callback`,
    response_type: 'code',
    scope: 'boards:read,pins:write',
  })
  return NextResponse.redirect(`https://www.pinterest.com/oauth/?${params}`)
}
