import { ArtifactTypes } from '../models/artifact-types';
import { MainStat } from '../models/main-statistics';
import { SubStats } from '../models/sub-statistics';

export class Artifact {
  public type: ArtifactTypes;
  public mainStat: MainStat;
  public subStats: SubStats;

  constructor(type: ArtifactTypes, mainStat: MainStat, subStats: SubStats) {
    this.type = type;
    this.mainStat = mainStat;
    this.subStats = subStats;
  }
}
