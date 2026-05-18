import { NextResponse } from "next/server";

type Rarity = "COMUM" | "INCOMUM" | "RARO" | "ÉPICO" | "LENDÁRIO";
type ApprovalStatus = "pendente" | "aprovado" | "rejeitado" | "ajustado";

interface Approval {
  id: string;
  leadId: string;
  leadName: string;
  leadCity: string;
  leadCategory: string;
  score: number;
  rarity: Rarity;
  message: string;
  status: ApprovalStatus;
  priority: "alta" | "media" | "baixa";
  aiScore: number;
  aiAngle: string;
  createdAt: string;
}

const MOCK_APPROVALS: Approval[] = [
  {
    id: "appr_001",
    leadId: "lead_001",
    leadName: "Vidraçaria São Paulo",
    leadCity: "São Paulo",
    leadCategory: "Vidraçaria",
    score: 87,
    rarity: "ÉPICO",
    message:
      "Olá! Vi que vocês têm um ótimo trabalho com vidros na região. Tenho uma análise gratuita do site de vocês que pode ajudar a trazer mais clientes pelo celular. Posso compartilhar?",
    status: "pendente",
    priority: "alta",
    aiScore: 91,
    aiAngle:
      "Empresa com excelente reputação perdendo leads mobile — solução de alto impacto e baixo custo.",
    createdAt: "2026-05-17T10:00:00Z",
  },
  {
    id: "appr_002",
    leadId: "lead_003",
    leadName: "Box Blindex Curitiba",
    leadCity: "Curitiba",
    leadCategory: "Box de Vidro",
    score: 94,
    rarity: "LENDÁRIO",
    message:
      "Boa tarde! Analisei o site de vocês e encontrei 3 oportunidades simples que podem aumentar os contatos em pelo menos 40%. Vale 5 minutos?",
    status: "pendente",
    priority: "alta",
    aiScore: 95,
    aiAngle:
      "Lead lendário com máximo potencial — abordagem direta com resultado concreto promissor.",
    createdAt: "2026-05-17T11:30:00Z",
  },
  {
    id: "appr_003",
    leadId: "lead_005",
    leadName: "Alumínio & Vidro Salvador",
    leadCity: "Salvador",
    leadCategory: "Esquadrias de Alumínio",
    score: 76,
    rarity: "RARO",
    message:
      "Olá! Vi o trabalho de vocês no Instagram e fiquei impressionado com os projetos. Tenho algumas sugestões sobre como melhorar o alcance online. Posso te enviar?",
    status: "pendente",
    priority: "media",
    aiScore: 78,
    aiAngle:
      "Bom engajamento no Instagram mas baixa conversão para contato direto.",
    createdAt: "2026-05-17T14:00:00Z",
  },
];

export async function GET(_req: Request) {
  const pending = MOCK_APPROVALS.filter((a) => a.status === "pendente").length;
  return NextResponse.json({
    approvals: MOCK_APPROVALS,
    total: MOCK_APPROVALS.length,
    pending,
  });
}
