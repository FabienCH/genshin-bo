import { CharacterStats } from './character-stats-type';

export const razor: CharacterStats = {
  name: 'razor',
  levels: {
    ['1']: { stats: { hp: 1003, atk: 20, def: 63 } },
    ['20']: { stats: { hp: 2577, atk: 50, def: 162 } },
    ['20a']: { stats: { hp: 3326, atk: 65, def: 209 } },
    ['40']: { stats: { hp: 4982, atk: 97, def: 313 } },
    ['40a']: { stats: { hp: 5514, atk: 108, def: 346 }, bonusStat: { physicalDmg: 7.5 } },
    ['50']: { stats: { hp: 6343, atk: 124, def: 398 }, bonusStat: { physicalDmg: 7.5 } },
    ['50a']: { stats: { hp: 7052, atk: 138, def: 443 }, bonusStat: { physicalDmg: 15 } },
    ['60']: { stats: { hp: 7881, atk: 154, def: 495 }, bonusStat: { physicalDmg: 15 } },
    ['60a']: { stats: { hp: 8413, atk: 164, def: 528 }, bonusStat: { physicalDmg: 15 } },
    ['70']: { stats: { hp: 9241, atk: 180, def: 580 }, bonusStat: { physicalDmg: 15 } },
    ['70a']: { stats: { hp: 9773, atk: 191, def: 613 }, bonusStat: { physicalDmg: 22.5 } },
    ['80']: { stats: { hp: 10602, atk: 207, def: 665 }, bonusStat: { physicalDmg: 22.5 } },
    ['80a']: { stats: { hp: 11134, atk: 217, def: 699 }, bonusStat: { physicalDmg: 30 } },
    ['90']: { stats: { hp: 11962, atk: 234, def: 751 }, bonusStat: { physicalDmg: 30 } },
  },
};
