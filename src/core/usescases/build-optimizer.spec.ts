import { Artifact } from '../domain/entities/artifact';
import { PossibleMainStats } from '../domain/models/main-statistics';
import { PossibleSubStats, SubStats } from '../domain/models/sub-statistics';
import { BuildOptimizer } from './build-optimizer';
import { possibleBuildStats } from '../domain/models/available-statistics';
import { ArtifactTypes } from '../domain/models/artifact-types';

describe('BuildOptimizer.computeBuildStats', () => {
  let buildOptimizer: BuildOptimizer;
  let artifacts: Artifact[];
  beforeEach(() => {
    buildOptimizer = new BuildOptimizer();
  });
  describe('should compute build stats of 5 lvl 0 artifacts', () => {
    it('with percentDef, physicalDmg and percentAtk as main stats and multiple sub stat', () => {
      artifacts = getArtifactsWithValues([
        {
          type: 'flower',
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
        {
          type: 'plume',
          subStats: { [PossibleSubStats.percentAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.elementalMastery]: 6 },
        },
        {
          type: 'sands',
          mainStatType: PossibleMainStats.percentDef,
          subStats: { [PossibleSubStats.flatDef]: 6, [PossibleSubStats.flatHp]: 40, [PossibleSubStats.critRate]: 2.5 },
        },
        {
          type: 'goblet',
          mainStatType: PossibleMainStats.physicalDmg,
          subStats: { [PossibleSubStats.critRate]: 2.5, [PossibleSubStats.percentDef]: 4, [PossibleSubStats.critDmg]: 3.7 },
        },
        {
          type: 'circlet',
          mainStatType: PossibleMainStats.percentAtk,
          subStats: {
            [PossibleSubStats.percentDef]: 4,
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.flatHp]: 60,
            [PossibleSubStats.flatAtk]: 3,
          },
        },
      ]);
      expect(buildOptimizer.computeBuildStats(artifacts)).toEqual({
        [possibleBuildStats.flatHp]: 817,
        [possibleBuildStats.flatAtk]: 55,
        [possibleBuildStats.percentAtk]: 12,
        [possibleBuildStats.percentDef]: 28.7,
        [possibleBuildStats.physicalDmg]: 8.7,
        [possibleBuildStats.flatDef]: 6,
        [possibleBuildStats.critRate]: 11,
        [possibleBuildStats.elementalMastery]: 6,
        [possibleBuildStats.critDmg]: 3.7,
      });
    });

    it('with percentAtk, geoDmg and elementalMastery as main stats and multiple sub stats', () => {
      artifacts = getArtifactsWithValues([
        {
          type: 'flower',
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.critRate]: 3.2, [PossibleSubStats.percentAtk]: 3 },
        },
        {
          type: 'plume',
          subStats: { [PossibleSubStats.energyRecharge]: 3, [PossibleSubStats.flatDef]: 7, [PossibleSubStats.critRate]: 2.7 },
        },
        {
          type: 'sands',
          mainStatType: PossibleMainStats.percentAtk,
          subStats: { [PossibleSubStats.percentDef]: 6, [PossibleSubStats.elementalMastery]: 7, [PossibleSubStats.critRate]: 3.2 },
        },
        {
          type: 'goblet',
          mainStatType: PossibleMainStats.geoDmg,
          subStats: {
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.percentDef]: 3,
          },
        },
        {
          type: 'circlet',
          mainStatType: PossibleMainStats.elementalMastery,
          subStats: { [PossibleSubStats.percentDef]: 4, [PossibleSubStats.flatAtk]: 4, [PossibleSubStats.critDmg]: 3.2 },
        },
      ]);
      expect(buildOptimizer.computeBuildStats(artifacts)).toEqual({
        [possibleBuildStats.flatHp]: 717,
        [possibleBuildStats.flatAtk]: 56,
        [possibleBuildStats.critRate]: 11.6,
        [possibleBuildStats.energyRecharge]: 3,
        [possibleBuildStats.flatDef]: 7,
        [possibleBuildStats.percentDef]: 13,
        [possibleBuildStats.percentHp]: 5.2,
        [possibleBuildStats.percentAtk]: 14,
        [possibleBuildStats.elementalMastery]: 35,
        [possibleBuildStats.geoDmg]: 7,
        [possibleBuildStats.critDmg]: 3.2,
      });
    });
  });

  describe('should compute build stats of 5 artifacts', () => {
    it('with levels 1, 3, 4, 8, 20', () => {
      artifacts = getArtifactsWithValues([
        {
          type: 'flower',
          level: 1,
          subStats: {
            [PossibleSubStats.flatAtk]: 5,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.percentAtk]: 3,
            [PossibleSubStats.critDmg]: 3.2,
          },
        },
        {
          type: 'plume',
          level: 3,
          subStats: { [PossibleSubStats.energyRecharge]: 3, [PossibleSubStats.flatDef]: 7, [PossibleSubStats.critRate]: 2.7 },
        },
        {
          type: 'sands',
          level: 4,
          mainStatType: PossibleMainStats.percentAtk,
          subStats: {
            [PossibleSubStats.percentDef]: 6,
            [PossibleSubStats.elementalMastery]: 7,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.critDmg]: 2.9,
          },
        },
        {
          type: 'goblet',
          level: 8,
          mainStatType: PossibleMainStats.geoDmg,
          subStats: {
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.percentDef]: 3,
          },
        },
        {
          type: 'circlet',
          level: 20,
          mainStatType: PossibleMainStats.elementalMastery,
          subStats: {
            [PossibleSubStats.percentDef]: 4,
            [PossibleSubStats.flatAtk]: 4,
            [PossibleSubStats.critDmg]: 3.2,
            [PossibleSubStats.percentHp]: 5,
          },
        },
      ]);
      expect(buildOptimizer.computeBuildStats(artifacts)).toEqual({
        [possibleBuildStats.flatHp]: 920,
        [possibleBuildStats.flatAtk]: 95,
        [possibleBuildStats.critRate]: 11.6,
        [possibleBuildStats.energyRecharge]: 3,
        [possibleBuildStats.flatDef]: 7,
        [possibleBuildStats.percentDef]: 13,
        [possibleBuildStats.percentHp]: 10.2,
        [possibleBuildStats.percentAtk]: 21.9,
        [possibleBuildStats.elementalMastery]: 194,
        [possibleBuildStats.geoDmg]: 22.8,
        [possibleBuildStats.critDmg]: 9.3,
      });
    });

    it('with levels 2, 7, 12, 15, 17', () => {
      artifacts = getArtifactsWithValues([
        {
          type: 'flower',
          level: 2,
          subStats: {
            [PossibleSubStats.flatAtk]: 5,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.percentAtk]: 3,
            [PossibleSubStats.critDmg]: 3.2,
          },
        },
        {
          type: 'plume',
          level: 7,
          subStats: { [PossibleSubStats.energyRecharge]: 3, [PossibleSubStats.flatDef]: 7, [PossibleSubStats.critRate]: 2.7 },
        },
        {
          type: 'sands',
          level: 12,
          mainStatType: PossibleMainStats.percentHp,
          subStats: {
            [PossibleSubStats.percentDef]: 6,
            [PossibleSubStats.elementalMastery]: 7,
            [PossibleSubStats.critRate]: 3.2,
            [PossibleSubStats.critDmg]: 2.9,
          },
        },
        {
          type: 'goblet',
          level: 15,
          mainStatType: PossibleMainStats.percentDef,
          subStats: {
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.flatHp]: 3,
          },
        },
        {
          type: 'circlet',
          level: 17,
          mainStatType: PossibleMainStats.healingBonus,
          subStats: {
            [PossibleSubStats.percentDef]: 4,
            [PossibleSubStats.flatAtk]: 4,
            [PossibleSubStats.critDmg]: 3.2,
            [PossibleSubStats.percentHp]: 5,
          },
        },
      ]);
      expect(buildOptimizer.computeBuildStats(artifacts)).toEqual({
        [possibleBuildStats.flatHp]: 1126,
        [possibleBuildStats.flatAtk]: 148,
        [possibleBuildStats.critRate]: 11.6,
        [possibleBuildStats.energyRecharge]: 3,
        [possibleBuildStats.flatDef]: 7,
        [possibleBuildStats.percentDef]: 55.9,
        [possibleBuildStats.percentHp]: 41,
        [possibleBuildStats.percentAtk]: 7,
        [possibleBuildStats.elementalMastery]: 7,
        [possibleBuildStats.healingBonus]: 31.3,
        [possibleBuildStats.critDmg]: 9.3,
      });
    });
  });
});
function getArtifactsWithValues(
  allArtifactsData: { type: ArtifactTypes; level?: number; subStats: SubStats; mainStatType?: PossibleMainStats }[],
): Artifact[] {
  return allArtifactsData.map(
    (artifactData) => new Artifact(artifactData.type, artifactData.subStats, artifactData.level, artifactData.mainStatType),
  );
}
