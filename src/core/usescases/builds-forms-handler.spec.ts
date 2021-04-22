import { InMemoryWeaponsRepository } from '../adapters/secondaries/in-memory-weapons-repository';
import { Levels } from '../domain/models/levels';
import { BuildsFormsHandler } from './builds-forms-handler';

describe('Builds Forms Handler', () => {
  let buildsFormsHandler: BuildsFormsHandler;

  beforeEach(() => {
    buildsFormsHandler = new BuildsFormsHandler(new InMemoryWeaponsRepository());
  });

  describe('it should return the list of levels for a weapon', () => {
    const levels: Levels[] = ['1', '20', '20a', '40', '40a', '50', '50a', '60', '60a', '70', '70a', '80', '80a', '90'];

    it('with no missing data', () => {
      const levelsOptions = buildsFormsHandler.getWeaponLevelsOptions('favoniusWarbow');

      levels.forEach((level, i) => {
        expect(levelsOptions[i]).toEqual({ value: level });
      });
    });

    it('with missing base atk', () => {
      const levelsOptions = buildsFormsHandler.getWeaponLevelsOptions('swordofDescension');
      const levelsWithMissingAtk = ['40a', '50a', '60', '60a', '70a', '80a'];

      levels.forEach((level, i) => {
        const disableMessage = levelsWithMissingAtk.find((levelWithMissingAtk) => levelWithMissingAtk === level)
          ? 'missing base atk'
          : undefined;

        expect(levelsOptions[i]).toEqual({ value: level, disableMessage });
      });
    });

    it('with missing bonus stat', () => {
      const levelsOptions = buildsFormsHandler.getWeaponLevelsOptions('quartz');
      const levelsWithMissingBonusStat = ['20', '20a', '40', '40a', '50', '50a', '60', '60a', '70', '70a', '80', '80a', '90'];

      levels.forEach((level, i) => {
        const disableMessage = levelsWithMissingBonusStat.find((levelWithMissingBonusStat) => levelWithMissingBonusStat === level)
          ? 'missing bonus stat'
          : undefined;

        expect(levelsOptions[i]).toEqual({ value: level, disableMessage });
      });
    });
  });
});
