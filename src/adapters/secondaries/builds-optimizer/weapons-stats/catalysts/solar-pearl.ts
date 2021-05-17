import { WeaponStats } from '../weapon-stats-type';
export const solarPearl: WeaponStats = {
  name: 'solarPearl',
  type: 'catalyst',
  levels: {
    '1': { atk: 42, bonusStat: { critRate: 6 } },
    '20': { atk: 109, bonusStat: { critRate: 10.6 } },
    '20a': { atk: 135, bonusStat: { critRate: 10.6 } },
    '40': { atk: 205, bonusStat: { critRate: 15.5 } },
    '40a': { atk: 231, bonusStat: { critRate: 15.5 } },
    '50': { atk: 266, bonusStat: { critRate: 17.9 } },
    '50a': { atk: 292, bonusStat: { critRate: 17.9 } },
    '60': { atk: 327, bonusStat: { critRate: 20.3 } },
    '60a': { atk: 353, bonusStat: { critRate: 20.3 } },
    '70': { atk: 388, bonusStat: { critRate: 22.7 } },
    '70a': { atk: 414, bonusStat: { critRate: 22.7 } },
    '80': { atk: 449, bonusStat: { critRate: 25.1 } },
    '80a': { atk: 475, bonusStat: { critRate: 25.1 } },
    '90': { atk: 510, bonusStat: { critRate: 27.6 } },
  },
};
