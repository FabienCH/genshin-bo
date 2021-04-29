import { createSelector } from '@reduxjs/toolkit';
import { BuildsComputationProgress } from '../../../domain/builds-computation';
import { Build } from '../../../domain/models/build';
import { AppState } from '../reducer';
import { appStore } from '../store';
import { buildsAdapter } from './builds-reducer';

const buildsState = (state: AppState) => state.builds;

const buildsSelectors = buildsAdapter.getSelectors(buildsState);

const isOptimizationRunningSelector = createSelector(buildsState, (state) => state.isOptimizationRunning);
const buildsLimitReachedSelector = createSelector(buildsState, (state) => state.buildsLimitReached);

const buildsComputationProgressSelector = createSelector(buildsState, (state) => state.buildsComputationProgress);

export const selectAllBuilds = (): Build[] => buildsSelectors.selectAll(appStore.getState());

export const isOptimizationRunning = (): boolean => isOptimizationRunningSelector(appStore.getState());

export const buildsLimitReached = (): boolean => buildsLimitReachedSelector(appStore.getState());

export const buildsComputationProgress = (): BuildsComputationProgress | undefined =>
  buildsComputationProgressSelector(appStore.getState());
