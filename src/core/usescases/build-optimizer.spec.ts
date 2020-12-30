import { Artifact } from '../domain/entities/artifact';
import { BuildOptimizer } from './build-optimizer';

describe('BuildOptimizer.computeBuildStats', () => {
  describe('should compute build stats of 2 artifacts', () => {
    it('with 100 and 120 HP', () => {
      const artifact1 = new Artifact({ hp: 100 });
      const artifact2 = new Artifact({ hp: 120 });
      const buildOptimizer = new BuildOptimizer();
      expect(buildOptimizer.computeBuildStats(artifact1, artifact2)).toEqual({ hp: 220 });
    });

    it('with 90 and 115 HP', () => {
      const artifact1 = new Artifact({ hp: 90 });
      const artifact2 = new Artifact({ hp: 115 });
      const buildOptimizer = new BuildOptimizer();
      expect(buildOptimizer.computeBuildStats(artifact1, artifact2)).toEqual({ hp: 205 });
    });

    it('with 100 HP and 30 ATK', () => {
      const artifact1 = new Artifact({ hp: 100 });
      const artifact2 = new Artifact({ atk: 30 });
      const buildOptimizer = new BuildOptimizer();
      expect(buildOptimizer.computeBuildStats(artifact1, artifact2)).toEqual({ hp: 100, atk: 30 });
    });

    it('with 90 HP and 35 ATK and 20 DEF', () => {
      const artifact1 = new Artifact({ hp: 90, atk: 35 });
      const artifact2 = new Artifact({ def: 20 });
      const buildOptimizer = new BuildOptimizer();
      expect(buildOptimizer.computeBuildStats(artifact1, artifact2)).toEqual({ hp: 90, atk: 35, def: 20 });
    });
  });
});
