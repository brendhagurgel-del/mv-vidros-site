# LeadMachine AI — Contexto do Projeto

## Stack
- Next.js 14 App Router, TypeScript strict, Tailwind CSS 3.x
- pnpm (use sempre pnpm, nunca npm)
- Supabase (PostgreSQL), NextAuth v4, TanStack Query, Zustand, Recharts, Framer Motion

## Branch de desenvolvimento
`claude/design-system-phase-03-OjKVh` → remote: `brendhagurgel-del/mv-vidros-site`

## Design System — REGRAS ABSOLUTAS
- Fundo base: `#080808`, cards: `#111111`, sidebar: `#0D0D0D`
- Amarelo: `#FFD400`, Azul: `#00AFFF`, Verde: `#12D36B`, Laranja: `#FF6B00`, Vermelho: `#E03535`
- Fontes: Barlow Condensed (display/títulos/labels), Barlow (corpo), JetBrains Mono (números/IDs)
- **ZERO border-radius** — estilo HUD/pixel art, ângulos retos
- Todos os cards com cantos HUD (4 spans absolute nos cantos)
- Badges: `border-radius: 0`, uppercase, Barlow Condensed
- Barras de progresso: segmentadas (blocos separados), nunca contínuas
- Botão primário: Barlow Condensed 800, uppercase, glow amarelo

## Estrutura de arquivos
```
app/
  (dashboard)/         ← layout com sidebar+header (protegido por auth)
    dashboard/         ← Fase 05
    leads/             ← Fase 06
    campanhas/         ← Fase 07
    aprovacoes/        ← Fase 08
    configuracoes/     ← stub (Fase 14)
  login/               ← auth page, sem sidebar
  preview/[id]/        ← prévia pública, sem auth
  api/                 ← 17 rotas de API (mock data + lib calls)

components/
  layout/
    sidebar.tsx        ← sidebar gamificada 220px
    header.tsx         ← header 56px
  ui/
    hud-card.tsx       ← card com cantos HUD (substituiu pixel-card)
    metric-card.tsx    ← card de métrica com sparkline
    rarity-badge.tsx   ← LENDÁRIO/RARO/COMUM/BAIXO
    status-badge.tsx   ← 12+ estados de status
    segmented-bar.tsx  ← barra segmentada (substituiu pixel-progress)
    sparkline.tsx      ← mini gráfico SVG com área
    cta-button.tsx     ← botões primários yellow/blue/green/outline
    lm-logo.tsx        ← LMLogoIcon SVG + LMLogoFull
    animated-counter.tsx
  leads/
    leads-table.tsx
    lead-detail-panel.tsx
    leads-filters.tsx
  machine/
    pixel-burst.tsx    ← animação framer-motion (SSR: false)

lib/
  types.ts             ← Lead, Campaign, Message, XpEvent, UserStats
  supabase.ts          ← cliente anon + createServerClient
  openai.ts            ← generateDiagnosis, generateMessage (GPT-4o)
  google-places.ts     ← searchBusinesses
  whatsapp.ts          ← sendWhatsApp (Z-API)
  xp.ts                ← calcLevel, calcXpForNextLevel, XP_EVENTS
  hooks/
    use-machine-stats.ts
    use-leads.ts

store/
  sidebar-store.ts     ← Zustand: isOpen, activeItem, toggle

middleware.ts          ← proteção de rotas, whitelist /login /preview
```

## Sistema de Raridade
- LENDÁRIO: score ≥ 85 → bg #FFD400, text #000
- RARO: score ≥ 70 → border #00AFFF, text #00AFFF
- COMUM: score ≥ 50 → border #444, text #666
- BAIXO: score < 50 → border #2A2A2A, text #444

## Gamificação XP
```
level = Math.floor(Math.sqrt(xp / 100)) + 1
xpForNextLevel = Math.pow(level, 2) * 100
```
Eventos: Lead encontrado +10, Qualificado +25, Lendário +50, Msg aprovada +50, Msg enviada +100, Resposta +200, Meta diária +300, Combo x5 +150, Campanha disparada +75

## Supabase
- Projeto: `qnmphyntjhwrtfjgkomg`
- Tabelas: leads, lead_sources, website_audits, diagnostics, landing_pages, outreach_messages, approvals, activity_logs, search_campaigns, agent_jobs, users, xp_events

## Vercel
- Projeto: `leadmachine-ai` (prj_wVyp7pJhHP2SyQre0ssQpxQN1NQF)
- Team: `brendhagurgel-3496s-projects` (team_JOh5KZ25fb0VwSHhYnRYeVhC)
- URL produção: `leadmachine-ai.vercel.app`

## Comandos frequentes
```bash
npx tsc --noEmit 2>&1 | head -20   # type-check
pnpm build                          # build completo
pnpm add <pkg>                      # instalar pacote
git push -u origin claude/design-system-phase-03-OjKVh
```

## Regras de commit
- Um commit por feature/componente
- Mensagem: `feat(componente): descrição`
- Sempre rodar `npx tsc --noEmit` antes de commitar
- Sempre fazer push após commit
