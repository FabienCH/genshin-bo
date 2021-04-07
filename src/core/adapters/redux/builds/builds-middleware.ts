import { Artifact } from '../../../domain/entities/artifact';
import { CharacterStatsValues } from '../../../domain/models/character-statistics';
import { MainStatsValues } from '../../../domain/models/main-statistics';
import { appStore } from '../store';
import { addBuildsAction, removeAllBuildsAction } from './builds-action';
import { BuildsOptimizerDI } from '../../../di/builds-optimizer-di';
import { SetFilter } from '../../../domain/build-filter';

export function runBuildsOptimizer(
  allArtifacts: Artifact[][],
  baseStats: CharacterStatsValues,
  characterBonusStat: MainStatsValues,
  setFilter: SetFilter,
  statsFilter: Partial<CharacterStatsValues>,
): void {
  appStore.dispatch(removeAllBuildsAction());
  const bcWorker = BuildsOptimizerDI.getBcWorker();

  bcWorker.onmessage = ({ data }) => {
    if (data.builds) {
      appStore.dispatch(addBuildsAction(data.builds));
    }
  };
  bcWorker.postMessage({ allArtifacts, baseStats, characterBonusStat, setFilter, statsFilter });
}
