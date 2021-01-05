import { Artifact } from '../domain/entities/artifact';
import { BuildStatisticsValues, possibleBuildStats } from '../domain/models/available-statistics';
import { PossibleMainStats } from '../domain/models/main-statistics';
import { PossibleSubStats } from '../domain/models/sub-statistics';

export class BuildOptimizer {
  public computeBuildStats(artifacts: Artifact[]): BuildStatisticsValues {
    const buildSets: { [setName: string]: number } = {};
    const artifactsStats = artifacts.reduce((buildStats, artifact: Artifact) => {
      if (artifact.set) {
        buildSets[artifact.set] = buildSets[artifact.set] ? buildSets[artifact.set] + 1 : 1;
      }
      const mainStatKey: PossibleMainStats = Object.keys(artifact.mainStat)[0] as PossibleMainStats;
      buildStats[mainStatKey] = this.getUpdatedBuildStat(buildStats[mainStatKey], artifact.mainStat[mainStatKey]);
      Object.keys(artifact.subStats).forEach((subStatKey: PossibleSubStats) => {
        buildStats[subStatKey] = this.getUpdatedBuildStat(buildStats[subStatKey], artifact.subStats[subStatKey]);
      });

      return buildStats;
    }, {} as BuildStatisticsValues);

    artifactsStats[possibleBuildStats.percentAtk] = this.addSetEffect(
      'gladiatorsFinale',
      buildSets,
      artifactsStats[possibleBuildStats.percentAtk],
      18,
    );
    artifactsStats[possibleBuildStats.electroDmg] = this.addSetEffect(
      'thunderingFury',
      buildSets,
      artifactsStats[possibleBuildStats.electroDmg],
      15,
    );

    artifactsStats[possibleBuildStats.powerfulShield] = this.addSetEffect(
      'retracingBolide',
      buildSets,
      artifactsStats[possibleBuildStats.powerfulShield],
      35,
    );
    artifactsStats[possibleBuildStats.pyroRes] = this.addSetEffect('lavawalker', buildSets, artifactsStats[possibleBuildStats.pyroRes], 40);

    return artifactsStats;
  }

  private addSetEffect(set: string, buildSets: { [setName: string]: number }, artifactsStat: number, effectValue: number): number {
    if (buildSets[set] >= 2) {
      return artifactsStat ? artifactsStat + effectValue : effectValue;
    }
    return artifactsStat;
  }

  private getUpdatedBuildStat(buildStat: number, artifactStat: number): number {
    return buildStat ? Math.round((buildStat + artifactStat) * 10) / 10 : artifactStat;
  }
}
