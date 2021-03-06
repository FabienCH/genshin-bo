import { ArtifactsFilters } from '../../../usescases/artifacts/artifacts-filter';
import { BuildsComputation, BuildsResults } from '../builds-computation';
import { ArtifactData } from '../../artifacts/models/artifact-data';
import { CharacterStatsValues } from '../models/character-statistics';
import { MainStatsValues } from '../../artifacts/models/main-statistics';

export type BcMessage = {
  allArtifacts: ArtifactData[];
  baseStats: CharacterStatsValues;
  characterBonusStat: MainStatsValues;
  artifactsFilters: ArtifactsFilters;
  statsFilter: Partial<CharacterStatsValues>;
  artifactLevelUp?: 16 | 20;
};

export interface BcWorker {
  onmessage: ((this: Worker, ev: MessageEvent<{ buildsResults: BuildsResults }>) => any) | null;
  postMessage(message: BcMessage, options?: PostMessageOptions | undefined): void;
  terminate(): void;
}

export default {} as typeof Worker & { new (): Worker };

declare const self: Worker;

type BcMessageEvent = MessageEvent<BcMessage>;

// eslint-disable-next-line no-restricted-globals
self.addEventListener('message', ({ data }: BcMessageEvent) => {
  const { allArtifacts, baseStats, characterBonusStat, artifactsFilters, statsFilter, artifactLevelUp } = data;
  const buildsComputation = new BuildsComputation();

  buildsComputation.getNewBuilds().subscribe((buildsResults) => {
    self.postMessage({ buildsResults });
  });
  buildsComputation.computeBuilds(allArtifacts, baseStats, characterBonusStat, artifactsFilters, statsFilter, artifactLevelUp);
});
