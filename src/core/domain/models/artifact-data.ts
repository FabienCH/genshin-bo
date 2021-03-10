import { ArtifactType } from '../entities/artifact';
import { CircletArtifactData } from './circlet-artifact-data';
import { GobletArtifactData } from './goblet-artifact-data';
import { MainStatTypes } from './main-statistics';
import { SandsArtifactData } from './sands-artifact-data';
import { SetNames } from './sets-with-effects';
import { SubStatsValues } from './sub-statistics';

export interface ArtifactData {
  id: string;
  type: ArtifactType;
  set: SetNames;
  level: number;
  mainStatType: MainStatTypes;
  subStats: SubStatsValues;
}

export interface AllArtifactsData {
  flowers: ArtifactData[];
  plumes: ArtifactData[];
  sands: SandsArtifactData[];
  goblets: GobletArtifactData[];
  circlets: CircletArtifactData[];
}
