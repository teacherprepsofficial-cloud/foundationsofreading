export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { PDFDocument, PDFPage, rgb, StandardFonts } from 'pdf-lib'
import connectDB from '@/lib/mongodb'
import Question from '@/models/Question'
import mongoose from 'mongoose'

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

const FOOTER_TEXT = 'foundationsofreading.com  ·  Foundations of Reading Test Prep Starter Kit  ·  For personal study use only'

const QUESTION_IDS = [
  '69cfec4928a8f4d88398c5e9','69cfec4928a8f4d88398c5ea','69cfec4928a8f4d88398c5eb',
  '69cfec4928a8f4d88398c5ec','69cfec4928a8f4d88398c5ed','69cfec4928a8f4d88398c5ee',
  '69cfec4928a8f4d88398c5ef','69cfec4928a8f4d88398c5f0','69cfec4928a8f4d88398c5f1',
  '69cfec4928a8f4d88398c5f2','69cfec4928a8f4d88398c5f3','69cfec4928a8f4d88398c5f4',
  '69cfec4928a8f4d88398c5f5','69cfec4928a8f4d88398c5f6','69cfec4928a8f4d88398c5f7',
  '69cfec4928a8f4d88398c5f8','69cfec4928a8f4d88398c5f9','69cfec4928a8f4d88398c5fa',
  '69cfec4928a8f4d88398c5fb','69cfec4928a8f4d88398c5fc','69cfec4928a8f4d88398c5fd',
  '69cfec4928a8f4d88398c5fe','69cfec4928a8f4d88398c615','69cfec4928a8f4d88398c616',
  '69cfec4928a8f4d88398c617','69cfec4928a8f4d88398c618','69cfec4928a8f4d88398c619',
  '69cfec4928a8f4d88398c61a','69cfec4928a8f4d88398c61b','69cfec4928a8f4d88398c61c',
  '69cfec4928a8f4d88398c61d','69cfec4928a8f4d88398c61e','69cfec4928a8f4d88398c61f',
  '69cfec4928a8f4d88398c620','69cfec4928a8f4d88398c621','69cfec4928a8f4d88398c622',
  '69cfec4928a8f4d88398c623','69cfec4928a8f4d88398c624','69cfec4928a8f4d88398c625',
  '69cfec4928a8f4d88398c636','69cfec4928a8f4d88398c637','69cfec4928a8f4d88398c638',
  '69cfec4928a8f4d88398c639','69cfec4928a8f4d88398c63a','69cfec4928a8f4d88398c63b',
  '69cfec4928a8f4d88398c63c','69cfec4928a8f4d88398c63d','69cfec4928a8f4d88398c63e',
  '69cfec4928a8f4d88398c63f','69cfec4928a8f4d88398c640',
]

interface PdfQuestion {
  questionText: string
  options: { label: string; text: string }[]
  correctAnswer: string
  explanation: string
}

