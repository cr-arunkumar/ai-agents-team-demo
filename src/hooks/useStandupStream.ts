'use client'

import { useCompletion } from '@ai-sdk/react'

export function useStandupStream() {
  const { completion, complete, isLoading, error, stop } = useCompletion({
    api: '/api/standup/stream',
    onError: (err) => console.error('Stream error:', err),
  })

  const streamSummary = (rawInput: string) => {
    void complete(rawInput)
  }

  return {
    summary: completion,
    streamSummary,
    isStreaming: isLoading,
    isComplete: !isLoading && completion.length > 0,
    error,
    stop,
  }
}
