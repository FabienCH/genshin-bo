import { Character, ExistingCharacters } from './character';
import { CharacterStatsPerLevel, CharacterStats } from './character-statistics';
import { Levels } from './levels';
import { WeaponType } from './weapon';

export class CharacterBuilder {
  private name!: ExistingCharacters;
  private level: Levels = '1';
  private weaponType!: WeaponType;
  private stats!: CharacterStatsPerLevel;
  private bonusStat?: { [bonusStat: string]: number };

  private readonly commonBaseStats = {
    [CharacterStats.critRate]: 5,
    [CharacterStats.critDmg]: 50,
    [CharacterStats.energyRecharge]: 100,
  };

  withName(value: ExistingCharacters): CharacterBuilder {
    this.name = value;
    return this;
  }

  withLevel(value: Levels): CharacterBuilder {
    this.level = value;
    return this;
  }

  withWeaponType(value: WeaponType): CharacterBuilder {
    this.weaponType = value;
    return this;
  }

  withStats(value: CharacterStatsPerLevel): CharacterBuilder {
    this.stats = value;
    return this;
  }

  withBonusStat(value?: { [bonusStat: string]: number }): CharacterBuilder {
    this.bonusStat = value;
    return this;
  }

  build(): Character {
    return {
      name: this.name,
      level: this.level,
      weaponType: this.weaponType,
      stats: { ...this.commonBaseStats, ...this.stats },
      bonusStat: this.bonusStat,
    };
  }
}
