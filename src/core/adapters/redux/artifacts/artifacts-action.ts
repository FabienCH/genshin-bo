import { createAction } from '@reduxjs/toolkit';
import { FrameData } from '../../../domain/mappers/video-to-frames';
import { ArtifactData } from '../../../domain/models/artifact-data';

export const loadArtifactsActions = createAction('[Entities/Artifacts] Load Artifacts');

export const addAllArtifactsAction = createAction<ArtifactData[]>('[Entities/Artifacts] Add All Artifacts');

export const addOneArtifactAction = createAction<ArtifactData>('[Entities/Artifacts] Add One Artifact');

export const saveAllArtifactsAction = createAction('[Entities/Artifacts] Save All Artifacts');

export const deleteAllArtifactsAction = createAction('[Entities/Artifacts] Delete All Artifacts');

export const importArtifactsFromVideoAction = createAction('[Entities/Artifacts] Import From Video');

export const importArtifactsDoneAction = createAction('[Entities/Artifacts] Import Artifacts Done');

export const runOcrOnImageAction = createAction<FrameData>('[Entities/Artifacts] Run OCR On Image');

export type ArtifactsActionTypes =
  | typeof addAllArtifactsAction
  | typeof addOneArtifactAction
  | typeof runOcrOnImageAction
  | typeof saveAllArtifactsAction
  | typeof deleteAllArtifactsAction
  | typeof importArtifactsFromVideoAction
  | typeof importArtifactsDoneAction;
