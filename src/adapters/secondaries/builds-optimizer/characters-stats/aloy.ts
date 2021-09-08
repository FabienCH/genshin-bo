import { CharacterWithStats } from './character-stats-type';

export const aloy: CharacterWithStats = {
  name: 'aloy',
  weaponType: 'bow',
  levels: {
    '1': { stats: { hp: 848, atk: 18, def: 53 } },
    '20': { stats: { hp: 2201, atk: 47, def: 137 } },
    '20a': { stats: { hp: 2928, atk: 63, def: 182 } },
    '40': { stats: { hp: 4382, atk: 94, def: 272 } },
    '40a': { stats: { hp: 4899, atk: 105, def: 304 }, bonusStat: { cryoDmg: 7.2 } },
    '50': { stats: { hp: 5636, atk: 121, def: 350 }, bonusStat: { cryoDmg: 7.2 } },
    '50a': { stats: { hp: 6325, atk: 136, def: 393 }, bonusStat: { cryoDmg: 14.4 } },
    '60': { stats: { hp: 7070, atk: 152, def: 439 }, bonusStat: { cryoDmg: 14.4 } },
    '60a': { stats: { hp: 7587, atk: 163, def: 471 }, bonusStat: { cryoDmg: 14.4 } },
    '70': { stats: { hp: 8339, atk: 179, def: 517 }, bonusStat: { cryoDmg: 14.4 } },
    '70a': { stats: { hp: 8856, atk: 190, def: 550 }, bonusStat: { cryoDmg: 21.6 } },
    '80': { stats: { hp: 9616, atk: 206, def: 597 }, bonusStat: { cryoDmg: 21.6 } },
    '80a': { stats: { hp: 10133, atk: 217, def: 629 }, bonusStat: { cryoDmg: 28.8 } },
    '90': { stats: { hp: 10899, atk: 234, def: 676 }, bonusStat: { cryoDmg: 28.8 } },
  },
};
