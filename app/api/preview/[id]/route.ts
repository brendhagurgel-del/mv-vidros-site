import { NextResponse } from "next/server";

interface PublicLead {
  id: string;
  name: string;
  category: string;
  city: string;
  state: string;
  score: number;
  rarity: string;
  diagnosis: {
    presencaDigital: { score: number; label: string };
    clareza: { score: number; label: string };
    cta: { score: number; label: string };
    reputacao: { score: number; label: string };
    gaps: string[];
    oportunidades: string[];
    angulo: string;
  };
}

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const lead: PublicLead = {
    id: params.id,
    name: "Vidraçaria São Paulo",
    category: "Vidraçaria",
    city: "São Paulo",
    state: "SP",
    score: 87,
    rarity: "ÉPICO",
    diagnosis: {
      presencaDigital: { score: 85, label: "BOM" },
      clareza: { score: 80, label: "BOM" },
      cta: { score: 70, label: "MÉDIO" },
      reputacao: { score: 91, label: "EXCELENTE" },
      gaps: [
        "Sem botão de WhatsApp visível no mobile",
        "Portfólio sem fotos profissionais",
        "Sem depoimentos em destaque",
      ],
      oportunidades: [
        "WhatsApp Business com resposta automática",
        "Galeria profissional de projetos",
        "Seção de depoimentos com fotos",
      ],
      angulo:
        "Empresa com excelente reputação e serviço comprovado, mas com presença digital abaixo do potencial.",
    },
  };
  return NextResponse.json({ lead });
}
