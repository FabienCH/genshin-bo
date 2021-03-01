import { Levels } from '../domain/models/levels';
import { WeaponsRepository } from '../domain/weapons-repository';

export class WeaponsHandler {
  constructor(private readonly weaponsRepository: WeaponsRepository) {}

  public getWeaponsNames(level: Levels = '1'): string[] {
    return this.weaponsRepository.getAll(level).map((weapon) => weapon.name);
  }
}
