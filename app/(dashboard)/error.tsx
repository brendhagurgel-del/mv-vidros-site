"use client"

interface ErrorPageProps {
  error: Error
  reset: () => void
}

export default function DashboardError({ error, reset }: ErrorPageProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 bg-[#0D0D0D] px-4 text-center">
      {/* Title */}
      <div className="flex flex-col items-center gap-1">
        <span
          className="text-2xl font-bold tracking-widest uppercase"
          style={{
            fontFamily: "var(--font-display, Rajdhani, sans-serif)",
            color: "#FF4444",
          }}
        >
          ERRO NO SISTEMA
        </span>
        <span
          className="text-sm font-bold tracking-widest uppercase text-[#FFD400]"
          style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
        >
          ·:· falha detectada ·:·
        </span>
      </div>

      {/* Error message */}
      <div className="max-w-md border border-[#2A2A2A] bg-[#0A0A0A] px-4 py-3">
        <p
          className="text-[12px] text-[#888] break-words"
          style={{ fontFamily: "var(--font-mono, 'JetBrains Mono', monospace)" }}
        >
          {error.message || "Erro desconhecido"}
        </p>
      </div>

      {/* Reset button */}
      <button
        onClick={reset}
        className="bg-[#FFD400] text-black font-bold text-sm px-6 py-3 hover:bg-[#F0C800] transition-colors tracking-widest uppercase"
        style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
      >
        TENTAR NOVAMENTE
      </button>
    </div>
  )
}
