export default function DashboardLoading() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 bg-[#0D0D0D]">
      {/* 4-square pulsing spinner */}
      <div className="grid grid-cols-2 gap-1.5">
        <div className="h-4 w-4 bg-[#FFD400] animate-pulse" style={{ animationDelay: "0ms" }} />
        <div className="h-4 w-4 bg-[#FFD400] animate-pulse" style={{ animationDelay: "150ms" }} />
        <div className="h-4 w-4 bg-[#FFD400] animate-pulse" style={{ animationDelay: "300ms" }} />
        <div className="h-4 w-4 bg-[#FFD400] animate-pulse" style={{ animationDelay: "450ms" }} />
      </div>

      {/* Label */}
      <p
        className="text-[#FFD400] font-bold tracking-widest text-sm uppercase"
        style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}
      >
        CARREGANDO...
      </p>
    </div>
  )
}
