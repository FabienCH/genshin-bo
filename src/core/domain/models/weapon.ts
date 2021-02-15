import { Levels } from './possible-levels';

export type WeaponType = 'bow' | 'catalyst' | 'claymore' | 'polearm' | 'sword';

export type Weapon = {
  name: string;
  type: WeaponType;
  level: Levels;
  atk: number;
  bonusStat: { [bonusStat: string]: number };
};
