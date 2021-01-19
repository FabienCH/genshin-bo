import { CharacterStats } from './character-stats-type';

export const venti: CharacterStats = {
  name: 'venti',
  levels: {
    '1': { stats: { hp: 820, atk: 20, def: 52 } },
    '20': { stats: { hp: 2127, atk: 53, def: 135 } },
    '20a': { stats: { hp: 2830, atk: 71, def: 180 } },
    '40': { stats: { hp: 4234, atk: 106, def: 269 } },
    '40a': { stats: { hp: 4734, atk: 118, def: 301 }, bonusStat: { energyRecharge: 8 } },
    '50': { stats: { hp: 5446, atk: 136, def: 346 }, bonusStat: { energyRecharge: 8 } },
    '50a': { stats: { hp: 6112, atk: 153, def: 388 }, bonusStat: { energyRecharge: 16 } },
    '60': { stats: { hp: 6832, atk: 171, def: 434 }, bonusStat: { energyRecharge: 16 } },
    '60a': { stats: { hp: 7331, atk: 183, def: 465 }, bonusStat: { energyRecharge: 16 } },
    '70': { stats: { hp: 8058, atk: 201, def: 512 }, bonusStat: { energyRecharge: 16 } },
    '70a': { stats: { hp: 8557, atk: 214, def: 543 }, bonusStat: { energyRecharge: 24 } },
    '80': { stats: { hp: 9292, atk: 232, def: 590 }, bonusStat: { energyRecharge: 24 } },
    '80a': { stats: { hp: 9790, atk: 245, def: 622 }, bonusStat: { energyRecharge: 32 } },
    '90': { stats: { hp: 10531, atk: 263, def: 669 }, bonusStat: { energyRecharge: 32 } },
  },
};
