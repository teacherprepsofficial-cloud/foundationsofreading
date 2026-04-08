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

    const bulletList = (pg: PDFPage, yPos: number, items: string[]): number => {
      let ty = yPos
      for (const item of items) {
        const lines = wrapText(item, regular, 8, CONTENT_W - 22)
        pg.drawText('\u2022', { x: MARGIN + 6, y: ty, size: 8, font: bold, color: BURGUNDY })
        lines.forEach((l, li) => pg.drawText(l, { x: MARGIN + 18, y: ty - li * 10, size: 8, font: regular, color: DARK }))
        ty -= lines.length * 10 + 4
      }
      return ty
    }

    // ── PAGE 1 ──────────────────────────────────────────────────────────────
    let page = doc.addPage([PAGE_W, PAGE_H])

    // Header
    page.drawRectangle({ x: 0, y: PAGE_H - 68, width: PAGE_W, height: 68, color: BURGUNDY })
    page.drawText('FOUNDATIONS OF READING', { x: MARGIN, y: PAGE_H - 25, size: 8, font: bold, color: rgb(0.91, 0.71, 0.74) })
    page.drawText('FORT 4-Week Study Plan', { x: MARGIN, y: PAGE_H - 46, size: 17, font: bold, color: WHITE })
    page.drawText('foundationsofreading.com', {
      x: PAGE_W - MARGIN - regular.widthOfTextAtSize('foundationsofreading.com', 8),
      y: PAGE_H - 46, size: 8, font: regular, color: rgb(0.91, 0.71, 0.74),
    })

    let y = PAGE_H - 78

    // Intro
    y = drawParagraph(page, y, 'This 4-week study plan is designed to cover all four FORT subareas in a structured sequence, starting with the highest-weighted content. Plan for 1-2 hours of focused study per day, 5-6 days per week.')

    y -= 8

    // ── Week-by-Week Schedule ───────────────────────────────────────────────
    y = sectionBar(page, y, 'Week-by-Week Schedule')
    const weekCols = [80, 160, CONTENT_W - 240]
    y = tableRow(page, y, ['Week', 'Focus Area', 'Key Topics'], weekCols, true, false, regular)
    y = tableRow(page, y, ['Week 1', 'Subarea I: Foundations of Reading Development (35%)', 'Phonemic awareness, phonological awareness, alphabetic principle, systematic phonics, high-frequency words, spelling patterns, word analysis (morphemes, 6 syllable types), reading fluency'], weekCols, false, false, regular)
    y = tableRow(page, y, ['Week 2', 'Subarea II: Development of Reading Comprehension (27%)', 'Academic language, vocabulary instruction (Tier 1/2/3 model), literary text analysis (character, plot, theme, POV), informational text structures, Simple View of Reading'], weekCols, false, true, regular)
    y = tableRow(page, y, ['Week 3', 'Subarea III: Assessment & Instruction (18%) + Written Practice', 'Screening, diagnostic, progress monitoring, formative/summative assessments, MTSS/RTI tiers, running records, data-driven instruction. Practice 2-3 constructed responses.'], weekCols, false, false, regular)
    y = tableRow(page, y, ['Week 4', 'Full Review + Practice Tests + More CRs', 'Take a full-length practice test. Review weak areas. Write 2-3 more constructed responses. Focus on timing and test-day strategies.'], weekCols, false, true, regular)

    y -= 14

    // ── Daily Study Time ────────────────────────────────────────────────────
    y = sectionBar(page, y, 'Recommended Daily Study Time')
    y -= 2
    y = drawParagraph(page, y, 'Aim for 1-2 hours per day, 5-6 days per week. Here is a suggested daily breakdown:')
    y -= 4

    const dailyCols = [160, CONTENT_W - 160]
    y = tableRow(page, y, ['Activity', 'Time'], dailyCols, true, false, regular)
    y = tableRow(page, y, ['Study guide reading / notes', '30-45 minutes'], dailyCols, false, false, regular)
    y = tableRow(page, y, ['Practice questions', '20-30 minutes'], dailyCols, false, true, regular)
    y = tableRow(page, y, ['Flashcard review', '10-15 minutes'], dailyCols, false, false, regular)
    y = tableRow(page, y, ['Written response practice (Weeks 3-4)', '30-45 minutes'], dailyCols, false, true, regular)

    y -= 14

    // ── Key Milestones ──────────────────────────────────────────────────────
    y = sectionBar(page, y, 'Key Milestones')
    y -= 2
    y = bulletList(page, y, [
      'End of Week 1: Can define and distinguish all Subarea I concepts (phonemic awareness vs phonological awareness, 6 syllable types, phonics patterns).',
      'End of Week 2: Can explain the Simple View of Reading, three-tier vocabulary model, and major text structures.',
      'End of Week 3: Can identify the 4 assessment types, explain MTSS/RTI tiers, and have written at least 2 practice CRs.',
      'End of Week 4: Scored 85%+ on a full practice test. Written at least 4-5 total CRs. Confident with timing strategy.',
    ])

    y -= 10

    // ── Timing Strategy Box ─────────────────────────────────────────────────
    if (y < MARGIN + 100) {
      page = doc.addPage([PAGE_W, PAGE_H])
      y = PAGE_H - MARGIN
    }

    y = sectionBar(page, y, 'Test Day Timing Reminder')
    y -= 2

    const timingItems = [
      '100 multiple-choice questions: ~90 seconds each (~150 minutes total)',
      'Written Assignment 1: 45-50 minutes',
      'Written Assignment 2: 45-50 minutes',
      'Total exam time: 4 hours',
      'Do not leave any question blank — there is no penalty for guessing',
    ]
    y = bulletList(page, y, timingItems)

    // Footer
    page.drawLine({ start: { x: MARGIN, y: 36 }, end: { x: PAGE_W - MARGIN, y: 36 }, thickness: 0.5, color: BORDER })
    page.drawText('© Foundations of Reading Test Prep · foundationsofreading.com · For personal study use only', {
      x: MARGIN, y: 22, size: 7, font: regular, color: MID,
    })

    const pdfBytes = await doc.save()
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="FORT-4-Week-Study-Plan.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('FORT 4-Week Study Plan PDF error:', err)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
