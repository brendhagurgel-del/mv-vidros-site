import { Header } from "@/components/layout/header"
import { Settings } from "lucide-react"

export default function ConfiguracoesPage() {
  return (
    <>
      <Header title="Configurações" subtitle="·:· sistema e conta" />
      <div className="flex flex-1 items-center justify-center p-8">
        <div className="relative border border-[#1E1E1E] bg-[#0A0A0A] p-8 text-center">
          {/* PixelCorners */}
          <span className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l-2 border-t-2 border-[#FFD400]" />
          <span className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r-2 border-t-2 border-[#FFD400]" />
          <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b-2 border-l-2 border-[#FFD400]" />
          <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b-2 border-r-2 border-[#FFD400]" />
          <Settings size={32} className="mx-auto mb-3 text-[#FFD400]" />
          <p className="text-lg font-bold tracking-widest text-white" style={{ fontFamily: "var(--font-display, Rajdhani, sans-serif)" }}>CONFIGURAÇÕES</p>
          <p className="mt-1 text-[12px] text-[#555]" style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}>Em desenvolvimento — Fase 14</p>
        </div>
      </div>
    </>
  )
}
