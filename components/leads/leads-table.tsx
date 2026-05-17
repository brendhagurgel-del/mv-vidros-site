"use client"

import clsx from "clsx"
import { Star, Eye, Copy, MoreHorizontal, ChevronLeft, ChevronRight } from "lucide-react"
import { RarityBadge } from "@/components/ui/rarity-badge"
import { StatusBadge } from "@/components/ui/status-badge"

interface Lead {
  id: string
  name: string
  logoInitial: string
  logoColor: string
  city: string
  state: string
  category: string
  score: number
  stars: number
  rarity: "LENDÁRIO" | "RARO" | "COMUM" | "BAIXO"
  updatedAt: string
  status: "NOVO" | "ANALISADO" | "PRONTO" | "AGUARDANDO" | "ENVIADO"
}

interface LeadsTableProps {
  leads: Lead[]
  selectedId: string | null
  onSelect: (lead: Lead) => void
  currentPage: number
  totalLeads: number
  perPage: number
  onPageChange: (page: number) => void
}

export function LeadsTable({
  leads,
  selectedId,
  onSelect,
  currentPage,
  totalLeads,
  perPage,
  onPageChange,
}: LeadsTableProps) {
  const totalPages = Math.ceil(totalLeads / perPage)
  const startItem = (currentPage - 1) * perPage + 1
  const endItem = Math.min(currentPage * perPage, totalLeads)

  const getPageNumbers = () => {
    const pages: (number | "...")[] = []
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i)
    } else {
      pages.push(1)
      if (currentPage > 3) pages.push("...")
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i)
      }
      if (currentPage < totalPages - 2) pages.push("...")
      pages.push(totalPages)
    }
    return pages
  }

  return (
    <div className="flex flex-col" style={{ background: "#0A0A0A" }}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr style={{ background: "#0D0D0D", borderBottom: "1px solid #1E1E1E" }}>
              {[
                "EMPRESA",
                "CIDADE",
                "NICHO",
                "SCORE",
                "QUALIDADE",
                "ÚLTIMA ATUALIZAÇÃO",
                "STATUS",
                "AÇÕES",
              ].map((col) => (
                <th
                  key={col}
                  className="text-left px-3 py-2.5"
                  style={{
                    fontSize: "9px",
                    fontFamily: "monospace",
                    color: "#444444",
                    textTransform: "uppercase",
                    letterSpacing: "0.1em",
                    fontWeight: 400,
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => {
              const isSelected = lead.id === selectedId
              return (
                <tr
                  key={lead.id}
                  onClick={() => onSelect(lead)}
                  className={clsx(
                    "cursor-pointer transition-colors",
                    isSelected
                      ? "border-l-2 border-[#FFD400] bg-[#111111]"
                      : "hover:bg-[#0F0F0F]"
                  )}
                  style={{ borderBottom: "1px solid #111111" }}
                >
                  {/* EMPRESA */}
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="flex items-center justify-center flex-shrink-0"
                        style={{
                          width: 28,
                          height: 28,
                          background: lead.logoColor,
                          color: "#fff",
                          fontSize: 11,
                          fontWeight: 700,
                          fontFamily: "monospace",
                        }}
                      >
                        {lead.logoInitial}
                      </div>
                      <span
                        style={{
                          color: "#FFFFFF",
                          fontWeight: 700,
                          fontSize: 12,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {lead.name}
                      </span>
                    </div>
                  </td>

                  {/* CIDADE */}
                  <td className="px-3 py-2.5">
                    <span style={{ color: "#666666", fontSize: 12, whiteSpace: "nowrap" }}>
                      {lead.city}, {lead.state}
                    </span>
                  </td>

                  {/* NICHO */}
                  <td className="px-3 py-2.5">
                    <span style={{ color: "#666666", fontSize: 12 }}>{lead.category}</span>
                  </td>

                  {/* SCORE */}
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1.5">
                      <span style={{ color: "#FFFFFF", fontWeight: 700, fontSize: 12 }}>
                        {lead.score}
                      </span>
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={10}
                            style={{
                              color: i < lead.stars ? "#FFD400" : "#333333",
                              fill: i < lead.stars ? "#FFD400" : "#333333",
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </td>

                  {/* QUALIDADE */}
                  <td className="px-3 py-2.5">
                    <RarityBadge rarity={lead.rarity} size="sm" />
                  </td>

                  {/* ÚLTIMA ATUALIZAÇÃO */}
                  <td className="px-3 py-2.5">
                    <span style={{ color: "#666666", fontSize: 12, whiteSpace: "nowrap" }}>
                      {lead.updatedAt}
                    </span>
                  </td>

                  {/* STATUS */}
                  <td className="px-3 py-2.5">
                    <StatusBadge status={lead.status} />
                  </td>

                  {/* AÇÕES */}
                  <td className="px-3 py-2.5">
                    <div className="flex items-center gap-1">
                      {[
                        { Icon: Eye, label: "view" },
                        { Icon: Copy, label: "copy" },
                        { Icon: MoreHorizontal, label: "more" },
                      ].map(({ Icon, label }) => (
                        <button
                          key={label}
                          onClick={(e) => e.stopPropagation()}
                          className="flex items-center justify-center transition-colors"
                          style={{
                            width: 24,
                            height: 24,
                            color: "#555555",
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                          }}
                          onMouseEnter={(e) => {
                            ;(e.currentTarget as HTMLButtonElement).style.color = "#FFD400"
                          }}
                          onMouseLeave={(e) => {
                            ;(e.currentTarget as HTMLButtonElement).style.color = "#555555"
                          }}
                          aria-label={label}
                        >
                          <Icon size={13} />
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        className="flex items-center justify-between px-3 py-2.5"
        style={{ borderTop: "1px solid #1E1E1E" }}
      >
        {/* Left: info */}
        <span
          style={{
            fontSize: 10,
            fontFamily: "monospace",
            color: "#444444",
          }}
        >
          Mostrando {startItem} a {endItem} de {totalLeads} leads
        </span>

        {/* Center: page buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="flex items-center justify-center transition-colors"
            style={{
              width: 28,
              height: 28,
              border: "1px solid #1E1E1E",
              background: "transparent",
              color: currentPage === 1 ? "#333333" : "#888888",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              fontSize: 10,
              fontFamily: "monospace",
            }}
            aria-label="Previous page"
          >
            <ChevronLeft size={11} />
          </button>

          {getPageNumbers().map((page, idx) =>
            page === "..." ? (
              <span
                key={`ellipsis-${idx}`}
                style={{
                  width: 28,
                  height: 28,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                  fontFamily: "monospace",
                  color: "#444444",
                }}
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => onPageChange(page as number)}
                style={{
                  width: 28,
                  height: 28,
                  border: `1px solid ${page === currentPage ? "#FFD400" : "#1E1E1E"}`,
                  background: "transparent",
                  color: page === currentPage ? "#FFD400" : "#888888",
                  cursor: "pointer",
                  fontSize: 10,
                  fontFamily: "monospace",
                  fontWeight: page === currentPage ? 700 : 400,
                }}
              >
                {page}
              </button>
            )
          )}

          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center transition-colors"
            style={{
              width: 28,
              height: 28,
              border: "1px solid #1E1E1E",
              background: "transparent",
              color: currentPage === totalPages ? "#333333" : "#888888",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              fontSize: 10,
              fontFamily: "monospace",
            }}
            aria-label="Next page"
          >
            <ChevronRight size={11} />
          </button>
        </div>

        {/* Right: per page selector */}
        <div className="flex items-center gap-1.5">
          <span style={{ fontSize: 10, fontFamily: "monospace", color: "#444444" }}>
            por página
          </span>
          <select
            defaultValue={perPage}
            style={{
              background: "#111111",
              border: "1px solid #1E1E1E",
              color: "#888888",
              fontSize: 10,
              fontFamily: "monospace",
              padding: "2px 4px",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {[8, 16, 32].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
