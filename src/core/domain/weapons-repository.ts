import { Levels } from './models/levels';
import { Weapon } from './models/weapon';

export interface WeaponsRepository {
  getAll(level: Levels): Weapon[];
  getWeapon(name: string, level: Levels): Weapon;
}
