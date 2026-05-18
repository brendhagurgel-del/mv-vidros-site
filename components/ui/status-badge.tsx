const STATUS_STYLES: Record<string, { bg: string; border: string; text: string; dot?: boolean }> = {
  NOVO:                  { bg: "rgba(0,175,255,0.08)",  border: "rgba(0,175,255,0.35)",   text: "#00AFFF" },
  ANALISADO:             { bg: "rgba(136,136,136,0.08)",border: "rgba(136,136,136,0.25)", text: "#888888" },
  "PRONTO PARA CAMPANHA":{ bg: "rgba(18,211,107,0.08)", border: "rgba(18,211,107,0.35)",  text: "#12D36B" },
  PRONTO:                { bg: "rgba(18,211,107,0.08)", border: "rgba(18,211,107,0.35)",  text: "#12D36B" },
  "AGUARDANDO REVISÃO":  { bg: "rgba(255,212,0,0.08)",  border: "rgba(255,212,0,0.35)",   text: "#FFD400" },
  AGUARDANDO:            { bg: "rgba(255,212,0,0.08)",  border: "rgba(255,212,0,0.35)",   text: "#FFD400" },
  ENVIADO:               { bg: "rgba(18,211,107,0.12)", border: "rgba(18,211,107,0.5)",   text: "#12D36B" },
  ALTA:                  { bg: "rgba(224,53,53,0.08)",  border: "rgba(224,53,53,0.35)",   text: "#E03535" },
  "MÉDIA":               { bg: "rgba(255,212,0,0.08)",  border: "rgba(255,212,0,0.35)",   text: "#FFD400" },
  MEDIA:                 { bg: "rgba(255,212,0,0.08)",  border: "rgba(255,212,0,0.35)",   text: "#FFD400" },
  BAIXA:                 { bg: "rgba(136,136,136,0.08)",border: "rgba(136,136,136,0.25)", text: "#666666" },
  ATIVA:                 { bg: "rgba(18,211,107,0.1)",  border: "#12D36B",                text: "#12D36B", dot: true },
  PAUSADA:               { bg: "rgba(255,107,0,0.08)",  border: "rgba(255,107,0,0.35)",   text: "#FF6B00" },
  AGENDADA:              { bg: "rgba(0,175,255,0.08)",  border: "rgba(0,175,255,0.35)",   text: "#00AFFF" },
  "CONCLUÍDA":           { bg: "rgba(255,255,255,0.04)",border: "#333333",                text: "#666666" },
  CONCLUIDA:             { bg: "rgba(255,255,255,0.04)",border: "#333333",                text: "#666666" },
  PENDENTE:              { bg: "rgba(255,212,0,0.08)",  border: "rgba(255,212,0,0.35)",   text: "#FFD400" },
  APROVADA:              { bg: "rgba(18,211,107,0.08)", border: "rgba(18,211,107,0.35)",  text: "#12D36B" },
  REJEITADA:             { bg: "rgba(224,53,53,0.08)",  border: "rgba(224,53,53,0.35)",   text: "#E03535" },
}

export function StatusBadge({ status }: { status: string }) {
  const key = status.toUpperCase()
  const s = STATUS_STYLES[key] ?? STATUS_STYLES["ANALISADO"]
  return (
    <span style={{
      background: s.bg, border: `1px solid ${s.border}`, color: s.text,
      fontFamily: "var(--font-display)", fontSize: 9, fontWeight: 700,
      textTransform: "uppercase", letterSpacing: "0.08em",
      padding: "2px 7px", borderRadius: 0,
      display: "inline-flex", alignItems: "center", gap: 4, whiteSpace: "nowrap",
    }}>
      {s.dot && (
        <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.text, display: "inline-block", animation: "pulse-dot 2s infinite" }} />
      )}
      {status}
    </span>
  )
}
