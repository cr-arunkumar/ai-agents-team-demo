export type MoodStatus = 'on track' | 'blocked' | 'at risk'
export type MoodLevel = 'focused' | 'stressed' | 'blocked' | 'on track' | 'uncertain'
export type RiskLevel = 'none' | 'low' | 'medium' | 'high'

export interface MoodResult {
  name: string
  mood: MoodLevel
  emoji: string
  status: MoodStatus
  reason: string
}

export interface RiskFlag {
  hasRisk: boolean
  level: RiskLevel
  title: string
  description: string
  recommendation: string
}

export interface AnalyzeResponse {
  moods: MoodResult[]
  riskFlag: RiskFlag
}

export interface AnalyzeRequest {
  rawInput: string
}
