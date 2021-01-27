import { WeaponType } from '../../../domain/models/weapon';
import { PossibleLevels } from '../../../domain/models/possible-levels';

export interface WeaponStats {
  name: string;
  type: WeaponType;
  levels: {
    [key in PossibleLevels]: { atk: number; bonusStat: { [bonusStat: string]: number } };
  };
}
