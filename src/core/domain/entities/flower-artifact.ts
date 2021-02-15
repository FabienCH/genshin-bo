import { MainStats } from '../models/main-statistics';
import { SetNames } from '../models/sets-with-effects';
import { SubStatsValues } from '../models/sub-statistics';
import { Artifact } from './artifact';

export class FlowerArtifact extends Artifact {
  public mainStat: { [MainStats.flatHp]: number };

  constructor(id: string, set: SetNames, subStats: SubStatsValues, level: number) {
    super(id, set, subStats, level, MainStats.flatHp);
  }
}
