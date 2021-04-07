import { BcWorkerMock } from '../../test/builds-computation-worker-mock';
import { InMemoryCharactersRepository } from '../adapters/secondaries/in-memory-characters-repository';
import { InMemoryWeaponsRepository } from '../adapters/secondaries/in-memory-weapons-repository';
import BuildsComputationWorker, { BcWorker } from '../domain/worker/builds-computation.worker';
import { BuildsFormsHandler } from '../usescases/builds-forms-handler';
import { BuildsOptimizer } from '../usescases/builds-optimizer';

export abstract class BuildsOptimizerDI {
  public static buildsFormsHandler = new BuildsFormsHandler(new InMemoryWeaponsRepository());
  private static buildsOptimizer: BuildsOptimizer;

  public static getBuildsOptimizer(): BuildsOptimizer {
    if (!BuildsOptimizerDI.buildsOptimizer) {
      BuildsOptimizerDI.buildsOptimizer = new BuildsOptimizer(new InMemoryCharactersRepository(), new InMemoryWeaponsRepository());
    }
    return BuildsOptimizerDI.buildsOptimizer;
  }

  public static getBcWorker(): BcWorker {
    switch (process.env.NODE_ENV) {
      case 'test':
        return new BcWorkerMock();
      default:
        return new BuildsComputationWorker();
    }
  }
}
