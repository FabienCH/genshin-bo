import { CharacterWithStats } from './character-stats-type';

export const diona: CharacterWithStats = {
  name: 'diona',
  weaponType: 'bow',
  levels: {
    '1': { stats: { hp: 802, atk: 18, def: 50 } },
    '20': { stats: { hp: 2061, atk: 46, def: 129 } },
    '20a': { stats: { hp: 2661, atk: 59, def: 167 } },
    '40': { stats: { hp: 3985, atk: 88, def: 250 } },
    '40a': { stats: { hp: 4411, atk: 98, def: 277 }, bonusStat: { cryoDmg: 6 } },
    '50': { stats: { hp: 5074, atk: 113, def: 318 }, bonusStat: { cryoDmg: 6 } },
    '50a': { stats: { hp: 5642, atk: 125, def: 354 }, bonusStat: { cryoDmg: 12 } },
    '60': { stats: { hp: 6305, atk: 140, def: 396 }, bonusStat: { cryoDmg: 12 } },
    '60a': { stats: { hp: 6731, atk: 149, def: 422 }, bonusStat: { cryoDmg: 12 } },
    '70': { stats: { hp: 7393, atk: 164, def: 464 }, bonusStat: { cryoDmg: 12 } },
    '70a': { stats: { hp: 7818, atk: 174, def: 491 }, bonusStat: { cryoDmg: 18 } },
    '80': { stats: { hp: 8481, atk: 188, def: 532 }, bonusStat: { cryoDmg: 18 } },
    '80a': { stats: { hp: 8907, atk: 198, def: 559 }, bonusStat: { cryoDmg: 24 } },
    '90': { stats: { hp: 9570, atk: 212, def: 601 }, bonusStat: { cryoDmg: 24 } },
  },
};
