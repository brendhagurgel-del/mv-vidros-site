interface SegmentedBarProps {
  value: number
  max?: number
  color?: string
  segments?: number
  height?: number
}

export function SegmentedBar({ value, max = 100, color = "#FFD400", segments = 16, height = 6 }: SegmentedBarProps) {
  const filled = Math.round(Math.min(value / max, 1) * segments)
  return (
    <div style={{ display: "flex", gap: 2, height }}>
      {Array.from({ length: segments }).map((_, i) => (
        <div key={i} style={{ flex: 1, height: "100%", background: i < filled ? color : "#1A1A1A", transition: "background 0.3s ease" }} />
      ))}
    </div>
  )
}
