import type { Team } from '../data/teams';
import type { QualPos, TeamStats } from '../types';
import { Flag } from './Flag';

interface Props {
  team: Team;
  stats: TeamStats;
  pos: QualPos | null;
  fanHighlight: boolean;
  onStats: (field: 'points' | 'gd', value: string) => void;
  onSetPos: (pos: QualPos) => void;
}

const ROW_STYLE: Record<string, string> = {
  '1': 'bg-gradient-to-r from-[#43350f] via-[#2a210a] to-transparent ring-1 ring-gold',
  '2': 'bg-gradient-to-r from-[#2b2310] to-transparent ring-1 ring-gold-dark',
  '3': 'bg-gradient-to-r from-[#241d12] to-transparent ring-1 ring-bronze',
};

const CHIP_ACTIVE: Record<string, string> = {
  '1': 'bg-gold text-black border-gold',
  '2': 'bg-gold-dark text-cream border-gold-dark',
  '3': 'bg-bronze text-black border-bronze',
};

export function TeamRow({ team, stats, pos, fanHighlight, onStats, onSetPos }: Props) {
  return (
    <div
      className={`flex items-center gap-1.5 h-9 px-1.5 rounded transition-colors duration-300 ${
        pos ? ROW_STYLE[pos] : 'hover:bg-white/5'
      } ${fanHighlight ? 'fan-pulse' : ''}`}
    >
      <Flag team={team} />
      <span
        className={`flex-1 truncate text-[11px] font-semibold tracking-wide ${
          pos === 1 ? 'text-gold-light' : pos ? 'text-cream' : 'text-white'
        }`}
        title={team.name}
      >
        {team.name}
      </span>

      <input
        type="number"
        value={stats.points}
        onChange={(e) => onStats('points', e.target.value)}
        placeholder="·"
        title="Pontos"
        className="w-7 h-6 rounded bg-black/60 border border-line text-center text-[11px] font-bold text-white focus:border-gold focus:outline-none"
      />
      <input
        type="number"
        value={stats.gd}
        onChange={(e) => onStats('gd', e.target.value)}
        placeholder="·"
        title="Saldo de gols"
        className="w-7 h-6 rounded bg-black/60 border border-line text-center text-[11px] font-bold text-white focus:border-gold focus:outline-none"
      />

      <span className="flex gap-0.5">
        {([1, 2, 3] as QualPos[]).map((p) => (
          <button
            key={p}
            onClick={() => onSetPos(p)}
            title={p === 3 ? 'Marcar como um dos 8 melhores 3ºs' : `Marcar como ${p}º do grupo`}
            className={`w-[17px] h-[17px] rounded-full border text-[9px] font-bold leading-none transition-colors ${
              pos === p ? CHIP_ACTIVE[p] : 'border-line text-mute hover:border-gold hover:text-gold'
            }`}
          >
            {p}
          </button>
        ))}
      </span>
    </div>
  );
}
