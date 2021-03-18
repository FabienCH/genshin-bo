import { Artifact } from '../../../domain/entities/artifact';
import { CharacterStatsValues } from '../../../domain/models/character-statistics';
import { MainStatsValues } from '../../../domain/models/main-statistics';
import { appStore } from '../store';
import { addBuildsAction, removeAllBuildsAction } from './builds-action';
import { BuildOptimizerDI } from '../../../di/build-optimizer-di';
import { SetFilter } from '../../../domain/build-filter';

export function runBuildOptimizer(
  allArtifacts: Artifact[][],
  baseStats: CharacterStatsValues,
  characterBonusStat: MainStatsValues,
  setFilter: SetFilter,
  statsFilter: Partial<CharacterStatsValues>,
) {
  return (): void => {
    appStore.dispatch(removeAllBuildsAction());
    const bcWorker = BuildOptimizerDI.getBcWorker();

    bcWorker.onmessage = ({ data }) => {
      if (data.builds) {
        appStore.dispatch(addBuildsAction(data.builds));
      }
    };
    bcWorker.postMessage({ allArtifacts, baseStats, characterBonusStat, setFilter, statsFilter });
  };
}
