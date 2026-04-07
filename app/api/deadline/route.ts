export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { randomUUID } from 'crypto'
import connectDB from '@/lib/mongodb'
import VisitorDeadline from '@/models/VisitorDeadline'

const DURATION_MS = 30 * 60 * 1000
const COOKIE_NAME = 'for_visitor_id'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

export async function GET(request: NextRequest) {
  await connectDB()

  const ip = getIp(request)
  const fingerprintId = request.nextUrl.searchParams.get('fp') || undefined
  const existingCookieId = request.cookies.get(COOKIE_NAME)?.value

  // Look up existing deadline: cookie → fingerprint → IP (in order of reliability)
  let record = null

  if (existingCookieId) {
    record = await VisitorDeadline.findOne({ cookieId: existingCookieId })
  }

  if (!record && fingerprintId) {
    record = await VisitorDeadline.findOne({ fingerprintId })
  }

  if (!record && ip !== 'unknown') {
    record = await VisitorDeadline.findOne({ ip })
  }

  const now = Date.now()

  // If found and not expired, return existing deadline
  if (record && record.expiresAt.getTime() > now) {
    // Update fingerprint/IP if we have new info
    let dirty = false
    if (fingerprintId && !record.fingerprintId) { record.fingerprintId = fingerprintId; dirty = true }
    if (ip !== 'unknown' && !record.ip) { record.ip = ip; dirty = true }
    if (dirty) await record.save()

    const res = NextResponse.json({ expiresAt: record.expiresAt.getTime() })
    res.cookies.set(COOKIE_NAME, record.cookieId, { maxAge: COOKIE_MAX_AGE, path: '/', httpOnly: true, sameSite: 'lax' })
    return res
  }

  // Create new deadline
  const cookieId = existingCookieId || randomUUID()
  const expiresAt = new Date(now + DURATION_MS)

  if (record) {
    // Expired record — reset it
    record.expiresAt = expiresAt
    if (fingerprintId) record.fingerprintId = fingerprintId
    if (ip !== 'unknown') record.ip = ip
    await record.save()
  } else {
    try {
      await VisitorDeadline.create({ cookieId, fingerprintId, ip: ip !== 'unknown' ? ip : undefined, expiresAt })
    } catch {
      // Race condition — fetch the record that was just created
      const existing = await VisitorDeadline.findOne({ cookieId })
      if (existing) {
        const res = NextResponse.json({ expiresAt: existing.expiresAt.getTime() })
        res.cookies.set(COOKIE_NAME, cookieId, { maxAge: COOKIE_MAX_AGE, path: '/', httpOnly: true, sameSite: 'lax' })
        return res
      }
    }
  }

  const res = NextResponse.json({ expiresAt: expiresAt.getTime() })
  res.cookies.set(COOKIE_NAME, cookieId, { maxAge: COOKIE_MAX_AGE, path: '/', httpOnly: true, sameSite: 'lax' })
  return res
}
