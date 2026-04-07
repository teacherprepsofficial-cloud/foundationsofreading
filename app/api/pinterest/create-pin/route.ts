export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'

const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://foundationsofreading.com').trim()

export async function POST(request: NextRequest) {
  try {
    const { title, description, link, boardId, imageUrl } = await request.json()

    const accessToken = process.env.PINTEREST_ACCESS_TOKEN
    if (!accessToken) {
      return NextResponse.json({ error: 'PINTEREST_ACCESS_TOKEN not configured' }, { status: 500 })
    }

    const pin = {
      board_id: boardId,
      title,
      description,
      link,
      media_source: {
        source_type: 'image_url',
        url: imageUrl || `${BASE_URL}/api/og?title=${encodeURIComponent(title)}`,
      },
    }

    const res = await fetch('https://api.pinterest.com/v5/pins', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pin),
    })

    const data = await res.json()

    if (!res.ok) {
      return NextResponse.json({ error: 'Pinterest API error', detail: data }, { status: 500 })
    }

    return NextResponse.json({ success: true, pin: data })
  } catch (err) {
    console.error('Pinterest create-pin error:', err)
    return NextResponse.json({ error: 'Failed to create pin' }, { status: 500 })
  }
}
