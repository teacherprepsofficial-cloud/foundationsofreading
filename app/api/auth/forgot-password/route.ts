export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const BASE_URL = (process.env.NEXT_PUBLIC_BASE_URL || 'https://foundationsofreading.com').trim()

export async function POST(request: NextRequest) {
  try {
    await connectDB()
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    const user = await User.findOne({ email: email.toLowerCase() })

    // Always return success to avoid email enumeration
    if (!user) {
      return NextResponse.json({ success: true })
    }

    const token = crypto.randomBytes(32).toString('hex')
    user.resetPasswordToken = token
    user.resetPasswordExpires = new Date(Date.now() + 60 * 60 * 1000) // 1 hour
    await user.save()

    const resetUrl = `${BASE_URL}/reset-password?token=${token}`

    await resend.emails.send({
      from: 'Foundations of Reading <noreply@foundationsofreading.com>',
      to: user.email,
      subject: 'Reset your password',
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; padding: 40px 24px; background: #faf8f5;">
          <p style="font-family: Arial, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: #7c1c2e; margin: 0 0 8px;">
            Foundations of Reading
          </p>
          <h1 style="font-size: 26px; color: #1a1a1a; margin: 0 0 16px;">Reset your password</h1>
          <p style="font-family: Arial, sans-serif; font-size: 15px; color: #444; line-height: 1.6; margin: 0 0 24px;">
            We received a request to reset the password for your account (${user.email}). Click the button below to set a new password.
          </p>
          <a href="${resetUrl}"
             style="display: inline-block; background: #7c1c2e; color: #fff; font-family: Arial, sans-serif; font-size: 14px; font-weight: 600; text-decoration: none; padding: 14px 28px; border-radius: 4px;">
            Reset Password
          </a>
          <p style="font-family: Arial, sans-serif; font-size: 13px; color: #6b6b6b; margin: 24px 0 0; line-height: 1.6;">
            This link expires in 1 hour. If you didn&apos;t request a password reset, you can ignore this email — your password will not be changed.
          </p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
