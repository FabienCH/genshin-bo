import { MainStat, PossibleMainStats, PossibleMainStatTypes } from '../models/main-statistics';
import { SetNames } from '../models/sets-with-effects';
import { SubStats } from '../models/sub-statistics';

export class Artifact {
  public id: string;
  public set: SetNames;
  public level: number;
  public mainStat: MainStat;
  public subStats: SubStats;

  protected readonly mainStatPossibleValues: { stats: Array<PossibleMainStatTypes>; values: number[] }[] = [
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
      values: [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    },
    {
      stats: [PossibleMainStats.percentDef, PossibleMainStats.physicalDmg],
      values: [8.7, 11.2, 13.7, 16.2, 28.6, 21.1, 23.6, 26.1, 28.6, 31, 33.5, 36, 38.5, 40.9, 43.4, 45.9, 48.4, 50.8, 53.3, 55.8, 58.3],
    },
    {
      stats: [PossibleMainStats.elementalMastery],
      values: [28, 36, 44, 52, 60, 68, 76, 84, 91, 99, 107, 115, 123, 131, 139, 147, 155, 163, 171, 179, 187],
    },
    {
      stats: [PossibleMainStats.energyRecharge],
      values: [7.8, 10, 12.2, 14.4, 16.6, 18.8, 21, 23.2, 25.4, 27.6, 29.8, 32, 34.2, 36.4, 38.6, 40.8, 43, 45.2, 47.4, 49.6, 51.8],
    },
    {
      stats: [PossibleMainStats.critRate],
      values: [4.7, 6, 7.4, 8.7, 10.0, 11.4, 12.7, 14, 15.4, 16.7, 18, 19.3, 20.7, 22, 23.3, 24.7, 26, 27.3, 28.7, 30, 31.1],
    },
    {
      stats: [PossibleMainStats.critDmg],
      values: [9.3, 11.9, 14.6, 17.2, 19.9, 22.5, 25.5, 27.8, 30.5, 33.1, 35.8, 38.4, 41.1, 43.7, 46.3, 49, 51.6, 54.3, 56.9, 59.6, 62.2],
    },
    {
      stats: [PossibleMainStats.healingBonus],
      values: [5.4, 6.9, 8.4, 10, 11.5, 13, 14.5, 16.1, 17.6, 19.1, 20.6, 22.2, 23.7, 25.2, 26.7, 28.3, 29.8, 31.3, 32.8, 34.4, 35.9],
    },
    {
      stats: [PossibleMainStats.flatHp],
      values: [717, 920, 1123, 1326, 1530, 1733, 1936, 2139, 2342, 2545, 2749, 2952, 3155, 3358, 3561, 3764, 3967, 4171, 4374, 4577],
    },
    {
      stats: [PossibleMainStats.flatAtk],
      values: [47, 60, 73, 86, 100, 113, 126, 139, 152, 166, 179, 192, 205, 219, 232, 245, 258, 272, 285, 298, 311],
    },
  ];

  constructor(id: string, set: SetNames, subStats: SubStats, level: number, mainStatType: PossibleMainStatTypes) {
    if (Object.keys(subStats).length < 3) {
      throw new Error('an artifact can not have less than 3 substats');
    }
    if (level > 3 && Object.keys(subStats).length === 3) {
      throw new Error('an artifact with level higher than 3 must have 4 substats');
    }
    if (Object.keys(subStats).length > 4) {
      throw new Error('an artifact can not have more than 4 substats');
    }

    if (!mainStatType) {
      throw new Error('main stat is mandatory');
    }

    if (Object.keys(subStats).find((subStat) => subStat === mainStatType)) {
      throw new Error('main stat can not be the same as one of the substats');
    }

    this.id = id;
    this.set = set;
    this.level = level;
    this.subStats = subStats;
    this.setMainStat(mainStatType);
  }

  private setMainStat(mainStatType: PossibleMainStatTypes): void {
    const mainStatValue: number = this.mainStatPossibleValues.find((mainStatPossibleValue) =>
      mainStatPossibleValue.stats.includes(mainStatType),
    ).values[this.level];
    this.mainStat = { [mainStatType]: mainStatValue };
  }
}
