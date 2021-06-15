import { defaultBuildArtifactsData } from '../../test/artifacts-data-mock';
import { defaultArtifactsViews } from '../../test/artifacts-views-mock';
import { deleteAllArtifactsAction, loadArtifactsActions } from '../../adapters/redux/artifacts/artifacts-action';
import { selectAllArtifacts } from '../../adapters/redux/artifacts/artifacts-selectors';
import { appStore } from '../../adapters/redux/store';
import { ArtifactsDI } from '../../di/artifacts-di';
import { ArtifactValidationError } from '../../domain/artifacts/artifact-validation-error';
import { ArtifactType } from '../../domain/artifacts/entities/artifact';
import { FlowerArtifact } from '../../domain/artifacts/entities/flower-artifact';
import { PlumeArtifact } from '../../domain/artifacts/entities/plume-artifact';
import { ArtifactMapper } from '../../domain/artifacts/mappers/artifact-mapper';
import { AllArtifactsData, ArtifactData } from '../../domain/artifacts/models/artifact-data';
import { MainStats } from '../../domain/artifacts/models/main-statistics';
import { SetNames } from '../../domain/artifacts/models/sets-with-effects';
import { SubStats } from '../../domain/artifacts/models/sub-statistics';
import { ArtifactsHandler } from './artifacts-handler';
import { ArtifactsPresenter } from '../../adapters/primaries/artifacts/artifacts-presenter';

