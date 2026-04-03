import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import { Resend } from 'resend'
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
const resend = new Resend(process.env.RESEND_API_KEY!)

// ── Scoring helpers ─────────────────────────────────────────────────────────

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter((w) => w.length > 0).length
}

function scoreToPerformance(score: number): string {
  if (score === 4) return 'Thorough'
  if (score === 3) return 'Adequate'
  if (score === 2) return 'Limited'
  return 'Weak'
}

function calcScaledScore(mcCorrect: number, crScore: number, totalQ: number): number {
  const mcPct = mcCorrect / totalQ
  const crPct = (crScore - 1) / 3
  const combined = mcPct * 0.8 + crPct * 0.2
  return Math.max(100, Math.min(300, Math.round(100 + combined * 200)))
}

function getLevel(pct: number): string {
  if (pct >= 75) return 'Most objectives'
  if (pct >= 50) return 'Many objectives'
  if (pct >= 25) return 'Some objectives'
  return 'Few objectives'
}

// ── Question bank (same as page.tsx — needed server-side for scoring) ────────

const SUBAREAS = [
  { id: 1, name: 'Phonological and Phonemic Awareness', abbr: 'Subarea I', qIds: [1,2,3,4,5] },
  { id: 2, name: 'Phonics, Spelling, and Word Study Skills', abbr: 'Subarea II', qIds: [6,7,8,9,10] },
  { id: 3, name: 'Fluency', abbr: 'Subarea III', qIds: [11,12,13] },
  { id: 4, name: 'Vocabulary, Reading Comprehension, and Reading-Writing Connections', abbr: 'Subarea IV', qIds: [14,15,16,17,18,19,20,21,22,23,24,25] },
]

const CORRECT_ANSWERS: Record<number, number> = {
  1:1, 2:2, 3:1, 4:2, 5:1,
  6:1, 7:2, 8:1, 9:1, 10:1,
  11:3, 12:1, 13:2,
  14:2, 15:1, 16:1, 17:2, 18:2, 19:1, 20:1, 21:2, 22:1, 23:3, 24:2, 25:2,
}

const TOTAL_Q = 25

// ── CR Grading ───────────────────────────────────────────────────────────────

async function gradeCR(crPrompt: string, crResponse: string) {
  const wordCount = countWords(crResponse)

  if (wordCount < 50) {
    return {
      score: 1 as const,
      performanceLevel: 'Weak',
      feedback: `Response is too brief (${wordCount} words). A thorough response requires at least 150 words addressing all four parts.`,
      strengths: [],
      improvements: ['Write at least 150 words', 'Address all four parts of the assignment', 'Support claims with evidence from the scenario'],
    }
  }

  const systemPrompt = `You are a trained NES Foundations of Reading exam scorer. Score using only the official 1–4 rubric.

Score 4 — THOROUGH: Purpose fully achieved. Substantial, accurate knowledge applied. Sound evidence with high-quality examples. Ably reasoned, comprehensive understanding.
Score 3 — ADEQUATE: Purpose largely achieved. Generally accurate knowledge. Adequate evidence. Adequately reasoned understanding.
Score 2 — LIMITED: Purpose partially achieved. Limited, possibly inaccurate knowledge. Limited evidence. Poorly reasoned understanding.
Score 1 — WEAK: Purpose not achieved. Little/no accurate knowledge. Weak/absent evidence. Little/no reasoning.

Rate PURPOSE, SUBJECT KNOWLEDGE, SUPPORT, RATIONALE each 1–4. Overall score = lowest of the four.

Return ONLY valid JSON: {"score":1,"feedback":"2-3 sentences","strengths":["..."],"improvements":["...","..."]}`

  const message = await client.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 1024,
    messages: [{ role: 'user', content: `ASSIGNMENT:\n${crPrompt}\n\nRESPONSE (${wordCount} words):\n${crResponse}\n\nReturn only JSON.` }],
    system: systemPrompt,
  })

  const content = message.content[0]
  if (content.type !== 'text') throw new Error('Unexpected response')
  const jsonMatch = content.text.match(/\{[\s\S]*\}/)
  if (!jsonMatch) throw new Error('No JSON')
  const parsed = JSON.parse(jsonMatch[0])
  const score = Math.max(1, Math.min(4, parseInt(String(parsed.score), 10)))

  return {
    score,
    performanceLevel: scoreToPerformance(score),
    feedback: parsed.feedback || '',
    strengths: parsed.strengths || [],
    improvements: parsed.improvements || [],
  }
}

