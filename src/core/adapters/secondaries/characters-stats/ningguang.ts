import { CharacterWithStats } from './character-stats-type';

export const ningguang: CharacterWithStats = {
  name: 'ningguang',
  levels: {
    '1': { stats: { hp: 821, atk: 18, def: 48 } },
    '20': { stats: { hp: 2108, atk: 46, def: 123 } },
    '20a': { stats: { hp: 2721, atk: 59, def: 159 } },
    '40': { stats: { hp: 4076, atk: 88, def: 239 } },
    '40a': { stats: { hp: 4512, atk: 98, def: 264 }, bonusStat: { geoDmg: 6 } },
    '50': { stats: { hp: 5189, atk: 113, def: 304 }, bonusStat: { geoDmg: 6 } },
    '50a': { stats: { hp: 5770, atk: 125, def: 338 }, bonusStat: { geoDmg: 12 } },
    '60': { stats: { hp: 6448, atk: 140, def: 378 }, bonusStat: { geoDmg: 12 } },
    '60a': { stats: { hp: 6884, atk: 149, def: 403 }, bonusStat: { geoDmg: 12 } },
    '70': { stats: { hp: 7561, atk: 164, def: 443 }, bonusStat: { geoDmg: 12 } },
    '70a': { stats: { hp: 7996, atk: 174, def: 468 }, bonusStat: { geoDmg: 18 } },
    '80': { stats: { hp: 8674, atk: 188, def: 508 }, bonusStat: { geoDmg: 18 } },
    '80a': { stats: { hp: 9110, atk: 198, def: 534 }, bonusStat: { geoDmg: 24 } },
    '90': { stats: { hp: 9787, atk: 212, def: 573 }, bonusStat: { geoDmg: 24 } },
  },
};
