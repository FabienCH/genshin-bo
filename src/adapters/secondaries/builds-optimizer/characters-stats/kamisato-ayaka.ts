import { CharacterWithStats } from './character-stats-type';

export const kamisatoAyaka: CharacterWithStats = {
  name: 'kamisatoAyaka',
  weaponType: 'sword',
  levels: {
    '1': { stats: { hp: 1001, atk: 27, def: 61 } },
    '20': { stats: { hp: 2597, atk: 79, def: 158 } },
    '20a': { stats: { hp: 3455, atk: 92, def: 211 } },
    '40': { stats: { hp: 5170, atk: 138, def: 315 } },
    '40a': { stats: { hp: 5779, atk: 154, def: 352 }, bonusStat: { critDmg: 9.6 } },
    '50': { stats: { hp: 6649, atk: 177, def: 405 }, bonusStat: { critDmg: 9.6 } },
    '50a': { stats: { hp: 7462, atk: 198, def: 455 }, bonusStat: { critDmg: 19.2 } },
    '60': { stats: { hp: 8341, atk: 222, def: 509 }, bonusStat: { critDmg: 19.2 } },
    '60a': { stats: { hp: 8951, atk: 238, def: 546 }, bonusStat: { critDmg: 19.2 } },
    '70': { stats: { hp: 9838, atk: 262, def: 600 }, bonusStat: { critDmg: 19.2 } },
    '70a': { stats: { hp: 10448, atk: 278, def: 637 }, bonusStat: { critDmg: 28.8 } },
    '80': { stats: { hp: 11345, atk: 302, def: 692 }, bonusStat: { critDmg: 28.8 } },
    '80a': { stats: { hp: 11954, atk: 318, def: 729 }, bonusStat: { critDmg: 38.4 } },
    '90': { stats: { hp: 12858, atk: 342, def: 784 }, bonusStat: { critDmg: 38.4 } },
  },
};
