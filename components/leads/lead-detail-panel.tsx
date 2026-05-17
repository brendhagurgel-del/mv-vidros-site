"use client"

import clsx from "clsx"
import {
  X,
  Phone,
  Mail,
  Globe,
  AtSign,
  Eye,
  MessageSquare,
  SendHorizontal,
  CheckCircle2,
} from "lucide-react"
import { RarityBadge } from "@/components/ui/rarity-badge"
import { PixelProgress } from "@/components/ui/pixel-progress"

interface Lead {
  id: string
  name: string
  city: string
  state: string
  category: string
  score: number
  rarity: "LENDÁRIO" | "RARO" | "COMUM" | "BAIXO"
  status: string
  updatedAt: string
  completude: number
  contacts: {
    phone?: string
    email?: string
    website?: string
    instagram?: string
  }
  insights: string[]
  strengths: string[]
  diagnosticText: string
}

interface LeadDetailPanelProps {
  lead: Lead | null
  onClose: () => void
}

function PixelCorners({ color = "#FFD400" }: { color?: string }) {
  return (
    <>
      <span
        className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2"
        style={{ borderColor: color }}
      />
      <span
        className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r-2 border-t-2"
        style={{ borderColor: color }}
      />
      <span
        className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2"
        style={{ borderColor: color }}
      />
      <span
        className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2"
        style={{ borderColor: color }}
      />
    </>
  )
}

function SectionCard({
  children,
  className,
  cornerColor = "#FFD400",
}: {
  children: React.ReactNode
  className?: string
  cornerColor?: string
}) {
  return (
    <div
      className={clsx(
        "relative border border-[#1E1E1E] bg-[#0D0D0D] p-3",
        className
      )}
    >
      <PixelCorners color={cornerColor} />
      {children}
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="mb-2 text-[10px] tracking-widest text-[#666]"
      style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
    >
      {children}
    </p>
  )
}

