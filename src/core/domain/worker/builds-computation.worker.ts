import { BuildsComputation } from '../builds-computation';
import { Artifact } from '../entities/artifact';
import { CharacterStatsValues } from '../models/character-statistics';
import { MainStatsValues } from '../models/main-statistics';
import { SetNames } from '../models/sets-with-effects';

export type BcMessage = {
  allArtifacts: Artifact[][];
  baseStats: CharacterStatsValues;
  characterBonusStat: MainStatsValues;
  setFilter: {
    setNames: SetNames[];
    pieces: 2 | 4;
  };
  statsFilter: Partial<CharacterStatsValues>;
};

export interface BcWorker {
  onmessage: ((this: Worker, ev: MessageEvent<{ builds: CharacterStatsValues[] }>) => any) | null;
  postMessage(message: BcMessage, options?: PostMessageOptions | undefined): void;
}

export default {} as typeof Worker & { new (): Worker };

declare const self: Worker;

type BoMessageEvent = MessageEvent<BcMessage>;

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', ({ data }: BoMessageEvent) => {
  const { allArtifacts, baseStats, characterBonusStat, setFilter, statsFilter } = data;
  const buildsComputation = new BuildsComputation();

  buildsComputation.getBuilds().subscribe((builds) => {
    self.postMessage({ builds });
  });
  buildsComputation.computeBuilds(allArtifacts, baseStats, characterBonusStat, setFilter, statsFilter);
});
