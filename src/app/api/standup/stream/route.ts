import { NextRequest } from 'next/server'
import { streamText } from 'ai'
import { geminiFlash } from '@/lib/ai'

export async function POST(request: NextRequest) {
  const body = await request.json() as { rawInput?: string }
  const { rawInput } = body

  if (!rawInput || !rawInput.trim()) {
    return new Response(JSON.stringify({ error: 'rawInput is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const result = streamText({
    model: geminiFlash,
    prompt: `You are a scrum master. Write a concise 3-4 sentence sprint summary. Focus on team momentum, key progress, and blockers. Be direct and insightful. No bullet points. Prose only. Standup:\n\n${rawInput}`,
  })

  return result.toTextStreamResponse()
}
