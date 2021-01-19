import { CharacterStats } from './character-stats-type';

export const xingqiu: CharacterStats = {
  name: 'xingqiu',
  levels: {
    '1': { stats: { hp: 857, atk: 17, def: 64 } },
    '20': { stats: { hp: 2202, atk: 43, def: 163 } },
    '20a': { stats: { hp: 2842, atk: 56, def: 211 } },
    '40': { stats: { hp: 4257, atk: 84, def: 316 } },
    '40a': { stats: { hp: 4712, atk: 93, def: 349 }, bonusStat: { percentAtk: 6 } },
    '50': { stats: { hp: 5420, atk: 107, def: 402 }, bonusStat: { percentAtk: 6 } },
    '50a': { stats: { hp: 6027, atk: 119, def: 447 }, bonusStat: { percentAtk: 12 } },
    '60': { stats: { hp: 6735, atk: 133, def: 499 }, bonusStat: { percentAtk: 12 } },
    '60a': { stats: { hp: 7190, atk: 142, def: 533 }, bonusStat: { percentAtk: 12 } },
    '70': { stats: { hp: 7897, atk: 156, def: 585 }, bonusStat: { percentAtk: 12 } },
    '70a': { stats: { hp: 8352, atk: 165, def: 619 }, bonusStat: { percentAtk: 18 } },
    '80': { stats: { hp: 9060, atk: 179, def: 671 }, bonusStat: { percentAtk: 18 } },
    '80a': { stats: { hp: 9515, atk: 188, def: 705 }, bonusStat: { percentAtk: 24 } },
    '90': { stats: { hp: 10223, atk: 202, def: 758 }, bonusStat: { percentAtk: 24 } },
  },
};
