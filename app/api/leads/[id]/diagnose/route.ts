import { NextResponse } from "next/server";

export async function POST(
  _req: Request,
  { params }: { params: { id: string } }
) {
  void params.id;
  return NextResponse.json({
    success: true,
    diagnosis: {
      score: 88,
      rarity: "RARO",
      presencaDigital: {
        score: 85,
        label: "BOM",
        descricao:
          "Presença digital sólida com site responsivo e perfil no Google Meu Negócio atualizado.",
      },
      clareza: {
        score: 72,
        label: "MÉDIO",
        descricao:
          "Proposta de valor presente mas sem destaque para diferenciais competitivos.",
      },
      cta: {
        score: 65,
        label: "MÉDIO",
        descricao:
          "Call-to-action existe mas não está posicionado estrategicamente nas páginas principais.",
      },
      reputacao: {
        score: 91,
        label: "EXCELENTE",
        descricao:
          "Alta reputação online com média de 4.9 estrelas e avaliações recentes positivas.",
      },
      gaps: [
        "Sem botão de WhatsApp visível na versão mobile",
        "Portfólio sem fotos de qualidade profissional",
        "Ausência de depoimentos em destaque na homepage",
        "Sem estratégia de conteúdo nas redes sociais",
      ],
      oportunidades: [
        "Implementar WhatsApp Business com resposta automática",
        "Criar galeria profissional com projetos concluídos",
        "Adicionar seção de depoimentos com fotos dos clientes",
        "Desenvolver conteúdo educativo sobre vidros e esquadrias",
      ],
      angulo:
        "Empresa com excelente reputação e serviço comprovado, mas com presença digital abaixo do potencial — a falta de facilidade de contato mobile está custando pelo menos 40% dos leads qualificados.",
    },
    xpGained: 25,
  });
}
