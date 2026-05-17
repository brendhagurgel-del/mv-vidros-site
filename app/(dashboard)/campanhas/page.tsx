"use client"

import { useState } from "react"
import { clsx } from "clsx"
import {
  Megaphone,
  Calendar,
  Rocket,
  MessageSquare,
  Settings,
} from "lucide-react"
import {
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts"

import { Header } from "@/components/layout/header"
import { MetricCard } from "@/components/ui/metric-card"
import { StatusBadge, type Status } from "@/components/ui/status-badge"
import { LMLogoIcon } from "@/components/ui/lm-logo"

const sparkData = [
  { value: 20 },
  { value: 35 },
  { value: 28 },
  { value: 45 },
  { value: 38 },
  { value: 55 },
]

// ─── Toggle ────────────────────────────────────────────────────────────────
function Toggle({
  on,
  onToggle,
}: {
  on: boolean
  onToggle: () => void
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={on}
      className="focus:outline-none"
    >
      <div
        className={clsx(
          "w-8 h-4 relative transition-colors duration-150",
          on ? "bg-[#FFD400]" : "bg-[#2A2A2A]"
        )}
      >
        <div
          className={clsx(
            "absolute top-0.5 w-3 h-3 bg-black transition-all duration-150",
            on ? "left-[18px]" : "left-0.5"
          )}
        />
      </div>
    </button>
  )
}

// ─── Input styles ───────────────────────────────────────────────────────────
const inputCls =
  "bg-[#111111] border border-[#1E1E1E] text-[11px] font-body text-white px-3 py-2 outline-none focus:border-[#FFD400]/40 w-full"

// ─── Sparkline mini ─────────────────────────────────────────────────────────
function MiniSpark({ color }: { color: string }) {
  return (
    <ResponsiveContainer width={60} height={40}>
      <AreaChart data={sparkData} margin={{ top: 2, right: 0, left: 0, bottom: 2 }}>
        <defs>
          <linearGradient id={`grad-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="value"
          stroke={color}
          strokeWidth={1.5}
          fill={`url(#grad-${color.replace("#", "")})`}
          dot={false}
          isAnimationActive={false}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// ─── Campaign table data ─────────────────────────────────────────────────────
const campanhas: {
  nome: string
  status: Status
  segmento: string
  ultima: string
  proxima: string
  perf: string
}[] = [
  {
    nome: "Academia Top SP",
    status: "ATIVA",
    segmento: "Academias / Saúde",
    ultima: "Hoje 14:30",
    proxima: "Amanhã 08:00",
    perf: "31.2%",
  },
  {
    nome: "Pet Shop Curitiba",
    status: "AGENDADA",
    segmento: "Pet Shop",
    ultima: "Ontem 18:00",
    proxima: "Hoje 20:00",
    perf: "24.8%",
  },
  {
    nome: "Auto Center BH",
    status: "PAUSADA",
    segmento: "Automotivo",
    ultima: "12 Mai 10:15",
    proxima: "—",
    perf: "18.5%",
  },
  {
    nome: "Restaurantes RJ",
    status: "ATIVA",
    segmento: "Alimentação",
    ultima: "Hoje 09:00",
    proxima: "Amanhã 09:00",
    perf: "28.9%",
  },
  {
    nome: "Salões BSB",
    status: "CONCLUÍDA",
    segmento: "Beleza",
    ultima: "10 Mai 16:00",
    proxima: "—",
    perf: "22.1%",
  },
]

// ─── Pipeline steps ──────────────────────────────────────────────────────────
const pipelineSteps = [
  {
    n: 1,
    label: "BUSCAR LEADS",
    desc: "Coletando dados de empresas...",
    current: 125,
    total: 150,
    active: true,
  },
  {
    n: 2,
    label: "DIAGNOSTICAR",
    desc: "Analisando necessidades...",
    current: 98,
    total: 125,
    active: true,
  },
  {
    n: 3,
    label: "GERAR MENSAGEM",
    desc: "Criando mensagens personalizadas...",
    current: 72,
    total: 98,
    active: true,
  },
  {
    n: 4,
    label: "REVISÃO HUMANA",
    desc: "Aguardando aprovação...",
    current: 23,
    total: 72,
    active: false,
  },
]

// ─── Segmented progress bar ───────────────────────────────────────────────────
function SegmentedBar({
  current,
  total,
  active,
}: {
  current: number
  total: number
  active: boolean
}) {
  const segments = 12
  const filled = Math.round((current / total) * segments)
  return (
    <div className="flex gap-0.5 mt-2">
      {Array.from({ length: segments }).map((_, i) => (
        <div
          key={i}
          className={clsx(
            "h-1 flex-1",
            i < filled
              ? active
                ? "bg-[#FFD400]"
                : "bg-[#444444]"
              : "bg-[#222222]"
          )}
        />
      ))}
    </div>
  )
}

// ─── Desempenho mini-stat ─────────────────────────────────────────────────────
function Desemp({
  label,
  value,
  trend,
  color,
}: {
  label: string
  value: string
  trend: string
  color: string
}) {
  const pos = trend.startsWith("+")
  return (
    <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-3">
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-[#FFD400]/50" />
      <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-[#FFD400]/50" />
      <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-[#FFD400]/50" />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-[#FFD400]/50" />
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-[9px] font-display font-bold text-[#555555] uppercase tracking-widest leading-tight">
            {label}
          </p>
          <p
            className="font-mono font-bold text-sm leading-tight mt-0.5"
            style={{ color }}
          >
            {value}
          </p>
          <p
            className={clsx(
              "text-[9px] font-mono mt-0.5",
              pos ? "text-[#00CC66]" : "text-[#FF4444]"
            )}
          >
            {trend}
          </p>
        </div>
        <MiniSpark color={color} />
      </div>
    </div>
  )
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default function CampanhasPage() {
  const [toggles, setToggles] = useState({
    buscar: true,
    diagnosticar: true,
    gerar: true,
    revisao: false,
  })

  function tog(key: keyof typeof toggles) {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="flex flex-col h-full bg-[#0D0D0D] overflow-hidden">
      <Header title="Campanhas" subtitle="automação da máquina" />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* ── Metric cards ── */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
          <MetricCard
            label="Campanhas Ativas"
            value={12}
            icon={Megaphone}
            iconColor="white"
            trend={3.1}
            sparkline={sparkData}
          />
          <MetricCard
            label="Buscas Agendadas"
            value={27}
            icon={Calendar}
            iconColor="blue"
            trend={12.5}
            sparkline={sparkData}
          />
          <MetricCard
            label="Execuções Hoje"
            value={84}
            icon={Rocket}
            iconColor="yellow"
            trend={18.6}
            sparkline={sparkData}
          />
          <MetricCard
            label="Mensagens Geradas"
            value={1248}
            icon={MessageSquare}
            iconColor="blue"
            trend={22.7}
            sparkline={sparkData}
          />
        </div>

        {/* ── Two-column ── */}
        <div className="flex gap-4 items-start">
          {/* LEFT */}
          <div className="flex-1 space-y-4 min-w-0">
            {/* Nova Campanha form */}
            <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-4">
              {/* pixel corners */}
              <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#FFD400]/60" />
              <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#FFD400]/60" />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#FFD400]/60" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#FFD400]/60" />

              {/* Card header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-[#FFD400]">⚙</span>
                  <p className="text-[11px] font-display font-bold text-white uppercase tracking-widest">
                    Nova Campanha
                    <span className="text-[#555555] mx-1">·</span>
                    Programe a máquina
                  </p>
                </div>
                <button className="w-6 h-6 border border-[#1E1E1E] bg-[#111111] flex items-center justify-center text-[#555555] hover:text-white hover:border-[#2A2A2A] transition-colors">
                  <Settings size={11} />
                </button>
              </div>

              {/* Form grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {/* Nome — full width */}
                <div className="col-span-2">
                  <label className="block text-[9px] font-display font-bold text-[#555555] uppercase tracking-widest mb-1">
                    Nome da Campanha
                  </label>
                  <input
                    type="text"
                    placeholder="Ex.: Academia Top SP"
                    className={inputCls}
                  />
                </div>

                {/* Nicho */}
                <div>
                  <label className="block text-[9px] font-display font-bold text-[#555555] uppercase tracking-widest mb-1">
                    Nicho
                  </label>
                  <select className={inputCls}>
                    <option>Academias</option>
                    <option>Saúde</option>
                    <option>Pet Shop</option>
                    <option>Automotivo</option>
                    <option>Alimentação</option>
                    <option>Beleza</option>
                    <option>Educação</option>
                  </select>
                </div>

                {/* Cidade */}
                <div>
                  <label className="block text-[9px] font-display font-bold text-[#555555] uppercase tracking-widest mb-1">
                    Cidade
                  </label>
                  <select className={inputCls}>
                    <option>São Paulo SP</option>
                    <option>Curitiba PR</option>
                    <option>Rio de Janeiro RJ</option>
                    <option>Belo Horizonte MG</option>
                    <option>Brasília DF</option>
                    <option>Porto Alegre RS</option>
                    <option>Salvador BA</option>
                  </select>
                </div>

                {/* Frequência */}
                <div>
                  <label className="block text-[9px] font-display font-bold text-[#555555] uppercase tracking-widest mb-1">
                    Frequência
                  </label>
                  <select className={inputCls}>
                    <option>Diária</option>
                    <option>Semanal</option>
                    <option>Mensal</option>
                  </select>
                </div>

                {/* Limite diário */}
                <div>
                  <label className="block text-[9px] font-display font-bold text-[#555555] uppercase tracking-widest mb-1">
                    Limite Diário
                  </label>
                  <input
                    type="number"
                    defaultValue={150}
                    placeholder="150 leads"
                    className={inputCls}
                  />
                </div>

                {/* Janela de execução */}
                <div className="col-span-2">
                  <label className="block text-[9px] font-display font-bold text-[#555555] uppercase tracking-widest mb-1">
                    Janela de Execução
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      defaultValue="08:00"
                      className={clsx(inputCls, "flex-1")}
                    />
                    <span className="text-[#555555] font-mono text-[10px] shrink-0">
                      até
                    </span>
                    <input
                      type="time"
                      defaultValue="20:00"
                      className={clsx(inputCls, "flex-1")}
                    />
                  </div>
                </div>
              </div>

              {/* Automação toggles */}
              <div className="border border-[#1E1E1E] bg-[#0D0D0D] p-3 mb-4">
                <p className="text-[9px] font-display font-bold text-[#555555] uppercase tracking-widest mb-3">
                  Automação da Máquina
                </p>
                <div className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                  {(
                    [
                      ["buscar", "Buscar leads"],
                      ["diagnosticar", "Diagnosticar"],
                      ["gerar", "Gerar mensagem"],
                      ["revisao", "Revisão humana"],
                    ] as const
                  ).map(([key, label]) => (
                    <div key={key} className="flex items-center justify-between gap-2">
                      <span className="text-[10px] font-body text-[#888888]">
                        {label}
                      </span>
                      <Toggle on={toggles[key]} onToggle={() => tog(key)} />
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA buttons */}
              <div className="flex gap-2">
                <button className="flex-1 bg-[#FFD400] text-black text-[11px] font-display font-bold uppercase tracking-widest py-2 px-3 hover:bg-[#FFE033] transition-colors">
                  ⚡ Disparar Campanha
                </button>
                <button className="flex-1 border border-[#1E1E1E] bg-[#111111] text-[#888888] text-[11px] font-display font-bold uppercase tracking-widest py-2 px-3 hover:border-[#2A2A2A] hover:text-white transition-colors">
                  💾 Salvar Automação
                </button>
              </div>
            </div>

            {/* Minhas Campanhas table */}
            <div className="relative border border-[#1E1E1E] bg-[#0A0A0A]">
              <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#FFD400]/60" />
              <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#FFD400]/60" />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#FFD400]/60" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#FFD400]/60" />

              <div className="px-4 py-3 border-b border-[#1E1E1E]">
                <p className="text-[11px] font-display font-bold text-white uppercase tracking-widest">
                  Minhas Campanhas
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-[#1E1E1E]">
                      {[
                        "Campanha",
                        "Status",
                        "Segmento / Nicho",
                        "Última Execução",
                        "Próxima Execução",
                        "Performance",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-2 text-left text-[9px] font-display font-bold text-[#555555] uppercase tracking-widest whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {campanhas.map((c, i) => (
                      <tr
                        key={i}
                        className="border-b border-[#1E1E1E] last:border-b-0 hover:bg-[#111111] transition-colors"
                      >
                        <td className="px-4 py-2.5 text-[11px] font-body text-white whitespace-nowrap">
                          {c.nome}
                        </td>
                        <td className="px-4 py-2.5">
                          <StatusBadge status={c.status} size="sm" />
                        </td>
                        <td className="px-4 py-2.5 text-[10px] font-mono text-[#888888] whitespace-nowrap">
                          {c.segmento}
                        </td>
                        <td className="px-4 py-2.5 text-[10px] font-mono text-[#888888] whitespace-nowrap">
                          {c.ultima}
                        </td>
                        <td className="px-4 py-2.5 text-[10px] font-mono text-[#888888] whitespace-nowrap">
                          {c.proxima}
                        </td>
                        <td className="px-4 py-2.5 text-[11px] font-mono text-[#00CC66] whitespace-nowrap">
                          {c.perf}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="w-[340px] shrink-0 space-y-4">
            {/* Pipeline */}
            <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-4">
              <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#FFD400]/60" />
              <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#FFD400]/60" />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#FFD400]/60" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#FFD400]/60" />

              <div className="flex items-center justify-between mb-4">
                <p className="text-[11px] font-display font-bold text-white uppercase tracking-widest">
                  Pipeline de Execução
                </p>
                <span className="text-[9px] font-display font-bold text-[#00B2FF] border border-[#00B2FF]/30 bg-[#00B2FF]/10 px-2 py-0.5">
                  4 em andamento
                </span>
              </div>

              <div className="space-y-4">
                {pipelineSteps.map((step) => (
                  <div
                    key={step.n}
                    className={clsx(
                      "border p-3",
                      step.active
                        ? "border-[#1E1E1E] bg-[#0D0D0D]"
                        : "border-[#1A1A1A] bg-[#0A0A0A] opacity-60"
                    )}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono font-bold text-[10px] text-[#FFD400] shrink-0">
                        {String(step.n).padStart(2, "0")}
                      </span>
                      <LMLogoIcon size={16} className="shrink-0" />
                      <span
                        className={clsx(
                          "text-[10px] font-display font-bold uppercase tracking-widest",
                          step.active ? "text-[#FFD400]" : "text-[#555555]"
                        )}
                      >
                        {step.label}
                      </span>
                      <span className="ml-auto font-mono text-[9px] text-[#555555] shrink-0">
                        {step.current}/{step.total}
                      </span>
                    </div>
                    <p className="text-[9px] font-body text-[#555555] ml-8">
                      {step.desc}
                    </p>
                    <SegmentedBar
                      current={step.current}
                      total={step.total}
                      active={step.active}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Desempenho */}
            <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-4">
              <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#FFD400]/60" />
              <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#FFD400]/60" />
              <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#FFD400]/60" />
              <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#FFD400]/60" />

              <p className="text-[11px] font-display font-bold text-white uppercase tracking-widest mb-3">
                Desempenho das Campanhas
              </p>

              <div className="grid grid-cols-2 gap-2">
                <Desemp
                  label="Taxa Resposta"
                  value="27.4%"
                  trend="+4.8%"
                  color="#00CC66"
                />
                <Desemp
                  label="Leads Capturados"
                  value="1248"
                  trend="+18.6%"
                  color="#00B2FF"
                />
                <Desemp
                  label="Msgs Aprovadas"
                  value="843"
                  trend="+12.3%"
                  color="#FFD400"
                />
                <Desemp
                  label="Tarefas Abertas"
                  value="32"
                  trend="-8.6%"
                  color="#FF6B00"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
