export function calcLevel(totalXP: number): number {
  return Math.floor(Math.sqrt(totalXP / 100)) + 1
}

export function calcXpForNextLevel(currentLevel: number): number {
  return Math.pow(currentLevel, 2) * 100
}

export function calcPotencia(leadsToday: number, dailyLimit: number): number {
  return Math.min(Math.round((leadsToday / dailyLimit) * 100), 100)
}

export const XP_EVENTS = {
  LEAD_FOUND: 10,
  LEAD_QUALIFIED: 25,
  LEAD_LEGENDARY: 50,
  MESSAGE_APPROVED: 50,
  MESSAGE_SENT: 100,
  REPLY_RECEIVED: 200,
  DAILY_GOAL_MET: 300,
  COMBO_5_APPROVALS: 150,
  CAMPAIGN_FIRED: 75,
} as const

export type XpEventType = keyof typeof XP_EVENTS
