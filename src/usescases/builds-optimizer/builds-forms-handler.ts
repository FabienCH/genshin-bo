import { WeaponLevels } from '../../adapters/secondaries/builds-optimizer/weapons-stats/weapon-stats-type';
import { Levels } from '../../domain/builds-optimizer/models/levels';
import { WeaponsRepository } from '../../domain/builds-optimizer/weapons-repository';

export interface SelectOption {
  value: string | number;
  disableMessage?: string;
}

export class BuildsFormsHandler {
  constructor(private readonly weaponsRepository: WeaponsRepository) {}

  public getWeaponLevelsOptions(weaponName: string): SelectOption[] {
    const weapon = this.weaponsRepository.getWeaponWithStats(weaponName);
    const sortedLevels = this.getSortedLevels(weapon.levels);

    return sortedLevels.map((level) => ({ value: level, disableMessage: this.getDisableMessage(weapon.levels[level]) }));
  }

  private getSortedLevels(levels: WeaponLevels): Levels[] {
    return Object.keys(levels).sort((a: string, b: string) => this.parseLevelHasNumber(a) - this.parseLevelHasNumber(b)) as Levels[];
  }

  private getDisableMessage(levelStats: { atk: number; bonusStat?: { [bonusStat: string]: number } }) {
    if (!levelStats.atk) {
      return 'missing base atk';
    }
    if (!levelStats.bonusStat) {
      return 'missing bonus stat';
    }
  }

  private parseLevelHasNumber(level: string) {
    return parseInt(level.replace(/0a/g, '1'));
  }
}
