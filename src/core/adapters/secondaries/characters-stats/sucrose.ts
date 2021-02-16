import { CharacterWithStats } from './character-stats-type';

export const sucrose: CharacterWithStats = {
  name: 'sucrose',
  levels: {
    '1': { stats: { hp: 775, atk: 14, def: 59 } },
    '20': { stats: { hp: 1991, atk: 37, def: 151 } },
    '20a': { stats: { hp: 2570, atk: 47, def: 195 } },
    '40': { stats: { hp: 3850, atk: 71, def: 293 } },
    '40a': { stats: { hp: 4261, atk: 78, def: 324 }, bonusStat: { anemoDmg: 6 } },
    '50': { stats: { hp: 4901, atk: 90, def: 373 }, bonusStat: { anemoDmg: 6 } },
    '50a': { stats: { hp: 5450, atk: 100, def: 414 }, bonusStat: { anemoDmg: 12 } },
    '60': { stats: { hp: 6090, atk: 112, def: 463 }, bonusStat: { anemoDmg: 12 } },
    '60a': { stats: { hp: 6501, atk: 120, def: 494 }, bonusStat: { anemoDmg: 12 } },
    '70': { stats: { hp: 7141, atk: 131, def: 543 }, bonusStat: { anemoDmg: 12 } },
    '70a': { stats: { hp: 7552, atk: 139, def: 574 }, bonusStat: { anemoDmg: 18 } },
    '80': { stats: { hp: 8192, atk: 151, def: 623 }, bonusStat: { anemoDmg: 18 } },
    '80a': { stats: { hp: 8603, atk: 158, def: 654 }, bonusStat: { anemoDmg: 24 } },
    '90': { stats: { hp: 9243, atk: 170, def: 703 }, bonusStat: { anemoDmg: 24 } },
  },
};
