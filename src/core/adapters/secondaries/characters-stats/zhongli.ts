import { CharacterWithStats } from './character-stats-type';

export const zhongli: CharacterWithStats = {
  name: 'zhongli',
  levels: {
    '1': { stats: { hp: 1144, atk: 20, def: 57 } },
    '20': { stats: { hp: 2967, atk: 51, def: 149 } },
    '20a': { stats: { hp: 3948, atk: 67, def: 198 } },
    '40': { stats: { hp: 5908, atk: 101, def: 297 } },
    '40a': { stats: { hp: 6605, atk: 113, def: 332 }, bonusStat: { geoDmg: 7.2 } },
    '50': { stats: { hp: 7599, atk: 130, def: 382 }, bonusStat: { geoDmg: 7.2 } },
    '50a': { stats: { hp: 8528, atk: 146, def: 428 }, bonusStat: { geoDmg: 14.4 } },
    '60': { stats: { hp: 9533, atk: 163, def: 479 }, bonusStat: { geoDmg: 14.4 } },
    '60a': { stats: { hp: 10230, atk: 175, def: 514 }, bonusStat: { geoDmg: 14.4 } },
    '70': { stats: { hp: 11243, atk: 192, def: 564 }, bonusStat: { geoDmg: 14.4 } },
    '70a': { stats: { hp: 11940, atk: 204, def: 599 }, bonusStat: { geoDmg: 21.6 } },
    '80': { stats: { hp: 12965, atk: 222, def: 651 }, bonusStat: { geoDmg: 21.6 } },
    '80a': { stats: { hp: 13662, atk: 233, def: 686 }, bonusStat: { geoDmg: 28.8 } },
    '90': { stats: { hp: 14695, atk: 251, def: 738 }, bonusStat: { geoDmg: 28.8 } },
  },
};