// ── PDF Generation ────────────────────────────────────────────────────────────

const BURGUNDY = '#7c1c2e'
const DARK = '#1a1a1a'
const MID = '#5a5a5a'
const LIGHT_BG = '#faf8f5'
const BORDER = '#e8e0e2'

const styles = StyleSheet.create({
  page: { fontFamily: 'Helvetica', backgroundColor: '#ffffff', paddingBottom: 60 },
  header: { backgroundColor: BURGUNDY, paddingHorizontal: 40, paddingTop: 28, paddingBottom: 22 },
  headerLabel: { fontSize: 8, color: '#e8b4bc', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 },
  headerTitle: { fontSize: 18, color: '#ffffff', fontFamily: 'Helvetica-Bold', marginBottom: 2 },
  headerSub: { fontSize: 9, color: '#e8b4bc' },
  body: { paddingHorizontal: 40, paddingTop: 24 },
  section: { marginBottom: 20 },
  sectionLabel: { fontSize: 7, color: BURGUNDY, letterSpacing: 1.5, textTransform: 'uppercase', fontFamily: 'Helvetica-Bold', marginBottom: 8, borderBottomWidth: 1, borderBottomColor: BORDER, paddingBottom: 4 },
  scoreRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  scoreNumber: { fontSize: 52, fontFamily: 'Helvetica-Bold', color: BURGUNDY, marginRight: 16 },
  scoreBadge: { paddingHorizontal: 12, paddingVertical: 5, borderRadius: 4, fontSize: 10, fontFamily: 'Helvetica-Bold', color: '#ffffff' },
  scoreMeta: { fontSize: 9, color: MID, marginTop: 4 },
  candidateRow: { flexDirection: 'row', gap: 32, marginBottom: 20 },
  candidateBox: { flex: 1, backgroundColor: LIGHT_BG, borderRadius: 6, padding: 12 },
  candidateLabel: { fontSize: 7, color: '#9b9b9b', letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 3 },
  candidateValue: { fontSize: 11, color: DARK, fontFamily: 'Helvetica-Bold' },
  subareaRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 8, borderBottomWidth: 1, borderBottomColor: BORDER },
  subareaName: { flex: 1, fontSize: 9, color: DARK },
  subareaScore: { width: 50, fontSize: 9, color: MID, textAlign: 'center' },
  subareaLevel: { width: 100, fontSize: 9, textAlign: 'right' },
  subareaHeader: { flexDirection: 'row', alignItems: 'center', paddingBottom: 6, marginBottom: 2, borderBottomWidth: 1.5, borderBottomColor: DARK },
  subareaHeaderText: { fontSize: 7, fontFamily: 'Helvetica-Bold', color: MID, textTransform: 'uppercase', letterSpacing: 0.8 },
  crBox: { backgroundColor: LIGHT_BG, borderRadius: 6, padding: 14, marginTop: 4 },
  crScoreRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  crScore: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: BURGUNDY, marginRight: 10 },
  crLevel: { fontSize: 11, color: MID },
  crFeedback: { fontSize: 9.5, color: DARK, lineHeight: 1.6, marginBottom: 10 },
  listLabel: { fontSize: 7, fontFamily: 'Helvetica-Bold', color: MID, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 5 },
  listItem: { flexDirection: 'row', marginBottom: 3 },
  bullet: { fontSize: 9, color: MID, marginRight: 5, marginTop: 0.5 },
  listText: { fontSize: 9, color: DARK, lineHeight: 1.5, flex: 1 },
  ctaBox: { backgroundColor: BURGUNDY, borderRadius: 8, padding: 18, marginTop: 8 },
  ctaTitle: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: '#ffffff', marginBottom: 4 },
  ctaText: { fontSize: 9, color: '#e8b4bc', lineHeight: 1.5, marginBottom: 10 },
  ctaCode: { backgroundColor: '#5a1220', borderRadius: 4, paddingHorizontal: 12, paddingVertical: 6, alignSelf: 'flex-start' },
  ctaCodeText: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: '#ffffff', letterSpacing: 2 },
  ctaUrl: { fontSize: 8, color: '#e8b4bc', marginTop: 8 },
  footer: { position: 'absolute', bottom: 20, left: 40, right: 40, flexDirection: 'row', justifyContent: 'space-between' },
  footerText: { fontSize: 7.5, color: '#9b9b9b' },
})

