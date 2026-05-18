"use client"

import { MetricCard } from "@/components/ui/metric-card"
import { RarityBadge } from "@/components/ui/rarity-badge"
import { StatusBadge } from "@/components/ui/status-badge"
import { LeadsChart } from "@/components/dashboard/leads-chart"
import { QualityDonut } from "@/components/dashboard/quality-donut"
import { LMLogoIcon } from "@/components/ui/lm-logo"
import { Header } from "@/components/layout/header"
import {
  Users, Flame, Diamond, Shield, Megaphone, MessageSquare,
  Zap, ArrowUpRight, Clock, CheckCircle, XCircle, Target,
} from "lucide-react"

const spark = [
  { value: 20 }, { value: 40 }, { value: 30 }, { value: 60 },
  { value: 50 }, { value: 75 }, { value: 65 }, { value: 90 },
]

const topLeads = [
  { name: "Academia Iron Fit", city: "São Paulo, SP", niche: "Academias", score: 92, rarity: "LENDÁRIO" as const },
  { name: "Clínica Mais Vida", city: "Curitiba, PR", niche: "Saúde", score: 78, rarity: "RARO" as const },
  { name: "Pet Shop Amigo Fiel", city: "Belo Horizonte, MG", niche: "Pet Shop", score: 61, rarity: "RARO" as const },
  { name: "Auto Elétrica Forte", city: "Porto Alegre, RS", niche: "Automotivo", score: 34, rarity: "COMUM" as const },
  { name: "Restaurante Sabor Caseiro", city: "Fortaleza, CE", niche: "Alimentação", score: 88, rarity: "LENDÁRIO" as const },
]

const approvalQueue = [
  { title: "Nova campanha — Academias SP", seg: "Segmentação: São Paulo – SP", priority: "ALTA" },
  { title: "Oferta — Clínicas Odontológicas", seg: "Segmentação: Curitiba – PR", priority: "MÉDIA" },
  { title: "Campanha — Pet Shops", seg: "Segmentação: BH e Região", priority: "MÉDIA" },
  { title: "Promoção — Restaurantes", seg: "Segmentação: Fortaleza – CE", priority: "BAIXA" },
]

const recentActivity = [
  { icon: Users, color: "text-[#FFD400]", text: "Novo lead quente encontrado", sub: "Academia Iron Fit – SP", time: "2m atrás" },
  { icon: CheckCircle, color: "text-[#00CC66]", text: "Campanha aprovada", sub: "Clínicas Odontológicas", time: "15m atrás" },
  { icon: MessageSquare, color: "text-[#00B2FF]", text: "97 mensagens pendentes", sub: "Requerem atenção", time: "28m atrás" },
  { icon: Target, color: "text-[#00CC66]", text: "Meta diária atingida!", sub: "1.248/1.000 leads", time: "1h atrás" },
]

const priorityColors: Record<string, string> = {
  ALTA: "text-[#FFD400] border-[#FFD400]/40 bg-[#FFD400]/10",
  MÉDIA: "text-[#00B2FF] border-[#00B2FF]/40 bg-[#00B2FF]/10",
  BAIXA: "text-[#888888] border-[#888888]/40 bg-[#888888]/10",
}

