interface SparklineProps {
  data: number[]
  color: string
  height?: number
  showDots?: boolean
}

export function Sparkline({ data, color, height = 28, showDots = false }: SparklineProps) {
  if (!data || data.length < 2) return null
  const W = 100
  const H = height
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const pad = 2

  const pts = data.map((v, i) => ({
    x: (i / (data.length - 1)) * (W - pad * 2) + pad,
    y: H - pad - ((v - min) / range) * (H - pad * 2),
  }))

  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")
  const areaPath = `${linePath} L${(W - pad).toFixed(1)},${H} L${pad},${H} Z`
  const gradId = `sg-${color.replace("#", "")}`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: "100%", height, overflow: "visible", display: "block" }}>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity={0.18} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#${gradId})`} />
      <path d={linePath} stroke={color} strokeWidth={1.2} fill="none" strokeLinecap="round" />
      {showDots && (
        <>
          <circle cx={pts[0].x} cy={pts[0].y} r={2} fill={color} />
          <circle cx={pts[pts.length - 1].x} cy={pts[pts.length - 1].y} r={2.5} fill={color} />
        </>
      )}
    </svg>
  )
}
