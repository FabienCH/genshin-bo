import { MainStat, PossibleMainStats } from '../models/main-statistics';
import { SetNames } from '../models/sets-with-effects';
import { PossibleSubStats, SubStatsValues } from '../models/sub-statistics';
import { Artifact } from './artifact';

export type GobletMainStatType =
  | PossibleMainStats.percentAtk
  | PossibleMainStats.percentDef
  | PossibleMainStats.percentHp
  | PossibleMainStats.elementalMastery
  | PossibleMainStats.anemoDmg
  | PossibleMainStats.cryoDmg
  | PossibleMainStats.dendroDmg
  | PossibleMainStats.electroDmg
  | PossibleMainStats.geoDmg
  | PossibleMainStats.hydroDmg
  | PossibleMainStats.pyroDmg
  | PossibleMainStats.physicalDmg;

export class GobletArtifact extends Artifact {
  public mainStat: MainStat;
  constructor(id: string, set: SetNames, subStats: SubStatsValues, level: number, mainStatType: GobletMainStatType) {
    super(id, set, subStats, level, mainStatType);
  }

  public matchFiltersWithMain(
    mainStat: GobletMainStatType,
    minLevel = 0,
    focusStats?: Array<PossibleSubStats | PossibleMainStats>,
  ): boolean {
    const focusAndMainStats = focusStats ? [...focusStats, mainStat] : focusStats;
    const mainStatMatchFilter = !mainStat || Object.keys(this.mainStat)[0] === mainStat;
    return mainStatMatchFilter && this.matchFilters(minLevel, focusAndMainStats);
  }
}
