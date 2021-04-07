import { BuildsComputation, BuildsResults } from '../builds-computation';
import { ArtifactData } from '../models/artifact-data';
import { CharacterStatsValues } from '../models/character-statistics';
import { ArtifactsMainStats, ArtifactStatsTypes, MainStatsValues } from '../models/main-statistics';
import { SetNames } from '../models/sets-with-effects';
import { Subject } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';

export type BcMessage = {
  allArtifacts: ArtifactData[];
  baseStats: CharacterStatsValues;
  characterBonusStat: MainStatsValues;
  artifactsFilters: {
    currentSets: SetNames[];
    setPieces: 2 | 4;
    mainsStats: ArtifactsMainStats;
    focusStats: ArtifactStatsTypes[];
    minArtifactLevel: number;
  };
  statsFilter: Partial<CharacterStatsValues>;
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
  const { allArtifacts, baseStats, characterBonusStat, artifactsFilters, statsFilter } = data;
  const buildsComputation = new BuildsComputation();
  const resultsEmitted: Subject<void> = new Subject<void>();

  buildsComputation
    .getNewBuilds()
    .pipe(takeUntil(resultsEmitted.pipe(debounceTime(1000))))
    .subscribe((buildsResults) => {
      resultsEmitted.next();
      self.postMessage({ buildsResults });
    });
  buildsComputation.computeBuilds(allArtifacts, baseStats, characterBonusStat, artifactsFilters, statsFilter);
});
