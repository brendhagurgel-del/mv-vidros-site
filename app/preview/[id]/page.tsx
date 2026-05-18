import { MapPin, Clock, Globe, AtSign, Phone, RefreshCw, SendHorizontal, Zap, Shield, Target, Star, MousePointer, CheckCircle2 } from "lucide-react"
import { RarityBadge } from "@/components/ui/rarity-badge"
import { PixelProgress } from "@/components/ui/pixel-progress"
import { LMLogoFull } from "@/components/ui/lm-logo"

interface PageProps {
  params: { id: string }
}

export async function generateMetadata({ params }: PageProps) {
  return {
    title: `Academia Iron Fit — Prévia de Diagnóstico | LeadMachine AI`,
    description: "Excelente oportunidade identificada. Alta presença local e grande potencial de conversão.",
  }
}

function PixelCorners({ color = "#FFD400" }: { color?: string }) {
  return (
    <>
      <span className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2" style={{ borderColor: color }} />
      <span className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r-2 border-t-2" style={{ borderColor: color }} />
      <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2" style={{ borderColor: color }} />
      <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2" style={{ borderColor: color }} />
    </>
  )
}

const MOCK_LEAD = {
  id: "1",
  name: "Academia Iron Fit",
  initial: "AF",
  color: "#FF4444",
  city: "São Paulo",
  state: "SP",
  category: "Academias e Personal Training",
  score: 92,
  rarity: "LENDÁRIO" as const,
  analyzedAt: "Hoje, 10:32",
  completude: 92,
  diagnosticText: "Excelente oportunidade identificada. Alta presença local e grande potencial de conversão. Presença nas redes sociais ativa com engajamento acima da média do setor.",
  contacts: {
    phone: "(11) 98765-4321",
    email: "contato@academiaiornfit.com.br",
    website: "www.academiaiornfit.com.br",
    instagram: "@academiaiornfit",
  },
  diagnostics: [
    {
      icon: "Globe",
      label: "Presença Digital",
      score: 88,
      quality: "BOM",
      qualityColor: "#00B2FF",
      text: "Google Meu Negócio verificado, site ativo e redes atualizadas.",
    },
    {
      icon: "Target",
      label: "Clareza da Oferta",
      score: 74,
      quality: "MÉDIO",
      qualityColor: "#FFD400",
      text: "Proposta de valor presente mas poderia ser mais direta nas páginas de venda.",
    },
    {
      icon: "MousePointer",
      label: "CTA & Conversão",
      score: 62,
      quality: "MÉDIO",
      qualityColor: "#FFD400",
      text: "CTAs existem mas não seguem boas práticas de urgência e especificidade.",
    },
    {
      icon: "Star",
      label: "Reputação & Confiança",
      score: 96,
      quality: "EXCELENTE",
      qualityColor: "#00CC66",
      text: "4,6★ com 128 avaliações. Alta taxa de resposta a avaliações.",
    },
  ],
  message: `Oi, tudo bem? 👋\n\nSou da LeadMachine AI e estamos analisando negócios como o da *Academia Iron Fit* que têm grande potencial de crescimento online.\n\nIdentificamos que vocês têm ótima reputação (4,6★!) mas alguns pontos de melhoria na captação digital que podem gerar +30% de clientes.\n\nPosso te mostrar um diagnóstico completo gratuito? 🚀`,
  gaps: [
    "Site sem formulário de captura de leads",
    "Sem pixel de rastreamento (Meta/Google)",
    "Stories do Instagram sem CTA claro",
    "Nenhuma campanha de remarketing ativa",
    "Sem landing page específica para matrícula",
  ],
  insights: [
    "Ativo no Google Meu Negócio",
    "Avaliação média: 4,6★ (128 avaliações)",
    "Posta no Instagram 3x por semana",
    "Concorrência local: Média",
  ],
}

function DiagnosticIcon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    Globe: <Globe size={20} className="text-[#00B2FF]" />,
    Target: <Target size={20} className="text-[#FFD400]" />,
    MousePointer: <MousePointer size={20} className="text-[#FFD400]" />,
    Star: <Star size={20} className="text-[#00CC66]" />,
  }
  return <>{icons[name] ?? <Zap size={20} className="text-[#FFD400]" />}</>
}

