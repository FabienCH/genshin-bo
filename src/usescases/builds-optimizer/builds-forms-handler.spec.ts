import { InMemoryWeaponsRepository } from '../../adapters/secondaries/in-memory-weapons-repository';
import { Levels } from '../../domain/builds-optimizer/models/levels';
import { BuildsFormsHandler, SelectOption } from './builds-forms-handler';

describe('Builds Forms Handler', () => {
  const levels: Levels[] = ['1', '20', '20a', '40', '40a', '50', '50a', '60', '60a', '70', '70a', '80', '80a', '90'];

  let buildsFormsHandler: BuildsFormsHandler;

  beforeEach(() => {
    buildsFormsHandler = new BuildsFormsHandler(new InMemoryWeaponsRepository());
  });

  describe('getWeaponLevelsOptions should return the list of levels for a weapon', () => {
    it('with no missing data', () => {
      const levelsOptions = buildsFormsHandler.getWeaponLevelsOptions('favoniusWarbow');

      levels.forEach((level, i) => {
        expect(levelsOptions[i]).toEqual({ value: level });
      });
    });

    it('with missing base atk', () => {
      const levelsOptions = buildsFormsHandler.getWeaponLevelsOptions('swordofDescension');
      const levelsWithMissingAtk = ['40a', '50a', '60', '60a', '70a', '80a'];

      assertOptionsHasExpectedErrorMessage(levelsWithMissingAtk, levelsOptions, 'missing base atk');
    });

    it('with missing bonus stat', () => {
      const levelsOptions = buildsFormsHandler.getWeaponLevelsOptions('quartz');
      const levelsWithMissingBonusStat = ['20', '20a', '40', '40a', '50', '50a', '60', '60a', '70', '70a', '80', '80a', '90'];

      assertOptionsHasExpectedErrorMessage(levelsWithMissingBonusStat, levelsOptions, 'missing bonus stat');
    });
  });

  function assertOptionsHasExpectedErrorMessage(levelsWithMissingStat: string[], levelsOptions: SelectOption[], errorMessage: string) {
    levels.forEach((level, i) => {
      const disableMessage = levelsWithMissingStat.find((levelWithMissingStat) => levelWithMissingStat === level)
        ? errorMessage
        : undefined;

      expect(levelsOptions[i]).toEqual({ value: level, disableMessage });
    });
  }
});
