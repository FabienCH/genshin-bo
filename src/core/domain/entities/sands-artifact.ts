import { MainStat, MainStats } from '../models/main-statistics';
import { SandsMainStatType } from '../models/sands-artifact-data';
import { SetNames } from '../models/sets-with-effects';
import { SubStats, SubStatsValues } from '../models/sub-statistics';
import { Artifact } from './artifact';

export class SandsArtifact extends Artifact {
  public mainStat: MainStat;

  constructor(id: string, set: SetNames, subStats: SubStatsValues, level: number, mainStatType: SandsMainStatType) {
    super(id, set, subStats, level, mainStatType);
  }

  public matchFiltersWithMain(
    mainStat: SandsMainStatType,
    minLevel = 0,
    focusStats?: Array<SubStats | MainStats>,
  ): boolean {
    const focusAndMainStats = focusStats ? [...focusStats, mainStat] : focusStats;
    const mainStatMatchFilter = !mainStat || Object.keys(this.mainStat)[0] === mainStat;
    return mainStatMatchFilter && this.matchFilters(minLevel, focusAndMainStats);
  }
}
