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
    const italic  = await doc.embedFont(StandardFonts.HelveticaOblique)

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
    page.drawText('FORT Constructed Response Template', { x: MARGIN, y: PAGE_H - 46, size: 17, font: bold, color: WHITE })
    page.drawText('foundationsofreading.com', {
      x: PAGE_W - MARGIN - regular.widthOfTextAtSize('foundationsofreading.com', 8),
      y: PAGE_H - 46, size: 8, font: regular, color: rgb(0.91, 0.71, 0.74),
    })

    let y = PAGE_H - 78

    // Intro
    y = drawParagraph(page, y, 'The FORT includes 2 written assignments (Subarea IV, 20% of your score). Each response is scored on a 4-point scale across four criteria. Use this template to structure every constructed response you write.')

    y -= 8

    // ── 4-Point Scoring Rubric ──────────────────────────────────────────────
    y = sectionBar(page, y, '4-Point Scoring Rubric')
    const rubCols = [120, CONTENT_W - 120]
    y = tableRow(page, y, ['Criterion', 'What Scorers Look For'], rubCols, true, false, regular)
    y = tableRow(page, y, ['Purpose', 'Fully addresses all parts of the assignment. Response is focused and on-topic.'], rubCols, false, false, regular)
    y = tableRow(page, y, ['Knowledge of Content', 'Demonstrates accurate, relevant knowledge of reading development and instruction.'], rubCols, false, true, regular)
    y = tableRow(page, y, ['Support', 'Provides specific evidence and examples from the student data in the prompt.'], rubCols, false, false, regular)
    y = tableRow(page, y, ['Rationale', 'Clearly explains why the recommended strategies are appropriate for the student.'], rubCols, false, true, regular)

    y -= 14

    // ── The 4-Step Template ─────────────────────────────────────────────────
    y = sectionBar(page, y, 'The 4-Step Response Template')

    const steps = [
      { label: 'STEP 1: STRENGTH', text: 'Identify one significant reading strength the student demonstrates. Cite specific evidence from the data provided.' },
      { label: 'STEP 2: NEED', text: 'Identify one significant area of need. Reference specific data points (e.g., assessment scores, error patterns, reading behaviors) that support your analysis.' },
      { label: 'STEP 3: STRATEGY', text: 'Recommend one specific, research-based instructional strategy that directly addresses the identified need. Be precise — name the strategy and describe how to implement it.' },
      { label: 'STEP 4: RATIONALE', text: 'Explain why this strategy is effective for this particular student. Connect your reasoning to the evidence and to principles of reading development.' },
    ]

    for (const step of steps) {
      const labelLines = wrapText(step.label, bold, 8.5, CONTENT_W - 20)
      const textLines = wrapText(step.text, regular, 8, CONTENT_W - 20)
      const stepH = labelLines.length * 11 + textLines.length * 10 + 14

      if (y - stepH < MARGIN + 40) {
        page = doc.addPage([PAGE_W, PAGE_H])
        y = PAGE_H - MARGIN
      }

      page.drawRectangle({ x: MARGIN, y: y - stepH, width: CONTENT_W, height: stepH, color: ROW_ODD, borderColor: BORDER, borderWidth: 0.5 })
      let ty = y - 10
      labelLines.forEach((l, li) => {
        page.drawText(l, { x: MARGIN + 10, y: ty - li * 11, size: 8.5, font: bold, color: BURGUNDY })
      })
      ty -= labelLines.length * 11 + 2
      textLines.forEach((l, li) => {
        page.drawText(l, { x: MARGIN + 10, y: ty - li * 10, size: 8, font: regular, color: DARK })
      })
      y -= stepH + 6
    }

    y -= 8

    // ── Professional Terms ──────────────────────────────────────────────────
    if (y < MARGIN + 120) {
      page = doc.addPage([PAGE_W, PAGE_H])
      y = PAGE_H - MARGIN
    }

    y = sectionBar(page, y, 'Professional Terms to Use in Your Response')

    const terms = [
      ['Phonemic Awareness', 'The ability to hear and manipulate individual phonemes in spoken words'],
      ['Miscue Analysis', 'Examining oral reading errors to identify patterns and instructional needs'],
      ['Prosody', 'Reading with appropriate expression, phrasing, and intonation'],
      ['Morphemic Analysis', 'Breaking words into meaningful parts (prefixes, roots, suffixes) to determine meaning'],
      ['Scaffolding', 'Temporary instructional support that is gradually removed as the student gains independence'],
      ['Gradual Release', 'I do, we do, you do — moving from teacher modeling to guided practice to independent practice'],
    ]

    const termCols = [140, CONTENT_W - 140]
    y = tableRow(page, y, ['Term', 'Definition'], termCols, true, false, regular)
    terms.forEach(([term, def], i) => {
      y = tableRow(page, y, [term, def], termCols, false, i % 2 === 1, regular)
    })

    y -= 14

    // ── Sample Response Skeleton ────────────────────────────────────────────
    if (y < MARGIN + 160) {
      page = doc.addPage([PAGE_W, PAGE_H])
      y = PAGE_H - MARGIN
    }

    y = sectionBar(page, y, 'Sample Response Skeleton')

    const skeletonLines = [
      { label: 'STRENGTH:', text: 'One significant strength I observed is __________________ as evidenced by __________________.' },
      { label: 'NEED:', text: 'This student needs support with __________________ because the data shows __________________.' },
      { label: 'STRATEGY:', text: 'I would recommend ________________________________ to directly address this identified need.' },
      { label: 'RATIONALE:', text: 'This strategy will be effective for this student because ________________________________.' },
    ]

    let skelH = 12
    for (const row of skeletonLines) {
      const prefixW = bold.widthOfTextAtSize(`${row.label}  `, 8)
      skelH += wrapText(row.text, italic, 8, CONTENT_W - prefixW - 20).length * 11 + 8
    }
    page.drawRectangle({ x: MARGIN, y: y - skelH, width: CONTENT_W, height: skelH, color: ROW_ODD, borderColor: BORDER, borderWidth: 0.5 })

    let skelY = y - 12
    for (const row of skeletonLines) {
      const prefix  = `${row.label}  `
      const prefixW = bold.widthOfTextAtSize(prefix, 8)
      const lines   = wrapText(row.text, italic, 8, CONTENT_W - prefixW - 20)
      page.drawText(prefix, { x: MARGIN + 10, y: skelY, size: 8, font: bold, color: BURGUNDY })
      lines.forEach((l, li) => page.drawText(l, { x: MARGIN + 10 + prefixW, y: skelY - li * 11, size: 8, font: italic, color: DARK }))
      skelY -= lines.length * 11 + 8
    }

    // Footer
    page.drawLine({ start: { x: MARGIN, y: 36 }, end: { x: PAGE_W - MARGIN, y: 36 }, thickness: 0.5, color: BORDER })
    page.drawText('© Foundations of Reading Test Prep · foundationsofreading.com · For personal study use only', {
      x: MARGIN, y: 22, size: 7, font: regular, color: MID,
    })

    const pdfBytes = await doc.save()
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="FORT-Constructed-Response-Template.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('FORT CR Template PDF error:', err)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
