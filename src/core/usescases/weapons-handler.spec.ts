import { InMemoryWeaponsRepository } from '../adapters/secondaries/in-memory-weapons-repository';
import { allBows } from '../adapters/secondaries/weapons-stats/bows';
import { allCatalysts } from '../adapters/secondaries/weapons-stats/catalysts';
import { allClaymores } from '../adapters/secondaries/weapons-stats/claymores';
import { allPolearms } from '../adapters/secondaries/weapons-stats/polearms';
import { allSwords } from '../adapters/secondaries/weapons-stats/swords';
import { WeaponStats } from '../adapters/secondaries/weapons-stats/weapon-stats-type';

import { WeaponsHandler } from './weapons-handler';

describe('getWeaponsNames', () => {
  let weaponsHandler: WeaponsHandler;

  beforeEach(() => {
    weaponsHandler = new WeaponsHandler(new InMemoryWeaponsRepository());
  });

  describe('getWeaponsNames', () => {
    it('should give list of all bows names alphabetically sorted', () => {
      const expectedWeaponsNames = weaponsHandler.getWeaponsNamesByTypes('bow');

      expect(allBows.length).toEqual(expectedWeaponsNames.length);
      allBows.sort(sortWeapons).forEach((bowWithStats, index) => {
        expect(bowWithStats.name).toEqual(expectedWeaponsNames[index]);
      });
    });

    it('should give list of all catalysts names alphabetically sorted', () => {
      const expectedWeaponsNames = weaponsHandler.getWeaponsNamesByTypes('catalyst');

      expect(allCatalysts.length).toEqual(expectedWeaponsNames.length);
      allCatalysts.sort(sortWeapons).forEach((catalystWithStats, index) => {
        expect(catalystWithStats.name).toEqual(expectedWeaponsNames[index]);
      });
    });

    it('should give list of all claymores names alphabetically sorted', () => {
      const expectedWeaponsNames = weaponsHandler.getWeaponsNamesByTypes('claymore');

      expect(allClaymores.length).toEqual(expectedWeaponsNames.length);
      allClaymores.sort(sortWeapons).forEach((claymoreWithStats, index) => {
        expect(claymoreWithStats.name).toEqual(expectedWeaponsNames[index]);
      });
    });

    it('should give list of all polearms names alphabetically sorted', () => {
      const expectedWeaponsNames = weaponsHandler.getWeaponsNamesByTypes('polearm');

      expect(allPolearms.length).toEqual(expectedWeaponsNames.length);
      allPolearms.sort(sortWeapons).forEach((polearmWithStats, index) => {
        expect(polearmWithStats.name).toEqual(expectedWeaponsNames[index]);
      });
    });

    it('should give list of all swords names alphabetically sorted', () => {
      const expectedWeaponsNames = weaponsHandler.getWeaponsNamesByTypes('sword');

      expect(allSwords.length).toEqual(expectedWeaponsNames.length);
      allSwords.sort(sortWeapons).forEach((swordWithStats, index) => {
        expect(swordWithStats.name).toEqual(expectedWeaponsNames[index]);
      });
    });
  });

  describe('getWeaponView', () => {
    it('should retrieve a weapon name and level', () => {
      const expectedWeapon = weaponsHandler.getWeaponView('blackcliffLongsword');

      expect(expectedWeapon.name).toEqual('blackcliffLongsword');
      expect(expectedWeapon.level).toEqual('1');
    });

    it('should return an error if the weapon does not exist', () => {
      expect(() => weaponsHandler.getWeaponView('weaponName')).toThrowError('could not find weapon with name weaponName');
    });
  });
});

function sortWeapons(a: WeaponStats, b: WeaponStats): number {
  return a.name > b.name ? 1 : -1;
}
