import { Weapon } from '../../domain/models/weapon';
import { PossibleLevels } from '../../domain/models/possible-levels';
import { WeaponsRepository } from '../../domain/weapons-repository';

import { prototypeArchaic } from './weapons-stats/prototype-archaic';
import { WeaponStats } from './weapons-stats/weapon-stats-type';

export class InMemoryWeaponsRepository implements WeaponsRepository {
  private readonly weaponsStats: WeaponStats[];

  constructor() {
    this.weaponsStats = [prototypeArchaic];
  }
  getWeapon(name: string, level: PossibleLevels): Weapon {
    const weaponStats = this.weaponsStats.find((weapon) => weapon.name === name).levels[level];
    return { ...weaponStats, name, level };
  }
}
