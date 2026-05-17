import { clsx } from "clsx"

interface PixelProgressProps {
  value: number
  max?: number
  segments?: number
  color?: "yellow" | "blue" | "green" | "red"
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
  label?: string
  className?: string
}

const colorConfig = {
  yellow: {
    filled: "bg-[#FFD400]",
    empty: "bg-[#2A2A2A]",
    glow: "shadow-[0_0_6px_rgba(255,212,0,0.5)]",
  },
  blue: {
    filled: "bg-[#00B2FF]",
    empty: "bg-[#2A2A2A]",
    glow: "shadow-[0_0_6px_rgba(0,178,255,0.5)]",
  },
  green: {
    filled: "bg-[#00CC66]",
    empty: "bg-[#2A2A2A]",
    glow: "shadow-[0_0_6px_rgba(0,204,102,0.5)]",
  },
  red: {
    filled: "bg-[#FF4444]",
    empty: "bg-[#2A2A2A]",
    glow: "shadow-[0_0_6px_rgba(255,68,68,0.5)]",
  },
}

const sizeConfig = {
  sm: { height: "h-1.5", gap: "gap-px" },
  md: { height: "h-2.5", gap: "gap-0.5" },
  lg: { height: "h-3.5", gap: "gap-0.5" },
}

export function PixelProgress({
  value,
  max = 100,
  segments = 10,
  color = "yellow",
  size = "md",
  showLabel = false,
  label,
  className,
}: PixelProgressProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  const filledSegments = Math.round((percentage / 100) * segments)
  const colors = colorConfig[color]
  const sizes = sizeConfig[size]

  return (
    <div className={clsx("w-full", className)}>
      {(showLabel || label) && (
        <div className="flex justify-between items-center mb-1">
          {label && (
            <span className="text-[10px] font-display font-bold text-[#888888] uppercase tracking-wider">
              {label}
            </span>
          )}
          {showLabel && (
            <span className="text-[10px] font-mono text-[#888888]">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={clsx("flex w-full", sizes.gap)}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label ?? `Progress: ${Math.round(percentage)}%`}
      >
        {Array.from({ length: segments }).map((_, i) => (
          <div
            key={i}
            className={clsx(
              "flex-1 rounded-none transition-all duration-300",
              sizes.height,
              i < filledSegments
                ? clsx(colors.filled, colors.glow)
                : colors.empty
            )}
          />
        ))}
      </div>
    </div>
  )
}
