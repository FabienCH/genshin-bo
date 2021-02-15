import { CircletMainStatType } from '../models/circlet-artifact-data';
import { MainStat, MainStats } from '../models/main-statistics';
import { SetNames } from '../models/sets-with-effects';
import { SubStats, SubStatsValues } from '../models/sub-statistics';
import { Artifact } from './artifact';

export class CircletArtifact extends Artifact {
  public mainStat: MainStat;
  constructor(id: string, set: SetNames, subStats: SubStatsValues, level: number, mainStatType: CircletMainStatType) {
    super(id, set, subStats, level, mainStatType);
  }

  public matchFiltersWithMain(
    mainStat: CircletMainStatType,
    minLevel = 0,
    focusStats?: Array<SubStats | MainStats>,
  ): boolean {
    const focusAndMainStats = focusStats ? [...focusStats, mainStat] : focusStats;
    const mainStatMatchFilter = !mainStat || Object.keys(this.mainStat)[0] === mainStat;
    return mainStatMatchFilter && this.matchFilters(minLevel, focusAndMainStats);
  }
}
