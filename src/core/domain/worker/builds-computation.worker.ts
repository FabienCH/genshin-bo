import { SetFilter } from '../build-filter';
import { BuildsComputation } from '../builds-computation';
import { Artifact } from '../entities/artifact';
import { CharacterStatsValues } from '../models/character-statistics';
import { MainStatsValues } from '../models/main-statistics';

export type BcMessage = {
  allArtifacts: Artifact[][];
  baseStats: CharacterStatsValues;
  characterBonusStat: MainStatsValues;
  setFilter: SetFilter;
  statsFilter: Partial<CharacterStatsValues>;
};

export interface BcWorker {
  onmessage: ((this: Worker, ev: MessageEvent<{ builds: CharacterStatsValues[] }>) => any) | null;
  postMessage(message: BcMessage, options?: PostMessageOptions | undefined): void;
}

export default {} as typeof Worker & { new (): Worker };

declare const self: Worker;

type BcMessageEvent = MessageEvent<BcMessage>;

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', ({ data }: BcMessageEvent) => {
  const { allArtifacts, baseStats, characterBonusStat, setFilter, statsFilter } = data;
  const buildsComputation = new BuildsComputation();

  buildsComputation.getBuilds().subscribe((builds) => {
    self.postMessage({ builds });
  });
  buildsComputation.computeBuilds(allArtifacts, baseStats, characterBonusStat, setFilter, statsFilter);
});
