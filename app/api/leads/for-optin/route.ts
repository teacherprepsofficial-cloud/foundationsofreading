export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import connectDB from '@/lib/mongodb'
import EmailLead from '@/models/EmailLead'
import VisitorDeadline from '@/models/VisitorDeadline'

const resend = new Resend(process.env.RESEND_API_KEY!)
const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://foundationsofreading.com').trim()
const COOKIE_NAME = 'for_visitor_id'

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

function formatExpiry(date: Date): string {
  return date.toLocaleString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  })
}

export async function POST(request: NextRequest) {
  try {
    const { email, source, pdfSlug } = await request.json()
    if (!email || !source) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    await connectDB()
    const ip = getIp(request)

    // Look up existing discount deadline for this visitor
    const cookieId = request.cookies.get(COOKIE_NAME)?.value
    let discountExpiresAt: Date | undefined

    if (cookieId) {
      const deadline = await VisitorDeadline.findOne({ cookieId })
      if (deadline && deadline.expiresAt.getTime() > Date.now()) {
        discountExpiresAt = deadline.expiresAt
      }
    }

    // Store lead (upsert — don't duplicate same email+source)
    await EmailLead.findOneAndUpdate(
      { email: email.toLowerCase().trim(), source },
      { $setOnInsert: { email: email.toLowerCase().trim(), source, ip, discountExpiresAt } },
      { upsert: true, new: true }
    )

    // PDF download URL
    const pdfUrl = pdfSlug
      ? `${BASE_URL}/api/pdf/${pdfSlug}`
      : `${BASE_URL}/api/pdf/nes-190-guide`

    // Discount section
    const discountBlock = discountExpiresAt ? `
      <div style="background:#fdf2f4;border:2px solid #7c1c2e;border-radius:8px;padding:24px;margin:28px 0;text-align:center;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#7c1c2e;font-family:Arial,sans-serif;">Limited Time Offer</p>
        <h3 style="margin:0 0 10px;font-size:26px;color:#1a1a1a;font-weight:800;font-family:Georgia,serif;">20% Off — Claim Before It Expires</h3>
        <p style="margin:0 0 18px;color:#6b6b6b;font-size:14px;font-family:Arial,sans-serif;">Your discount expires at <strong style="color:#7c1c2e;">${formatExpiry(discountExpiresAt)}</strong></p>
        <a href="${BASE_URL}/#pricing" style="display:inline-block;background:#7c1c2e;color:white;padding:14px 36px;text-decoration:none;border-radius:4px;font-weight:700;font-size:15px;font-family:Arial,sans-serif;">Claim 20% Off Now →</a>
        <p style="margin:12px 0 0;color:#9ca3af;font-size:12px;font-family:Arial,sans-serif;">Discount applied automatically at checkout. No code needed.</p>
      </div>
    ` : `
      <div style="background:#fdf2f4;border:2px solid #7c1c2e;border-radius:8px;padding:24px;margin:28px 0;text-align:center;">
        <p style="margin:0 0 6px;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:#7c1c2e;font-family:Arial,sans-serif;">Special Offer</p>
        <h3 style="margin:0 0 10px;font-size:26px;color:#1a1a1a;font-weight:800;font-family:Georgia,serif;">20% Off — Limited Time</h3>
        <p style="margin:0 0 18px;color:#6b6b6b;font-size:14px;font-family:Arial,sans-serif;">Start your full prep with 20% off today.</p>
        <a href="${BASE_URL}/#pricing" style="display:inline-block;background:#7c1c2e;color:white;padding:14px 36px;text-decoration:none;border-radius:4px;font-weight:700;font-size:15px;font-family:Arial,sans-serif;">Claim 20% Off Now →</a>
      </div>
    `

    const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f0eb;font-family:Arial,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">

    <!-- Header -->
    <div style="background:#7c1c2e;border-radius:8px 8px 0 0;padding:32px;text-align:center;">
      <p style="margin:0 0 6px;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:#e8b4bc;">Foundations of Reading</p>
      <h1 style="margin:0;font-size:22px;color:white;font-family:Georgia,serif;line-height:1.3;">Your Free Quick Reference Guide<br>is Ready to Download</h1>
    </div>

    <!-- Body -->
    <div style="background:white;padding:36px 32px;border-radius:0 0 8px 8px;">
      <p style="font-size:15px;line-height:1.7;color:#333;margin:0 0 20px;">
        Here's your <strong>NES 190 Quick Reference Guide</strong> — a one-stop cheat sheet covering the exam format, all four subareas, key concepts, and open-response strategy.
      </p>

      <!-- PDF Download Button -->
      <div style="text-align:center;margin:28px 0;">
        <a href="${pdfUrl}" style="display:inline-block;background:#1a1a1a;color:white;padding:16px 40px;text-decoration:none;border-radius:4px;font-weight:700;font-size:16px;font-family:Arial,sans-serif;">
          ↓ Download Your PDF Guide
        </a>
        <p style="margin:10px 0 0;color:#9ca3af;font-size:12px;">NES 190 · Quick Reference Guide · PDF</p>
      </div>

      <hr style="border:none;border-top:1px solid #e8e0e2;margin:28px 0;">

      ${discountBlock}

      <hr style="border:none;border-top:1px solid #e8e0e2;margin:28px 0;">

      <p style="font-size:13px;color:#6b6b6b;line-height:1.6;margin:0;">
        You're receiving this because you requested a free resource from <a href="${BASE_URL}" style="color:#7c1c2e;">foundationsofreading.com</a>. We help future teachers pass the NES Foundations of Reading exam.
      </p>
    </div>

    <p style="text-align:center;font-size:11px;color:#9ca3af;margin-top:16px;">
      © Foundations of Reading Test Prep · foundationsofreading.com
    </p>
  </div>
</body>
</html>
    `

    await resend.emails.send({
      from: 'Foundations of Reading <prep@foundationsofreading.com>',
      to: email,
      subject: 'Your Free NES 190 Quick Reference Guide',
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Lead optin error:', err)
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 })
  }
}
