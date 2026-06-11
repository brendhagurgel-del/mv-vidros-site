import type { RefObject } from 'react';
import { GROUPS } from '../data/teams';
import { ExportButtons } from './ExportButtons';

interface Props {
  boardRef: RefObject<HTMLDivElement>;
  zoom: number;
  setZoom: (z: number) => void;
  fanMode: boolean;
  fanTeam: string | null;
  onToggleFanMode: () => void;
  onFanTeam: (teamId: string | null) => void;
  onSimulate: () => void;
  onSave: () => void;
  onClear: () => void;
  onFullscreen: () => void;
  notify: (msg: string) => void;
}

const btn =
  'h-9 px-3 rounded-md border text-[12px] font-semibold tracking-wide transition-colors disabled:opacity-50';
const goldBtn = `${btn} border-gold-dark bg-panel text-gold-light hover:bg-gold hover:text-black`;

export function ControlPanel(props: Props) {
  const {
    boardRef, zoom, setZoom, fanMode, fanTeam,
    onToggleFanMode, onFanTeam, onSimulate, onSave, onClear, onFullscreen, notify,
  } = props;

  return (
    <div className="sticky top-0 z-50 border-b border-line bg-night/95 backdrop-blur px-3 py-2">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-display font-bold tracking-[0.2em] text-sm gold-text mr-2 whitespace-nowrap">
          ★ COPA 2026
        </span>

        <button className={goldBtn} onClick={onSimulate}>🎲 Simular Copa</button>

        <button
          className={`${btn} ${
            fanMode
              ? 'border-gold bg-gold text-black shadow-[0_0_14px_rgba(212,175,55,0.6)]'
              : 'border-gold-dark bg-panel text-gold-light hover:bg-gold hover:text-black'
          }`}
          onClick={onToggleFanMode}
        >
          🔥 Modo Torcida
        </button>

        {fanMode && (
          <select
            value={fanTeam ?? ''}
            onChange={(e) => onFanTeam(e.target.value || null)}
            className="h-9 rounded-md border border-gold bg-panel px-2 text-[12px] font-semibold text-gold-light focus:outline-none"
          >
            <option value="">Escolha sua seleção…</option>
            {GROUPS.map((g) => (
              <optgroup key={g.id} label={g.name}>
                {g.teams.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.flag} {t.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        )}

        <span className="flex-1" />

        <label className="flex items-center gap-1.5 text-[11px] text-mute font-semibold">
          ZOOM
          <select
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="h-9 rounded-md border border-line bg-panel px-2 text-[12px] font-semibold text-white focus:outline-none focus:border-gold"
          >
            <option value={0.4}>40%</option>
            <option value={0.5}>50%</option>
            <option value={0.6}>60%</option>
            <option value={0.75}>75%</option>
            <option value={1}>100%</option>
          </select>
        </label>

        <button className={goldBtn} onClick={onFullscreen}>⛶ Tela cheia</button>
        <button className={goldBtn} onClick={onSave}>💾 Salvar progresso</button>
        <ExportButtons boardRef={boardRef} zoom={zoom} setZoom={setZoom} notify={notify} />
        <button
          className={`${btn} border-[#5a1f1f] bg-panel text-[#e08585] hover:bg-[#7a2727] hover:text-white`}
          onClick={onClear}
        >
          🗑 Limpar tudo
        </button>
      </div>
    </div>
  );
}
