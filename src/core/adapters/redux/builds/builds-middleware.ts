import { Artifact } from '../../../domain/entities/artifact';
import { CharacterStatsValues } from '../../../domain/models/character-statistics';
import { MainStatsValues } from '../../../domain/models/main-statistics';
import { SetNames } from '../../../domain/models/sets-with-effects';
import { appStore } from '../store';
import { addBuildsAction, removeAllBuildsAction } from './builds-action';
import { v4 as uuidv4 } from 'uuid';
import { BuildOptimizerDI } from '../../../di/build-optimizer-di';

export function runBuildOptimizer(
  allArtifacts: Artifact[][],
  baseStats: CharacterStatsValues,
  characterBonusStat: MainStatsValues,
  setFilter: {
    setNames: SetNames[];
    pieces: 2 | 4;
  },
  statsFilter: Partial<CharacterStatsValues>,
) {
  return (): void => {
    appStore.dispatch(removeAllBuildsAction());
    const bcWorker = BuildOptimizerDI.getBcWorker();

    bcWorker.onmessage = ({ data }) => {
      if (data.builds) {
        appStore.dispatch(addBuildsAction(data.builds.map((build: CharacterStatsValues) => ({ ...build, id: uuidv4() }))));
      }
    };
    bcWorker.postMessage({ allArtifacts, baseStats, characterBonusStat, setFilter, statsFilter });
  };
}
