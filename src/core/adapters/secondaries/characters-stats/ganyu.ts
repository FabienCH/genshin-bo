import { CharacterStats } from './character-stats-type';

export const ganyu: CharacterStats = {
  name: 'ganyu',
  levels: {
    '1': { stats: { hp: 763, atk: 26, def: 49 } },
    '20': { stats: { hp: 1978, atk: 68, def: 127 } },
    '20a': { stats: { hp: 2632, atk: 90, def: 169 } },
    '40': { stats: { hp: 3939, atk: 135, def: 253 } },
    '40a': { stats: { hp: 4403, atk: 151, def: 283 }, bonusStat: { critDmg: 9.6 } },
    '50': { stats: { hp: 5066, atk: 173, def: 326 }, bonusStat: { critDmg: 9.6 } },
    '50a': { stats: { hp: 5686, atk: 194, def: 366 }, bonusStat: { critDmg: 19.2 } },
    '60': { stats: { hp: 6355, atk: 217, def: 409 }, bonusStat: { critDmg: 19.2 } },
    '60a': { stats: { hp: 6820, atk: 233, def: 439 }, bonusStat: { critDmg: 19.2 } },
    '70': { stats: { hp: 7495, atk: 256, def: 482 }, bonusStat: { critDmg: 19.2 } },
    '70a': { stats: { hp: 7960, atk: 272, def: 512 }, bonusStat: { critDmg: 28.8 } },
    '80': { stats: { hp: 8643, atk: 295, def: 556 }, bonusStat: { critDmg: 28.8 } },
    '80a': { stats: { hp: 9108, atk: 311, def: 586 }, bonusStat: { critDmg: 38.4 } },
    '90': { stats: { hp: 9797, atk: 335, def: 630 }, bonusStat: { critDmg: 38.4 } },
  },
};
