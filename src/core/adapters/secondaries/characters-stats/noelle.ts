import { CharacterStats } from './character-stats-type';

export const noelle: CharacterStats = {
  name: 'noelle',
  levels: {
    '1': { stats: { hp: 1012, atk: 16, def: 67 } },
    '20': { stats: { hp: 2600, atk: 41, def: 172 } },
    '20a': { stats: { hp: 3356, atk: 53, def: 222 } },
    '40': { stats: { hp: 5027, atk: 80, def: 333 } },
    '40a': { stats: { hp: 5564, atk: 88, def: 368 }, bonusStat: { percentDef: 7.5 } },
    '50': { stats: { hp: 6400, atk: 101, def: 423 }, bonusStat: { percentDef: 7.5 } },
    '50a': { stats: { hp: 7117, atk: 113, def: 471 }, bonusStat: { percentDef: 15 } },
    '60': { stats: { hp: 7953, atk: 126, def: 526 }, bonusStat: { percentDef: 15 } },
    '60a': { stats: { hp: 8490, atk: 134, def: 562 }, bonusStat: { percentDef: 15 } },
    '70': { stats: { hp: 9325, atk: 148, def: 617 }, bonusStat: { percentDef: 15 } },
    '70a': { stats: { hp: 9862, atk: 156, def: 652 }, bonusStat: { percentDef: 22.5 } },
    '80': { stats: { hp: 10698, atk: 169, def: 708 }, bonusStat: { percentDef: 22.5 } },
    '80a': { stats: { hp: 11235, atk: 178, def: 743 }, bonusStat: { percentDef: 30 } },
    '90': { stats: { hp: 12071, atk: 191, def: 799 }, bonusStat: { percentDef: 30 } },
  },
};
