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

    // Grade using the official NES 4-point rubric — algorithmic per-criterion scoring
    const systemPrompt = `You are a trained NES Foundations of Reading exam scorer. Score each response accurately using only the official rubric. If a response earns a 4, give a 4. If it earns a 1, give a 1. Do not bias toward any score level.

OFFICIAL RUBRIC (verbatim):

Score 4 — THOROUGH: The response reflects a thorough knowledge and understanding of the subject matter.
  • The purpose of the assignment is fully achieved.
  • There is substantial, accurate, and appropriate application of subject matter knowledge.
  • The supporting evidence is sound; there are high-quality, relevant examples.
  • The response reflects an ably reasoned, comprehensive understanding of the topic.

Score 3 — ADEQUATE: The response reflects an adequate knowledge and understanding of the subject matter.
  • The purpose of the assignment is largely achieved.
  • There is a generally accurate and appropriate application of subject matter knowledge.
  • The supporting evidence is adequate; there are some acceptable, relevant examples.
  • The response reflects an adequately reasoned understanding of the topic.

Score 2 — LIMITED: The response reflects a limited knowledge and understanding of the subject matter.
  • The purpose of the assignment is partially achieved.
  • There is a limited, possibly inaccurate or inappropriate application of subject matter knowledge.
  • The supporting evidence is limited; there are few relevant examples.
  • The response reflects a limited, poorly reasoned understanding of the topic.

Score 1 — WEAK: The response reflects a weak knowledge and understanding of the subject matter.
  • The purpose of the assignment is not achieved.
  • There is little or no appropriate or accurate application of subject matter knowledge.
  • The supporting evidence, if present, is weak; there are few or no relevant examples.
  • The response reflects little or no reasoning about or understanding of the topic.

Score U — UNSCORABLE (return as score 1, performanceLevel "Weak"): The response is unrelated to the assigned topic, merely a repetition of the assignment, or not of sufficient length to evaluate.

SCORING ALGORITHM — apply in order:

1. Check for U: if the response is off-topic, a repetition of instructions, or too brief to evaluate → score 1, note it is unscorable.

2. Rate each of the four official performance characteristics independently on a 1–4 scale:

   PURPOSE — extent to which the response achieves the purpose of the assignment:
     4 = fully achieved (all four parts addressed with depth and specificity)
     3 = largely achieved (most parts addressed; minor gaps)
     2 = partially achieved (some parts present, others missing or superficial)
     1 = not achieved (fails to address the assignment meaningfully)

   SUBJECT KNOWLEDGE — accuracy and appropriateness of subject matter knowledge applied:
     4 = substantial, accurate, appropriate — correct terminology, no significant errors
     3 = generally accurate — mostly correct with minor gaps or imprecision
     2 = limited or possibly inaccurate — vague, missing key concepts, or contains errors
     1 = little or no accurate/appropriate knowledge demonstrated

   SUPPORT — quality and relevance of supporting evidence and examples:
     4 = sound — specific, relevant evidence cited directly from the exhibits
     3 = adequate — some relevant examples; not every claim is fully supported
     2 = limited — few relevant examples; most claims unsupported
     1 = weak or absent — little or no relevant supporting detail

   RATIONALE — soundness of argument and degree of understanding demonstrated:
     4 = ably reasoned and comprehensive — clear logic connecting evidence → need → strategy → why it works for this student
     3 = adequately reasoned — generally sound with some gaps in the argumentative chain
     2 = limited and poorly reasoned — logic is weak, incomplete, or partially incorrect
     1 = little or no coherent reasoning demonstrated

3. Overall score = the LOWEST rating across all four characteristics.
   A response must meet the standard on ALL four criteria to earn a given score.
   Example: if PURPOSE=4, KNOWLEDGE=4, SUPPORT=4, RATIONALE=2 → overall score = 2.

Return ONLY valid JSON:
{
  "score": 1,
  "performanceLevel": "Weak",
  "feedback": "2-3 sentences stating the score earned and which characteristic(s) determined it",
  "strengths": ["specific thing the response did well"],
  "improvements": ["specific gap in the lowest-scoring characteristic(s)", "second gap", "third gap"]
}`

    const userPrompt = `ASSIGNMENT:
${cr.prompt}

${cr.scenarioContext ? `STUDENT SCENARIO AND EXHIBITS:\n${cr.scenarioContext}\n\n` : ''}CANDIDATE RESPONSE (${wordCount} words):
${responseText}

Rate each of the four characteristics (PURPOSE, SUBJECT KNOWLEDGE, SUPPORT, RATIONALE) on a 1–4 scale using the official rubric descriptions. The overall score is the lowest of the four ratings. Return only the JSON.`

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

    const score = Math.max(1, Math.min(4, parseInt(String(parsed.score), 10))) as CRScore
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
