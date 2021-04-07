import { createEntityAdapter, createReducer, EntityState } from '@reduxjs/toolkit';
import { BuildsComputationProgress } from '../../../domain/builds-computation';
import { Build } from '../../../domain/models/build';
import { addBuildsAction, removeAllBuildsAction, updateBuildsComputationProgress } from './builds-action';

export interface BuildsState extends EntityState<Build> {
  isOptimizationRunning: boolean;
  buildsComputationProgress?: BuildsComputationProgress;
}

export const buildsAdapter = createEntityAdapter<Build>();

const initialState: BuildsState = buildsAdapter.getInitialState({
  isOptimizationRunning: false,
});

export const buildsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addBuildsAction, (state, { payload }) => buildsAdapter.addMany(state, payload))
    .addCase(removeAllBuildsAction, (state) => buildsAdapter.removeAll(state))
    .addCase(updateBuildsComputationProgress, (state, { payload }) => ({
      ...state,
      buildsComputationProgress: payload.buildsComputationProgress,
    }))
    .addDefaultCase((state) => state);
});
