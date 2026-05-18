"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Users2, Zap, CheckSquare, Settings } from "lucide-react"
import { SegmentedBar } from "@/components/ui/segmented-bar"
import { useMachineStats } from "@/lib/hooks/use-machine-stats"

const NAV = [
  { href: "/dashboard",     icon: LayoutDashboard, label: "DASHBOARD" },
  { href: "/leads",         icon: Users2,           label: "LEADS",         badge: true },
  { href: "/campanhas",     icon: Zap,              label: "CAMPANHAS" },
  { href: "/aprovacoes",    icon: CheckSquare,      label: "APROVAÇÕES" },
  { href: "/configuracoes", icon: Settings,         label: "CONFIGURAÇÕES" },
]

function LMLogo() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="13" width="22" height="17" fill="#1A1A1A" stroke="#FFD400" strokeWidth="1.5"/>
      <text x="8" y="25" fontFamily="monospace" fontSize="9" fontWeight="bold" fill="#FFD400">LM</text>
      <rect x="25" y="16" width="6" height="4" fill="#FFD400" opacity="0.9"/>
      <rect x="25" y="21" width="6" height="3.5" fill="#FFD400" opacity="0.7"/>
      <rect x="31" y="15" width="5" height="3.5" fill="#FFD400" opacity="0.8"/>
      <rect x="31" y="20" width="5" height="3.5" fill="#FFD400" opacity="0.6"/>
      <rect x="36" y="16" width="4" height="3" fill="#FFD400" opacity="0.5"/>
      <rect x="40" y="16" width="2.5" height="2.5" fill="#FFD400" opacity="0.7"/>
      <rect x="40" y="21" width="2.5" height="2" fill="#00AFFF" opacity="0.7"/>
      <rect x="38" y="14" width="2" height="2" fill="#00AFFF" opacity="0.5"/>
      <rect x="5" y="30" width="18" height="5" fill="#1E1E1E" stroke="#2A2A2A" strokeWidth="1"/>
      <rect x="6" y="31" width="3" height="3" rx="1.5" fill="#333"/>
      <rect x="11" y="31" width="3" height="3" rx="1.5" fill="#333"/>
      <rect x="16" y="31" width="3" height="3" rx="1.5" fill="#333"/>
      <rect x="10" y="9" width="9" height="4" fill="#1A1A1A" stroke="#FFD400" strokeWidth="1"/>
      <rect x="3" y="19" width="3" height="2" fill="#00AFFF" opacity="0.6"/>
    </svg>
  )
}

