import { PossibleLevels } from './models/possible-levels';
import { Weapon } from './models/weapon';

export interface WeaponsRepository {
  getWeapon(name: string, level: PossibleLevels): Weapon;
}
