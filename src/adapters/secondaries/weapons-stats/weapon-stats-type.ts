import { WeaponType } from '../../../domain/builds-optimizer/models/weapon';
import { Levels } from '../../../domain/builds-optimizer/models/levels';

export type WeaponLevels = Record<Levels, { atk: number; bonusStat?: { [bonusStat: string]: number } }>;

export interface WeaponStats {
  name: string;
  type: WeaponType;
  levels: WeaponLevels;
}
