import { ArtifactStatsTypes } from '../models/main-statistics';
import { SandsMainStatType } from '../models/sands-artifact-data';
import { Artifact, ArtifactType } from './artifact';

export class SandsArtifact extends Artifact {
  public getType(): ArtifactType {
    return 'sands';
  }

  public matchFiltersWithMain(minLevel: number, focusStats: ArtifactStatsTypes[], mainStat?: SandsMainStatType): boolean {
    const focusAndMainStats = focusStats && mainStat ? [...focusStats, mainStat] : focusStats;
    const mainStatMatchFilter = !mainStat || Object.keys(this.mainStat)[0] === mainStat;
    return mainStatMatchFilter && this.matchFilters(minLevel, focusAndMainStats);
  }
}
