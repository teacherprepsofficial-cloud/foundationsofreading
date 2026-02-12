import nodemailer from 'nodemailer'

interface SendPurchaseEmailParams {
  email: string
  customerName?: string
  productId: string
  productName: string
}

const PDF_PATHS: Record<string, string> = {
  'fort-study-guide': '/downloads/fort-study-guide.pdf',
  'fort-practice-test': '/downloads/fort-practice-test.pdf',
  'fort-bundle': '/downloads/fort-bundle.pdf',
}

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  })
}

export async function sendPurchaseEmail({
  email,
  customerName,
  productId,
  productName,
}: SendPurchaseEmailParams): Promise<void> {
  const transporter = createTransporter()

  const pdfPath = PDF_PATHS[productId]
  if (!pdfPath) {
    throw new Error(`Unknown product ID: ${productId}`)
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://foundationsofreading.com'
  const pdfUrl = `${baseUrl}${pdfPath}`

  // Fetch the PDF from the public URL
  const pdfResponse = await fetch(pdfUrl)
  if (!pdfResponse.ok) {
    throw new Error(`Failed to fetch PDF from ${pdfUrl}: ${pdfResponse.status}`)
  }
  const pdfBuffer = Buffer.from(await pdfResponse.arrayBuffer())

  const firstName = customerName ? customerName.split(' ')[0] : ''
  const greeting = firstName ? `Hi ${firstName},` : 'Hi there,'

  const filename = pdfPath.split('/').pop() || 'download.pdf'

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f5f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f7; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
          <!-- Header -->
          <tr>
            <td style="background-color: #2563eb; padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 600; letter-spacing: -0.3px;">
                Foundations of Reading
              </h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; color: #1d1d1f; font-size: 16px; line-height: 1.6;">
                ${greeting}
              </p>

              <p style="margin: 0 0 20px; color: #1d1d1f; font-size: 16px; line-height: 1.6;">
                Thank you for your purchase! Your <strong>${productName}</strong> is attached to this email and ready to download.
              </p>

              <!-- Product Card -->
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f7; border-radius: 8px; margin: 24px 0;">
                <tr>
                  <td style="padding: 24px;">
                    <p style="margin: 0 0 8px; color: #2563eb; font-size: 14px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">
                      Your Download
                    </p>
                    <p style="margin: 0 0 8px; color: #1d1d1f; font-size: 18px; font-weight: 600;">
                      ${productName}
                    </p>
                    <p style="margin: 0; color: #6e6e73; font-size: 14px; line-height: 1.5;">
                      Check the attachment below. Save it to your device so you can study anytime, anywhere.
                    </p>
                  </td>
                </tr>
              </table>

              <p style="margin: 0 0 20px; color: #1d1d1f; font-size: 16px; line-height: 1.6;">
                Start studying today and walk into your exam with confidence. You've got this!
              </p>

              <!-- CTA Button -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin: 28px 0;">
                <tr>
                  <td align="center">
                    <a href="${baseUrl}" style="display: inline-block; background-color: #2563eb; color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-size: 16px; font-weight: 600;">
                      Visit Foundations of Reading
                    </a>
                  </td>
                </tr>
              </table>

              <p style="margin: 0; color: #6e6e73; font-size: 14px; line-height: 1.5;">
                If you have any questions or need help, simply reply to this email. We're happy to help.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f5f5f7; padding: 24px 40px; text-align: center; border-top: 1px solid #d2d2d7;">
              <p style="margin: 0; color: #86868b; font-size: 12px;">
                Foundations of Reading &middot; foundationsofreading.com
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: email,
    subject: `Your ${productName} is ready!`,
    html,
    attachments: [
      {
        filename,
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  })
}
