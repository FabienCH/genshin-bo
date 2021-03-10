import { createEntityAdapter, createReducer, EntityState } from '@reduxjs/toolkit';
import { ArtifactData } from '../../../domain/models/artifact-data';
import { addAllArtifactsAction } from './artifacts-action';

export interface ArtifactsState extends EntityState<ArtifactData> {
  isInitialized: boolean;
}

export const artifactsAdapter = createEntityAdapter<ArtifactData>();

const initialState: ArtifactsState = artifactsAdapter.getInitialState({
  isInitialized: false,
});

export const artifactsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addAllArtifactsAction, (state, action) => artifactsAdapter.setAll(state, action.payload))
    .addDefaultCase((state) => state);
});
