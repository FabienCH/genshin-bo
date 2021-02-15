import { Artifact } from '../domain/entities/artifact';
import { AllArtifacts } from '../domain/models/all-artifacts';
import { Character } from '../domain/models/character';
import { CharacterStatsValues, CharacterStats } from '../domain/models/character-statistics';
import { MainStatsValues } from '../domain/models/main-statistics';
import { SetNames } from '../domain/models/sets-with-effects';
import { StatsComputation } from '../domain/stats-computation';

interface SetFilter {
  setNames: SetNames[];
  pieces: 2 | 4;
}

export class BuildOptimizer {
  private readonly statsComputation: StatsComputation;

  private allBuilds: CharacterStatsValues[];
  private character: Character;
  private allArtifacts: Artifact[][];
  private setFilter: SetFilter;
  private statsFilter: { [statName: string]: number };

  constructor() {
    this.statsComputation = new StatsComputation();
  }

  public computeBuildsStats(
    character: Character,
    artifacts: AllArtifacts,
    setFilter?: SetFilter,
    statsFilter?: { [statName: string]: number },
  ): CharacterStatsValues[] {
    const totalSetFilterPieces = this.getTotalSetFilterPieces(setFilter);
    if (totalSetFilterPieces > 5) {
      throw new Error('total pieces can not be higher than 5');
    }

    this.allBuilds = [];
    this.character = character;
    this.allArtifacts = Object.values(artifacts);
    this.setFilter = setFilter;
    this.statsFilter = statsFilter;

    this.iterateOverAllBuilds([], 0);
    return this.allBuilds;
  }

  public getBuilds(artifacts: AllArtifacts): number {
    return (
      artifacts.flowers.length * artifacts.plumes.length * artifacts.sands.length * artifacts.goblets.length * artifacts.circlets.length
    );
  }

  private getTotalSetFilterPieces(setFilter: SetFilter) {
    const setNames = setFilter ? setFilter.setNames : [];
    const totalSetFilterPieces = setNames.reduce((totalPieces) => {
      totalPieces += setFilter.pieces;
      return totalPieces;
    }, 0);
    return totalSetFilterPieces;
  }

  private iterateOverAllBuilds(artifacts: Artifact[], i: number) {
    const baseStats: CharacterStatsValues = { ...this.character.stats, atk: this.character.stats.atk + this.character.weapon.atk };
    const characterBonusStats: MainStatsValues = this.computeCharacterBonusStats();
    const max = this.allArtifacts.length - 1;

    this.allArtifacts[i].forEach((artifact: Artifact) => {
      const artifactsToCompute = [...artifacts];
      artifactsToCompute.push(artifact);
      if (i === max) {
        if (this.setFilterMatch(this.setFilter, artifactsToCompute)) {
          const buildStats = this.statsComputation.computeStats({ ...baseStats }, characterBonusStats, artifactsToCompute);
          if (this.statFilterMatch(this.statsFilter, buildStats)) {
            this.allBuilds.push(buildStats);
          }
        }

        return;
      }
      this.iterateOverAllBuilds(artifactsToCompute, i + 1);
    });
  }

  private computeCharacterBonusStats(): CharacterStatsValues {
    const weaponBonusStat = this.character.weapon.bonusStat;
    const characterBonusStat = this.character.bonusStat;
    const characterBonusKey = characterBonusStat ? Object.keys(characterBonusStat)[0] : undefined;

    const withSameCharAndWeaponStat = (): CharacterStatsValues => ({
      [characterBonusKey]: this.statsComputation.addStats([characterBonusStat[characterBonusKey], weaponBonusStat[characterBonusKey]]),
    });

    return characterBonusKey === Object.keys(weaponBonusStat)[0]
      ? withSameCharAndWeaponStat()
      : { ...characterBonusStat, ...weaponBonusStat };
  }

  private setFilterMatch(setFilter: SetFilter, artifactsToCompute: Artifact[]): boolean {
    const setsMatchingFilterCount = (): number => {
      const setsMatchingPieces = setFilter.setNames.filter((setName) => {
        const artifactsMatchingSetName = artifactsToCompute.filter((artifact) => artifact.set === setName);
        return artifactsMatchingSetName.length >= setFilter.pieces;
      });
      return setsMatchingPieces.length;
    };

    return !setFilter || setsMatchingFilterCount() >= setFilter.setNames.length;
  }

  private statFilterMatch(statsFilter: { [statName: string]: number }, buildStats: CharacterStatsValues): boolean {
    return !statsFilter || Object.keys(statsFilter).every((statName: CharacterStats) => buildStats[statName] >= statsFilter[statName]);
  }
}
