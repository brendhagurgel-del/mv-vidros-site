"use client"

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts"
import { Star } from "lucide-react"

const data = [
  { name: "Quentes", value: 843, pct: 67.6, color: "#FFD400" },
  { name: "Médios", value: 323, pct: 25.9, color: "#00B2FF" },
  { name: "Fracos", value: 82, pct: 6.6, color: "#333333" },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null
  const d = payload[0].payload
  return (
    <div className="bg-[#111111] border border-[#2A2A2A] px-3 py-2">
      <p className="text-[9px] font-mono text-[#888888]">{d.name}</p>
      <p className="text-[13px] font-display font-bold" style={{ color: d.color }}>
        {d.value.toLocaleString("pt-BR")}
      </p>
    </div>
  )
}

export function QualityDonut() {
  return (
    <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-4">
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FFD400]/40" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FFD400]/40" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#FFD400]/40" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FFD400]/40" />

      <h3 className="text-[10px] font-display font-bold text-[#888888] uppercase tracking-widest mb-3">
        Distribuição por Qualidade
      </h3>

      <div className="relative flex justify-center">
        <ResponsiveContainer width={160} height={160}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={52}
              outerRadius={72}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              strokeWidth={0}
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl font-display font-bold text-white leading-none">1.248</span>
          <span className="text-[8px] font-mono text-[#555555] uppercase tracking-wider mt-0.5">Total</span>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-1.5 mt-3">
        {data.map((d) => (
          <div key={d.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2" style={{ backgroundColor: d.color }} />
              <span className="text-[10px] font-body text-[#888888]">{d.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[9px] font-mono text-[#555555]">({d.pct}%)</span>
              <span className="text-[10px] font-display font-bold text-white w-8 text-right">
                {d.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Star rating */}
      <div className="mt-3 pt-3 border-t border-[#1A1A1A]">
        <p className="text-[8px] font-mono text-[#555555] uppercase tracking-wider mb-1.5">
          Qualidade Média
        </p>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < 4 ? "text-[#FFD400]" : "text-[#333333]"}
              fill={i < 4 ? "#FFD400" : "none"}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
