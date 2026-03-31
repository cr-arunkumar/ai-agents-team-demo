'use client'

import { useState, useCallback } from 'react'
import { Zap, Copy, CheckCheck } from 'lucide-react'

interface StreamingSummaryProps {
  summary: string
  isStreaming: boolean
  isComplete: boolean
  show: boolean
}

export function StreamingSummary({
  summary,
  isStreaming,
  isComplete,
  show,
}: StreamingSummaryProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [summary])

  if (!show) return null

  const showSkeleton = show && summary === '' && !isStreaming
  const showContent = isStreaming || summary.length > 0

  return (
    <div
      className="rounded-xl p-6"
      style={{
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4" style={{ color: 'var(--secondary)' }} />
          <h3 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
            Sprint Summary
          </h3>
        </div>
        {isComplete && (
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs px-2 py-1 rounded"
            style={{
              color: 'var(--muted-foreground)',
              border: '1px solid rgba(255,255,255,0.1)',
              backgroundColor: 'transparent',
              cursor: 'pointer',
            }}
          >
            {copied ? (
              <CheckCheck className="h-3.5 w-3.5" style={{ color: 'var(--success)' }} />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        )}
      </div>

      {showSkeleton && (
        <div className="space-y-3 animate-pulse">
          <div className="rounded" style={{ width: '100%', height: 12, backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <div className="rounded" style={{ width: '80%', height: 12, backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <div className="rounded" style={{ width: '60%', height: 12, backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <p className="text-xs mt-2" style={{ color: 'var(--muted-foreground)' }}>
            Generating summary...
          </p>
        </div>
      )}

      {showContent && (
        <p
          className="font-mono text-sm leading-relaxed"
          style={{ color: 'var(--muted-foreground)', fontFamily: 'var(--font-geist-mono)' }}
        >
          {summary}
          {!isComplete && (
            <span
              className="inline-block ml-0.5 align-middle animate-pulse"
              style={{
                width: 2,
                height: 16,
                backgroundColor: 'var(--primary)',
                display: 'inline-block',
              }}
            />
          )}
        </p>
      )}
    </div>
  )
}
