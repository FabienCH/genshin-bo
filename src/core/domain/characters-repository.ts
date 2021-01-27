import { Character, ExistingCharacters } from './models/character';
import { PossibleLevels } from './models/possible-levels';

export interface CharactersRepository {
  getCharacter(name: ExistingCharacters, level: PossibleLevels, weapon: { name: string; level: PossibleLevels }): Character;
}
