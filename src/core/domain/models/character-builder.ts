import { Character, ExistingCharacters } from './character';
import { CharacterStatsPerLevel, CharacterStats } from './character-statistics';
import { Levels } from './possible-levels';
import { Weapon } from './weapon';

export class CharacterBuilder {
  private name: ExistingCharacters;
  private level: Levels = '1';
  private stats: CharacterStatsPerLevel;
  private bonusStat: { [bonusStat: string]: number };
  private weapon: Weapon;

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

  withStats(value: CharacterStatsPerLevel): CharacterBuilder {
    this.stats = value;
    return this;
  }

  withBonusStat(value: { [bonusStat: string]: number }): CharacterBuilder {
    this.bonusStat = value;
    return this;
  }

  withWeapon(value: Weapon): CharacterBuilder {
    this.weapon = value;
    return this;
  }

  build(): Character {
    return {
      name: this.name,
      level: this.level,
      weapon: this.weapon,
      stats: { ...this.commonBaseStats, ...this.stats },
      bonusStat: this.bonusStat,
    };
  }
}
