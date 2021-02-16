import { CharacterWithStats } from './character-stats-type';

export const albedo: CharacterWithStats = {
  name: 'albedo',
  levels: {
    '1': { stats: { hp: 1030, atk: 20, def: 68 } },
    '20': { stats: { hp: 2671, atk: 51, def: 177 } },
    '20a': { stats: { hp: 3554, atk: 68, def: 235 } },
    '40': { stats: { hp: 5317, atk: 101, def: 352 } },
    '40a': { stats: { hp: 5944, atk: 113, def: 394 }, bonusStat: { geoDmg: 7.2 } },
    '50': { stats: { hp: 6839, atk: 130, def: 453 }, bonusStat: { geoDmg: 7.2 } },
    '50a': { stats: { hp: 7675, atk: 146, def: 508 }, bonusStat: { geoDmg: 14.4 } },
    '60': { stats: { hp: 8579, atk: 163, def: 568 }, bonusStat: { geoDmg: 14.4 } },
    '60a': { stats: { hp: 9207, atk: 175, def: 610 }, bonusStat: { geoDmg: 14.4 } },
    '70': { stats: { hp: 10119, atk: 192, def: 670 }, bonusStat: { geoDmg: 14.4 } },
    '70a': { stats: { hp: 10746, atk: 204, def: 712 }, bonusStat: { geoDmg: 21.6 } },
    '80': { stats: { hp: 11669, atk: 222, def: 773 }, bonusStat: { geoDmg: 21.6 } },
    '80a': { stats: { hp: 12296, atk: 233, def: 815 }, bonusStat: { geoDmg: 28.8 } },
    '90': { stats: { hp: 13226, atk: 251, def: 876 }, bonusStat: { geoDmg: 28.8 } },
  },
};
