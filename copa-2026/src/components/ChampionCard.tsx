import { motion, AnimatePresence } from 'framer-motion';
import type { Team } from '../data/teams';
import { Flag } from './Flag';

export function ChampionCard({ champion }: { champion: Team | null }) {
  return (
    <div className="w-[280px] flex flex-col items-center gap-2">
      <div className="font-display font-bold tracking-[0.35em] text-xl gold-text">CAMPEÃO</div>
      <AnimatePresence mode="wait">
        {champion ? (
          <motion.div
            key={champion.id}
            initial={{ scale: 0.4, opacity: 0, y: 24 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.6, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="champion-glow w-full rounded-xl border-2 border-gold bg-gradient-to-b from-[#2c230b] via-panel to-panel px-4 py-4 flex flex-col items-center gap-2"
          >
            <Flag team={champion} className="text-6xl" />
            <span className="font-display font-bold text-[26px] tracking-[0.12em] gold-text text-center leading-tight">
              {champion.name}
            </span>
            <span className="text-[10px] tracking-[0.3em] text-cream">CAMPEÃO DO MUNDO 2026</span>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full rounded-xl border-2 border-dashed border-gold-dark px-4 py-7 text-center"
          >
            <span className="text-[11px] tracking-[0.25em] text-mute">AGUARDANDO A GRANDE FINAL</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
