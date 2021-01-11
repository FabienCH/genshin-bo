import { Artifact } from '../domain/entities/artifact';
import { ArtifactTypes } from '../domain/models/artifact-types';
import { PossibleMainStats } from '../domain/models/main-statistics';
import { SetNames } from '../domain/models/sets-with-effects';
import { PossibleSubStats } from '../domain/models/sub-statistics';
import { ArtifactsHandler } from './artifacts-handler';

describe('ArtifactsHandler.addArtifact', () => {
  describe('Adding a flower artifact', () => {
    it('should succeed with flat HP in main stat if main stat is not specified', () => {
      const artifactsHandler: ArtifactsHandler = new ArtifactsHandler();
      const artifactValues = {
        id: '1',
        set: SetNames.gladiatorsFinale,
        level: 2,
        type: 'flower',
        subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
      };
      artifactsHandler.add(
        artifactValues.id,
        artifactValues.type as ArtifactTypes,
        artifactValues.set,
        artifactValues.subStats,
        artifactValues.level,
      );
      const addedArtifact = artifactsHandler.getAll().find((storedArtifact) => storedArtifact.id === artifactValues.id);
      expect(addedArtifact).toEqual(
        new Artifact(
          artifactValues.id,
          artifactValues.type as ArtifactTypes,
          artifactValues.set,
          artifactValues.subStats,
          artifactValues.level,
          null,
        ),
      );
      expect(addedArtifact.mainStat).toEqual({ [PossibleMainStats.flatHp]: 1123 });
    });

    it('should failed if main stat is specified', () => {
      const artifactsHandler: ArtifactsHandler = new ArtifactsHandler();
      const artifactValues = {
        id: '1',
        set: SetNames.gladiatorsFinale,
        level: 2,
        type: 'flower',
        mainStatType: PossibleMainStats.percentHp,
        subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
      };
      expect(() =>
        artifactsHandler.add(
          artifactValues.id,
          artifactValues.type as ArtifactTypes,
          artifactValues.set,
          artifactValues.subStats,
          artifactValues.level,
          artifactValues.mainStatType,
        ),
      ).toThrowError("you can't specify a main stat for flower artifact");
    });
  });

  describe('Adding a plume artifact', () => {
    it('should succeed with flat atk in main stat if main stat is not specified', () => {
      const artifactsHandler: ArtifactsHandler = new ArtifactsHandler();
      const artifactValues = {
        id: '1',
        set: SetNames.thundersoother,
        level: 8,
        type: 'plume',
        subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
      };
      artifactsHandler.add(
        artifactValues.id,
        artifactValues.type as ArtifactTypes,
        artifactValues.set,
        artifactValues.subStats,
        artifactValues.level,
      );
      const addedArtifact = artifactsHandler.getAll().find((storedArtifact) => storedArtifact.id === artifactValues.id);
      expect(addedArtifact).toEqual(
        new Artifact(
          artifactValues.id,
          artifactValues.type as ArtifactTypes,
          artifactValues.set,
          artifactValues.subStats,
          artifactValues.level,
          null,
        ),
      );
      expect(addedArtifact.mainStat).toEqual({ [PossibleMainStats.flatAtk]: 152 });
    });

    it('should failed if it has a main stat', () => {
      const artifactsHandler: ArtifactsHandler = new ArtifactsHandler();
      const artifactValues = {
        id: '1',
        set: SetNames.thundersoother,
        level: 8,
        type: 'plume',
        mainStatType: PossibleMainStats.critRate,
        subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
      };
      expect(() =>
        artifactsHandler.add(
          artifactValues.id,
          artifactValues.type as ArtifactTypes,
          artifactValues.set,
          artifactValues.subStats,
          artifactValues.level,
          artifactValues.mainStatType,
        ),
      ).toThrowError("you can't specify a main stat for plume artifact");
    });
  });

  describe('Adding a sands artifact', () => {
    it('should succeed with percent HP, percent def, percent atk, elemental mastery or energy recharge in main stat', () => {
      const artifactsHandler: ArtifactsHandler = new ArtifactsHandler();
      const artifactsValues = [
        {
          id: '1',
          set: SetNames.thundersoother,
          level: 12,
          type: 'sands',
          mainStatType: PossibleMainStats.percentHp,
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
        {
          id: '2',
          set: SetNames.thundersoother,
          level: 12,
          type: 'sands',
          mainStatType: PossibleMainStats.percentDef,
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
        {
          id: '3',
          set: SetNames.thundersoother,
          level: 12,
          type: 'sands',
          mainStatType: PossibleMainStats.percentAtk,
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
        {
          id: '4',
          set: SetNames.thundersoother,
          level: 12,
          type: 'sands',
          mainStatType: PossibleMainStats.elementalMastery,
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
        {
          id: '5',
          set: SetNames.thundersoother,
          level: 12,
          type: 'sands',
          mainStatType: PossibleMainStats.energyRecharge,
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
      ];
      artifactsValues.forEach((artifactValues) => {
        artifactsHandler.add(
          artifactValues.id,
          artifactValues.type as ArtifactTypes,
          artifactValues.set,
          artifactValues.subStats,
          artifactValues.level,
          artifactValues.mainStatType,
        );
      });
      artifactsHandler.getAll().forEach((storedArtifact) => {
        const expectedArtifact = artifactsValues.find((artifactValues) => storedArtifact.id === artifactValues.id);
        expect(storedArtifact).toEqual(
          new Artifact(
            expectedArtifact.id,
            expectedArtifact.type as ArtifactTypes,
            expectedArtifact.set,
            expectedArtifact.subStats,
            expectedArtifact.level,
            expectedArtifact.mainStatType,
          ),
        );
      });
    });

    it('should failed if it has a no main stat', () => {
      const artifactsHandler: ArtifactsHandler = new ArtifactsHandler();
      const artifactValues = {
        id: '1',
        set: SetNames.thundersoother,
        level: 8,
        type: 'sands',
        subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
      };
      expect(() =>
        artifactsHandler.add(
          artifactValues.id,
          artifactValues.type as ArtifactTypes,
          artifactValues.set,
          artifactValues.subStats,
          artifactValues.level,
          null,
        ),
      ).toThrowError('main stat is mandatory');
    });

    it('should failed if it has invalid main stat', () => {
      const artifactsHandler: ArtifactsHandler = new ArtifactsHandler();
      const invalidMainStats = [
        PossibleMainStats.cryoDmg,
        PossibleMainStats.physicalDmg,
        PossibleMainStats.critRate,
        PossibleMainStats.critDmg,
        PossibleMainStats.healingBonus,
      ];
      const artifactsValues = invalidMainStats.map((invalidMainStat) => ({
        id: '1',
        set: SetNames.thundersoother,
        level: 8,
        type: 'sands',
        mainStatType: invalidMainStat,
        subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
      }));

      artifactsValues.forEach((artifactValues) => {
        expect(() =>
          artifactsHandler.add(
            artifactValues.id,
            artifactValues.type as ArtifactTypes,
            artifactValues.set,
            artifactValues.subStats,
            artifactValues.level,
            artifactValues.mainStatType,
          ),
        ).toThrowError(`invalid main stat for sands : ${artifactValues.mainStatType}`);
      });
    });
  });

  describe('Adding a goblet artifact', () => {
    it('should succeed with percent HP, percent def, percent atk, elemental mastery, elemental damage or physical damage in main stat', () => {
      const artifactsHandler: ArtifactsHandler = new ArtifactsHandler();
      const artifactsValues = [
        {
          id: '1',
          set: SetNames.thundersoother,
          level: 12,
          type: 'goblet',
          mainStatType: PossibleMainStats.percentHp,
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
        {
          id: '2',
          set: SetNames.thundersoother,
          level: 12,
          type: 'goblet',
          mainStatType: PossibleMainStats.percentDef,
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
        {
          id: '3',
          set: SetNames.thundersoother,
          level: 12,
          type: 'goblet',
          mainStatType: PossibleMainStats.percentAtk,
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
        {
          id: '4',
          set: SetNames.thundersoother,
          level: 12,
          type: 'goblet',
          mainStatType: PossibleMainStats.elementalMastery,
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
        {
          id: '5',
          set: SetNames.thundersoother,
          level: 12,
          type: 'goblet',
          mainStatType: PossibleMainStats.electroDmg,
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
        {
          id: '6',
          set: SetNames.thundersoother,
          level: 12,
          type: 'goblet',
          mainStatType: PossibleMainStats.physicalDmg,
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
      ];
      artifactsValues.forEach((artifactValues) => {
        artifactsHandler.add(
          artifactValues.id,
          artifactValues.type as ArtifactTypes,
          artifactValues.set,
          artifactValues.subStats,
          artifactValues.level,
          artifactValues.mainStatType,
        );
      });
      artifactsHandler.getAll().forEach((storedArtifact) => {
        const expectedArtifact = artifactsValues.find((artifactValues) => storedArtifact.id === artifactValues.id);
        expect(storedArtifact).toEqual(
          new Artifact(
            expectedArtifact.id,
            expectedArtifact.type as ArtifactTypes,
            expectedArtifact.set,
            expectedArtifact.subStats,
            expectedArtifact.level,
            expectedArtifact.mainStatType,
          ),
        );
      });
    });

    it('should failed if it has invalid main stat', () => {
      const artifactsHandler: ArtifactsHandler = new ArtifactsHandler();
      const invalidMainStats = [
        PossibleMainStats.energyRecharge,
        PossibleMainStats.critRate,
        PossibleMainStats.critDmg,
        PossibleMainStats.healingBonus,
      ];
      const artifactsValues = invalidMainStats.map((invalidMainStat) => ({
        id: '1',
        set: SetNames.thundersoother,
        level: 8,
        type: 'goblet',
        mainStatType: invalidMainStat,
        subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
      }));

      artifactsValues.forEach((artifactValues) => {
        expect(() =>
          artifactsHandler.add(
            artifactValues.id,
            artifactValues.type as ArtifactTypes,
            artifactValues.set,
            artifactValues.subStats,
            artifactValues.level,
            artifactValues.mainStatType,
          ),
        ).toThrowError(`invalid main stat for goblet : ${artifactValues.mainStatType}`);
      });
    });
  });

  describe('Adding a circlet artifact', () => {
    it('should succeed with percent HP, percent def, percent atk, elemental mastery, crit rate, crit damage or healing bonus in main stat', () => {
      const artifactsHandler: ArtifactsHandler = new ArtifactsHandler();
      const artifactsValues = [
        {
          id: '1',
          set: SetNames.thundersoother,
          level: 12,
          type: 'circlet',
          mainStatType: PossibleMainStats.percentHp,
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
        {
          id: '2',
          set: SetNames.thundersoother,
          level: 12,
          type: 'circlet',
          mainStatType: PossibleMainStats.percentDef,
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
        {
          id: '3',
          set: SetNames.thundersoother,
          level: 12,
          type: 'circlet',
          mainStatType: PossibleMainStats.percentAtk,
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
        {
          id: '4',
          set: SetNames.thundersoother,
          level: 12,
          type: 'circlet',
          mainStatType: PossibleMainStats.elementalMastery,
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
        {
          id: '5',
          set: SetNames.thundersoother,
          level: 12,
          type: 'circlet',
          mainStatType: PossibleMainStats.critRate,
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
        {
          id: '6',
          set: SetNames.thundersoother,
          level: 12,
          type: 'circlet',
          mainStatType: PossibleMainStats.critDmg,
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
        {
          id: '7',
          set: SetNames.thundersoother,
          level: 12,
          type: 'circlet',
          mainStatType: PossibleMainStats.healingBonus,
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
      ];
      artifactsValues.forEach((artifactValues) => {
        artifactsHandler.add(
          artifactValues.id,
          artifactValues.type as ArtifactTypes,
          artifactValues.set,
          artifactValues.subStats,
          artifactValues.level,
          artifactValues.mainStatType,
        );
      });
      artifactsHandler.getAll().forEach((storedArtifact) => {
        const expectedArtifact = artifactsValues.find((artifactValues) => storedArtifact.id === artifactValues.id);
        expect(storedArtifact).toEqual(
          new Artifact(
            expectedArtifact.id,
            expectedArtifact.type as ArtifactTypes,
            expectedArtifact.set,
            expectedArtifact.subStats,
            expectedArtifact.level,
            expectedArtifact.mainStatType,
          ),
        );
      });
    });

    it('should failed if it has invalid main stat', () => {
      const artifactsHandler: ArtifactsHandler = new ArtifactsHandler();
      const invalidMainStats = [
        PossibleMainStats.energyRecharge,
        PossibleMainStats.anemoDmg,
        PossibleMainStats.cryoDmg,
        PossibleMainStats.pyroDmg,
        PossibleMainStats.hydroDmg,
        PossibleMainStats.dendroDmg,
        PossibleMainStats.electroDmg,
        PossibleMainStats.geoDmg,
        PossibleMainStats.physicalDmg,
      ];
      const artifactsValues = invalidMainStats.map((invalidMainStat) => ({
        id: '1',
        set: SetNames.thundersoother,
        level: 8,
        type: 'circlet',
        mainStatType: invalidMainStat,
        subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
      }));

      artifactsValues.forEach((artifactValues) => {
        expect(() =>
          artifactsHandler.add(
            artifactValues.id,
            artifactValues.type as ArtifactTypes,
            artifactValues.set,
            artifactValues.subStats,
            artifactValues.level,
            artifactValues.mainStatType,
          ),
        ).toThrowError(`invalid main stat for circlet : ${artifactValues.mainStatType}`);
      });
    });
  });
});
