import { createSelector } from '@reduxjs/toolkit';
import { ArtifactData } from '../../../domain/models/artifact-data';
import { AppState } from '../reducer';
import { appStore } from '../store';
import { artifactsAdapter } from './artifacts-reducer';

const { selectAll } = artifactsAdapter.getSelectors();

const artifactsState = (state: AppState) => state.artifacts;

const isArtifactsInitializedSelector = createSelector(artifactsState, (state) => state.isInitialized);

const allArtifactsSelector = createSelector(artifactsState, selectAll);

export const selectAllArtifacts = (): ArtifactData[] => allArtifactsSelector(appStore.getState());

export const isArtifactsStateInitialized = (): boolean => isArtifactsInitializedSelector(appStore.getState());
