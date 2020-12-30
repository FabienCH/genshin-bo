import { Artifact } from '../domain/entities/artifact';
import { AvailableStatistics, StatisticsValues } from '../domain/models/available-statistics';

export class BuildOptimizer {
  public computeBuildStats(artifacts: Artifact[]): StatisticsValues {
    return Object.keys(AvailableStatistics).reduce((buildStats, key: AvailableStatistics) => {
      artifacts.forEach((artifact) => {
        const artifactStat = artifact.stats[key];
        if (artifactStat) {
          buildStats[key] = buildStats[key] ? buildStats[key] + artifactStat : artifactStat;
        }
      });

      return buildStats;
    }, {} as StatisticsValues);
  }
}
