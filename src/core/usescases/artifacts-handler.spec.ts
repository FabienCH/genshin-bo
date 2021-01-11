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
});
