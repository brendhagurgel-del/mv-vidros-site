export interface Team {
  id: string;
  name: string;
  /** Bandeira em emoji (estrutura pronta para trocar por SVG via `flagSvg`). */
  flag: string;
  /** URL/caminho de um SVG de bandeira — quando definido, substitui o emoji. */
  flagSvg?: string;
}

export interface Group {
  id: string; // 'A' … 'L'
  name: string;
  teams: Team[];
}

const t = (id: string, name: string, flag: string): Team => ({ id, name, flag });

export const GROUPS: Group[] = [
  {
    id: 'A',
    name: 'GRUPO A',
    teams: [
      t('mex', 'MÉXICO', '🇲🇽'),
      t('kor', 'COREIA DO SUL', '🇰🇷'),
      t('rsa', 'ÁFRICA DO SUL', '🇿🇦'),
      t('cze', 'REP. TCHECA', '🇨🇿'),
    ],
  },
  {
    id: 'B',
    name: 'GRUPO B',
    teams: [
      t('can', 'CANADÁ', '🇨🇦'),
      t('sui', 'SUÍÇA', '🇨🇭'),
      t('qat', 'QATAR', '🇶🇦'),
      t('bih', 'BÓSNIA', '🇧🇦'),
    ],
  },
  {
    id: 'C',
    name: 'GRUPO C',
    teams: [
      t('bra', 'BRASIL', '🇧🇷'),
      t('mar', 'MARROCOS', '🇲🇦'),
      t('hai', 'HAITI', '🇭🇹'),
      t('sco', 'ESCÓCIA', '🏴󠁧󠁢󠁳󠁣󠁴󠁿'),
    ],
  },
  {
    id: 'D',
    name: 'GRUPO D',
    teams: [
      t('usa', 'ESTADOS UNIDOS', '🇺🇸'),
      t('tur', 'TURQUIA', '🇹🇷'),
      t('aus', 'AUSTRÁLIA', '🇦🇺'),
      t('par', 'PARAGUAI', '🇵🇾'),
    ],
  },
  {
    id: 'E',
    name: 'GRUPO E',
    teams: [
      t('ger', 'ALEMANHA', '🇩🇪'),
      t('civ', 'COSTA DO MARFIM', '🇨🇮'),
      t('ecu', 'EQUADOR', '🇪🇨'),
      t('cur', 'CURAÇAO', '🇨🇼'),
    ],
  },
  {
    id: 'F',
    name: 'GRUPO F',
    teams: [
      t('ned', 'HOLANDA', '🇳🇱'),
      t('jpn', 'JAPÃO', '🇯🇵'),
      t('tun', 'TUNÍSIA', '🇹🇳'),
      t('swe', 'SUÉCIA', '🇸🇪'),
    ],
  },
  {
    id: 'G',
    name: 'GRUPO G',
    teams: [
      t('bel', 'BÉLGICA', '🇧🇪'),
      t('irn', 'IRÃ', '🇮🇷'),
      t('egy', 'EGITO', '🇪🇬'),
      t('nzl', 'NOVA ZELÂNDIA', '🇳🇿'),
    ],
  },
  {
    id: 'H',
    name: 'GRUPO H',
    teams: [
      t('esp', 'ESPANHA', '🇪🇸'),
      t('uru', 'URUGUAI', '🇺🇾'),
      t('ksa', 'ARÁBIA SAUDITA', '🇸🇦'),
      t('cpv', 'CABO VERDE', '🇨🇻'),
    ],
  },
  {
    id: 'I',
    name: 'GRUPO I',
    teams: [
      t('fra', 'FRANÇA', '🇫🇷'),
      t('sen', 'SENEGAL', '🇸🇳'),
      t('nor', 'NORUEGA', '🇳🇴'),
      t('irq', 'IRAQUE', '🇮🇶'),
    ],
  },
  {
    id: 'J',
    name: 'GRUPO J',
    teams: [
      t('arg', 'ARGENTINA', '🇦🇷'),
      t('aut', 'ÁUSTRIA', '🇦🇹'),
      t('alg', 'ARGÉLIA', '🇩🇿'),
      t('jor', 'JORDÂNIA', '🇯🇴'),
    ],
  },
  {
    id: 'K',
    name: 'GRUPO K',
    teams: [
      t('por', 'PORTUGAL', '🇵🇹'),
      t('uzb', 'UZBEQUISTÃO', '🇺🇿'),
      t('col', 'COLÔMBIA', '🇨🇴'),
      t('cod', 'RD CONGO', '🇨🇩'),
    ],
  },
  {
    id: 'L',
    name: 'GRUPO L',
    teams: [
      t('eng', 'INGLATERRA', '🏴󠁧󠁢󠁥󠁮󠁧󠁿'),
      t('cro', 'CROÁCIA', '🇭🇷'),
      t('pan', 'PANAMÁ', '🇵🇦'),
      t('gha', 'GANA', '🇬🇭'),
    ],
  },
];

export const TEAM_BY_ID: Record<string, Team> = Object.fromEntries(
  GROUPS.flatMap((g) => g.teams.map((team) => [team.id, team])),
);

export const ALL_TEAMS: Team[] = GROUPS.flatMap((g) => g.teams);

export const LEFT_GROUP_IDS = ['A', 'B', 'C', 'D', 'E', 'F'];
export const RIGHT_GROUP_IDS = ['G', 'H', 'I', 'J', 'K', 'L'];
