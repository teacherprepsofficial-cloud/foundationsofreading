import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'
import connectDB from '@/lib/mongodb'
import ConstructedResponse from '@/models/ConstructedResponse'
import UserAccess from '@/models/UserAccess'
import UserCRAttempt from '@/models/UserCRAttempt'
import UserProgress from '@/models/UserProgress'
import { getCurrentUserFromRequest } from '@/lib/auth'
import type { CRScore, CRPerformanceLevel } from '@/models/UserCRAttempt'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter((w) => w.length > 0).length
}

function scoreToPerformance(score: CRScore): CRPerformanceLevel {
  if (score === 4) return 'Thorough'
  if (score === 3) return 'Adequate'
  if (score === 2) return 'Limited'
  return 'Weak'
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ crId: string }> }
) {
  try {
    const auth = getCurrentUserFromRequest(request)
    if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { crId } = await params
    const { responseText } = await request.json()

    if (!responseText?.trim()) {
      return NextResponse.json({ error: 'Response is required' }, { status: 400 })
    }

    await connectDB()

    const cr = await ConstructedResponse.findById(crId)
    if (!cr) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const access = await UserAccess.findOne({
      userId: auth.userId,
      examCode: cr.examCode,
      isActive: true,
      expiresAt: { $gt: new Date() },
    })
    if (!access) return NextResponse.json({ error: 'Access required' }, { status: 403 })
    if (cr.bundleOnly && access.tier === 'starter') {
      return NextResponse.json({ error: 'Bundle access required' }, { status: 403 })
    }

    const wordCount = countWords(responseText)

    // Auto-score 1 (Weak) if under 50 words
    if (wordCount < 50) {
      const attempt = await UserCRAttempt.create({
        userId: auth.userId,
        crId,
        examCode: cr.examCode,
        responseText,
        wordCount,
        score: 1 as CRScore,
        performanceLevel: 'Weak' as CRPerformanceLevel,
        feedback: `Your response is only ${wordCount} words. The exam requires thorough, developed responses of 150–300 words that address all four parts of the assignment with specific evidence and pedagogical reasoning.`,
        strengths: [],
        improvements: [
          'Write at least 150 words to fully develop your analysis',
          'Address all four parts: strength, need, strategy, and explanation of effectiveness',
          'Cite specific evidence from the exhibits to support every claim',
          'Name and describe the instructional strategy with implementation details',
        ],
      })

      await UserProgress.findOneAndUpdate(
        { userId: auth.userId, examCode: cr.examCode },
        { $addToSet: { crAttemptsCompleted: attempt._id } },
        { upsert: true }
      )

      return NextResponse.json({
        score: 1,
        performanceLevel: 'Weak',
        wordCount,
        feedback: attempt.feedback,
        strengths: [],
        improvements: attempt.improvements,
        attemptId: attempt._id,
      })
    }

    // Grade with Claude using the official NES 4-point rubric — strict checklist approach
    const systemPrompt = `You are a trained NES Foundations of Reading exam scorer. You score constructed-response items using the official 4-point rubric. You are rigorous and consistent — you do not inflate scores.

STEP 1 — CHECKLIST. Before scoring, evaluate each of the four required parts independently:

PART A — STRENGTH: Did the response identify one specific, significant strength WITH direct evidence from the exhibits (a quoted data point, a specific line from the teacher record, a specific test result)?
  FULL = specific strength named with correct terminology AND specific exhibit evidence cited
  PARTIAL = strength named but vague, generic, or evidence is missing/paraphrased loosely
  MISSING = not addressed

PART B — NEED: Did the response identify one specific, significant need WITH direct evidence from the exhibits?
  FULL = specific need named with correct terminology AND specific exhibit evidence cited
  PARTIAL = need named but vague, or evidence missing/loosely paraphrased
  MISSING = not addressed

PART C — STRATEGY: Did the response describe an appropriate instructional strategy or intervention with enough implementation detail to actually carry it out?
  FULL = strategy named AND described with specific steps, materials, or procedures a teacher could act on
  PARTIAL = strategy named but described only in general terms (e.g., "practice reading" or "use word sorts" with no how)
  MISSING = no strategy described

PART D — RATIONALE: Did the response explain WHY the strategy would be effective FOR THIS SPECIFIC STUDENT — connecting the strategy directly to the identified need and the student's demonstrated pattern?
  FULL = rationale is student-specific, connected to the exhibits, and explains the mechanism of why it works
  PARTIAL = rationale is generic (e.g., "this helps students learn") not tied to this student's specific profile
  MISSING = no rationale given

STEP 2 — SCORE DETERMINATION (strictly apply this decision logic):

Score 4 — THOROUGH: ALL FOUR parts are FULL. Every claim is grounded in specific exhibit evidence. Strategy has concrete implementation detail. Rationale is student-specific. Score 4 is genuinely rare — do not award it if any part is even slightly underdeveloped.

Score 3 — ADEQUATE: All four parts are addressed (none MISSING), but 1–2 parts are only PARTIAL. Generally accurate subject knowledge. Some evidence cited. Score 3 is the typical ceiling for a solid but not exceptional response.

Score 2 — LIMITED: One or more parts are MISSING, OR multiple parts are PARTIAL with weak evidence. Subject knowledge may be inaccurate or vague. Evidence is sparse.

Score 1 — WEAK: Two or more parts are MISSING, OR the response shows fundamental misunderstanding of the relevant content area. Little or no usable evidence. Strategy is inappropriate or absent.

CRITICAL RULES:
- If any of the four parts is MISSING → maximum score is 2
- If the strategy is only named but not described → Part C is PARTIAL, not FULL → cannot score 4
- If exhibit evidence is paraphrased loosely without citing a specific data point, line, score, or quote → evidence does not count as FULL
- If the rationale says only "this strategy is effective for students who need X" without connecting to THIS student's specific exhibited behaviors → Part D is PARTIAL
- Do NOT give the benefit of the doubt. If a part is ambiguous, score it PARTIAL, not FULL
- Most responses should score 2 or 3. Score 4 should feel genuinely earned

Respond ONLY with valid JSON in this exact format:
{
  "score": 1,
  "performanceLevel": "Weak",
  "feedback": "2-3 sentences identifying the most important gap and what a stronger response would include",
  "strengths": ["one specific thing the response did well, with detail"],
  "improvements": ["specific missing or underdeveloped element 1", "specific missing or underdeveloped element 2", "specific missing or underdeveloped element 3"]
}`

    const userPrompt = `ASSIGNMENT:
${cr.prompt}

${cr.scenarioContext ? `STUDENT SCENARIO AND EXHIBITS:\n${cr.scenarioContext}\n\n` : ''}CANDIDATE RESPONSE (${wordCount} words):
${responseText}

Apply the 4-part checklist to this response. For each part (A–D) determine: FULL, PARTIAL, or MISSING. Then apply the score decision logic strictly. Do not award credit for parts that are vague, generic, or unsupported by specific exhibit evidence. Return only the JSON.`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: userPrompt }],
      system: systemPrompt,
    })

    const content = message.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response type')

    let parsed
    try {
      const jsonMatch = content.text.match(/\{[\s\S]*\}/)
      if (!jsonMatch) throw new Error('No JSON found')
      parsed = JSON.parse(jsonMatch[0])
    } catch {
      throw new Error('Failed to parse grading response')
    }

    const score = Math.max(1, Math.min(4, parsed.score)) as CRScore
    const performanceLevel = scoreToPerformance(score)

    const attempt = await UserCRAttempt.create({
      userId: auth.userId,
      crId,
      examCode: cr.examCode,
      responseText,
      wordCount,
      score,
      performanceLevel,
      feedback: parsed.feedback,
      strengths: parsed.strengths || [],
      improvements: parsed.improvements || [],
    })

    await UserProgress.findOneAndUpdate(
      { userId: auth.userId, examCode: cr.examCode },
      { $addToSet: { crAttemptsCompleted: attempt._id } },
      { upsert: true }
    )

    return NextResponse.json({
      score,
      performanceLevel,
      wordCount,
      feedback: parsed.feedback,
      strengths: parsed.strengths || [],
      improvements: parsed.improvements || [],
      attemptId: attempt._id,
    })
  } catch (err) {
    console.error('CR grading error:', err)
    return NextResponse.json({ error: 'Failed to grade response' }, { status: 500 })
  }
}
