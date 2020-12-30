import { StatisticsValues } from '../models/available-statistics';

export class Artifact {
  public stats: StatisticsValues;

  constructor(stats: StatisticsValues) {
    this.stats = stats;
  }
}
