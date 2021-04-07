import { createAction } from '@reduxjs/toolkit';
import { ArtifactData } from '../../../domain/models/artifact-data';

export const loadArtifactsActions = createAction('[Entities/Artifacts] Load Artifacts');

export const addAllArtifactsAction = createAction<ArtifactData[]>('[Entities/Artifacts] Add All Artifacts');

export const addOneArtifactAction = createAction<ArtifactData>('[Entities/Artifacts] Add One Artifact');

export const deleteAllArtifactsAction = createAction('[Entities/Artifacts] Delete All Artifact');

export const importArtifactsFromImagesAction = createAction<string[]>('[Entities/Artifacts] Import Artifacts From Images');

export type ArtifactsActionTypes =
  | typeof addAllArtifactsAction
  | typeof addOneArtifactAction
  | typeof importArtifactsFromImagesAction
  | typeof deleteAllArtifactsAction;
