import { createAction } from '@reduxjs/toolkit';
import { BuildsComputationProgress } from '../../../domain/builds-computation';
import { ArtifactData } from '../../../domain/artifacts/models/artifact-data';
import { Build } from '../../../domain/models/build';
import { CharacterStatsValues } from '../../../domain/models/character-statistics';
import { MainStatsValues } from '../../../domain/artifacts/models/main-statistics';
import { ArtifactsFilters } from '../../../usescases/artifacts/artifacts-filter';

export const addBuildsAction = createAction<Build[]>('[Entities/Builds] Add Builds');

export const removeAllBuildsAction = createAction('[Entities/Builds] Remove All Builds');

export const runBuildsOptimizerAction = createAction<{
  allArtifacts: ArtifactData[];
  baseStats: CharacterStatsValues;
  characterBonusStat: MainStatsValues;
  artifactsFilters: ArtifactsFilters;
  statsFilter: Partial<CharacterStatsValues>;
}>('[Entities/Builds] Run Builds Optimizer');

export const cancelOptimizationAction = createAction('[Entities/Builds] Cancel Builds Optimizer');

export const updateBuildsComputationProgressAction = createAction<{ buildsComputationProgress: BuildsComputationProgress }>(
  '[Entities/Builds] Update Builds Progress',
);

export const buildsLimitReachedAction = createAction('[Entities/Builds] Builds Limit Reached');

export const buildsOptimizationDoneAction = createAction('[Entities/Builds] Builds Optimization Done');

export type BuildsActionTypes =
  | typeof addBuildsAction
  | typeof removeAllBuildsAction
  | typeof runBuildsOptimizerAction
  | typeof cancelOptimizationAction
  | typeof updateBuildsComputationProgressAction
  | typeof buildsLimitReachedAction
  | typeof buildsOptimizationDoneAction;
