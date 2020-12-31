import { Artifact } from '../domain/entities/artifact';
import { MainStat, PossibleMainStats } from '../domain/models/main-statistics';
import { PossibleSubStats, SubStats } from '../domain/models/sub-statistics';
import { BuildOptimizer } from './build-optimizer';
import { possibleBuildStats } from '../domain/models/available-statistics';

describe('BuildOptimizer.computeBuildStats', () => {
  let buildOptimizer: BuildOptimizer;
  let artifacts: Artifact[];
  beforeEach(() => {
    buildOptimizer = new BuildOptimizer();
  });
  describe('should compute build stats of 5 artifacts', () => {
    it('with only HP as main stat  and 1 sub stat', () => {
      artifacts = getArtifactsWithValues([
        { mainStat: { [PossibleMainStats.flatHp]: 100 }, subStats: { [PossibleSubStats.flatAtk]: 5 } },
        { mainStat: { [PossibleMainStats.flatHp]: 120 }, subStats: { [PossibleSubStats.flatAtk]: 7 } },
        { mainStat: { [PossibleMainStats.flatHp]: 140 }, subStats: { [PossibleSubStats.percentDef]: 6 } },
        { mainStat: { [PossibleMainStats.flatHp]: 115 }, subStats: { [PossibleSubStats.critRate]: 2.5 } },
        { mainStat: { [PossibleMainStats.flatHp]: 110 }, subStats: { [PossibleSubStats.percentDef]: 4 } },
      ]);
      expect(buildOptimizer.computeBuildStats(artifacts)).toEqual({
        [possibleBuildStats.flatHp]: 585,
        [possibleBuildStats.flatAtk]: 12,
        [possibleBuildStats.percentDef]: 10,
        [possibleBuildStats.critRate]: 2.5,
      });
    });

    it('with HP and ATK as main stat and 1 sub stat', () => {
      artifacts = getArtifactsWithValues([
        { mainStat: { [PossibleMainStats.flatHp]: 100 }, subStats: { [PossibleSubStats.critRate]: 3.2 } },
        { mainStat: { [PossibleMainStats.flatAtk]: 30 }, subStats: { [PossibleSubStats.energyRecharge]: 3 } },
        { mainStat: { [PossibleMainStats.flatHp]: 140 }, subStats: { [PossibleSubStats.percentDef]: 6 } },
        { mainStat: { [PossibleMainStats.flatAtk]: 40 }, subStats: { [PossibleSubStats.critRate]: 2.5 } },
        { mainStat: { [PossibleMainStats.flatHp]: 105 }, subStats: { [PossibleSubStats.percentDef]: 4 } },
      ]);
      expect(buildOptimizer.computeBuildStats(artifacts)).toEqual({
        [possibleBuildStats.flatHp]: 345,
        [possibleBuildStats.flatAtk]: 70,
        [possibleBuildStats.percentDef]: 10,
        [possibleBuildStats.critRate]: 5.7,
        [possibleBuildStats.energyRecharge]: 3,
      });
    });

    it('with HP, ATK and DEF and multiple sub stats', () => {
      artifacts = getArtifactsWithValues([
        { mainStat: { [PossibleMainStats.flatHp]: 100 }, subStats: { [PossibleSubStats.flatAtk]: 5, [PossibleSubStats.critRate]: 3.2 } },
        {
          mainStat: { [PossibleMainStats.flatAtk]: 30 },
          subStats: { [PossibleSubStats.energyRecharge]: 3, [PossibleSubStats.flatDef]: 7 },
        },
        { mainStat: { [PossibleMainStats.flatHp]: 140 }, subStats: { [PossibleSubStats.percentDef]: 6, [PossibleSubStats.flatAtk]: 4 } },
        {
          mainStat: { [PossibleMainStats.flatAtk]: 40 },
          subStats: { [PossibleSubStats.critRate]: 2.5, [PossibleSubStats.percentHp]: 5.2, [PossibleSubStats.percentAtk]: 4 },
        },
        {
          mainStat: { [PossibleMainStats.flatHp]: 105 },
          subStats: { [PossibleSubStats.percentDef]: 4, [PossibleSubStats.elementalMastery]: 7 },
        },
      ]);
      expect(buildOptimizer.computeBuildStats(artifacts)).toEqual({
        [possibleBuildStats.flatHp]: 345,
        [possibleBuildStats.flatAtk]: 79,
        [possibleBuildStats.critRate]: 5.7,
        [possibleBuildStats.energyRecharge]: 3,
        [possibleBuildStats.flatDef]: 7,
        [possibleBuildStats.percentDef]: 10,
        [possibleBuildStats.percentHp]: 5.2,
        [possibleBuildStats.percentAtk]: 4,
        [possibleBuildStats.elementalMastery]: 7,
      });
    });
  });
});

function getArtifactsWithValues(allArtifactsStats: { mainStat: MainStat; subStats: SubStats }[]): Artifact[] {
  return allArtifactsStats.map((statValues) => new Artifact(statValues.mainStat, statValues.subStats));
}
