import { InMemoryCharactersRepository } from '../adapters/secondaries/builds-optimizer/in-memory-characters-repository';
import { CharactersHandler } from '../usescases/builds-optimizer/characters-handler';

export const CharactersDI = {
  charactersHandler: new CharactersHandler(new InMemoryCharactersRepository()),
};
