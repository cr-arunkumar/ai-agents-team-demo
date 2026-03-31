import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

// Mock the ai module — route uses generateText with Output.object()
vi.mock('ai', () => ({
  generateText: vi.fn(),
  Output: {
    object: vi.fn(({ schema }) => ({ schema })),
  },
}))

// Mock the model
vi.mock('@/lib/ai', () => ({
  geminiFlash: {},
}))

import { POST } from '@/app/api/standup/analyze/route'
import { generateText } from 'ai'
import type { AnalyzeResponse } from '@/types/standup'

const mockOutput: AnalyzeResponse = {
  moods: [
    { name: 'Sara', mood: 'blocked', emoji: '🚫', status: 'blocked', reason: 'Waiting for keys' },
  ],
  riskFlag: {
    hasRisk: true, level: 'medium', title: 'Blocker',
    description: 'Sara blocked', recommendation: 'Fix ASAP',
  },
}

describe('POST /api/standup/analyze', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('returns 400 for empty rawInput', async () => {
    const req = new NextRequest('http://localhost/api/standup/analyze', {
      method: 'POST',
      body: JSON.stringify({ rawInput: '' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 400 for rawInput shorter than 10 chars', async () => {
    const req = new NextRequest('http://localhost/api/standup/analyze', {
      method: 'POST',
      body: JSON.stringify({ rawInput: 'short' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    expect(res.status).toBe(400)
  })

  it('returns 200 with AnalyzeResponse for valid input', async () => {
    vi.mocked(generateText).mockResolvedValueOnce({
      output: mockOutput,
    } as Awaited<ReturnType<typeof generateText>>)

    const req = new NextRequest('http://localhost/api/standup/analyze', {
      method: 'POST',
      body: JSON.stringify({ rawInput: 'Sara is blocked. Arun finished the dashboard today.' }),
      headers: { 'Content-Type': 'application/json' },
    })
    const res = await POST(req)
    expect(res.status).toBe(200)
    const data = await res.json() as AnalyzeResponse
    expect(data.moods).toBeDefined()
    expect(data.riskFlag).toBeDefined()
    expect(Array.isArray(data.moods)).toBe(true)
  })
})
