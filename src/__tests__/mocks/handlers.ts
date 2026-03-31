import { http, HttpResponse } from 'msw'
import type { AnalyzeResponse } from '@/types/standup'

export const mockAnalyzeResponse: AnalyzeResponse = {
  moods: [
    {
      name: 'Sara',
      mood: 'blocked',
      emoji: '🚫',
      status: 'blocked',
      reason: 'Waiting for API keys',
    },
    {
      name: 'Arun',
      mood: 'focused',
      emoji: '💪',
      status: 'on track',
      reason: 'Dashboard done',
    },
  ],
  riskFlag: {
    hasRisk: true,
    level: 'medium',
    title: 'Blocker detected',
    description: 'Sara is blocked on API keys',
    recommendation: 'DevOps to provide API keys ASAP',
  },
}

export const handlers = [
  http.post('/api/standup/analyze', () => {
    return HttpResponse.json(mockAnalyzeResponse)
  }),
  http.post('/api/standup/stream', () => {
    return new HttpResponse('Sprint is on track with one blocker.', {
      headers: { 'Content-Type': 'text/plain' },
    })
  }),
]
