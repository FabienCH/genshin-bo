import { WeaponStats } from '../weapon-stats-type';
export const theAlleyFlash: WeaponStats = {
  name: 'theAlleyFlash',
  type: 'sword',
  levels: {
    '1': { atk: 44, bonusStat: { critRate: 4 } },
    '20': { atk: 119, bonusStat: { critRate: 7.1 } },
    '20a': { atk: 144, bonusStat: { critRate: 7.1 } },
    '40': { atk: 226, bonusStat: { critRate: 10.3 } },
    '40a': { atk: 252, bonusStat: { critRate: 10.3 } },
    '50': { atk: 293, bonusStat: { critRate: 11.9 } },
    '50a': { atk: 319, bonusStat: { critRate: 11.9 } },
    '60': { atk: 361, bonusStat: { critRate: 13.6 } },
    '60a': { atk: 387, bonusStat: { critRate: 13.6 } },
    '70': { atk: 429, bonusStat: { critRate: 15.2 } },
    '70a': { atk: 455, bonusStat: { critRate: 15.2 } },
    '80': { atk: 497, bonusStat: { critRate: 16.8 } },
    '80a': { atk: 523, bonusStat: { critRate: 16.8 } },
    '90': { atk: 565, bonusStat: { critRate: undefined } },
  },
};
