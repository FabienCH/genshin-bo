import { CharacterWithStats } from './character-stats-type';

export const huTao: CharacterWithStats = {
  name: 'huTao',
  levels: {
    '1': { stats: { hp: 1211, atk: 8, def: 68 } },
    '20': { stats: { hp: 3141, atk: 21, def: 177 } },
    '20a': { stats: { hp: 4179, atk: 29, def: 235 } },
    '40': { stats: { hp: 6253, atk: 43, def: 352 } },
    '40a': { stats: { hp: 6990, atk: 48, def: 394 }, bonusStat: { critDmg: 9.6 } },
    '50': { stats: { hp: 8042, atk: 55, def: 453 }, bonusStat: { critDmg: 9.6 } },
    '50a': { stats: { hp: 9026, atk: 62, def: 508 }, bonusStat: { critDmg: 19.2 } },
    '60': { stats: { hp: 10089, atk: 69, def: 568 }, bonusStat: { critDmg: 19.2 } },
    '60a': { stats: { hp: 10826, atk: 74, def: 610 }, bonusStat: { critDmg: 19.2 } },
    '70': { stats: { hp: 11899, atk: 81, def: 670 }, bonusStat: { critDmg: 19.2 } },
    '70a': { stats: { hp: 12637, atk: 86, def: 712 }, bonusStat: { critDmg: 28.8 } },
    '80': { stats: { hp: 13721, atk: 94, def: 773 }, bonusStat: { critDmg: 28.8 } },
    '80a': { stats: { hp: 14459, atk: 99, def: 815 }, bonusStat: { critDmg: 38.4 } },
    '90': { stats: { hp: 15552, atk: 106, def: 876 }, bonusStat: { critDmg: 38.4 } },
  },
};
