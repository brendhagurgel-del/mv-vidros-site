import type { Team } from './data/teams';

export type QualPos = 1 | 2 | 3;
export type Side = 'left' | 'right' | 'center';

export interface TeamStats {
  points: string;
  gd: string; // saldo de gols
}

export interface GroupData {
  stats: Record<string, TeamStats>;
  first: string | null;
  second: string | null;
  /** 3º colocado marcado como um dos 8 melhores terceiros. */
  third: string | null;
}

export interface MatchData {
  scoreA: string;
  scoreB: string;
  /** Vencedor definido manualmente (pênaltis ou correção). */
  manualWinner: 'A' | 'B' | null;
}

export interface TournamentState {
  groups: Record<string, GroupData>;
  matches: Record<string, MatchData>;
  fanTeam: string | null;
  fanMode: boolean;
}

export interface ResolvedMatch {
  id: string;
  num: number;
  teamA: Team | null;
  teamB: Team | null;
  labelA: string;
  labelB: string;
  data: MatchData;
  winner: 'A' | 'B' | null;
  winnerTeam: Team | null;
}
