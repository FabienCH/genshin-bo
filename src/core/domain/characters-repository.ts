import { Character, ExistingCharacters, PossibleLevels } from './models/character';

export interface CharactersRepository {
  getCharacter(name: ExistingCharacters, level: PossibleLevels): Character;
}
