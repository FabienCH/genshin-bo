import { MainStats } from '../models/main-statistics';
import { SetNames } from '../models/sets-with-effects';
import { SubStatsValues } from '../models/sub-statistics';
import { Artifact, ArtifactType } from './artifact';

export class FlowerArtifact extends Artifact {
  constructor(id: string, set: SetNames, subStats: SubStatsValues, level: number) {
    super(id, set, subStats, level, MainStats.flatHp);
  }

  public getType(): ArtifactType {
    return 'flower';
  }
}
