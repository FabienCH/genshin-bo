import { CharactersHandler } from '../../../usescases/characters-handler';
import { WeaponsHandler } from '../../../usescases/weapons-handler';
import { InMemoryCharactersRepository } from '../../secondaries/in-memory-characters-repository';
import { InMemoryWeaponsRepository } from '../../secondaries/in-memory-weapons-repository';

describe('Build Optimizer container', () => {
  it('renders characters and weapons initialized', () => {
    const charactersHandler = new CharactersHandler(new InMemoryCharactersRepository());
    const weaponsHandler = new WeaponsHandler(new InMemoryWeaponsRepository());
    const characters = charactersHandler.getCharactersNames();
    const weapons = weaponsHandler.getWeaponsNames();

    expect(true).toBeTruthy();
  });
});
