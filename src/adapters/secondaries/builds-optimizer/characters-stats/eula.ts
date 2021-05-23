import { CharacterWithStats } from './character-stats-type';

export const eula: CharacterWithStats = {
  name: 'eula',
  weaponType: 'claymore',
  levels: {
    '1': { stats: { hp: 1030, atk: 27, def: 58 } },
    '20': { stats: { hp: 2671, atk: 69, def: 152 } },
    '20a': { stats: { hp: 3554, atk: 92, def: 202 } },
    '40': { stats: { hp: 5317, atk: 138, def: 302 } },
    '40a': { stats: { hp: 5944, atk: 154, def: 337 }, bonusStat: { critDmg: 9.6 } },
    '50': { stats: { hp: 6839, atk: 177, def: 388 }, bonusStat: { critDmg: 9.6 } },
    '50a': { stats: { hp: 7675, atk: 199, def: 436 }, bonusStat: { critDmg: 19.2 } },
    '60': { stats: { hp: 8579, atk: 222, def: 487 }, bonusStat: { critDmg: 19.2 } },
    '60a': { stats: { hp: 9207, atk: 238, def: 523 }, bonusStat: { critDmg: 19.2 } },
    '70': { stats: { hp: 10119, atk: 262, def: 574 }, bonusStat: { critDmg: 19.2 } },
    '70a': { stats: { hp: 10746, atk: 278, def: 610 }, bonusStat: { critDmg: 28.8 } },
    '80': { stats: { hp: 11669, atk: 302, def: 662 }, bonusStat: { critDmg: 28.8 } },
    '80a': { stats: { hp: 12296, atk: 318, def: 698 }, bonusStat: { critDmg: 38.4 } },
    '90': { stats: { hp: 13226, atk: 342, def: 751 }, bonusStat: { critDmg: 38.4 } },
  },
};
