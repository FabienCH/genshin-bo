import { Artifact } from '../domain/entities/artifact';
import { Character } from '../domain/models/character';
import {
  AllBuildStatTypes,
  CharacterStatsValues,
  CharacterStatTypes,
  possibleBuildStats,
  PossibleCharacterStats,
} from '../domain/models/character-statistics';
import { ArtifactStatsTypes, ArtifactStatsValues, PossibleMainStats } from '../domain/models/main-statistics';
import { PossibleSetStats, PossibleSetStatTypes, SetStatsValues } from '../domain/models/set-statistics';
import { SetNames, SetWithEffect } from '../domain/models/sets-with-effects';
import { PossibleSubStats } from '../domain/models/sub-statistics';

export class BuildOptimizer {
  private readonly setsWithEffects: SetWithEffect[] = [
    { name: SetNames.gladiatorsFinale, stat: PossibleSetStats.percentAtk, value: 18 },
    { name: SetNames.wanderersTroupe, stat: PossibleSetStats.elementalMastery, value: 80 },
    { name: SetNames.maidenBeloved, stat: PossibleSetStats.healingBonus, value: 15 },
    { name: SetNames.retracingBolide, stat: PossibleSetStats.powerfulShield, value: 35 },
    { name: SetNames.crimsonWitchOfFlames, stat: PossibleSetStats.pyroDmg, value: 15 },
    { name: SetNames.lavawalker, stat: PossibleSetStats.pyroRes, value: 40 },
    { name: SetNames.heartOfDepth, stat: PossibleSetStats.hydroDmg, value: 15 },
    { name: SetNames.thunderingFury, stat: PossibleSetStats.electroDmg, value: 15 },
    { name: SetNames.thundersoother, stat: PossibleSetStats.electroRes, value: 40 },
    { name: SetNames.viridescentVenerer, stat: PossibleSetStats.anemoDmg, value: 15 },
    { name: SetNames.blizzardStrayer, stat: PossibleSetStats.cryoDmg, value: 15 },
    { name: SetNames.archaicPetra, stat: PossibleSetStats.geoDmg, value: 15 },
    { name: SetNames.bloodstainedChivalry, stat: PossibleSetStats.physicalDmg, value: 25 },
  ];

  public computeBuildsStats(
    character: Character,
    flowerArtifacts: Artifact[],
    plumeArtifacts: Artifact[],
    sandsArtifacts: Artifact[],
    gobletArtifacts: Artifact[],
    circletArtifacts: Artifact[],
  ): CharacterStatsValues[] {
    const allBuilds: CharacterStatsValues[] = [];
    const allArtifacts = [flowerArtifacts, plumeArtifacts, sandsArtifacts, gobletArtifacts, circletArtifacts];
    const max = allArtifacts.length - 1;

    const addArtifactsToCompute = (artifacts: Artifact[], i: number) => {
      allArtifacts[i].forEach((artifact) => {
        const artifactsToCompute = [...artifacts];
        artifactsToCompute.push(artifact);
        if (i === max) {
          const artifactsStats = this.computeArtifactsStats(artifactsToCompute);
          const setsStats = this.computeSetsStats(artifactsToCompute);
          allBuilds.push(this.reduceToBuildStats(character, artifactsStats, setsStats));
          return;
        }
        addArtifactsToCompute(artifactsToCompute, i + 1);
      });
    };

    addArtifactsToCompute([], 0);
    return allBuilds;
  }

  private computeArtifactsStats(artifacts: Artifact[]): ArtifactStatsValues {
    return artifacts.reduce((buildStats, artifact: Artifact) => {
      const mainStatKey: PossibleMainStats = Object.keys(artifact.mainStat)[0] as PossibleMainStats;
      buildStats[mainStatKey] = this.addStatToBuildStat(buildStats[mainStatKey], artifact.mainStat[mainStatKey]);
      Object.keys(artifact.subStats).forEach((subStatKey: PossibleSubStats) => {
        buildStats[subStatKey] = this.addStatToBuildStat(buildStats[subStatKey], artifact.subStats[subStatKey]);
      });

      return buildStats;
    }, {} as ArtifactStatsValues);
  }

