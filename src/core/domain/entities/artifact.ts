import { ArtifactTypes } from '../models/artifact-types';
import { MainStat, PossibleMainStats } from '../models/main-statistics';
import { SubStats } from '../models/sub-statistics';

export class Artifact {
  public type: ArtifactTypes;
  public level: number;
  public mainStat: MainStat;
  public subStats: SubStats;

  private readonly mainStatPossibleValues = [
    {
      stats: [
        PossibleMainStats.percentAtk,
        PossibleMainStats.percentHp,
        PossibleMainStats.pyroDmg,
        PossibleMainStats.dendroDmg,
        PossibleMainStats.electroDmg,
        PossibleMainStats.anemoDmg,
        PossibleMainStats.cryoDmg,
        PossibleMainStats.geoDmg,
      ],
      value: 7,
    },
    {
      stats: [PossibleMainStats.percentDef, PossibleMainStats.physicalDmg],
      value: 8.7,
    },
    {
      stats: [PossibleMainStats.elementalMastery],
      value: 28,
    },
    {
      stats: [PossibleMainStats.energyRecharge],
      value: 7.8,
    },
    {
      stats: [PossibleMainStats.critRate],
      value: 4.7,
    },
    {
      stats: [PossibleMainStats.cryoDmg],
      value: 9.3,
    },
    {
      stats: [PossibleMainStats.healingBonus],
      value: 5.4,
    },
  ];

  constructor(type: ArtifactTypes, subStats: SubStats, level?: number, mainStatType?: PossibleMainStats) {
    this.type = type;
    this.level = level ? level : 0;
    this.subStats = subStats;

    if (this.type === 'flower') {
      this.mainStat = { [PossibleMainStats.flatHp]: 717 };
    } else if (this.type === 'plume') {
      this.mainStat = { [PossibleMainStats.flatAtk]: 47 };
    } else {
      const mainStatValue: number = this.mainStatPossibleValues.find((mainStatPossibleValue) =>
        mainStatPossibleValue.stats.includes(mainStatType),
      ).value;
      this.mainStat = { [mainStatType]: mainStatValue };
    }
  }
}
