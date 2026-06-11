import { motion } from 'framer-motion';
import type { Team } from '../data/teams';
import type { MatchData, ResolvedMatch, Side } from '../types';
import { Flag } from './Flag';

interface Props {
  match: ResolvedMatch;
  side: Side;
  big?: boolean;
  fanTeam: string | null;
  fanModeOn: boolean;
  onChange: (patch: Partial<MatchData>) => void;
}

interface SlotProps extends Omit<Props, 'match'> {
  team: Team | null;
  label: string;
  score: string;
  isWinner: boolean;
  isManual: boolean;
  toggleManual: () => void;
  setScore: (v: string) => void;
}

function TeamSlot({ team, label, score, isWinner, isManual, big, side, fanTeam, fanModeOn, toggleManual, setScore }: SlotProps) {
  const enterX = side === 'right' ? 16 : -16;
  return (
    <div
      className={`flex items-center gap-1.5 px-2 ${big ? 'h-11' : 'h-8'} ${
        isWinner ? 'bg-gradient-to-r from-[#3f330e] to-transparent' : ''
      } ${fanModeOn && team && fanTeam === team.id ? 'fan-pulse' : ''}`}
    >
      <button
        onClick={toggleManual}
        disabled={!team}
        title={team ? 'Clique para definir/remover o vencedor manualmente (pênaltis ou correção)' : undefined}
        className="flex items-center gap-1.5 flex-1 min-w-0 text-left disabled:cursor-default"
      >
        {team ? (
          <motion.span
            key={team.id}
            initial={{ x: enterX, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="flex items-center gap-1.5 min-w-0"
          >
            <Flag team={team} className={big ? 'text-xl' : 'text-base'} />
            <span
              className={`truncate font-semibold tracking-wide ${big ? 'text-[13px]' : 'text-[11px]'} ${
                isWinner ? 'text-gold-light' : 'text-white'
              }`}
            >
              {team.name}
            </span>
            {isManual && (
              <span className="text-gold text-[10px]" title="Vencedor definido manualmente (pênaltis)">
                ★
              </span>
            )}
          </motion.span>
        ) : (
          <span className="text-[9px] tracking-widest text-mute font-semibold">{label}</span>
        )}
      </button>
      <input
        type="number"
        min={0}
        value={score}
        onChange={(e) => setScore(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        placeholder="·"
        disabled={!team}
        className={`${big ? 'w-9 h-8 text-sm' : 'w-7 h-6 text-[11px]'} rounded bg-black/70 border text-center font-bold focus:outline-none disabled:opacity-30 ${
          isWinner ? 'border-gold text-gold-light' : 'border-line text-white focus:border-gold'
        }`}
      />
    </div>
  );
}

export function MatchCard({ match, side, big = false, fanTeam, fanModeOn, onChange }: Props) {
  const common = { big, side, fanTeam, fanModeOn, onChange };
  const isDraw =
    match.teamA && match.teamB && match.data.scoreA !== '' && match.data.scoreB !== '' &&
    match.data.scoreA === match.data.scoreB && !match.data.manualWinner;

  return (
    <div
      className={`w-full rounded-md border bg-panel shadow-md overflow-hidden ${
        big ? 'border-gold shadow-[0_0_24px_rgba(212,175,55,0.25)]' : 'border-line'
      }`}
    >
      <div className="flex items-center justify-between px-2 h-4 bg-panel-2">
        <span className="text-[8px] font-display tracking-[0.2em] text-mute">JOGO {match.num}</span>
        {isDraw && (
          <span className="text-[8px] tracking-wider text-gold" title="Empate: clique na seleção vencedora dos pênaltis">
            PÊNALTIS →
          </span>
        )}
      </div>
      <TeamSlot
        {...common}
        team={match.teamA}
        label={match.labelA}
        score={match.data.scoreA}
        isWinner={match.winner === 'A'}
        isManual={match.data.manualWinner === 'A'}
        toggleManual={() => onChange({ manualWinner: match.data.manualWinner === 'A' ? null : 'A' })}
        setScore={(v) => onChange({ scoreA: v })}
      />
      <div className="h-px bg-line mx-2" />
      <TeamSlot
        {...common}
        team={match.teamB}
        label={match.labelB}
        score={match.data.scoreB}
        isWinner={match.winner === 'B'}
        isManual={match.data.manualWinner === 'B'}
        toggleManual={() => onChange({ manualWinner: match.data.manualWinner === 'B' ? null : 'B' })}
        setScore={(v) => onChange({ scoreB: v })}
      />
    </div>
  );
}
