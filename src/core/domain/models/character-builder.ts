import { Character, ExistingCharacters } from './character';
import { CharacterStatsPerLevel, PossibleCharacterStats } from './character-statistics';
import { PossibleLevels } from './possible-levels';

export class CharacterBuilder {
  private name: ExistingCharacters;
  private level: PossibleLevels = '1';
  private stats: CharacterStatsPerLevel;
  private bonusStat: { [bonusStat: string]: number };

  private readonly commonBaseStats = {
    [PossibleCharacterStats.critRate]: 5,
    [PossibleCharacterStats.critDmg]: 50,
    [PossibleCharacterStats.energyRecharge]: 100,
  };

  withName(value: ExistingCharacters): CharacterBuilder {
    this.name = value;
    return this;
  }

  withLevel(value: PossibleLevels): CharacterBuilder {
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

  build(): Character {
    return {
      name: this.name,
      level: this.level,
      stats: { ...this.commonBaseStats, ...this.stats },
      bonusStat: this.bonusStat,
    };
  }
}
