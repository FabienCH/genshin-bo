import { createEntityAdapter, createReducer, EntityState } from '@reduxjs/toolkit';
import { ArtifactData } from '../../../domain/models/artifact-data';
import { addAllArtifactsAction, addOneArtifactAction, deleteAllArtifactsAction } from './artifacts-action';

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
    .addCase(addOneArtifactAction, (state, action) => artifactsAdapter.addOne(state, action.payload))
    .addCase(deleteAllArtifactsAction, (state) => artifactsAdapter.removeAll(state))
    .addDefaultCase((state) => state);
});