// Strip characters outside WinAnsi encoding to prevent pdf-lib crashes
function sanitize(text: string): string {
  return text
    .replace(/[\u0100-\u017F]/g, (ch) => {
      // Latin Extended-A: map accented chars to ASCII equivalents
      const map: Record<string, string> = {
        '\u0101': 'a', '\u0113': 'e', '\u012B': 'i', '\u014D': 'o', '\u016B': 'u',
        '\u0100': 'A', '\u0112': 'E', '\u012A': 'I', '\u014C': 'O', '\u016A': 'U',
      }
      return map[ch] || ch.normalize('NFD').replace(/[\u0300-\u036f]/g, '') || '?'
    })
    .replace(/[\u0250-\u02AF]/g, (ch) => {
      // IPA characters
      const map: Record<string, string> = {
        '\u0259': 'e', '\u025B': 'e', '\u0254': 'o', '\u0252': 'a',
        '\u026A': 'i', '\u028A': 'u', '\u0292': 'z', '\u014B': 'ng',
        '\u0283': 'sh', '\u02C8': "'", '\u02D0': ':',
      }
      return map[ch] || '?'
    })
    .replace(/\u2194/g, '/') // ↔
    .replace(/\u00D7/g, 'x') // ×
    .replace(/\u2192/g, '>') // →
    .replace(/\u2190/g, '<') // ←
    .replace(/[^\x00-\xFF]/g, (ch) => {
      // Catch-all: replace any remaining non-Latin1 with ?
      if (ch === '\u2013') return '--' // en dash
      if (ch === '\u2014') return '--' // em dash
      if (ch === '\u2018' || ch === '\u2019') return "'" // smart quotes
      if (ch === '\u201C' || ch === '\u201D') return '"' // smart double quotes
      if (ch === '\u2026') return '...' // ellipsis
      if (ch === '\u00B7') return '.' // middle dot (actually in WinAnsi, but just in case)
      return '?'
    })
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function wrapText(text: string, font: any, size: number, maxWidth: number): string[] {
  text = sanitize(text)
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
    await connectDB()
    const ids = QUESTION_IDS.map(id => new mongoose.Types.ObjectId(id))
    const questions = await Question.find({ _id: { $in: ids } })
      .select('questionText options correctAnswer explanation')
      .lean() as unknown as PdfQuestion[]

    // Preserve original order
    const qMap = new Map<string, PdfQuestion>()
    for (const q of questions) {
      qMap.set((q as unknown as { _id: mongoose.Types.ObjectId })._id.toString(), q)
    }
    const ordered: PdfQuestion[] = []
    for (const id of QUESTION_IDS) {
      const q = qMap.get(id)
      if (q) ordered.push(q)
    }

    const doc     = await PDFDocument.create()
    const bold    = await doc.embedFont(StandardFonts.HelveticaBold)
    const regular = await doc.embedFont(StandardFonts.Helvetica)
    const italic  = await doc.embedFont(StandardFonts.HelveticaOblique)

    // ── Helpers ──────────────────────────────────────────────────────────

    const addFooter = (pg: PDFPage) => {
      pg.drawLine({ start: { x: MARGIN, y: 36 }, end: { x: PAGE_W - MARGIN, y: 36 }, thickness: 0.5, color: BORDER })
      pg.drawText(FOOTER_TEXT, { x: MARGIN, y: 22, size: 6.5, font: regular, color: MID })
    }

    const newPage = (): PDFPage => {
      const pg = doc.addPage([PAGE_W, PAGE_H])
      addFooter(pg)
      return pg
    }

    const sectionBar = (pg: PDFPage, yPos: number, title: string): number => {
      pg.drawRectangle({ x: MARGIN, y: yPos - 18, width: CONTENT_W, height: 20, color: BURGUNDY })
      pg.drawText(title.toUpperCase(), { x: MARGIN + 7, y: yPos - 12, size: 7.5, font: bold, color: WHITE })
      return yPos - 26
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tableRow = (pg: PDFPage, yPos: number, cols: string[], colWidths: number[], isHeader: boolean, isOdd: boolean, fnt?: any): number => {
      const f = fnt || regular
      const lineHeight = 10
      let maxLines = 1
      const allWrapped: string[][] = []
      cols.forEach((col, ci) => {
        const w = colWidths[ci] - 12
        const wrapped = wrapText(col, isHeader ? bold : f, 8, w)
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
          pg.drawText(l, { x: colX + 6, y: baseY - li * lineHeight, size: 8, font: isHeader ? bold : f, color: textColor })
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

    // ══════════════════════════════════════════════════════════════════════
    // PAGE 1: Cover / Title Page (full-page burgundy)
    // ══════════════════════════════════════════════════════════════════════
    const p1 = doc.addPage([PAGE_W, PAGE_H]) // No footer on cover

    // Full-page burgundy background
    p1.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: BURGUNDY })

    const PINK = rgb(0.91, 0.71, 0.74)
    const centerX = (text: string, font_: typeof bold, size: number) =>
      (PAGE_W - font_.widthOfTextAtSize(text, size)) / 2

    // Small top text
    const coverTop = 'FOUNDATIONS OF READING'
    p1.drawText(coverTop, { x: centerX(coverTop, bold, 10), y: PAGE_H - 240, size: 10, font: bold, color: PINK })

    // Large title
    const coverTitle = 'Test Prep Starter Kit'
    p1.drawText(coverTitle, { x: centerX(coverTitle, bold, 28), y: PAGE_H - 280, size: 28, font: bold, color: WHITE })

    // Subtitle
    const coverSub = 'The Ultimate Guide to Pass'
    p1.drawText(coverSub, { x: centerX(coverSub, italic, 14), y: PAGE_H - 304, size: 14, font: italic, color: PINK })

    // Thin horizontal divider
    const dividerW = 200
    const dividerX = (PAGE_W - dividerW) / 2
    p1.drawLine({ start: { x: dividerX, y: PAGE_H - 330 }, end: { x: dividerX + dividerW, y: PAGE_H - 330 }, thickness: 0.75, color: WHITE })

    // "What's Inside:" label
    const insideLabel = "What's Inside:"
    p1.drawText(insideLabel, { x: centerX(insideLabel, bold, 11), y: PAGE_H - 358, size: 11, font: bold, color: WHITE })

    // Bullet list items (centered)
    const insideItems = [
      'Complete Exam Overview with tables',
      '50-Question Practice Test with Answer Key',
      'Key Vocabulary Reference (20 terms)',
      'Constructed Response Prompt + Model Response',
      'Frequently Asked Questions',
      '20% Discount Code for Full Prep',
    ]
    let insideY = PAGE_H - 382
    for (const item of insideItems) {
      const bulletText = '  ' + item
      const bulletW = regular.widthOfTextAtSize(bulletText, 10)
      const dotW = regular.widthOfTextAtSize('  ', 10)
      const itemX = (PAGE_W - bulletW) / 2
      p1.drawText('·', { x: itemX, y: insideY, size: 10, font: bold, color: WHITE })
      p1.drawText(item, { x: itemX + dotW, y: insideY, size: 10, font: regular, color: WHITE })
      insideY -= 20
    }

    // Bottom URL
    const coverUrl = 'foundationsofreading.com'
    p1.drawText(coverUrl, { x: centerX(coverUrl, regular, 10), y: 50, size: 10, font: regular, color: PINK })

    let y: number

    // ══════════════════════════════════════════════════════════════════════
    // PAGES 2-3: About the Exam
    // ══════════════════════════════════════════════════════════════════════
    let page = newPage()
    y = PAGE_H - MARGIN

    // ── Test at a Glance ────────────────────────────────────────────────
    y = sectionBar(page, y, 'Test at a Glance')
    const glanceCols = [160, CONTENT_W - 160]
    y = tableRow(page, y, ['Detail', 'Information'], glanceCols, true, false)

    const glanceData: [string, string][] = [
      ['Test Name', 'Foundations of Reading'],
      ['Test Codes', '190 (OH via OAE, MA via MTEL) / 890 (most other states)'],
      ['Administered By', 'Pearson through the NES program'],
      ['Format', '100 multiple-choice + 2 open-response written assignments'],
      ['Testing Time', '4 hours'],
      ['Total Appointment', '4h 15m (testing center) / 4h 30m (online proctored)'],
      ['Fee', '$139'],
      ['Score Scale', '100-300'],
      ['Online Proctoring', 'Available -- 15-min break between MC and written sections'],
      ['Retake Policy', '30-day wait, no limit on attempts'],
    ]
    glanceData.forEach(([label, value], i) => {
      y = tableRow(page, y, [label, value], glanceCols, false, i % 2 === 1)
    })

    y -= 14

    // ── Passing Scores by State ─────────────────────────────────────────
    y = sectionBar(page, y, 'Passing Scores by State')
    const passCols = [200, 100, CONTENT_W - 300]
    y = tableRow(page, y, ['State', 'Score', 'Test Code'], passCols, true, false)

    const passData: [string, string, string][] = [
      ['Alabama', '233', '890'],
      ['Arizona', '240', '890'],
      ['Arkansas', '233', '890'],
      ['California', '220', '890'],
      ['Connecticut', '240', '890'],
      ['Iowa', '240', '890'],
      ['Massachusetts', '240', 'MTEL 190'],
      ['Mississippi', '233', '890'],
      ['New Hampshire', '240', '890'],
      ['North Carolina', '233', '890'],
      ['Ohio', '220', 'OAE 190'],
      ['Oklahoma', '240', 'CEOE 890'],
      ['Rhode Island', '240', '890'],
      ['Utah', '240', '890'],
      ['Wisconsin', '240', '890'],
    ]
    passData.forEach(([state, score, code], i) => {
      if (y < MARGIN + 60) {
        page = newPage()
        y = PAGE_H - MARGIN
      }
      y = tableRow(page, y, [state, score, code], passCols, false, i % 2 === 1)
    })

    y -= 14

    // ── Subarea Weight Breakdown ────────────────────────────────────────
    if (y < MARGIN + 140) {
      page = newPage()
      y = PAGE_H - MARGIN
    }
    y = sectionBar(page, y, 'Subarea Weight Breakdown')
    const subCols = [240, 80, CONTENT_W - 320]
    y = tableRow(page, y, ['Subarea', 'Weight', 'Questions'], subCols, true, false)

    const subData: [string, string, string][] = [
      ['I. Foundations of Reading Development', '35%', '43-45 MC'],
      ['II. Development of Reading Comprehension', '27%', '33-35 MC'],
      ['III. Reading Assessment and Instruction', '18%', '21-23 MC'],
      ['IV. Foundational Reading Skills (Written)', '10%', '1 open-response'],
      ['V. Reading Comprehension (Written)', '10%', '1 open-response'],
    ]
    subData.forEach(([sub, wt, qs], i) => {
      y = tableRow(page, y, [sub, wt, qs], subCols, false, i % 2 === 1)
    })

    y -= 14

    // ── Subarea I Objectives ────────────────────────────────────────────
    if (y < MARGIN + 120) {
      page = newPage()
      y = PAGE_H - MARGIN
    }
    y = sectionBar(page, y, 'Subarea I Objectives')
    const objCols = [60, 140, CONTENT_W - 200]
    y = tableRow(page, y, ['Objective', 'Topic', 'Key Concepts'], objCols, true, false)

    const sub1Objs: [string, string, string][] = [
      ['1', 'Phonological and Phonemic Awareness', 'Word awareness, syllables, onset-rime, phonemes, alphabetic principle, concepts of print'],
      ['2', 'Phonics and Word Recognition', 'Systematic explicit phonics, CVC/CVCe/vowel teams, digraphs vs blends, high-frequency words, encoding/decoding'],
      ['3', 'Word Analysis and Morphemic Analysis', 'Morphemes, inflectional vs derivational suffixes, 6 syllable types'],
      ['4', 'Reading Fluency', 'Accuracy, rate, prosody, automaticity, repeated reading'],
    ]
    sub1Objs.forEach(([obj, topic, concepts], i) => {
      if (y < MARGIN + 60) {
        page = newPage()
        y = PAGE_H - MARGIN
      }
      y = tableRow(page, y, [obj, topic, concepts], objCols, false, i % 2 === 1)
    })

    y -= 14

    // ── Subarea II Objectives ───────────────────────────────────────────
    if (y < MARGIN + 120) {
      page = newPage()
      y = PAGE_H - MARGIN
    }
    y = sectionBar(page, y, 'Subarea II Objectives')
    y = tableRow(page, y, ['Objective', 'Topic', 'Key Concepts'], objCols, true, false)

    const sub2Objs: [string, string, string][] = [
      ['5', 'Academic Language and Vocabulary', 'Three-tier vocabulary (Tier 1 everyday, Tier 2 academic, Tier 3 domain), context clues'],
      ['6', 'Literary Text', 'Character, setting, plot, theme, POV, literary devices, literal/inferential/evaluative comprehension'],
      ['7', 'Informational Text', 'Five text structures, text features, disciplinary literacy'],
    ]
    sub2Objs.forEach(([obj, topic, concepts], i) => {
      if (y < MARGIN + 60) {
        page = newPage()
        y = PAGE_H - MARGIN
      }
      y = tableRow(page, y, [obj, topic, concepts], objCols, false, i % 2 === 1)
    })

    y -= 14

    // ── Subarea III Objectives ──────────────────────────────────────────
    if (y < MARGIN + 120) {
      page = newPage()
      y = PAGE_H - MARGIN
    }
    y = sectionBar(page, y, 'Subarea III Objectives')
    y = tableRow(page, y, ['Objective', 'Topic', 'Key Concepts'], objCols, true, false)

    const sub3Objs: [string, string, string][] = [
      ['8', 'Assessment', 'Screening, diagnostic, progress monitoring, formative, summative'],
      ['9', 'Instructional Practices', 'MTSS/RTI tiers, data-driven instruction, differentiation, diverse learners'],
    ]
    sub3Objs.forEach(([obj, topic, concepts], i) => {
      y = tableRow(page, y, [obj, topic, concepts], objCols, false, i % 2 === 1)
    })

    y -= 14

    // ── Written Assignments ─────────────────────────────────────────────
    if (y < MARGIN + 120) {
      page = newPage()
      y = PAGE_H - MARGIN
    }
    y = sectionBar(page, y, 'Written Assignments')
    y = drawParagraph(page, y, 'Two open-response items, each scored 1-4.', 8.5)
    y -= 2
    y = drawParagraph(page, y, 'Subarea IV: Foundational reading skills scenario.', 8.5)
    y -= 2
    y = drawParagraph(page, y, 'Subarea V: Reading comprehension scenario.', 8.5)
    y -= 2
    y = drawParagraph(page, y, '4-point rubric: Purpose, Subject Matter Knowledge, Support, Rationale.', 8.5)

    // ══════════════════════════════════════════════════════════════════════
    // PRACTICE TEST PAGES
    // ══════════════════════════════════════════════════════════════════════
    page = newPage()
    y = PAGE_H - MARGIN
    y = sectionBar(page, y, '50-Question Practice Test')
    y -= 6

    for (let qi = 0; qi < ordered.length; qi++) {
      const q = ordered[qi]

      // Calculate space needed
      const qLines = wrapText(q.questionText, regular, 9, CONTENT_W - 24)
      let needed = 18 + qLines.length * 11 + 8
      for (const opt of q.options) {
        const oLines = wrapText(`${opt.label}. ${opt.text}`, regular, 8.5, CONTENT_W - 36)
        needed += oLines.length * 11 + 2
      }
      needed += 20

      if (y - needed < MARGIN + 60) {
        page = newPage()
        y = PAGE_H - MARGIN
      }

      // Question number
      page.drawText(`${qi + 1}.`, { x: MARGIN, y: y - 10, size: 9, font: bold, color: BURGUNDY })
      const qStartX = MARGIN + 20

      // Question text
      let ty = y - 10
      for (const line of qLines) {
        page.drawText(line, { x: qStartX, y: ty, size: 9, font: regular, color: DARK })
        ty -= 11
      }
      ty -= 6

      // Options
      for (const opt of q.options) {
        const oLines = wrapText(`${opt.label}. ${opt.text}`, regular, 8.5, CONTENT_W - 36)
        for (const ol of oLines) {
          page.drawText(ol, { x: qStartX + 8, y: ty, size: 8.5, font: regular, color: DARK })
          ty -= 11
        }
        ty -= 2
      }

      y = ty - 10

      // Divider
      if (qi < ordered.length - 1) {
        page.drawLine({ start: { x: MARGIN, y }, end: { x: MARGIN + CONTENT_W, y }, thickness: 0.5, color: BORDER })
        y -= 10
      }
    }

    // ══════════════════════════════════════════════════════════════════════
    // ANSWER KEY
    // ══════════════════════════════════════════════════════════════════════
    page = newPage()
    y = PAGE_H - MARGIN
    y = sectionBar(page, y, 'Answer Key')
    y -= 6

    for (let qi = 0; qi < ordered.length; qi++) {
      const q = ordered[qi]
      const expLines = wrapText(q.explanation, regular, 8, CONTENT_W - 30)
      const needed = 14 + expLines.length * 10 + 14

      if (y - needed < MARGIN + 60) {
        page = newPage()
        y = PAGE_H - MARGIN
      }

      page.drawText(`${qi + 1}. ${q.correctAnswer}`, { x: MARGIN, y, size: 9, font: bold, color: BURGUNDY })
      let ey = y - 12
      for (const line of expLines) {
        page.drawText(line, { x: MARGIN + 20, y: ey, size: 8, font: regular, color: MID })
        ey -= 10
      }
      y = ey - 8
    }

    // ══════════════════════════════════════════════════════════════════════
    // KEY VOCABULARY REFERENCE
    // ══════════════════════════════════════════════════════════════════════
    page = newPage()
    y = PAGE_H - MARGIN
    y = sectionBar(page, y, 'Key Vocabulary -- 20 Essential Terms')

    const vocabCols = [160, CONTENT_W - 160]
    y = tableRow(page, y, ['Term', 'Definition'], vocabCols, true, false)

    const vocabData: [string, string][] = [
      ['Phonological awareness', 'Broad awareness that spoken language is made up of smaller sound units -- words, syllables, onset-rime. Listening skill only, no print.'],
      ['Phonemic awareness', 'Subset of phonological awareness focused on individual phonemes. All tasks are oral -- print makes it phonics.'],
      ['Phoneme segmentation', 'Breaking a spoken word into individual sounds. Strongest predictor of early reading achievement.'],
      ['Phoneme blending', 'Combining isolated phonemes into a word. Mirrors what the brain does when decoding.'],
      ['Alphabetic principle', 'Understanding that letters systematically represent sounds. Foundation for phonics.'],
      ['Systematic explicit phonics', 'Phonics taught in a deliberate scope and sequence, directly -- not discovered. CVC to complex.'],
      ['Consonant digraph', 'Two consonants representing one sound (sh, ch, th, wh). Each letter loses its individual sound.'],
      ['Consonant blend', 'Two or three consonants where each sound is still pronounced (bl, str, spr).'],
      ['High-frequency words', 'Words appearing most often in text. Many irregular, taught for automatic recognition. Dolch and Fry lists.'],
      ['Fluency', 'Reading with accuracy, rate, and prosody. Bridge between decoding and comprehension.'],
      ['Prosody', 'Phrasing, stress, and intonation during oral reading. Indicator of comprehension.'],
      ['Automaticity', 'Word recognition without conscious effort -- built through practice and exposure.'],
      ['Tier 2 vocabulary', 'High-utility academic words (analyze, contrast, significant). Highest instructional priority.'],
      ['Simple View of Reading', 'RC = Decoding x Language Comprehension. Weakness in either limits comprehension.'],
      ['MTSS / RTI', 'Tier 1: core instruction for all. Tier 2: small-group targeted. Tier 3: intensive individual.'],
      ['Screening assessment', 'Brief, universal assessment at start of year to identify at-risk students.'],
      ['Diagnostic assessment', 'In-depth assessment after screening flags a concern to pinpoint specific needs.'],
      ['Progress monitoring', 'Frequent, brief assessments tracking response to instruction over time.'],
      ['Running record', 'Codes oral reading miscues: substitution, omission, insertion, self-correction.'],
      ['Morpheme', 'Smallest unit of meaning: base words, roots, prefixes, suffixes.'],
    ]
    vocabData.forEach(([term, def], i) => {
      if (y < MARGIN + 60) {
        page = newPage()
        y = PAGE_H - MARGIN
      }
      y = tableRow(page, y, [term, def], vocabCols, false, i % 2 === 1)
    })

    // ══════════════════════════════════════════════════════════════════════
    // CONSTRUCTED RESPONSE — PAGE A: Instructions & Rubric
    // ══════════════════════════════════════════════════════════════════════
    page = newPage()
    y = PAGE_H - MARGIN
    y = sectionBar(page, y, 'Constructed Response -- Instructions and Rubric')
    y -= 4

    y = drawParagraph(page, y, 'The Foundations of Reading exam includes two open-response written assignments worth 20% of your total score. Each is scored on a 4-point scale across four dimensions: Purpose, Subject Matter Knowledge, Support (evidence), and Rationale.')
    y -= 10

    // Scoring Rubric table
    y = sectionBar(page, y, 'Scoring Rubric')
    const rubricCols = [50, 80, CONTENT_W - 130]
    y = tableRow(page, y, ['Score', 'Level', 'Description'], rubricCols, true, false)
    const rubricData: [string, string, string][] = [
      ['4', 'Thorough', 'Fully achieves the purpose, accurate subject matter, specific evidence, sound rationale'],
      ['3', 'Adequate', 'Largely achieves the purpose, generally accurate, adequate evidence, reasonable rationale'],
      ['2', 'Limited', 'Partially achieves the purpose, limited accuracy, weak evidence, flawed rationale'],
      ['1', 'Weak', 'Fails to achieve the purpose, inaccurate, no evidence, no rationale'],
    ]
    rubricData.forEach(([score, level, desc], i) => {
      y = tableRow(page, y, [score, level, desc], rubricCols, false, i % 2 === 1)
    })

    y -= 14

    // 4-Step Response Template
    y = sectionBar(page, y, 'The 4-Step Response Template')
    const stepCols = [60, CONTENT_W - 60]
    y = tableRow(page, y, ['Step', 'What to Write'], stepCols, true, false)
    const stepData: [string, string][] = [
      ['1. Identify a Strength', 'One significant strength with specific evidence from the student data'],
      ['2. Identify a Need', 'One significant need with specific evidence'],
      ['3. Recommend a Strategy', 'Name one specific instructional strategy that addresses the need'],
      ['4. Provide a Rationale', 'Explain why this strategy works for this particular student'],
    ]
    stepData.forEach(([step, desc], i) => {
      y = tableRow(page, y, [step, desc], stepCols, false, i % 2 === 1)
    })

    y -= 14

    // Professional Terms box
    const termsText = 'phonemic awareness, miscue analysis, prosody, morphemic analysis, scaffolding, gradual release of responsibility, explicit instruction, systematic phonics, running record, self-monitoring'
    const termsLines = wrapText(termsText, regular, 8.5, CONTENT_W - 30)
    const termsBoxH = termsLines.length * 11 + 30
    page.drawRectangle({ x: MARGIN, y: y - termsBoxH, width: CONTENT_W, height: termsBoxH, color: ROW_ODD, borderColor: BORDER, borderWidth: 1 })
    page.drawText('PROFESSIONAL TERMS TO USE', { x: MARGIN + 12, y: y - 16, size: 8, font: bold, color: BURGUNDY })
    let termsY = y - 30
    for (const line of termsLines) {
      page.drawText(line, { x: MARGIN + 12, y: termsY, size: 8.5, font: regular, color: DARK })
      termsY -= 11
    }
    y -= termsBoxH + 14

    // ══════════════════════════════════════════════════════════════════════
    // CONSTRUCTED RESPONSE — PAGE B: The Prompt
    // ══════════════════════════════════════════════════════════════════════
    page = newPage()
    y = PAGE_H - MARGIN
    y = sectionBar(page, y, 'Sample Constructed Response Prompt')
    y -= 4

    y = drawParagraph(page, y, 'Below is a sample prompt similar to what you will see on exam day. Read the scenario carefully, then review the model response on the next page.')
    y -= 10

    // Prompt scenario box
    const promptText = 'A second-grade teacher records Maya\'s oral reading of a narrative passage at instructional level. The running record shows Maya reads with 94% accuracy. She self-corrects 3 out of 8 errors. Most errors involve vowel team words (e.g., reading \'met\' for \'meat\', \'rod\' for \'road\'). Her fluency rubric indicates appropriate rate but limited prosody -- she reads in a monotone, ignoring punctuation cues.'

    const promptLines = wrapText(promptText, italic, 8.5, CONTENT_W - 24)
    const promptBoxH = promptLines.length * 11 + 16
    page.drawRectangle({ x: MARGIN, y: y - promptBoxH, width: CONTENT_W, height: promptBoxH, color: ROW_ODD, borderColor: BORDER, borderWidth: 1 })
    let promptY = y - 12
    for (const line of promptLines) {
      page.drawText(line, { x: MARGIN + 12, y: promptY, size: 8.5, font: italic, color: DARK })
      promptY -= 11
    }
    y -= promptBoxH + 14

    // Assignment instructions box
    const assignIntro = 'Using your knowledge of foundational reading skills, write a response of approximately 150-300 words in which you:'
    const assignBullets = [
      '- identify one significant strength related to foundational reading skills that Maya demonstrates, citing specific evidence from the data',
      '- identify one significant need related to foundational reading skills, citing specific evidence',
      '- recommend one specific instructional strategy to address the identified need',
      '- explain why this strategy is appropriate for this student based on the evidence',
    ]

    const assignIntroLines = wrapText(assignIntro, regular, 8.5, CONTENT_W - 24)
    let assignTotalLines = assignIntroLines.length
    const assignBulletWrapped: string[][] = []
    for (const bullet of assignBullets) {
      const wrapped = wrapText(bullet, regular, 8.5, CONTENT_W - 36)
      assignBulletWrapped.push(wrapped)
      assignTotalLines += wrapped.length
    }
    const assignBoxH = assignTotalLines * 11 + 24
    page.drawRectangle({ x: MARGIN, y: y - assignBoxH, width: CONTENT_W, height: assignBoxH, color: ROW_ODD, borderColor: BORDER, borderWidth: 1 })

    let assignY = y - 12
    for (const line of assignIntroLines) {
      page.drawText(line, { x: MARGIN + 12, y: assignY, size: 8.5, font: regular, color: DARK })
      assignY -= 11
    }
    assignY -= 4
    for (const wrapped of assignBulletWrapped) {
      for (const line of wrapped) {
        page.drawText(line, { x: MARGIN + 20, y: assignY, size: 8.5, font: regular, color: DARK })
        assignY -= 11
      }
    }
    y -= assignBoxH + 14

    // ══════════════════════════════════════════════════════════════════════
    // CONSTRUCTED RESPONSE — PAGE C: Model Response
    // ══════════════════════════════════════════════════════════════════════
    page = newPage()
    y = PAGE_H - MARGIN
    y = sectionBar(page, y, 'Model Response (Score 4)')
    y -= 4

    const modelParagraphs = [
      'Maya demonstrates a significant strength in her self-correction behavior. Her rate of self-correction (3 out of 8 miscues, approximately 38%) indicates that she is actively monitoring her reading for meaning and applying fix-up strategies when comprehension breaks down. This self-monitoring is a hallmark of a developing reader who understands that text should make sense.',
      'However, Maya\'s most significant instructional need is in vowel team decoding. The pattern of her miscues -- substituting short-vowel CVC words for vowel team words (e.g., \'met\' for \'meat\', \'rod\' for \'road\') -- reveals that she has not yet internalized the vowel team phonics pattern where two adjacent vowels typically represent a single long-vowel sound. This gap is preventing her from accurately decoding a high-frequency word pattern at the second-grade level.',
      'To address this need, I would implement explicit, systematic instruction in vowel team patterns using a word sort approach. I would begin with the most common vowel teams (ai, ea, oa) and have Maya sort words by vowel team pattern, read them aloud, and then practice reading decodable text that features these patterns in context. Word sorts build phonics knowledge through active categorization rather than rote memorization.',
      'This strategy is effective for Maya specifically because her self-correction behavior shows she is already attending to meaning -- she simply lacks the decoding knowledge for this particular pattern. By teaching the vowel team pattern explicitly, her existing self-monitoring skills will have the phonics foundation they need to operate successfully. As she internalizes these patterns, both her accuracy and her prosody should improve, since she will no longer need to pause and problem-solve at vowel team words.',
    ]

    for (const para of modelParagraphs) {
      const paraLines = wrapText(para, regular, 8.5, CONTENT_W - 4)
      const paraNeeded = paraLines.length * 11 + 8
      if (y - paraNeeded < MARGIN + 60) {
        page = newPage()
        y = PAGE_H - MARGIN
      }
      for (const line of paraLines) {
        page.drawText(line, { x: MARGIN, y, size: 8.5, font: regular, color: DARK })
        y -= 11
      }
      y -= 6
    }

    // ══════════════════════════════════════════════════════════════════════
    // FAQ PAGE
    // ══════════════════════════════════════════════════════════════════════
    page = newPage()
    y = PAGE_H - MARGIN
    y = sectionBar(page, y, 'Frequently Asked Questions')
    y -= 6

    const faqs: [string, string][] = [
      ['How many questions are on the exam?', '100 multiple-choice questions and 2 open-response written assignments. The MC questions cover three subareas: Foundations of Reading Development (35%), Development of Reading Comprehension (27%), and Reading Assessment and Instruction (18%). The two written assignments make up the remaining 20%.'],
      ['How long is the exam?', '4 hours of testing time. The total appointment is 4 hours 15 minutes at a testing center or 4 hours 30 minutes for online proctored testing. Online proctored tests include a 15-minute break between the MC and written sections.'],
      ['What is the passing score?', 'It depends on your state. Most states require 240. Alabama, Arkansas, and North Carolina require 233. Ohio requires 220. Ohio uses test code 190 through the OAE program. Massachusetts uses test code 190 through MTEL. All other states use test code 890.'],
      ['Is the 190 the same as the 890?', 'Yes. The test content, format, timing, and scoring are identical. The only difference is the test code and the registration portal. If you studied for the 190, you are prepared for the 890.'],
      ['Can I take it online?', 'Yes. Online proctoring is available with a webcam, microphone, and stable internet. There is a 15-minute break between the MC and written sections during online testing.'],
      ['How are the written assignments scored?', 'Each written assignment is scored on a 4-point scale across four dimensions: Purpose, Subject Matter Knowledge, Support (evidence), and Rationale. A score of 4 is "Thorough" and a score of 1 is "Weak."'],
      ['What should I study first?', 'Start with Subarea I (Foundations of Reading Development) -- it is 35% of the exam, the single largest section. Focus on phonemic awareness, phonics, and fluency. Then move to Subarea II (comprehension and vocabulary), then Subarea III (assessment). Practice at least 2-3 constructed responses before test day.'],
      ['How much does the exam cost?', 'The testing fee is $139. If you do not pass, you must wait 30 days before retaking, and there is no limit on the number of attempts.'],
    ]

    for (const [question, answer] of faqs) {
      const qLines = wrapText(`Q: ${question}`, bold, 9, CONTENT_W - 4)
      const aLines = wrapText(`A: ${answer}`, regular, 8.5, CONTENT_W - 4)
      const faqNeeded = qLines.length * 11 + aLines.length * 11 + 16

      if (y - faqNeeded < MARGIN + 60) {
        page = newPage()
        y = PAGE_H - MARGIN
      }

      for (const line of qLines) {
        page.drawText(line, { x: MARGIN, y, size: 9, font: bold, color: BURGUNDY })
        y -= 11
      }
      y -= 2
      for (const line of aLines) {
        page.drawText(line, { x: MARGIN, y, size: 8.5, font: regular, color: DARK })
        y -= 11
      }
      y -= 12
    }

    // ══════════════════════════════════════════════════════════════════════
    // RESOURCE LINKS PAGE
    // ══════════════════════════════════════════════════════════════════════
    page = newPage()
    y = PAGE_H - MARGIN
    y = sectionBar(page, y, 'Free Study Resources')
    y -= 4
    y = drawParagraph(page, y, 'We have published detailed guides on every aspect of the Foundations of Reading exam. Visit these pages for additional study material:')
    y -= 10

    const resources: [string, string][] = [
      ['Free Practice Test Questions', 'foundationsofreading.com/blog/foundations-of-reading-practice-test-free'],
      ['Complete Study Guide Overview', 'foundationsofreading.com/blog/foundations-of-reading-study-guide'],
      ['Passing Scores by State', 'foundationsofreading.com/blog/foundations-of-reading-passing-score'],
      ['Test Format Breakdown', 'foundationsofreading.com/blog/foundations-of-reading-test-format'],
      ['How to Register (Step by Step)', 'foundationsofreading.com/blog/foundations-of-reading-registration'],
      ['Complete Test Prep Plan', 'foundationsofreading.com/blog/foundations-of-reading-test-prep'],
    ]

    for (const [title, url] of resources) {
      const bulletLines = wrapText(`${title} -- ${url}`, regular, 8.5, CONTENT_W - 24)
      const needed = bulletLines.length * 11 + 8
      if (y - needed < MARGIN + 60) {
        page = newPage()
        y = PAGE_H - MARGIN
      }
      page.drawText('·', { x: MARGIN + 4, y, size: 10, font: bold, color: BURGUNDY })
      page.drawText(title, { x: MARGIN + 16, y, size: 9, font: bold, color: BURGUNDY })
      y -= 12
      for (const line of wrapText(url, regular, 8, CONTENT_W - 24)) {
        page.drawText(line, { x: MARGIN + 16, y, size: 8, font: regular, color: MID })
        y -= 10
      }
      y -= 8
    }

    // ══════════════════════════════════════════════════════════════════════
    // FINAL CTA PAGE
    // ══════════════════════════════════════════════════════════════════════
    page = newPage()

    // Big burgundy rectangle covering most of page
    const ctaTop = PAGE_H - 60
    const ctaBottom = 60
    const ctaH = ctaTop - ctaBottom
    page.drawRectangle({ x: MARGIN, y: ctaBottom, width: CONTENT_W, height: ctaH, color: BURGUNDY })

    // Thank you text
    const thankLine1 = 'Thank You for Downloading'
    const thankLine2 = 'the Starter Kit'
    const thankW1 = bold.widthOfTextAtSize(thankLine1, 20)
    const thankW2 = bold.widthOfTextAtSize(thankLine2, 20)
    page.drawText(thankLine1, { x: MARGIN + (CONTENT_W - thankW1) / 2, y: ctaTop - 60, size: 20, font: bold, color: WHITE })
    page.drawText(thankLine2, { x: MARGIN + (CONTENT_W - thankW2) / 2, y: ctaTop - 84, size: 20, font: bold, color: WHITE })

    const subLine = 'You now have everything you need to start preparing'
    const subLine2 = 'for the Foundations of Reading exam.'
    const subW1 = regular.widthOfTextAtSize(subLine, 10)
    const subW2 = regular.widthOfTextAtSize(subLine2, 10)
    page.drawText(subLine, { x: MARGIN + (CONTENT_W - subW1) / 2, y: ctaTop - 110, size: 10, font: regular, color: rgb(0.91, 0.71, 0.74) })
    page.drawText(subLine2, { x: MARGIN + (CONTENT_W - subW2) / 2, y: ctaTop - 124, size: 10, font: regular, color: rgb(0.91, 0.71, 0.74) })

    // White inner box
    const boxW = CONTENT_W - 60
    const boxH = 260
    const boxX = MARGIN + 30
    const boxY = ctaTop - 160 - boxH
    page.drawRectangle({ x: boxX, y: boxY, width: boxW, height: boxH, color: WHITE })

    const centerText = (text: string, yPos: number, size: number, fnt: typeof bold, color: typeof DARK) => {
      const w = fnt.widthOfTextAtSize(text, size)
      page.drawText(text, { x: boxX + (boxW - w) / 2, y: yPos, size, font: fnt, color })
    }

    centerText('Get 20% Off Full Prep Access', boxY + boxH - 36, 16, bold, BURGUNDY)
    centerText('Use code SAVE20 at checkout', boxY + boxH - 60, 12, bold, DARK)

    // Includes list
    const includeItems = [
      'Full study guide for all subareas',
      '4 full-length practice tests (100 questions each)',
      'AI-graded constructed response practice',
      'Vocabulary flashcards',
      'Progress tracking',
    ]
    let incY = boxY + boxH - 88
    for (const item of includeItems) {
      page.drawText('·', { x: boxX + 60, y: incY, size: 10, font: bold, color: BURGUNDY })
      page.drawText(item, { x: boxX + 74, y: incY, size: 9, font: regular, color: DARK })
      incY -= 18
    }

    // URL
    const ctaUrl = 'foundationsofreading.com'
    const ctaUrlW = bold.widthOfTextAtSize(ctaUrl, 13)
    page.drawText(ctaUrl, { x: boxX + (boxW - ctaUrlW) / 2, y: boxY + 24, size: 13, font: bold, color: BURGUNDY })

    // Discount code line below box
    const discountLine = 'Your discount code: SAVE20 -- Enter at checkout for 20% off any plan.'
    const discountW = regular.widthOfTextAtSize(discountLine, 10)
    page.drawText(discountLine, { x: MARGIN + (CONTENT_W - discountW) / 2, y: boxY - 24, size: 10, font: regular, color: rgb(0.91, 0.71, 0.74) })

    // ── Build and return ─────────────────────────────────────────────────
    const pdfBytes = await doc.save()
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Foundations-of-Reading-Starter-Kit.pdf"',
        'Cache-Control': 'no-store',
      },
    })
  } catch (err) {
    console.error('Starter Kit PDF error:', err)
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 })
  }
}
