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

    // Grade with Claude using the official NES 4-point rubric criteria
    const systemPrompt = `You are an expert NES Foundations of Reading exam scorer. Grade constructed-response items using the official 4-point rubric below.

SCORE 4 — THOROUGH:
- The purpose of the assignment is fully achieved.
- There is substantial, accurate, and appropriate application of subject matter knowledge.
- The supporting evidence is sound; there are high-quality, relevant examples cited directly from the exhibits.
- The response reflects an ably reasoned, comprehensive understanding of the topic.

SCORE 3 — ADEQUATE:
- The purpose of the assignment is largely achieved.
- There is a generally accurate and appropriate application of subject matter knowledge.
- The supporting evidence is adequate; there are some acceptable, relevant examples.
- The response reflects an adequately reasoned understanding of the topic.

SCORE 2 — LIMITED:
- The purpose of the assignment is partially achieved.
- There is limited, possibly inaccurate or inappropriate application of subject matter knowledge.
- The supporting evidence is limited; there are few relevant examples.
- The response reflects a limited, poorly reasoned understanding of the topic.

SCORE 1 — WEAK:
- The purpose of the assignment is not achieved.
- There is little or no appropriate or accurate application of subject matter knowledge.
- The supporting evidence, if present, is weak; there are few or no relevant examples.
- The response reflects little or no reasoning about or understanding of the subject matter.

Scoring criteria: PURPOSE (achieves all 4 parts of the assignment), SUBJECT KNOWLEDGE (accurate instructional terminology and strategies), SUPPORT (specific evidence from the exhibits), RATIONALE (clear reasoning for why the strategy works for this specific student).

A SCORE 4 response must: name the specific phonics pattern or comprehension skill with correct terminology, cite exact data from the exhibits, describe the strategy with enough implementation detail to actually carry it out, and explain WHY it addresses this student's specific need.

Respond ONLY with valid JSON in this exact format:
{
  "score": 1,
  "performanceLevel": "Weak",
  "feedback": "2-3 sentence overall assessment focused on the most important strength and gap",
  "strengths": ["specific strength 1", "specific strength 2"],
  "improvements": ["specific actionable improvement 1", "specific actionable improvement 2", "specific actionable improvement 3"]
}`

    const userPrompt = `ASSIGNMENT:
${cr.prompt}

${cr.scenarioContext ? `STUDENT SCENARIO AND EXHIBITS:\n${cr.scenarioContext}\n\n` : ''}OFFICIAL RUBRIC:
Score 4: ${cr.rubric.score4}
Score 3: ${cr.rubric.score3}
Score 2: ${cr.rubric.score2}
Score 1: ${cr.rubric.score1}

CANDIDATE RESPONSE (${wordCount} words):
${responseText}

Score this response 1–4 using the official rubric criteria. Be rigorous — a Score 4 requires specific terminology, specific exhibit evidence, and specific strategy implementation details. Most responses should score 2 or 3.`

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