export function LeadDetailPanel({ lead, onClose }: LeadDetailPanelProps) {
  if (!lead) return null

  const contactRows: {
    key: keyof Lead["contacts"]
    icon: React.ReactNode
    label: string
    value?: string
    href?: (v: string) => string
  }[] = [
    {
      key: "phone",
      icon: <Phone size={13} className="text-[#00CC66]" />,
      label: "WhatsApp",
      value: lead.contacts.phone,
      href: (v) => `https://wa.me/${v.replace(/\D/g, "")}`,
    },
    {
      key: "email",
      icon: <Mail size={13} className="text-[#00CC66]" />,
      label: "E-mail",
      value: lead.contacts.email,
      href: (v) => `mailto:${v}`,
    },
    {
      key: "website",
      icon: <Globe size={13} className="text-[#00CC66]" />,
      label: "Website",
      value: lead.contacts.website,
      href: (v) => v,
    },
    {
      key: "instagram",
      icon: <AtSign size={13} className="text-[#00CC66]" />,
      label: "Instagram",
      value: lead.contacts.instagram,
      href: (v) =>
        v.startsWith("http") ? v : `https://instagram.com/${v.replace("@", "")}`,
    },
  ]

  const availableContacts = contactRows.filter((r) => r.value)

  return (
    <div className="flex h-full w-[320px] flex-col overflow-y-auto border-l border-[#1E1E1E] bg-[#0A0A0A]">
      {/* ── Header ── */}
      <div className="flex-shrink-0 border-b border-[#1E1E1E] p-4">
        <div className="mb-1 flex items-start justify-between gap-2">
          <h2
            className="flex-1 text-lg font-bold leading-tight text-white"
            style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
          >
            {lead.name}
          </h2>
          <button
            onClick={onClose}
            className="mt-0.5 flex-shrink-0 text-[#555] transition-colors hover:text-white"
            aria-label="Fechar painel"
          >
            <X size={16} />
          </button>
        </div>

        <div className="mb-2 flex items-center gap-2">
          <RarityBadge rarity={lead.rarity} />
          <span
            className="text-xl font-bold leading-none"
            style={{
              fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
              color: "#FFD400",
            }}
          >
            {lead.score}
          </span>
        </div>

        <p
          className="text-[11px] text-[#555]"
          style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
        >
          {lead.city}, {lead.state}&nbsp;&middot;&nbsp;{lead.category}
        </p>
        <p
          className="mt-0.5 text-[10px] text-[#444]"
          style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
        >
          Última atualização: {lead.updatedAt}
        </p>
      </div>

      {/* ── Body (scrollable) ── */}
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-3">
        {/* ── Diagnóstico ── */}
        <SectionCard>
          <div className="mb-2 flex items-start justify-between gap-2">
            <SectionLabel>DIAGNÓSTICO DA MÁQUINA</SectionLabel>
            <SectionLabel>COMPLETUDE</SectionLabel>
          </div>

          <p
            className="mb-3 text-[11px] leading-relaxed text-[#888]"
            style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
          >
            {lead.diagnosticText}
          </p>

          <div className="flex items-center gap-2">
            <div className="flex-1">
              <PixelProgress value={lead.completude} />
            </div>
            <span
              className="w-8 text-right text-sm font-bold"
              style={{
                fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                color: "#FFD400",
              }}
            >
              {lead.completude}%
            </span>
          </div>
        </SectionCard>

        {/* ── Oportunidades de Contato ── */}
        <SectionCard>
          <SectionLabel>OPORTUNIDADES DE CONTATO</SectionLabel>

          <div className="flex flex-col gap-1">
            {contactRows.map((row) => {
              if (!row.value) return null
              const url = row.href ? row.href(row.value) : undefined
              return (
                <div
                  key={row.key}
                  className="flex items-center gap-2 border border-[#1A1A1A] px-2 py-1.5"
                >
                  {row.icon}
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 truncate text-[11px] text-[#CCC] hover:text-white"
                    style={{
                      fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
                    }}
                  >
                    {row.value}
                  </a>
                  <div className="flex items-center gap-1">
                    <span
                      className="text-[9px] text-[#555]"
                      style={{
                        fontFamily: "var(--font-display, Rajdhani, sans-serif)",
                      }}
                    >
                      {row.label}
                    </span>
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00CC66]" />
                  </div>
                </div>
              )
            })}
          </div>

          {availableContacts.length > 0 && (
            <button
              className="mt-2 w-full border border-[#FFD400] py-1.5 text-[10px] tracking-widest text-[#FFD400] transition-colors hover:bg-[#FFD400] hover:text-black"
              style={{
                fontFamily: "var(--font-display, Rajdhani, sans-serif)",
              }}
            >
              VER TODAS ({availableContacts.length > 4 ? availableContacts.length : 6})
            </button>
          )}
        </SectionCard>

        {/* ── Insights + Pontos Fortes ── */}
        <div className="flex gap-2">
          {/* Insights Rápidos */}
          <SectionCard className="flex-1">
            <SectionLabel>INSIGHTS RÁPIDOS</SectionLabel>
            <ul className="flex flex-col gap-1.5">
              {lead.insights.map((insight, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <CheckCircle2
                    size={11}
                    className="mt-0.5 flex-shrink-0 text-[#00CC66]"
                  />
                  <span
                    className="text-[10px] leading-tight text-[#AAA]"
                    style={{
                      fontFamily: "var(--font-body, Inter, sans-serif)",
                    }}
                  >
                    {insight}
                  </span>
                </li>
              ))}
            </ul>
          </SectionCard>

          {/* Pontos Fortes */}
          <SectionCard className="flex-1" cornerColor="#00B2FF">
            <div
              className="mb-2 text-[9px] font-bold tracking-widest"
              style={{
                fontFamily: "var(--font-display, Rajdhani, sans-serif)",
                color: "#FFD400",
              }}
            >
              PONTOS FORTES
            </div>
            <div className="flex flex-col gap-1">
              {lead.strengths.map((s, i) => (
                <div
                  key={i}
                  className="border border-[#00B2FF33] px-2 py-0.5 text-center text-[10px] text-[#00B2FF]"
                  style={{
                    fontFamily: "var(--font-display, Rajdhani, sans-serif)",
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>

      {/* ── Action Buttons ── */}
      <div className="flex-shrink-0 border-t border-[#1E1E1E] p-3">
        <div className="mb-2 flex gap-2">
          {/* VER PRÉVIA */}
          <button
            className="flex flex-1 items-center justify-center gap-1.5 border border-[#333] py-2 text-[10px] tracking-widest text-[#AAA] transition-colors hover:border-[#555] hover:text-white"
            style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
          >
            <Eye size={12} />
            VER PRÉVIA
          </button>

          {/* GERAR MENSAGEM */}
          <button
            className="flex flex-1 items-center justify-center gap-1.5 py-2 text-[10px] tracking-widest text-black transition-opacity hover:opacity-90"
            style={{
              fontFamily: "var(--font-display, Rajdhani, sans-serif)",
              backgroundColor: "#00B2FF",
            }}
          >
            <MessageSquare size={12} />
            GERAR MENSAGEM
          </button>
        </div>

        {/* ENVIAR PARA APROVAÇÃO */}
        <button
          className="flex w-full items-center justify-center gap-1.5 py-2.5 text-[11px] font-bold tracking-widest text-black transition-opacity hover:opacity-90"
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
  )
}
