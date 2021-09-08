import { CharacterWithStats } from './character-stats-type';

export const raidenShogun: CharacterWithStats = {
  name: 'raidenShogun',
  weaponType: 'polearm',
  levels: {
    '1': { stats: { hp: 1005, atk: 26, def: 61 } },
    '20': { stats: { hp: 2606, atk: 68, def: 159 } },
    '20a': { stats: { hp: 3468, atk: 91, def: 212 } },
    '40': { stats: { hp: 5189, atk: 136, def: 317 } },
    '40a': { stats: { hp: 5801, atk: 152, def: 355 }, bonusStat: { energyRecharge: 8 } },
    '50': { stats: { hp: 6675, atk: 175, def: 408 }, bonusStat: { energyRecharge: 8 } },
    '50a': { stats: { hp: 7491, atk: 196, def: 458 }, bonusStat: { energyRecharge: 16 } },
    '60': { stats: { hp: 8373, atk: 219, def: 512 }, bonusStat: { energyRecharge: 16 } },
    '60a': { stats: { hp: 8985, atk: 235, def: 549 }, bonusStat: { energyRecharge: 16 } },
    '70': { stats: { hp: 9875, atk: 258, def: 604 }, bonusStat: { energyRecharge: 16 } },
    '70a': { stats: { hp: 10487, atk: 274, def: 641 }, bonusStat: { energyRecharge: 24 } },
    '80': { stats: { hp: 11388, atk: 298, def: 696 }, bonusStat: { energyRecharge: 24 } },
    '80a': { stats: { hp: 12000, atk: 314, def: 737 }, bonusStat: { energyRecharge: 32 } },
    '90': { stats: { hp: 12907, atk: 337, def: 789 }, bonusStat: { energyRecharge: 32 } },
  },
};
