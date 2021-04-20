import { Character, ExistingCharacters } from './models/character';
import { Levels } from './models/levels';

export interface CharactersRepository {
  getAll(level: Levels): Character[];
  getCharacter(name: ExistingCharacters, level: Levels): Character;
}
