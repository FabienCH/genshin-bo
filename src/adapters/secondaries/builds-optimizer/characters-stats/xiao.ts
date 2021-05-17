import { CharacterWithStats } from './character-stats-type';

export const xiao: CharacterWithStats = {
  name: 'xiao',
  weaponType: 'polearm',
  levels: {
    '1': { stats: { hp: 991, atk: 27, def: 62 } },
    '20': { stats: { hp: 2572, atk: 71, def: 161 } },
    '20a': { stats: { hp: 3422, atk: 94, def: 215 } },
    '40': { stats: { hp: 5120, atk: 141, def: 321 } },
    '40a': { stats: { hp: 5724, atk: 157, def: 359 }, bonusStat: { critRate: 4.8 } },
    '50': { stats: { hp: 6586, atk: 181, def: 413 }, bonusStat: { critRate: 4.8 } },
    '50a': { stats: { hp: 7391, atk: 203, def: 464 }, bonusStat: { critRate: 9.6 } },
    '60': { stats: { hp: 8262, atk: 227, def: 519 }, bonusStat: { critRate: 9.6 } },
    '60a': { stats: { hp: 8866, atk: 243, def: 556 }, bonusStat: { critRate: 9.6 } },
    '70': { stats: { hp: 9744, atk: 267, def: 612 }, bonusStat: { critRate: 9.6 } },
    '70a': { stats: { hp: 10348, atk: 284, def: 649 }, bonusStat: { critRate: 14.4 } },
    '80': { stats: { hp: 11236, atk: 308, def: 705 }, bonusStat: { critRate: 14.4 } },
    '80a': { stats: { hp: 11840, atk: 325, def: 743 }, bonusStat: { critRate: 19.2 } },
    '90': { stats: { hp: 12736, atk: 349, def: 799 }, bonusStat: { critRate: 19.2 } },
  },
};
