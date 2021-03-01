import { InMemoryWeaponsRepository } from '../adapters/secondaries/in-memory-weapons-repository';
import { allBows } from '../adapters/secondaries/weapons-stats/bows';
import { allCatalysts } from '../adapters/secondaries/weapons-stats/catalysts';
import { allClaymores } from '../adapters/secondaries/weapons-stats/claymores';
import { allPolearms } from '../adapters/secondaries/weapons-stats/polearms';
import { allSwords } from '../adapters/secondaries/weapons-stats/swords';
import { WeaponsHandler } from './weapons-handler';

describe('WeaponsHandler.getWeaponsNames', () => {
  let weaponsHandler: WeaponsHandler;
  const allWeaponsWithStats = [...allBows, ...allCatalysts, ...allClaymores, ...allPolearms, ...allSwords];

  beforeEach(() => {
    weaponsHandler = new WeaponsHandler(new InMemoryWeaponsRepository());
  });

  it('should give list of expected weapons names', () => {
    const expectedWeaponsNames = weaponsHandler.getWeaponsNames();

    expect(allWeaponsWithStats.length).toEqual(expectedWeaponsNames.length);
    allWeaponsWithStats.forEach((weaponsWithStats, index) => {
      expect(weaponsWithStats.name).toEqual(expectedWeaponsNames[index]);
    });
  });
});
