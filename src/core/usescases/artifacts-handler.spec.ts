import { defaultBuildArtifactsData } from '../../test/artifacts-data-mock';
import { defaultArtifactsViews } from '../../test/artifacts-views-mock';
import { InMemoryArtifactsRepository } from '../adapters/secondaries/in-memory-artifacts-repository';
import { CircletArtifact } from '../domain/entities/circlet-artifact';
import { FlowerArtifact } from '../domain/entities/flower-artifact';
import { GobletArtifact } from '../domain/entities/goblet-artifact';
import { PlumeArtifact } from '../domain/entities/plume-artifact';
import { SandsArtifact } from '../domain/entities/sands-artifact';
import { CircletMainStatType } from '../domain/models/circlet-artifact-data';
import { GobletMainStatType } from '../domain/models/goblet-artifact-data';
import { MainStats, MainStatTypes } from '../domain/models/main-statistics';
import { SandsMainStatType } from '../domain/models/sands-artifact-data';
import { SetNames } from '../domain/models/sets-with-effects';
import { SubStats } from '../domain/models/sub-statistics';
import { ArtifactsHandler } from './artifacts-handler';

fdescribe('ArtifactsHandler.addArtifact', () => {
  let artifactsHandler: ArtifactsHandler;

  beforeEach(() => {
    artifactsHandler = new ArtifactsHandler(new InMemoryArtifactsRepository());
  });

  describe('Retrieving all artifacts', () => {
    it('should give an empty list if there is no artifacts', () => {
      const emptyArtifactsData = {
        flowers: [],
        plumes: [],
        sands: [],
        goblets: [],
        circlets: [],
      };
      const emptyArtifactsHandler = new ArtifactsHandler(new InMemoryArtifactsRepository(emptyArtifactsData));
      const expectedArtifacts = emptyArtifactsHandler.getAll();
      expect(expectedArtifacts).toEqual([]);
    });

    it('should give list of expected artifacts', () => {
      const artifactsHandlerWithData = new ArtifactsHandler(new InMemoryArtifactsRepository(defaultBuildArtifactsData));
      const expectedArtifacts = artifactsHandlerWithData.getAll();

      expect(expectedArtifacts.length).toEqual(defaultArtifactsViews.length);
      defaultArtifactsViews.forEach((artifactView, index) => {
        expect(expectedArtifacts[index]).toEqual(artifactView);
      });
    });
  });

  describe('Retrieving an artifact', () => {
    it('should succeed if it exists', () => {
      const artifactValues = {
        id: '1',
        set: SetNames.gladiatorsFinale,
        level: 2,
        subStats: { [SubStats.flatAtk]: 5, [SubStats.percentDef]: 6, [SubStats.critRate]: 3.5 },
      };
      artifactsHandler.addFlowerArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level);
      const expectedArtifact = artifactsHandler.getById(artifactValues.id);
      expect(expectedArtifact).toEqual(
        new FlowerArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level),
      );
    });

    it('should failed if it does not exist', () => {
      expect(() => artifactsHandler.getById('1')).toThrowError('artifact with id 1 not found');
    });
  });

  describe('Adding a flower artifact', () => {
    it('should succeed with flat HP in main stat if main stat is not specified', () => {
      const artifactValues = {
        id: '1',
        set: SetNames.gladiatorsFinale,
        level: 2,
        subStats: { [SubStats.flatAtk]: 5, [SubStats.percentDef]: 6, [SubStats.critRate]: 3.5 },
      };
      artifactsHandler.addFlowerArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level);
      const addedArtifact = artifactsHandler.getById(artifactValues.id);
      expect(addedArtifact).toEqual(
        new FlowerArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level),
      );
      expect(addedArtifact.mainStat).toEqual({ [MainStats.flatHp]: 1123 });
    });
  });

  describe('Adding a plume artifact', () => {
    it('should succeed with flat atk in main stat if main stat is not specified', () => {
      const artifactValues = {
        id: '1',
        set: SetNames.thundersoother,
        level: 8,
        subStats: {
          [SubStats.percentAtk]: 5,
          [SubStats.percentDef]: 6,
          [SubStats.critRate]: 3.5,
          [SubStats.elementalMastery]: 8,
        },
      };
      artifactsHandler.addPlumeArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level);
      const addedArtifact = artifactsHandler.getById(artifactValues.id);
      expect(addedArtifact).toEqual(
        new PlumeArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level),
      );
      expect(addedArtifact.mainStat).toEqual({ [MainStats.flatAtk]: 152 });
    });
  });

  describe('Adding a sands artifact', () => {
    const subStats = {
      [SubStats.flatAtk]: 5,
      [SubStats.flatHp]: 6,
      [SubStats.critRate]: 3.5,
      [SubStats.critDmg]: 8,
    };
    it('should succeed with percent HP, percent def, percent atk, elemental mastery or energy recharge in main stat', () => {
      const artifactsValues = [
        {
          id: '1',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'percentHp' as SandsMainStatType,
          subStats,
        },
        {
          id: '2',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'percentDef' as SandsMainStatType,
          subStats,
        },
        {
          id: '3',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'percentAtk' as SandsMainStatType,
          subStats,
        },
        {
          id: '4',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'elementalMastery' as SandsMainStatType,
          subStats,
        },
        {
          id: '5',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'energyRecharge' as SandsMainStatType,
          subStats,
        },
      ];
      artifactsValues.forEach((artifactValues) => {
        artifactsHandler.addSandsArtifact(
          artifactValues.id,
          artifactValues.set,
          artifactValues.subStats,
          artifactValues.level,
          artifactValues.mainStatType,
        );
      });

      artifactsValues.forEach((artifactsValue) => {
        const expectedArtifact = artifactsHandler.getById(artifactsValue.id);
        expect(expectedArtifact).toEqual(
          new SandsArtifact(
            artifactsValue.id,
            artifactsValue.set,
            artifactsValue.subStats,
            artifactsValue.level,
            artifactsValue.mainStatType,
          ),
        );
      });
    });
  });

  describe('Adding a goblet artifact', () => {
    const subStats = {
      [SubStats.flatAtk]: 5,
      [SubStats.flatHp]: 6,
      [SubStats.critRate]: 3.5,
      [SubStats.energyRecharge]: 8,
    };
    it('should succeed with percent HP, percent def, percent atk, elemental mastery, elemental damage or physical damage in main stat', () => {
      const artifactsValues = [
        {
          id: '1',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'percentHp' as GobletMainStatType,
          subStats,
        },
        {
          id: '2',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'percentDef' as GobletMainStatType,
          subStats,
        },
        {
          id: '3',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'percentAtk' as GobletMainStatType,
          subStats,
        },
        {
          id: '4',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'elementalMastery' as GobletMainStatType,
          subStats,
        },
        {
          id: '5',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'electroDmg' as GobletMainStatType,
          subStats,
        },
        {
          id: '6',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'physicalDmg' as GobletMainStatType,
          subStats,
        },
      ];
      artifactsValues.forEach((artifactValues) => {
        artifactsHandler.addGobletArtifact(
          artifactValues.id,
          artifactValues.set,
          artifactValues.subStats,
          artifactValues.level,
          artifactValues.mainStatType,
        );
      });
      artifactsValues.forEach((artifactsValue) => {
        const expectedArtifact = artifactsHandler.getById(artifactsValue.id);
        expect(expectedArtifact).toEqual(
          new GobletArtifact(
            artifactsValue.id,
            artifactsValue.set,
            artifactsValue.subStats,
            artifactsValue.level,
            artifactsValue.mainStatType,
          ),
        );
      });
    });
  });

  describe('Adding a circlet artifact', () => {
    const subStats = {
      [SubStats.flatAtk]: 5,
      [SubStats.flatHp]: 6,
      [SubStats.energyRecharge]: 3.5,
      [SubStats.flatDef]: 8,
    };
    it('should succeed with percent HP, percent def, percent atk, elemental mastery, crit rate, crit damage or healing bonus in main stat', () => {
      const artifactsValues = [
        {
          id: '1',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'percentHp' as CircletMainStatType,
          subStats,
        },
        {
          id: '2',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'percentDef' as CircletMainStatType,
          subStats,
        },
        {
          id: '3',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'percentAtk' as CircletMainStatType,
          subStats,
        },
        {
          id: '4',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'elementalMastery' as CircletMainStatType,
          subStats,
        },
        {
          id: '5',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'critRate' as CircletMainStatType,
          subStats,
        },
        {
          id: '6',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'critDmg' as CircletMainStatType,
          subStats,
        },
        {
          id: '7',
          set: SetNames.thundersoother,
          level: 12,
          mainStatType: 'healingBonus' as CircletMainStatType,
          subStats,
        },
      ];
      artifactsValues.forEach((artifactValues) => {
        artifactsHandler.addCircletArtifact(
          artifactValues.id,
          artifactValues.set,
          artifactValues.subStats,
          artifactValues.level,
          artifactValues.mainStatType,
        );
      });
      artifactsValues.forEach((artifactsValue) => {
        const expectedArtifact = artifactsHandler.getById(artifactsValue.id);
        expect(expectedArtifact).toEqual(
          new CircletArtifact(
            artifactsValue.id,
            artifactsValue.set,
            artifactsValue.subStats,
            artifactsValue.level,
            artifactsValue.mainStatType,
          ),
        );
      });
    });

    describe('Adding an artifact', () => {
      it('should succeed if it has 4 substats', () => {
        const artifactsValues = [
          {
            id: '1',
            set: SetNames.thundersoother,
            level: 3,
            mainStatType: MainStats.percentHp,
            subStats: {
              [SubStats.flatAtk]: 5,
              [SubStats.percentDef]: 6,
              [SubStats.critRate]: 3.5,
              [SubStats.percentAtk]: 7,
            },
          },
          {
            id: '2',
            set: SetNames.thundersoother,
            level: 4,
            mainStatType: MainStats.percentDef,
            subStats: {
              [SubStats.flatAtk]: 5,
              [SubStats.percentHp]: 6,
              [SubStats.critRate]: 3.5,
              [SubStats.percentAtk]: 9,
            },
          },
        ];
        const createdArtifacts = artifactsValues.map(
          (artifactValues) =>
            new SandsArtifact(
              artifactValues.id,
              artifactValues.set,
              artifactValues.subStats,
              artifactValues.level,
              artifactValues.mainStatType,
            ),
        );

        createdArtifacts.forEach((createdArtifact) => {
          const expectedArtifact = artifactsValues.find((artifactValues) => createdArtifact.id === artifactValues.id);
          expect(expectedArtifact).toBeTruthy();
        });
      });

      it('should failed if no values are found for main stat', () => {
        const artifactValues = {
          id: '1',
          set: SetNames.gladiatorsFinale,
          level: 4,
          subStats: {
            [SubStats.flatAtk]: 5,
            [SubStats.critRate]: 3.5,
            [SubStats.percentHp]: 8,
            [SubStats.critDmg]: 5.2,
          },
        };
        expect(
          () =>
            new GobletArtifact(
              artifactValues.id,
              artifactValues.set,
              artifactValues.subStats,
              artifactValues.level,
              'notExistingMainStat' as MainStatTypes,
            ),
        ).toThrowError('could not find values for main stat notExistingMainStat');
      });

      it('should failed if it has more than 4 substat', () => {
        const artifactValues = {
          id: '1',
          set: SetNames.gladiatorsFinale,
          level: 4,
          subStats: {
            [SubStats.flatAtk]: 5,
            [SubStats.percentDef]: 6,
            [SubStats.critRate]: 3.5,
            [SubStats.percentHp]: 8,
            [SubStats.critDmg]: 5.2,
          },
        };
        expect(() => new FlowerArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level)).toThrowError(
          'an artifact can not have more than 4 substats',
        );
      });

      it('should failed if it has les than 3 substats', () => {
        const artifactValues = {
          id: '1',
          set: SetNames.gladiatorsFinale,
          level: 4,
          subStats: { [SubStats.flatAtk]: 5, [SubStats.percentDef]: 6 },
        };
        expect(() => new FlowerArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level)).toThrowError(
          'an artifact can not have less than 3 substats',
        );
      });

      it('should failed if it has 3 substats and level higher than 3', () => {
        const artifactValues = {
          id: '1',
          set: SetNames.gladiatorsFinale,
          level: 4,
          subStats: { [SubStats.flatAtk]: 5, [SubStats.percentDef]: 6, [SubStats.critRate]: 3.5 },
        };
        expect(() => new PlumeArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level)).toThrowError(
          'an artifact with level higher than 3 must have 4 substat',
        );
      });

      it('should failed if 1 of the substats is the same than the main stat', () => {
        const artifactValues = {
          id: '1',
          set: SetNames.gladiatorsFinale,
          level: 4,
          subStats: {
            [SubStats.flatAtk]: 5,
            [SubStats.percentDef]: 6,
            [SubStats.critRate]: 3.5,
            [SubStats.energyRecharge]: 3.5,
          },
        };
        expect(
          () =>
            new GobletArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level, MainStats.percentDef),
        ).toThrowError('main stat can not be the same as one of the substats');
      });
    });
  });
});
