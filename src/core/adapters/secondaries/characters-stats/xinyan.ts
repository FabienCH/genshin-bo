import { CharacterWithStats } from './character-stats-type';

export const xinyan: CharacterWithStats = {
  name: 'xinyan',
  weaponType: 'claymore',
  levels: {
    '1': { stats: { hp: 939, atk: 21, def: 67 } },
    '20': { stats: { hp: 2413, atk: 54, def: 172 } },
    '20a': { stats: { hp: 3114, atk: 69, def: 222 } },
    '40': { stats: { hp: 4665, atk: 103, def: 333 } },
    '40a': { stats: { hp: 5163, atk: 115, def: 368 }, bonusStat: { percentAtk: 6 } },
    '50': { stats: { hp: 5939, atk: 132, def: 423 }, bonusStat: { percentAtk: 6 } },
    '50a': { stats: { hp: 6604, atk: 147, def: 471 }, bonusStat: { percentAtk: 12 } },
    '60': { stats: { hp: 7379, atk: 164, def: 526 }, bonusStat: { percentAtk: 12 } },
    '60a': { stats: { hp: 7878, atk: 175, def: 562 }, bonusStat: { percentAtk: 12 } },
    '70': { stats: { hp: 8653, atk: 192, def: 617 }, bonusStat: { percentAtk: 12 } },
    '70a': { stats: { hp: 9151, atk: 203, def: 652 }, bonusStat: { percentAtk: 18 } },
    '80': { stats: { hp: 9927, atk: 220, def: 708 }, bonusStat: { percentAtk: 18 } },
    '80a': { stats: { hp: 10425, atk: 231, def: 743 }, bonusStat: { percentAtk: 24 } },
    '90': { stats: { hp: 11201, atk: 249, def: 799 }, bonusStat: { percentAtk: 24 } },
  },
};
