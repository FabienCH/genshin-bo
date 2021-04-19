import { CharacterWithStats } from './character-stats-type';

export const lisa: CharacterWithStats = {
  name: 'lisa',
  weaponType: 'catalyst',
  levels: {
    '1': { stats: { hp: 802, atk: 19, def: 48 } },
    '20': { stats: { hp: 2061, atk: 50, def: 123 } },
    '20a': { stats: { hp: 2661, atk: 64, def: 159 } },
    '40': { stats: { hp: 3985, atk: 96, def: 239 } },
    '40a': { stats: { hp: 4411, atk: 107, def: 264 }, bonusStat: { elementalMastery: 24 } },
    '50': { stats: { hp: 5074, atk: 123, def: 304 }, bonusStat: { elementalMastery: 24 } },
    '50a': { stats: { hp: 5642, atk: 136, def: 338 }, bonusStat: { elementalMastery: 48 } },
    '60': { stats: { hp: 6305, atk: 153, def: 378 }, bonusStat: { elementalMastery: 48 } },
    '60a': { stats: { hp: 6731, atk: 163, def: 403 }, bonusStat: { elementalMastery: 48 } },
    '70': { stats: { hp: 7393, atk: 179, def: 443 }, bonusStat: { elementalMastery: 48 } },
    '70a': { stats: { hp: 7818, atk: 189, def: 468 }, bonusStat: { elementalMastery: 72 } },
    '80': { stats: { hp: 8481, atk: 205, def: 508 }, bonusStat: { elementalMastery: 72 } },
    '80a': { stats: { hp: 8907, atk: 215, def: 534 }, bonusStat: { elementalMastery: 96 } },
    '90': { stats: { hp: 9570, atk: 232, def: 573 }, bonusStat: { elementalMastery: 96 } },
  },
};
