import { CharacterStatsValues } from './character-statistics';

export interface Build {
  id: string;
  stats: CharacterStatsValues;
  artifactIds: string[];
}
