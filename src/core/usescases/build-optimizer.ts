import { Artifact } from '../domain/entities/artifact';
import { BuildStatisticsValues } from '../domain/models/available-statistics';
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

  public computeBuildStats(artifacts: Artifact[]): BuildStatisticsValues {
    const buildSets: Partial<{ [key in SetNames]: number }> = {};
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

    Object.keys(buildSets).forEach((setName) => {
      const setWithEffect = this.setsWithEffects.find((setWithEffect) => setWithEffect.name === setName);
      artifactsStats[setWithEffect.stat] = this.addSetEffect(setWithEffect, buildSets, artifactsStats[setWithEffect.stat]);
    });

    return artifactsStats;
  }

  private addSetEffect(setWithEffect: SetWithEffect, buildSets: { [setName: string]: number }, artifactsStat: number): number {
    if (buildSets[setWithEffect.name] >= 2) {
      return artifactsStat ? artifactsStat + setWithEffect.value : setWithEffect.value;
    }
    return artifactsStat;
  }

  private getUpdatedBuildStat(buildStat: number, artifactStat: number): number {
    return buildStat ? Math.round((buildStat + artifactStat) * 10) / 10 : artifactStat;
  }
}
