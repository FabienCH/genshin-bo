import { createSelector } from '@reduxjs/toolkit';
import { BuildsComputationProgress } from '../../../domain/builds-optimizer/builds-computation';
import { Build } from '../../../domain/builds-optimizer/models/build';
import { CharacterStatsValues } from '../../../domain/builds-optimizer/models/character-statistics';
import { AppState } from '../reducer';
import { appStore } from '../store';
import { buildsAdapter } from './builds-reducer';

const buildsState = (state: AppState) => state.builds;

const buildsSelectors = buildsAdapter.getSelectors(buildsState);

const newBuildsSelector = createSelector(buildsState, (state) => state.newBuilds);

const isOptimizationRunningSelector = createSelector(buildsState, (state) => state.isOptimizationRunning);

const buildsLimitReachedSelector = createSelector(buildsState, (state) => state.buildsLimitReached);

const buildsComputationProgressSelector = createSelector(buildsState, (state) => state.buildsComputationProgress);

const optimizationStatsFilterSelector = createSelector(buildsState, (state) => state.statsFilter);

export const selectAllBuilds = (): Build[] => buildsSelectors.selectAll(appStore.getState());

export const selectNewBuilds = (): Build[] => newBuildsSelector(appStore.getState());

export const isOptimizationRunning = (): boolean => isOptimizationRunningSelector(appStore.getState());

export const buildsLimitReached = (): boolean => buildsLimitReachedSelector(appStore.getState());

export const buildsComputationProgress = (): BuildsComputationProgress | undefined =>
  buildsComputationProgressSelector(appStore.getState());

export const optimizationStatsFilter = (): Partial<CharacterStatsValues> | undefined =>
  optimizationStatsFilterSelector(appStore.getState());
