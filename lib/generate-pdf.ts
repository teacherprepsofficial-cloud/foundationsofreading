import { PDFDocument, rgb, StandardFonts } from 'pdf-lib'

const BURGUNDY = rgb(0.486, 0.110, 0.180) // #7c1c2e
const DARK = rgb(0.102, 0.102, 0.102)      // #1a1a1a
const MID = rgb(0.420, 0.420, 0.420)       // #6b6b6b
const CREAM = rgb(0.980, 0.973, 0.961)     // #faf8f5
const WHITE = rgb(1, 1, 1)

const PAGE_W = 612  // US Letter
const PAGE_H = 792
const MARGIN = 48
const CONTENT_W = PAGE_W - MARGIN * 2

function wrapText(text: string, font: Awaited<ReturnType<PDFDocument['embedFont']>>, size: number, maxWidth: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''

  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    const w = font.widthOfTextAtSize(test, size)
    if (w > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }
  if (current) lines.push(current)
  return lines
}

export async function generateNes190GuidePdf(): Promise<Uint8Array> {
  const doc = await PDFDocument.create()
  const bold = await doc.embedFont(StandardFonts.HelveticaBold)
  const regular = await doc.embedFont(StandardFonts.Helvetica)

  let page = doc.addPage([PAGE_W, PAGE_H])
  let y = PAGE_H

  // ── Header bar ─────────────────────────────────────────────────────────────
  page.drawRectangle({ x: 0, y: PAGE_H - 80, width: PAGE_W, height: 80, color: BURGUNDY })
  page.drawText('FOUNDATIONS OF READING', {
    x: MARGIN, y: PAGE_H - 34, size: 9, font: bold, color: rgb(0.91, 0.706, 0.737),
  })
  page.drawText('NES 190 · Quick Reference Guide', {
    x: MARGIN, y: PAGE_H - 56, size: 18, font: bold, color: WHITE,
  })
  page.drawText('foundationsofreading.com', {
    x: PAGE_W - MARGIN - regular.widthOfTextAtSize('foundationsofreading.com', 9),
    y: PAGE_H - 56, size: 9, font: regular, color: rgb(0.91, 0.706, 0.737),
  })

  y = PAGE_H - 100

  // ── Helper: draw a section ──────────────────────────────────────────────────
  function drawSection(title: string, lines: { label?: string; text: string }[]) {
    // Section title bar
    if (y < 120) { page = doc.addPage([PAGE_W, PAGE_H]); y = PAGE_H - MARGIN }
    page.drawRectangle({ x: MARGIN, y: y - 20, width: CONTENT_W, height: 22, color: BURGUNDY })
    page.drawText(title.toUpperCase(), { x: MARGIN + 8, y: y - 14, size: 9, font: bold, color: WHITE })
    y -= 28

    for (const line of lines) {
      const labelText = line.label ? `${line.label}  ` : ''
      const labelW = line.label ? bold.widthOfTextAtSize(labelText, 10) : 0
      const bodyW = CONTENT_W - labelW

      const wrapped = wrapText(line.text, regular, 10, bodyW)

      for (let i = 0; i < wrapped.length; i++) {
        if (y < 60) { page = doc.addPage([PAGE_W, PAGE_H]); y = PAGE_H - MARGIN }
        if (i === 0 && line.label) {
          page.drawText(labelText, { x: MARGIN, y, size: 10, font: bold, color: BURGUNDY })
          page.drawText(wrapped[i], { x: MARGIN + labelW, y, size: 10, font: regular, color: DARK })
        } else {
          page.drawText(wrapped[i], { x: MARGIN + labelW, y, size: 10, font: regular, color: DARK })
        }
        y -= 15
      }
      y -= 4 // gap between items
    }
    y -= 10
  }

  // ── Test at a Glance ────────────────────────────────────────────────────────
  drawSection('Test at a Glance', [
    { label: 'Test Code:', text: '190 (NES Foundations of Reading)' },
    { label: 'Format:', text: '100 multiple-choice questions + 2 open-response written assignments' },
    { label: 'Total Time:', text: '4 hours (4 hrs 15 min total appointment at testing center; 4 hrs 30 min for online proctoring)' },
    { label: 'Registration Fee:', text: '$139' },
    { label: 'Passing Score:', text: '220 (Ohio); most other states require 240 — confirm with your state' },
    { label: 'Score Scale:', text: '100–300' },
    { label: 'Retake Policy:', text: 'Minimum 30-day wait between attempts; no limit on number of attempts' },
  ])

  // ── Four Subareas ───────────────────────────────────────────────────────────
  drawSection('The Four Subareas — Exam Weight Breakdown', [
    { label: 'Subarea I (35%):', text: 'Foundations of Reading Development — approx. 43–45 multiple-choice items. Covers phonological and phonemic awareness, the alphabetic principle, phonics instruction, high-frequency word recognition, spelling patterns, word analysis and decoding strategies, and reading fluency development.' },
    { label: 'Subarea II (27%):', text: 'Development of Reading Comprehension — approx. 33–35 multiple-choice items. Covers academic language development, vocabulary instruction strategies (including Tier 1/2/3 framework), literary text comprehension, and informational text analysis.' },
    { label: 'Subarea III (18%):', text: 'Reading Assessment and Instruction — approx. 21–23 multiple-choice items. Covers assessment types (screening, diagnostic, progress monitoring, formative, summative), data-informed instruction, best instructional practices, and support for diverse learners including ELL students and students with disabilities.' },
    { label: 'Subarea IV (20%):', text: 'Integration of Knowledge and Understanding — 2 open-response written assignments. You will analyze student reading performance data and apply knowledge of either foundational skills or reading comprehension. Each response demonstrates how you connect assessment evidence to instructional decisions.' },
  ])

  // ── Key Concepts by Subarea ─────────────────────────────────────────────────
  drawSection('Key Concepts to Know — Subarea I (Foundations)', [
    { label: 'Phonological Awareness:', text: 'The broad ability to hear and manipulate sound structures in spoken language — words, syllables, onset-rime, and phonemes.' },
    { label: 'Phonemic Awareness:', text: 'The specific ability to hear and manipulate individual phonemes (the smallest units of sound). Key tasks: isolation, identification, blending, segmentation, manipulation.' },
    { label: 'Phonics:', text: 'The relationship between letters and sounds. Instruction should be systematic (taught in a logical sequence) and explicit (directly taught, not discovered). Covers CVC patterns, digraphs, blends, vowel teams, CVCe, and multi-syllabic words.' },
    { label: 'Fluency:', text: 'Accurate, automatic reading at an appropriate rate with proper expression (prosody). Best developed through repeated reading, modeled reading, and wide reading practice.' },
    { label: 'Word Analysis:', text: 'Using morphemes (prefixes, suffixes, roots) and syllable types to decode unfamiliar words. The six syllable types: closed, open, vowel team, vowel-consonant-e, r-controlled, consonant-le.' },
  ])

  drawSection('Key Concepts to Know — Subarea II (Comprehension)', [
    { label: 'Three-Tier Vocabulary:', text: 'Tier 1 = everyday words (cat, run). Tier 2 = high-utility academic words (analyze, significant) — highest priority for instruction. Tier 3 = domain-specific words (photosynthesis).' },
    { label: 'Literary Text:', text: 'Narrative elements (character, setting, plot, theme, point of view), literary devices (foreshadowing, symbolism, metaphor), and inferencing from text evidence.' },
    { label: 'Informational Text:', text: 'Text structures (cause-effect, compare-contrast, problem-solution, sequence, description), text features (headings, captions, diagrams), and summarization strategies.' },
    { label: 'Simple View of Reading:', text: 'Reading Comprehension = Decoding × Language Comprehension. Both components must be strong for skilled reading. Weak decoding or weak language comprehension both limit comprehension.' },
  ])

  drawSection('Key Concepts to Know — Subarea III (Assessment)', [
    { label: 'Screening:', text: 'Brief, universal assessments given to all students to identify those at risk. Administered at the start of the year (e.g., DIBELS, AIMSweb).' },
    { label: 'Diagnostic:', text: 'In-depth assessments to identify specific strengths and needs. Given after screening flags a concern (e.g., phonics inventories, running records).' },
    { label: 'Progress Monitoring:', text: 'Frequent, brief assessments to track student response to instruction over time. Used to adjust teaching based on data.' },
    { label: 'Running Records:', text: 'A method of recording oral reading accuracy. Errors (miscues) are coded by type: substitution, omission, insertion, self-correction. Used for both accuracy and comprehension follow-up.' },
    { label: 'MTSS/RTI:', text: 'Multi-Tiered System of Supports. Tier 1 = high-quality core instruction for all. Tier 2 = small group intervention. Tier 3 = intensive individualized support.' },
  ])

  // ── Constructed Response Guide ──────────────────────────────────────────────
  drawSection('Open-Response Strategy — Subarea IV', [
    { text: 'Each written assignment is scored on a 4-point scale across: Purpose, Subject Matter Knowledge, Support, and Rationale.' },
    { label: 'Step 1:', text: 'Identify one significant STRENGTH in the student\'s reading performance. Cite specific evidence from the provided materials (error patterns, accuracy rate, specific words, score data).' },
    { label: 'Step 2:', text: 'Identify one significant NEED. Again, cite specific evidence — never make general claims without pointing to what you observed.' },
    { label: 'Step 3:', text: 'Recommend one specific, named instructional strategy that directly addresses the identified need.' },
    { label: 'Step 4:', text: 'Explain WHY this strategy will be effective for this particular student, connecting your reasoning to the evidence you cited.' },
    { text: 'Use professional terminology throughout: phonemic awareness, miscue analysis, prosody, morphemic analysis, scaffolding, gradual release of responsibility.' },
  ])

  // ── Quick Tips ──────────────────────────────────────────────────────────────
  drawSection('Test Day Quick Tips', [
    { text: 'The exam consistently favors explicit, systematic, evidence-based instructional approaches. When in doubt, choose the most direct and structured option.' },
    { text: 'Budget roughly 90 seconds per multiple-choice question. Flag uncertain items and return after completing the rest — never leave a question blank.' },
    { text: 'Reserve at least 45–50 minutes per written assignment. Spend the first 5 minutes planning your response before writing.' },
    { text: 'Answer choices with "always," "never," or "only" are usually wrong. The best answers tend to be specific, research-grounded, and student-centered.' },
    { text: 'Online proctoring includes an optional 15-minute break between the multiple-choice and written sections — use it.' },
  ])

  // ── Footer on last page ─────────────────────────────────────────────────────
  if (y < 80) { page = doc.addPage([PAGE_W, PAGE_H]); y = PAGE_H - MARGIN }
  page.drawLine({ start: { x: MARGIN, y: 40 }, end: { x: PAGE_W - MARGIN, y: 40 }, thickness: 0.5, color: rgb(0.8, 0.8, 0.8) })
  page.drawText('© Foundations of Reading Test Prep · foundationsofreading.com · For personal study use only', {
    x: MARGIN, y: 26, size: 7, font: regular, color: MID,
  })

  const pdfBytes = await doc.save()
  return pdfBytes
}
