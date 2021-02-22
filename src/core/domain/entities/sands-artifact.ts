import { MainStats } from '../models/main-statistics';
import { SandsMainStatType } from '../models/sands-artifact-data';
import { SubStats } from '../models/sub-statistics';
import { Artifact, ArtifactType } from './artifact';

export class SandsArtifact extends Artifact {
  public getType(): ArtifactType {
    return 'sands';
  }

  public matchFiltersWithMain(mainStat?: SandsMainStatType, minLevel = 0, focusStats?: Array<SubStats | MainStats>): boolean {
    const focusAndMainStats = focusStats && mainStat ? [...focusStats, mainStat] : focusStats;
    const mainStatMatchFilter = !mainStat || Object.keys(this.mainStat)[0] === mainStat;
    return mainStatMatchFilter && this.matchFilters(minLevel, focusAndMainStats);
  }
}
