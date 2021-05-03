import { createEntityAdapter, createReducer, EntityState } from '@reduxjs/toolkit';
import { BuildsComputationProgress } from '../../../domain/builds-computation';
import { Build } from '../../../domain/models/build';
import {
  addBuildsAction,
  buildsLimitReachedAction,
  buildsOptimizationDoneAction,
  removeAllBuildsAction,
  runBuildsOptimizerAction,
  updateBuildsComputationProgressAction,
} from './builds-action';

export interface BuildsState extends EntityState<Build> {
  newBuilds: Build[];
  isOptimizationRunning: boolean;
  buildsLimitReached: boolean;
  buildsComputationProgress?: BuildsComputationProgress;
}

export const buildsAdapter = createEntityAdapter<Build>();

const initialState: BuildsState = buildsAdapter.getInitialState({
  newBuilds: [],
  isOptimizationRunning: false,
  buildsLimitReached: false,
});

export const buildsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addBuildsAction, (state, { payload }) =>
      buildsAdapter.addMany(
        {
          ...state,
          newBuilds: payload,
        },
        payload,
      ),
    )
    .addCase(removeAllBuildsAction, (state) =>
      buildsAdapter.removeAll({
        ...state,
        buildsLimitReached: false,
        buildsComputationProgress: undefined,
      }),
    )
    .addCase(runBuildsOptimizerAction, (state) => ({
      ...state,
      isOptimizationRunning: true,
    }))
    .addCase(updateBuildsComputationProgressAction, (state, { payload }) => ({
      ...state,
      newBuilds: [],
      buildsComputationProgress: payload.buildsComputationProgress,
    }))
    .addCase(buildsLimitReachedAction, (state) => ({
      ...state,
      newBuilds: [],
      isOptimizationRunning: false,
      buildsLimitReached: true,
    }))
    .addCase(buildsOptimizationDoneAction, (state) => ({
      ...state,
      isOptimizationRunning: false,
      newBuilds: [],
    }))
    .addDefaultCase((state) => state);
});
