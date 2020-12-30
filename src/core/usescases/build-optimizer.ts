import { Artifact } from '../domain/entities/artifact';
import { AvailableStatistics, StatisticsValues } from '../domain/models/available-statistics';

export class BuildOptimizer {
  public computeBuildStats(artifact1: Artifact, artifact2: Artifact): StatisticsValues {
    return Object.keys(AvailableStatistics).reduce((buildStats, key: AvailableStatistics) => {
      buildStats[key] = this.getUpdatedStatValue(artifact1.stats[key], buildStats[key]);
      buildStats[key] = this.getUpdatedStatValue(artifact2.stats[key], buildStats[key]);
      return buildStats;
    }, {} as StatisticsValues);
  }

  private getUpdatedStatValue(artifactStat: number, buildStat: number): number {
    if (artifactStat) {
      return buildStat ? buildStat + artifactStat : artifactStat;
    }
    return buildStat;
  }
}
