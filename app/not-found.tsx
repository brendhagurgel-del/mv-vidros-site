"use client"

import Link from "next/link"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center px-4 text-center">
      {/* ASCII pixel-art decoration top */}
      <div
        className="mb-6 text-[#FFD400] leading-none select-none"
        style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)", fontSize: "10px" }}
        aria-hidden="true"
      >
        <div className="flex gap-1 justify-center mb-1">
          <span className="w-2 h-2 bg-[#FFD400] inline-block" />
          <span className="w-2 h-2 bg-[#FFD400] inline-block" />
          <span className="w-2 h-2 inline-block" />
          <span className="w-2 h-2 bg-[#FFD400] inline-block" />
          <span className="w-2 h-2 bg-[#FFD400] inline-block" />
        </div>
        <div className="flex gap-1 justify-center mb-1">
          <span className="w-2 h-2 inline-block" />
          <span className="w-2 h-2 bg-[#00B2FF] inline-block" />
          <span className="w-2 h-2 bg-[#FFD400] inline-block" />
          <span className="w-2 h-2 bg-[#00B2FF] inline-block" />
          <span className="w-2 h-2 inline-block" />
        </div>
        <div className="flex gap-1 justify-center">
          <span className="w-2 h-2 bg-[#FFD400] inline-block" />
          <span className="w-2 h-2 bg-[#FFD400] inline-block" />
          <span className="w-2 h-2 inline-block" />
          <span className="w-2 h-2 bg-[#FFD400] inline-block" />
          <span className="w-2 h-2 bg-[#FFD400] inline-block" />
        </div>
      </div>

      {/* 404 number */}
      <div
        className="text-[#FFD400] font-bold leading-none mb-4 select-none"
        style={{
          fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)",
          fontSize: "96px",
        }}
      >
        404
      </div>

      {/* Title */}
      <h1
        className="text-white font-bold tracking-widest uppercase mb-3 text-2xl"
        style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
      >
        PÁGINA NÃO ENCONTRADA
      </h1>

      {/* Subtitle */}
      <p
        className="text-[#555] text-sm mb-8"
        style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
      >
        Parece que esse lead escapou...
      </p>

      {/* Back button */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-[#FFD400] text-black font-bold text-sm px-6 py-3 hover:bg-[#F0C800] transition-colors tracking-widest uppercase"
        style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
      >
        ← VOLTAR AO DASHBOARD
      </Link>
    </div>
  )
}
