import { WeaponStats } from '../weapon-stats-type';
export const deathmatch: WeaponStats = {
  name: 'deathmatch',
  type: 'polearm',
  levels: {
    '1': { atk: 41, bonusStat: { critRate: 8 } },
    '20': { atk: 99, bonusStat: { critRate: 14.1 } },
    '20a': { atk: 125, bonusStat: { critRate: 14.1 } },
    '40': { atk: 184, bonusStat: { critRate: 20.6 } },
    '40a': { atk: 210, bonusStat: { critRate: 20.6 } },
    '50': { atk: 238, bonusStat: { critRate: 23.8 } },
    '50a': { atk: 264, bonusStat: { critRate: 23.8 } },
    '60': { atk: 293, bonusStat: { critRate: 27.1 } },
    '60a': { atk: 319, bonusStat: { critRate: 27.1 } },
    '70': { atk: 347, bonusStat: { critRate: 30.3 } },
    '70a': { atk: 373, bonusStat: { critRate: 30.3 } },
    '80': { atk: 401, bonusStat: { critRate: 33.5 } },
    '80a': { atk: 427, bonusStat: { critRate: 33.5 } },
    '90': { atk: 454, bonusStat: { critRate: 36.8 } },
  },
};
