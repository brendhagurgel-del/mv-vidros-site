import type { Group } from '../data/teams';
import type { GroupData, QualPos } from '../types';
import { TeamRow } from './TeamRow';

interface Props {
  group: Group;
  data: GroupData;
  fanTeam: string | null;
  fanModeOn: boolean;
  onStats: (teamId: string, field: 'points' | 'gd', value: string) => void;
  onSetPos: (teamId: string, pos: QualPos) => void;
}

export function GroupCard({ group, data, fanTeam, fanModeOn, onStats, onSetPos }: Props) {
  const posOf = (teamId: string): QualPos | null =>
    data.first === teamId ? 1 : data.second === teamId ? 2 : data.third === teamId ? 3 : null;

  return (
    <div className="rounded-lg border border-line bg-panel overflow-hidden shadow-lg">
      <div className="flex items-center gap-1.5 h-7 px-2 bg-gradient-to-r from-[#3a2f12] via-[#1c170a] to-panel-2 border-b border-gold-dark">
        <span className="font-display font-semibold tracking-[0.18em] text-[13px] gold-text">
          {group.name}
        </span>
        <span className="flex-1" />
        <span className="w-7 text-center text-[9px] font-bold text-mute">P</span>
        <span className="w-7 text-center text-[9px] font-bold text-mute">SG</span>
        <span className="w-[57px] text-center text-[9px] font-bold text-mute">POSIÇÃO</span>
      </div>
      <div className="p-1 space-y-0.5">
        {group.teams.map((team) => (
          <TeamRow
            key={team.id}
            team={team}
            stats={data.stats[team.id]}
            pos={posOf(team.id)}
            fanHighlight={fanModeOn && fanTeam === team.id}
            onStats={(f, v) => onStats(team.id, f, v)}
            onSetPos={(p) => onSetPos(team.id, p)}
          />
        ))}
      </div>
    </div>
  );
}
