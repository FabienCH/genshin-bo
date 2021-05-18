import { Weapon } from '../../../domain/builds-optimizer/models/weapon';
import { Levels } from '../../../domain/builds-optimizer/models/levels';

import { allBows } from './weapons-stats/bows';
import { allCatalysts } from './weapons-stats/catalysts';
import { allClaymores } from './weapons-stats/claymores';
import { allPolearms } from './weapons-stats/polearms';
import { allSwords } from './weapons-stats/swords';
import { WeaponStats } from './weapons-stats/weapon-stats-type';
import { WeaponsRepository } from '../../../domain/builds-optimizer/weapons-repository';

export class InMemoryWeaponsRepository implements WeaponsRepository {
  private readonly weaponsStats: WeaponStats[];

  constructor() {
    this.weaponsStats = [...allBows, ...allCatalysts, ...allClaymores, ...allPolearms, ...allSwords];
  }

  public getAll(level: Levels): Weapon[] {
    return this.weaponsStats.map((weaponsStats) => this.getWeapon(weaponsStats.name, level));
  }

  public getWeapon(name: string, level: Levels): Weapon {
    const weaponStats = this.getWeaponWithStats(name);
    const weaponStat = weaponStats.levels[level];
    if (!weaponStat.bonusStat) {
      throw new Error(`missing data: weapon does not have bonus stat for level ${level}`);
    }
    return { atk: weaponStat.atk, bonusStat: weaponStat.bonusStat, type: weaponStats.type, name, level };
  }

  public getWeaponWithStats(name: string): WeaponStats {
    const weaponStats = this.weaponsStats.find((weapon) => weapon.name === name);
    if (!weaponStats) {
      throw new Error(`could not find weapon with name ${name}`);
    }

    return weaponStats;
  }
}
