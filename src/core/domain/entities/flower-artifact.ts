import { MainStats } from '../models/main-statistics';
import { SetNames } from '../models/sets-with-effects';
import { SubStatsValues } from '../models/sub-statistics';
import { Artifact, ArtifactType } from './artifact';

export class FlowerArtifact extends Artifact {
  public static readonly mainStat = MainStats.flatHp;

  constructor(id: string, set: SetNames, subStats: SubStatsValues, level: number, mainStatValueFromOcr?: number) {
    super(id, set, subStats, level, FlowerArtifact.mainStat, mainStatValueFromOcr);
  }

  public getType(): ArtifactType {
    return ArtifactType.flower;
  }
}
