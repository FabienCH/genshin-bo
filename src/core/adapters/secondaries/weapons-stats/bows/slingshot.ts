import { WeaponStats } from '../weapon-stats-type';
export const slingshot: WeaponStats = {
  name: 'slingshot',
  type: 'bow',
  levels: {
    '1': { atk: 38, bonusStat: { critRate: 6.8 } },
    '20': { atk: 86, bonusStat: { critRate: 12 } },
    '20a': { atk: 105, bonusStat: { critRate: 12 } },
    '40': { atk: 151, bonusStat: { critRate: 17.5 } },
    '40a': { atk: 171, bonusStat: { critRate: 17.5 } },
    '50': { atk: 193, bonusStat: { critRate: 20.3 } },
    '50a': { atk: 212, bonusStat: { critRate: 20.3 } },
    '60': { atk: 234, bonusStat: { critRate: 23 } },
    '60a': { atk: 253, bonusStat: { critRate: 23 } },
    '70': { atk: 274, bonusStat: { critRate: 25.7 } },
    '70a': { atk: 294, bonusStat: { critRate: 25.7 } },
    '80': { atk: 314, bonusStat: { critRate: 28.5 } },
    '80a': { atk: 334, bonusStat: { critRate: 28.5 } },
    '90': { atk: 354, bonusStat: { critRate: 31.2 } },
  },
};
