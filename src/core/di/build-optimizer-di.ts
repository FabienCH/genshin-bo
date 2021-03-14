import { BuildOptimizer } from '../usescases/build-optimizer';

export abstract class BuildOptimizerDI {
  private static buildOptimizer: BuildOptimizer;

  public static getBuildOptimizer(): BuildOptimizer {
    if (!BuildOptimizerDI.buildOptimizer) {
      BuildOptimizerDI.buildOptimizer = new BuildOptimizer();
    }
    return BuildOptimizerDI.buildOptimizer;
  }
}
