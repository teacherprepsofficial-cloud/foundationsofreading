export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://foundationsofreading.com').trim()

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  if (!code) {
    return NextResponse.json({ error: 'No code returned from Pinterest' }, { status: 400 })
  }

  const credentials = Buffer.from(
    `${process.env.PINTEREST_APP_ID}:${process.env.PINTEREST_APP_SECRET}`
  ).toString('base64')

  const res = await fetch('https://api.pinterest.com/v5/oauth/token', {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: `${BASE_URL}/api/pinterest/callback`,
    }).toString(),
  })

  const data = await res.json()

  if (!data.access_token) {
    return NextResponse.json({ error: 'Failed to get access token', detail: data }, { status: 500 })
  }

  // Return token — add this to your Vercel env as PINTEREST_ACCESS_TOKEN
  return NextResponse.json({
    message: 'Success! Copy this access_token into your Vercel environment variables as PINTEREST_ACCESS_TOKEN',
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
  })
}
