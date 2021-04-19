import { CharacterWithStats } from './character-stats-type';

export const rosaria: CharacterWithStats = {
  name: 'rosaria',
  weaponType: 'polearm',
  levels: {
    '1': { stats: { hp: 1030, atk: 20, def: 60 } },
    '20': { stats: { hp: 2647, atk: 52, def: 153 } },
    '20a': { stats: { hp: 3417, atk: 67, def: 197 } },
    '40': { stats: { hp: 5118, atk: 100, def: 296 } },
    '40a': { stats: { hp: 5665, atk: 111, def: 327 }, bonusStat: { percentAtk: 6 } },
    '50': { stats: { hp: 6516, atk: 127, def: 376 }, bonusStat: { percentAtk: 6 } },
    '50a': { stats: { hp: 7245, atk: 141, def: 418 }, bonusStat: { percentAtk: 12 } },
    '60': { stats: { hp: 8096, atk: 158, def: 468 }, bonusStat: { percentAtk: 12 } },
    '60a': { stats: { hp: 8643, atk: 169, def: 499 }, bonusStat: { percentAtk: 12 } },
    '70': { stats: { hp: 9493, atk: 185, def: 548 }, bonusStat: { percentAtk: 12 } },
    '70a': { stats: { hp: 10040, atk: 196, def: 580 }, bonusStat: { percentAtk: 18 } },
    '80': { stats: { hp: 10891, atk: 213, def: 629 }, bonusStat: { percentAtk: 18 } },
    '80a': { stats: { hp: 11438, atk: 223, def: 661 }, bonusStat: { percentAtk: 24 } },
    '90': { stats: { hp: 12289, atk: 240, def: 710 }, bonusStat: { percentAtk: 24 } },
  },
};
