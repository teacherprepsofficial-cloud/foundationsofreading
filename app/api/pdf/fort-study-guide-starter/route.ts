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
    await doc.embedFont(StandardFonts.HelveticaOblique)

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
    page.drawRectangle({ x: 0, y: PAGE_H - 72, width: PAGE_W, height: 72, color: BURGUNDY })
    page.drawText('FOUNDATIONS OF READING', { x: MARGIN, y: PAGE_H - 27, size: 8, font: bold, color: rgb(0.91, 0.71, 0.74) })
    page.drawText('FORT · Study Guide Starter', { x: MARGIN, y: PAGE_H - 49, size: 17, font: bold, color: WHITE })
    page.drawText('foundationsofreading.com', {
      x: PAGE_W - MARGIN - regular.widthOfTextAtSize('foundationsofreading.com', 8),
      y: PAGE_H - 49, size: 8, font: regular, color: rgb(0.91, 0.71, 0.74),
    })

    let y = PAGE_H - 84

    // Intro
    y = drawParagraph(page, y, 'This free starter study guide covers Subarea I — Foundations of Reading Development — which accounts for 35% of the FORT exam. This is the single largest section and where most of your study time should go.')
    y -= 4
    y = drawParagraph(page, y, 'For the complete study guide covering all four subareas, practice tests, flashcards, and AI-graded written responses, visit foundationsofreading.com.')

    y -= 10

    // ── Test Overview Table ──────────────────────────────────────────────────
    y = sectionBar(page, y, 'Test Overview')
    const overviewCols = [160, CONTENT_W - 160]
    y = tableRow(page, y, ['Detail', 'Information'], overviewCols, true, false, regular)
    y = tableRow(page, y, ['Test Code', '190 or 890 (Foundations of Reading)'], overviewCols, false, false, regular)
    y = tableRow(page, y, ['Format', '100 MC + 2 written assignments'], overviewCols, false, true, regular)
    y = tableRow(page, y, ['Time', '4 hours testing · 4h 15m (center) · 4h 30m (online)'], overviewCols, false, false, regular)
    y = tableRow(page, y, ['Passing Score', '220 (OH) · 233 (AL, AR) · 240 (most states)'], overviewCols, false, true, regular)
    y = tableRow(page, y, ['Fee', '$139'], overviewCols, false, false, regular)
    page.drawRectangle({ x: MARGIN, y, width: CONTENT_W, height: 0, borderColor: BORDER, borderWidth: 0.5 })

    y -= 14

    // ── Subarea Weights ──────────────────────────────────────────────────────
    y = sectionBar(page, y, 'Subarea Weight Breakdown')
    const sub3Cols = [200, 80, CONTENT_W - 280]
    y = tableRow(page, y, ['Subarea', 'Weight', 'Questions'], sub3Cols, true, false, regular)
    y = tableRow(page, y, ['I. Foundations of Reading Development', '35%', '43-45 MC'], sub3Cols, false, false, regular)
    y = tableRow(page, y, ['II. Development of Reading Comprehension', '27%', '33-35 MC'], sub3Cols, false, true, regular)
    y = tableRow(page, y, ['III. Reading Assessment and Instruction', '18%', '21-23 MC'], sub3Cols, false, false, regular)
    y = tableRow(page, y, ['IV. Integration of Knowledge', '20%', '2 written'], sub3Cols, false, true, regular)

    y -= 14

    // ── OBJECTIVE 1 ─────────────────────────────────────────────────────────
    y = sectionBar(page, y, 'Objective 1: Phonological & Phonemic Awareness')
    const defCols = [150, CONTENT_W - 150]
    y = tableRow(page, y, ['Concept', 'Definition'], defCols, true, false, regular)
    y = tableRow(page, y, ['Phonological Awareness', 'Hearing and manipulating sound structures — words, syllables, onset-rime, phonemes'], defCols, false, false, regular)
    y = tableRow(page, y, ['Phonemic Awareness', 'Specific type: hearing and manipulating individual phonemes in spoken words'], defCols, false, true, regular)
    y = tableRow(page, y, ['Key PA Tasks', 'Isolation, identification, blending, segmentation, deletion, substitution'], defCols, false, false, regular)
    y = tableRow(page, y, ['Alphabetic Principle', 'Letters represent sounds in a predictable, systematic way'], defCols, false, true, regular)
    y = tableRow(page, y, ['Concepts of Print', 'Print carries meaning, directionality, spacing, word boundaries'], defCols, false, false, regular)
    y = tableRow(page, y, ['Instruction', 'Must be systematic (logical sequence) and explicit (directly taught)'], defCols, false, true, regular)

    // ── PAGE 2 ──────────────────────────────────────────────────────────────
    page = doc.addPage([PAGE_W, PAGE_H])
    y = PAGE_H - MARGIN

    // ── OBJECTIVE 2 ─────────────────────────────────────────────────────────
    y = sectionBar(page, y, 'Objective 2: Phonics, High-Frequency Words, and Spelling')
    y = tableRow(page, y, ['Concept', 'Definition'], defCols, true, false, regular)
    y = tableRow(page, y, ['Systematic Explicit Phonics', 'Taught in a logical sequence, directly — not discovered or guessed'], defCols, false, false, regular)
    y = tableRow(page, y, ['CVC Patterns', 'Consonant-vowel-consonant (cat, sit) — foundation of decoding'], defCols, false, true, regular)
    y = tableRow(page, y, ['CVCe / Vowel Teams', 'Silent e (make, ride) and vowel pairs (rain, boat, feet)'], defCols, false, false, regular)
    y = tableRow(page, y, ['Consonant Digraphs', 'Two letters, one sound: sh, ch, th, wh, ph, ck'], defCols, false, true, regular)
    y = tableRow(page, y, ['Consonant Blends', 'Two or three consonants, each keeping its sound: bl, str, spr'], defCols, false, false, regular)
    y = tableRow(page, y, ['High-Frequency Words', 'Words taught for automatic recognition: the, was, said, because'], defCols, false, true, regular)
    y = tableRow(page, y, ['Inflectional Morphemes', 'Suffixes that do not change part of speech: -s, -ed, -ing, -er, -est'], defCols, false, false, regular)
    y = tableRow(page, y, ['Encoding ↔ Decoding', 'Spelling reinforces phonics. Analyze spelling errors to assess phonics knowledge.'], defCols, false, true, regular)

    y -= 14

    // ── OBJECTIVE 3 ─────────────────────────────────────────────────────────
    y = sectionBar(page, y, 'Objective 3: Word Analysis and Morphemic Analysis')
    y = tableRow(page, y, ['Concept', 'Definition'], defCols, true, false, regular)
    y = tableRow(page, y, ['Morphemes', 'Smallest units of meaning: base words, roots, prefixes, suffixes'], defCols, false, false, regular)
    y = tableRow(page, y, ['Inflectional Suffix', 'Does not change part of speech: -s (plural), -ed (past), -ing'], defCols, false, true, regular)
    y = tableRow(page, y, ['Derivational Suffix', 'Changes part of speech: -tion (verb→noun), -able (verb→adj)'], defCols, false, false, regular)
    y = tableRow(page, y, ['6 Syllable Types', 'Closed, open, vowel team, CVCe, r-controlled, consonant-le'], defCols, false, true, regular)
    y = tableRow(page, y, ['Orthographic Rules', 'Spelling patterns: drop silent e before vowel suffix, double final consonant'], defCols, false, false, regular)
    y = tableRow(page, y, ['Cognate Awareness', 'For ELLs: connecting English words to similar words in home language'], defCols, false, true, regular)

    y -= 14

    // ── OBJECTIVE 4 ─────────────────────────────────────────────────────────
    y = sectionBar(page, y, 'Objective 4: Reading Fluency')
    y = tableRow(page, y, ['Concept', 'Definition'], defCols, true, false, regular)
    y = tableRow(page, y, ['Three Indicators', 'Accuracy, rate, and prosody (expression)'], defCols, false, false, regular)
    y = tableRow(page, y, ['Prosody', 'Appropriate phrasing, stress, intonation — bridge between fluency and comprehension'], defCols, false, true, regular)
    y = tableRow(page, y, ['Automaticity', 'Word recognition without conscious effort — built through practice'], defCols, false, false, regular)
    y = tableRow(page, y, ['Fluency as Bridge', 'Connects decoding to comprehension. Without fluency, comprehension breaks down.'], defCols, false, true, regular)
    y = tableRow(page, y, ['Build Fluency With', 'Repeated reading, modeled reading, echo reading, wide reading at independent level'], defCols, false, false, regular)
    y = tableRow(page, y, ['Common Disruptors', 'Limited phonics, unfamiliar vocabulary, lack of background knowledge'], defCols, false, true, regular)

    // ── PAGE 3: CTA ─────────────────────────────────────────────────────────
    page = doc.addPage([PAGE_W, PAGE_H])
    y = PAGE_H - MARGIN

    y = sectionBar(page, y, 'This is just Subarea I — 35% of the exam')
    y -= 4
    y = drawParagraph(page, y, 'You just covered the most heavily weighted section of the FORT. But there are three more subareas you need to know:')
    y -= 4

    const ctaLines = [
      'Subarea II (27%) — Vocabulary tiers, literary text, informational text structures',
      'Subarea III (18%) — Assessment types, MTSS/RTI, data-driven instruction',
      'Subarea IV (20%) — Two written assignments with student performance data',
    ]
    for (const line of ctaLines) {
      page.drawText('\u2022', { x: MARGIN + 6, y, size: 10, font: bold, color: BURGUNDY })
      const wrapped = wrapText(line, regular, 9, CONTENT_W - 26)
      wrapped.forEach((l, li) => page.drawText(l, { x: MARGIN + 18, y: y - li * 11, size: 9, font: regular, color: DARK }))
      y -= wrapped.length * 11 + 6
    }

    y -= 16

    // CTA box
    const ctaBoxH = 100
    page.drawRectangle({ x: MARGIN, y: y - ctaBoxH, width: CONTENT_W, height: ctaBoxH, color: BURGUNDY, borderColor: BURGUNDY, borderWidth: 1 })
    page.drawText('Get the Complete Study Guide', { x: MARGIN + (CONTENT_W - bold.widthOfTextAtSize('Get the Complete Study Guide', 18)) / 2, y: y - 30, size: 18, font: bold, color: WHITE })
    const ctaSubtext = 'All 4 subareas · Practice tests · Flashcards · AI-graded written responses'
    page.drawText(ctaSubtext, { x: MARGIN + (CONTENT_W - regular.widthOfTextAtSize(ctaSubtext, 10)) / 2, y: y - 50, size: 10, font: regular, color: rgb(0.91, 0.71, 0.74) })
    const ctaUrl = 'foundationsofreading.com'
    page.drawText(ctaUrl, { x: MARGIN + (CONTENT_W - bold.widthOfTextAtSize(ctaUrl, 12)) / 2, y: y - 72, size: 12, font: bold, color: WHITE })

    y -= ctaBoxH + 20
    y = drawParagraph(page, y, 'Our full program covers everything on the exam. Study guide, practice tests with detailed explanations, vocabulary flashcards, and AI-graded constructed response practice. One monthly subscription, cancel anytime.', 8)

    // Footer
    page.drawLine({ start: { x: MARGIN, y: 36 }, end: { x: PAGE_W - MARGIN, y: 36 }, thickness: 0.5, color: BORDER })
    page.drawText('© Foundations of Reading Test Prep · foundationsofreading.com · For personal study use only', {
      x: MARGIN, y: 22, size: 7, font: regular, color: MID,
    })

    const pdfBytes = await doc.save()
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="FORT-Study-Guide-Starter.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('FORT Study Guide Starter PDF error:', err)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
