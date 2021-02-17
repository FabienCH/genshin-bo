import { CharacterWithStats } from './character-stats-type';

export const mona: CharacterWithStats = {
  name: 'mona',
  levels: {
    '1': { stats: { hp: 810, atk: 22, def: 51 } },
    '20': { stats: { hp: 2102, atk: 58, def: 132 } },
    '20a': { stats: { hp: 2797, atk: 77, def: 176 } },
    '40': { stats: { hp: 4185, atk: 115, def: 263 } },
    '40a': { stats: { hp: 4678, atk: 129, def: 294 }, bonusStat: { energyRecharge: 8 } },
    '50': { stats: { hp: 5383, atk: 148, def: 338 }, bonusStat: { energyRecharge: 8 } },
    '50a': { stats: { hp: 6041, atk: 167, def: 379 }, bonusStat: { energyRecharge: 16 } },
    '60': { stats: { hp: 6752, atk: 186, def: 424 }, bonusStat: { energyRecharge: 16 } },
    '60a': { stats: { hp: 7246, atk: 200, def: 455 }, bonusStat: { energyRecharge: 16 } },
    '70': { stats: { hp: 7964, atk: 220, def: 500 }, bonusStat: { energyRecharge: 16 } },
    '70a': { stats: { hp: 8458, atk: 233, def: 531 }, bonusStat: { energyRecharge: 24 } },
    '80': { stats: { hp: 9184, atk: 253, def: 576 }, bonusStat: { energyRecharge: 24 } },
    '80a': { stats: { hp: 9677, atk: 267, def: 607 }, bonusStat: { energyRecharge: 32 } },
    '90': { stats: { hp: 10409, atk: 287, def: 653 }, bonusStat: { energyRecharge: 32 } },
  },
};
