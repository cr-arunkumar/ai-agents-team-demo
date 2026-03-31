import { NextRequest, NextResponse } from 'next/server'
import { generateText, Output } from 'ai'
import { z } from 'zod'
import { geminiFlash } from '@/lib/ai'
import type { AnalyzeRequest } from '@/types/standup'

const MoodResultSchema = z.object({
  name: z.string(),
  mood: z.enum(['focused', 'stressed', 'blocked', 'on track', 'uncertain']),
  emoji: z.string(),
  status: z.enum(['on track', 'blocked', 'at risk']),
  reason: z.string(),
})

const RiskFlagSchema = z.object({
  hasRisk: z.boolean(),
  level: z.enum(['none', 'low', 'medium', 'high']),
  title: z.string(),
  description: z.string(),
  recommendation: z.string(),
})

const AnalyzeResponseSchema = z.object({
  moods: z.array(MoodResultSchema),
  riskFlag: RiskFlagSchema,
})

export async function POST(request: NextRequest) {
  try {
    const body: AnalyzeRequest = await request.json()
    const { rawInput } = body

    if (!rawInput || rawInput.trim().length < 10) {
      return NextResponse.json(
        { error: 'rawInput must be at least 10 characters' },
        { status: 400 }
      )
    }

    const result = await generateText({
      model: geminiFlash,
      output: Output.object({ schema: AnalyzeResponseSchema }),
      prompt: `You are a scrum master analyzing a team standup. Extract each person's mood from their tone and language. Identify sprint risks and blockers. Standup:\n\n${rawInput}`,
    })

    return NextResponse.json(result.output, { status: 200 })
  } catch (error) {
    console.error('Analyze error:', error)
    return NextResponse.json(
      { error: 'Failed to analyze standup' },
      { status: 500 }
    )
  }
}
