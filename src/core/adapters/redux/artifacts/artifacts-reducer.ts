import { createEntityAdapter, createReducer, EntityState } from '@reduxjs/toolkit';
import { ArtifactData } from '../../../domain/models/artifact-data';
import {
  addAllArtifactsAction,
  addOneArtifactAction,
  deleteAllArtifactsAction,
  importArtifactsDoneAction,
  importArtifactsFromVideoAction,
  runOcrOnImageAction,
} from './artifacts-action';

export interface ArtifactsState extends EntityState<ArtifactData> {
  isInitialized: boolean;
  isImportRunning: boolean;
  importedFramesFound: number;
}

export const artifactsAdapter = createEntityAdapter<ArtifactData>();

const initialState: ArtifactsState = artifactsAdapter.getInitialState({
  isInitialized: false,
  isImportRunning: false,
  importedFramesFound: 0,
});

export const artifactsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addAllArtifactsAction, (state, action) => artifactsAdapter.setAll(state, action.payload))
    .addCase(addOneArtifactAction, (state, action) => artifactsAdapter.addOne(state, action.payload))
    .addCase(deleteAllArtifactsAction, (state) => artifactsAdapter.removeAll(state))
    .addCase(importArtifactsFromVideoAction, (state) => ({ ...state, isImportRunning: true, importedFramesFound: 0 }))
    .addCase(importArtifactsDoneAction, (state) => ({ ...state, isImportRunning: false }))
    .addCase(runOcrOnImageAction, (state) => ({ ...state, importedFramesFound: state.importedFramesFound + 1 }))
    .addDefaultCase((state) => state);
});
