"use client"
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts"
import { useState } from "react"

interface ChartPoint { date: string; leads: number; conversions?: number }

const PERIODS = ["7 dias", "15 dias", "30 dias", "90 dias"] as const

const generateData = (days: number): ChartPoint[] => {
  return Array.from({ length: days }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (days - 1 - i))
    const label = `${d.getDate()} ${d.toLocaleString("pt-BR", { month: "short" })}`
    const base = 200 + Math.random() * 800
    return { date: label, leads: Math.round(base), conversions: Math.round(base * 0.25) }
  }).filter((_, i) => i % Math.ceil(days / 12) === 0 || days <= 15)
}

export function LeadsChart() {
  const [period, setPeriod] = useState<(typeof PERIODS)[number]>("30 dias")
  const days = period === "7 dias" ? 7 : period === "15 dias" ? 15 : period === "90 dias" ? 90 : 30
  const data = generateData(days)

  const total  = data.reduce((s, d) => s + d.leads, 0)
  const avg    = Math.round(total / data.length)
  const conv   = data.reduce((s, d) => s + (d.conversions ?? 0), 0)
  const convPct = ((conv / total) * 100).toFixed(1)

  return (
    <div style={{ background: "#111111", border: "1px solid #1A1A1A", padding: 16, position: "relative", height: "100%" }}>
      {/* HUD corners */}
      {(["tl","tr","bl","br"] as const).map((pos) => (
        <span key={pos} style={{
          position:"absolute", width:8, height:8, pointerEvents:"none",
          top: pos.includes("t") ? 0 : "auto", bottom: pos.includes("b") ? 0 : "auto",
          left: pos.includes("l") ? 0 : "auto", right: pos.includes("r") ? 0 : "auto",
          borderTop:    pos.includes("t") ? "1.5px solid #2A2A2A" : undefined,
          borderBottom: pos.includes("b") ? "1.5px solid #2A2A2A" : undefined,
          borderLeft:   pos.includes("l") ? "1.5px solid #2A2A2A" : undefined,
          borderRight:  pos.includes("r") ? "1.5px solid #2A2A2A" : undefined,
        }} />
      ))}

      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <span style={{ fontFamily:"var(--font-display)", fontSize:11, fontWeight:700, color:"#888", textTransform:"uppercase", letterSpacing:"0.12em" }}>
          LEADS ENCONTRADOS (ÚLTIMOS {period.toUpperCase()})
        </span>
        <div style={{ display:"flex", gap:4 }}>
          {PERIODS.map((p) => (
            <button key={p} onClick={() => setPeriod(p)} style={{
              background: p === period ? "#FFD400" : "transparent",
              color: p === period ? "#000" : "#555",
              border: `1px solid ${p === period ? "#FFD400" : "#2A2A2A"}`,
              padding: "3px 8px", cursor:"pointer",
              fontFamily:"var(--font-display)", fontSize:10, fontWeight:700,
              textTransform:"uppercase", letterSpacing:"0.06em", borderRadius:0,
            }}>
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={180}>
        <AreaChart data={data} margin={{ top:8, right:4, left:-20, bottom:0 }}>
          <defs>
            <linearGradient id="yellowFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#FFD400" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#FFD400" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="1 8" stroke="#1A1A1A" vertical={false} />
          <XAxis dataKey="date" tick={{ fontFamily:"var(--font-display)", fontSize:10, fill:"#444" }} axisLine={false} tickLine={false} tickMargin={8} />
          <YAxis tick={{ fontFamily:"var(--font-display)", fontSize:10, fill:"#444" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ background:"#161616", border:"1px solid #2A2A2A", borderRadius:0, fontFamily:"var(--font-display)", fontSize:12 }}
            labelStyle={{ color:"#FFD400" }}
            itemStyle={{ color:"#F0F0F0" }}
          />
          <Area type="monotone" dataKey="leads" stroke="#FFD400" strokeWidth={2} fill="url(#yellowFill)" dot={false}
            activeDot={{ r:4, fill:"#FFD400", stroke:"#111", strokeWidth:2 }} />
        </AreaChart>
      </ResponsiveContainer>

      {/* Stats row */}
      <div style={{ display:"flex", gap:24, marginTop:12, paddingTop:12, borderTop:"1px solid #1A1A1A" }}>
        {[
          { label:"↗ NOVOS LEADS", value: total.toLocaleString("pt-BR"), color:"#F0F0F0" },
          { label:"● MÉDIA DIÁRIA", value: avg.toLocaleString("pt-BR"), color:"#FFD400" },
          { label:"◆ TAXA CONVERSÃO", value: `${convPct}%`, color:"#00AFFF" },
        ].map(({ label, value, color }) => (
          <div key={label}>
            <div style={{ fontFamily:"var(--font-display)", fontSize:9, color:"#555", textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:2 }}>{label}</div>
            <div style={{ fontFamily:"var(--font-display)", fontSize:20, fontWeight:700, color }}>{value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
