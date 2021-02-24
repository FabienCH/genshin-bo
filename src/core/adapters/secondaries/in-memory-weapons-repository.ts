import { Weapon } from '../../domain/models/weapon';
import { Levels } from '../../domain/models/levels';
import { WeaponsRepository } from '../../domain/weapons-repository';

import { allBows } from './weapons-stats/bows';
import { allCatalysts } from './weapons-stats/catalysts';
import { allClaymores } from './weapons-stats/claymores';
import { allPolearms } from './weapons-stats/polearms';
import { allSwords } from './weapons-stats/swords';
import { WeaponStats } from './weapons-stats/weapon-stats-type';
import { allBuildStats } from '../../domain/models/character-statistics';

export class InMemoryWeaponsRepository implements WeaponsRepository {
  private readonly weaponsStats: WeaponStats[];
  private readonly defaultWeaponStats = { atk: 0, bonusStat: { [allBuildStats.atk]: 0 } };

  constructor() {
    this.weaponsStats = [...allBows, ...allCatalysts, ...allClaymores, ...allPolearms, ...allSwords];
  }

  public getAll(level: Levels): Weapon[] {
    return this.weaponsStats.map((weaponsStat) => ({
      ...weaponsStat.levels[level],
      type: weaponsStat.type,
      name: weaponsStat.name,
      level,
    }));
  }

  public getWeapon(name: string, level: Levels): Weapon {
    const weaponStats = this.weaponsStats.find((weapon) => weapon.name === name);
    const weapon = weaponStats ? weaponStats.levels[level] : this.defaultWeaponStats;

    return { ...weapon, type: weaponStats ? weaponStats.type : 'bow', name, level };
  }
}
