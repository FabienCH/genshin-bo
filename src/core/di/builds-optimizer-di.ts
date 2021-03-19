import { BcWorkerMock } from '../../test/builds-computation-worker-mock';
import BuildsComputationWorker, { BcWorker } from '../domain/worker/builds-computation.worker';
import { BuildsOptimizer } from '../usescases/builds-optimizer';

export abstract class BuildsOptimizerDI {
  private static buildsOptimizer: BuildsOptimizer;
  private static bcWorker: BcWorker;

  public static getBuildsOptimizer(): BuildsOptimizer {
    if (!BuildsOptimizerDI.buildsOptimizer) {
      BuildsOptimizerDI.buildsOptimizer = new BuildsOptimizer();
    }
    return BuildsOptimizerDI.buildsOptimizer;
  }

  public static getBcWorker(): BcWorker {
    if (!BuildsOptimizerDI.bcWorker) {
      switch (process.env.NODE_ENV) {
        case 'test':
          BuildsOptimizerDI.bcWorker = new BcWorkerMock();
          break;
        default:
          BuildsOptimizerDI.bcWorker = new BuildsComputationWorker();
      }
    }
    return BuildsOptimizerDI.bcWorker;
  }
}
