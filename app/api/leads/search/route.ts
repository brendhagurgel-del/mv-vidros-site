import { NextResponse } from "next/server";

type Rarity = "COMUM" | "INCOMUM" | "RARO" | "ÉPICO" | "LENDÁRIO";
type LeadStatus = "novo" | "diagnosticado" | "mensagem_gerada" | "aprovado" | "enviado" | "respondeu";

interface Lead {
  id: string;
  name: string;
  category: string;
  city: string;
  state: string;
  website: string | null;
  phone: string | null;
  instagram: string | null;
  email: string | null;
  score: number;
  rarity: Rarity;
  status: LeadStatus;
  createdAt: string;
  updatedAt: string;
}

const MOCK_SEARCH_RESULTS: Lead[] = [
  {
    id: "search_001",
    name: "Vidraçaria Central",
    category: "Vidraçaria",
    city: "São Paulo",
    state: "SP",
    website: "https://vidracariacentral.com.br",
    phone: "(11) 9 3333-7777",
    instagram: "@vidracariacentral",
    email: null,
    score: 78,
    rarity: "RARO",
    status: "novo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "search_002",
    name: "Glass Expert SP",
    category: "Vidraçaria",
    city: "São Paulo",
    state: "SP",
    website: null,
    phone: "(11) 9 4444-8888",
    instagram: "@glassexpertsp",
    email: "contato@glassexpertsp.com",
    score: 55,
    rarity: "INCOMUM",
    status: "novo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "search_003",
    name: "Vidros Premium Paulista",
    category: "Vidraçaria",
    city: "São Paulo",
    state: "SP",
    website: "https://vidrospremium.com.br",
    phone: "(11) 9 5555-9999",
    instagram: "@vidrospremium",
    email: "vendas@vidrospremium.com.br",
    score: 91,
    rarity: "LENDÁRIO",
    status: "novo",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function POST(req: Request) {
  const body = await req.json();
  const { niche, city } = body as { niche: string; city: string };

  const results = MOCK_SEARCH_RESULTS.map((l) => ({
    ...l,
    category: niche || l.category,
    city: city || l.city,
  }));

  return NextResponse.json({ results, count: results.length });
}
