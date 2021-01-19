import { CharacterStats } from './character-stats-type';

export const kaeya: CharacterStats = {
  name: 'kaeya',
  levels: {
    '1': { stats: { hp: 976, atk: 19, def: 66 } },
    '20': { stats: { hp: 2506, atk: 48, def: 171 } },
    '20a': { stats: { hp: 3235, atk: 62, def: 220 } },
    '40': { stats: { hp: 4846, atk: 93, def: 330 } },
    '40a': { stats: { hp: 5364, atk: 103, def: 365 }, bonusStat: { energyRecharge: 6.7 } },
    '50': { stats: { hp: 6170, atk: 118, def: 420 }, bonusStat: { energyRecharge: 6.7 } },
    '50a': { stats: { hp: 6860, atk: 131, def: 467 }, bonusStat: { energyRecharge: 13.3 } },
    '60': { stats: { hp: 7666, atk: 147, def: 522 }, bonusStat: { energyRecharge: 13.3 } },
    '60a': { stats: { hp: 8184, atk: 157, def: 557 }, bonusStat: { energyRecharge: 13.3 } },
    '70': { stats: { hp: 8990, atk: 172, def: 612 }, bonusStat: { energyRecharge: 13.3 } },
    '70a': { stats: { hp: 9508, atk: 182, def: 647 }, bonusStat: { energyRecharge: 20 } },
    '80': { stats: { hp: 10312, atk: 198, def: 702 }, bonusStat: { energyRecharge: 20 } },
    '80a': { stats: { hp: 10830, atk: 208, def: 737 }, bonusStat: { energyRecharge: 26.7 } },
    '90': { stats: { hp: 11636, atk: 223, def: 792 }, bonusStat: { energyRecharge: 26.7 } },
  },
};
