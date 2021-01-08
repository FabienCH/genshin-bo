import { Artifact } from '../domain/entities/artifact';
import { AllPossibleStats, BuildStatisticsValues } from '../domain/models/available-statistics';
import { PossibleMainStats } from '../domain/models/main-statistics';
import { SetStats } from '../domain/models/set-statistics';
import { SetNames, SetWithEffect } from '../domain/models/sets-with-effects';
import { PossibleSubStats } from '../domain/models/sub-statistics';

export class BuildOptimizer {
  private readonly setsWithEffects: SetWithEffect[] = [
    { name: SetNames.gladiatorsFinale, stat: SetStats.percentAtk, value: 18 },
    { name: SetNames.wanderersTroupe, stat: SetStats.elementalMastery, value: 80 },
    { name: SetNames.maidenBeloved, stat: SetStats.healingBonus, value: 15 },
    { name: SetNames.retracingBolide, stat: SetStats.powerfulShield, value: 35 },
    { name: SetNames.crimsonWitchOfFlames, stat: SetStats.pyroDmg, value: 15 },
    { name: SetNames.lavawalker, stat: SetStats.pyroRes, value: 40 },
    { name: SetNames.heartOfDepth, stat: SetStats.hydroDmg, value: 15 },
    { name: SetNames.thunderingFury, stat: SetStats.electroDmg, value: 15 },
    { name: SetNames.thundersoother, stat: SetStats.electroRes, value: 40 },
    { name: SetNames.viridescentVenerer, stat: SetStats.anemoDmg, value: 15 },
    { name: SetNames.blizzardStrayer, stat: SetStats.cryoDmg, value: 15 },
    { name: SetNames.archaicPetra, stat: SetStats.geoDmg, value: 15 },
    { name: SetNames.bloodstainedChivalry, stat: SetStats.physicalDmg, value: 25 },
  ];

  public computeBuildsStats(
    flowerArtifacts: Artifact[],
    plumeArtifacts: Artifact[],
    sandsArtifacts: Artifact[],
    gobletArtifacts: Artifact[],
    circletArtifacts: Artifact[],
  ): BuildStatisticsValues[] {
    const allBuilds: BuildStatisticsValues[] = [];
    flowerArtifacts.forEach((flowerArtifact) => {
      plumeArtifacts.forEach((plumeArtifact) => {
        sandsArtifacts.forEach((sandsArtifact) => {
          gobletArtifacts.forEach((gobletArtifact) => {
            circletArtifacts.forEach((circletArtifact) => {
              const artifactsStats = this.computeArtifactsStats([
                flowerArtifact,
                plumeArtifact,
                sandsArtifact,
                gobletArtifact,
                circletArtifact,
              ]);
              const setsStats = this.computeSetsStats([flowerArtifact, plumeArtifact, sandsArtifact, gobletArtifact, circletArtifact]);
              allBuilds.push(this.reduceToBuildStats(artifactsStats, setsStats));
            });
          });
        });
      });
    });
    return allBuilds;
  }

  private computeArtifactsStats(artifacts: Artifact[]): BuildStatisticsValues {
    return artifacts.reduce((buildStats, artifact: Artifact) => {
      const mainStatKey: PossibleMainStats = Object.keys(artifact.mainStat)[0] as PossibleMainStats;
      buildStats[mainStatKey] = this.getUpdatedBuildStat(buildStats[mainStatKey], artifact.mainStat[mainStatKey]);
      Object.keys(artifact.subStats).forEach((subStatKey: PossibleSubStats) => {
        buildStats[subStatKey] = this.getUpdatedBuildStat(buildStats[subStatKey], artifact.subStats[subStatKey]);
      });

      return buildStats;
    }, {} as BuildStatisticsValues);
  }

  private computeSetsStats(artifacts: Artifact[]): BuildStatisticsValues {
    const buildSets: Partial<{ [key in SetNames]: number }> = artifacts.reduce((buildSetsAcc, artifact: Artifact) => {
      if (artifact.set) {
        buildSetsAcc[artifact.set] = buildSetsAcc[artifact.set] ? buildSetsAcc[artifact.set] + 1 : 1;
      }

      return buildSetsAcc;
    }, {} as Partial<{ [key in SetNames]: number }>);

    return Object.keys(buildSets).reduce((buildStats, setName) => {
      const setWithEffect = this.setsWithEffects.find((setWithEffect) => setWithEffect.name === setName && buildSets[setName] >= 2);
      if (setWithEffect) {
        buildStats[setWithEffect.stat] = setWithEffect.value;
      }
      return buildStats;
    }, {} as BuildStatisticsValues);
  }

  private reduceToBuildStats(artifactsStats: BuildStatisticsValues, setsStats: BuildStatisticsValues): BuildStatisticsValues {
    return Object.keys({ ...artifactsStats, ...setsStats }).reduce((buildStats, statName: AllPossibleStats) => {
      if (artifactsStats[statName] && setsStats[statName]) {
        buildStats[statName] = artifactsStats[statName] + setsStats[statName];
      } else if (artifactsStats[statName]) {
        buildStats[statName] = artifactsStats[statName];
      } else {
        buildStats[statName] = setsStats[statName];
      }

      return buildStats;
    }, {} as BuildStatisticsValues);
  }

  private getUpdatedBuildStat(buildStat: number, artifactStat: number): number {
    return buildStat ? Math.round((buildStat + artifactStat) * 10) / 10 : artifactStat;
  }
}
