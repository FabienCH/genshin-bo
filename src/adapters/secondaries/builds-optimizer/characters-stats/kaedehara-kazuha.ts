import { CharacterWithStats } from './character-stats-type';

export const kaedeharaKazuha: CharacterWithStats = {
  name: 'kaedeharaKazuha',
  weaponType: 'sword',
  levels: {
    '1': { stats: { hp: 1039, atk: 23, def: 63 } },
    '20': { stats: { hp: 2695, atk: 60, def: 163 } },
    '20a': { stats: { hp: 3586, atk: 80, def: 217 } },
    '40': { stats: { hp: 5366, atk: 119, def: 324 } },
    '40a': { stats: { hp: 5999, atk: 133, def: 363 }, bonusStat: { elementalMastery: 28.8 } },
    '50': { stats: { hp: 5902, atk: 153, def: 468 }, bonusStat: { elementalMastery: 28.8 } },
    '50a': { stats: { hp: 7747, atk: 172, def: 468 }, bonusStat: { elementalMastery: 57.6 } },
    '60': { stats: { hp: 8659, atk: 192, def: 523 }, bonusStat: { elementalMastery: 57.6 } },
    '60a': { stats: { hp: 9292, atk: 206, def: 562 }, bonusStat: { elementalMastery: 57.6 } },
    '70': { stats: { hp: 10213, atk: 227, def: 617 }, bonusStat: { elementalMastery: 57.6 } },
    '70a': { stats: { hp: 10846, atk: 241, def: 656 }, bonusStat: { elementalMastery: 86.4 } },
    '80': { stats: { hp: 11777, atk: 262, def: 712 }, bonusStat: { elementalMastery: 86.4 } },
    '80a': { stats: { hp: 12410, atk: 276, def: 750 }, bonusStat: { elementalMastery: 115.2 } },
    '90': { stats: { hp: 13348, atk: 297, def: 807 }, bonusStat: { elementalMastery: 115.2 } },
  },
};
