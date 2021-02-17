import { CharacterWithStats } from './character-stats-type';

export const diluc: CharacterWithStats = {
  name: 'diluc',
  levels: {
    '1': { stats: { hp: 1011, atk: 26, def: 61 } },
    '20': { stats: { hp: 2621, atk: 68, def: 158 } },
    '20a': { stats: { hp: 3488, atk: 90, def: 211 } },
    '40': { stats: { hp: 5219, atk: 135, def: 315 } },
    '40a': { stats: { hp: 5834, atk: 151, def: 352 }, bonusStat: { critRate: 4.8 } },
    '50': { stats: { hp: 6712, atk: 173, def: 405 }, bonusStat: { critRate: 4.8 } },
    '50a': { stats: { hp: 7533, atk: 194, def: 455 }, bonusStat: { critRate: 9.6 } },
    '60': { stats: { hp: 8421, atk: 217, def: 509 }, bonusStat: { critRate: 9.6 } },
    '60a': { stats: { hp: 9036, atk: 233, def: 546 }, bonusStat: { critRate: 9.6 } },
    '70': { stats: { hp: 9932, atk: 256, def: 600 }, bonusStat: { critRate: 9.6 } },
    '70a': { stats: { hp: 10547, atk: 272, def: 637 }, bonusStat: { critRate: 14.4 } },
    '80': { stats: { hp: 11453, atk: 295, def: 692 }, bonusStat: { critRate: 14.4 } },
    '80a': { stats: { hp: 12068, atk: 311, def: 729 }, bonusStat: { critRate: 19.2 } },
    '90': { stats: { hp: 12981, atk: 335, def: 784 }, bonusStat: { critRate: 19.2 } },
  },
};
