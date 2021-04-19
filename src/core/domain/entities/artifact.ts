import { ArtifactStatsTypes, MainStat, MainStats, MainStatTypes } from '../models/main-statistics';
import { SetNames } from '../models/sets-with-effects';
import { SubStats, SubStatsValues } from '../models/sub-statistics';

export enum ArtifactType {
  flower = 'flower',
  plume = 'plume',
  sands = 'sands',
  goblet = 'goblet',
  circlet = 'circlet',
}

export abstract class Artifact {
  public id: string;
  public set: SetNames;
  public level: number;
  public mainStat: MainStat;
  public subStats: SubStatsValues;

  protected readonly mainStatValues: { stats: Array<MainStatTypes>; values: number[] }[] = [
    {
      stats: [
        MainStats.percentAtk,
        MainStats.percentHp,
        MainStats.pyroDmg,
        MainStats.hydroDmg,
        MainStats.dendroDmg,
        MainStats.electroDmg,
        MainStats.anemoDmg,
        MainStats.cryoDmg,
        MainStats.geoDmg,
      ],
      values: [7, 9, 11, 12.9, 14.9, 16.9, 18.9, 20.9, 22.8, 24.8, 26.8, 28.8, 30.8, 32.8, 34.7, 36.7, 38.7, 40.7, 42.7, 44.6, 46.6],
    },
    {
      stats: [MainStats.percentDef, MainStats.physicalDmg],
      values: [8.7, 11.2, 13.7, 16.2, 18.6, 21.1, 23.6, 26.1, 28.6, 31, 33.5, 36, 38.5, 40.9, 43.4, 45.9, 48.4, 50.8, 53.3, 55.8, 58.3],
    },
    {
      stats: [MainStats.elementalMastery],
      values: [28, 36, 44, 52, 60, 68, 76, 84, 91, 99, 107, 115, 123, 131, 139, 147, 155, 163, 171, 179, 187],
    },
    {
      stats: [MainStats.energyRecharge],
      values: [7.8, 10, 12.2, 14.4, 16.6, 18.8, 21, 23.2, 25.4, 27.6, 29.8, 32, 34.2, 36.4, 38.6, 40.8, 43, 45.2, 47.4, 49.6, 51.8],
    },
    {
      stats: [MainStats.critRate],
      values: [4.7, 6, 7.3, 8.6, 9.9, 11.3, 12.6, 13.9, 15.2, 16.6, 17.9, 19.2, 20.5, 21.8, 23.2, 24.5, 25.8, 27.1, 28.4, 29.8, 31.1],
    },
    {
      stats: [MainStats.critDmg],
      values: [9.3, 12, 14.6, 17.3, 19.9, 22.5, 25.2, 27.8, 30.5, 33.1, 35.7, 38.4, 41, 43.7, 46.3, 49, 51.6, 54.2, 56.9, 59.5, 62.2],
    },
    {
      stats: [MainStats.healingBonus],
      values: [5.4, 6.9, 8.4, 10, 11.5, 13, 14.5, 16.1, 17.6, 19.1, 20.6, 22.1, 23.7, 25.2, 26.7, 28.2, 29.8, 31.3, 32.8, 34.4, 35.9],
    },
    {
      stats: [MainStats.flatHp],
      values: [717, 920, 1123, 1326, 1530, 1733, 1936, 2139, 2342, 2545, 2749, 2952, 3155, 3358, 3561, 3764, 3967, 4171, 4374, 4577, 4780],
    },
    {
      stats: [MainStats.flatAtk],
      values: [47, 60, 73, 86, 100, 113, 126, 139, 152, 166, 179, 192, 205, 219, 232, 245, 258, 272, 285, 298, 311],
    },
  ];

  constructor(
    id: string,
    set: SetNames,
    subStats: SubStatsValues,
    level: number,
    mainStatType: MainStatTypes,
    mainStatValueFromOcr?: number,
  ) {
    if (Object.keys(subStats).length < 3) {
      throw new Error('an artifact can not have less than 3 substats');
    }
    if (level > 3 && Object.keys(subStats).length === 3) {
      throw new Error('an artifact with level higher than 3 must have 4 substats');
    }
    if (Object.keys(subStats).length > 4) {
      throw new Error('an artifact can not have more than 4 substats');
    }

    if (Object.keys(subStats).find((subStat) => subStat === mainStatType)) {
      throw new Error('main stat can not be the same as one of the substats');
    }

    const mainStat = this.getMainStat(mainStatType, level);
    const mainStatValue = Object.values(mainStat)[0];
    if (mainStatValueFromOcr && mainStatValue !== mainStatValueFromOcr) {
      throw new Error(`inconsistent main stat value, value from level is ${mainStatValue}`);
    }

    this.id = id;
    this.set = set;
    this.level = level;
    this.subStats = subStats;
    this.mainStat = this.getMainStat(mainStatType, this.level);
  }

  public matchFilters(minLevel = 0, focusStats: ArtifactStatsTypes[]): boolean {
    return this.level >= minLevel && this.filterByFocusStats(focusStats);
  }

  public abstract getType(): ArtifactType;

  private filterByFocusStats(focusStats: ArtifactStatsTypes[]): boolean {
    return (
      focusStats.length === 0 ||
      !!Object.keys({ ...this.subStats, ...this.mainStat }).find((artifactStats) =>
        focusStats.includes(artifactStats as SubStats | MainStats),
      )
    );
  }

  private getMainStat(mainStatType: MainStatTypes, level: number): MainStat {
    const mainStat = this.mainStatValues.find((mainStatValue) => mainStatValue.stats.includes(mainStatType));
    if (!mainStat) {
      throw new Error(`could not find values for main stat ${mainStatType}`);
    }

    return { [mainStatType]: mainStat.values[level] };
  }
}
