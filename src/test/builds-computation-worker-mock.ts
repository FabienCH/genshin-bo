import { BuildsComputation } from '../core/domain/builds-computation';
import { Build } from '../core/domain/models/build';
import { BcMessage } from '../core/domain/worker/builds-computation.worker';

export class BcWorkerMock {
  public onmessage: (ev: { data: { builds: Build[] } }) => any;
  constructor() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    this.onmessage = () => {};
  }
  public postMessage(message: BcMessage, _?: PostMessageOptions | undefined): void {
    const { allArtifacts, baseStats, characterBonusStat, setFilter, statsFilter } = message;
    const buildsComputation = new BuildsComputation();

    buildsComputation.getBuilds().subscribe((builds) => {
      this.onmessage({ data: { builds } });
    });
    buildsComputation.computeBuilds(allArtifacts, baseStats, characterBonusStat, setFilter, statsFilter);
  }
}
