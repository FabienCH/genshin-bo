import { ArtifactTypes } from '../models/artifact-types';
import { MainStat, PossibleMainStats } from '../models/main-statistics';
import { SubStats } from '../models/sub-statistics';

export class Artifact {
  public type: ArtifactTypes;
  public mainStat: MainStat;
  public subStats: SubStats;

  constructor(type: ArtifactTypes, subStats: SubStats, mainStatType?: PossibleMainStats) {
    this.type = type;
    this.subStats = subStats;

    if (this.type === 'flower') {
      this.mainStat = { [PossibleMainStats.flatHp]: 717 };
    } else if (this.type === 'plume') {
      this.mainStat = { [PossibleMainStats.flatAtk]: 47 };
    } else {
      let mainStatValue: number;
      if (mainStatType === PossibleMainStats.percentAtk || mainStatType === PossibleMainStats.geoDmg) {
        mainStatValue = 7;
      } else if (mainStatType === PossibleMainStats.elementalMastery) {
        mainStatValue = 28;
      } else {
        mainStatValue = 8.7;
      }
      this.mainStat = { [mainStatType]: mainStatValue };
    }
  }
}
