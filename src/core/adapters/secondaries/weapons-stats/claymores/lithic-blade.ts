import { WeaponStats } from '../weapon-stats-type';
export const lithicBlade: WeaponStats = {
  name: 'lithicBlade',
  type: 'claymore',
  levels: {
    '1': { atk: 41, bonusStat: { critDmg: 16 } },
    '20': { atk: 99, bonusStat: { critDmg: 28.3 } },
    '20a': { atk: 125, bonusStat: { critDmg: 28.3 } },
    '40': { atk: 184, bonusStat: { critDmg: 41.2 } },
    '40a': { atk: 210, bonusStat: { critDmg: 41.2 } },
    '50': { atk: 238, bonusStat: { critDmg: 47.7 } },
    '50a': { atk: 264, bonusStat: { critDmg: 47.7 } },
    '60': { atk: 293, bonusStat: { critDmg: 54.1 } },
    '60a': { atk: 319, bonusStat: { critDmg: 54.1 } },
    '70': { atk: 347, bonusStat: { critDmg: 60.6 } },
    '70a': { atk: 373, bonusStat: { critDmg: 60.6 } },
    '80': { atk: 401, bonusStat: { critDmg: undefined } },
    '80a': { atk: 427, bonusStat: { critDmg: undefined } },
    '90': { atk: 454, bonusStat: { critDmg: undefined } },
  },
};
