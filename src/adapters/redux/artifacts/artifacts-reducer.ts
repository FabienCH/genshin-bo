import { createEntityAdapter, createReducer, EntityState } from '@reduxjs/toolkit';
import { ArtifactData } from '../../../domain/artifacts/models/artifact-data';
import {
  addAllArtifactsAction,
  addManyArtifactAction,
  addOneArtifactAction,
  deleteAllArtifactsAction,
  importArtifactsDoneAction,
  importArtifactsFromVideoAction,
  incrementArtifactsInError,
  runOcrOnImageAction,
} from './artifacts-action';

export interface ImportInfos {
  foundFrames: number;
  importedArtifacts: number;
  artifactsInError: number;
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
  importInfos: { foundFrames: 0, importedArtifacts: 0, artifactsInError: 0 },
});

export const artifactsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addAllArtifactsAction, (state, action) =>
      artifactsAdapter.setAll(
        {
          ...state,
          isInitialized: true,
        },
        action.payload,
      ),
    )
    .addCase(addOneArtifactAction, (state, action) => ({
      ...artifactsAdapter.addOne(
        {
          ...state,
          importInfos: {
            ...state.importInfos,
            importedArtifacts: state.importInfos.importedArtifacts + 1,
          },
        },
        action.payload,
      ),
    }))
    .addCase(addManyArtifactAction, (state, action) => artifactsAdapter.addMany(state, action.payload))
    .addCase(deleteAllArtifactsAction, (state) => artifactsAdapter.removeAll(state))
    .addCase(importArtifactsFromVideoAction, (state) => ({
      ...state,
      isImportRunning: true,
      importInfos: { foundFrames: 0, importedArtifacts: 0, artifactsInError: 0 },
    }))
    .addCase(incrementArtifactsInError, (state) => ({
      ...state,
      importInfos: {
        ...state.importInfos,
        artifactsInError: state.importInfos.artifactsInError + 1,
      },
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
