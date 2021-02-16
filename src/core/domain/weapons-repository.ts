import { Levels } from './models/levels';
import { Weapon } from './models/weapon';

export interface WeaponsRepository {
  getWeapon(name: string, level: Levels): Weapon;
}
