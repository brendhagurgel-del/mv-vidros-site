import { PixelCard } from "@/components/ui/pixel-card"
import { RarityBadge } from "@/components/ui/rarity-badge"
import { PixelProgress } from "@/components/ui/pixel-progress"
import { StatusBadge } from "@/components/ui/status-badge"
import { MetricCard } from "@/components/ui/metric-card"
import {
  Users,
  Flame,
  Diamond,
  Shield,
  Megaphone,
  MessageSquare,
} from "lucide-react"

export default function DesignSystemPage() {
  const sparkData = [
    { value: 20 },
    { value: 45 },
    { value: 30 },
    { value: 60 },
    { value: 55 },
  ]

  return (
    <main className="min-h-screen bg-[#0D0D0D] p-8">
      <div className="max-w-5xl mx-auto space-y-12">
        {/* Header */}
        <div className="border-b border-[#2A2A2A] pb-6">
          <p className="text-[10px] font-display font-bold text-[#FFD400] uppercase tracking-[0.3em] mb-2">
            ■ Lead Machine AI
          </p>
          <h1 className="font-display font-bold text-4xl text-white tracking-tight">
            Design System — Fase 03
          </h1>
          <p className="text-[#888888] mt-2 font-body text-sm">
            Tokens, componentes e fundação visual do projeto.
          </p>
        </div>

        {/* Color Palette */}
        <section>
          <h2 className="font-display font-bold text-lg text-[#888888] uppercase tracking-wider mb-4">
            Paleta de Cores
          </h2>
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-9">
            {[
              { color: "#FFD400", name: "Yellow Primary" },
              { color: "#FFB800", name: "Yellow Secondary" },
              { color: "#00B2FF", name: "Blue Electric" },
              { color: "#0088CC", name: "Blue Dark" },
              { color: "#0D0D0D", name: "BG Base" },
              { color: "#1A1A1A", name: "BG Card" },
              { color: "#111111", name: "BG Sidebar" },
              { color: "#2A2A2A", name: "Border" },
              { color: "#888888", name: "Text Muted" },
            ].map((c) => (
              <div key={c.color} className="space-y-1.5">
                <div
                  className="h-10 w-full border border-[#2A2A2A]"
                  style={{ backgroundColor: c.color }}
                />
                <p className="text-[9px] font-mono text-[#888888] truncate">
                  {c.color}
                </p>
                <p className="text-[9px] font-body text-[#555555] truncate">
                  {c.name}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section>
          <h2 className="font-display font-bold text-lg text-[#888888] uppercase tracking-wider mb-4">
            Tipografia
          </h2>
          <PixelCard className="space-y-4">
            <div>
              <p className="text-[9px] font-mono text-[#888888] mb-1">PixelCraft — Títulos</p>
              <p className="font-pixel text-2xl text-[#FFD400]">
                LEAD MACHINE AI
              </p>
            </div>
            <div>
              <p className="text-[9px] font-mono text-[#888888] mb-1">Rajdhani Bold — Interface</p>
              <p className="font-display font-bold text-2xl text-white">
                Dashboard de Prospecção
              </p>
            </div>
            <div>
              <p className="text-[9px] font-mono text-[#888888] mb-1">Inter Regular — Corpo</p>
              <p className="font-body text-sm text-[#888888]">
                Texto descritivo, labels e informações secundárias do sistema.
              </p>
            </div>
            <div>
              <p className="text-[9px] font-mono text-[#888888] mb-1">JetBrains Mono — Códigos</p>
              <p className="font-mono text-sm text-[#00B2FF]">
                SCORE: 87/100 | XP: 7250 | LVL: 09
              </p>
            </div>
          </PixelCard>
        </section>

        {/* PixelCard Variants */}
        <section>
          <h2 className="font-display font-bold text-lg text-[#888888] uppercase tracking-wider mb-4">
            PixelCard — Variantes
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <PixelCard variant="default">
              <p className="font-display font-bold text-sm text-[#888888] uppercase tracking-wider">Default</p>
              <p className="text-xs text-[#555555] mt-1 font-body">Borda padrão</p>
            </PixelCard>
            <PixelCard variant="yellow" glow>
              <p className="font-display font-bold text-sm text-[#FFD400] uppercase tracking-wider">Yellow</p>
              <p className="text-xs text-[#555555] mt-1 font-body">Com glow</p>
            </PixelCard>
            <PixelCard variant="blue" glow>
              <p className="font-display font-bold text-sm text-[#00B2FF] uppercase tracking-wider">Blue</p>
              <p className="text-xs text-[#555555] mt-1 font-body">Com glow</p>
            </PixelCard>
            <PixelCard variant="ghost">
              <p className="font-display font-bold text-sm text-[#888888] uppercase tracking-wider">Ghost</p>
              <p className="text-xs text-[#555555] mt-1 font-body">Sem fundo</p>
            </PixelCard>
          </div>
        </section>

        {/* Rarity Badges */}
        <section>
          <h2 className="font-display font-bold text-lg text-[#888888] uppercase tracking-wider mb-4">
            RarityBadge — Sistema de Raridade
          </h2>
          <div className="flex flex-wrap gap-3 items-center">
            <RarityBadge score={92} size="lg" />
            <RarityBadge score={75} size="lg" />
            <RarityBadge score={60} size="lg" />
            <RarityBadge score={30} size="lg" />
            <RarityBadge score={92} size="md" />
            <RarityBadge score={75} size="md" />
            <RarityBadge score={92} size="sm" />
          </div>
        </section>

        {/* Status Badges */}
        <section>
          <h2 className="font-display font-bold text-lg text-[#888888] uppercase tracking-wider mb-4">
            StatusBadge — Estados do Sistema
          </h2>
          <div className="flex flex-wrap gap-2">
            {(
              [
                "NOVO",
                "ANALISADO",
                "PRONTO",
                "AGUARDANDO",
                "ENVIADO",
                "ATIVA",
                "PAUSADA",
                "AGENDADA",
                "CONCLUÍDA",
                "PENDENTE",
                "APROVADA",
                "REJEITADA",
              ] as const
            ).map((s) => (
              <StatusBadge key={s} status={s} />
            ))}
          </div>
        </section>

        {/* PixelProgress */}
        <section>
          <h2 className="font-display font-bold text-lg text-[#888888] uppercase tracking-wider mb-4">
            PixelProgress — Barras de Progresso
          </h2>
          <PixelCard className="space-y-4">
            <PixelProgress value={87} color="yellow" label="XP Level" showLabel />
            <PixelProgress value={62} color="blue" label="Potência" showLabel />
            <PixelProgress value={45} color="green" label="Taxa Conversão" showLabel />
            <PixelProgress value={23} color="red" label="Rejeições" showLabel />
            <PixelProgress value={75} segments={20} color="yellow" label="20 segmentos" showLabel />
          </PixelCard>
        </section>

        {/* MetricCards */}
        <section>
          <h2 className="font-display font-bold text-lg text-[#888888] uppercase tracking-wider mb-4">
            MetricCard — Cards de Métricas
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            <MetricCard
              label="Leads Encontrados"
              value={1284}
              icon={Users}
              iconColor="white"
              trend={12}
              sparkline={sparkData}
            />
            <MetricCard
              label="Quentes"
              value={342}
              icon={Flame}
              iconColor="yellow"
              trend={8}
              sparkline={sparkData}
            />
            <MetricCard
              label="Médios"
              value={589}
              icon={Diamond}
              iconColor="blue"
              trend={-3}
              sparkline={sparkData}
            />
            <MetricCard
              label="Fracos"
              value={353}
              icon={Shield}
              iconColor="gray"
              trend={-5}
              sparkline={sparkData}
            />
            <MetricCard
              label="Campanhas Ativas"
              value={7}
              icon={Megaphone}
              iconColor="white"
              trend={2}
              sparkline={sparkData}
            />
            <MetricCard
              label="MSG Pendentes"
              value={43}
              icon={MessageSquare}
              iconColor="blue"
              trend={15}
              sparkline={sparkData}
            />
          </div>
        </section>

        {/* Footer */}
        <div className="border-t border-[#2A2A2A] pt-6 text-center">
          <p className="font-pixel text-[#FFD400] text-sm">
            A MÁQUINA NUNCA PARA.
          </p>
          <p className="font-display text-[#555555] text-xs mt-1 uppercase tracking-widest">
            Conectar · Capturar · Converter
          </p>
        </div>
      </div>
    </main>
  )
}
