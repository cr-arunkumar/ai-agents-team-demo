'use client'

import { useMutation } from '@tanstack/react-query'
import { analyzeStandup } from '@/lib/api'
import type { AnalyzeResponse } from '@/types/standup'

export function useStandupAnalysis() {
  const mutation = useMutation<AnalyzeResponse, Error, string>({
    mutationFn: analyzeStandup,
    onError: (error) => {
      console.error('Analysis failed:', error.message)
    },
  })

  return {
    analyze: mutation.mutate,
    data: mutation.data,
    moods: mutation.data?.moods ?? [],
    riskFlag: mutation.data?.riskFlag ?? null,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    reset: mutation.reset,
  }
}