export default function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" />
      <div className="p-4 space-y-4 min-h-0">

        {/* Metric cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-2">
          <MetricCard label="Leads Encontrados" value={1248} icon={Users} color="white" trend={18} sparkline={spark} />
          <MetricCard label="Quentes" value={843} icon={Flame} color="yellow" trend={12} sparkline={spark} />
          <MetricCard label="Médios" value={323} icon={Diamond} color="blue" trend={22} sparkline={spark} />
          <MetricCard label="Fracos" value={82} icon={Shield} color="gray" trend={-5} sparkline={spark} />
          <MetricCard label="Campanhas Ativas" value={12} icon={Megaphone} color="white" trend={3} sparkline={spark} />
          <MetricCard label="Msg Pendentes" value={97} icon={MessageSquare} color="blue" trend={8} sparkline={spark} />
        </div>

        {/* Chart row */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_220px_220px] gap-2">
          <LeadsChart />
          <QualityDonut />

          {/* Máquina widget */}
          <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-4 flex flex-col">
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FFD400]/40" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FFD400]/40" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#FFD400]/40" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FFD400]/40" />

            <div className="flex items-start gap-2 mb-3">
              <LMLogoIcon size={36} className="flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-display font-bold text-[#FFD400] text-sm leading-tight uppercase">
                  A máquina<br />nunca para!
                </p>
              </div>
            </div>

            <p className="text-[9px] font-body text-[#666666] mb-3 leading-relaxed">
              Alimente a máquina com dados e dispare mais vendas.
            </p>

            <div className="mt-auto">
              <p className="text-[8px] font-mono text-[#555555] uppercase tracking-wider mb-1">
                Leads Processados Hoje
              </p>
              <div className="flex items-baseline gap-1.5 mb-1.5">
                <span className="text-lg font-display font-bold text-white">1.248</span>
                <span className="text-[9px] font-mono text-[#555555]">/ 2.000</span>
              </div>
              {/* Progress bar */}
              <div className="flex gap-px h-2 mb-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={
                      i < 12
                        ? "flex-1 bg-[#FFD400] shadow-[0_0_4px_rgba(255,212,0,0.4)]"
                        : "flex-1 bg-[#1E1E1E]"
                    }
                  />
                ))}
              </div>

              <button className="w-full bg-[#FFD400] hover:bg-[#FFE033] text-black font-display font-bold text-xs uppercase tracking-widest py-2.5 flex items-center justify-center gap-2 transition-colors">
                <Zap size={13} fill="black" />
                Disparar Campanha
              </button>
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_280px_240px] gap-2">

          {/* Oportunidades recentes */}
          <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-4">
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FFD400]/40" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FFD400]/40" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#FFD400]/40" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FFD400]/40" />

            <h3 className="text-[10px] font-display font-bold text-[#888888] uppercase tracking-widest mb-3">
              Oportunidades Recentes
            </h3>

            <table className="w-full">
              <thead>
                <tr className="border-b border-[#1A1A1A]">
                  {["Empresa", "Cidade", "Nicho", "Score", "Qualidade"].map((h) => (
                    <th key={h} className="text-left text-[8px] font-mono text-[#444444] uppercase tracking-wider pb-2 pr-3">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topLeads.map((lead) => (
                  <tr
                    key={lead.name}
                    className="border-b border-[#111111] hover:bg-[#111111] transition-colors"
                  >
                    <td className="py-2 pr-3">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-[#FFD400]/10 border border-[#FFD400]/20 flex items-center justify-center">
                          <span className="text-[8px] font-display font-bold text-[#FFD400]">
                            {lead.name[0]}
                          </span>
                        </div>
                        <span className="text-[10px] font-display font-bold text-white truncate max-w-[120px]">
                          {lead.name}
                        </span>
                      </div>
                    </td>
                    <td className="py-2 pr-3 text-[9px] font-body text-[#888888] whitespace-nowrap">{lead.city}</td>
                    <td className="py-2 pr-3 text-[9px] font-body text-[#888888]">{lead.niche}</td>
                    <td className="py-2 pr-3">
                      <span className="text-[11px] font-display font-bold text-white">{lead.score}</span>
                    </td>
                    <td className="py-2">
                      <RarityBadge rarity={lead.rarity} size="sm" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="flex items-center gap-1 mt-3 text-[9px] font-mono text-[#FFD400] hover:text-[#FFE033] transition-colors uppercase tracking-wider">
              Ver todos os leads <ArrowUpRight size={10} />
            </button>
          </div>

          {/* Fila de aprovação */}
          <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-4">
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FFD400]/40" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FFD400]/40" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#FFD400]/40" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FFD400]/40" />

            <h3 className="text-[10px] font-display font-bold text-[#888888] uppercase tracking-widest mb-3">
              Fila de Aprovação
            </h3>

            <div className="space-y-2">
              {approvalQueue.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start justify-between gap-2 p-2 border border-[#1A1A1A] hover:border-[#2A2A2A] transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-display font-bold text-white leading-tight truncate">
                      {item.title}
                    </p>
                    <p className="text-[8px] font-body text-[#555555] mt-0.5 truncate">{item.seg}</p>
                  </div>
                  <span
                    className={`text-[8px] font-display font-bold uppercase tracking-wider border px-1.5 py-0.5 whitespace-nowrap flex-shrink-0 ${priorityColors[item.priority]}`}
                  >
                    {item.priority}
                  </span>
                </div>
              ))}
            </div>

            <button className="flex items-center gap-1 mt-3 text-[9px] font-mono text-[#FFD400] hover:text-[#FFE033] transition-colors uppercase tracking-wider">
              Ver fila completa <ArrowUpRight size={10} />
            </button>
          </div>

          {/* Atividade recente */}
          <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-4">
            <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FFD400]/40" />
            <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FFD400]/40" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#FFD400]/40" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FFD400]/40" />

            <h3 className="text-[10px] font-display font-bold text-[#888888] uppercase tracking-widest mb-3">
              Atividade Recente
            </h3>

            <div className="space-y-3">
              {recentActivity.map((item, i) => {
                const Icon = item.icon
                return (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-6 h-6 bg-[#111111] border border-[#1E1E1E] flex items-center justify-center flex-shrink-0">
                      <Icon size={11} className={item.color} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-display font-bold text-white leading-tight">
                        {item.text}
                      </p>
                      <p className="text-[8px] font-body text-[#555555] mt-0.5 truncate">{item.sub}</p>
                    </div>
                    <span className="text-[8px] font-mono text-[#444444] whitespace-nowrap flex-shrink-0">
                      {item.time}
                    </span>
                  </div>
                )
              })}
            </div>

            <button className="flex items-center gap-1 mt-3 text-[9px] font-mono text-[#FFD400] hover:text-[#FFE033] transition-colors uppercase tracking-wider">
              Ver toda atividade <ArrowUpRight size={10} />
            </button>
          </div>
        </div>

      </div>
    </>
  )
}
