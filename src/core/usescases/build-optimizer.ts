import { Artifact } from '../domain/entities/artifact';
import { BuildStatisticsValues } from '../domain/models/available-statistics';
import { PossibleMainStats } from '../domain/models/main-statistics';
import { PossibleSubStats } from '../domain/models/sub-statistics';

export class BuildOptimizer {
  public computeBuildStats(artifacts: Artifact[]): BuildStatisticsValues {
    return artifacts.reduce((buildStats, artifact: Artifact) => {
      const mainStatKey: PossibleMainStats = Object.keys(artifact.mainStat)[0] as PossibleMainStats;
      buildStats[mainStatKey] = this.getUpdatedBuildStat(buildStats[mainStatKey], artifact.mainStat[mainStatKey]);
      Object.keys(artifact.subStats).forEach((subStatKey: PossibleSubStats) => {
        buildStats[subStatKey] = this.getUpdatedBuildStat(buildStats[subStatKey], artifact.subStats[subStatKey]);
      });

      return buildStats;
    }, {} as BuildStatisticsValues);
  }

  private getUpdatedBuildStat(buildStat: number, artifactStat: number): number {
    return buildStat ? buildStat + artifactStat : artifactStat;
  }
}
