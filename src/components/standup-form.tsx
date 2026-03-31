'use client'

import { useCallback, useMemo } from 'react'
import { Loader2, Sparkles, X } from 'lucide-react'

interface StandupFormProps {
  value: string
  onChange: (val: string) => void
  onSubmit: () => void
  isPending: boolean
  isError: boolean
  error: Error | null
  onReset: () => void
  hasSubmitted: boolean
}

export function StandupForm({
  value,
  onChange,
  onSubmit,
  isPending,
  isError,
  error,
  onReset,
  hasSubmitted,
}: StandupFormProps) {
  const charCount = useMemo(() => value.length, [value])
  const isDisabled = useMemo(
    () => isPending || value.trim().length < 10,
    [isPending, value]
  )

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => onChange(e.target.value),
    [onChange]
  )

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit()
    },
    [onSubmit]
  )

  return (
    <div
      className="rounded-xl p-6"
      style={{
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="mb-4">
        <h2 className="text-lg font-semibold" style={{ color: 'var(--foreground)' }}>
          Team Standup
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--muted-foreground)' }}>
          Paste your team&apos;s updates below
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <textarea
          value={value}
          onChange={handleChange}
          disabled={isPending}
          placeholder={`Sara: Working on auth module. Blocked by API keys from DevOps.\nArun: Finished dashboard UI. Starting on tests today.\nPriya: Reviewed PRs. Will deploy staging after lunch.`}
          className="w-full font-mono text-sm resize-none rounded-lg p-3 outline-none"
          style={{
            minHeight: '280px',
            backgroundColor: 'rgba(0,0,0,0.4)',
            border: isError
              ? '1px solid var(--destructive)'
              : '1px solid rgba(255,255,255,0.1)',
            color: 'var(--foreground)',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--primary)'
            e.target.style.boxShadow = '0 0 0 1px var(--primary)'
          }}
          onBlur={(e) => {
            e.target.style.borderColor = isError
              ? 'var(--destructive)'
              : 'rgba(255,255,255,0.1)'
            e.target.style.boxShadow = 'none'
          }}
        />

        <div className="flex justify-end">
          <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
            {charCount} chars
          </span>
        </div>

        {isError && error && (
          <p className="text-sm" style={{ color: 'var(--destructive)' }}>
            {error.message}
          </p>
        )}

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={isDisabled}
            className="flex-1 flex items-center justify-center py-2.5 px-4 rounded-lg font-medium text-sm"
            style={{
              backgroundColor: isDisabled ? 'rgba(99,102,241,0.4)' : 'var(--primary)',
              color: 'var(--primary-foreground)',
              cursor: isDisabled ? 'not-allowed' : 'pointer',
            }}
          >
            {isPending ? (
              <>
                <Loader2 className="animate-spin mr-2 h-4 w-4" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Analyze Standup
              </>
            )}
          </button>

          {hasSubmitted && (
            <button
              type="button"
              onClick={onReset}
              className="flex items-center justify-center px-3 py-2.5 rounded-lg text-sm"
              style={{
                backgroundColor: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                color: 'var(--muted-foreground)',
                cursor: 'pointer',
              }}
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
