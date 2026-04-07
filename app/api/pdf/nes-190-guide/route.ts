export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { generateNes190GuidePdf } from '@/lib/generate-pdf'

export async function GET() {
  try {
    const pdfBytes = await generateNes190GuidePdf()
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="NES-190-Quick-Reference-Guide.pdf"',
        'Cache-Control': 'public, max-age=86400',
      },
    })
  } catch (err) {
    console.error('PDF generation error:', err)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