export function Sidebar() {
  const pathname = usePathname()
  const { data: stats } = useMachineStats()

  const xp = stats?.xp ?? 7250
  const maxXp = stats?.xpForNextLevel ?? 10000
  const level = stats?.level ?? 7
  const potencia = stats?.potencia ?? 62

  return (
    <aside style={{
      width: 220, minHeight: "100vh", flexShrink: 0,
      background: "#0D0D0D", borderRight: "1px solid #1A1A1A",
      display: "flex", flexDirection: "column",
    }}>
      {/* LOGO */}
      <div style={{ padding: "14px 14px 10px", borderBottom: "1px solid #1A1A1A" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <LMLogo />
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 0, lineHeight: 1.1 }}>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, color: "#FFD400" }}>Lead</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 700, color: "#F0F0F0" }}>Machine</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
              <span style={{ color: "#333", fontSize: 11, fontFamily: "var(--font-display)" }}>=</span>
              <span style={{ fontFamily: "var(--font-display)", fontSize: 14, fontWeight: 700, color: "#00AFFF", fontStyle: "italic" }}>AI</span>
            </div>
          </div>
        </div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: 9, color: "#333", letterSpacing: "0.04em" }}>
          [·—— Oportunidades locais.{" "}
          <span style={{ color: "#FF6B00" }}>Vendas reais.</span>
          {" "}——·]
        </div>
      </div>

      {/* NAV */}
      <nav style={{ flex: 1, paddingTop: 6, paddingBottom: 6 }}>
        {NAV.map(({ href, icon: Icon, label, badge }) => {
          const active = pathname === href || (href !== "/dashboard" && pathname.startsWith(href))
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 14px",
                background: active ? "#FFD400" : "transparent",
                color: active ? "#000000" : "#555555",
                textDecoration: "none",
                borderLeft: active ? "0px" : "2px solid transparent",
                transition: "all 0.12s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => { if (!active) e.currentTarget.style.color = "#999" }}
              onMouseLeave={(e) => { if (!active) e.currentTarget.style.color = "#555" }}
            >
              <div style={{ position: "relative" }}>
                <Icon size={14} />
                {badge && !active && (
                  <span style={{
                    position: "absolute", top: -4, right: -4,
                    width: 8, height: 8, borderRadius: "50%",
                    background: "#FFD400", border: "1px solid #0D0D0D",
                    animation: "pulse-dot 2s infinite",
                  }} />
                )}
              </div>
              <span style={{
                fontFamily: "var(--font-display)", fontSize: 12, fontWeight: active ? 800 : 600,
                textTransform: "uppercase", letterSpacing: "0.1em",
              }}>
                {label}
              </span>
            </Link>
          )
        })}
      </nav>

      {/* MÁQUINA ATIVA */}
      <div style={{
        margin: 10,
        border: "1px solid rgba(255,212,0,0.15)",
        background: "rgba(255,212,0,0.025)",
        padding: 10,
        position: "relative",
      }}>
        {/* HUD corners amarelos */}
        {(["tl","tr","bl","br"] as const).map((pos) => (
          <span key={pos} style={{
            position: "absolute", width: 6, height: 6, pointerEvents: "none",
            top:    pos.includes("t") ? 0 : "auto", bottom: pos.includes("b") ? 0 : "auto",
            left:   pos.includes("l") ? 0 : "auto", right:  pos.includes("r") ? 0 : "auto",
            borderTop:    pos.includes("t") ? "1.5px solid #FFD400" : undefined,
            borderBottom: pos.includes("b") ? "1.5px solid #FFD400" : undefined,
            borderLeft:   pos.includes("l") ? "1.5px solid #FFD400" : undefined,
            borderRight:  pos.includes("r") ? "1.5px solid #FFD400" : undefined,
          }} />
        ))}

        {/* Header row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 9, fontWeight: 700, color: "#FFD400", textTransform: "uppercase", letterSpacing: "0.15em" }}>
            MÁQUINA ATIVA
          </span>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#12D36B", boxShadow: "0 0 6px #12D36B", display: "inline-block" }} />
        </div>

        {/* Mini LM icon */}
        <div style={{ marginBottom: 8 }}>
          <svg width="36" height="26" viewBox="0 0 36 26" fill="none">
            <rect x="0" y="4" width="16" height="13" fill="#1A1A1A" stroke="#FFD400" strokeWidth="1"/>
            <text x="3" y="14" fontFamily="monospace" fontSize="7" fontWeight="bold" fill="#FFD400">LM</text>
            <rect x="16" y="6" width="5" height="3.5" fill="#FFD400" opacity="0.9"/>
            <rect x="16" y="10" width="5" height="3" fill="#FFD400" opacity="0.7"/>
            <rect x="21" y="7" width="4" height="3" fill="#FFD400" opacity="0.6"/>
            <rect x="25" y="8" width="3" height="2.5" fill="#FFD400" opacity="0.5"/>
            <rect x="28" y="8" width="2" height="2" fill="#FFD400" opacity="0.35"/>
            <rect x="30" y="8" width="1.5" height="1.5" fill="#00AFFF" opacity="0.6"/>
            <rect x="30" y="11" width="1.5" height="1.5" fill="#FFD400" opacity="0.4"/>
          </svg>
        </div>

        {/* XP */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em" }}>XP DA MÁQUINA</span>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 10, color: "#FFD400", fontWeight: 700 }}>NÍVEL {level}</span>
          </div>
          <SegmentedBar value={xp} max={maxXp} color="#FFD400" segments={14} height={5} />
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#444", marginTop: 3 }}>
            {xp.toLocaleString("pt-BR")} / {maxXp.toLocaleString("pt-BR")} XP
          </div>
        </div>

        {/* Potência */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontFamily: "var(--font-display)", fontSize: 9, color: "#555", textTransform: "uppercase", letterSpacing: "0.1em" }}>POTÊNCIA</span>
            <span style={{ color: "#FFD400", fontSize: 11 }}>⚡</span>
          </div>
          <SegmentedBar value={potencia} max={100} color="#00AFFF" segments={14} height={5} />
        </div>
      </div>
    </aside>
  )
}
