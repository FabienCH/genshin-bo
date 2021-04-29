import { createEntityAdapter, createReducer, EntityState } from '@reduxjs/toolkit';
import { BuildsComputationProgress } from '../../../domain/builds-computation';
import { Build } from '../../../domain/models/build';
import { addBuildsAction, buildsLimitReachedAction, removeAllBuildsAction, updateBuildsComputationProgressAction } from './builds-action';

export interface BuildsState extends EntityState<Build> {
  isOptimizationRunning: boolean;
  buildsLimitReached: boolean;
  buildsComputationProgress?: BuildsComputationProgress;
}

export const buildsAdapter = createEntityAdapter<Build>();

const initialState: BuildsState = buildsAdapter.getInitialState({
  isOptimizationRunning: false,
  buildsLimitReached: false,
});

export const buildsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addBuildsAction, (state, { payload }) => buildsAdapter.addMany(state, payload))
    .addCase(removeAllBuildsAction, (state) =>
      buildsAdapter.removeAll({
        ...state,
        buildsLimitReached: false,
        buildsComputationProgress: undefined,
      }),
    )
    .addCase(updateBuildsComputationProgressAction, (state, { payload }) => ({
      ...state,
      buildsComputationProgress: payload.buildsComputationProgress,
    }))
    .addCase(buildsLimitReachedAction, (state) => ({
      ...state,
      buildsLimitReached: true,
    }))
    .addDefaultCase((state) => state);
});
