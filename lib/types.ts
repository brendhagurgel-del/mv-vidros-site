export interface Lead {
  id: string
  userId?: string
  name: string
  category: string
  city: string
  state: string
  website?: string
  phone?: string
  instagram?: string
  email?: string
  googlePlaceId?: string
  score: number
  rarity: "LENDÁRIO" | "RARO" | "COMUM" | "BAIXO"
  status: "NOVO" | "ANALISADO" | "PRONTO" | "AGUARDANDO" | "ENVIADO"
  diagnosis?: Diagnosis
  createdAt: string
  updatedAt: string
}

export interface Diagnosis {
  score: number
  rarity: string
  presencaDigital: DiagnosticDimension
  clareza: DiagnosticDimension
  cta: DiagnosticDimension
  reputacao: DiagnosticDimension
  gaps: string[]
  oportunidades: string[]
  angulo: string
}

export interface DiagnosticDimension {
  score: number
  label: string
  descricao: string
}

export interface Campaign {
  id: string
  userId: string
  name: string
  niche: string
  city: string
  frequency: string
  dailyLimit: number
  windowStart?: string
  windowEnd?: string
  autoSearch: boolean
  autoDiagnose: boolean
  autoMessage: boolean
  humanReview: boolean
  status: "ATIVA" | "PAUSADA" | "AGENDADA" | "CONCLUÍDA"
  lastRun?: string
  nextRun?: string
  leadsFound: number
  responseRate?: number
  createdAt: string
}

export interface Message {
  id: string
  leadId: string
  campaignId?: string
  userId: string
  content: string
  status: "PENDENTE" | "APROVADA" | "REJEITADA" | "ENVIADA"
  priority: "ALTA" | "MEDIA" | "BAIXA"
  aiScore?: number
  aiAngle?: string
  approvedAt?: string
  sentAt?: string
  createdAt: string
}

export interface XpEvent {
  id: string
  userId: string
  eventType: string
  xpGained: number
  description: string
  createdAt: string
}

export interface UserStats {
  xp: number
  level: number
  xpForNextLevel: number
  potencia: number
  leadsToday: number
  leadsLimit: number
}
