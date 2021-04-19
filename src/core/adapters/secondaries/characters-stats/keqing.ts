import { CharacterWithStats } from './character-stats-type';

export const keqing: CharacterWithStats = {
  name: 'keqing',
  weaponType: 'sword',
  levels: {
    '1': { stats: { hp: 1020, atk: 25, def: 62 } },
    '20': { stats: { hp: 2646, atk: 65, def: 161 } },
    '20a': { stats: { hp: 3521, atk: 87, def: 215 } },
    '40': { stats: { hp: 5268, atk: 130, def: 321 } },
    '40a': { stats: { hp: 5889, atk: 145, def: 359 }, bonusStat: { critDmg: 9.6 } },
    '50': { stats: { hp: 6776, atk: 167, def: 413 }, bonusStat: { critDmg: 9.6 } },
    '50a': { stats: { hp: 7604, atk: 187, def: 464 }, bonusStat: { critDmg: 19.2 } },
    '60': { stats: { hp: 8500, atk: 209, def: 519 }, bonusStat: { critDmg: 19.2 } },
    '60a': { stats: { hp: 9121, atk: 225, def: 556 }, bonusStat: { critDmg: 19.2 } },
    '70': { stats: { hp: 10025, atk: 247, def: 612 }, bonusStat: { critDmg: 19.2 } },
    '70a': { stats: { hp: 10647, atk: 262, def: 649 }, bonusStat: { critDmg: 28.8 } },
    '80': { stats: { hp: 11561, atk: 285, def: 705 }, bonusStat: { critDmg: 28.8 } },
    '80a': { stats: { hp: 12182, atk: 300, def: 743 }, bonusStat: { critDmg: 38.4 } },
    '90': { stats: { hp: 13103, atk: 323, def: 799 }, bonusStat: { critDmg: 38.4 } },
  },
};
