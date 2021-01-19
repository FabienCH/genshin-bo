import { CharacterStats } from './character-stats-type';

export const amber: CharacterStats = {
  name: 'amber',
  levels: {
    '1': { stats: { hp: 793, atk: 19, def: 50 } },
    '20': { stats: { hp: 2038, atk: 48, def: 129 } },
    '20a': { stats: { hp: 2630, atk: 62, def: 167 } },
    '40': { stats: { hp: 3940, atk: 93, def: 250 } },
    '40a': { stats: { hp: 4361, atk: 103, def: 277 }, bonusStat: { percentAtk: 6 } },
    '50': { stats: { hp: 5016, atk: 118, def: 318 }, bonusStat: { percentAtk: 6 } },
    '50a': { stats: { hp: 5578, atk: 131, def: 354 }, bonusStat: { percentAtk: 12 } },
    '60': { stats: { hp: 6233, atk: 147, def: 396 }, bonusStat: { percentAtk: 12 } },
    '60a': { stats: { hp: 6654, atk: 157, def: 422 }, bonusStat: { percentAtk: 12 } },
    '70': { stats: { hp: 7309, atk: 172, def: 464 }, bonusStat: { percentAtk: 12 } },
    '70a': { stats: { hp: 7730, atk: 182, def: 491 }, bonusStat: { percentAtk: 18 } },
    '80': { stats: { hp: 8385, atk: 198, def: 532 }, bonusStat: { percentAtk: 18 } },
    '80a': { stats: { hp: 8806, atk: 208, def: 559 }, bonusStat: { percentAtk: 24 } },
    '90': { stats: { hp: 9461, atk: 223, def: 601 }, bonusStat: { percentAtk: 24 } },
  },
};
