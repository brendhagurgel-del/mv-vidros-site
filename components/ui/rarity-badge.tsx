import { clsx } from "clsx"

type Rarity = "LENDÁRIO" | "RARO" | "COMUM" | "BAIXO"

interface RarityBadgeProps {
  score?: number
  rarity?: Rarity
  className?: string
  size?: "sm" | "md" | "lg"
}

function getRarityFromScore(score: number): Rarity {
  if (score >= 85) return "LENDÁRIO"
  if (score >= 70) return "RARO"
  if (score >= 50) return "COMUM"
  return "BAIXO"
}

const rarityConfig: Record<
  Rarity,
  { bg: string; text: string; border: string; dot: string }
> = {
  "LENDÁRIO": {
    bg: "bg-[#FFD400]/10",
    text: "text-[#FFD400]",
    border: "border-[#FFD400]/40",
    dot: "bg-[#FFD400]",
  },
  RARO: {
    bg: "bg-[#00B2FF]/10",
    text: "text-[#00B2FF]",
    border: "border-[#00B2FF]/40",
    dot: "bg-[#00B2FF]",
  },
  COMUM: {
    bg: "bg-[#555555]/20",
    text: "text-[#AAAAAA]",
    border: "border-[#555555]/40",
    dot: "bg-[#555555]",
  },
  BAIXO: {
    bg: "bg-[#333333]/30",
    text: "text-[#666666]",
    border: "border-[#333333]/40",
    dot: "bg-[#444444]",
  },
}

const sizeConfig = {
  sm: "text-[9px] px-1.5 py-0.5 gap-1",
  md: "text-[10px] px-2 py-1 gap-1.5",
  lg: "text-xs px-3 py-1.5 gap-2",
}

export function RarityBadge({
  score,
  rarity: rarityProp,
  className,
  size = "md",
}: RarityBadgeProps) {
  const rarity =
    rarityProp ?? (score !== undefined ? getRarityFromScore(score) : "COMUM")
  const config = rarityConfig[rarity]

  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-none border font-display font-bold tracking-widest uppercase",
        config.bg,
        config.text,
        config.border,
        sizeConfig[size],
        className
      )}
    >
      <span
        className={clsx("w-1.5 h-1.5 rounded-none flex-shrink-0", config.dot)}
        aria-hidden="true"
      />
      {rarity}
    </span>
  )
}

export { getRarityFromScore }
export type { Rarity }