export default async function PreviewPage({ params }: PageProps) {
  const lead = MOCK_LEAD

  return (
    <div className="min-h-screen bg-[#0D0D0D] pb-24">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 border-b border-[#1E1E1E] bg-[#0A0A0A]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          <LMLogoFull />
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1.5 border border-[#2A2A2A] px-3 py-1.5 text-[11px] tracking-widest text-[#888] transition-colors hover:border-[#444] hover:text-white"
              style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
            >
              <Globe size={12} />
              COMPARTILHAR PRÉVIA
            </button>
            <button
              className="flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold tracking-widest text-black transition-opacity hover:opacity-90"
              style={{
                fontFamily: "var(--font-display, Rajdhani, sans-serif)",
                backgroundColor: "#FFD400",
              }}
            >
              <Zap size={12} />
              SOLICITAR PROPOSTA
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-6 py-6 space-y-6">
        {/* ── Breadcrumb ── */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {["·", "—", "·", "·", "—", "·", "—", "·", "·"].map((d, i) => (
              <span key={i} className="text-[#00B2FF] text-[10px]">{d}</span>
            ))}
          </div>
          <span
            className="text-[11px] tracking-widest text-[#00B2FF]"
            style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
          >
            PRÉVIA PÚBLICA DE LEAD
          </span>
          <div className="flex items-center gap-1">
            {["·", "—", "·", "·", "—", "·", "—", "·", "·"].map((d, i) => (
              <span key={i} className="text-[#00B2FF] text-[10px]">{d}</span>
            ))}
          </div>
        </div>

        {/* ── Hero Section ── */}
        <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-6">
          <PixelCorners color="#FFD400" />
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {/* Left: Company info */}
            <div className="flex items-start gap-4">
              <div
                className="flex h-16 w-16 flex-shrink-0 items-center justify-center border border-[#2A2A2A] text-xl font-bold text-white"
                style={{
                  backgroundColor: `${lead.color}22`,
                  borderColor: `${lead.color}44`,
                  color: lead.color,
                  fontFamily: "var(--font-display, Rajdhani, sans-serif)",
                }}
              >
                {lead.initial}
              </div>
              <div>
                <h1
                  className="text-3xl font-bold leading-tight text-white"
                  style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
                >
                  {lead.name}
                </h1>
                <div className="mt-1 flex items-center gap-4 text-[12px]">
                  <span className="flex items-center gap-1 text-[#00B2FF]">
                    <MapPin size={12} />
                    {lead.city}, {lead.state}
                  </span>
                  <span
                    className="text-[#00B2FF]"
                    style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
                  >
                    {lead.category}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-[#555]">
                  <Clock size={11} />
                  <span>Analisado: {lead.analyzedAt}</span>
                </div>
                <p
                  className="mt-3 max-w-sm text-[12px] leading-relaxed text-[#777]"
                  style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
                >
                  {lead.diagnosticText}
                </p>
              </div>
            </div>

            {/* Right: Score */}
            <div className="flex flex-col items-center justify-center border border-[#1A1A1A] p-4 text-center">
              <p
                className="mb-1 text-[10px] tracking-widest text-[#555]"
                style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
              >
                SCORE DE OPORTUNIDADE
              </p>
              <div className="flex items-end gap-1">
                <span
                  className="leading-none"
                  style={{
                    fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    fontSize: "72px",
                    fontWeight: 700,
                    color: "#FFD400",
                    lineHeight: 1,
                  }}
                >
                  {lead.score}
                </span>
                <span
                  className="mb-2 text-2xl text-[#444]"
                  style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}
                >
                  /100
                </span>
              </div>
              <div className="mt-2">
                <RarityBadge rarity={lead.rarity} size="lg" />
              </div>
              <p
                className="mt-2 text-[10px] text-[#555]"
                style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
              >
                Top 5% de todos os leads analisados
              </p>
              <div className="mt-3 flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={i < 5 ? "fill-[#FFD400] text-[#FFD400]" : "text-[#333]"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Diagnóstico Rápido ── */}
        <div>
          <p
            className="mb-3 text-[11px] tracking-widest text-[#555]"
            style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
          >
            DIAGNÓSTICO RÁPIDO
          </p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {lead.diagnostics.map((d) => (
              <div key={d.label} className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-3">
                <PixelCorners color={d.qualityColor} />
                <div className="mb-2 flex items-center gap-2">
                  <DiagnosticIcon name={d.icon} />
                  <span
                    className="text-[10px] tracking-widest text-[#666]"
                    style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
                  >
                    {d.label.toUpperCase()}
                  </span>
                </div>
                <div className="mb-1 flex items-baseline gap-1">
                  <span
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                      color: d.qualityColor,
                    }}
                  >
                    {d.score}
                  </span>
                  <span className="text-[11px] text-[#444]">/100</span>
                  <span
                    className="ml-1 text-[9px] font-bold tracking-widest"
                    style={{
                      fontFamily: "var(--font-display, Rajdhani, sans-serif)",
                      color: d.qualityColor,
                    }}
                  >
                    {d.quality}
                  </span>
                </div>
                <p
                  className="mb-2 text-[10px] leading-relaxed text-[#666]"
                  style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
                >
                  {d.text}
                </p>
                <PixelProgress
                  value={d.score}
                  color={d.score >= 85 ? "green" : d.score >= 65 ? "yellow" : "blue"}
                  size="sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Prévia Mensagem + Prévia Landing ── */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* WhatsApp bubble */}
          <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-4">
            <PixelCorners color="#00CC66" />
            <p
              className="mb-3 text-[10px] tracking-widest text-[#555]"
              style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
            >
              PRÉVIA DA MENSAGEM
            </p>
            <div className="rounded-none border border-[#00CC66]/20 bg-[#0a1a0a] p-4">
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center bg-[#FFD400] text-[10px] font-bold text-black">
                  LM
                </div>
                <div>
                  <p
                    className="text-[11px] font-bold text-white"
                    style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
                  >
                    LeadMachine AI
                  </p>
                  <p className="text-[9px] text-[#00CC66]">● online</p>
                </div>
              </div>
              <div className="border-l-2 border-[#00CC66] bg-[#111] pl-3 py-2 pr-2">
                {lead.message.split("\n").map((line, i) => (
                  <p
                    key={i}
                    className="text-[11px] leading-relaxed text-[#CCC]"
                    style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
                  >
                    {line || <>&nbsp;</>}
                  </p>
                ))}
              </div>
              <div className="mt-2 flex justify-end">
                <span className="text-[9px] text-[#555]">10:32 ✓✓</span>
              </div>
            </div>
            <button
              className="mt-3 flex w-full items-center justify-center gap-1.5 border border-[#00CC66]/30 py-1.5 text-[10px] tracking-widest text-[#00CC66] transition-colors hover:bg-[#00CC66]/10"
              style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
            >
              <RefreshCw size={11} />
              GERAR NOVA MENSAGEM
            </button>
          </div>

          {/* Landing page mockup */}
          <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-4">
            <PixelCorners color="#00B2FF" />
            <p
              className="mb-3 text-[10px] tracking-widest text-[#555]"
              style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
            >
              PRÉVIA LANDING PAGE
            </p>
            {/* Mockup */}
            <div className="border border-[#1A1A1A] bg-[#080808] p-3 space-y-2">
              {/* Fake nav */}
              <div className="flex items-center justify-between border-b border-[#1A1A1A] pb-2">
                <div className="h-3 w-20 bg-[#2A2A2A]" />
                <div className="flex gap-2">
                  {[1, 2, 3].map((i) => <div key={i} className="h-2 w-10 bg-[#1E1E1E]" />)}
                </div>
              </div>
              {/* Fake hero */}
              <div
                className="flex h-20 items-center justify-center border border-dashed text-[10px] tracking-widest"
                style={{
                  borderColor: "#FFD400",
                  color: "#FFD400",
                  fontFamily: "var(--font-display, Rajdhani, sans-serif)",
                  backgroundColor: "#FFD40011",
                }}
              >
                HERO COM CTA ESTRATÉGICO
              </div>
              {/* Fake content */}
              <div className="grid grid-cols-3 gap-1">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="space-y-1 p-2 border border-[#1A1A1A]">
                    <div className="h-2 w-full bg-[#2A2A2A]" />
                    <div className="h-2 w-3/4 bg-[#1E1E1E]" />
                    <div className="h-2 w-1/2 bg-[#1A1A1A]" />
                  </div>
                ))}
              </div>
              {/* CTA button mockup */}
              <div className="flex justify-center">
                <div className="bg-[#FFD400] px-4 py-1 text-[9px] font-bold text-black">
                  QUERO COMEÇAR
                </div>
              </div>
            </div>
            {/* Improvement tags */}
            <div className="mt-3 flex flex-wrap gap-1.5">
              {["Design moderno", "Prova social", "CTA estratégico", "Formulário de captura", "Pixel Meta"].map((tag) => (
                <span
                  key={tag}
                  className="border border-[#00B2FF]/30 px-2 py-0.5 text-[9px] text-[#00B2FF]"
                  style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
                >
                  + {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── Informações + GAPs ── */}
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {/* Contact info */}
          <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-4">
            <PixelCorners color="#FFD400" />
            <p
              className="mb-3 text-[10px] tracking-widest text-[#555]"
              style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
            >
              INFORMAÇÕES DA EMPRESA
            </p>
            <div className="space-y-2">
              {lead.contacts.website && (
                <div className="flex items-center gap-3 border border-[#1A1A1A] px-3 py-2">
                  <Globe size={13} className="text-[#00CC66]" />
                  <a
                    href={`https://${lead.contacts.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-[11px] text-[#CCC] hover:text-white"
                    style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}
                  >
                    {lead.contacts.website}
                  </a>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00CC66]" />
                </div>
              )}
              {lead.contacts.instagram && (
                <div className="flex items-center gap-3 border border-[#1A1A1A] px-3 py-2">
                  <AtSign size={13} className="text-[#00CC66]" />
                  <a
                    href={`https://instagram.com/${lead.contacts.instagram.replace("@", "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-[11px] text-[#CCC] hover:text-white"
                    style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}
                  >
                    {lead.contacts.instagram}
                  </a>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00CC66]" />
                </div>
              )}
              {lead.contacts.phone && (
                <div className="flex items-center gap-3 border border-[#1A1A1A] px-3 py-2">
                  <Phone size={13} className="text-[#00CC66]" />
                  <a
                    href={`https://wa.me/${lead.contacts.phone.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-[11px] text-[#CCC] hover:text-white"
                    style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}
                  >
                    {lead.contacts.phone}
                  </a>
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00CC66]" />
                </div>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <p
                className="text-[10px] tracking-widest text-[#555]"
                style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
              >
                INSIGHTS IDENTIFICADOS
              </p>
              {lead.insights.map((insight, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 size={12} className="mt-0.5 flex-shrink-0 text-[#00CC66]" />
                  <span
                    className="text-[11px] text-[#888]"
                    style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
                  >
                    {insight}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* GAPs */}
          <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-4">
            <PixelCorners color="#FF6B00" />
            <p
              className="mb-1 text-[10px] tracking-widest text-[#555]"
              style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
            >
              GAPS & OPORTUNIDADES
            </p>
            <p
              className="mb-3 text-[11px] text-[#444]"
              style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
            >
              Pontos identificados que precisam de atenção imediata:
            </p>
            <div className="space-y-2">
              {lead.gaps.map((gap, i) => (
                <div key={i} className="flex items-start gap-2.5 border border-[#FF6B0011] bg-[#FF6B000A] px-3 py-2">
                  <span
                    className="mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center border border-[#FF6B00] text-[8px] font-bold text-[#FF6B00]"
                    style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}
                  >
                    {i + 1}
                  </span>
                  <span
                    className="text-[11px] leading-relaxed text-[#AAA]"
                    style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
                  >
                    {gap}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 border border-[#FFD400]/20 bg-[#FFD40008] p-3">
              <p
                className="text-[10px] font-bold tracking-widest text-[#FFD400]"
                style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
              >
                ⚡ POTENCIAL DE CRESCIMENTO
              </p>
              <p
                className="mt-1 text-[11px] text-[#888]"
                style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
              >
                Corrigindo esses {lead.gaps.length} gaps, estimamos +35% de conversão em 90 dias.
              </p>
            </div>
          </div>
        </div>

        {/* ── Machine Banner ── */}
        <div className="relative border border-[#FFD400]/20 bg-[#FFD40008] p-4">
          <PixelCorners color="#FFD400" />
          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-[11px] font-bold tracking-widest text-[#FFD400]"
                style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
              >
                A MÁQUINA NUNCA PARA!
              </p>
              <p
                className="mt-0.5 text-[11px] text-[#666]"
                style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
              >
                <span className="text-white font-bold">847</span> leads processados hoje ·{" "}
                <span className="text-[#00B2FF] font-bold">23</span> em análise agora
              </p>
            </div>
            <div className="w-48">
              <PixelProgress value={73} color="yellow" size="sm" />
              <p className="mt-1 text-right text-[9px] text-[#555]">73% da meta diária</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Fixed Footer ── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#FFD400]/20 bg-[#0A0A0A]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
          {/* Value props */}
          <div className="hidden items-center gap-6 md:flex">
            {[
              { icon: <Shield size={14} className="text-[#00CC66]" />, text: "Diagnóstico 100% Gratuito" },
              { icon: <Zap size={14} className="text-[#FFD400]" />, text: "Resultados em 7 dias" },
              { icon: <Target size={14} className="text-[#00B2FF]" />, text: "Estratégia personalizada" },
              { icon: <Star size={14} className="text-[#FFD400]" />, text: "+500 negócios atendidos" },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                {icon}
                <span
                  className="text-[10px] text-[#666]"
                  style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              className="flex items-center gap-1.5 border border-[#333] px-4 py-2 text-[10px] tracking-widest text-[#AAA] transition-colors hover:border-[#555] hover:text-white"
              style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
            >
              <RefreshCw size={12} />
              GERAR NOVA MENSAGEM
            </button>
            <button
              className="flex items-center gap-1.5 px-4 py-2 text-[11px] font-bold tracking-widest text-black transition-opacity hover:opacity-90"
              style={{
                fontFamily: "var(--font-display, Rajdhani, sans-serif)",
                backgroundColor: "#00CC66",
              }}
            >
              <SendHorizontal size={13} />
              ENVIAR PARA APROVAÇÃO
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
