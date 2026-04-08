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

    // ── PAGE 1 ──────────────────────────────────────────────────────────────
    let page = doc.addPage([PAGE_W, PAGE_H])

    // Header
    page.drawRectangle({ x: 0, y: PAGE_H - 68, width: PAGE_W, height: 68, color: BURGUNDY })
    page.drawText('FOUNDATIONS OF READING', { x: MARGIN, y: PAGE_H - 25, size: 8, font: bold, color: rgb(0.91, 0.71, 0.74) })
    page.drawText('FORT Test Format Reference Sheet', { x: MARGIN, y: PAGE_H - 46, size: 17, font: bold, color: WHITE })
    page.drawText('foundationsofreading.com', {
      x: PAGE_W - MARGIN - regular.widthOfTextAtSize('foundationsofreading.com', 8),
      y: PAGE_H - 46, size: 8, font: regular, color: rgb(0.91, 0.71, 0.74),
    })

    let y = PAGE_H - 78

    // ── Exam Structure ──────────────────────────────────────────────────────
    y = sectionBar(page, y, 'Exam Structure at a Glance')
    const structCols = [160, CONTENT_W - 160]
    y = tableRow(page, y, ['Detail', 'Information'], structCols, true, false, regular)
    y = tableRow(page, y, ['Total Questions', '100 multiple-choice + 2 written assignments'], structCols, false, false, regular)
    y = tableRow(page, y, ['Total Time', '4 hours (4h 15m at testing center, 4h 30m online proctored)'], structCols, false, true, regular)
    y = tableRow(page, y, ['Score Scale', '100-300'], structCols, false, false, regular)
    y = tableRow(page, y, ['Passing Score', '220 (OH), 233 (AL, AR, MS, NC), 240 (most states)'], structCols, false, true, regular)
    y = tableRow(page, y, ['Fee', '$139'], structCols, false, false, regular)
    y = tableRow(page, y, ['Retake Policy', '30-day minimum wait, no limit on attempts'], structCols, false, true, regular)

    y -= 14

    // ── Subarea Weight Breakdown ────────────────────────────────────────────
    y = sectionBar(page, y, 'Subarea Weight Breakdown')
    const subCols = [220, 80, CONTENT_W - 300]
    y = tableRow(page, y, ['Subarea', 'Weight', 'Approx. Questions'], subCols, true, false, regular)
    y = tableRow(page, y, ['I. Foundations of Reading Development', '35%', '43-45 MC'], subCols, false, false, regular)
    y = tableRow(page, y, ['II. Development of Reading Comprehension', '27%', '33-35 MC'], subCols, false, true, regular)
    y = tableRow(page, y, ['III. Reading Assessment and Instruction', '18%', '21-23 MC'], subCols, false, false, regular)
    y = tableRow(page, y, ['IV. Integration of Knowledge and Understanding', '20%', '2 written assignments'], subCols, false, true, regular)

    y -= 14

    // ── MC Breakdown ────────────────────────────────────────────────────────
    y = sectionBar(page, y, 'Multiple-Choice Breakdown by Subarea')
    const mcCols = [220, CONTENT_W - 220]
    y = tableRow(page, y, ['Subarea', 'Key Topics Tested'], mcCols, true, false, regular)
    y = tableRow(page, y, ['I. Foundations (35%)', 'Phonological/phonemic awareness, alphabetic principle, phonics, high-frequency words, spelling patterns, word analysis, fluency'], mcCols, false, false, regular)
    y = tableRow(page, y, ['II. Comprehension (27%)', 'Academic language, vocabulary (Tier 1/2/3), literary text analysis, informational text structures, Simple View of Reading'], mcCols, false, true, regular)
    y = tableRow(page, y, ['III. Assessment (18%)', 'Screening, diagnostic, progress monitoring, formative/summative, MTSS/RTI, data-driven instruction, diverse learners'], mcCols, false, false, regular)

    y -= 14

    // ── Written Assignment Scoring Rubric ───────────────────────────────────
    y = sectionBar(page, y, 'Written Assignment Scoring Rubric (4-Point Scale)')
    const rubCols = [120, CONTENT_W - 120]
    y = tableRow(page, y, ['Criterion', 'Description'], rubCols, true, false, regular)
    y = tableRow(page, y, ['Purpose', 'Addresses all parts of the assignment clearly and directly'], rubCols, false, false, regular)
    y = tableRow(page, y, ['Knowledge of Content', 'Demonstrates accurate, relevant knowledge of reading development and instruction'], rubCols, false, true, regular)
    y = tableRow(page, y, ['Support', 'Provides specific evidence and examples from the provided student data'], rubCols, false, false, regular)
    y = tableRow(page, y, ['Rationale', 'Explains why recommendations are appropriate for the student described'], rubCols, false, true, regular)

    y -= 14

    // ── Timing Strategy ─────────────────────────────────────────────────────
    y = sectionBar(page, y, 'Recommended Timing Strategy')

    // Check if we need a new page
    if (y < MARGIN + 120) {
      page = doc.addPage([PAGE_W, PAGE_H])
      y = PAGE_H - MARGIN
    }

    const timeCols = [200, CONTENT_W - 200]
    y = tableRow(page, y, ['Section', 'Time Allocation'], timeCols, true, false, regular)
    y = tableRow(page, y, ['Multiple-Choice (100 questions)', '~150 minutes (~90 seconds each)'], timeCols, false, false, regular)
    y = tableRow(page, y, ['Written Assignment 1', '45-50 minutes'], timeCols, false, true, regular)
    y = tableRow(page, y, ['Written Assignment 2', '45-50 minutes'], timeCols, false, false, regular)
    y = tableRow(page, y, ['Review Time', 'Use any remaining time to revisit flagged items'], timeCols, false, true, regular)

    // Footer
    page.drawLine({ start: { x: MARGIN, y: 36 }, end: { x: PAGE_W - MARGIN, y: 36 }, thickness: 0.5, color: BORDER })
    page.drawText('© Foundations of Reading Test Prep · foundationsofreading.com · For personal study use only', {
      x: MARGIN, y: 22, size: 7, font: regular, color: MID,
    })

    const pdfBytes = await doc.save()
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="FORT-Test-Format-Reference-Sheet.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('FORT Test Format PDF error:', err)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
