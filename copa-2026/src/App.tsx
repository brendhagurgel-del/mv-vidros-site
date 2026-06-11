import { useEffect, useMemo, useRef, useState } from 'react';
import confetti from 'canvas-confetti';
import { GROUPS, LEFT_GROUP_IDS, RIGHT_GROUP_IDS, TEAM_BY_ID } from './data/teams';
import { emptyState, loadState, resolveAll, saveState, simulateTournament, STORAGE_KEY } from './logic';
import type { MatchData, QualPos, TournamentState } from './types';
import { Bracket } from './components/Bracket';
import { ControlPanel } from './components/ControlPanel';
import { GroupCard } from './components/GroupCard';

const BOARD_W = 2768;
const BOARD_H = 1480;

const GOLD_CONFETTI = ['#d4af37', '#f3d77a', '#fff8dc', '#8a6d1f'];

export default function App() {
  const [state, setState] = useState<TournamentState>(loadState);
  const [zoom, setZoom] = useState(0.5);
  const [toast, setToast] = useState<{ msg: string; key: number } | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const prevChampion = useRef<string | 'init'>('init');

  const resolved = useMemo(() => resolveAll(state), [state]);
  const champion = resolved['final'].winnerTeam;
  const fanTeamObj = state.fanTeam ? TEAM_BY_ID[state.fanTeam] ?? null : null;
  const fanModeOn = state.fanMode && !!fanTeamObj;

  const notify = (msg: string) => setToast({ msg, key: Date.now() });

  /* Salvamento automático + carregamento na abertura (loadState no useState) */
  useEffect(() => {
    const t = setTimeout(() => saveState(state), 400);
    return () => clearTimeout(t);
  }, [state]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2400);
    return () => clearTimeout(t);
  }, [toast]);

  /* Confetes dourados discretos quando o campeão é definido */
  useEffect(() => {
    const id = champion?.id ?? '';
    if (prevChampion.current === 'init') {
      prevChampion.current = id;
      return;
    }
    if (id && id !== prevChampion.current) {
      [0.3, 0.5, 0.7].forEach((x, i) =>
        setTimeout(
          () =>
            confetti({
              particleCount: 70,
              spread: 75,
              startVelocity: 38,
              origin: { x, y: 0.55 },
              colors: GOLD_CONFETTI,
              ticks: 240,
              scalar: 0.9,
            }),
          i * 260,
        ),
      );
    }
    prevChampion.current = id;
  }, [champion?.id]);

  /* ---------------- Handlers ---------------- */

  const onStats = (groupId: string, teamId: string, field: 'points' | 'gd', value: string) =>
    setState((s) => ({
      ...s,
      groups: {
        ...s.groups,
        [groupId]: {
          ...s.groups[groupId],
          stats: { ...s.groups[groupId].stats, [teamId]: { ...s.groups[groupId].stats[teamId], [field]: value } },
        },
      },
    }));

  const onSetPos = (groupId: string, teamId: string, p: QualPos) =>
    setState((s) => {
      const g = { ...s.groups[groupId] };
      const key = p === 1 ? 'first' : p === 2 ? 'second' : 'third';
      const wasHere = g[key] === teamId;
      if (g.first === teamId) g.first = null;
      if (g.second === teamId) g.second = null;
      if (g.third === teamId) g.third = null;
      if (!wasHere) g[key] = teamId;
      return { ...s, groups: { ...s.groups, [groupId]: g } };
    });

  const onMatch = (id: string, patch: Partial<MatchData>) =>
    setState((s) => ({ ...s, matches: { ...s.matches, [id]: { ...s.matches[id], ...patch } } }));

  const onSimulate = () => {
    setState(simulateTournament);
    notify('Copa simulada! 🎲');
  };

  const onClear = () => {
    if (!window.confirm('Limpar toda a tabela e recomeçar do zero?')) return;
    localStorage.removeItem(STORAGE_KEY);
    setState(emptyState());
    notify('Tabela limpa.');
  };

  const onSave = () => {
    saveState(state);
    notify('Progresso salvo! 💾');
  };

  const onFullscreen = () => {
    if (document.fullscreenElement) void document.exitFullscreen();
    else void document.documentElement.requestFullscreen();
  };

  /* ---------------- Render ---------------- */

  const groupColumn = (ids: string[], side: 'left' | 'right') => (
    <div className="w-[280px] flex flex-col">
      <div className="h-7 flex items-center justify-center font-display text-[11px] font-semibold tracking-[0.25em] gold-text">
        FASE DE GRUPOS
      </div>
      <div className="flex-1 flex flex-col justify-evenly gap-1.5 px-1">
        {ids.map((id) => {
          const group = GROUPS.find((g) => g.id === id)!;
          return (
            <GroupCard
              key={id}
              group={group}
              data={state.groups[id]}
              fanTeam={state.fanTeam}
              fanModeOn={fanModeOn}
              onStats={(teamId, f, v) => onStats(id, teamId, f, v)}
              onSetPos={(teamId, p) => onSetPos(id, teamId, p)}
            />
          );
        })}
      </div>
      <span className="hidden">{side}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-night text-white">
      {fanModeOn && <div className="fan-vignette" />}

      <ControlPanel
        boardRef={boardRef}
        zoom={zoom}
        setZoom={setZoom}
        fanMode={state.fanMode}
        fanTeam={state.fanTeam}
        onToggleFanMode={() => setState((s) => ({ ...s, fanMode: !s.fanMode }))}
        onFanTeam={(teamId) => setState((s) => ({ ...s, fanTeam: teamId }))}
        onSimulate={onSimulate}
        onSave={onSave}
        onClear={onClear}
        onFullscreen={onFullscreen}
        notify={notify}
      />

      {/* Painel com rolagem lateral; o zoom escala o tabuleiro inteiro */}
      <div className="board-scroll overflow-auto">
        <div style={{ width: BOARD_W * zoom, height: BOARD_H * zoom }}>
          <div
            ref={boardRef}
            style={{ width: BOARD_W, height: BOARD_H, transform: `scale(${zoom})`, transformOrigin: '0 0' }}
            className="bg-night flex flex-col"
          >
            {/* Cabeçalho do infográfico */}
            <header className="h-[92px] flex flex-col items-center justify-center gap-0.5 border-b-2 border-gold-dark bg-gradient-to-b from-[#1c1606] to-night">
              <div className="flex items-center gap-5">
                <span className="text-gold text-2xl">★</span>
                <h1 className="font-display font-bold text-[42px] leading-none tracking-[0.06em] gold-text">
                  COPA DO MUNDO FIFA 2026
                </h1>
                <span className="text-gold text-2xl">★</span>
              </div>
              <p className="text-[12px] tracking-[0.5em] text-cream font-semibold">
                TABELA INTERATIVA · CHAVEAMENTO COMPLETO
              </p>
            </header>

            {/* Chaveamento */}
            <main className="flex-1 flex px-3 py-2 min-h-0">
              {groupColumn(LEFT_GROUP_IDS, 'left')}
              <Bracket resolved={resolved} fanTeam={fanTeamObj} fanModeOn={fanModeOn} onMatch={onMatch} />
              {groupColumn(RIGHT_GROUP_IDS, 'right')}
            </main>

            {/* Rodapé / legenda */}
            <footer className="h-[52px] border-t border-gold-dark bg-panel-2 flex items-center justify-center gap-10 px-6 text-[10px] tracking-wider text-mute">
              <span>
                <b className="text-gold-light">FASE DE GRUPOS</b> · Classificam-se o 1º, o 2º e os 8 melhores 3ºs
                (marque o 3º em até 8 grupos)
              </span>
              <span>
                <b className="text-gold-light">DESEMPATE</b> · Pontos (P) e saldo de gols (SG)
              </span>
              <span>
                <b className="text-gold-light">MATA-MATA</b> · Preencha o placar e o vencedor avança · Em caso de
                empate, clique na seleção que venceu nos pênaltis
              </span>
            </footer>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div
          key={toast.key}
          className="fixed bottom-5 right-5 z-50 rounded-md border border-gold bg-panel px-4 py-2.5 text-[13px] font-semibold text-gold-light shadow-[0_0_20px_rgba(212,175,55,0.35)]"
        >
          {toast.msg}
        </div>
      )}
    </div>
  );
}
