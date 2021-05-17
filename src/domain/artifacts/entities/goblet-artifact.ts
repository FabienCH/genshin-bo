import { GobletMainStatType } from '../models/goblet-artifact-data';
import { ArtifactStatsTypes } from '../models/main-statistics';
import { Artifact, ArtifactType } from './artifact';

export class GobletArtifact extends Artifact {
  public getType(): ArtifactType {
    return ArtifactType.goblet;
  }

  public matchFiltersWithMain(
    minLevel: number,
    focusStats: ArtifactStatsTypes[],
    hasFourSubs: boolean,
    mainStat?: GobletMainStatType,
  ): boolean {
    const focusAndMainStats = focusStats && mainStat ? [...focusStats, mainStat] : focusStats;
    const mainStatMatchFilter = !mainStat || Object.keys(this.mainStat)[0] === mainStat;
    return mainStatMatchFilter && this.matchFilters(minLevel, focusAndMainStats, hasFourSubs);
  }
}
