import { MainStat, PossibleMainStats } from '../models/main-statistics';
import { SetNames } from '../models/sets-with-effects';
import { SubStatsValues } from '../models/sub-statistics';
import { Artifact } from './artifact';

export type SandsMainStatType =
  | PossibleMainStats.percentAtk
  | PossibleMainStats.percentDef
  | PossibleMainStats.percentHp
  | PossibleMainStats.elementalMastery
  | PossibleMainStats.energyRecharge;

export class SandsArtifact extends Artifact {
  public mainStat: MainStat;

  constructor(id: string, set: SetNames, subStats: SubStatsValues, level: number, mainStatType: SandsMainStatType) {
    super(id, set, subStats, level, mainStatType);
  }
}
