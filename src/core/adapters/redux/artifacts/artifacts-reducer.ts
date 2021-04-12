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

export interface ImportInfos {
  foundFrames: number;
  importedArtifacts: number;
}

export interface ArtifactsState extends EntityState<ArtifactData> {
  isInitialized: boolean;
  isImportRunning: boolean;
  importInfos: ImportInfos;
}

export const artifactsAdapter = createEntityAdapter<ArtifactData>();

const initialState: ArtifactsState = artifactsAdapter.getInitialState({
  isInitialized: false,
  isImportRunning: false,
  importInfos: { foundFrames: 0, importedArtifacts: 0 },
});

export const artifactsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addAllArtifactsAction, (state, action) => artifactsAdapter.setAll(state, action.payload))
    .addCase(addOneArtifactAction, (state, action) => ({
      ...artifactsAdapter.addOne(
        {
          ...state,
          importInfos: {
            ...state.importInfos,
            artifactsFound: state.importInfos.importedArtifacts + 1,
          },
        },
        action.payload,
      ),
    }))
    .addCase(deleteAllArtifactsAction, (state) => artifactsAdapter.removeAll(state))
    .addCase(importArtifactsFromVideoAction, (state) => ({
      ...state,
      isImportRunning: true,
      importInfos: { foundFrames: 0, importedArtifacts: 0 },
    }))
    .addCase(importArtifactsDoneAction, (state) => ({ ...state, isImportRunning: false }))
    .addCase(runOcrOnImageAction, (state) => ({
      ...state,
      importInfos: {
        ...state.importInfos,
        foundFrames: state.importInfos.foundFrames + 1,
      },
    }))
    .addDefaultCase((state) => state);
});
