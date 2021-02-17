import { CharacterWithStats } from './character-stats-type';

export const chongyun: CharacterWithStats = {
  name: 'chongyun',
  levels: {
    '1': { stats: { hp: 1003, atk: 19, def: 54 } },
    '20': { stats: { hp: 2366, atk: 48, def: 140 } },
    '20a': { stats: { hp: 3054, atk: 62, def: 180 } },
    '40': { stats: { hp: 4574, atk: 93, def: 270 } },
    '40a': { stats: { hp: 5063, atk: 103, def: 299 }, bonusStat: { percentAtk: 6 } },
    '50': { stats: { hp: 5824, atk: 118, def: 344 }, bonusStat: { percentAtk: 6 } },
    '50a': { stats: { hp: 6475, atk: 131, def: 382 }, bonusStat: { percentAtk: 12 } },
    '60': { stats: { hp: 7236, atk: 147, def: 427 }, bonusStat: { percentAtk: 12 } },
    '60a': { stats: { hp: 7725, atk: 157, def: 456 }, bonusStat: { percentAtk: 12 } },
    '70': { stats: { hp: 8485, atk: 172, def: 501 }, bonusStat: { percentAtk: 12 } },
    '70a': { stats: { hp: 8974, atk: 182, def: 530 }, bonusStat: { percentAtk: 18 } },
    '80': { stats: { hp: 9734, atk: 198, def: 575 }, bonusStat: { percentAtk: 18 } },
    '80a': { stats: { hp: 10223, atk: 208, def: 603 }, bonusStat: { percentAtk: 24 } },
    '90': { stats: { hp: 10984, atk: 223, def: 648 }, bonusStat: { percentAtk: 24 } },
  },
};
