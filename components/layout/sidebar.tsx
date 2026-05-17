"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { clsx } from "clsx"
import {
  LayoutDashboard,
  Users,
  Megaphone,
  CheckSquare,
  Settings,
  Zap,
} from "lucide-react"
import { LMLogoIcon } from "@/components/ui/lm-logo"

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/campanhas", label: "Campanhas", icon: Megaphone },
  { href: "/aprovacoes", label: "Aprovações", icon: CheckSquare },
  { href: "/configuracoes", label: "Configurações", icon: Settings },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-[200px] shrink-0 flex flex-col bg-[#0D0D0D] border-r border-[#1A1A1A] h-screen sticky top-0">

      {/* Logo area */}
      <div className="px-4 pt-4 pb-3 border-b border-[#1A1A1A]">
        {/* LM machine icon */}
        <div className="mb-2">
          <LMLogoIcon size={52} />
        </div>
        {/* Wordmark */}
        <div className="flex items-baseline gap-0.5 leading-none">
          <span className="font-display font-bold text-lg text-[#FFD400]">Lead</span>
          <span className="font-display font-bold text-lg text-white">Machine</span>
        </div>
        <div className="flex items-center gap-0.5">
          <span className="font-display font-bold text-[11px] text-[#00B2FF]">=AI</span>
        </div>
        {/* Tagline */}
        <div className="flex items-center gap-0.5 mt-1 flex-wrap">
          <span className="text-[#555555] font-mono text-[8px]">[·—</span>
          <span className="text-[#666666] font-body text-[8px]">Oportunidades locais.</span>
          <span className="text-[#FFD400] font-body text-[8px] font-bold">Vendas reais.</span>
          <span className="text-[#555555] font-mono text-[8px]">—·]</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-2 px-2 space-y-0.5 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/")
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                "flex items-center gap-2.5 px-3 py-2.5 transition-colors duration-100",
                "text-[11px] font-display font-bold uppercase tracking-widest",
                active
                  ? "bg-[#FFD400] text-black"
                  : "text-[#888888] hover:text-white hover:bg-[#111111]"
              )}
            >
              <Icon size={14} className="flex-shrink-0" strokeWidth={active ? 2.5 : 2} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Máquina Ativa widget */}
      <div className="mx-2 mb-3 mt-1">
        <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-3">
          {/* Pixel corners */}
          <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FFD400]/50" />
          <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FFD400]/50" />
          <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#FFD400]/50" />
          <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FFD400]/50" />

          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5">
              <LMLogoIcon size={20} />
              <span className="text-[9px] font-display font-bold text-[#FFD400] uppercase tracking-wider">
                Máquina Ativa
              </span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 bg-[#00CC66]" />
            </div>
          </div>

          {/* XP bar */}
          <div className="mb-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[8px] font-mono text-[#666666] uppercase tracking-wider">
                XP da Máquina
              </span>
              <span className="text-[8px] font-display font-bold text-[#FFD400]">
                Nível 7
              </span>
            </div>
            <div className="flex gap-px h-2 mb-0.5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={clsx(
                    "flex-1",
                    i < 7
                      ? "bg-[#FFD400] shadow-[0_0_4px_rgba(255,212,0,0.5)]"
                      : "bg-[#1E1E1E]"
                  )}
                />
              ))}
            </div>
            <p className="text-[8px] font-mono text-[#444444]">7.250 / 10.000 XP</p>
          </div>

          {/* Potência bar */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-[8px] font-mono text-[#666666] uppercase tracking-wider">
                Potência da Máquina
              </span>
              <Zap size={8} className="text-[#00B2FF]" />
            </div>
            <div className="flex gap-px h-1.5">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className={clsx(
                    "flex-1",
                    i < 6
                      ? "bg-[#00B2FF] shadow-[0_0_4px_rgba(0,178,255,0.4)]"
                      : "bg-[#1E1E1E]"
                  )}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
