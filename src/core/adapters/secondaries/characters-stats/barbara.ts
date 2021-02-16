import { CharacterWithStats } from './character-stats-type';

export const barbara: CharacterWithStats = {
  name: 'barbara',
  levels: {
    '1': { stats: { hp: 821, atk: 13, def: 56 } },
    '20': { stats: { hp: 2108, atk: 34, def: 144 } },
    '20a': { stats: { hp: 2721, atk: 44, def: 186 } },
    '40': { stats: { hp: 4076, atk: 66, def: 279 } },
    '40a': { stats: { hp: 4512, atk: 73, def: 308 }, bonusStat: { percentHp: 6 } },
    '50': { stats: { hp: 5189, atk: 84, def: 355 }, bonusStat: { percentHp: 6 } },
    '50a': { stats: { hp: 5770, atk: 94, def: 394 }, bonusStat: { percentHp: 12 } },
    '60': { stats: { hp: 6448, atk: 105, def: 441 }, bonusStat: { percentHp: 12 } },
    '60a': { stats: { hp: 6884, atk: 112, def: 470 }, bonusStat: { percentHp: 12 } },
    '70': { stats: { hp: 7561, atk: 123, def: 517 }, bonusStat: { percentHp: 12 } },
    '70a': { stats: { hp: 7996, atk: 130, def: 546 }, bonusStat: { percentHp: 18 } },
    '80': { stats: { hp: 8674, atk: 141, def: 593 }, bonusStat: { percentHp: 18 } },
    '80a': { stats: { hp: 9110, atk: 148, def: 623 }, bonusStat: { percentHp: 24 } },
    '90': { stats: { hp: 9787, atk: 159, def: 669 }, bonusStat: { percentHp: 24 } },
  },
};
