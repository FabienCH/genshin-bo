import { createSelector } from '@reduxjs/toolkit';
import { AppState } from '../reducer';
import { artifactsAdapter } from './artifacts-reducer';

const { selectAll } = artifactsAdapter.getSelectors();

const artifactsState = (state: AppState) => state.artifacts;

export const selectAllArtifacts = createSelector(artifactsState, selectAll);

export const isArtifactsStateInitialized = createSelector(artifactsState, (state) => state.isInitialized);
