import { createEntityAdapter, createReducer, EntityState, isAnyOf } from '@reduxjs/toolkit';
import { BuildsComputationProgress } from '../../../domain/builds-optimizer/builds-computation';
import { Build } from '../../../domain/builds-optimizer/models/build';
import { CharacterStatsValues } from '../../../domain/builds-optimizer/models/character-statistics';
import {
  addBuildsAction,
  buildsLimitReachedAction,
  buildsOptimizationDoneAction,
  cancelOptimizationAction,
  removeAllBuildsAction,
  runBuildsOptimizerAction,
  updateBuildsComputationProgressAction,
} from './builds-action';

export interface BuildsState extends EntityState<Build> {
  newBuilds: Build[];
  isOptimizationRunning: boolean;
  buildsLimitReached: boolean;
  statsFilter?: Partial<CharacterStatsValues>;
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
    .addCase(runBuildsOptimizerAction, (state, { payload }) => ({
      ...state,
      statsFilter: payload.statsFilter,
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
    .addMatcher(isAnyOf(buildsOptimizationDoneAction, cancelOptimizationAction), (state) => ({
      ...state,
      isOptimizationRunning: false,
      newBuilds: [],
    }))
    .addDefaultCase((state) => state);
});
