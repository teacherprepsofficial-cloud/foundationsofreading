import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

function scoreToPerformance(score: number): string {
  if (score === 4) return 'Thorough'
  if (score === 3) return 'Adequate'
  if (score === 2) return 'Limited'
  return 'Weak'
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter((w) => w.length > 0).length
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, response } = await request.json()
    if (!response?.trim()) {
      return NextResponse.json({ error: 'Response required' }, { status: 400 })
    }

    const wordCount = countWords(response)

    if (wordCount < 50) {
      return NextResponse.json({
        score: 1,
        performanceLevel: 'Weak',
        feedback: `Your response is only ${wordCount} words. A thorough response requires at least 150 words addressing all four parts of the assignment with specific evidence and pedagogical reasoning.`,
        strengths: [],
        improvements: [
          'Write at least 150 words to fully develop your analysis',
          'Address all four parts: strength, need, strategy, and explanation of effectiveness',
          'Cite specific evidence from the scenario to support every claim',
          'Name and describe the instructional strategy with implementation details',
        ],
      })
    }

    const systemPrompt = `You are a trained NES Foundations of Reading exam scorer. Score each response accurately using only the official rubric.

OFFICIAL RUBRIC:

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

SCORING ALGORITHM:
1. Rate each of four criteria on 1–4: PURPOSE, SUBJECT KNOWLEDGE, SUPPORT, RATIONALE
2. Overall score = the LOWEST rating across all four criteria.

Return ONLY valid JSON:
{
  "score": 1,
  "feedback": "2–3 sentences stating the score earned and which characteristic(s) determined it",
  "strengths": ["specific thing done well"],
  "improvements": ["specific gap", "second gap", "third gap"]
}`

    const userPrompt = `ASSIGNMENT:\n${prompt}\n\nCANDIDATE RESPONSE (${wordCount} words):\n${response}\n\nRate each criterion (PURPOSE, SUBJECT KNOWLEDGE, SUPPORT, RATIONALE) on 1–4. Overall score = lowest. Return only JSON.`

    const message = await client.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 1024,
      messages: [{ role: 'user', content: userPrompt }],
      system: systemPrompt,
    })

    const content = message.content[0]
    if (content.type !== 'text') throw new Error('Unexpected response')

    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON found')
    const parsed = JSON.parse(jsonMatch[0])

    const score = Math.max(1, Math.min(4, parseInt(String(parsed.score), 10)))

    return NextResponse.json({
      score,
      performanceLevel: scoreToPerformance(score),
      feedback: parsed.feedback || '',
      strengths: parsed.strengths || [],
      improvements: parsed.improvements || [],
    })
  } catch (err) {
    console.error('Free CR grading error:', err)
    return NextResponse.json({ error: 'Grading failed. Please try again.' }, { status: 500 })
  }
}
