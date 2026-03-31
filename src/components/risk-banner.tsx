'use client'

import { CheckCircle, AlertTriangle, AlertOctagon } from 'lucide-react'
import type { RiskFlag } from '@/types/standup'

interface RiskBannerProps {
  riskFlag: RiskFlag | null
  show: boolean
}

export function RiskBanner({ riskFlag, show }: RiskBannerProps) {
  if (!show || !riskFlag) return null

  const { level, title, description, recommendation } = riskFlag

  if (level === 'none' || level === 'low') {
    return (
      <div
        className="rounded-xl p-4 flex gap-3"
        style={{
          backgroundColor: 'rgba(16,185,129,0.1)',
          borderLeft: '4px solid rgb(16,185,129)',
        }}
      >
        <CheckCircle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: 'rgb(52,211,153)' }} />
        <div>
          <p className="text-sm font-semibold" style={{ color: 'rgb(52,211,153)' }}>
            Sprint looks healthy
          </p>
          <p className="text-xs mt-1 opacity-80" style={{ color: 'rgb(52,211,153)' }}>
            No critical blockers detected.
          </p>
        </div>
      </div>
    )
  }

  if (level === 'medium') {
    return (
      <div
        className="rounded-xl p-4 flex gap-3"
        style={{
          backgroundColor: 'rgba(245,158,11,0.1)',
          borderLeft: '4px solid rgb(245,158,11)',
        }}
      >
        <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: 'rgb(251,191,36)' }} />
        <div>
          <p className="text-sm font-semibold" style={{ color: 'rgb(251,191,36)' }}>
            {title}
          </p>
          <p className="text-xs mt-1 opacity-80" style={{ color: 'rgb(251,191,36)' }}>
            {description}
          </p>
          <p className="text-xs mt-2 font-medium" style={{ color: 'rgb(251,191,36)' }}>
            Recommend: {recommendation}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div
      className="rounded-xl p-4 flex gap-3"
      style={{
        backgroundColor: 'rgba(239,68,68,0.1)',
        borderLeft: '4px solid rgb(239,68,68)',
      }}
    >
      <AlertOctagon
        className="h-4 w-4 flex-shrink-0 mt-0.5 animate-pulse"
        style={{ color: 'rgb(248,113,113)' }}
      />
      <div>
        <p className="text-sm font-semibold" style={{ color: 'rgb(248,113,113)' }}>
          {title}
        </p>
        <p className="text-xs mt-1 opacity-80" style={{ color: 'rgb(248,113,113)' }}>
          {description}
        </p>
        <p className="text-xs mt-2 font-medium" style={{ color: 'rgb(251,191,36)' }}>
          Recommend: {recommendation}
        </p>
      </div>
    </div>
  )
}
