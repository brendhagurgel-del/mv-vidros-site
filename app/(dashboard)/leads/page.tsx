"use client"

import { useState } from "react"
import { Header } from "@/components/layout/header"
import { MetricCard } from "@/components/ui/metric-card"
import { LeadsFilters } from "@/components/leads/leads-filters"
import { LeadsTable } from "@/components/leads/leads-table"
import { LeadDetailPanel } from "@/components/leads/lead-detail-panel"
import { Users, Flame, Diamond, Target } from "lucide-react"

const spark = [{ value: 20 }, { value: 45 }, { value: 30 }, { value: 60 }, { value: 55 }, { value: 80 }]

const MOCK_LEADS = [
  { id: "1", name: "Academia Iron Fit", logoInitial: "AF", logoColor: "#FF4444", city: "São Paulo", state: "SP", category: "Academias", score: 92, stars: 5, rarity: "LENDÁRIO" as const, updatedAt: "Hoje, 10:32", status: "NOVO" as const },
  { id: "2", name: "Clínica Mais Vida", logoInitial: "CM", logoColor: "#00B2FF", city: "Curitiba", state: "PR", category: "Saúde", score: 88, stars: 4, rarity: "RARO" as const, updatedAt: "Hoje, 09:15", status: "ANALISADO" as const },
  { id: "3", name: "Pet Shop Amigo Fiel", logoInitial: "PA", logoColor: "#00CC66", city: "Belo Horizonte", state: "MG", category: "Pet Shop", score: 81, stars: 4, rarity: "RARO" as const, updatedAt: "Ontem, 18:47", status: "PRONTO" as const },
  { id: "4", name: "Auto Elétrica Forte", logoInitial: "AE", logoColor: "#FF6B00", city: "Porto Alegre", state: "RS", category: "Automotivo", score: 74, stars: 3, rarity: "COMUM" as const, updatedAt: "Ontem, 16:22", status: "AGUARDANDO" as const },
  { id: "5", name: "Restaurante Sabor Caseiro", logoInitial: "RS", logoColor: "#FFD400", city: "Fortaleza", state: "CE", category: "Alimentação", score: 90, stars: 5, rarity: "LENDÁRIO" as const, updatedAt: "Ontem, 14:03", status: "PRONTO" as const },
  { id: "6", name: "Studio Bellezza", logoInitial: "SB", logoColor: "#AA44FF", city: "Salvador", state: "BA", category: "Beleza", score: 67, stars: 3, rarity: "COMUM" as const, updatedAt: "12 Mai, 20:11", status: "ANALISADO" as const },
  { id: "7", name: "Lavanderia Clean+", logoInitial: "LC", logoColor: "#00B2FF", city: "Recife", state: "PE", category: "Serviços", score: 78, stars: 4, rarity: "RARO" as const, updatedAt: "12 Mai, 11:49", status: "NOVO" as const },
  { id: "8", name: "Escola Geração do Futuro", logoInitial: "EG", logoColor: "#00CC66", city: "Campinas", state: "SP", category: "Educação", score: 85, stars: 4, rarity: "RARO" as const, updatedAt: "11 Mai, 19:05", status: "AGUARDANDO" as const },
]

const MOCK_LEAD_DETAIL = {
  id: "1",
  name: "Academia Iron Fit",
  city: "São Paulo",
  state: "SP",
  category: "Academias e Personal Training",
  score: 92,
  rarity: "LENDÁRIO" as const,
  status: "NOVO",
  updatedAt: "Hoje, 10:32",
  completude: 92,
  diagnosticText: "Excelente oportunidade identificada. Alta presença local e grande potencial de conversão.",
  contacts: {
    phone: "(11) 98765-4321",
    email: "contato@academiaiornfit.com.br",
    website: "www.academiaiornfit.com.br",
    instagram: "@academiaiornfit",
  },
  insights: [
    "Ativo no Google Meu Negócio",
    "Avaliação média: 4,6★ (128 avaliações)",
    "Posta no Instagram 3x por semana",
    "Concorrência local: Média",
  ],
  strengths: ["Reputação", "Engajamento", "Localização"],
}

export default function LeadsPage() {
  const [selectedId, setSelectedId] = useState<string | null>("1")
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState("")

  const filtered = MOCK_LEADS.filter((l) =>
    !search || l.name.toLowerCase().includes(search.toLowerCase()) || l.category.toLowerCase().includes(search.toLowerCase())
  )

  const selectedDetail = selectedId
    ? { ...MOCK_LEAD_DETAIL, id: selectedId, ...MOCK_LEADS.find((l) => l.id === selectedId) }
    : null

  return (
    <>
      <Header title="Leads" subtitle="·:· gestão de oportunidades" />

      <div className="flex flex-1 min-h-0 h-[calc(100vh-56px)]">
        {/* Main area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <div className="p-4 space-y-3 overflow-y-auto flex-1">

            {/* Metric cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              <MetricCard label="Total de Leads" value={1248} icon={Users} iconColor="white" trend={18} sparkline={spark} />
              <MetricCard label="Novos Hoje" value={84} icon={Flame} iconColor="yellow" trend={24} sparkline={spark} />
              <MetricCard label="Qualificados" value={323} icon={Diamond} iconColor="blue" trend={22} sparkline={spark} />
              <MetricCard label="Taxa Média de Conversão" value={25} suffix="%" icon={Target} iconColor="white" trend={7} sparkline={spark} />
            </div>

            {/* Filters */}
            <LeadsFilters onSearch={setSearch} />

            {/* Table */}
            <LeadsTable
              leads={filtered}
              selectedId={selectedId}
              onSelect={(l) => setSelectedId(l.id === selectedId ? null : l.id)}
              currentPage={page}
              totalLeads={1248}
              perPage={8}
              onPageChange={setPage}
            />
          </div>
        </div>

        {/* Detail panel */}
        {selectedId && selectedDetail && (
          <LeadDetailPanel
            lead={selectedDetail as any}
            onClose={() => setSelectedId(null)}
          />
        )}
      </div>
    </>
  )
}
