import { CharactersRepository } from '../domain/characters-repository';
import { Character, ExistingCharacters } from '../domain/models/character';
import { Levels } from '../domain/models/levels';

export class CharactersHandler {
  constructor(private readonly charactersRepository: CharactersRepository) {}

  public getCharactersNames(level: Levels = '1'): ExistingCharacters[] {
    return this.charactersRepository.getAll(level).map((character) => character.name);
  }

  public getCharacter(name: ExistingCharacters, level: Levels, weapon: { name: string; level: Levels }): Character {
    return this.charactersRepository.getCharacter(name, level, weapon);
  }
}
