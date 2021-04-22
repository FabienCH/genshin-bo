import { WeaponStats } from '../adapters/secondaries/weapons-stats/weapon-stats-type';
import { Levels } from './models/levels';
import { Weapon } from './models/weapon';

export interface WeaponsRepository {
  getAll(level: Levels): Weapon[];
  getWeapon(name: string, level: Levels): Weapon;
  getWeaponWithStats(name: string): WeaponStats;
}
