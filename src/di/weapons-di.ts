import { InMemoryWeaponsRepository } from '../adapters/secondaries/in-memory-weapons-repository';
import { WeaponsHandler } from '../usescases/weapons-handler';

export const WeaponsDI = {
  weaponsHandler: new WeaponsHandler(new InMemoryWeaponsRepository()),
};
