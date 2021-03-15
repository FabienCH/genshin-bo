import { createEntityAdapter, createReducer, EntityState } from '@reduxjs/toolkit';
import { Build } from '../../../domain/models/build';
import { addBuildsAction, removeAllBuildsAction } from './builds-action';

export interface BuildsState extends EntityState<Build> {
  isOptimizationRunning: boolean;
}

export const buildsAdapter = createEntityAdapter<Build>();

const initialState: BuildsState = buildsAdapter.getInitialState({
  isOptimizationRunning: false,
});

export const buildsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addBuildsAction, (state, action) => buildsAdapter.addMany(state, action.payload))
    .addCase(removeAllBuildsAction, (state) => buildsAdapter.removeAll(state))
    .addDefaultCase((state) => state);
});
