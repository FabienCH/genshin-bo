import { CharacterStats } from './character-stats-type';

export const jean: CharacterStats = {
  name: 'jean',
  levels: {
    '1': { stats: { hp: 1144, atk: 19, def: 60 } },
    '20': { stats: { hp: 2967, atk: 48, def: 155 } },
    '20a': { stats: { hp: 3948, atk: 64, def: 206 } },
    '40': { stats: { hp: 5908, atk: 96, def: 309 } },
    '40a': { stats: { hp: 6605, atk: 108, def: 345 }, bonusStat: { healingBonus: 5.5 } },
    '50': { stats: { hp: 7599, atk: 124, def: 397 }, bonusStat: { healingBonus: 5.5 } },
    '50a': { stats: { hp: 8528, atk: 139, def: 446 }, bonusStat: { healingBonus: 11.1 } },
    '60': { stats: { hp: 9533, atk: 155, def: 499 }, bonusStat: { healingBonus: 11.1 } },
    '60a': { stats: { hp: 10230, atk: 166, def: 535 }, bonusStat: { healingBonus: 11.1 } },
    '70': { stats: { hp: 11243, atk: 183, def: 588 }, bonusStat: { healingBonus: 11.1 } },
    '70a': { stats: { hp: 11940, atk: 194, def: 624 }, bonusStat: { healingBonus: 16.6 } },
    '80': { stats: { hp: 12965, atk: 211, def: 678 }, bonusStat: { healingBonus: 16.6 } },
    '80a': { stats: { hp: 13662, atk: 222, def: 715 }, bonusStat: { healingBonus: 22.2 } },
    '90': { stats: { hp: 14695, atk: 239, def: 769 }, bonusStat: { healingBonus: 22.2 } },
  },
};
