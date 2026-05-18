"use client"
import React from "react"

interface CTAButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: "yellow" | "blue" | "green" | "outline"
  fullWidth?: boolean
  icon?: React.ReactNode
  disabled?: boolean
  type?: "button" | "submit"
  size?: "sm" | "md" | "lg"
}

const STYLES = {
  yellow:  { bg: "#FFD400", text: "#000000", border: "#FFD400",  hover: "#FFC800", glow: "0 0 16px rgba(255,212,0,0.25)" },
  blue:    { bg: "#00AFFF", text: "#000000", border: "#00AFFF",  hover: "#0088CC", glow: "0 0 16px rgba(0,175,255,0.20)" },
  green:   { bg: "#12D36B", text: "#000000", border: "#12D36B",  hover: "#0fb85c", glow: "0 0 16px rgba(18,211,107,0.20)" },
  outline: { bg: "transparent", text: "#F0F0F0", border: "#2A2A2A", hover: "#1A1A1A", glow: "none" },
}

const SIZES = {
  sm: { padding: "6px 14px", fontSize: 11 },
  md: { padding: "10px 20px", fontSize: 13 },
  lg: { padding: "13px 28px", fontSize: 14 },
}

export function CTAButton({ children, onClick, variant = "yellow", fullWidth = false, icon, disabled = false, type = "button", size = "md" }: CTAButtonProps) {
  const s = STYLES[variant]
  const sz = SIZES[size]
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        background: s.bg, color: s.text, border: `1px solid ${s.border}`,
        padding: sz.padding, width: fullWidth ? "100%" : "auto",
        fontFamily: "var(--font-display)", fontSize: sz.fontSize, fontWeight: 800,
        textTransform: "uppercase", letterSpacing: "0.08em",
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        cursor: disabled ? "not-allowed" : "pointer", borderRadius: 0,
        transition: "all 0.15s ease", boxShadow: s.glow, opacity: disabled ? 0.5 : 1,
      }}
      onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = s.hover }}
      onMouseLeave={(e) => { if (!disabled) e.currentTarget.style.background = s.bg }}
    >
      {icon}
      {children}
    </button>
  )
}
