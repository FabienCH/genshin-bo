import { CharactersRepository } from '../../domain/characters-repository';
import { CharacterBuilder } from '../../domain/models/character-builder';
import { ExistingCharacters, PossibleLevels, Character } from '../../domain/models/character';
import { amber } from './characters-stats/amber';
import { CharacterStats } from './characters-stats/character-stats-type';
import { razor } from './characters-stats/razor';

export class InMemoryCharactersRepository implements CharactersRepository {
  private readonly charactersStats: CharacterStats[];

  constructor() {
    this.charactersStats = [amber, razor];
  }
  getCharacter(name: ExistingCharacters, level: PossibleLevels): Character {
    const characterStats = this.charactersStats.find((tu) => tu.name === name).levels[level];
    return new CharacterBuilder()
      .withName(name)
      .withLevel(level)
      .withStats(characterStats.stats)
      .withBonusStat(characterStats.bonusStat)
      .build();
  }
}
