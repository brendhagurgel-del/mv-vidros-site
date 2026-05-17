import { clsx } from "clsx"

type Status =
  | "NOVO"
  | "ANALISADO"
  | "PRONTO"
  | "AGUARDANDO"
  | "ENVIADO"
  | "ATIVA"
  | "PAUSADA"
  | "AGENDADA"
  | "CONCLUÍDA"
  | "PENDENTE"
  | "APROVADA"
  | "REJEITADA"

interface StatusBadgeProps {
  status: Status
  className?: string
  size?: "sm" | "md"
}

const statusConfig: Record<
  Status,
  { bg: string; text: string; border: string }
> = {
  NOVO: {
    bg: "bg-[#FFD400]/10",
    text: "text-[#FFD400]",
    border: "border-[#FFD400]/30",
  },
  ANALISADO: {
    bg: "bg-[#00B2FF]/10",
    text: "text-[#00B2FF]",
    border: "border-[#00B2FF]/30",
  },
  PRONTO: {
    bg: "bg-[#00CC66]/10",
    text: "text-[#00CC66]",
    border: "border-[#00CC66]/30",
  },
  AGUARDANDO: {
    bg: "bg-[#FF6B00]/10",
    text: "text-[#FF6B00]",
    border: "border-[#FF6B00]/30",
  },
  ENVIADO: {
    bg: "bg-[#888888]/10",
    text: "text-[#888888]",
    border: "border-[#888888]/30",
  },
  ATIVA: {
    bg: "bg-[#00CC66]/10",
    text: "text-[#00CC66]",
    border: "border-[#00CC66]/30",
  },
  PAUSADA: {
    bg: "bg-[#FF6B00]/10",
    text: "text-[#FF6B00]",
    border: "border-[#FF6B00]/30",
  },
  AGENDADA: {
    bg: "bg-[#00B2FF]/10",
    text: "text-[#00B2FF]",
    border: "border-[#00B2FF]/30",
  },
  "CONCLUÍDA": {
    bg: "bg-[#555555]/20",
    text: "text-[#888888]",
    border: "border-[#555555]/30",
  },
  PENDENTE: {
    bg: "bg-[#FFD400]/10",
    text: "text-[#FFD400]",
    border: "border-[#FFD400]/30",
  },
  APROVADA: {
    bg: "bg-[#00CC66]/10",
    text: "text-[#00CC66]",
    border: "border-[#00CC66]/30",
  },
  REJEITADA: {
    bg: "bg-[#FF4444]/10",
    text: "text-[#FF4444]",
    border: "border-[#FF4444]/30",
  },
}

export function StatusBadge({ status, className, size = "md" }: StatusBadgeProps) {
  const config = statusConfig[status] ?? statusConfig["NOVO"]

  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1 rounded-none border font-display font-bold uppercase tracking-widest",
        size === "sm" ? "text-[9px] px-1.5 py-0.5" : "text-[10px] px-2 py-1",
        config.bg,
        config.text,
        config.border,
        className
      )}
    >
      <span
        className={clsx(
          "rounded-none flex-shrink-0",
          size === "sm" ? "w-1 h-1" : "w-1.5 h-1.5",
          config.text.replace("text-", "bg-")
        )}
        aria-hidden="true"
      />
      {status}
    </span>
  )
}

export type { Status }
