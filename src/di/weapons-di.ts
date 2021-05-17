import { InMemoryWeaponsRepository } from '../adapters/secondaries/in-memory-weapons-repository';
import { WeaponsHandler } from '../usescases/builds-optimizer/weapons-handler';

export const WeaponsDI = {
  weaponsHandler: new WeaponsHandler(new InMemoryWeaponsRepository()),
};
