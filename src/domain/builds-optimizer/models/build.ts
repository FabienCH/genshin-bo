import { ArtifactType } from '../../artifacts/entities/artifact';
import { CharacterStatsValues } from './character-statistics';

export interface BuildArtifactParams {
  id: string;
  type: ArtifactType;
}

export interface Build {
  id: string;
  stats: CharacterStatsValues;
  buildArtifactsParams: BuildArtifactParams[];
}
