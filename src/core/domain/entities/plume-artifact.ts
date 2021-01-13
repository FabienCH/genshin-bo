import { PossibleMainStats } from '../models/main-statistics';
import { SetNames } from '../models/sets-with-effects';
import { SubStats } from '../models/sub-statistics';
import { Artifact } from './artifact';

export class PlumeArtifact extends Artifact {
  public mainStat: { [PossibleMainStats.flatAtk]: number };

  constructor(id: string, set: SetNames, subStats: SubStats, level: number) {
    super(id, set, subStats, level, PossibleMainStats.flatAtk);
  }
}
