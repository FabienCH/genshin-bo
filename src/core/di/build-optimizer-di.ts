import { BcWorkerMock } from '../../test/builds-computation-worker-mock';
import BuildsComputationWorker, { BcWorker } from '../domain/worker/builds-computation.worker';
import { BuildOptimizer } from '../usescases/build-optimizer';

export abstract class BuildOptimizerDI {
  private static buildOptimizer: BuildOptimizer;
  private static bcWorker: BcWorker;

  public static getBuildOptimizer(): BuildOptimizer {
    if (!BuildOptimizerDI.buildOptimizer) {
      BuildOptimizerDI.buildOptimizer = new BuildOptimizer();
    }
    return BuildOptimizerDI.buildOptimizer;
  }

  public static getBcWorker(): BcWorker {
    if (!BuildOptimizerDI.bcWorker) {
      switch (process.env.NODE_ENV) {
        case 'test':
          BuildOptimizerDI.bcWorker = new BcWorkerMock();
          break;
        default:
          BuildOptimizerDI.bcWorker = new BuildsComputationWorker();
      }
    }
    return BuildOptimizerDI.bcWorker;
  }
}
