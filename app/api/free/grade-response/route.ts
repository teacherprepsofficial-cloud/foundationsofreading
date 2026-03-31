export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export async function POST(request: NextRequest) {
  try {
    const { prompt, response } = await request.json()

    if (!prompt || !response) {
      return NextResponse.json({ error: 'Missing prompt or response' }, { status: 400 })
    }

    if (response.trim().split(/\s+/).length < 50) {
      return NextResponse.json({
        score: 0,
        performanceLevel: 'Limited/Weak',
        feedback: 'Your response is too brief to evaluate. A thorough response requires at least 150 words.',
        strengths: [],
        improvements: ['Write a full response of at least 150 words', 'Address all parts of the prompt'],
      })
    }

    const systemPrompt = `You are an expert NES Foundations of Reading exam scorer. Grade constructed response answers using this rubric:

Score 2 (Thorough): Demonstrates strong, accurate knowledge of evidence-based reading instruction. Strategies are specific, well-named, and clearly explained with implementation details. Shows clear understanding of how strategies support reading development according to research.

Score 1 (Adequate): Demonstrates adequate knowledge. Strategies are relevant but may lack specificity, depth, or clear connection to reading research. Generally correct but missing some elements.

Score 0 (Limited/Weak): Demonstrates limited or inaccurate knowledge. Strategies are vague, off-topic, or not evidence-based. Fails to address significant parts of the prompt.

Return a JSON object with exactly these fields:
{
  "score": 0|1|2,
  "performanceLevel": "Thorough"|"Adequate"|"Limited/Weak",
  "feedback": "2-3 sentence overall feedback",
  "strengths": ["strength 1", "strength 2"],
  "improvements": ["improvement 1", "improvement 2"]
}

Be honest and accurate. This is for test preparation — students need real feedback.`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 600,
      messages: [
        {
          role: 'user',
          content: `Prompt:\n${prompt}\n\nStudent Response:\n${response}\n\nGrade this response and return only the JSON object.`,
        },
      ],
      system: systemPrompt,
    })

    const text = message.content[0].type === 'text' ? message.content[0].text : ''
    const jsonMatch = text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('Invalid AI response')
    const result = JSON.parse(jsonMatch[0])

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ error: 'Grading failed. Please try again.' }, { status: 500 })
  }
}
