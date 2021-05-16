import { CharacterWithStats } from './character-stats-type';

export const yanfei: CharacterWithStats = {
  name: 'yanfei',
  weaponType: 'catalyst',
  levels: {
    '1': { stats: { hp: 784, atk: 20, def: 49 } },
    '20': { stats: { hp: 2014, atk: 52, def: 126 } },
    '20a': { stats: { hp: 2600, atk: 67, def: 163 } },
    '40': { stats: { hp: 3895, atk: 100, def: 244 } },
    '40a': { stats: { hp: 4311, atk: 111, def: 271 }, bonusStat: { pyroDmg: 6 } },
    '50': { stats: { hp: 4959, atk: 127, def: 311 }, bonusStat: { pyroDmg: 6 } },
    '50a': { stats: { hp: 5514, atk: 141, def: 346 }, bonusStat: { pyroDmg: 12 } },
    '60': { stats: { hp: 6161, atk: 158, def: 387 }, bonusStat: { pyroDmg: 12 } },
    '60a': { stats: { hp: 6578, atk: 169, def: 413 }, bonusStat: { pyroDmg: 12 } },
    '70': { stats: { hp: 7225, atk: 185, def: 453 }, bonusStat: { pyroDmg: 12 } },
    '70a': { stats: { hp: 7641, atk: 196, def: 480 }, bonusStat: { pyroDmg: 18 } },
    '80': { stats: { hp: 8289, atk: 213, def: 520 }, bonusStat: { pyroDmg: 18 } },
    '80a': { stats: { hp: 8705, atk: 223, def: 546 }, bonusStat: { pyroDmg: 24 } },
    '90': { stats: { hp: 9352, atk: 240, def: 587 }, bonusStat: { pyroDmg: 24 } },
  },
};
