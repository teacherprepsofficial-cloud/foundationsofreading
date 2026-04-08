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
    const page = doc.addPage([PAGE_W, PAGE_H])

    // Header
    page.drawRectangle({ x: 0, y: PAGE_H - 68, width: PAGE_W, height: 68, color: BURGUNDY })
    page.drawText('FOUNDATIONS OF READING', { x: MARGIN, y: PAGE_H - 25, size: 8, font: bold, color: rgb(0.91, 0.71, 0.74) })
    page.drawText('FORT 190 vs 890 Comparison', { x: MARGIN, y: PAGE_H - 46, size: 17, font: bold, color: WHITE })
    page.drawText('foundationsofreading.com', {
      x: PAGE_W - MARGIN - regular.widthOfTextAtSize('foundationsofreading.com', 8),
      y: PAGE_H - 46, size: 8, font: regular, color: rgb(0.91, 0.71, 0.74),
    })

    let y = PAGE_H - 78

    // Intro
    y = drawParagraph(page, y, 'Many test-takers are confused by the two test codes for the Foundations of Reading Test. Here is a clear comparison showing that the NES 190 and NES 890 are the same exam — the only difference is which registration portal you use.')

    y -= 8

    // ── Side-by-Side Comparison ─────────────────────────────────────────────
    y = sectionBar(page, y, 'Side-by-Side Comparison')
    const compCols = [140, (CONTENT_W - 140) / 2, (CONTENT_W - 140) / 2]
    y = tableRow(page, y, ['Detail', 'NES 190', 'NES 890'], compCols, true, false, regular)
    y = tableRow(page, y, ['Test Code', '190', '890'], compCols, false, false, regular)
    y = tableRow(page, y, ['Registration Portal', 'Standard NES portal', 'NES in [State] portal (AL, OH)'], compCols, false, true, regular)
    y = tableRow(page, y, ['Exam Content', '100 MC + 2 written assignments', '100 MC + 2 written assignments'], compCols, false, false, regular)
    y = tableRow(page, y, ['Content Areas', 'Same 4 subareas', 'Same 4 subareas'], compCols, false, true, regular)
    y = tableRow(page, y, ['Total Time', '4 hours', '4 hours'], compCols, false, false, regular)
    y = tableRow(page, y, ['Score Scale', '100-300', '100-300'], compCols, false, true, regular)
    y = tableRow(page, y, ['Passing Score', 'Set by your state (220-240)', 'Set by your state (220-240)'], compCols, false, false, regular)
    y = tableRow(page, y, ['Fee', '$139', '$139'], compCols, false, true, regular)
    y = tableRow(page, y, ['Retake Policy', '30-day wait, unlimited', '30-day wait, unlimited'], compCols, false, false, regular)

    y -= 14

    // ── Key Takeaway ────────────────────────────────────────────────────────
    y = sectionBar(page, y, 'Key Takeaway')
    y -= 2

    // Highlight box
    const boxH = 60
    page.drawRectangle({ x: MARGIN, y: y - boxH, width: CONTENT_W, height: boxH, color: ROW_ODD, borderColor: BURGUNDY, borderWidth: 1 })
    const takeaway1 = 'The NES 190 and NES 890 are the same exam.'
    page.drawText(takeaway1, { x: MARGIN + (CONTENT_W - bold.widthOfTextAtSize(takeaway1, 11)) / 2, y: y - 20, size: 11, font: bold, color: BURGUNDY })
    const takeaway2 = 'Same content, same format, same scoring. The only difference is the registration portal.'
    page.drawText(takeaway2, { x: MARGIN + (CONTENT_W - regular.widthOfTextAtSize(takeaway2, 9)) / 2, y: y - 38, size: 9, font: regular, color: DARK })

    y -= boxH + 14

    // ── Which States Use Which Code ─────────────────────────────────────────
    y = sectionBar(page, y, 'Which States Use Which Code?')
    const stateCols = [CONTENT_W / 2, CONTENT_W / 2]
    y = tableRow(page, y, ['NES 190 States', 'NES 890 States'], stateCols, true, false, regular)
    y = tableRow(page, y, ['Ohio (OAE 190), Massachusetts (MTEL 190)', 'Alabama, Arkansas, Connecticut, Iowa, Mississippi, New Hampshire, North Carolina, Rhode Island, Utah, Wisconsin'], stateCols, false, false, regular)

    y -= 14
    y = drawParagraph(page, y, 'Ohio uses test code 190 through the OAE program at oh.nesinc.com. Massachusetts uses code 190 through the MTEL program. All other states have transitioned to 890. The content is the same regardless of test code. Always check your state education department website to confirm which portal to use.')

    // Footer
    page.drawLine({ start: { x: MARGIN, y: 36 }, end: { x: PAGE_W - MARGIN, y: 36 }, thickness: 0.5, color: BORDER })
    page.drawText('© Foundations of Reading Test Prep · foundationsofreading.com · For personal study use only', {
      x: MARGIN, y: 22, size: 7, font: regular, color: MID,
    })

    const pdfBytes = await doc.save()
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="FORT-190-vs-890-Comparison.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('FORT 190 vs 890 PDF error:', err)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
