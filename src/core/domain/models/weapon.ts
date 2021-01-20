import { PossibleLevels } from './possible-levels';

export type WeaponType = 'bow' | 'catalyst' | 'claymore' | 'polearm' | 'sword';

export type Weapon = {
  name: string;
  type: WeaponType;
  level: PossibleLevels;
  atk: number;
  bonusStat: { [bonusStat: string]: number };
};
