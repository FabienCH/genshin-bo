import { Artifact } from '../domain/entities/artifact';
import { AllArtifacts } from '../domain/models/all-artifacts';
import { Character } from '../domain/models/character';
import {
  AllBuildStatTypes,
  CharacterStatsValues,
  CharacterStatTypes,
  possibleBuildStats,
  PossibleCharacterStats,
} from '../domain/models/character-statistics';
import {
  ArtifactStatsTypes,
  ArtifactStatsValues,
  MainStatsValues,
  PossibleMainStats,
  PossibleMainStatTypes,
} from '../domain/models/main-statistics';
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
    artifacts: AllArtifacts,
    setFilter?: { setNames: SetNames[]; pieces: 2 | 4 },
    statsFilter?: { [statName: string]: number },
  ): CharacterStatsValues[] {
    if (
      setFilter &&
      setFilter.setNames.reduce((totalPieces) => {
        totalPieces += setFilter.pieces;
        return totalPieces;
      }, 0) > 5
    ) {
      throw new Error('total pieces can not be higher than 5');
    }

    const allBuilds: CharacterStatsValues[] = [];
    const allArtifacts = Object.values(artifacts);
    const weapon = character.weapon;
    const baseStats: CharacterStatsValues = { ...character.stats, atk: character.stats.atk + weapon.atk };
    const characterBonusKey = character.bonusStat ? Object.keys(character.bonusStat)[0] : character.bonusStat;
    const characterBonusStat: MainStatsValues =
      characterBonusKey === Object.keys(weapon.bonusStat)[0]
        ? { [characterBonusKey]: this.addStats([character.bonusStat[characterBonusKey], weapon.bonusStat[characterBonusKey]]) }
        : { ...character.bonusStat, ...weapon.bonusStat };
    const max = allArtifacts.length - 1;

    const addArtifactsToCompute = (artifacts: Artifact[], i: number) => {
      allArtifacts[i].forEach((artifact: Artifact) => {
        const artifactsToCompute = [...artifacts];
        artifactsToCompute.push(artifact);
        if (i === max) {
          if (
            !setFilter ||
            setFilter.setNames.filter(
              (setName) => artifactsToCompute.filter((artifact) => artifact.set === setName).length >= setFilter.pieces,
            ).length >= setFilter.setNames.length
          ) {
            const buildStats = this.reduceToBuildStats({ ...baseStats }, characterBonusStat, artifactsToCompute);
            if (
              !statsFilter ||
              Object.keys(statsFilter).every((statName: PossibleCharacterStats) => buildStats[statName] >= statsFilter[statName])
            ) {
              allBuilds.push(buildStats);
            }
          }

          return;
        }
        addArtifactsToCompute(artifactsToCompute, i + 1);
      });
    };

    addArtifactsToCompute([], 0);
    return allBuilds;
  }

  public getPossibleBuilds(artifacts: AllArtifacts): number {
    return (
      artifacts.flowers.length * artifacts.plumes.length * artifacts.sands.length * artifacts.goblets.length * artifacts.circlets.length
    );
  }

  private computeArtifactsStats(artifacts: Artifact[]): ArtifactStatsValues {
    return artifacts.reduce((buildStats, artifact: Artifact) => {
      const mainStatKey: PossibleMainStats = Object.keys(artifact.mainStat)[0] as PossibleMainStats;
      buildStats[mainStatKey] = this.addStats([buildStats[mainStatKey], artifact.mainStat[mainStatKey]]);
      Object.keys(artifact.subStats).forEach((subStatKey: PossibleSubStats) => {
        buildStats[subStatKey] = this.addStats([buildStats[subStatKey], artifact.subStats[subStatKey]]);
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

  private reduceToBuildStats(
    baseStats: CharacterStatsValues,
    characterBonusStat: MainStatsValues,
    artifactsToCompute: Artifact[],
  ): CharacterStatsValues {
    const artifactsStats = this.computeArtifactsStats(artifactsToCompute);
    const setsStats = this.computeSetsStats(artifactsToCompute);
    const allStatsKeys = Object.keys({
      ...characterBonusStat,
      ...artifactsStats,
      ...setsStats,
    });

    const percentStats = allStatsKeys.filter((statName: ArtifactStatsTypes | PossibleSetStatTypes) => statName.includes('percent'));
    const statsUpdatedWithPercent = this.updateStats(percentStats, characterBonusStat, artifactsStats, setsStats, baseStats);

    const nonPercentStats = allStatsKeys.filter((statName: ArtifactStatsTypes | PossibleSetStatTypes) => !percentStats.includes(statName));
    return this.updateStats(nonPercentStats, characterBonusStat, artifactsStats, setsStats, statsUpdatedWithPercent);
  }

  private updateStats(
    statsNames: string[],
    characterBonusStat: MainStatsValues,
    artifactsStats: ArtifactStatsValues,
    setsStats: SetStatsValues,
    buildStats: CharacterStatsValues,
  ): CharacterStatsValues {
    const getStatValue = (statValue: number) => (isNaN(statValue) ? 0 : statValue);

    return statsNames.reduce((updatedBuildStats, statName: ArtifactStatsTypes | PossibleSetStatTypes) => {
      const buildStatName = this.getBuildStatName(statName);
      const bonusStatValue = getStatValue(characterBonusStat[statName as PossibleMainStatTypes]);

      updatedBuildStats[buildStatName] = this.computeStat(
        updatedBuildStats[buildStatName],
        [artifactsStats[statName as ArtifactStatsTypes], setsStats[statName as PossibleSetStatTypes], bonusStatValue],
        statName.includes('percent'),
      );

      return updatedBuildStats;
    }, buildStats);
  }

  private computeStat(buildStatValue: number, values: number[], applyMultiplier: boolean): number {
    return applyMultiplier
      ? this.applyMultiplierToBuildStat(buildStatValue, this.addStats(values))
      : this.addStats([buildStatValue, ...values]);
  }

  private addStats(statsValues: number[]): number {
    const getStatValue = (statValue: number) => (isNaN(statValue) ? 0 : statValue);

    return statsValues.reduce((acc, statValue) => {
      acc = Math.round((getStatValue(acc) + getStatValue(statValue)) * 10) / 10;
      return acc;
    }, 0);
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
