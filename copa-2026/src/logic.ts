import { GROUPS, TEAM_BY_ID, type Team } from './data/teams';
import type { GroupData, MatchData, ResolvedMatch, TournamentState } from './types';

/* ------------------------------------------------------------------ */
/* Definição do chaveamento                                            */
/* ------------------------------------------------------------------ */

export type SlotRef =
  | { kind: 'pos'; group: string; pos: 1 | 2 }
  | { kind: 'third'; index: number } // 0..7 (8 melhores terceiros)
  | { kind: 'winner'; match: string };

export interface MatchDef {
  id: string;
  num: number;
  a: SlotRef;
  b: SlotRef;
}

const pos = (group: string, p: 1 | 2): SlotRef => ({ kind: 'pos', group, pos: p });
const third = (index: number): SlotRef => ({ kind: 'third', index });
const winner = (match: string): SlotRef => ({ kind: 'winner', match });

/**
 * 16 avos de final: 12 primeiros + 12 segundos + 8 melhores terceiros = 32.
 * Lado esquerdo recebe os grupos A–F; lado direito, G–L.
 */
export const MATCH_DEFS: MatchDef[] = [
  // ---- 16 avos · lado esquerdo (jogos 1–8) ----
  { id: 'm1', num: 1, a: pos('A', 1), b: third(0) },
  { id: 'm2', num: 2, a: pos('B', 2), b: pos('C', 2) },
  { id: 'm3', num: 3, a: pos('B', 1), b: third(1) },
  { id: 'm4', num: 4, a: pos('E', 1), b: pos('D', 2) },
  { id: 'm5', num: 5, a: pos('C', 1), b: third(2) },
  { id: 'm6', num: 6, a: pos('E', 2), b: pos('F', 2) },
  { id: 'm7', num: 7, a: pos('D', 1), b: third(3) },
  { id: 'm8', num: 8, a: pos('F', 1), b: pos('A', 2) },
  // ---- 16 avos · lado direito (jogos 9–16) ----
  { id: 'm9', num: 9, a: pos('G', 1), b: third(4) },
  { id: 'm10', num: 10, a: pos('H', 2), b: pos('I', 2) },
  { id: 'm11', num: 11, a: pos('H', 1), b: third(5) },
  { id: 'm12', num: 12, a: pos('K', 1), b: pos('J', 2) },
  { id: 'm13', num: 13, a: pos('I', 1), b: third(6) },
  { id: 'm14', num: 14, a: pos('K', 2), b: pos('L', 2) },
  { id: 'm15', num: 15, a: pos('J', 1), b: third(7) },
  { id: 'm16', num: 16, a: pos('L', 1), b: pos('G', 2) },
  // ---- Oitavas (17–24) ----
  { id: 'o1', num: 17, a: winner('m1'), b: winner('m2') },
  { id: 'o2', num: 18, a: winner('m3'), b: winner('m4') },
  { id: 'o3', num: 19, a: winner('m5'), b: winner('m6') },
  { id: 'o4', num: 20, a: winner('m7'), b: winner('m8') },
  { id: 'o5', num: 21, a: winner('m9'), b: winner('m10') },
  { id: 'o6', num: 22, a: winner('m11'), b: winner('m12') },
  { id: 'o7', num: 23, a: winner('m13'), b: winner('m14') },
  { id: 'o8', num: 24, a: winner('m15'), b: winner('m16') },
  // ---- Quartas (25–28) ----
  { id: 'q1', num: 25, a: winner('o1'), b: winner('o2') },
  { id: 'q2', num: 26, a: winner('o3'), b: winner('o4') },
  { id: 'q3', num: 27, a: winner('o5'), b: winner('o6') },
  { id: 'q4', num: 28, a: winner('o7'), b: winner('o8') },
  // ---- Semifinais (29–30) ----
  { id: 's1', num: 29, a: winner('q1'), b: winner('q2') },
  { id: 's2', num: 30, a: winner('q3'), b: winner('q4') },
  // ---- Final ----
  { id: 'final', num: 31, a: winner('s1'), b: winner('s2') },
];

export const LEFT_R32 = ['m1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7', 'm8'];
export const RIGHT_R32 = ['m9', 'm10', 'm11', 'm12', 'm13', 'm14', 'm15', 'm16'];
export const LEFT_R16 = ['o1', 'o2', 'o3', 'o4'];
export const RIGHT_R16 = ['o5', 'o6', 'o7', 'o8'];
export const LEFT_QF = ['q1', 'q2'];
export const RIGHT_QF = ['q3', 'q4'];

/* ------------------------------------------------------------------ */
/* Estado                                                              */
/* ------------------------------------------------------------------ */

export const STORAGE_KEY = 'copa-2026-tabela-v1';

export function emptyState(): TournamentState {
  const groups: Record<string, GroupData> = {};
  for (const g of GROUPS) {
    groups[g.id] = {
      stats: Object.fromEntries(g.teams.map((t) => [t.id, { points: '', gd: '' }])),
      first: null,
      second: null,
      third: null,
    };
  }
  const matches: Record<string, MatchData> = {};
  for (const def of MATCH_DEFS) {
    matches[def.id] = { scoreA: '', scoreB: '', manualWinner: null };
  }
  return { groups, matches, fanTeam: null, fanMode: false };
}

