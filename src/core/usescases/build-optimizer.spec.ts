import { Artifact } from '../domain/entities/artifact';
import { MainStat, PossibleMainStats } from '../domain/models/main-statistics';
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
  describe('should compute build stats of 5 artifacts', () => {
    it('with only HP as main stat and multiple sub stat', () => {
      artifacts = getArtifactsWithValues([
        {
          type: 'flower',
          mainStat: { [PossibleMainStats.flatHp]: 100 },
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.critRate]: 3.5 },
        },
        {
          type: 'plume',
          mainStat: { [PossibleMainStats.flatHp]: 120 },
          subStats: { [PossibleSubStats.flatAtk]: 7, [PossibleSubStats.percentDef]: 6, [PossibleSubStats.elementalMastery]: 6 },
        },
        {
          type: 'sands',
          mainStat: { [PossibleMainStats.flatHp]: 140 },
          subStats: { [PossibleSubStats.percentDef]: 6, [PossibleSubStats.flatHp]: 40, [PossibleSubStats.critRate]: 2.5 },
        },
        {
          type: 'goblet',
          mainStat: { [PossibleMainStats.flatHp]: 115 },
          subStats: { [PossibleSubStats.critRate]: 2.5, [PossibleSubStats.percentDef]: 4, [PossibleSubStats.critDmg]: 3.7 },
        },
        {
          type: 'circlet',
          mainStat: { [PossibleMainStats.flatHp]: 110 },
          subStats: {
            [PossibleSubStats.percentDef]: 4,
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.flatHp]: 60,
            [PossibleSubStats.flatAtk]: 3,
          },
        },
      ]);
      expect(buildOptimizer.computeBuildStats(artifacts)).toEqual({
        [possibleBuildStats.flatHp]: 685,
        [possibleBuildStats.flatAtk]: 15,
        [possibleBuildStats.percentDef]: 26,
        [possibleBuildStats.critRate]: 11,
        [possibleBuildStats.elementalMastery]: 6,
        [possibleBuildStats.critDmg]: 3.7,
      });
    });

    it('with HP, ATK and DEF and multiple sub stats', () => {
      artifacts = getArtifactsWithValues([
        {
          type: 'flower',
          mainStat: { [PossibleMainStats.flatHp]: 100 },
          subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.critRate]: 3.2, [PossibleSubStats.percentAtk]: 3 },
        },
        {
          type: 'plume',
          mainStat: { [PossibleMainStats.flatAtk]: 30 },
          subStats: { [PossibleSubStats.energyRecharge]: 3, [PossibleSubStats.flatDef]: 7, [PossibleSubStats.critRate]: 2.7 },
        },
        {
          type: 'sands',
          mainStat: { [PossibleMainStats.flatHp]: 140 },
          subStats: { [PossibleSubStats.percentDef]: 6, [PossibleSubStats.flatAtk]: 4, [PossibleSubStats.critRate]: 3.2 },
        },
        {
          type: 'goblet',
          mainStat: { [PossibleMainStats.flatAtk]: 40 },
          subStats: {
            [PossibleSubStats.critRate]: 2.5,
            [PossibleSubStats.percentHp]: 5.2,
            [PossibleSubStats.percentAtk]: 4,
            [PossibleSubStats.percentDef]: 3,
          },
        },
        {
          type: 'circlet',
          mainStat: { [PossibleMainStats.flatHp]: 105 },
          subStats: { [PossibleSubStats.percentDef]: 4, [PossibleSubStats.elementalMastery]: 7, [PossibleSubStats.critRate]: 3.2 },
        },
      ]);
      expect(buildOptimizer.computeBuildStats(artifacts)).toEqual({
        [possibleBuildStats.flatHp]: 345,
        [possibleBuildStats.flatAtk]: 79,
        [possibleBuildStats.critRate]: 14.8,
        [possibleBuildStats.energyRecharge]: 3,
        [possibleBuildStats.flatDef]: 7,
        [possibleBuildStats.percentDef]: 13,
        [possibleBuildStats.percentHp]: 5.2,
        [possibleBuildStats.percentAtk]: 7,
        [possibleBuildStats.elementalMastery]: 7,
      });
    });
  });
});

function getArtifactsWithValues(allArtifactsData: { type: ArtifactTypes; mainStat: MainStat; subStats: SubStats }[]): Artifact[] {
  return allArtifactsData.map((artifactData) => new Artifact(artifactData.type, artifactData.mainStat, artifactData.subStats));
}
