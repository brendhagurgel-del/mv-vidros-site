import React from "react"

interface HudCardProps {
  children: React.ReactNode
  variant?: "default" | "yellow" | "blue" | "green" | "orange"
  glow?: boolean
  cornerSize?: number
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const CORNER_COLORS = {
  default: "#2A2A2A",
  yellow:  "#FFD400",
  blue:    "#00AFFF",
  green:   "#12D36B",
  orange:  "#FF6B00",
}

export function HudCard({
  children,
  variant = "default",
  glow = false,
  cornerSize = 8,
  className = "",
  style,
  onClick,
}: HudCardProps) {
  const cc = CORNER_COLORS[variant]
  const cs = cornerSize

  const glowStyle = glow ? {
    yellow:  "0 0 20px rgba(255,212,0,0.12)",
    blue:    "0 0 20px rgba(0,175,255,0.10)",
    green:   "0 0 20px rgba(18,211,107,0.10)",
    orange:  "0 0 20px rgba(255,107,0,0.10)",
    default: "none",
  }[variant] : "none"

  return (
    <div
      onClick={onClick}
      className={className}
      style={{
        position: "relative",
        background: "#111111",
        border: "1px solid #1A1A1A",
        transition: "all 0.15s ease",
        cursor: onClick ? "pointer" : undefined,
        boxShadow: glowStyle,
        ...style,
      }}
    >
      <span style={{ position:"absolute", top:0, left:0, width:cs, height:cs, borderTop:`1.5px solid ${cc}`, borderLeft:`1.5px solid ${cc}`, pointerEvents:"none" }} />
      <span style={{ position:"absolute", top:0, right:0, width:cs, height:cs, borderTop:`1.5px solid ${cc}`, borderRight:`1.5px solid ${cc}`, pointerEvents:"none" }} />
      <span style={{ position:"absolute", bottom:0, left:0, width:cs, height:cs, borderBottom:`1.5px solid ${cc}`, borderLeft:`1.5px solid ${cc}`, pointerEvents:"none" }} />
      <span style={{ position:"absolute", bottom:0, right:0, width:cs, height:cs, borderBottom:`1.5px solid ${cc}`, borderRight:`1.5px solid ${cc}`, pointerEvents:"none" }} />
      {children}
    </div>
  )
}
