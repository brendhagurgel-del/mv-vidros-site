import { NextResponse } from "next/server";

const MOCK_LEAD = {
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
  diagnosis: {
    score: 87,
    rarity: "ÉPICO",
    presencaDigital: {
      score: 85,
      label: "BOM",
      descricao: "Site funcional com boa estrutura, mas sem blog ou conteúdo SEO.",
    },
    clareza: {
      score: 80,
      label: "BOM",
      descricao: "Proposta de valor clara, mas faltam diferenciais explícitos.",
    },
    cta: {
      score: 70,
      label: "MÉDIO",
      descricao: "Botão de orçamento existe mas está pouco visível no mobile.",
    },
    reputacao: {
      score: 91,
      label: "EXCELENTE",
      descricao: "4.8 estrelas no Google com 200+ avaliações positivas.",
    },
    gaps: [
      "Ausência de depoimentos em vídeo",
      "Sem chat online ou WhatsApp visível",
      "Portfólio desatualizado",
    ],
    oportunidades: [
      "Implementar chat de WhatsApp na home",
      "Criar seção de cases com fotos",
      "Otimizar CTAs para mobile",
    ],
    angulo:
      "Empresa com boa reputação mas perdendo leads mobile por falta de contato imediato — solução de WhatsApp Business pode aumentar conversão em 30%.",
  },
};

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const lead = { ...MOCK_LEAD, id: params.id };
  return NextResponse.json({ lead });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const updated = {
    ...MOCK_LEAD,
    ...body,
    id: params.id,
    updatedAt: new Date().toISOString(),
  };
  return NextResponse.json({ lead: updated });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  return NextResponse.json({ success: true, id: params.id });
}
