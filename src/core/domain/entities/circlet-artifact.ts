import { CircletMainStatType } from '../models/circlet-artifact-data';
import { MainStats } from '../models/main-statistics';
import { SubStats } from '../models/sub-statistics';
import { Artifact, ArtifactType } from './artifact';

export class CircletArtifact extends Artifact {
  public getType(): ArtifactType {
    return 'circlet';
  }

  public matchFiltersWithMain(mainStat?: CircletMainStatType, minLevel = 0, focusStats?: Array<SubStats | MainStats>): boolean {
    const focusAndMainStats = focusStats && mainStat ? [...focusStats, mainStat] : focusStats;
    const mainStatMatchFilter = !mainStat || Object.keys(this.mainStat)[0] === mainStat;
    return mainStatMatchFilter && this.matchFilters(minLevel, focusAndMainStats);
  }
}
