import { MainStat } from '../models/main-statistics';
import { SubStats } from '../models/sub-statistics';

export class Artifact {
  public mainStat: MainStat;
  public subStats: SubStats;

  constructor(mainStat: MainStat, subStats: SubStats) {
    this.mainStat = mainStat;
    this.subStats = subStats;
  }
}
