import { CharacterWithStats } from './character-stats-type';

export const bennett: CharacterWithStats = {
  name: 'bennett',
  weaponType: 'sword',
  levels: {
    '1': { stats: { hp: 1039, atk: 16, def: 65 } },
    '20': { stats: { hp: 2670, atk: 41, def: 166 } },
    '20a': { stats: { hp: 3447, atk: 53, def: 214 } },
    '40': { stats: { hp: 5163, atk: 80, def: 321 } },
    '40a': { stats: { hp: 5715, atk: 88, def: 356 }, bonusStat: { energyRecharge: 6.7 } },
    '50': { stats: { hp: 6573, atk: 101, def: 409 }, bonusStat: { energyRecharge: 6.7 } },
    '50a': { stats: { hp: 7309, atk: 113, def: 455 }, bonusStat: { energyRecharge: 13.3 } },
    '60': { stats: { hp: 8168, atk: 126, def: 508 }, bonusStat: { energyRecharge: 13.3 } },
    '60a': { stats: { hp: 8719, atk: 134, def: 542 }, bonusStat: { energyRecharge: 13.3 } },
    '70': { stats: { hp: 9577, atk: 148, def: 596 }, bonusStat: { energyRecharge: 13.3 } },
    '70a': { stats: { hp: 10129, atk: 156, def: 630 }, bonusStat: { energyRecharge: 20 } },
    '80': { stats: { hp: 10987, atk: 169, def: 684 }, bonusStat: { energyRecharge: 20 } },
    '80a': { stats: { hp: 11539, atk: 178, def: 718 }, bonusStat: { energyRecharge: 26.7 } },
    '90': { stats: { hp: 12397, atk: 191, def: 771 }, bonusStat: { energyRecharge: 26.7 } },
  },
};
