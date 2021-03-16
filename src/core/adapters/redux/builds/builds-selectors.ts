import { createSelector } from '@reduxjs/toolkit';
import { Build } from '../../../domain/models/build';
import { AppState } from '../reducer';
import { appStore } from '../store';
import { buildsAdapter } from './builds-reducer';

const buildsState = (state: AppState) => state.builds;

const buildsSelectors = buildsAdapter.getSelectors(buildsState);

const isOptimizationRunningSelector = createSelector(buildsState, (state) => state.isOptimizationRunning);

export const selectAllBuilds = (): Build[] => buildsSelectors.selectAll(appStore.getState());

export const isOptimizationRunning = (): boolean => isOptimizationRunningSelector(appStore.getState());
