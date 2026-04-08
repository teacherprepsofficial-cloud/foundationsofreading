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
    page.drawText('Science of Reading for FORT', { x: MARGIN, y: PAGE_H - 46, size: 17, font: bold, color: WHITE })
    page.drawText('foundationsofreading.com', {
      x: PAGE_W - MARGIN - regular.widthOfTextAtSize('foundationsofreading.com', 8),
      y: PAGE_H - 46, size: 8, font: regular, color: rgb(0.91, 0.71, 0.74),
    })

    let y = PAGE_H - 78

    // Intro
    y = drawParagraph(page, y, 'The FORT is grounded in the Science of Reading — the body of research on how students learn to read. Understanding these key frameworks will help you answer questions across all four subareas.')

    y -= 8

    // ── Key Frameworks ──────────────────────────────────────────────────────
    y = sectionBar(page, y, 'Key Frameworks Tested on the FORT')
    const fwCols = [160, CONTENT_W - 160]
    y = tableRow(page, y, ['Framework', 'What It Says'], fwCols, true, false, regular)
    y = tableRow(page, y, ['Simple View of Reading (Gough & Tunmer, 1986)', 'Reading Comprehension = Decoding x Language Comprehension. A weakness in either component limits overall reading ability.'], fwCols, false, false, regular)
    y = tableRow(page, y, ['Scarborough\'s Reading Rope (2001)', 'Skilled reading is woven from two strands: Word Recognition (phonological awareness, decoding, sight recognition) and Language Comprehension (vocabulary, background knowledge, verbal reasoning, literacy knowledge, language structures).'], fwCols, false, true, regular)
    y = tableRow(page, y, ['National Reading Panel (2000) — 5 Pillars', 'The five essential components of reading instruction: Phonemic Awareness, Phonics, Fluency, Vocabulary, and Comprehension.'], fwCols, false, false, regular)

    y -= 14

    // ── Mapping to FORT Subareas ────────────────────────────────────────────
    y = sectionBar(page, y, 'How Frameworks Map to FORT Subareas')
    const mapCols = [160, 120, CONTENT_W - 280]
    y = tableRow(page, y, ['Framework', 'FORT Subarea', 'Connection'], mapCols, true, false, regular)
    y = tableRow(page, y, ['Simple View — Decoding', 'Subarea I (35%)', 'Phonics, phonemic awareness, word analysis, fluency'], mapCols, false, false, regular)
    y = tableRow(page, y, ['Simple View — Language Comprehension', 'Subarea II (27%)', 'Vocabulary, text comprehension, background knowledge'], mapCols, false, true, regular)
    y = tableRow(page, y, ['Reading Rope — Word Recognition strand', 'Subarea I (35%)', 'Phonological awareness, decoding, sight recognition'], mapCols, false, false, regular)
    y = tableRow(page, y, ['Reading Rope — Language Comprehension strand', 'Subarea II (27%)', 'Vocabulary, verbal reasoning, language structures'], mapCols, false, true, regular)
    y = tableRow(page, y, ['NRP — Phonemic Awareness + Phonics + Fluency', 'Subarea I (35%)', 'Three of the five pillars align directly with Subarea I'], mapCols, false, false, regular)
    y = tableRow(page, y, ['NRP — Vocabulary + Comprehension', 'Subarea II (27%)', 'Two pillars align with Subarea II'], mapCols, false, true, regular)
    y = tableRow(page, y, ['All frameworks — Assessment', 'Subarea III (18%)', 'Using assessments to identify needs in any component'], mapCols, false, false, regular)
    y = tableRow(page, y, ['All frameworks — Application', 'Subarea IV (20%)', 'Applying framework knowledge in written responses'], mapCols, false, true, regular)

    y -= 14

    // ── Key Research Principles ─────────────────────────────────────────────
    if (y < MARGIN + 140) {
      page = doc.addPage([PAGE_W, PAGE_H])
      y = PAGE_H - MARGIN
    }

    y = sectionBar(page, y, 'Key Research Principles the Exam Tests')
    y -= 2
    y = bulletList(page, y, [
      'Reading instruction must be systematic (following a logical sequence) and explicit (directly taught, not left to discovery).',
      'Phonemic awareness is the strongest single predictor of early reading success.',
      'Fluency is the bridge between decoding and comprehension — without automaticity, comprehension suffers.',
      'Vocabulary knowledge (especially Tier 2 academic words) is essential for reading comprehension.',
      'Assessment should drive instruction — use screening, diagnostic, and progress monitoring data to make instructional decisions.',
      'MTSS/RTI provides a tiered framework: Tier 1 (all students), Tier 2 (targeted small-group), Tier 3 (intensive individual).',
      'Struggling readers need more explicit, systematic instruction — not less structure.',
      'The alphabetic principle (letters represent sounds in predictable ways) is foundational to all decoding instruction.',
    ])

    // Footer
    page.drawLine({ start: { x: MARGIN, y: 36 }, end: { x: PAGE_W - MARGIN, y: 36 }, thickness: 0.5, color: BORDER })
    page.drawText('© Foundations of Reading Test Prep · foundationsofreading.com · For personal study use only', {
      x: MARGIN, y: 22, size: 7, font: regular, color: MID,
    })

    const pdfBytes = await doc.save()
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="FORT-Science-of-Reading-Reference.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('FORT Science of Reading PDF error:', err)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
