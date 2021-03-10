import { createAction } from '@reduxjs/toolkit';
import { ArtifactData } from '../../../domain/models/artifact-data';

export const addAllArtifactsAction = createAction<ArtifactData[]>('[Entities/Artifacts] Add All Artifacts');

export type ArtifactsActionTypes = typeof addAllArtifactsAction;
