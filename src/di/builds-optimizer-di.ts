import { BcWorkerMock } from '../test/builds-computation-worker-mock';
import { InMemoryCharactersRepository } from '../adapters/secondaries/in-memory-characters-repository';
import { InMemoryWeaponsRepository } from '../adapters/secondaries/in-memory-weapons-repository';
import { BuildsComputation } from '../domain/builds-computation';
import BuildsComputationWorker, { BcWorker } from '../domain/worker/builds-computation.worker';
import { BuildsFormsHandler } from '../usescases/builds-forms-handler';
import { BuildsOptimizer } from '../usescases/builds-optimizer';

export abstract class BuildsOptimizerDI {
  public static buildsFormsHandler = new BuildsFormsHandler(new InMemoryWeaponsRepository());
  private static buildsOptimizer: BuildsOptimizer;
  private static buildsComputation: BuildsComputation;
  private static bcWorker?: BcWorker;

  public static getBuildsOptimizer(): BuildsOptimizer {
    if (!BuildsOptimizerDI.buildsOptimizer) {
      BuildsOptimizerDI.buildsOptimizer = new BuildsOptimizer(new InMemoryCharactersRepository(), new InMemoryWeaponsRepository());
    }
    return BuildsOptimizerDI.buildsOptimizer;
  }

  public static getBuildsComputation(): BuildsComputation {
    if (!BuildsOptimizerDI.buildsComputation) {
      BuildsOptimizerDI.buildsComputation = new BuildsComputation();
    }
    return BuildsOptimizerDI.buildsComputation;
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

  public static terminateBcWorker(): void {
    if (BuildsOptimizerDI.bcWorker) {
      BuildsOptimizerDI.bcWorker.terminate();
      BuildsOptimizerDI.bcWorker = undefined;
    }
  }
}
