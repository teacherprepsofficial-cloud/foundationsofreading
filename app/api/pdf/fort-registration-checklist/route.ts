export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { PDFDocument, PDFPage, rgb, StandardFonts } from 'pdf-lib'

const BURGUNDY = rgb(0.486, 0.110, 0.180)
const DARK     = rgb(0.102, 0.102, 0.102)
const MID      = rgb(0.420, 0.420, 0.420)
const WHITE    = rgb(1, 1, 1)
const ROW_ODD  = rgb(0.965, 0.945, 0.948)
const BORDER   = rgb(0.88,  0.82,  0.84)

const PAGE_W    = 612
const PAGE_H    = 792
const MARGIN    = 40
const CONTENT_W = PAGE_W - MARGIN * 2

function wrapText(
  text: string,
  font: Awaited<ReturnType<PDFDocument['embedFont']>>,
  size: number,
  maxWidth: number,
): string[] {
  const lines: string[] = []
  let current = ''
  for (const word of text.split(' ')) {
    const test = current ? `${current} ${word}` : word
    if (font.widthOfTextAtSize(test, size) > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }
  if (current) lines.push(current)
  return lines
}

export async function GET() {
  try {
    const doc     = await PDFDocument.create()
    const bold    = await doc.embedFont(StandardFonts.HelveticaBold)
    const regular = await doc.embedFont(StandardFonts.Helvetica)

    const sectionBar = (pg: PDFPage, yPos: number, title: string, width = CONTENT_W, xOff = MARGIN): number => {
      pg.drawRectangle({ x: xOff, y: yPos - 18, width, height: 20, color: BURGUNDY })
      pg.drawText(title.toUpperCase(), { x: xOff + 7, y: yPos - 12, size: 7.5, font: bold, color: WHITE })
      return yPos - 26
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableRow = (pg: PDFPage, yPos: number, cols: string[], colWidths: number[], isHeader: boolean, isOdd: boolean, fnt: any): number => {
      const lineHeight = 10
      let maxLines = 1
      const allWrapped: string[][] = []
      cols.forEach((col, ci) => {
        const w = colWidths[ci] - 12
        const wrapped = wrapText(col, isHeader ? bold : fnt, 8, w)
        allWrapped.push(wrapped)
        if (wrapped.length > maxLines) maxLines = wrapped.length
      })
      const rowH = maxLines * lineHeight + 8
      const bgColor = isHeader ? BURGUNDY : isOdd ? ROW_ODD : WHITE
      const textColor = isHeader ? WHITE : DARK

      pg.drawRectangle({ x: MARGIN, y: yPos - rowH, width: CONTENT_W, height: rowH, color: bgColor })

      let colX = MARGIN
      for (let ci = 0; ci < cols.length; ci++) {
        const baseY = yPos - Math.max(8, (rowH - allWrapped[ci].length * lineHeight) / 2) - 1
        allWrapped[ci].forEach((l, li) => {
          pg.drawText(l, { x: colX + 6, y: baseY - li * lineHeight, size: 8, font: isHeader ? bold : fnt, color: textColor })
        })
        colX += colWidths[ci]
        if (ci < cols.length - 1) {
          pg.drawLine({ start: { x: colX, y: yPos }, end: { x: colX, y: yPos - rowH }, thickness: 0.5, color: isHeader ? rgb(0.35, 0.08, 0.15) : BORDER })
        }
      }
      pg.drawLine({ start: { x: MARGIN, y: yPos - rowH }, end: { x: MARGIN + CONTENT_W, y: yPos - rowH }, thickness: 0.5, color: BORDER })
      return yPos - rowH
    }

    const drawParagraph = (pg: PDFPage, yPos: number, text: string, size = 8.5): number => {
      const lines = wrapText(text, regular, size, CONTENT_W - 4)
      let ty = yPos
      for (const line of lines) {
        pg.drawText(line, { x: MARGIN, y: ty, size, font: regular, color: DARK })
        ty -= 11
      }
      return ty - 4
    }

    // ── PAGE 1 ──────────────────────────────────────────────────────────────
    let page = doc.addPage([PAGE_W, PAGE_H])

    // Header
    page.drawRectangle({ x: 0, y: PAGE_H - 68, width: PAGE_W, height: 68, color: BURGUNDY })
    page.drawText('FOUNDATIONS OF READING', { x: MARGIN, y: PAGE_H - 25, size: 8, font: bold, color: rgb(0.91, 0.71, 0.74) })
    page.drawText('FORT Registration Checklist', { x: MARGIN, y: PAGE_H - 46, size: 17, font: bold, color: WHITE })
    page.drawText('foundationsofreading.com', {
      x: PAGE_W - MARGIN - regular.widthOfTextAtSize('foundationsofreading.com', 8),
      y: PAGE_H - 46, size: 8, font: regular, color: rgb(0.91, 0.71, 0.74),
    })

    let y = PAGE_H - 78

    // ── Registration Steps ──────────────────────────────────────────────────
    y = sectionBar(page, y, 'Step-by-Step Registration Checklist')

    const steps = [
      { step: '1', title: 'Find Your State Portal', desc: 'Determine whether your state uses the NES 190 portal or the NES in [State] portal (890). See the state table below.' },
      { step: '2', title: 'Create an Account', desc: 'Go to the appropriate registration portal and create a testing account. You will need your name, email, and mailing address.' },
      { step: '3', title: 'Select Your Test', desc: 'Choose test code 890 (most states), 190 (Ohio via OAE, Massachusetts via MTEL).' },
      { step: '4', title: 'Choose Testing Format', desc: 'Select either a testing center appointment or online proctored testing. Both have the same content. Testing center gives 4h 15m; online gives 4h 30m.' },
      { step: '5', title: 'Pay the Testing Fee', desc: 'The fee is $139. Payment is required at registration. Accepted methods vary by portal.' },
      { step: '6', title: 'Schedule Your Date', desc: 'Pick a testing date that gives you enough study time. Allow at least 4 weeks of focused preparation.' },
      { step: '7', title: 'Prepare for Test Day', desc: 'Review what to bring and testing center rules. Arrive 15-30 minutes early.' },
    ]

    for (const s of steps) {
      const titleLines = wrapText(`${s.step}. ${s.title}`, bold, 9, CONTENT_W - 20)
      const descLines = wrapText(s.desc, regular, 8, CONTENT_W - 20)
      const rowH = titleLines.length * 11 + descLines.length * 10 + 12

      if (y - rowH < MARGIN + 40) {
        page = doc.addPage([PAGE_W, PAGE_H])
        y = PAGE_H - MARGIN
      }

      page.drawRectangle({ x: MARGIN, y: y - rowH, width: CONTENT_W, height: rowH, color: parseInt(s.step) % 2 === 1 ? ROW_ODD : WHITE })
      page.drawLine({ start: { x: MARGIN, y: y - rowH }, end: { x: MARGIN + CONTENT_W, y: y - rowH }, thickness: 0.5, color: BORDER })

      let ty = y - 10
      titleLines.forEach((l, li) => {
        page.drawText(l, { x: MARGIN + 10, y: ty - li * 11, size: 9, font: bold, color: BURGUNDY })
      })
      ty -= titleLines.length * 11 + 1
      descLines.forEach((l, li) => {
        page.drawText(l, { x: MARGIN + 10, y: ty - li * 10, size: 8, font: regular, color: DARK })
      })
      y -= rowH
    }

    y -= 14

    // ── What to Bring ───────────────────────────────────────────────────────
    if (y < MARGIN + 120) {
      page = doc.addPage([PAGE_W, PAGE_H])
      y = PAGE_H - MARGIN
    }

    y = sectionBar(page, y, 'What to Bring on Test Day')
    y -= 2

    const bringItems = [
      'Valid, government-issued photo ID (driver\'s license, passport, or state ID)',
      'Your registration confirmation or admission ticket',
      'Testing center: Nothing else allowed in the testing room (no phones, notes, or watches)',
      'Online proctored: Clear desk, working webcam and microphone, stable internet connection',
      'Arrive 15-30 minutes early for check-in at testing centers',
    ]

    for (const item of bringItems) {
      const lines = wrapText(item, regular, 8, CONTENT_W - 22)
      page.drawText('\u2022', { x: MARGIN + 6, y, size: 8, font: bold, color: BURGUNDY })
      lines.forEach((l, li) => page.drawText(l, { x: MARGIN + 18, y: y - li * 10, size: 8, font: regular, color: DARK }))
      y -= lines.length * 10 + 4
    }

    y -= 10

    // ── State Portal Table ──────────────────────────────────────────────────
    if (y < MARGIN + 200) {
      page = doc.addPage([PAGE_W, PAGE_H])
      y = PAGE_H - MARGIN
    }

    y = sectionBar(page, y, 'State Registration Portals')
    const portalCols = [140, 80, CONTENT_W - 220]
    y = tableRow(page, y, ['State', 'Test Code', 'Registration Portal'], portalCols, true, false, regular)

    const portals: [string, string, string][] = [
      ['Alabama', '890', 'NES in Alabama'],
      ['Arkansas', '190', 'NES standard portal'],
      ['Connecticut', '190', 'NES standard portal'],
      ['Iowa', '190', 'NES standard portal'],
      ['Massachusetts', 'MTEL 90', 'MTEL portal'],
      ['Mississippi', '190', 'NES standard portal'],
      ['New Hampshire', '190', 'NES standard portal'],
      ['North Carolina', '190', 'NES standard portal'],
      ['Ohio', 'OAE 190', 'oh.nesinc.com'],
      ['Rhode Island', '190', 'NES standard portal'],
      ['Utah', '190', 'NES standard portal'],
      ['Wisconsin', '190', 'NES standard portal'],
    ]
    portals.forEach(([state, code, portal], i) => {
      y = tableRow(page, y, [state, code, portal], portalCols, false, i % 2 === 1, regular)
    })

    y -= 10
    y = drawParagraph(page, y, 'Always verify the current registration URL through your state education department website before registering.', 8)

    // Footer
    page.drawLine({ start: { x: MARGIN, y: 36 }, end: { x: PAGE_W - MARGIN, y: 36 }, thickness: 0.5, color: BORDER })
    page.drawText('© Foundations of Reading Test Prep · foundationsofreading.com · For personal study use only', {
      x: MARGIN, y: 22, size: 7, font: regular, color: MID,
    })

    const pdfBytes = await doc.save()
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="FORT-Registration-Checklist.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('FORT Registration Checklist PDF error:', err)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
