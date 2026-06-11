import type { Team } from '../data/teams';
import { LEFT_QF, LEFT_R16, LEFT_R32, RIGHT_QF, RIGHT_R16, RIGHT_R32 } from '../logic';
import type { MatchData, ResolvedMatch } from '../types';
import { ChampionCard } from './ChampionCard';
import { Flag } from './Flag';
import { MatchCard } from './MatchCard';

interface Props {
  resolved: Record<string, ResolvedMatch>;
  fanTeam: Team | null;
  fanModeOn: boolean;
  onMatch: (id: string, patch: Partial<MatchData>) => void;
}

interface ColumnProps extends Props {
  ids: string[];
  side: 'left' | 'right';
  title: string;
  withPairs: boolean;
  withIn: boolean;
}

function chunk2<T>(arr: T[]): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += 2) out.push(arr.slice(i, i + 2));
  return out;
}

function RoundColumn({ ids, side, title, withPairs, withIn, resolved, fanTeam, fanModeOn, onMatch }: ColumnProps) {
  const cell = (id: string) => (
    <div key={id} className={`bk-cell ${withIn ? 'bk-cell-in' : ''}`}>
      <MatchCard
        match={resolved[id]}
        side={side}
        fanTeam={fanTeam?.id ?? null}
        fanModeOn={fanModeOn}
        onChange={(patch) => onMatch(id, patch)}
      />
    </div>
  );

  return (
    <div className={`w-[224px] flex flex-col ${side === 'left' ? 'bk-left' : 'bk-right'}`}>
      <div className="h-7 flex items-center justify-center font-display text-[11px] font-semibold tracking-[0.25em] gold-text">
        {title}
      </div>
      <div className="flex-1 flex flex-col">
        {withPairs && ids.length > 1
          ? chunk2(ids).map((pair) => (
              <div key={pair[0]} className="bk-pair">
                {pair.map(cell)}
              </div>
            ))
          : ids.map((id) => (
              <div key={id} className="flex-1 flex flex-col">
                {cell(id)}
              </div>
            ))}
      </div>
    </div>
  );
}

function CenterColumn({ resolved, fanTeam, fanModeOn, onMatch }: Props) {
  const final = resolved['final'];
  return (
    <div className="w-[392px] flex flex-col">
      <div className="h-7" />
      <div className="flex-1 flex flex-col items-center">
        {/* Topo: troféu */}
        <div className="flex-1 flex flex-col items-center justify-center gap-3">
          <div
            className={`trophy-float w-28 h-28 rounded-full border-2 border-gold bg-gradient-to-b from-[#3a2f12] to-panel flex items-center justify-center ${
              fanModeOn ? 'champion-glow' : 'shadow-[0_0_30px_rgba(212,175,55,0.3)]'
            }`}
          >
            <span className="text-6xl">🏆</span>
          </div>
          {fanModeOn && fanTeam ? (
            <div className="flex items-center gap-2 rounded-full border border-gold bg-panel px-4 py-1.5 champion-glow">
              <Flag team={fanTeam} className="text-xl" />
              <span className="font-display font-semibold tracking-[0.15em] text-[13px] gold-text">
                VAMOS, {fanTeam.name}!
              </span>
            </div>
          ) : (
            <span className="text-[10px] tracking-[0.4em] text-mute">RUMO AO TÍTULO</span>
          )}
        </div>

        {/* Meio: final (alinhada com as semifinais) */}
        <div className="flex-1 flex flex-col items-center justify-center w-full">
          <div className="font-display font-bold tracking-[0.45em] text-2xl gold-text mb-2">FINAL</div>
          <div className="final-stubs relative w-[280px]">
            <MatchCard
              match={final}
              side="center"
              big
              fanTeam={fanTeam?.id ?? null}
              fanModeOn={fanModeOn}
              onChange={(patch) => onMatch('final', patch)}
            />
          </div>
        </div>

        {/* Base: campeão */}
        <div className="flex-1 flex items-center justify-center">
          <ChampionCard champion={final.winnerTeam} />
        </div>
      </div>
    </div>
  );
}

export function Bracket(props: Props) {
  return (
    <>
      <RoundColumn {...props} ids={LEFT_R32} side="left" title="16 AVOS DE FINAL" withPairs withIn={false} />
      <RoundColumn {...props} ids={LEFT_R16} side="left" title="OITAVAS DE FINAL" withPairs withIn />
      <RoundColumn {...props} ids={LEFT_QF} side="left" title="QUARTAS DE FINAL" withPairs withIn />
      <RoundColumn {...props} ids={['s1']} side="left" title="SEMIFINAL" withPairs={false} withIn />
      <CenterColumn {...props} />
      <RoundColumn {...props} ids={['s2']} side="right" title="SEMIFINAL" withPairs={false} withIn />
      <RoundColumn {...props} ids={RIGHT_QF} side="right" title="QUARTAS DE FINAL" withPairs withIn />
      <RoundColumn {...props} ids={RIGHT_R16} side="right" title="OITAVAS DE FINAL" withPairs withIn />
      <RoundColumn {...props} ids={RIGHT_R32} side="right" title="16 AVOS DE FINAL" withPairs withIn={false} />
    </>
  );
}
