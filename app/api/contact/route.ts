import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 })
    }

    if (message.length > 5000) {
      return NextResponse.json({ error: 'Message is too long.' }, { status: 400 })
    }

    await resend.emails.send({
      from: 'Foundations of Reading <noreply@foundationsofreading.com>',
      to: 'support@teacherpreps.com',
      replyTo: email,
      subject: `Contact Form: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: #7c1c2e; padding: 20px 24px; border-radius: 8px 8px 0 0;">
            <h2 style="color: #fff; margin: 0; font-size: 18px;">New Contact Form Submission</h2>
            <p style="color: #e8b4bc; margin: 4px 0 0; font-size: 13px;">foundationsofreading.com</p>
          </div>
          <div style="border: 1px solid #e8e0e2; border-top: none; padding: 24px; border-radius: 0 0 8px 8px;">
            <p style="margin: 0 0 4px; font-size: 13px; color: #6b6b6b;">Name</p>
            <p style="margin: 0 0 16px; font-size: 15px; color: #1a1a1a;">${name}</p>
            <p style="margin: 0 0 4px; font-size: 13px; color: #6b6b6b;">Email</p>
            <p style="margin: 0 0 16px; font-size: 15px; color: #1a1a1a;">${email}</p>
            <p style="margin: 0 0 4px; font-size: 13px; color: #6b6b6b;">Message</p>
            <p style="margin: 0; font-size: 15px; color: #1a1a1a; white-space: pre-wrap;">${message.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>
          </div>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch {
    console.error('Contact form error')
    return NextResponse.json({ error: 'Something went wrong. Please try again.' }, { status: 500 })
  }
}
