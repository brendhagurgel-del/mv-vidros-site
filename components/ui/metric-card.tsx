"use client"
import { LucideIcon } from "lucide-react"
import { Sparkline } from "./sparkline"

interface MetricCardProps {
  label: string
  value: string | number
  suffix?: string
  icon: LucideIcon
  trend?: number
  color?: "white" | "yellow" | "blue" | "gray" | "green"
  sparkline?: { value: number }[]
}

const COLOR_MAP = {
  white:  { text: "#F0F0F0", spark: "#444444", icon: "#888888" },
  yellow: { text: "#FFD400", spark: "#FFD400", icon: "#FFD400" },
  blue:   { text: "#00AFFF", spark: "#00AFFF", icon: "#00AFFF" },
  gray:   { text: "#666666", spark: "#333333", icon: "#555555" },
  green:  { text: "#12D36B", spark: "#12D36B", icon: "#12D36B" },
}

export function MetricCard({ label, value, suffix, icon: Icon, trend, color = "white", sparkline }: MetricCardProps) {
  const c = COLOR_MAP[color]
  const sparkData = sparkline?.map((s) => s.value)
  const displayValue = typeof value === "number" ? value.toLocaleString("pt-BR") : value

  return (
    <div style={{ position: "relative", background: "#111111", border: "1px solid #1A1A1A", display: "flex", flexDirection: "column", minHeight: 110 }}>
      {/* HUD corners */}
      {(["tl","tr","bl","br"] as const).map((pos) => (
        <span key={pos} style={{
          position: "absolute", width: 7, height: 7, pointerEvents: "none",
          top:    pos.includes("t") ? 0 : "auto", bottom: pos.includes("b") ? 0 : "auto",
          left:   pos.includes("l") ? 0 : "auto", right:  pos.includes("r") ? 0 : "auto",
          borderTop:    pos.includes("t") ? "1.5px solid #2A2A2A" : undefined,
          borderBottom: pos.includes("b") ? "1.5px solid #2A2A2A" : undefined,
          borderLeft:   pos.includes("l") ? "1.5px solid #2A2A2A" : undefined,
          borderRight:  pos.includes("r") ? "1.5px solid #2A2A2A" : undefined,
        }} />
      ))}

      <div style={{ flex: 1, padding: "12px 12px 8px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "#666" }}>
            {label}
          </span>
          <Icon size={15} style={{ color: c.icon, opacity: 0.8, marginTop: 1, flexShrink: 0 }} />
        </div>

        <div style={{ fontFamily: "var(--font-display)", fontSize: 34, fontWeight: 700, lineHeight: 1, color: c.text, marginBottom: 4 }}>
          {displayValue}{suffix && <span style={{ fontSize: 18, opacity: 0.7 }}>{suffix}</span>}
        </div>

        {trend !== undefined && (
          <div style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 600, color: trend >= 0 ? "#12D36B" : "#E03535" }}>
            {trend >= 0 ? "↑" : "↓"} {Math.abs(trend)}%
          </div>
        )}
      </div>

      {sparkData && sparkData.length > 1 && (
        <div style={{ marginTop: "auto" }}>
          <Sparkline data={sparkData} color={c.spark} height={24} />
        </div>
      )}
    </div>
  )
}
