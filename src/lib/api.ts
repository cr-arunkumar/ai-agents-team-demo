import type { AnalyzeResponse } from '@/types/standup'

export async function analyzeStandup(rawInput: string): Promise<AnalyzeResponse> {
  const res = await fetch('/api/standup/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ rawInput }),
  })
  if (!res.ok) {
    const error = await res.json().catch(() => ({}))
    throw new Error((error as { message?: string }).message ?? 'Failed to analyze standup')
  }
  return res.json() as Promise<AnalyzeResponse>
}
