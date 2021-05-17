import { CharacterWithStats } from './character-stats-type';

export const traveler: CharacterWithStats = {
  name: 'traveler',
  weaponType: 'sword',
  levels: {
    '1': { stats: { hp: 912, atk: 18, def: 57 } },
    '20': { stats: { hp: 2342, atk: 46, def: 147 } },
    '20a': { stats: { hp: 3024, atk: 59, def: 190 } },
    '40': { stats: { hp: 4529, atk: 88, def: 284 } },
    '40a': { stats: { hp: 5013, atk: 98, def: 315 }, bonusStat: { percentAtk: 6 } },
    '50': { stats: { hp: 5766, atk: 113, def: 362 }, bonusStat: { percentAtk: 6 } },
    '50a': { stats: { hp: 6411, atk: 125, def: 405 }, bonusStat: { percentAtk: 12 } },
    '60': { stats: { hp: 7164, atk: 140, def: 450 }, bonusStat: { percentAtk: 12 } },
    '60a': { stats: { hp: 7648, atk: 149, def: 480 }, bonusStat: { percentAtk: 12 } },
    '70': { stats: { hp: 8401, atk: 164, def: 527 }, bonusStat: { percentAtk: 12 } },
    '70a': { stats: { hp: 8885, atk: 174, def: 558 }, bonusStat: { percentAtk: 18 } },
    '80': { stats: { hp: 9638, atk: 188, def: 605 }, bonusStat: { percentAtk: 18 } },
    '80a': { stats: { hp: 10122, atk: 198, def: 635 }, bonusStat: { percentAtk: 24 } },
    '90': { stats: { hp: 10875, atk: 212, def: 683 }, bonusStat: { percentAtk: 24 } },
  },
};
