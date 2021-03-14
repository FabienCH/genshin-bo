import { createSelector } from '@reduxjs/toolkit';
import { ArtifactData } from '../../../domain/models/artifact-data';
import { AppState } from '../reducer';
import { appStore } from '../store';
import { artifactsAdapter } from './artifacts-reducer';

const artifactsState = (state: AppState) => state.artifacts;

const artifactsSelectors = artifactsAdapter.getSelectors(artifactsState);

const isArtifactsInitializedSelector = createSelector(artifactsState, (state) => state.isInitialized);

export const selectAllArtifacts = (): ArtifactData[] => artifactsSelectors.selectAll(appStore.getState());

export const selectArtifactById = (id: string): ArtifactData | undefined => artifactsSelectors.selectById(appStore.getState(), id);

export const isArtifactsStateInitialized = (): boolean => isArtifactsInitializedSelector(appStore.getState());
