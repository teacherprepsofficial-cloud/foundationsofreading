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
    page.drawText('FORT Passing Scores by State', { x: MARGIN, y: PAGE_H - 46, size: 17, font: bold, color: WHITE })
    page.drawText('foundationsofreading.com', {
      x: PAGE_W - MARGIN - regular.widthOfTextAtSize('foundationsofreading.com', 8),
      y: PAGE_H - 46, size: 8, font: regular, color: rgb(0.91, 0.71, 0.74),
    })

    let y = PAGE_H - 78

    // Intro
    y = drawParagraph(page, y, 'The Foundations of Reading Test (FORT) is scored on a scale of 100-300. Each state sets its own passing score. The exam content is the same regardless of which state you are testing in — the only difference is the required score and which registration portal you use.')

    y -= 8

    // ── Passing Scores Table ────────────────────────────────────────────────
    y = sectionBar(page, y, 'Passing Scores by State')
    const scoreCols = [200, 120, CONTENT_W - 320]
    y = tableRow(page, y, ['State', 'Passing Score', 'Test Code'], scoreCols, true, false, regular)
    const states: [string, string, string][] = [
      ['Alabama', '233', '890'],
      ['Arkansas', '233', '190'],
      ['Connecticut', '240', '190'],
      ['Iowa', '240', '190'],
      ['Massachusetts', '240', 'MTEL 90'],
      ['Mississippi', '233', '190'],
      ['New Hampshire', '240', '190'],
      ['North Carolina', '233', '190'],
      ['Ohio', '220', 'OAE 190'],
      ['Rhode Island', '240', '190'],
      ['Utah', '240', '190'],
      ['Wisconsin', '240', '190'],
    ]
    states.forEach(([state, score, code], i) => {
      y = tableRow(page, y, [state, score, code], scoreCols, false, i % 2 === 1, regular)
    })

    y -= 14

    // ── Test Code Info ──────────────────────────────────────────────────────
    y = sectionBar(page, y, 'Test Code 190 vs 890 — What Is the Difference?')
    y -= 2
    y = drawParagraph(page, y, 'The NES 190 and NES 890 are the same exam with the same content, format, and scoring scale. The difference is only in the registration portal:')
    y -= 4

    const infoCols = [160, CONTENT_W - 160]
    y = tableRow(page, y, ['Detail', 'Information'], infoCols, true, false, regular)
    y = tableRow(page, y, ['NES 190', 'Registered through the standard NES portal. Used by most states.'], infoCols, false, false, regular)
    y = tableRow(page, y, ['NES 890', 'Registered through the NES in [State] portal. Used by most states transitioning from 190.'], infoCols, false, true, regular)
    y = tableRow(page, y, ['Content', 'Identical — 100 MC + 2 written assignments, 4 hours, scored 100-300.'], infoCols, false, false, regular)
    y = tableRow(page, y, ['Fee', '$139 for both test codes.'], infoCols, false, true, regular)

    y -= 14
    y = drawParagraph(page, y, 'Check your state education department website to confirm which test code and registration portal to use. The content you study is the same either way.')

    // Footer
    page.drawLine({ start: { x: MARGIN, y: 36 }, end: { x: PAGE_W - MARGIN, y: 36 }, thickness: 0.5, color: BORDER })
    page.drawText('© Foundations of Reading Test Prep · foundationsofreading.com · For personal study use only', {
      x: MARGIN, y: 22, size: 7, font: regular, color: MID,
    })

    const pdfBytes = await doc.save()
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="FORT-Passing-Scores-By-State.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('FORT Passing Scores PDF error:', err)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
