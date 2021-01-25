import { WeaponStats } from '../weapon-stats-type';
export const halberd: WeaponStats = {
  name: 'halberd',
  type: 'polearm',
  levels: {
    '1': { atk: 40, bonusStat: { percentAtk: 5.1 } },
    '20': { atk: 102, bonusStat: { percentAtk: 9 } },
    '20a': { atk: 121, bonusStat: { percentAtk: 9 } },
    '40': { atk: 187, bonusStat: { percentAtk: 13.1 } },
    '40a': { atk: 207, bonusStat: { percentAtk: 13.1 } },
    '50': { atk: 239, bonusStat: { percentAtk: 15.2 } },
    '50a': { atk: 259, bonusStat: { percentAtk: 15.2 } },
    '60': { atk: 292, bonusStat: { percentAtk: 17.3 } },
    '60a': { atk: 311, bonusStat: { percentAtk: 17.3 } },
    '70': { atk: 344, bonusStat: { percentAtk: 19.3 } },
    '70a': { atk: 363, bonusStat: { percentAtk: 19.3 } },
    '80': { atk: 396, bonusStat: { percentAtk: 20.1 } },
    '80a': { atk: 415, bonusStat: { percentAtk: 20.1 } },
    '90': { atk: 448, bonusStat: { percentAtk: 22.1 } },
  },
};
