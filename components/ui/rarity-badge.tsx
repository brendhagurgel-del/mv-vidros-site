export type Rarity = "LENDÁRIO" | "RARO" | "COMUM" | "BAIXO"

const RARITY_STYLES: Record<Rarity, { bg: string; border: string; text: string }> = {
  "LENDÁRIO": { bg: "#FFD400",                border: "#FFD400", text: "#000000" },
  "RARO":     { bg: "transparent",            border: "#00AFFF", text: "#00AFFF" },
  "COMUM":    { bg: "transparent",            border: "#444444", text: "#666666" },
  "BAIXO":    { bg: "rgba(255,255,255,0.03)", border: "#2A2A2A", text: "#444444" },
}

export function getRarityFromScore(score: number): Rarity {
  if (score >= 85) return "LENDÁRIO"
  if (score >= 70) return "RARO"
  if (score >= 50) return "COMUM"
  return "BAIXO"
}

interface RarityBadgeProps {
  rarity?: Rarity
  score?: number
  size?: "sm" | "md" | "lg"
}

export function RarityBadge({ rarity, score, size = "md" }: RarityBadgeProps) {
  const r: Rarity = rarity ?? getRarityFromScore(score ?? 0)
  const s = RARITY_STYLES[r]
  const fontSize = size === "sm" ? 8 : size === "lg" ? 11 : 9
  const padding  = size === "sm" ? "2px 5px" : size === "lg" ? "3px 10px" : "2px 7px"

  return (
    <span style={{
      background: s.bg, border: `1px solid ${s.border}`, color: s.text,
      fontFamily: "var(--font-display)", fontSize, fontWeight: 700,
      textTransform: "uppercase", letterSpacing: "0.08em",
      padding, borderRadius: 0, display: "inline-block", lineHeight: "14px", whiteSpace: "nowrap",
    }}>
      {r}
    </span>
  )
}
