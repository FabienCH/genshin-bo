import { WeaponType } from '../../../domain/models/weapon';
import { Levels } from '../../../domain/models/levels';

export interface WeaponStats {
  name: string;
  type: WeaponType;
  levels: {
    [key in Levels]: { atk: number; bonusStat?: { [bonusStat: string]: number } };
  };
}