export function loadState(): TournamentState {
  const base = emptyState();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return base;
    const saved = JSON.parse(raw) as Partial<TournamentState>;
    for (const id of Object.keys(base.groups)) {
      if (saved.groups?.[id]) {
        base.groups[id] = {
          ...base.groups[id],
          ...saved.groups[id],
          stats: { ...base.groups[id].stats, ...saved.groups[id].stats },
        };
      }
    }
    for (const id of Object.keys(base.matches)) {
      if (saved.matches?.[id]) base.matches[id] = { ...base.matches[id], ...saved.matches[id] };
    }
    base.fanTeam = saved.fanTeam ?? null;
    base.fanMode = saved.fanMode ?? false;
  } catch {
    /* dados corrompidos: começa do zero */
  }
  return base;
}

export function saveState(state: TournamentState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/* ------------------------------------------------------------------ */
/* Resolução do chaveamento                                            */
/* ------------------------------------------------------------------ */

/** Os 8 primeiros terceiros marcados (na ordem dos grupos) entram na chave. */
export function thirdQualifiers(state: TournamentState): (Team | null)[] {
  const list: Team[] = [];
  for (const g of GROUPS) {
    const id = state.groups[g.id]?.third;
    if (id && TEAM_BY_ID[id]) list.push(TEAM_BY_ID[id]);
  }
  const slots: (Team | null)[] = list.slice(0, 8);
  while (slots.length < 8) slots.push(null);
  return slots;
}

function refLabel(ref: SlotRef, defs: Record<string, MatchDef>): string {
  if (ref.kind === 'pos') return `${ref.pos}º GRUPO ${ref.group}`;
  if (ref.kind === 'third') return `3º COLOCADO ${ref.index + 1}`;
  return `VENCE JOGO ${defs[ref.match].num}`;
}

export function resolveAll(state: TournamentState): Record<string, ResolvedMatch> {
  const defsById = Object.fromEntries(MATCH_DEFS.map((d) => [d.id, d]));
  const thirds = thirdQualifiers(state);
  const out: Record<string, ResolvedMatch> = {};

  const resolveRef = (ref: SlotRef): Team | null => {
    if (ref.kind === 'pos') {
      const id = ref.pos === 1 ? state.groups[ref.group].first : state.groups[ref.group].second;
      return id ? TEAM_BY_ID[id] ?? null : null;
    }
    if (ref.kind === 'third') return thirds[ref.index];
    return out[ref.match]?.winnerTeam ?? null;
  };

  for (const def of MATCH_DEFS) {
    const teamA = resolveRef(def.a);
    const teamB = resolveRef(def.b);
    const data = state.matches[def.id];
    let winner: 'A' | 'B' | null = null;
    if (data.manualWinner === 'A' && teamA) winner = 'A';
    else if (data.manualWinner === 'B' && teamB) winner = 'B';
    else if (teamA && teamB && data.scoreA !== '' && data.scoreB !== '') {
      const a = Number(data.scoreA);
      const b = Number(data.scoreB);
      if (a > b) winner = 'A';
      else if (b > a) winner = 'B';
      // empate: aguarda definição manual (pênaltis)
    }
    out[def.id] = {
      id: def.id,
      num: def.num,
      teamA,
      teamB,
      labelA: refLabel(def.a, defsById),
      labelB: refLabel(def.b, defsById),
      data,
      winner,
      winnerTeam: winner === 'A' ? teamA : winner === 'B' ? teamB : null,
    };
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Simulação                                                           */
/* ------------------------------------------------------------------ */

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function simulateTournament(current: TournamentState): TournamentState {
  const state = emptyState();
  state.fanTeam = current.fanTeam;
  state.fanMode = current.fanMode;

  // Sorteia 8 grupos que enviam o 3º colocado
  const groupsWithThird = new Set(shuffle(GROUPS.map((g) => g.id)).slice(0, 8));

  for (const g of GROUPS) {
    const order = shuffle(g.teams);
    const gd = state.groups[g.id];
    gd.first = order[0].id;
    gd.second = order[1].id;
    if (groupsWithThird.has(g.id)) gd.third = order[2].id;

    const pts = [rand(7, 9), rand(4, 6), rand(2, 4), rand(0, 2)];
    const saldo = [rand(4, 8), rand(1, 3), rand(-2, 0), rand(-7, -3)];
    order.forEach((team, i) => {
      gd.stats[team.id] = { points: String(pts[i]), gd: String(saldo[i]) };
    });
  }

  // Preenche todos os placares fase a fase (sem empates)
  for (const def of MATCH_DEFS) {
    const resolved = resolveAll(state)[def.id];
    if (!resolved.teamA || !resolved.teamB) continue;
    let a = rand(0, 4);
    let b = rand(0, 4);
    while (a === b) b = rand(0, 4);
    state.matches[def.id] = { scoreA: String(a), scoreB: String(b), manualWinner: null };
  }

  return state;
}
