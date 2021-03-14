import { ArtifactsMainStats } from '../adapters/primaries/build-optimizer/build-optimizer-container';
import { loadArtifacts } from '../adapters/redux/artifacts/artifacts-middleware';
import { isArtifactsStateInitialized, selectAllArtifacts } from '../adapters/redux/artifacts/artifacts-selectors';
import { appStore } from '../adapters/redux/store';
import { Artifact } from '../domain/entities/artifact';
import { ArtifactMapper } from '../domain/mappers/artifact-mapper';
import { Character } from '../domain/models/character';
import { CharacterStatsValues } from '../domain/models/character-statistics';
import { ArtifactStatsTypes, MainStatsValues } from '../domain/models/main-statistics';
import { SetNames } from '../domain/models/sets-with-effects';
import { StatsComputation } from '../domain/stats-computation';
import { ArtifactsFilter } from './artifacts-filter';
import { BuildFilter } from './build-filter';

interface SetFilter {
  setNames: SetNames[];
  pieces: 2 | 4;
}

export class BuildOptimizer {
  private readonly statsComputation: StatsComputation;

  private allBuilds!: CharacterStatsValues[];
  private character!: Character;
  private allArtifacts!: Artifact[][];
  private setFilter!: SetFilter;
  private statsFilter!: Partial<CharacterStatsValues>;

  constructor() {
    if (!isArtifactsStateInitialized()) {
      appStore.dispatch(loadArtifacts());
    }
    this.statsComputation = new StatsComputation();
  }

  public computeBuildsStats(
    character: Character,
    artifactsFilters: {
      currentSets: SetNames[];
      setPieces: 2 | 4;
      mainsStats: ArtifactsMainStats;
      focusStats: ArtifactStatsTypes[];
      minArtifactLevel: number;
    },
    statsFilter: Partial<CharacterStatsValues>,
  ): CharacterStatsValues[] {
    this.setFilter = {
      setNames: artifactsFilters.currentSets,
      pieces: artifactsFilters.setPieces,
    };
    const totalSetFilterPieces = this.getTotalSetFilterPieces(this.setFilter);
    if (totalSetFilterPieces > 5) {
      throw new Error('total pieces can not be higher than 5');
    }
    this.statsFilter = statsFilter;

    this.allBuilds = [];
    this.character = character;
    const allArtifacts = ArtifactMapper.mapAllDataToAllArtifactsByType(selectAllArtifacts());
    const { mainsStats, minArtifactLevel, focusStats } = artifactsFilters;

    const mainStats = {
      sandsMain: mainsStats.sandsMain,
      gobletMain: mainsStats.gobletMain,
      circletMain: mainsStats.circletMain,
    };

    this.allArtifacts = Object.values(ArtifactsFilter.filterArtifacts(allArtifacts, mainStats, minArtifactLevel, focusStats));
    this.iterateOverAllBuilds([], 0);
    return this.allBuilds;
  }

  public getBuilds(): number {
    if (!this.allArtifacts) {
      return 0;
    }
    return this.allArtifacts.reduce((numberOfBuilds, artifacts) => {
      numberOfBuilds *= artifacts.length;
      return numberOfBuilds;
    }, 1);
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
          if (BuildFilter.filterBuilds(this.statsFilter, buildStats)) {
            this.allBuilds.push(buildStats);
          }
        }

        return;
      }
      this.iterateOverAllBuilds(artifactsToCompute, i + 1);
    });
  }

  private computeCharacterBonusStats(): MainStatsValues {
    const weaponBonusStat = this.character.weapon.bonusStat;
    const characterBonusStat = this.character.bonusStat;
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
