"use client"

"use client"

import { type LucideIcon, TrendingUp, TrendingDown } from "lucide-react"
import { clsx } from "clsx"
import { AnimatedCounter } from "./animated-counter"

interface SparkPoint {
  value: number
}

interface MetricCardProps {
  label: string
  value: number
  icon: LucideIcon
  iconColor?: "white" | "yellow" | "blue" | "gray"
  trend?: number
  trendLabel?: string
  sparkline?: SparkPoint[]
  prefix?: string
  suffix?: string
  className?: string
}

const iconColorConfig = {
  white: "text-white bg-white/10",
  yellow: "text-[#FFD400] bg-[#FFD400]/10",
  blue: "text-[#00B2FF] bg-[#00B2FF]/10",
  gray: "text-[#888888] bg-[#888888]/10",
}

function MiniSparkline({ data }: { data: SparkPoint[] }) {
  if (!data.length) return null
  const max = Math.max(...data.map((d) => d.value))
  const min = Math.min(...data.map((d) => d.value))
  const range = max - min || 1
  const height = 24
  const width = 60
  const step = width / (data.length - 1)

  const points = data
    .map((d, i) => {
      const x = i * step
      const y = height - ((d.value - min) / range) * height
      return `${x},${y}`
    })
    .join(" ")

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible opacity-60"
      aria-hidden="true"
    >
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function MetricCard({
  label,
  value,
  icon: Icon,
  iconColor = "white",
  trend,
  trendLabel,
  sparkline,
  prefix,
  suffix,
  className,
}: MetricCardProps) {
  const isPositive = trend !== undefined && trend >= 0

  return (
    <div
      className={clsx(
        "relative border border-[#2A2A2A] bg-[#1A1A1A] p-4 transition-all duration-150",
        "hover:border-[#3A3A3A] hover:bg-[#1E1E1E] group",
        className
      )}
    >
      {/* Pixel corner decorations */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-[#FFD400]/60" aria-hidden="true" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-[#FFD400]/60" aria-hidden="true" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-[#FFD400]/60" aria-hidden="true" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-[#FFD400]/60" aria-hidden="true" />

      <div className="flex items-start justify-between mb-3">
        <p className="text-[10px] font-display font-bold text-[#888888] uppercase tracking-widest">
          {label}
        </p>
        <div
          className={clsx(
            "w-7 h-7 rounded-none flex items-center justify-center flex-shrink-0",
            iconColorConfig[iconColor]
          )}
        >
          <Icon size={14} aria-hidden="true" />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div>
          <p className="font-display font-bold text-2xl text-white leading-none">
            {prefix}
            <AnimatedCounter value={value} />
            {suffix}
          </p>
          {trend !== undefined && (
            <div
              className={clsx(
                "flex items-center gap-0.5 mt-1",
                isPositive ? "text-[#00CC66]" : "text-[#FF4444]"
              )}
            >
              {isPositive ? (
                <TrendingUp size={10} aria-hidden="true" />
              ) : (
                <TrendingDown size={10} aria-hidden="true" />
              )}
              <span className="text-[9px] font-mono">
                {isPositive ? "+" : ""}
                {trend}%{trendLabel ? ` ${trendLabel}` : ""}
              </span>
            </div>
          )}
        </div>

        {sparkline && sparkline.length > 1 && (
          <div
            className={clsx(
              iconColor === "yellow"
                ? "text-[#FFD400]"
                : iconColor === "blue"
                ? "text-[#00B2FF]"
                : "text-[#888888]"
            )}
          >
            <MiniSparkline data={sparkline} />
          </div>
        )}
      </div>
    </div>
  )
}
