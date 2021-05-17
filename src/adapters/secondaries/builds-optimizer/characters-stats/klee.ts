import { CharacterWithStats } from './character-stats-type';

export const klee: CharacterWithStats = {
  name: 'klee',
  weaponType: 'catalyst',
  levels: {
    '1': { stats: { hp: 801, atk: 24, def: 48 } },
    '20': { stats: { hp: 2077, atk: 63, def: 124 } },
    '20a': { stats: { hp: 2764, atk: 84, def: 165 } },
    '40': { stats: { hp: 4136, atk: 125, def: 247 } },
    '40a': { stats: { hp: 4623, atk: 140, def: 276 }, bonusStat: { pyroDmg: 7.2 } },
    '50': { stats: { hp: 5319, atk: 161, def: 318 }, bonusStat: { pyroDmg: 7.2 } },
    '50a': { stats: { hp: 5970, atk: 180, def: 357 }, bonusStat: { pyroDmg: 14.4 } },
    '60': { stats: { hp: 6673, atk: 202, def: 399 }, bonusStat: { pyroDmg: 14.4 } },
    '60a': { stats: { hp: 7161, atk: 216, def: 428 }, bonusStat: { pyroDmg: 14.4 } },
    '70': { stats: { hp: 7870, atk: 238, def: 470 }, bonusStat: { pyroDmg: 14.4 } },
    '70a': { stats: { hp: 8358, atk: 253, def: 500 }, bonusStat: { pyroDmg: 21.6 } },
    '80': { stats: { hp: 9076, atk: 274, def: 542 }, bonusStat: { pyroDmg: 21.6 } },
    '80a': { stats: { hp: 9563, atk: 289, def: 572 }, bonusStat: { pyroDmg: 28.8 } },
    '90': { stats: { hp: 10287, atk: 311, def: 615 }, bonusStat: { pyroDmg: 28.8 } },
  },
};
