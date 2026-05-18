"use client"
import { usePathname } from "next/navigation"
import { Search, Calendar, ChevronDown, Bell } from "lucide-react"

const ROUTE_TITLES: Record<string, string> = {
  "/dashboard":      "DASHBOARD",
  "/leads":          "LEADS",
  "/campanhas":      "CAMPANHAS",
  "/aprovacoes":     "APROVAÇÕES",
  "/configuracoes":  "CONFIGURAÇÕES",
}

function BlinkDots() {
  return (
    <span style={{ display: "inline-flex", gap: 3, marginLeft: 10, alignItems: "center" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 4, height: 4, borderRadius: "50%",
            background: "#00AFFF", display: "inline-block",
            animation: `blink 1.4s ease-in-out ${i * 0.2}s infinite`,
          }}
        />
      ))}
    </span>
  )
}

interface HeaderProps {
  title?: string
  subtitle?: string
}

export function Header({ title, subtitle }: HeaderProps) {
  const pathname = usePathname()
  const pageTitle = title ?? ROUTE_TITLES[pathname] ?? pathname.split("/").pop()?.toUpperCase() ?? "PÁGINA"

  return (
    <header style={{
      height: 56, flexShrink: 0,
      background: "#0D0D0D", borderBottom: "1px solid #1A1A1A",
      display: "flex", alignItems: "center", padding: "0 20px", gap: 12,
    }}>
      {/* Título */}
      <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
        <h1 style={{
          fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 800,
          textTransform: "uppercase", letterSpacing: "0.04em", color: "#F0F0F0", margin: 0,
          display: "flex", alignItems: "center",
        }}>
          {pageTitle}
          {!subtitle && <BlinkDots />}
        </h1>
        {subtitle && (
          <span style={{ fontFamily: "var(--font-display)", fontSize: 12, color: "#00AFFF", marginLeft: 10, letterSpacing: "0.08em" }}>
            {subtitle}
          </span>
        )}
      </div>

      {/* Busca */}
      <div style={{
        position: "relative", width: 240,
        background: "#111", border: "1px solid #1E1E1E",
        display: "flex", alignItems: "center", gap: 8, padding: "6px 10px",
      }}>
        <Search size={12} style={{ color: "#444", flexShrink: 0 }} />
        <input
          placeholder="Buscar leads, empresas..."
          style={{
            background: "transparent", border: "none", outline: "none",
            fontFamily: "var(--font-body)", fontSize: 12, color: "#888", width: "100%",
          }}
        />
      </div>

      {/* Data */}
      <button style={{
        display: "flex", alignItems: "center", gap: 6,
        background: "#111", border: "1px solid #1E1E1E",
        padding: "6px 10px", color: "#666", cursor: "pointer",
        fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 600,
      }}>
        <Calendar size={12} style={{ color: "#FFD400" }} />
        Hoje, 14 de Mai
        <ChevronDown size={11} style={{ color: "#444" }} />
      </button>

      {/* Pixel decorativo */}
      <span style={{ width: 6, height: 6, background: "#FFD400", flexShrink: 0, display: "block" }} />

      {/* Bell */}
      <button style={{ background: "transparent", border: "none", cursor: "pointer", position: "relative", padding: 4 }}>
        <Bell size={16} style={{ color: "#555" }} />
        <span style={{
          position: "absolute", top: 2, right: 2,
          width: 6, height: 6, borderRadius: "50%",
          background: "#FFD400", border: "1px solid #0D0D0D",
        }} />
      </button>

      {/* Usuário */}
      <button style={{ display: "flex", alignItems: "center", gap: 8, background: "transparent", border: "none", cursor: "pointer" }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: "#222", border: "1px solid #333",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700, color: "#888",
        }}>JS</div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 600, color: "#CCC" }}>João Silva</div>
          <div style={{ fontFamily: "var(--font-display)", fontSize: 10, color: "#555" }}>Admin</div>
        </div>
        <ChevronDown size={11} style={{ color: "#444" }} />
      </button>
    </header>
  )
}
