import { PossibleMainStats } from '../models/main-statistics';
import { SetNames } from '../models/sets-with-effects';
import { SubStatsValues } from '../models/sub-statistics';
import { Artifact } from './artifact';

export class PlumeArtifact extends Artifact {
  public mainStat: { [PossibleMainStats.flatAtk]: number };

  constructor(id: string, set: SetNames, subStats: SubStatsValues, level: number) {
    super(id, set, subStats, level, PossibleMainStats.flatAtk);
  }
}