  private computeSetsStats(artifacts: Artifact[]): SetStatsValues {
    const buildSets: Partial<{ [key in SetNames]: number }> = artifacts.reduce((buildSetsAcc, artifact: Artifact) => {
      buildSetsAcc[artifact.set] = buildSetsAcc[artifact.set] ? buildSetsAcc[artifact.set] + 1 : 1;

      return buildSetsAcc;
    }, {} as Partial<{ [key in SetNames]: number }>);

    return Object.keys(buildSets).reduce((buildStats, setName) => {
      const setWithEffect = this.setsWithEffects.find((setWithEffect) => setWithEffect.name === setName && buildSets[setName] >= 2);
      if (setWithEffect) {
        buildStats[setWithEffect.stat] = setWithEffect.value;
      }
      return buildStats;
    }, {} as SetStatsValues);
  }

  private reduceToBuildStats(character: Character, artifactsStats: ArtifactStatsValues, setsStats: SetStatsValues): CharacterStatsValues {
    const getStatValue = (statValue: number) => (isNaN(statValue) ? 0 : statValue);
    const baseStats: CharacterStatsValues = { ...character.stats };
    const characterBonusStat: CharacterStatsValues = character.bonusStat;
    characterBonusStat;
    const percentStats = Object.keys({
      ...characterBonusStat,
      ...artifactsStats,
      ...setsStats,
    }).filter((statName: ArtifactStatsTypes | PossibleSetStatTypes) => statName.includes('percent'));
    const statsUpdatedWithPercent = percentStats.reduce((buildStats, statName: ArtifactStatsTypes | PossibleSetStatTypes) => {
      const buildStatName = this.getBuildStatName(statName);
      const bonusStatValue = characterBonusStat ? getStatValue(characterBonusStat[statName as CharacterStatTypes]) : 0;

      buildStats[buildStatName] = this.applyMultiplierToBuildStat(
        buildStats[buildStatName],
        getStatValue(artifactsStats[statName as ArtifactStatsTypes]) +
          getStatValue(setsStats[statName as PossibleSetStatTypes]) +
          bonusStatValue,
      );

      return buildStats;
    }, baseStats);

    const otherStats = Object.keys({ ...characterBonusStat, ...artifactsStats, ...setsStats }).filter(
      (statName: ArtifactStatsTypes | PossibleSetStatTypes) => !percentStats.includes(statName),
    );
    return otherStats.reduce((buildStats, statName: ArtifactStatsTypes | PossibleSetStatTypes) => {
      const buildStatName = this.getBuildStatName(statName);
      const bonusStatValue = characterBonusStat ? getStatValue(characterBonusStat[statName as CharacterStatTypes]) : 0;

      buildStats[buildStatName] = this.addStatToBuildStat(
        buildStats[buildStatName],
        getStatValue(artifactsStats[statName as ArtifactStatsTypes]) +
          getStatValue(setsStats[statName as PossibleSetStatTypes]) +
          bonusStatValue,
      );

      return buildStats;
    }, statsUpdatedWithPercent);
  }

  private addStatToBuildStat(buildStat: number, statToAdd: number): number {
    return buildStat ? Math.round((buildStat + statToAdd) * 10) / 10 : statToAdd;
  }

  private applyMultiplierToBuildStat(buildStat: number, statValue: number): number {
    return Math.round(buildStat * (1 + statValue / 100));
  }

  private getBuildStatName(statName: ArtifactStatsTypes | PossibleSetStatTypes): CharacterStatTypes {
    const statNameMap: { buildStatName: PossibleCharacterStats; match: AllBuildStatTypes[] }[] = [
      { buildStatName: PossibleCharacterStats.atk, match: [possibleBuildStats.flatAtk, possibleBuildStats.percentAtk] },
      { buildStatName: PossibleCharacterStats.def, match: [possibleBuildStats.flatDef, possibleBuildStats.percentDef] },
      { buildStatName: PossibleCharacterStats.hp, match: [possibleBuildStats.flatHp, possibleBuildStats.percentHp] },
    ];

    const mappedStateName = statNameMap.find((statNameItem) => statNameItem.match.includes(statName));
    return mappedStateName ? mappedStateName.buildStatName : (statName as CharacterStatTypes);
  }
}
