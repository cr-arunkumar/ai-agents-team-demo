'use client'

import { Users } from 'lucide-react'
import type { MoodResult, MoodStatus } from '@/types/standup'

interface MoodCardsProps {
  moods: MoodResult[]
  isLoading: boolean
}

function getAvatarStyle(status: MoodStatus): React.CSSProperties {
  switch (status) {
    case 'blocked':
      return {
        backgroundColor: 'rgba(239,68,68,0.2)',
        color: 'rgb(248,113,113)',
        border: '1px solid rgba(239,68,68,0.3)',
      }
    case 'at risk':
      return {
        backgroundColor: 'rgba(245,158,11,0.2)',
        color: 'rgb(251,191,36)',
        border: '1px solid rgba(245,158,11,0.3)',
      }
    default:
      return {
        backgroundColor: 'rgba(16,185,129,0.2)',
        color: 'rgb(52,211,153)',
        border: '1px solid rgba(16,185,129,0.3)',
      }
  }
}

function getBadgeStyle(status: MoodStatus): React.CSSProperties {
  switch (status) {
    case 'blocked':
      return {
        backgroundColor: 'rgba(239,68,68,0.1)',
        color: 'rgb(248,113,113)',
        border: '1px solid rgba(239,68,68,0.2)',
      }
    case 'at risk':
      return {
        backgroundColor: 'rgba(245,158,11,0.1)',
        color: 'rgb(251,191,36)',
        border: '1px solid rgba(245,158,11,0.2)',
      }
    default:
      return {
        backgroundColor: 'rgba(16,185,129,0.1)',
        color: 'rgb(52,211,153)',
        border: '1px solid rgba(16,185,129,0.2)',
      }
  }
}

export function MoodCards({ moods, isLoading }: MoodCardsProps) {
  return (
    <div
      className="rounded-xl p-6"
      style={{
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255,255,255,0.05)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      <div className="flex items-center gap-2 mb-4">
        <Users className="h-4 w-4" style={{ color: 'var(--primary)' }} />
        <h3 className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>
          Team Pulse
        </h3>
      </div>

      <div className="space-y-2">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-3 rounded-lg animate-pulse"
                style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}
              >
                <div
                  className="rounded-full flex-shrink-0"
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                  }}
                />
                <div className="flex-1 space-y-2">
                  <div
                    className="rounded"
                    style={{ width: 96, height: 12, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  />
                  <div
                    className="rounded"
                    style={{ width: 64, height: 8, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  />
                </div>
                <div
                  className="rounded-full ml-auto"
                  style={{ width: 64, height: 20, backgroundColor: 'rgba(255,255,255,0.1)' }}
                />
              </div>
            ))
          : moods.map((member, index) => (
              <div
                key={member.name}
                className="flex items-center gap-3 p-3 rounded-lg"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  animationDelay: `${index * 150}ms`,
                }}
              >
                <div
                  className="rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold"
                  style={{ width: 40, height: 40, ...getAvatarStyle(member.status) }}
                >
                  {member.name[0]?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>
                    {member.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                    {member.emoji} {member.mood}
                  </p>
                  <p
                    className="text-xs italic truncate"
                    style={{ color: 'rgba(100,116,139,0.7)', maxWidth: '8rem' }}
                  >
                    {member.reason}
                  </p>
                </div>
                <span
                  className="text-xs px-2 py-0.5 rounded-full font-medium ml-auto flex-shrink-0"
                  style={getBadgeStyle(member.status)}
                >
                  {member.status}
                </span>
              </div>
            ))}
      </div>
    </div>
  )
}
