import { MainStatTypes } from './main-statistics';
import { SetNames } from './sets-with-effects';
import { SubStatsValues } from './sub-statistics';

export interface ArtifactData {
  id: string;
  set?: SetNames;
  level?: number;
  mainStatType?: MainStatTypes;
  subStats: SubStatsValues;
}
