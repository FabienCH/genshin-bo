import { defaultBuildArtifactsData } from '../../test/artifacts-data-mock';
import { defaultArtifactsViews } from '../../test/artifacts-views-mock';
import { ArtifactsDI } from '../di/artifacts-di';
import { ArtifactType } from '../domain/entities/artifact';
import { CircletArtifact } from '../domain/entities/circlet-artifact';
import { FlowerArtifact } from '../domain/entities/flower-artifact';
import { GobletArtifact } from '../domain/entities/goblet-artifact';
import { PlumeArtifact } from '../domain/entities/plume-artifact';
import { SandsArtifact } from '../domain/entities/sands-artifact';
import { ArtifactData } from '../domain/models/artifact-data';
import { MainStats, MainStatTypes } from '../domain/models/main-statistics';
import { SandsMainStatType } from '../domain/models/sands-artifact-data';
import { SetNames } from '../domain/models/sets-with-effects';
import { SubStats } from '../domain/models/sub-statistics';
import { ArtifactsHandler } from './artifacts-handler';

describe('ArtifactsHandler.addArtifact', () => {
  let artifactsHandler: ArtifactsHandler;

  beforeEach(() => {
    ArtifactsDI.registerRepository();
    artifactsHandler = ArtifactsDI.artifactsHandler;
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
      ArtifactsDI.registerRepository(emptyArtifactsData);
      const emptyArtifactsHandler = ArtifactsDI.artifactsHandler;
      const expectedArtifacts = emptyArtifactsHandler.getAll();
      expect(expectedArtifacts).toEqual([]);
    });

    it('should give list of expected artifacts', () => {
      ArtifactsDI.registerRepository(defaultBuildArtifactsData);
      const artifactsHandlerWithData = ArtifactsDI.artifactsHandler;
      const expectedArtifacts = artifactsHandlerWithData.getAll();

      expect(expectedArtifacts.length).toEqual(defaultArtifactsViews.length);
      defaultArtifactsViews.forEach((artifactView, index) => {
        expect(expectedArtifacts[index]).toEqual(artifactView);
      });
    });
  });

  describe('Retrieving an artifact', () => {
    it('should succeed if it exists', () => {
      const artifactValues: ArtifactData = ArtifactsDI.getRepository().getAll()[1];
      const expectedArtifact = artifactsHandler.getById('1');
      expect(expectedArtifact).toEqual(
        new FlowerArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level),
      );
    });

    it('should failed if it does not exist', () => {
      expect(() => artifactsHandler.getById('20')).toThrowError('artifact with id 20 not found');
    });
  });

  describe('Adding a flower artifact', () => {
    it('should succeed with flat HP in main stat', () => {
      const artifactValues: ArtifactData = {
        id: '20',
        type: ArtifactType.flower,
        set: SetNames.gladiatorsFinale,
        level: 2,
        mainStatType: FlowerArtifact.mainStat,
        subStats: { [SubStats.flatAtk]: 5, [SubStats.percentDef]: 6, [SubStats.critRate]: 3.5 },
      };
      artifactsHandler.addOne(artifactValues);
      const addedArtifact = artifactsHandler.getById(artifactValues.id);
      expect(addedArtifact).toEqual(
        new FlowerArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level),
      );
      expect(addedArtifact.mainStat).toEqual({ [MainStats.flatHp]: 1123 });
    });
  });

  describe('Adding a plume artifact', () => {
    it('should succeed with flat atk in main stat if main stat is not specified', () => {
      const artifactValues: ArtifactData = {
        id: '20',
        type: ArtifactType.plume,
        set: SetNames.thundersoother,
        level: 8,
        mainStatType: PlumeArtifact.mainStat,
        subStats: {
          [SubStats.percentAtk]: 5,
          [SubStats.percentDef]: 6,
          [SubStats.critRate]: 3.5,
          [SubStats.elementalMastery]: 8,
        },
      };
      artifactsHandler.addOne(artifactValues);
      const addedArtifact = artifactsHandler.getById(artifactValues.id);
      expect(addedArtifact).toEqual(
        new PlumeArtifact(artifactValues.id, artifactValues.set, artifactValues.subStats, artifactValues.level),
      );
      expect(addedArtifact.mainStat).toEqual({ [MainStats.flatAtk]: 152 });
    });
  });

  describe('Adding a sands artifact', () => {
    const commonValues = {
      type: ArtifactType.sands,
      set: SetNames.thundersoother,
      level: 12,
      subStats: {
        [SubStats.flatAtk]: 5,
        [SubStats.flatHp]: 6,
        [SubStats.critRate]: 3.5,
        [SubStats.critDmg]: 8,
      },
    };
    it('should succeed with percent HP, percent def, percent atk, elemental mastery or energy recharge in main stat', () => {
      const artifactsValues = [
        {
          id: '21',
          mainStatType: MainStats.percentHp,
          ...commonValues,
        },
        {
          id: '22',
          mainStatType: MainStats.percentDef,
          ...commonValues,
        },
        {
          id: '23',
          mainStatType: MainStats.percentAtk,
          ...commonValues,
        },
        {
          id: '24',
          mainStatType: 'elementalMastery' as SandsMainStatType,
          ...commonValues,
        },
        {
          id: '25',
          mainStatType: MainStats.elementalMastery,
          ...commonValues,
        },
      ];
      artifactsValues.forEach((artifactValues) => {
        artifactsHandler.addOne(artifactValues);
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
    const commonValues = {
      type: ArtifactType.goblet,
      set: SetNames.thundersoother,
      level: 12,
      subStats: {
        [SubStats.flatAtk]: 5,
        [SubStats.flatHp]: 6,
        [SubStats.critRate]: 3.5,
        [SubStats.energyRecharge]: 8,
      },
    };
    it('should succeed with percent HP, percent def, percent atk, elemental mastery, elemental damage or physical damage in main stat', () => {
      const artifactsValues = [
        {
          id: '21',
          mainStatType: MainStats.percentHp,
          ...commonValues,
        },
        {
          id: '22',
          mainStatType: MainStats.percentDef,
          ...commonValues,
        },
        {
          id: '23',
          mainStatType: MainStats.percentAtk,
          ...commonValues,
        },
        {
          id: '24',
          mainStatType: MainStats.elementalMastery,
          ...commonValues,
        },
        {
          id: '25',
          mainStatType: MainStats.electroDmg,
          ...commonValues,
        },
        {
          id: '26',
          mainStatType: MainStats.physicalDmg,
          ...commonValues,
        },
      ];
      artifactsValues.forEach((artifactValues) => {
        artifactsHandler.addOne(artifactValues);
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
    const commonValues = {
      type: ArtifactType.circlet,
      set: SetNames.thundersoother,
      level: 12,
      subStats: {
        [SubStats.flatAtk]: 5,
        [SubStats.flatHp]: 6,
        [SubStats.energyRecharge]: 3.5,
        [SubStats.flatDef]: 8,
      },
    };

    it('should succeed with percent HP, percent def, percent atk, elemental mastery, crit rate, crit damage or healing bonus in main stat', () => {
      const artifactsValues = [
        {
          id: '21',
          mainStatType: MainStats.percentHp,
          ...commonValues,
        },
        {
          id: '22',
          mainStatType: MainStats.percentDef,
          ...commonValues,
        },
        {
          id: '23',
          mainStatType: MainStats.percentAtk,
          ...commonValues,
        },
        {
          id: '24',
          mainStatType: MainStats.elementalMastery,
          ...commonValues,
        },
        {
          id: '25',
          mainStatType: MainStats.critRate,
          ...commonValues,
        },
        {
          id: '26',
          mainStatType: MainStats.critDmg,
          ...commonValues,
        },
        {
          id: '27',
          mainStatType: MainStats.healingBonus,
          ...commonValues,
        },
      ];
      artifactsValues.forEach((artifactValues) => {
        artifactsHandler.addOne(artifactValues);
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
            id: '21',
            type: ArtifactType.sands,
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
            id: '22',
            type: ArtifactType.circlet,
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

        artifactsValues.forEach((artifactValues) => {
          artifactsHandler.addOne(artifactValues);
        });

        artifactsValues.forEach((artifactValues) => {
          const expectedArtifact = artifactsHandler.getById(artifactValues.id);
          expect(expectedArtifact).toBeTruthy();
        });
      });

      it('should failed if no values are found for main stat', () => {
        const artifactValues = {
          id: '1',
          type: ArtifactType.sands,
          set: SetNames.gladiatorsFinale,
          level: 4,
          mainStatType: 'notExistingMainStat' as MainStatTypes,
          subStats: {
            [SubStats.flatAtk]: 5,
            [SubStats.critRate]: 3.5,
            [SubStats.percentHp]: 8,
            [SubStats.critDmg]: 5.2,
          },
        };
        expect(() => artifactsHandler.addOne(artifactValues)).toThrowError('could not find values for main stat notExistingMainStat');
      });

      it('should failed if it has more than 4 substat', () => {
        const artifactValues = {
          id: '1',
          type: ArtifactType.flower,
          set: SetNames.gladiatorsFinale,
          level: 4,
          mainStatType: FlowerArtifact.mainStat,
          subStats: {
            [SubStats.flatAtk]: 5,
            [SubStats.percentDef]: 6,
            [SubStats.critRate]: 3.5,
            [SubStats.percentHp]: 8,
            [SubStats.critDmg]: 5.2,
          },
        };
        expect(() => artifactsHandler.addOne(artifactValues)).toThrowError('an artifact can not have more than 4 substats');
      });

      it('should failed if it has les than 3 substats', () => {
        const artifactValues = {
          id: '1',
          type: ArtifactType.flower,
          set: SetNames.gladiatorsFinale,
          level: 4,
          mainStatType: FlowerArtifact.mainStat,
          subStats: { [SubStats.flatAtk]: 5, [SubStats.percentDef]: 6 },
        };
        expect(() => artifactsHandler.addOne(artifactValues)).toThrowError('an artifact can not have less than 3 substats');
      });

      it('should failed if it has 3 substats and level higher than 3', () => {
        const artifactValues = {
          id: '1',
          type: ArtifactType.plume,
          set: SetNames.gladiatorsFinale,
          level: 4,
          mainStatType: PlumeArtifact.mainStat,
          subStats: { [SubStats.flatAtk]: 5, [SubStats.percentDef]: 6, [SubStats.critRate]: 3.5 },
        };
        expect(() => artifactsHandler.addOne(artifactValues)).toThrowError('an artifact with level higher than 3 must have 4 substat');
      });

      it('should failed if 1 of the substats is the same than the main stat', () => {
        const artifactValues = {
          id: '1',
          type: ArtifactType.goblet,
          set: SetNames.gladiatorsFinale,
          level: 4,
          mainStatType: MainStats.percentDef,
          subStats: {
            [SubStats.flatAtk]: 5,
            [SubStats.percentDef]: 6,
            [SubStats.critRate]: 3.5,
            [SubStats.energyRecharge]: 3.5,
          },
        };
        expect(() => artifactsHandler.addOne(artifactValues)).toThrowError('main stat can not be the same as one of the substats');
      });
    });
  });
});
