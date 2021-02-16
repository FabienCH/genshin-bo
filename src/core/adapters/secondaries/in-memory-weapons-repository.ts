import { Weapon } from '../../domain/models/weapon';
import { Levels } from '../../domain/models/levels';
import { WeaponsRepository } from '../../domain/weapons-repository';

import { allBows } from './weapons-stats/bows';
import { allCatalysts } from './weapons-stats/catalysts';
import { allClaymores } from './weapons-stats/claymores';
import { allPolearms } from './weapons-stats/polearms';
import { allSwords } from './weapons-stats/swords';
import { WeaponStats } from './weapons-stats/weapon-stats-type';

export class InMemoryWeaponsRepository implements WeaponsRepository {
  private readonly weaponsStats: WeaponStats[];

  constructor() {
    this.weaponsStats = [...allBows, ...allCatalysts, ...allClaymores, ...allPolearms, ...allSwords];
  }
  getWeapon(name: string, level: Levels): Weapon {
    const weaponStats = this.weaponsStats.find((weapon) => weapon.name === name);
    return { ...weaponStats.levels[level], type: weaponStats.type, name, level };
  }
}