describe('ArtifactsHandler.addArtifact', () => {
  let artifactsHandler: ArtifactsHandler;

  beforeEach(() => {
    artifactsHandler = getArtifactsHandler();
  });

  afterEach(() => {
    appStore.dispatch(deleteAllArtifactsAction());
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
      const artifactsPresenter = new ArtifactsPresenter(
        ArtifactsDI.getArtifactsHandler(emptyArtifactsData),
        ArtifactsDI.getArtifactsImporter(),
        ArtifactsDI.getArtifactsExporter(),
        ArtifactsDI.getVideoValidator(),
      );
      appStore.dispatch(loadArtifactsActions());

      const expectedArtifacts = artifactsPresenter.getViewModel().artifacts;

      expect(expectedArtifacts).toEqual([]);
    });

    it('should give list of expected artifacts', () => {
      const artifactsPresenter = new ArtifactsPresenter(
        ArtifactsDI.getArtifactsHandler(defaultBuildArtifactsData),
        ArtifactsDI.getArtifactsImporter(),
        ArtifactsDI.getArtifactsExporter(),
        ArtifactsDI.getVideoValidator(),
      );
      appStore.dispatch(loadArtifactsActions());

      const expectedArtifacts = artifactsPresenter.getViewModel().artifacts;

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
        type: ArtifactType.flower,
        set: SetNames.thunderingFury,
        level: 8,
        mainStatType: FlowerArtifact.mainStat,
        subStats: {
          [SubStats.energyRecharge]: 3,
          [SubStats.percentHp]: 6,
          [SubStats.critDmg]: 3.9,
          [SubStats.percentAtk]: 7,
        },
      };

      const expectedArtifact = artifactsHandler.getById('1');
      expect(expectedArtifact).toEqual(ArtifactMapper.mapDataToView(artifactValues));
    });

    it('should failed if it does not exist', () => {
      expect(artifactsHandler.getById('20')).toEqual(new Error('artifact with id 20 not found'));
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

      expect(addedArtifact).toEqual(ArtifactMapper.mapDataToView(artifactValues));
      expect(addedArtifact).toHaveProperty('mainStat', '1123 HP');
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

      expect(addedArtifact).toEqual(ArtifactMapper.mapDataToView(artifactValues));
      expect(addedArtifact).toHaveProperty('mainStat', '152 ATK');
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
          mainStatType: MainStats.elementalMastery,
          ...commonValues,
        },
        {
          id: '25',
          mainStatType: MainStats.energyRecharge,
          ...commonValues,
        },
      ];
      artifactsValues.forEach((artifactValues) => {
        artifactsHandler.addOne(artifactValues);
      });

      artifactsValues.forEach((artifactValues) => {
        const expectedArtifact = artifactsHandler.getById(artifactValues.id);
        expect(expectedArtifact).toEqual(ArtifactMapper.mapDataToView(artifactValues));
      });
    });

    it('should failed with invalid main stat', () => {
      const artifactValues = {
        id: '21',
        mainStatType: MainStats.healingBonus,
        ...commonValues,
      };

      const validationError = artifactsHandler.addOne(artifactValues);

      expect(validationError instanceof ArtifactValidationError).toBeTruthy();
      expect(validationError).toHaveProperty('messages', ['an artifact of type sands can not have healingBonus as main stat.']);
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
      artifactsValues.forEach((artifactValues) => {
        const expectedArtifact = artifactsHandler.getById(artifactValues.id);
        expect(expectedArtifact).toEqual(ArtifactMapper.mapDataToView(artifactValues));
      });
    });

    it('should failed with invalid main stat', () => {
      const artifactValues = {
        id: '21',
        mainStatType: MainStats.critDmg,
        ...commonValues,
      };

      const validationError = artifactsHandler.addOne(artifactValues);

      expect(validationError instanceof ArtifactValidationError).toBeTruthy();
      expect(validationError).toHaveProperty('messages', ['an artifact of type goblet can not have critDmg as main stat.']);
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
      artifactsValues.forEach((artifactValues) => {
        const expectedArtifact = artifactsHandler.getById(artifactValues.id);
        expect(expectedArtifact).toEqual(ArtifactMapper.mapDataToView(artifactValues));
      });
    });

    it('should failed with invalid main stat', () => {
      const artifactValues = {
        id: '21',
        mainStatType: MainStats.geoDmg,
        ...commonValues,
      };

      const validationError = artifactsHandler.addOne(artifactValues);

      expect(validationError instanceof ArtifactValidationError).toBeTruthy();
      expect(validationError).toHaveProperty('messages', ['an artifact of type circlet can not have geoDmg as main stat.']);
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
        expect(expectedArtifact).toEqual(ArtifactMapper.mapDataToView(artifactValues));
      });
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

      const validationError = artifactsHandler.addOne(artifactValues);

      expect(validationError instanceof ArtifactValidationError).toBeTruthy();
      expect(validationError).toHaveProperty('messages', ['an artifact can not have more than 4 substats']);
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

      const validationError = artifactsHandler.addOne(artifactValues);

      expect(validationError instanceof ArtifactValidationError).toBeTruthy();
      expect(validationError).toHaveProperty('messages', ['an artifact can not have less than 3 substats']);
    });

    it('should failed if it has 3 substats and level higher than 3', () => {
      const artifactValues = {
        id: '1',
        type: ArtifactType.plume,
        set: SetNames.gladiatorsFinale,
        level: 4,
        mainStatType: PlumeArtifact.mainStat,
        subStats: { [SubStats.percentAtk]: 5, [SubStats.percentDef]: 6, [SubStats.critRate]: 3.5 },
      };

      const validationError = artifactsHandler.addOne(artifactValues);

      expect(validationError instanceof ArtifactValidationError).toBeTruthy();
      expect(validationError).toHaveProperty('messages', ['an artifact with level higher than 3 must have 4 substats']);
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
      const validationError = artifactsHandler.addOne(artifactValues);

      expect(validationError instanceof ArtifactValidationError).toBeTruthy();
      expect(validationError).toHaveProperty('messages', ['main stat can not be the same as one of the substats']);
    });
  });

  describe('Importing multiple artifacts from a json file', () => {
    it('should save artifacts and override current ones', () => {
      const artifactsValues = [
        {
          id: '20',
          type: ArtifactType.flower,
          set: SetNames.gladiatorsFinale,
          level: 2,
          mainStatType: FlowerArtifact.mainStat,
          subStats: { [SubStats.flatAtk]: 5, [SubStats.percentDef]: 6, [SubStats.critRate]: 3.5 },
        },
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

      artifactsHandler.addManyFromJson(artifactsValues);

      expect(artifactsValues).toEqual(selectAllArtifacts());
    });
  });
});

function getArtifactsHandler(artifactsData?: AllArtifactsData) {
  ArtifactsDI.registerRepository(artifactsData);
  appStore.dispatch(loadArtifactsActions());
  return ArtifactsDI.getArtifactsHandler();
}
