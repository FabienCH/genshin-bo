import { CharacterStats } from './character-stats-type';

export const qiqi: CharacterStats = {
  name: 'qiqi',
  levels: {
    '1': { stats: { hp: 963, atk: 22, def: 72 } },
    '20': { stats: { hp: 2498, atk: 58, def: 186 } },
    '20a': { stats: { hp: 3323, atk: 77, def: 248 } },
    '40': { stats: { hp: 4973, atk: 115, def: 371 } },
    '40a': { stats: { hp: 5559, atk: 129, def: 415 }, bonusStat: { healingBonus: 5.5 } },
    '50': { stats: { hp: 6396, atk: 148, def: 477 }, bonusStat: { healingBonus: 5.5 } },
    '50a': { stats: { hp: 7178, atk: 167, def: 535 }, bonusStat: { healingBonus: 11.1 } },
    '60': { stats: { hp: 8023, atk: 186, def: 598 }, bonusStat: { healingBonus: 11.1 } },
    '60a': { stats: { hp: 8610, atk: 200, def: 642 }, bonusStat: { healingBonus: 11.1 } },
    '70': { stats: { hp: 9463, atk: 220, def: 706 }, bonusStat: { healingBonus: 11.1 } },
    '70a': { stats: { hp: 10050, atk: 233, def: 749 }, bonusStat: { healingBonus: 16.6 } },
    '80': { stats: { hp: 10912, atk: 253, def: 814 }, bonusStat: { healingBonus: 16.6 } },
    '80a': { stats: { hp: 11499, atk: 267, def: 857 }, bonusStat: { healingBonus: 22.2 } },
    '90': { stats: { hp: 12368, atk: 287, def: 922 }, bonusStat: { healingBonus: 22.2 } },
  },
};
