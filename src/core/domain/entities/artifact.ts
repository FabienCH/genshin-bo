import { ArtifactStatsTypes, MainStat, MainStats } from '../models/main-statistics';
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

  constructor(id: string, set: SetNames, subStats: SubStatsValues, level: number, mainStat: MainStat) {
    this.id = id;
    this.set = set;
    this.level = level;
    this.subStats = subStats;
    this.mainStat = mainStat;
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
}
