import { GobletMainStatType } from '../models/goblet-artifact-data';
import { MainStat, PossibleMainStats } from '../models/main-statistics';
import { SetNames } from '../models/sets-with-effects';
import { PossibleSubStats, SubStatsValues } from '../models/sub-statistics';
import { Artifact } from './artifact';

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
