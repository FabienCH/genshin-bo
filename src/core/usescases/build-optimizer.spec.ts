import { Artifact } from '../domain/entities/artifact';
import { StatisticsValues } from '../domain/models/available-statistics';
import { BuildOptimizer } from './build-optimizer';

describe('BuildOptimizer.computeBuildStats', () => {
  let buildOptimizer: BuildOptimizer;
  let artifacts: Artifact[];
  beforeEach(() => {
    buildOptimizer = new BuildOptimizer();
  });
  describe('should compute build stats of 5 artifacts', () => {
    it('with only HP', () => {
      artifacts = getArtifactsWithValues([{ hp: 100 }, { hp: 120 }, { hp: 140 }, { hp: 115 }, { hp: 110 }]);
      expect(buildOptimizer.computeBuildStats(artifacts)).toEqual({ hp: 585 });
    });

    it('with HP and ATK', () => {
      artifacts = getArtifactsWithValues([{ hp: 100 }, { atk: 30 }, { hp: 140 }, { atk: 40 }, { hp: 110 }]);
      expect(buildOptimizer.computeBuildStats(artifacts)).toEqual({ hp: 350, atk: 70 });
    });

    it('with HP, ATK and DEF', () => {
      artifacts = getArtifactsWithValues([{ hp: 100, atk: 20 }, { atk: 30 }, { hp: 140, def: 10 }, { atk: 35 }, { def: 20 }]);
      expect(buildOptimizer.computeBuildStats(artifacts)).toEqual({ hp: 240, atk: 85, def: 30 });
    });
  });
});

function getArtifactsWithValues(allValues: StatisticsValues[]): Artifact[] {
  return allValues.map((values) => new Artifact(values));
}
