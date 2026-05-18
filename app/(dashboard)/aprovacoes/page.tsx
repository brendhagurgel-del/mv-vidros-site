"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { MetricCard } from "@/components/ui/metric-card"
import { StatusBadge } from "@/components/ui/status-badge"
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  Target,
  ChevronDown,
  Filter,
  Edit2,
  Zap,
  X,
  AlertCircle,
  ArrowUpRight,
  ExternalLink,
  Users,
  DollarSign,
} from "lucide-react"

// ─── Pixel corner helper ───────────────────────────────────────────
function PixelCorners({ color = "#FFD400", opacity = "60" }: { color?: string; opacity?: string }) {
  const style = { borderColor: `${color}${opacity === "60" ? "99" : "33"}` }
  return (
    <>
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2" style={style} aria-hidden="true" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2" style={style} aria-hidden="true" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2" style={style} aria-hidden="true" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2" style={style} aria-hidden="true" />
    </>
  )
}

// ─── Queue items data ───────────────────────────────────────────────
const queueItems = [
  {
    id: "1",
    name: "Academia Iron Fit",
    priority: "ALTA" as const,
    score: 92,
    category: "Fitness & Academia",
    location: "São Paulo, SP",
    waiting: "2h 14m",
  },
  {
    id: "2",
    name: "Clínica Mais Vida",
    priority: "MÉDIA" as const,
    score: 78,
    category: "Saúde & Clínicas",
    location: "Campinas, SP",
    waiting: "3h 02m",
  },
  {
    id: "3",
    name: "Pet Shop Amigo Fiel",
    priority: "MÉDIA" as const,
    score: 71,
    category: "Pet & Veterinária",
    location: "Ribeirão Preto, SP",
    waiting: "4h 30m",
  },
  {
    id: "4",
    name: "Auto Elétrica Forte",
    priority: "ALTA" as const,
    score: 88,
    category: "Automotivo",
    location: "Santo André, SP",
    waiting: "1h 47m",
  },
  {
    id: "5",
    name: "Restaurante Sabor Caseiro",
    priority: "BAIXA" as const,
    score: 64,
    category: "Alimentação",
    location: "Osasco, SP",
    waiting: "5h 20m",
  },
  {
    id: "6",
    name: "Studio Bella Donna",
    priority: "MÉDIA" as const,
    score: 69,
    category: "Beleza & Estética",
    location: "Guarulhos, SP",
    waiting: "3h 55m",
  },
]

// ─── Priority badge colors (inline, not using StatusBadge which doesn't have ALTA/MÉDIA/BAIXA) ───
const priorityConfig = {
  ALTA: { bg: "bg-[#FF4444]/10", text: "text-[#FF4444]", border: "border-[#FF4444]/30", dot: "bg-[#FF4444]" },
  MÉDIA: { bg: "bg-[#FFD400]/10", text: "text-[#FFD400]", border: "border-[#FFD400]/30", dot: "bg-[#FFD400]" },
  BAIXA: { bg: "bg-[#888888]/10", text: "text-[#888888]", border: "border-[#888888]/30", dot: "bg-[#888888]" },
}

function PriorityBadge({ priority }: { priority: "ALTA" | "MÉDIA" | "BAIXA" }) {
  const cfg = priorityConfig[priority]
  return (
    <span
      className={`inline-flex items-center gap-1 border font-display font-bold uppercase tracking-widest text-[9px] px-1.5 py-0.5 ${cfg.bg} ${cfg.text} ${cfg.border}`}
    >
      <span className={`w-1 h-1 flex-shrink-0 ${cfg.dot}`} aria-hidden="true" />
      {priority}
    </span>
  )
}

