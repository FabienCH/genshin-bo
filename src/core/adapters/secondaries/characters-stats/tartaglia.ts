import { CharacterWithStats } from './character-stats-type';

export const tartaglia: CharacterWithStats = {
  name: 'tartaglia',
  levels: {
    '1': { stats: { hp: 1020, atk: 23, def: 63 } },
    '20': { stats: { hp: 2646, atk: 61, def: 165 } },
    '20a': { stats: { hp: 3521, atk: 81, def: 219 } },
    '40': { stats: { hp: 5268, atk: 121, def: 328 } },
    '40a': { stats: { hp: 5889, atk: 135, def: 366 }, bonusStat: { hydroDmg: 7.2 } },
    '50': { stats: { hp: 6776, atk: 156, def: 421 }, bonusStat: { hydroDmg: 7.2 } },
    '50a': { stats: { hp: 7604, atk: 175, def: 473 }, bonusStat: { hydroDmg: 14.4 } },
    '60': { stats: { hp: 8500, atk: 195, def: 528 }, bonusStat: { hydroDmg: 14.4 } },
    '60a': { stats: { hp: 9121, atk: 210, def: 567 }, bonusStat: { hydroDmg: 14.4 } },
    '70': { stats: { hp: 10025, atk: 231, def: 623 }, bonusStat: { hydroDmg: 14.4 } },
    '70a': { stats: { hp: 10647, atk: 245, def: 662 }, bonusStat: { hydroDmg: 21.6 } },
    '80': { stats: { hp: 11561, atk: 266, def: 719 }, bonusStat: { hydroDmg: 21.6 } },
    '80a': { stats: { hp: 12182, atk: 280, def: 757 }, bonusStat: { hydroDmg: 28.8 } },
    '90': { stats: { hp: 13103, atk: 301, def: 815 }, bonusStat: { hydroDmg: 28.8 } },
  },
};
