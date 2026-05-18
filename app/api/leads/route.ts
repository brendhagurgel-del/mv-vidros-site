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

const MOCK_LEADS: Lead[] = [
  {
    id: "lead_001",
    name: "Vidraçaria São Paulo",
    category: "Vidraçaria",
    city: "São Paulo",
    state: "SP",
    website: "https://vidracariasaopaulo.com.br",
    phone: "(11) 9 9999-1111",
    instagram: "@vidracariasaopaulo",
    email: "contato@vidracariasaopaulo.com.br",
    score: 87,
    rarity: "ÉPICO",
    status: "diagnosticado",
    createdAt: "2026-05-01T10:00:00Z",
    updatedAt: "2026-05-10T14:30:00Z",
  },
  {
    id: "lead_002",
    name: "Esquadrias Prime RJ",
    category: "Esquadrias",
    city: "Rio de Janeiro",
    state: "RJ",
    website: null,
    phone: "(21) 9 8888-2222",
    instagram: "@esquadriasprimerj",
    email: null,
    score: 62,
    rarity: "INCOMUM",
    status: "novo",
    createdAt: "2026-05-05T08:00:00Z",
    updatedAt: "2026-05-05T08:00:00Z",
  },
  {
    id: "lead_003",
    name: "Box Blindex Curitiba",
    category: "Box de Vidro",
    city: "Curitiba",
    state: "PR",
    website: "https://boxblindexcwb.com.br",
    phone: "(41) 9 7777-3333",
    instagram: "@boxblindexcwb",
    email: "vendas@boxblindexcwb.com.br",
    score: 94,
    rarity: "LENDÁRIO",
    status: "aprovado",
    createdAt: "2026-04-20T09:00:00Z",
    updatedAt: "2026-05-12T11:00:00Z",
  },
  {
    id: "lead_004",
    name: "Temperados BH",
    category: "Vidro Temperado",
    city: "Belo Horizonte",
    state: "MG",
    website: null,
    phone: "(31) 9 6666-4444",
    instagram: null,
    email: null,
    score: 41,
    rarity: "COMUM",
    status: "novo",
    createdAt: "2026-05-08T12:00:00Z",
    updatedAt: "2026-05-08T12:00:00Z",
  },
  {
    id: "lead_005",
    name: "Alumínio & Vidro Salvador",
    category: "Esquadrias de Alumínio",
    city: "Salvador",
    state: "BA",
    website: "https://aluvisal.com.br",
    phone: "(71) 9 5555-5555",
    instagram: "@aluvisal",
    email: "orcamento@aluvisal.com.br",
    score: 76,
    rarity: "RARO",
    status: "mensagem_gerada",
    createdAt: "2026-04-28T15:00:00Z",
    updatedAt: "2026-05-09T10:00:00Z",
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase() ?? "";
  const category = searchParams.get("category") ?? "";
  const city = searchParams.get("city") ?? "";
  const rarity = searchParams.get("rarity") ?? "";
  const status = searchParams.get("status") ?? "";
  const page = parseInt(searchParams.get("page") ?? "1", 10);
  const perPage = parseInt(searchParams.get("perPage") ?? "20", 10);

  let filtered = MOCK_LEADS.filter((l) => {
    if (search && !l.name.toLowerCase().includes(search)) return false;
    if (category && l.category !== category) return false;
    if (city && l.city !== city) return false;
    if (rarity && l.rarity !== rarity) return false;
    if (status && l.status !== status) return false;
    return true;
  });

  const total = filtered.length;
  const start = (page - 1) * perPage;
  const leads = filtered.slice(start, start + perPage);

  return NextResponse.json({ leads, total, page, perPage });
}

export async function POST(req: Request) {
  const body = await req.json();
  const now = new Date().toISOString();
  const lead: Lead = {
    id: `lead_${Date.now()}`,
    name: body.name ?? "Novo Lead",
    category: body.category ?? "",
    city: body.city ?? "",
    state: body.state ?? "",
    website: body.website ?? null,
    phone: body.phone ?? null,
    instagram: body.instagram ?? null,
    email: body.email ?? null,
    score: body.score ?? 0,
    rarity: body.rarity ?? "COMUM",
    status: "novo",
    createdAt: now,
    updatedAt: now,
  };
  return NextResponse.json({ lead }, { status: 201 });
}
