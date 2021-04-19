import { CharacterWithStats } from './character-stats-type';

export const fischl: CharacterWithStats = {
  name: 'fischl',
  weaponType: 'bow',
  levels: {
    '1': { stats: { hp: 770, atk: 20, def: 50 } },
    '20': { stats: { hp: 1979, atk: 53, def: 128 } },
    '20a': { stats: { hp: 2555, atk: 68, def: 165 } },
    '40': { stats: { hp: 3827, atk: 102, def: 247 } },
    '40a': { stats: { hp: 4236, atk: 113, def: 274 }, bonusStat: { percentAtk: 6 } },
    '50': { stats: { hp: 4872, atk: 130, def: 315 }, bonusStat: { percentAtk: 6 } },
    '50a': { stats: { hp: 5418, atk: 144, def: 350 }, bonusStat: { percentAtk: 12 } },
    '60': { stats: { hp: 6054, atk: 161, def: 391 }, bonusStat: { percentAtk: 12 } },
    '60a': { stats: { hp: 6463, atk: 172, def: 418 }, bonusStat: { percentAtk: 12 } },
    '70': { stats: { hp: 7099, atk: 189, def: 459 }, bonusStat: { percentAtk: 12 } },
    '70a': { stats: { hp: 7508, atk: 200, def: 485 }, bonusStat: { percentAtk: 18 } },
    '80': { stats: { hp: 8144, atk: 216, def: 526 }, bonusStat: { percentAtk: 18 } },
    '80a': { stats: { hp: 8553, atk: 227, def: 553 }, bonusStat: { percentAtk: 24 } },
    '90': { stats: { hp: 9189, atk: 244, def: 594 }, bonusStat: { percentAtk: 24 } },
  },
};
