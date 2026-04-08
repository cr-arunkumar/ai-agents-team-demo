'use client'

import { useState, useCallback } from 'react'
import { useStandupAnalysis } from '@/hooks/useStandupAnalysis'
import { useStandupStream } from '@/hooks/useStandupStream'
import { StandupForm } from '@/components/standup-form'
import { MoodCards } from '@/components/mood-cards'
import { StreamingSummary } from '@/components/streaming-summary'
import { RiskBanner } from '@/components/risk-banner'
import { ThemeToggle } from '@/components/theme-toggle'
import type { AnalyzeResponse } from '@/types/standup'

export default function Home() {
  const [rawInput, setRawInput] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const analysis = useStandupAnalysis()
  const stream = useStandupStream()

  const handleAnalyze = useCallback(() => {
    if (rawInput.trim().length < 10) return
    setHasSubmitted(true)
    analysis.analyze(rawInput, {
      onSuccess: (data: AnalyzeResponse) => {
        void data
        stream.streamSummary(rawInput)
      },
    })
  }, [rawInput, analysis, stream])

  const handleReset = useCallback(() => {
    analysis.reset()
    stream.stop()
    setRawInput('')
    setHasSubmitted(false)
  }, [analysis, stream])

  const handleInputChange = useCallback((val: string) => {
    setRawInput(val)
  }, [])

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <header className="mb-10">
        <div className="flex items-center justify-end mb-4">
          <ThemeToggle />
        </div>
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight" style={{ color: 'var(--foreground)' }}>
            StandupAI
          </h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Turn standups into insights instantly
          </p>
        </div>
      </header>

      {!hasSubmitted ? (
        <div className="max-w-2xl mx-auto">
          <StandupForm
            value={rawInput}
            onChange={handleInputChange}
            onSubmit={handleAnalyze}
            isPending={analysis.isPending}
            isError={analysis.isError}
            error={analysis.error}
            onReset={handleReset}
            hasSubmitted={hasSubmitted}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <StandupForm
              value={rawInput}
              onChange={handleInputChange}
              onSubmit={handleAnalyze}
              isPending={analysis.isPending}
              isError={analysis.isError}
              error={analysis.error}
              onReset={handleReset}
              hasSubmitted={hasSubmitted}
            />
          </div>
          <div className="flex flex-col gap-6">
            <MoodCards moods={analysis.moods} isLoading={analysis.isPending} />
            <StreamingSummary
              summary={stream.summary}
              isStreaming={stream.isStreaming}
              isComplete={stream.isComplete}
              show={analysis.isSuccess}
            />
            <RiskBanner riskFlag={analysis.riskFlag} show={stream.isComplete} />
          </div>
        </div>
      )}
    </main>
  )
}
