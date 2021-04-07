import { createAction } from '@reduxjs/toolkit';
import { BuildsComputationProgress } from '../../../domain/builds-computation';
import { ArtifactData } from '../../../domain/models/artifact-data';
import { Build } from '../../../domain/models/build';
import { CharacterStatsValues } from '../../../domain/models/character-statistics';
import { ArtifactsMainStats, ArtifactStatsTypes, MainStatsValues } from '../../../domain/models/main-statistics';
import { SetNames } from '../../../domain/models/sets-with-effects';

export const addBuildsAction = createAction<Build[]>('[Entities/Builds] Add Builds');

export const removeAllBuildsAction = createAction('[Entities/Builds] Remove All Builds');

export const runBuildsOptimizerAction = createAction<{
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
}>('[Entities/Builds] Run Builds Optimizer');

export const updateBuildsComputationProgress = createAction<{ buildsComputationProgress: BuildsComputationProgress }>(
  '[Entities/Builds] Update Builds Progress',
);

export const buildsLimitReached = createAction('[Entities/Builds] Builds Limit Reached');

export const buildsOptimizationDone = createAction('[Entities/Builds] Builds Optimization Done');

export type BuildsActionTypes =
  | typeof addBuildsAction
  | typeof removeAllBuildsAction
  | typeof runBuildsOptimizerAction
  | typeof updateBuildsComputationProgress
  | typeof buildsLimitReached
  | typeof buildsOptimizationDone;
