import { createEntityAdapter, createReducer, EntityState } from '@reduxjs/toolkit';
import { ArtifactData } from '../../../domain/models/artifact-data';
import {
  addAllArtifactsAction,
  addOneArtifactAction,
  deleteAllArtifactsAction,
  importArtifactsDoneAction,
  importArtifactsFromVideoAction,
} from './artifacts-action';

export interface ArtifactsState extends EntityState<ArtifactData> {
  isInitialized: boolean;
  isImportRunning: boolean;
}

export const artifactsAdapter = createEntityAdapter<ArtifactData>();

const initialState: ArtifactsState = artifactsAdapter.getInitialState({
  isInitialized: false,
  isImportRunning: false,
});

export const artifactsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addAllArtifactsAction, (state, action) => artifactsAdapter.setAll(state, action.payload))
    .addCase(addOneArtifactAction, (state, action) => artifactsAdapter.addOne(state, action.payload))
    .addCase(deleteAllArtifactsAction, (state) => artifactsAdapter.removeAll(state))
    .addCase(importArtifactsFromVideoAction, (state) => ({ ...state, isImportRunning: true }))
    .addCase(importArtifactsDoneAction, (state) => ({ ...state, isImportRunning: false }))
    .addDefaultCase((state) => state);
});
