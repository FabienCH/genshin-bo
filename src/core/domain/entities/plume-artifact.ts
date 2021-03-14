import { MainStats } from '../models/main-statistics';
import { SetNames } from '../models/sets-with-effects';
import { SubStatsValues } from '../models/sub-statistics';
import { Artifact, ArtifactType } from './artifact';

export class PlumeArtifact extends Artifact {
  public static readonly mainStat = MainStats.flatAtk;

  constructor(id: string, set: SetNames, subStats: SubStatsValues, level: number) {
    super(id, set, subStats, level, PlumeArtifact.mainStat);
  }

  public getType(): ArtifactType {
    return 'plume';
  }
}
