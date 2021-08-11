import { CharacterWithStats } from './character-stats-type';

export const yoimiya: CharacterWithStats = {
  name: 'yoimiya',
  weaponType: 'bow',
  levels: {
    '1': { stats: { hp: 791, atk: 25, def: 48 } },
    '20': { stats: { hp: 2053, atk: 65, def: 124 } },
    '20a': { stats: { hp: 2731, atk: 87, def: 165 } },
    '40': { stats: { hp: 4086, atk: 130, def: 247 } },
    '40a': { stats: { hp: 4568, atk: 145, def: 276 }, bonusStat: { critRate: 4.8 } },
    '50': { stats: { hp: 5256, atk: 167, def: 318 }, bonusStat: { critRate: 4.8 } },
    '50a': { stats: { hp: 5899, atk: 187, def: 357 }, bonusStat: { critRate: 9.6 } },
    '60': { stats: { hp: 6593, atk: 209, def: 399 }, bonusStat: { critRate: 9.6 } },
    '60a': { stats: { hp: 7075, atk: 225, def: 428 }, bonusStat: { critRate: 9.6 } },
    '70': { stats: { hp: 7777, atk: 247, def: 470 }, bonusStat: { critRate: 9.6 } },
    '70a': { stats: { hp: 8259, atk: 262, def: 500 }, bonusStat: { critRate: 14.4 } },
    '80': { stats: { hp: 8968, atk: 285, def: 542 }, bonusStat: { critRate: 14.4 } },
    '80a': { stats: { hp: 9450, atk: 300, def: 572 }, bonusStat: { critRate: 19.2 } },
    '90': { stats: { hp: 10164, atk: 323, def: 615 }, bonusStat: { critRate: 19.2 } },
  },
};
