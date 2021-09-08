import { CharacterWithStats } from './character-stats-type';

export const kujouSara: CharacterWithStats = {
  name: 'kujouSara',
  weaponType: 'bow',
  levels: {
    '1': { stats: { hp: 802, atk: 16, def: 53 } },
    '20': { stats: { hp: 2061, atk: 42, def: 135 } },
    '20a': { stats: { hp: 2661, atk: 54, def: 175 } },
    '40': { stats: { hp: 3985, atk: 81, def: 262 } },
    '40a': { stats: { hp: 4411, atk: 90, def: 289 }, bonusStat: { percentAtk: 6 } },
    '50': { stats: { hp: 5074, atk: 104, def: 333 }, bonusStat: { percentAtk: 6 } },
    '50a': { stats: { hp: 5642, atk: 115, def: 370 }, bonusStat: { percentAtk: 12 } },
    '60': { stats: { hp: 6305, atk: 129, def: 414 }, bonusStat: { percentAtk: 12 } },
    '60a': { stats: { hp: 6731, atk: 137, def: 442 }, bonusStat: { percentAtk: 12 } },
    '70': { stats: { hp: 7393, atk: 151, def: 485 }, bonusStat: { percentAtk: 12 } },
    '70a': { stats: { hp: 7818, atk: 160, def: 513 }, bonusStat: { percentAtk: 18 } },
    '80': { stats: { hp: 8481, atk: 173, def: 556 }, bonusStat: { percentAtk: 18 } },
    '80a': { stats: { hp: 8907, atk: 182, def: 584 }, bonusStat: { percentAtk: 24 } },
    '90': { stats: { hp: 9570, atk: 195, def: 628 }, bonusStat: { percentAtk: 24 } },
  },
};
