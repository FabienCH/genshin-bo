import { BuildsComputation, BuildsResults } from '../core/domain/builds-computation';
import { BcMessage } from '../core/domain/worker/builds-computation.worker';

export class BcWorkerMock {
  public onmessage: (ev: { data: { buildsResults: BuildsResults } }) => any;
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.onmessage = () => {};
  }
  public postMessage(message: BcMessage, _?: PostMessageOptions | undefined): void {
    const { allArtifacts, baseStats, characterBonusStat, artifactsFilters, statsFilter } = message;
    const buildsComputation = new BuildsComputation();

    buildsComputation.getNewBuilds().subscribe((buildsResults) => {
      this.onmessage({ data: { buildsResults } });
    });
    buildsComputation.computeBuilds(allArtifacts, baseStats, characterBonusStat, artifactsFilters, statsFilter);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public terminate(): void {}
}
