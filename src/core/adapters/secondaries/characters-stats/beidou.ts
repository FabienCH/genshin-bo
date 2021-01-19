import { CharacterStats } from './character-stats-type';

export const beidou: CharacterStats = {
  name: 'beidou',
  levels: {
    '1': { stats: { hp: 1094, atk: 19, def: 54 } },
    '20': { stats: { hp: 2811, atk: 48, def: 140 } },
    '20a': { stats: { hp: 3628, atk: 63, def: 180 } },
    '40': { stats: { hp: 5435, atk: 94, def: 270 } },
    '40a': { stats: { hp: 6015, atk: 104, def: 299 }, bonusStat: { electroDmg: 6 } },
    '50': { stats: { hp: 6919, atk: 119, def: 344 }, bonusStat: { electroDmg: 6 } },
    '50a': { stats: { hp: 7694, atk: 133, def: 382 }, bonusStat: { electroDmg: 12 } },
    '60': { stats: { hp: 8597, atk: 148, def: 427 }, bonusStat: { electroDmg: 12 } },
    '60a': { stats: { hp: 9178, atk: 158, def: 456 }, bonusStat: { electroDmg: 12 } },
    '70': { stats: { hp: 10081, atk: 174, def: 501 }, bonusStat: { electroDmg: 12 } },
    '70a': { stats: { hp: 10662, atk: 184, def: 530 }, bonusStat: { electroDmg: 18 } },
    '80': { stats: { hp: 11565, atk: 200, def: 575 }, bonusStat: { electroDmg: 18 } },
    '80a': { stats: { hp: 12146, atk: 210, def: 603 }, bonusStat: { electroDmg: 24 } },
    '90': { stats: { hp: 13050, atk: 225, def: 648 }, bonusStat: { electroDmg: 24 } },
  },
};
