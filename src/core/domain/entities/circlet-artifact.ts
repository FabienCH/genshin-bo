import { CircletMainStatType } from '../models/circlet-artifact-data';
import { ArtifactStatsTypes } from '../models/main-statistics';
import { Artifact, ArtifactType } from './artifact';

export class CircletArtifact extends Artifact {
  public getType(): ArtifactType {
    return 'circlet';
  }

  public matchFiltersWithMain(minLevel: number, focusStats: ArtifactStatsTypes[], mainStat?: CircletMainStatType): boolean {
    const focusAndMainStats = focusStats && mainStat ? [...focusStats, mainStat] : focusStats;
    const mainStatMatchFilter = !mainStat || Object.keys(this.mainStat)[0] === mainStat;
    return mainStatMatchFilter && this.matchFilters(minLevel, focusAndMainStats);
  }
}
