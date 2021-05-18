import { CharactersRepository } from '../../domain/builds-optimizer/characters-repository';
import { ExistingCharacters, CharacterView, Character } from '../../domain/builds-optimizer/models/character';
import { Levels } from '../../domain/builds-optimizer/models/levels';

export class CharactersHandler {
  constructor(private readonly charactersRepository: CharactersRepository) {}

  public getCharactersNames(level: Levels = '1'): ExistingCharacters[] {
    return this.charactersRepository.getAll(level).map((character) => character.name);
  }

  public getCharacterView(name: ExistingCharacters, level: Levels = '1'): CharacterView {
    const character = this.charactersRepository.getCharacter(name, level);
    return { name: character.name, weaponType: character.weaponType, level };
  }

  public getCharacter(name: ExistingCharacters, level: Levels): Character {
    return this.charactersRepository.getCharacter(name, level);
  }
}