// ─── Avatar initials ────────────────────────────────────────────────
function Avatar({ name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase()
  const sizeClasses = { sm: "w-7 h-7 text-[10px]", md: "w-9 h-9 text-xs", lg: "w-11 h-11 text-sm" }
  return (
    <div
      className={`${sizeClasses[size]} bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center font-display font-bold text-[#FFD400] flex-shrink-0`}
    >
      {initials}
    </div>
  )
}

// ─── Segmented progress bar ─────────────────────────────────────────
function SegmentedProgress({ total, filled }: { total: number; filled: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-2 flex-1 ${i < filled ? "bg-[#FFD400]" : "bg-[#2A2A2A]"}`}
        />
      ))}
    </div>
  )
}

// ─── Main page ──────────────────────────────────────────────────────
export default function AprovacoesPage() {
  const [selectedId, setSelectedId] = useState("1")

  const selectedItem = queueItems.find((item) => item.id === selectedId) ?? queueItems[0]

  return (
    <div className="flex flex-col h-full bg-[#0D0D0D] overflow-hidden">
      <Header title="Aprovações" subtitle="revisão humana" />

      <div className="flex-1 overflow-y-auto">
        {/* ── Metric cards row ── */}
        <div className="grid grid-cols-5 gap-0 border-b border-[#1E1E1E]">
          {/* Card 1 – Pendentes */}
          <div className="border-r border-[#1E1E1E]">
            <MetricCard
              label="Pendentes"
              value={27}
              icon={Clock}
              color="yellow"
              trend={5}
            />
          </div>

          {/* Card 2 – Aprovadas Hoje */}
          <div className="border-r border-[#1E1E1E]">
            <MetricCard
              label="Aprovadas Hoje"
              value={18}
              icon={CheckCircle}
              color="white"
              trend={20}
            />
          </div>

          {/* Card 3 – Revisão Urgente */}
          <div className="border-r border-[#1E1E1E]">
            <MetricCard
              label="Revisão Urgente"
              value={3}
              icon={AlertTriangle}
              color="yellow"
            />
          </div>

          {/* Card 4 – Taxa de Aprovação */}
          <div className="border-r border-[#1E1E1E]">
            <MetricCard
              label="Taxa de Aprovação"
              value={87}
              suffix="%"
              icon={Target}
              color="blue"
            />
          </div>

          {/* Card 5 – Progresso XP (custom) */}
          <div className="relative p-4 bg-[#0A0A0A] hover:bg-[#0E0E0E] transition-colors">
            <PixelCorners />
            <p className="text-[10px] font-display font-bold text-[#888888] uppercase tracking-widest mb-3">
              Progresso de Aprovações
            </p>
            <p className="font-mono text-[#FFD400] text-xs font-bold mb-2">760/1000 XP</p>
            <SegmentedProgress total={16} filled={12} />
            <p className="text-[10px] font-display text-[#888888] mt-2">
              COMBO DE QUALIDADE 🔥{" "}
              <span className="text-[#FFD400] font-bold">x5</span>{" "}
              <span className="text-white">Muito bom!</span>
            </p>
          </div>
        </div>

        {/* ── Main 3-column layout ── */}
        <div className="flex gap-0 flex-1 border-b border-[#1E1E1E]">
          {/* ── LEFT: Queue ── */}
          <div className="w-[260px] border-r border-[#1E1E1E] flex flex-col bg-[#0A0A0A]">
            {/* Queue header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-[#1E1E1E]">
              <p className="text-[10px] font-display font-bold text-white uppercase tracking-widest">
                Fila de Aprovações{" "}
                <span className="text-[#FFD400]">(27)</span>
              </p>
              <button className="w-6 h-6 border border-[#2A2A2A] bg-[#111111] flex items-center justify-center hover:border-[#FFD400]/40 transition-colors">
                <Filter size={10} className="text-[#888888]" />
              </button>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-1 px-4 py-2 border-b border-[#1E1E1E]">
              <span className="text-[9px] font-mono text-[#555555]">Ordenar:</span>
              <button className="flex items-center gap-0.5 text-[9px] font-mono text-[#888888] hover:text-white transition-colors">
                Mais antigos <ChevronDown size={9} />
              </button>
            </div>

            {/* Queue items */}
            <div className="flex-1 overflow-y-auto">
              {queueItems.map((item) => {
                const isSelected = item.id === selectedId
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedId(item.id)}
                    className={`w-full text-left px-3 py-3 border-b border-[#1E1E1E] transition-colors ${
                      isSelected
                        ? "bg-[#111111] border-l-2 border-l-[#FFD400]"
                        : "hover:bg-[#0E0E0E] border-l-2 border-l-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Avatar name={item.name} size="sm" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1 justify-between">
                          <p className="text-[11px] font-display font-bold text-white truncate">{item.name}</p>
                          <span className="text-[10px] font-mono text-[#FFD400] flex-shrink-0">{item.score}</span>
                        </div>
                        <PriorityBadge priority={item.priority} />
                      </div>
                    </div>
                    <p className="text-[9px] font-mono text-[#555555] mb-0.5 pl-9">{item.category}</p>
                    <p className="text-[9px] font-mono text-[#555555] mb-1 pl-9">{item.location}</p>
                    <div className="flex items-center justify-between pl-9">
                      <div className="flex items-center gap-1 text-[9px] font-mono text-[#888888]">
                        <Clock size={9} />
                        <span>{item.waiting} aguardando</span>
                      </div>
                      <ArrowUpRight size={10} className="text-[#555555]" />
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Ver toda fila */}
            <div className="p-3 border-t border-[#1E1E1E]">
              <button className="w-full text-[9px] font-mono text-[#FFD400] hover:text-white transition-colors tracking-widest uppercase flex items-center justify-center gap-1">
                VER TODA FILA <ArrowUpRight size={9} />
              </button>
            </div>
          </div>

          {/* ── CENTER: Message review ── */}
          <div className="flex-1 flex flex-col bg-[#0D0D0D] overflow-y-auto">
            {/* Center header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[#1E1E1E]">
              <p className="text-[10px] font-display font-bold text-white uppercase tracking-widest">
                Mensagem em Revisão
              </p>
              <div className="flex items-center gap-3">
                <span className="font-mono text-[#FFD400] text-xs font-bold">#4587</span>
                <button className="flex items-center gap-1 px-2.5 py-1.5 border border-[#2A2A2A] bg-[#111111] hover:border-[#3A3A3A] transition-colors text-[10px] font-display font-bold text-white uppercase tracking-widest">
                  <Edit2 size={9} />
                  Editar
                </button>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* Diagnóstico IA */}
              <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-4">
                <PixelCorners />
                <p className="text-[9px] font-mono text-[#555555] uppercase tracking-widest mb-3">
                  Diagnóstico IA
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {/* Principais Dores */}
                  <div>
                    <p className="text-[9px] font-display font-bold text-[#888888] uppercase tracking-widest mb-2">
                      Principais Dores
                    </p>
                    <ul className="space-y-1.5">
                      {[
                        { text: "Captação de novos alunos", color: "#FF4444" },
                        { text: "Retenção de mensalistas", color: "#FF6B00" },
                        { text: "Concorrência local forte", color: "#FF6B00" },
                        { text: "Presença digital fraca", color: "#888888" },
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span
                            className="w-1.5 h-1.5 flex-shrink-0 mt-1"
                            style={{ backgroundColor: item.color }}
                            aria-hidden="true"
                          />
                          <span className="text-[10px] font-mono text-[#888888]">{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Oportunidade */}
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-[9px] font-display font-bold text-[#888888] uppercase tracking-widest mb-3">
                      Oportunidade
                    </p>
                    <div className="relative w-16 h-16 flex items-center justify-center border-2 border-[#00CC66]/40">
                      <span className="font-mono font-bold text-2xl text-[#00CC66]">92</span>
                      <PixelCorners color="#00CC66" opacity="40" />
                    </div>
                    <p className="text-[9px] font-mono text-[#00CC66] mt-2 tracking-widest">Excelente</p>
                  </div>

                  {/* Ângulo Recomendado */}
                  <div>
                    <p className="text-[9px] font-display font-bold text-[#888888] uppercase tracking-widest mb-2">
                      Ângulo Recomendado
                    </p>
                    <div className="flex items-start gap-2">
                      <Target size={12} className="text-[#00B2FF] flex-shrink-0 mt-0.5" />
                      <p className="text-[10px] font-mono text-[#888888] leading-relaxed">
                        Abordagem focada em resultados mensuráveis e depoimentos locais para superar a desconfiança e
                        aumentar conversão de visitantes em alunos.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mensagem Sugerida */}
              <div className="relative border border-[#1E1E1E] bg-[#0A0A0A]">
                <PixelCorners />
                <div className="flex items-center justify-between p-4 pb-3 border-b border-[#1E1E1E]">
                  <p className="text-[9px] font-display font-bold text-[#888888] uppercase tracking-widest">
                    Mensagem Sugerida
                  </p>
                  <span className="text-[9px] font-display font-bold px-2 py-1 bg-[#FFD400]/10 text-[#FFD400] border border-[#FFD400]/30 uppercase tracking-widest">
                    Sugerida pela IA
                  </span>
                </div>

                <div className="p-4">
                  <p className="text-[12px] font-mono text-[#CCCCCC] leading-relaxed whitespace-pre-line">
                    {`Olá, tudo bem? Meu nome é Rafael e trabalho com estratégias de captação para academias aqui em São Paulo.

Notei que a Academia Iron Fit tem uma localização privilegiada no bairro e uma estrutura impressionante — mas percebi que talvez vocês ainda não estejam aproveitando todo o potencial do digital para atrair novos alunos.

Temos ajudado academias similares a aumentar sua captação em até 40% em 90 dias, com estratégias focadas na região de vocês. Posso te mostrar um caso de sucesso de uma academia em SP que saiu de 120 para 168 alunos em apenas 3 meses?

Seria possível uma conversa rápida de 15 minutos essa semana?`}
                  </p>
                </div>

                {/* Blue info bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 bg-[#00B2FF]/5 border-t border-[#00B2FF]/20">
                  <AlertCircle size={11} className="text-[#00B2FF] flex-shrink-0" />
                  <p className="text-[10px] font-mono text-[#00B2FF]">
                    Texto gerado pela IA. Revise antes de aprovar o envio.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1.5 py-3 bg-[#FFD400] text-black font-display font-bold uppercase tracking-widest text-xs hover:bg-[#FFD400]/90 transition-colors">
                  <Zap size={12} />
                  APROVAR MENSAGEM ⚡
                </button>
                <button className="flex items-center justify-center gap-1.5 px-4 py-3 border border-[#2A2A2A] bg-[#111111] text-white font-display font-bold uppercase tracking-widest text-xs hover:border-[#3A3A3A] transition-colors">
                  <Edit2 size={11} />
                  SOLICITAR AJUSTE
                </button>
                <button className="flex items-center justify-center gap-1.5 px-4 py-3 border border-[#FF4444]/40 bg-[#FF4444]/5 text-[#FF4444] font-display font-bold uppercase tracking-widest text-xs hover:border-[#FF4444]/60 transition-colors">
                  <X size={11} />
                  REJEITAR
                </button>
              </div>

              <p className="text-[9px] font-mono text-[#444444] text-center -mt-2">
                Aprovar e enviar para próxima etapa
              </p>
            </div>
          </div>

          {/* ── RIGHT: Lead context ── */}
          <div className="w-[240px] border-l border-[#1E1E1E] bg-[#0A0A0A] flex flex-col overflow-y-auto">
            {/* Right header */}
            <div className="px-4 py-3 border-b border-[#1E1E1E]">
              <p className="text-[10px] font-display font-bold text-white uppercase tracking-widest">
                Contexto do Lead
              </p>
            </div>

            <div className="p-4 space-y-4">
              {/* Lead card */}
              <div className="relative border border-[#1E1E1E] bg-[#111111] p-3">
                <PixelCorners />
                <div className="flex items-center gap-2 mb-2">
                  <Avatar name={selectedItem.name} size="md" />
                  <div>
                    <p className="text-[11px] font-display font-bold text-white leading-tight">{selectedItem.name}</p>
                    <PriorityBadge priority={selectedItem.priority} />
                  </div>
                </div>
                <p className="text-[9px] font-mono text-[#555555] mb-0.5">{selectedItem.category}</p>
                <p className="text-[9px] font-mono text-[#555555] mb-2">{selectedItem.location}</p>
                <button className="flex items-center gap-1 text-[9px] font-mono text-[#00B2FF] hover:text-[#00B2FF]/80 transition-colors">
                  <ExternalLink size={9} />
                  www.academiaironfit.com.br
                </button>
              </div>

              {/* Stats */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#555555]">
                    <Users size={10} className="text-[#888888]" />
                    Funcionários
                  </div>
                  <span className="text-[9px] font-mono text-[#888888]">15-30</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[9px] font-mono text-[#555555]">
                    <DollarSign size={10} className="text-[#888888]" />
                    Faixa de preço
                  </div>
                  <span className="text-[9px] font-mono text-[#888888]">R$100-200</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono text-[#555555]">Redes sociais</span>
                  <div className="flex items-center gap-1.5">
                    {["in", "ig", "fb"].map((net) => (
                      <span
                        key={net}
                        className="text-[8px] font-mono px-1 py-0.5 bg-[#1A1A1A] border border-[#2A2A2A] text-[#888888]"
                      >
                        {net}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Última atividade */}
              <div className="border-t border-[#1E1E1E] pt-3">
                <p className="text-[9px] font-display font-bold text-[#555555] uppercase tracking-widest mb-2">
                  Última Atividade
                </p>
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 bg-[#00CC66] flex-shrink-0 mt-1" aria-hidden="true" />
                  <div>
                    <p className="text-[10px] font-mono text-[#888888] leading-relaxed">
                      Lead qualificado e pronto para abordagem personalizada.
                    </p>
                    <p className="text-[8px] font-mono text-[#444444] mt-1">Hoje, 10:32</p>
                  </div>
                </div>
              </div>

              {/* Histórico recente */}
              <div className="border-t border-[#1E1E1E] pt-3">
                <p className="text-[9px] font-display font-bold text-[#555555] uppercase tracking-widest mb-2">
                  Histórico Recente
                </p>
                <div className="space-y-2">
                  {[
                    { name: "Clínica Sorriso Perfeito", status: "APROVADA" as const, time: "Hoje, 09:15" },
                    { name: "Pet Shop Amigo Fiel", status: "PENDENTE" as const, time: "Hoje, 08:47" },
                    { name: "Oficina Mecânica Brasil", status: "REJEITADA" as const, time: "Ontem, 16:22" },
                    { name: "Studio Bella Donna", status: "APROVADA" as const, time: "Ontem, 14:10" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-[9px] font-mono text-[#888888] truncate">{item.name}</p>
                        <StatusBadge status={item.status} />
                      </div>
                      <p className="text-[8px] font-mono text-[#444444] flex-shrink-0 text-right">{item.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ver todo histórico */}
              <div className="border-t border-[#1E1E1E] pt-3">
                <button className="w-full text-[9px] font-mono text-[#FFD400] hover:text-white transition-colors tracking-widest uppercase flex items-center justify-center gap-1">
                  VER TODO HISTÓRICO <ArrowUpRight size={9} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom warning bar ── */}
        <div className="flex items-center gap-3 px-5 py-3 bg-[#FFD400]/5 border-t border-[#FFD400]/20">
          <AlertTriangle size={14} className="text-[#FFD400] flex-shrink-0" />
          <div className="flex-1">
            <p className="text-[11px] font-display font-bold text-[#FFD400] uppercase tracking-widest">
              Revisão Humana Recomendada
            </p>
            <p className="text-[9px] font-mono text-[#888888]">
              Todas as mensagens geradas por IA passam por revisão humana antes do envio para garantir qualidade e
              conformidade.
            </p>
          </div>
          {/* LM icon */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className="text-[10px] font-mono font-bold text-[#FFD400] tracking-widest">LM</span>
          </div>
        </div>
      </div>
    </div>
  )
}
