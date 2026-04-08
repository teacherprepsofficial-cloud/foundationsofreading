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
    page.drawText('FORT Passing Strategies Guide', { x: MARGIN, y: PAGE_H - 46, size: 17, font: bold, color: WHITE })
    page.drawText('foundationsofreading.com', {
      x: PAGE_W - MARGIN - regular.widthOfTextAtSize('foundationsofreading.com', 8),
      y: PAGE_H - 46, size: 8, font: regular, color: rgb(0.91, 0.71, 0.74),
    })

    let y = PAGE_H - 78

    // ── Study Priorities ────────────────────────────────────────────────────
    y = sectionBar(page, y, 'Study Priorities by Subarea Weight')
    const weightCols = [200, 80, CONTENT_W - 280]
    y = tableRow(page, y, ['Subarea', 'Weight', 'Priority'], weightCols, true, false, regular)
    y = tableRow(page, y, ['I. Foundations of Reading Development', '35%', 'Highest — study first and most'], weightCols, false, false, regular)
    y = tableRow(page, y, ['II. Development of Reading Comprehension', '27%', 'High — study second'], weightCols, false, true, regular)
    y = tableRow(page, y, ['III. Reading Assessment and Instruction', '18%', 'Moderate — study third'], weightCols, false, false, regular)
    y = tableRow(page, y, ['IV. Integration of Knowledge (Written)', '20%', 'High — practice CR responses'], weightCols, false, true, regular)

    y -= 12

    // ── Time Management ─────────────────────────────────────────────────────
    y = sectionBar(page, y, 'Time Management on Test Day')
    const timeCols = [200, CONTENT_W - 200]
    y = tableRow(page, y, ['Section', 'Recommended Time'], timeCols, true, false, regular)
    y = tableRow(page, y, ['100 Multiple-Choice Questions', '~90 seconds per question (150 min total)'], timeCols, false, false, regular)
    y = tableRow(page, y, ['Written Assignment 1 (Case Study)', '45-50 minutes'], timeCols, false, true, regular)
    y = tableRow(page, y, ['Written Assignment 2 (Work Product)', '45-50 minutes'], timeCols, false, false, regular)
    y = tableRow(page, y, ['Review / Buffer', 'Remaining time — revisit flagged items'], timeCols, false, true, regular)

    y -= 12

    // ── Key Test-Taking Strategies ──────────────────────────────────────────
    y = sectionBar(page, y, 'Key Test-Taking Strategies')
    y -= 2
    y = bulletList(page, y, [
      'Favor explicit and systematic answers. The exam rewards structured, evidence-based approaches to reading instruction.',
      'Avoid answer choices with absolutes like "always," "never," or "only." These are usually wrong.',
      'When two answers seem correct, choose the one that is most direct and specific to the scenario described.',
      'Eliminate answers that rely on implicit/discovery-based methods — the exam favors explicit instruction.',
      'For written assignments, use the 4-step template: Strength, Need, Strategy, Rationale.',
      'Do not leave any question blank. There is no penalty for guessing.',
      'Read the entire question before looking at answer choices. Identify what is being asked.',
    ])

    y -= 10

    // ── Content Tips by Subarea ─────────────────────────────────────────────
    y = sectionBar(page, y, 'Content Area Tips')

    y -= 2
    page.drawText('Subarea I — Foundations (35%)', { x: MARGIN + 6, y, size: 8.5, font: bold, color: BURGUNDY })
    y -= 12
    y = bulletList(page, y, [
      'Know the difference between phonological awareness (broad) and phonemic awareness (individual phonemes).',
      'Memorize the 6 syllable types: closed, open, vowel team, CVCe, r-controlled, consonant-le.',
      'Understand systematic phonics instruction: taught in a planned sequence, not incidental.',
    ])

    y -= 6
    page.drawText('Subarea II — Comprehension (27%)', { x: MARGIN + 6, y, size: 8.5, font: bold, color: BURGUNDY })
    y -= 12
    y = bulletList(page, y, [
      'Know the three-tier vocabulary model: Tier 1 (everyday), Tier 2 (academic — highest priority), Tier 3 (domain-specific).',
      'Understand text structures: cause-effect, compare-contrast, problem-solution, sequence, description.',
      'Simple View of Reading: RC = Decoding x Language Comprehension.',
    ])

    // ── PAGE 2 ──────────────────────────────────────────────────────────────
    page = doc.addPage([PAGE_W, PAGE_H])
    y = PAGE_H - MARGIN

    page.drawText('Subarea III — Assessment (18%)', { x: MARGIN + 6, y, size: 8.5, font: bold, color: BURGUNDY })
    y -= 12
    y = bulletList(page, y, [
      'Know the 4 assessment types: screening (universal), diagnostic (in-depth), progress monitoring (ongoing), outcome/summative.',
      'Understand MTSS/RTI tiers: Tier 1 (core for all), Tier 2 (small-group), Tier 3 (intensive individual).',
      'Running records: know miscue types (substitution, omission, insertion, self-correction).',
    ])

    y -= 6
    page.drawText('Subarea IV — Written Assignments (20%)', { x: MARGIN + 6, y, size: 8.5, font: bold, color: BURGUNDY })
    y -= 12
    y = bulletList(page, y, [
      'Each written response is scored 1-4 on: Purpose, Knowledge of Content, Support, Rationale.',
      'Always connect your recommendations to specific evidence from the student data provided.',
      'Use professional terminology: phonemic awareness, miscue analysis, prosody, morphemic analysis, scaffolding.',
      'Practice writing at least 3-4 constructed responses before test day.',
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
        'Content-Disposition': 'attachment; filename="FORT-Passing-Strategies-Guide.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('FORT Passing Strategies PDF error:', err)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