interface SubareaResult { abbr: string; name: string; correct: number; total: number; pct: number; level: string }
interface CRResult { score: number; performanceLevel: string; feedback: string; strengths: string[]; improvements: string[] }

function ResultsPDF({
  firstName,
  scaledScore,
  passed,
  subareas,
  crResult,
  date,
}: {
  firstName: string
  scaledScore: number
  passed: boolean
  subareas: SubareaResult[]
  crResult: CRResult
  date: string
}) {
  return (
    <Document title="FoRT Diagnostic Test Results" author="FoundationsOfReading.com">
      <Page size="LETTER" style={styles.page}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerLabel}>Foundations of Reading Test · Diagnostic Results</Text>
          <Text style={styles.headerTitle}>Score Report</Text>
          <Text style={styles.headerSub}>NES 190 &amp; 890 · Practice Diagnostic</Text>
        </View>

        <View style={styles.body}>

          {/* Candidate info */}
          <View style={styles.candidateRow}>
            <View style={styles.candidateBox}>
              <Text style={styles.candidateLabel}>Candidate</Text>
              <Text style={styles.candidateValue}>{firstName}</Text>
            </View>
            <View style={styles.candidateBox}>
              <Text style={styles.candidateLabel}>Test Date</Text>
              <Text style={styles.candidateValue}>{date}</Text>
            </View>
            <View style={styles.candidateBox}>
              <Text style={styles.candidateLabel}>Test</Text>
              <Text style={styles.candidateValue}>Diagnostic Practice Test</Text>
            </View>
          </View>

          {/* Score */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Overall Score</Text>
            <View style={styles.scoreRow}>
              <Text style={styles.scoreNumber}>{scaledScore}</Text>
              <View>
                <View style={[styles.scoreBadge, { backgroundColor: passed ? '#16a34a' : BURGUNDY }]}>
                  <Text>{passed ? 'PASSED' : 'NOT YET'}</Text>
                </View>
                <Text style={styles.scoreMeta}>Score range: 100–300  ·  Passing score: 220</Text>
              </View>
            </View>
          </View>

          {/* Subarea table */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Performance by Objective Area</Text>
            <View style={styles.subareaHeader}>
              <Text style={[styles.subareaHeaderText, { flex: 1 }]}>Objective Area</Text>
              <Text style={[styles.subareaHeaderText, { width: 50, textAlign: 'center' }]}>Correct</Text>
              <Text style={[styles.subareaHeaderText, { width: 100, textAlign: 'right' }]}>Performance</Text>
            </View>
            {subareas.map((sa) => (
              <View key={sa.abbr} style={styles.subareaRow}>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 7.5, color: '#9b9b9b', marginBottom: 1 }}>{sa.abbr}</Text>
                  <Text style={styles.subareaName}>{sa.name}</Text>
                </View>
                <Text style={styles.subareaScore}>{sa.correct}/{sa.total}</Text>
                <Text style={[styles.subareaLevel, {
                  color: sa.pct >= 75 ? '#16a34a' : sa.pct >= 50 ? '#2563eb' : sa.pct >= 25 ? '#d97706' : '#dc2626'
                }]}>{sa.level}</Text>
              </View>
            ))}
          </View>

          {/* Written Response */}
          <View style={styles.section}>
            <Text style={styles.sectionLabel}>Written Response</Text>
            <View style={styles.crBox}>
              <View style={styles.crScoreRow}>
                <Text style={styles.crScore}>{crResult.score}/4</Text>
                <Text style={styles.crLevel}>{crResult.performanceLevel}</Text>
              </View>
              <Text style={styles.crFeedback}>{crResult.feedback}</Text>
              {crResult.strengths.length > 0 && (
                <View style={{ marginBottom: 8 }}>
                  <Text style={styles.listLabel}>Strengths</Text>
                  {crResult.strengths.map((s, i) => (
                    <View key={i} style={styles.listItem}>
                      <Text style={styles.bullet}>✓</Text>
                      <Text style={styles.listText}>{s}</Text>
                    </View>
                  ))}
                </View>
              )}
              {crResult.improvements.length > 0 && (
                <View>
                  <Text style={styles.listLabel}>Areas to Strengthen</Text>
                  {crResult.improvements.map((s, i) => (
                    <View key={i} style={styles.listItem}>
                      <Text style={styles.bullet}>→</Text>
                      <Text style={styles.listText}>{s}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>

          {/* CTA */}
          <View style={styles.ctaBox}>
            <Text style={styles.ctaTitle}>Ready to prep? Use code below for 15% off.</Text>
            <Text style={styles.ctaText}>
              Get the full FoRT prep — diagnostic, study guide, practice tests, AI-graded written responses, and flashcards. Everything in one place.
            </Text>
            <View style={styles.ctaCode}>
              <Text style={styles.ctaCodeText}>FORT15</Text>
            </View>
            <Text style={styles.ctaUrl}>foundationsofreading.com</Text>
          </View>

        </View>

        {/* Footer */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>FoundationsOfReading.com · Diagnostic Practice Test</Text>
          <Text style={styles.footerText}>This is a practice diagnostic, not an official score.</Text>
        </View>

      </Page>
    </Document>
  )
}

// ── API Route ─────────────────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const { firstName, email, answers, crResponse, crPrompt } = await request.json()

    if (!firstName?.trim() || !email?.trim()) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
    }
    if (!crResponse?.trim()) {
      return NextResponse.json({ error: 'Written response is required.' }, { status: 400 })
    }

    // Grade CR
    const crResult = await gradeCR(crPrompt, crResponse)

    // Calculate scores
    const answersMap = answers as Record<string, number>
    let mcCorrect = 0
    for (const [qId, chosen] of Object.entries(answersMap)) {
      if (CORRECT_ANSWERS[Number(qId)] === chosen) mcCorrect++
    }
    const scaledScore = calcScaledScore(mcCorrect, crResult.score, TOTAL_Q)
    const passed = scaledScore >= 220

    // Subarea breakdown
    const subareaResults: SubareaResult[] = SUBAREAS.map((sa) => {
      const correct = sa.qIds.filter((id) => CORRECT_ANSWERS[id] === answersMap[String(id)]).length
      const pct = Math.round((correct / sa.qIds.length) * 100)
      return { abbr: sa.abbr, name: sa.name, correct, total: sa.qIds.length, pct, level: getLevel(pct) }
    })

    // Date
    const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

    // Generate PDF
    const pdfDoc = (
      <ResultsPDF
        firstName={firstName.trim()}
        scaledScore={scaledScore}
        passed={passed}
        subareas={subareaResults}
        crResult={crResult}
        date={date}
      />
    )
    const rawPdf = await pdf(pdfDoc).toBuffer()
    const pdfBuffer = Buffer.from(await new Response(rawPdf as unknown as BodyInit).arrayBuffer())

    // Send email
    const discountExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit',
    })

    const { error: resendError } = await resend.emails.send({
      from: 'Foundations of Reading <support@foundationsofreading.com>',
      to: email.trim(),
      subject: `${firstName.trim()}, your FoRT Diagnostic Results are ready`,
      attachments: [{ filename: 'FoRT-Diagnostic-Results.pdf', content: pdfBuffer }],
      html: `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#faf8f5;font-family:Georgia,serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;padding:40px 0;">
    <tr><td align="center">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e8e0e2;">

        <!-- Header -->
        <tr><td style="background:#7c1c2e;padding:28px 40px;">
          <p style="margin:0 0 4px;font-size:11px;color:#e8b4bc;letter-spacing:1.5px;text-transform:uppercase;font-family:system-ui,sans-serif;">Foundations of Reading Test</p>
          <h1 style="margin:0;font-size:22px;color:#ffffff;font-family:Georgia,serif;">Your Diagnostic Results</h1>
        </td></tr>

        <!-- Score -->
        <tr><td style="padding:32px 40px 24px;">
          <p style="margin:0 0 6px;font-size:11px;color:#9b9b9b;letter-spacing:1.2px;text-transform:uppercase;font-family:system-ui,sans-serif;">Hi ${firstName.trim()},</p>
          <p style="margin:0 0 20px;font-size:15px;color:#3a3a3a;line-height:1.6;font-family:system-ui,sans-serif;">Your FoRT Diagnostic Practice Test has been scored. Your full results PDF is attached to this email.</p>

          <table width="100%" cellpadding="0" cellspacing="0" style="background:#faf8f5;border-radius:10px;padding:24px;margin-bottom:24px;">
            <tr>
              <td style="text-align:center;">
                <p style="margin:0 0 4px;font-size:54px;font-weight:bold;color:#7c1c2e;font-family:Georgia,serif;line-height:1;">${scaledScore}</p>
                <p style="margin:0 0 10px;font-size:12px;color:#6b6b6b;font-family:system-ui,sans-serif;">Score range: 100–300 · Passing: 220</p>
                <span style="display:inline-block;background:${passed ? '#16a34a' : '#7c1c2e'};color:#fff;font-weight:bold;font-size:12px;padding:6px 16px;border-radius:4px;font-family:system-ui,sans-serif;">${passed ? 'PASSED' : 'NOT YET — KEEP STUDYING'}</span>
              </td>
            </tr>
          </table>

          <p style="margin:0 0 6px;font-size:11px;color:#9b9b9b;letter-spacing:1.2px;text-transform:uppercase;font-family:system-ui,sans-serif;">Written Response</p>
          <p style="margin:0 0 20px;font-size:15px;color:#1a1a1a;font-weight:bold;font-family:system-ui,sans-serif;">${crResult.score}/4 — ${crResult.performanceLevel}</p>

          <p style="margin:0 0 20px;font-size:14px;color:#3a3a3a;line-height:1.6;font-family:system-ui,sans-serif;">Open the attached PDF for your full subarea breakdown, written response feedback, and a review of every question.</p>
        </td></tr>

        <!-- Discount CTA -->
        <tr><td style="background:#7c1c2e;padding:28px 40px;">
          <p style="margin:0 0 6px;font-size:13px;font-weight:bold;color:#ffffff;font-family:system-ui,sans-serif;">Ready to prep? You have 24 hours to claim 15% off.</p>
          <p style="margin:0 0 16px;font-size:12px;color:#e8b4bc;line-height:1.5;font-family:system-ui,sans-serif;">Full study guide, practice tests, AI-graded written responses, and flashcards. Everything you need to pass.</p>
          <p style="margin:0 0 6px;font-size:10px;color:#e8b4bc;letter-spacing:1.5px;font-family:system-ui,sans-serif;">USE CODE AT CHECKOUT</p>
          <p style="margin:0 0 16px;font-size:24px;font-weight:bold;color:#ffffff;letter-spacing:3px;font-family:system-ui,sans-serif;background:#5a1220;display:inline-block;padding:8px 20px;border-radius:6px;">FORT15</p>
          <br>
          <a href="https://foundationsofreading.com/#pricing" style="display:inline-block;background:#ffffff;color:#7c1c2e;font-weight:bold;font-size:13px;padding:12px 28px;border-radius:6px;text-decoration:none;font-family:system-ui,sans-serif;">Get the full FoRT prep →</a>
          <p style="margin:12px 0 0;font-size:10px;color:#e8b4bc;font-family:system-ui,sans-serif;">Offer expires ${discountExpiry}</p>
        </td></tr>

        <!-- Footer -->
        <tr><td style="padding:20px 40px;text-align:center;">
          <p style="margin:0;font-size:11px;color:#9b9b9b;font-family:system-ui,sans-serif;">FoundationsOfReading.com · This is a practice diagnostic, not a scored exam result.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`,
    })

    if (resendError) {
      console.error('Resend error:', resendError)
      return NextResponse.json({ error: 'Failed to send email. Please try again.' }, { status: 500 })
    }

    return NextResponse.json({ success: true, scaledScore, passed, mcCorrect })
  } catch (err) {
    console.error('Diagnostic results error:', err)
    return NextResponse.json({ error: 'Failed to send results. Please try again.' }, { status: 500 })
  }
}
