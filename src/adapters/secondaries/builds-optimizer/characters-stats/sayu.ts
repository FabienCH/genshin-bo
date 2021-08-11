import { CharacterWithStats } from './character-stats-type';

export const sayu: CharacterWithStats = {
  name: 'sayu',
  weaponType: 'claymore',
  levels: {
    '1': { stats: { hp: 994, atk: 20, def: 62 } },
    '20': { stats: { hp: 2553, atk: 53, def: 160 } },
    '20a': { stats: { hp: 3296, atk: 68, def: 207 } },
    '40': { stats: { hp: 4937, atk: 102, def: 310 } },
    '40a': { stats: { hp: 5464, atk: 113, def: 343 }, bonusStat: { elementalMastery: 24 } },
    '50': { stats: { hp: 6285, atk: 130, def: 395 }, bonusStat: { elementalMastery: 24 } },
    '50a': { stats: { hp: 6988, atk: 144, def: 439 }, bonusStat: { elementalMastery: 48 } },
    '60': { stats: { hp: 7809, atk: 161, def: 491 }, bonusStat: { elementalMastery: 48 } },
    '60a': { stats: { hp: 8337, atk: 172, def: 524 }, bonusStat: { elementalMastery: 48 } },
    '70': { stats: { hp: 9157, atk: 189, def: 575 }, bonusStat: { elementalMastery: 48 } },
    '70a': { stats: { hp: 9684, atk: 200, def: 608 }, bonusStat: { elementalMastery: 72 } },
    '80': { stats: { hp: 10505, atk: 216, def: 660 }, bonusStat: { elementalMastery: 72 } },
    '80a': { stats: { hp: 11033, atk: 227, def: 693 }, bonusStat: { elementalMastery: 96 } },
    '90': { stats: { hp: 11854, atk: 244, def: 745 }, bonusStat: { elementalMastery: 96 } },
  },
};
