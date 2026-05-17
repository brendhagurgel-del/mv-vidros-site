"use client"

import { useState } from "react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { clsx } from "clsx"

const data30d = [
  { date: "15 Abr", leads: 210 },
  { date: "17 Abr", leads: 280 },
  { date: "19 Abr", leads: 240 },
  { date: "21 Abr", leads: 390 },
  { date: "23 Abr", leads: 320 },
  { date: "25 Abr", leads: 460 },
  { date: "27 Abr", leads: 410 },
  { date: "29 Abr", leads: 550 },
  { date: "01 Mai", leads: 480 },
  { date: "03 Mai", leads: 600 },
  { date: "05 Mai", leads: 560 },
  { date: "07 Mai", leads: 680 },
  { date: "09 Mai", leads: 640 },
  { date: "11 Mai", leads: 720 },
  { date: "14 Mai", leads: 900 },
]

const periods = ["Últimos 7 dias", "Últimos 30 dias", "Últimos 90 dias"]

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#111111] border border-[#2A2A2A] px-3 py-2">
      <p className="text-[9px] font-mono text-[#888888] mb-1">{label}</p>
      <p className="text-[13px] font-display font-bold text-[#FFD400]">
        {payload[0].value.toLocaleString("pt-BR")} leads
      </p>
    </div>
  )
}

export function LeadsChart() {
  const [period, setPeriod] = useState("Últimos 30 dias")

  return (
    <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-4">
      {/* Pixel corners */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#FFD400]/40" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#FFD400]/40" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#FFD400]/40" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#FFD400]/40" />

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[10px] font-display font-bold text-[#888888] uppercase tracking-widest">
          Leads Encontrados (Últimos 30 dias)
        </h3>
        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="bg-[#111111] border border-[#2A2A2A] text-[10px] font-display font-bold text-white px-2 py-1 outline-none"
        >
          {periods.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <AreaChart data={data30d} margin={{ top: 4, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="leadsGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#FFD400" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#FFD400" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tick={{ fill: "#555555", fontSize: 9, fontFamily: "monospace" }}
            axisLine={false}
            tickLine={false}
            interval={2}
          />
          <YAxis
            tick={{ fill: "#555555", fontSize: 9, fontFamily: "monospace" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#FFD400", strokeWidth: 1, strokeDasharray: "4 4" }} />
          <Area
            type="monotone"
            dataKey="leads"
            stroke="#FFD400"
            strokeWidth={2}
            fill="url(#leadsGrad)"
            dot={false}
            activeDot={{ r: 4, fill: "#FFD400", stroke: "#0D0D0D", strokeWidth: 2 }}
          />
        </AreaChart>
      </ResponsiveContainer>

      {/* Stats row */}
      <div className="flex items-center gap-6 mt-3 pt-3 border-t border-[#1A1A1A]">
        {[
          { label: "Novos Leads", value: "1.248", trend: "+18,6%", color: "text-[#FFD400]" },
          { label: "Média Diária", value: "41,6", trend: "+11,2%", color: "text-[#00B2FF]" },
          { label: "Taxa de Conversão", value: "25,8%", trend: "+7,4%", color: "text-[#00CC66]" },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-[8px] font-mono text-[#555555] uppercase tracking-wider mb-0.5">
              {s.label}
            </p>
            <div className="flex items-baseline gap-1.5">
              <span className={clsx("text-lg font-display font-bold leading-none", s.color)}>
                {s.value}
              </span>
              <span className="text-[9px] font-mono text-[#00CC66]">{s.trend}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
