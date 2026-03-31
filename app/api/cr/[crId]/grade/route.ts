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
  if (score === 2) return 'Thorough'
  if (score === 1) return 'Adequate'
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

    // Auto-score 0 if under 50 words
    if (wordCount < 50) {
      const attempt = await UserCRAttempt.create({
        userId: auth.userId,
        crId,
        examCode: cr.examCode,
        responseText,
        wordCount,
        score: 0 as CRScore,
        performanceLevel: 'Weak' as CRPerformanceLevel,
        feedback: `Your response is only ${wordCount} words. The exam requires thorough, developed responses of 150+ words. Please expand your answer with specific examples, strategies, and explanations.`,
        strengths: [],
        improvements: [
          'Write at least 150 words',
          'Address all parts of the prompt',
          'Include specific pedagogical strategies',
          'Support your points with examples from the scenario',
        ],
      })

      await UserProgress.findOneAndUpdate(
        { userId: auth.userId, examCode: cr.examCode },
        { $addToSet: { crAttemptsCompleted: attempt._id } },
        { upsert: true }
      )

      return NextResponse.json({
        score: 0,
        performanceLevel: 'Weak',
        wordCount,
        feedback: attempt.feedback,
        strengths: [],
        improvements: attempt.improvements,
        attemptId: attempt._id,
      })
    }

    // Use Claude to grade
    const systemPrompt = `You are an expert NES Foundations of Reading exam scorer. You grade constructed-response items using the official 0-2 rubric:

SCORE 2 (Thorough): Response demonstrates comprehensive understanding of evidence-based reading instruction. Addresses ALL parts of the prompt with specific, accurate strategies and clear explanations. Uses appropriate pedagogical terminology.

SCORE 1 (Adequate/Limited): Response is relevant and shows some understanding but is incomplete, lacks specificity, or has minor inaccuracies. Addresses most but not all parts of the prompt.

SCORE 0 (Weak): Response shows little understanding, is off-topic, inaccurate, or fails to address the prompt meaningfully.

Respond ONLY with valid JSON in this exact format:
{
  "score": 0|1|2,
  "feedback": "2-3 sentence overall assessment",
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2", "improvement 3"]
}`

    const userPrompt = `PROMPT: ${cr.prompt}

${cr.scenarioContext ? `SCENARIO: ${cr.scenarioContext}\n\n` : ''}RUBRIC:
- Score 2: ${cr.rubric.score2}
- Score 1: ${cr.rubric.score1}
- Score 0: ${cr.rubric.score0}

CANDIDATE RESPONSE (${wordCount} words):
${responseText}

Grade this response.`

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
      parsed = JSON.parse(content.text)
    } catch {
      throw new Error('Failed to parse grading response')
    }

    const score = parsed.score as CRScore
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
