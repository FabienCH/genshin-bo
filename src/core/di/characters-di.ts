import { InMemoryCharactersRepository } from '../adapters/secondaries/in-memory-characters-repository';
import { CharactersHandler } from '../usescases/characters-handler';

export const CharactersDI = {
  charactersHandler: new CharactersHandler(new InMemoryCharactersRepository()),
};
