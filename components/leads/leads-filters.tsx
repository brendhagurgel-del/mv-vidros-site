"use client"

import { useState } from "react"
import { clsx } from "clsx"
import { Search, SlidersHorizontal, Zap } from "lucide-react"

const filterOptions = {
  nicho: ["Todos", "Academias", "Saúde", "Pet Shop", "Automotivo", "Alimentação", "Beleza", "Educação", "Serviços"],
  cidade: ["Todas", "São Paulo, SP", "Curitiba, PR", "Belo Horizonte, MG", "Porto Alegre, RS", "Fortaleza, CE"],
  qualidade: ["Todos", "LENDÁRIO", "RARO", "COMUM", "BAIXO"],
  score: ["Todos", "≥ 85", "≥ 70", "≥ 50", "< 50"],
  status: ["Todos", "NOVO", "ANALISADO", "PRONTO", "AGUARDANDO", "ENVIADO"],
}

interface LeadsFiltersProps {
  onSearch: (q: string) => void
}

export function LeadsFilters({ onSearch }: LeadsFiltersProps) {
  const [search, setSearch] = useState("")
  const [focused, setFocused] = useState(false)

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {/* Search */}
      <div
        className={clsx(
          "flex items-center gap-2 border px-3 py-2 flex-1 min-w-[200px] transition-colors",
          focused ? "border-[#FFD400]/40 bg-[#111111]" : "border-[#1E1E1E] bg-[#0A0A0A]"
        )}
      >
        <Search size={12} className="text-[#555555] flex-shrink-0" />
        <input
          type="text"
          placeholder="Buscar empresa ou palavra-chave"
          className="bg-transparent text-[11px] font-body text-white flex-1 outline-none placeholder:text-[#444444]"
          value={search}
          onChange={(e) => { setSearch(e.target.value); onSearch(e.target.value) }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>

      {/* Dropdowns */}
      {Object.entries(filterOptions).map(([key, opts]) => (
        <div key={key} className="relative">
          <select
            className={clsx(
              "border border-[#1E1E1E] bg-[#0A0A0A] text-[10px] font-display font-bold",
              "text-[#888888] px-3 py-2 pr-6 outline-none cursor-pointer",
              "hover:border-[#2A2A2A] transition-colors appearance-none"
            )}
          >
            <option value="" disabled>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
            {opts.map((o) => <option key={o} value={o}>{o}</option>)}
          </select>
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[#555555] pointer-events-none text-[8px]">▼</span>
        </div>
      ))}

      {/* CTA */}
      <button className="flex items-center gap-2 bg-[#FFD400] hover:bg-[#FFE033] text-black font-display font-bold text-[11px] uppercase tracking-wider px-4 py-2 transition-colors flex-shrink-0">
        <Zap size={12} fill="black" />
        Novo Rastreio
      </button>
    </div>
  )
}
