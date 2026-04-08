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
const COL_W     = (CONTENT_W - 12) / 2
const COL2_X    = MARGIN + COL_W + 12

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

    const conceptRow = (pg: PDFPage, xOff: number, w: number, yPos: number, term: string, def: string, isOdd: boolean): number => {
      const termLines = wrapText(term, bold, 7.5, w - 14)
      const defLines  = wrapText(def, regular, 7.5, w - 14)
      const rowH = termLines.length * 9 + defLines.length * 9 + 10
      pg.drawRectangle({ x: xOff, y: yPos - rowH, width: w, height: rowH, color: isOdd ? ROW_ODD : WHITE })
      let ty = yPos - 8
      termLines.forEach((l, i) => pg.drawText(l, { x: xOff + 7, y: ty - i * 9, size: 7.5, font: bold, color: BURGUNDY }))
      ty -= termLines.length * 9 + 1
      defLines.forEach((l, i) => pg.drawText(l, { x: xOff + 7, y: ty - i * 9, size: 7.5, font: regular, color: DARK }))
      pg.drawLine({ start: { x: xOff, y: yPos - rowH }, end: { x: xOff + w, y: yPos - rowH }, thickness: 0.5, color: BORDER })
      return yPos - rowH
    }

    // ── PAGE 1 ──────────────────────────────────────────────────────────────
    const p1 = doc.addPage([PAGE_W, PAGE_H])

    // Header
    p1.drawRectangle({ x: 0, y: PAGE_H - 68, width: PAGE_W, height: 68, color: BURGUNDY })
    p1.drawText('MASSACHUSETTS — MTEL FOUNDATIONS OF READING', { x: MARGIN, y: PAGE_H - 25, size: 8, font: bold, color: rgb(0.91, 0.71, 0.74) })
    p1.drawText('MTEL 190 · Study Sheet', { x: MARGIN, y: PAGE_H - 46, size: 17, font: bold, color: WHITE })
    p1.drawText('foundationsofreading.com', {
      x: PAGE_W - MARGIN - regular.widthOfTextAtSize('foundationsofreading.com', 8),
      y: PAGE_H - 46, size: 8, font: regular, color: rgb(0.91, 0.71, 0.74),
    })

    let y = PAGE_H - 78

    // ── Massachusetts at a Glance ───────────────────────────────────────────
    y = sectionBar(p1, y, 'Massachusetts / MTEL — Test at a Glance')

    const glanceCol1W = 96
    const glanceRows: [string, string][] = [
      ['Test Code',     '190 — Foundations of Reading (MTEL in Massachusetts)'],
      ['Format',        '100 multiple-choice questions + 2 open-response written assignments'],
      ['Total Time',    '4 hours  (4h 15m at testing center · 4h 30m with online proctoring)'],
      ['Fee',           '$139'],
      ['Passing Score', '240 (Massachusetts)'],
      ['Score Scale',   '100–300'],
      ['Retake Policy', '30-day minimum wait · No limit on number of attempts'],
      ['Registration',  'mtel.nesinc.com — Massachusetts Tests for Educator Licensure portal'],
    ]

    const glanceTableTop = y
    p1.drawLine({ start: { x: MARGIN, y }, end: { x: MARGIN + CONTENT_W, y }, thickness: 0.5, color: BORDER })

    for (let i = 0; i < glanceRows.length; i++) {
      const [label, value] = glanceRows[i]
      const valLines = wrapText(value, regular, 8.5, CONTENT_W - glanceCol1W - 14)
      const rowH = Math.max(18, valLines.length * 10 + 8)
      p1.drawRectangle({ x: MARGIN, y: y - rowH, width: CONTENT_W, height: rowH, color: i % 2 === 1 ? ROW_ODD : WHITE })
      p1.drawLine({ start: { x: MARGIN + glanceCol1W, y }, end: { x: MARGIN + glanceCol1W, y: y - rowH }, thickness: 0.5, color: BORDER })
      p1.drawLine({ start: { x: MARGIN, y: y - rowH }, end: { x: MARGIN + CONTENT_W, y: y - rowH }, thickness: 0.5, color: BORDER })
      const baselineY = y - Math.max(8, (rowH - valLines.length * 10) / 2) - 1
      p1.drawText(label, { x: MARGIN + 7, y: baselineY, size: 8, font: bold, color: BURGUNDY })
      valLines.forEach((l, li) => p1.drawText(l, { x: MARGIN + glanceCol1W + 8, y: baselineY - li * 10, size: 8.5, font: regular, color: DARK }))
      y -= rowH
    }
    p1.drawRectangle({ x: MARGIN, y, width: CONTENT_W, height: glanceTableTop - y, borderColor: BORDER, borderWidth: 0.5 })

    y -= 12

    // ── Four Subareas ───────────────────────────────────────────────────────
    y = sectionBar(p1, y, 'The Four Subareas — Exam Weight Breakdown')

    const subC1 = 84, subC2 = 110, subC3 = CONTENT_W - subC1 - subC2
    const subTableTop = y
    p1.drawRectangle({ x: MARGIN, y: y - 16, width: CONTENT_W, height: 16, color: rgb(0.18, 0.18, 0.18) })
    ;(['SUBAREA', 'WEIGHT', 'TOPICS COVERED'] as const).forEach((h, i) => {
      const xOff = [7, subC1 + 7, subC1 + subC2 + 7][i]
      p1.drawText(h, { x: MARGIN + xOff, y: y - 11, size: 7, font: bold, color: WHITE })
    })
    y -= 16
    p1.drawLine({ start: { x: MARGIN, y }, end: { x: MARGIN + CONTENT_W, y }, thickness: 0.5, color: BORDER })

    const subareas = [
      { label: 'Subarea I',   pct: 35, items: '~43–45 MC', topics: 'Phonological & phonemic awareness, alphabetic principle, phonics, high-frequency words, spelling patterns, word analysis, reading fluency' },
      { label: 'Subarea II',  pct: 27, items: '~33–35 MC', topics: 'Academic language, vocabulary (Tier 1/2/3 framework), literary text analysis, informational text structures, Simple View of Reading' },
      { label: 'Subarea III', pct: 18, items: '~21–23 MC', topics: 'Screening, diagnostic, progress monitoring, formative & summative, MTSS/RTI, data-driven instruction, diverse learners' },
      { label: 'Subarea IV',  pct: 20, items: '2 written',  topics: 'Analyze student reading data, connect assessment evidence to instructional decisions for foundational skills or comprehension' },
    ]

    for (let i = 0; i < subareas.length; i++) {
      const s = subareas[i]
      const topicLines = wrapText(s.topics, regular, 8, subC3 - 12)
      const rowH = Math.max(34, topicLines.length * 10 + 14)
      p1.drawRectangle({ x: MARGIN, y: y - rowH, width: CONTENT_W, height: rowH, color: i % 2 === 1 ? ROW_ODD : WHITE })
      p1.drawText(s.label, { x: MARGIN + 7, y: y - 12, size: 8, font: bold, color: BURGUNDY })
      p1.drawText(s.items, { x: MARGIN + 7, y: y - 22.5, size: 7.5, font: regular, color: MID })
      const barX = MARGIN + subC1 + 7, barMaxW = 64, barY = y - rowH / 2 - 4
      p1.drawRectangle({ x: barX, y: barY, width: barMaxW, height: 8, color: rgb(0.88, 0.82, 0.84) })
      p1.drawRectangle({ x: barX, y: barY, width: Math.round((s.pct / 40) * barMaxW), height: 8, color: BURGUNDY })
      p1.drawText(`${s.pct}%`, { x: barX + barMaxW + 5, y: barY + 1, size: 8.5, font: bold, color: BURGUNDY })
      const topicStartY = y - (rowH - topicLines.length * 10) / 2 - 1
      topicLines.forEach((l, li) => p1.drawText(l, { x: MARGIN + subC1 + subC2 + 7, y: topicStartY - li * 10, size: 8, font: regular, color: DARK }))
      ;[subC1, subC1 + subC2].forEach(dx => p1.drawLine({ start: { x: MARGIN + dx, y }, end: { x: MARGIN + dx, y: y - rowH }, thickness: 0.5, color: BORDER }))
      p1.drawLine({ start: { x: MARGIN, y: y - rowH }, end: { x: MARGIN + CONTENT_W, y: y - rowH }, thickness: 0.5, color: BORDER })
      y -= rowH
    }
    p1.drawRectangle({ x: MARGIN, y, width: CONTENT_W, height: subTableTop - y, borderColor: BORDER, borderWidth: 0.5 })

    y -= 12

    // ── Key Concepts: Subarea I (left) | Subarea II (right) on page 1 ────
    let yL = y, yR = y

    yL = sectionBar(p1, yL, 'Subarea I — Foundations of Reading', COL_W, MARGIN)
    p1.drawLine({ start: { x: MARGIN, y: yL }, end: { x: MARGIN + COL_W, y: yL }, thickness: 0.5, color: BORDER })
    const sub1: [string, string][] = [
      ['Phonological Awareness', 'Hearing & manipulating sound structures — words, syllables, onset-rime, phonemes.'],
      ['Phonemic Awareness',     'Hearing & manipulating individual phonemes. Tasks: isolation, blending, segmentation, manipulation.'],
      ['Phonics',                'Letter-sound relationships. Must be systematic + explicit. CVC, digraphs, blends, vowel teams, CVCe.'],
      ['Fluency',                'Accurate, automatic reading with prosody. Built via repeated reading, modeled reading, wide reading.'],
      ['Word Analysis',          'Morphemes + 6 syllable types: closed, open, vowel team, CVCe, r-controlled, consonant-le.'],
    ]
    sub1.forEach(([t, d], i) => { yL = conceptRow(p1, MARGIN, COL_W, yL, t, d, i % 2 === 1) })

    yR = sectionBar(p1, yR, 'Subarea II — Reading Comprehension', COL_W, COL2_X)
    p1.drawLine({ start: { x: COL2_X, y: yR }, end: { x: COL2_X + COL_W, y: yR }, thickness: 0.5, color: BORDER })
    const sub2: [string, string][] = [
      ['Three-Tier Vocabulary', 'Tier 1 = everyday. Tier 2 = academic (highest priority). Tier 3 = domain-specific.'],
      ['Literary Text',         'Character, setting, plot, theme, POV, literary devices, inferencing from evidence.'],
      ['Informational Text',    'Text structures (cause-effect, compare-contrast, problem-solution), features, summarization.'],
      ['Simple View of Reading','RC = Decoding x Language Comprehension. Weakness in either limits comprehension.'],
    ]
    sub2.forEach(([t, d], i) => { yR = conceptRow(p1, COL2_X, COL_W, yR, t, d, i % 2 === 1) })

    // ── PAGE 2 ──────────────────────────────────────────────────────────────
    const p2 = doc.addPage([PAGE_W, PAGE_H])
    let y2L = PAGE_H - MARGIN, y2R = PAGE_H - MARGIN

    y2L = sectionBar(p2, y2L, 'Subarea III — Assessment & Instruction', COL_W, MARGIN)
    p2.drawLine({ start: { x: MARGIN, y: y2L }, end: { x: MARGIN + COL_W, y: y2L }, thickness: 0.5, color: BORDER })
    const sub3: [string, string][] = [
      ['Screening',          'Brief, universal. All students at year-start. (DIBELS, AIMSweb)'],
      ['Diagnostic',         'In-depth. After screening flags a concern. (phonics inventory)'],
      ['Progress Monitoring','Frequent + brief. Tracks response to instruction over time.'],
      ['Running Records',    'Codes oral reading miscues: substitution, omission, insertion, self-correction.'],
      ['MTSS / RTI',         'Tier 1 = core for all. Tier 2 = small-group. Tier 3 = intensive individual.'],
    ]
    sub3.forEach(([t, d], i) => { y2L = conceptRow(p2, MARGIN, COL_W, y2L, t, d, i % 2 === 1) })

    y2R = sectionBar(p2, y2R, 'Test Day Tips — Massachusetts / MTEL', COL_W, COL2_X)
    const tips = [
      'Massachusetts passing score is 240 — the national benchmark.',
      'Register through mtel.nesinc.com — the MTEL testing portal.',
      'Test code is 190 under the MTEL program. Same content as the 890.',
      'Favor explicit, systematic, evidence-based answers. Most structured option wins.',
      '~90 sec per MC question. Reserve 45–50 min per written assignment.',
      'Online proctoring: 15-min break between MC and written. Cannot go back after.',
    ]
    let tipsH = 8
    for (const tip of tips) tipsH += wrapText(tip, regular, 7.5, COL_W - 22).length * 9 + 9
    p2.drawRectangle({ x: COL2_X, y: y2R - tipsH, width: COL_W, height: tipsH, color: ROW_ODD })
    p2.drawLine({ start: { x: COL2_X, y: y2R }, end: { x: COL2_X + COL_W, y: y2R }, thickness: 0.5, color: BORDER })
    let tipY = y2R - 4
    for (const tip of tips) {
      const tipLines = wrapText(tip, regular, 7.5, COL_W - 22)
      p2.drawText('·', { x: COL2_X + 6, y: tipY - 9, size: 10, font: bold, color: BURGUNDY })
      tipLines.forEach((l, li) => p2.drawText(l, { x: COL2_X + 16, y: tipY - 9 - li * 9, size: 7.5, font: regular, color: DARK }))
      tipY -= tipLines.length * 9 + 9
    }
    y2R -= tipsH

    // ── Open-Response Template ───────────────────────────────────────────────
    let yFull = Math.min(y2L, y2R) - 14
    yFull = sectionBar(p2, yFull, 'Subarea IV — Open-Response Template  ·  Scored 1–4: Purpose · Knowledge · Support · Rationale')

    const templateRows = [
      { label: 'STRENGTH',     text: 'One significant strength I observed is __________________ as evidenced by __________________.' },
      { label: 'NEED',         text: 'This student needs support with __________________ because the data shows __________________.' },
      { label: 'STRATEGY',     text: 'I would recommend ________________________________ to directly address this identified need.' },
      { label: 'RATIONALE',    text: 'This strategy will be effective for this student because ________________________________.' },
      { label: 'TERMS TO USE', text: 'phonemic awareness · miscue analysis · prosody · morphemic analysis · scaffolding · gradual release of responsibility' },
    ]

    let templateH = 10
    for (const row of templateRows) {
      const prefixW = bold.widthOfTextAtSize(`${row.label}:  `, 8)
      templateH += wrapText(row.text, italic, 8, CONTENT_W - prefixW - 20).length * 11 + 8
    }
    p2.drawRectangle({ x: MARGIN, y: yFull - templateH, width: CONTENT_W, height: templateH, color: ROW_ODD })
    p2.drawRectangle({ x: MARGIN, y: yFull - templateH, width: CONTENT_W, height: templateH, borderColor: BORDER, borderWidth: 0.5 })

    let ty = yFull - 12
    for (const row of templateRows) {
      const prefix  = `${row.label}:  `
      const prefixW = bold.widthOfTextAtSize(prefix, 8)
      const lines   = wrapText(row.text, italic, 8, CONTENT_W - prefixW - 20)
      p2.drawText(prefix, { x: MARGIN + 10, y: ty, size: 8, font: bold, color: BURGUNDY })
      lines.forEach((l, li) => p2.drawText(l, { x: MARGIN + 10 + prefixW, y: ty - li * 11, size: 8, font: italic, color: DARK }))
      ty -= lines.length * 11 + 8
    }

    // Footer
    p2.drawLine({ start: { x: MARGIN, y: 36 }, end: { x: PAGE_W - MARGIN, y: 36 }, thickness: 0.5, color: BORDER })
    p2.drawText('© Foundations of Reading Test Prep · foundationsofreading.com · For personal study use only', {
      x: MARGIN, y: 22, size: 7, font: regular, color: MID,
    })

    const pdfBytes = await doc.save()
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="MTEL-190-Foundations-of-Reading-Study-Sheet.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('MTEL Study Sheet PDF error:', err)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
