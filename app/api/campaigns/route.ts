import { NextResponse } from "next/server";

type CampaignStatus = "ativa" | "pausada" | "concluida" | "rascunho";

interface Campaign {
  id: string;
  name: string;
  niche: string;
  city: string;
  frequency: "diaria" | "semanal" | "manual";
  dailyLimit: number;
  windowStart: string;
  windowEnd: string;
  autoSearch: boolean;
  autoDiagnose: boolean;
  autoMessage: boolean;
  humanReview: boolean;
  status: CampaignStatus;
  lastRun: string | null;
  nextRun: string | null;
  leadsFound: number;
  responseRate: number;
  createdAt: string;
}

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: "camp_001",
    name: "Vidraçarias SP - Outbound",
    niche: "Vidraçaria",
    city: "São Paulo",
    frequency: "diaria",
    dailyLimit: 30,
    windowStart: "08:00",
    windowEnd: "18:00",
    autoSearch: true,
    autoDiagnose: true,
    autoMessage: false,
    humanReview: true,
    status: "ativa",
    lastRun: "2026-05-17T09:00:00Z",
    nextRun: "2026-05-18T09:00:00Z",
    leadsFound: 142,
    responseRate: 18.3,
    createdAt: "2026-04-01T00:00:00Z",
  },
  {
    id: "camp_002",
    name: "Esquadrias RJ",
    niche: "Esquadrias",
    city: "Rio de Janeiro",
    frequency: "semanal",
    dailyLimit: 20,
    windowStart: "09:00",
    windowEnd: "17:00",
    autoSearch: true,
    autoDiagnose: false,
    autoMessage: false,
    humanReview: true,
    status: "pausada",
    lastRun: "2026-05-12T10:00:00Z",
    nextRun: null,
    leadsFound: 67,
    responseRate: 12.7,
    createdAt: "2026-04-15T00:00:00Z",
  },
  {
    id: "camp_003",
    name: "Box de Vidro Sul",
    niche: "Box de Vidro",
    city: "Curitiba",
    frequency: "diaria",
    dailyLimit: 15,
    windowStart: "08:30",
    windowEnd: "17:30",
    autoSearch: true,
    autoDiagnose: true,
    autoMessage: true,
    humanReview: false,
    status: "ativa",
    lastRun: "2026-05-17T08:30:00Z",
    nextRun: "2026-05-18T08:30:00Z",
    leadsFound: 98,
    responseRate: 22.4,
    createdAt: "2026-04-20T00:00:00Z",
  },
];

export async function GET(_req: Request) {
  return NextResponse.json({
    campaigns: MOCK_CAMPAIGNS,
    total: MOCK_CAMPAIGNS.length,
  });
}

export async function POST(req: Request) {
  const body = await req.json();
  const now = new Date().toISOString();
  const campaign: Campaign = {
    id: `camp_${Date.now()}`,
    name: body.name ?? "Nova Campanha",
    niche: body.niche ?? "",
    city: body.city ?? "",
    frequency: body.frequency ?? "manual",
    dailyLimit: body.dailyLimit ?? 10,
    windowStart: body.windowStart ?? "08:00",
    windowEnd: body.windowEnd ?? "18:00",
    autoSearch: body.autoSearch ?? false,
    autoDiagnose: body.autoDiagnose ?? false,
    autoMessage: body.autoMessage ?? false,
    humanReview: body.humanReview ?? true,
    status: "rascunho",
    lastRun: null,
    nextRun: null,
    leadsFound: 0,
    responseRate: 0,
    createdAt: now,
  };
  return NextResponse.json({ campaign }, { status: 201 });
}
