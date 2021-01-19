import { CharacterStats } from './character-stats-type';

export const xiangling: CharacterStats = {
  name: 'xiangling',
  levels: {
    '1': { stats: { hp: 912, atk: 19, def: 56 } },
    '20': { stats: { hp: 2342, atk: 48, def: 144 } },
    '20a': { stats: { hp: 3024, atk: 63, def: 186 } },
    '40': { stats: { hp: 4529, atk: 94, def: 279 } },
    '40a': { stats: { hp: 5013, atk: 104, def: 308 }, bonusStat: { elementalMastery: 24 } },
    '50': { stats: { hp: 5766, atk: 119, def: 355 }, bonusStat: { elementalMastery: 24 } },
    '50a': { stats: { hp: 6411, atk: 133, def: 394 }, bonusStat: { elementalMastery: 48 } },
    '60': { stats: { hp: 7164, atk: 148, def: 441 }, bonusStat: { elementalMastery: 48 } },
    '60a': { stats: { hp: 7648, atk: 158, def: 470 }, bonusStat: { elementalMastery: 48 } },
    '70': { stats: { hp: 8401, atk: 174, def: 517 }, bonusStat: { elementalMastery: 48 } },
    '70a': { stats: { hp: 8885, atk: 184, def: 546 }, bonusStat: { elementalMastery: 72 } },
    '80': { stats: { hp: 9638, atk: 200, def: 593 }, bonusStat: { elementalMastery: 72 } },
    '80a': { stats: { hp: 10122, atk: 210, def: 623 }, bonusStat: { elementalMastery: 96 } },
    '90': { stats: { hp: 10875, atk: 225, def: 669 }, bonusStat: { elementalMastery: 96 } },
  },
};
