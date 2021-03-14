import { BuildFilter } from './build-filter';
import { Artifact } from './entities/artifact';
import { Character } from './models/character';
import { CharacterStatsValues } from './models/character-statistics';
import { MainStatsValues } from './models/main-statistics';
import { SetNames } from './models/sets-with-effects';
import { StatsComputation } from './stats-computation';

interface SetFilter {
  setNames: SetNames[];
  pieces: 2 | 4;
}

export class BuildsComputation {
  private readonly statsComputation: StatsComputation;

  private allBuilds!: CharacterStatsValues[];
  private allArtifacts!: Artifact[][];
  private setFilter!: SetFilter;
  private statsFilter!: Partial<CharacterStatsValues>;
  private baseStats!: CharacterStatsValues;
  private characterBonusStats!: MainStatsValues;
  private artifactsPerBuilds!: number;

  constructor() {
    this.statsComputation = new StatsComputation();
  }

  public computeBuilds(
    allArtifacts: Artifact[][],
    character: Character,
    setFilter: {
      setNames: SetNames[];
      pieces: 2 | 4;
    },
    statsFilter: Partial<CharacterStatsValues>,
  ): CharacterStatsValues[] {
    this.allBuilds = [];
    this.allArtifacts = allArtifacts;
    this.baseStats = { ...character.stats, atk: character.stats.atk + character.weapon.atk };
    this.characterBonusStats = this.computeCharacterBonusStats(character);
    this.setFilter = setFilter;
    this.statsFilter = statsFilter;
    this.artifactsPerBuilds = allArtifacts.length - 1;

    this.iterateOverAllBuilds([], 0);
    return this.allBuilds;
  }

  private iterateOverAllBuilds(artifacts: Artifact[], i: number): void {
    this.allArtifacts[i].forEach((artifact: Artifact) => {
      const artifactsToCompute = [...artifacts];
      artifactsToCompute.push(artifact);
      if (i === this.artifactsPerBuilds) {
        if (this.setFilterMatch(this.setFilter, artifactsToCompute)) {
          const buildStats = this.statsComputation.computeStats({ ...this.baseStats }, this.characterBonusStats, artifactsToCompute);
          if (BuildFilter.filterBuilds(this.statsFilter, buildStats)) {
            this.allBuilds.push(buildStats);
          }
        }

        return;
      }
      this.iterateOverAllBuilds(artifactsToCompute, i + 1);
    });
  }

  private computeCharacterBonusStats(character: Character): MainStatsValues {
    const weaponBonusStat = character.weapon.bonusStat;
    const characterBonusStat = character.bonusStat;
    if (!characterBonusStat) {
      return weaponBonusStat;
    }

    const characterBonusKey = Object.keys(characterBonusStat)[0];
    const withSameCharAndWeaponStat = (): MainStatsValues => ({
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
}
