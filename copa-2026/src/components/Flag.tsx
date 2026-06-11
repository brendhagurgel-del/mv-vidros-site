import type { Team } from '../data/teams';

/** Bandeira da seleção: usa SVG quando disponível, senão o emoji. */
export function Flag({ team, className = 'text-base' }: { team: Team; className?: string }) {
  if (team.flagSvg) {
    return <img src={team.flagSvg} alt={team.name} className={`inline-block h-4 w-6 object-cover rounded-[2px] ${className}`} />;
  }
  return <span className={`leading-none ${className}`}>{team.flag}</span>;
}
