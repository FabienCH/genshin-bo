import { Character, ExistingCharacters } from './models/character';
import { Levels } from './models/possible-levels';

export interface CharactersRepository {
  getCharacter(name: ExistingCharacters, level: Levels, weapon: { name: string; level: Levels }): Character;
}
