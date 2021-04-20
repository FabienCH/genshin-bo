import { Levels } from '../domain/models/levels';
import { WeaponType } from '../domain/models/weapon';
import { WeaponsRepository } from '../domain/weapons-repository';

export class WeaponsHandler {
  constructor(private readonly weaponsRepository: WeaponsRepository) {}

  public getWeaponsNamesByTypes(type: WeaponType, level: Levels = '1'): string[] {
    return this.weaponsRepository
      .getAll(level)
      .filter((weapon) => weapon.type === type)
      .map((weapon) => weapon.name);
  }
}
