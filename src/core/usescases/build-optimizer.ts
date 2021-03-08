import { ArtifactsMainStats } from '../adapters/primaries/build-optimizer/build-optimizer-container';
import { InMemoryArtifactsRepository } from '../adapters/secondaries/in-memory-artifacts-repository';
import { ArtifactsRepository } from '../domain/artifacts-repository';
import { Artifact } from '../domain/entities/artifact';
import { AllArtifacts } from '../domain/models/all-artifacts';
import { ArtifactData } from '../domain/models/artifact-data';
import { Character } from '../domain/models/character';
import { CharacterStatsValues } from '../domain/models/character-statistics';
import { CircletArtifactData } from '../domain/models/circlet-artifact-data';
import { GobletArtifactData } from '../domain/models/goblet-artifact-data';
import { ArtifactStatsTypes, MainStatsValues } from '../domain/models/main-statistics';
import { SandsArtifactData } from '../domain/models/sands-artifact-data';
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
  private readonly artifactsRepository: ArtifactsRepository;

  private allBuilds!: CharacterStatsValues[];
  private character!: Character;
  private allArtifacts!: Artifact[][];
  private setFilter!: SetFilter;
  private statsFilter!: CharacterStatsValues;

  constructor(artifactsData?: {
    flowerArtifacts?: ArtifactData[];
    plumeArtifacts?: ArtifactData[];
    sandsArtifacts?: SandsArtifactData[];
    gobletArtifacts?: GobletArtifactData[];
    circletArtifacts?: CircletArtifactData[];
  }) {
    this.statsComputation = new StatsComputation();
    this.artifactsRepository = new InMemoryArtifactsRepository(artifactsData);
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
    statsFilter: CharacterStatsValues,
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
    const allArtifacts = {
      flowers: this.artifactsRepository.getFlowerArtifacts(),
      plumes: this.artifactsRepository.getPlumeArtifacts(),
      sands: this.artifactsRepository.getSandsArtifacts(),
      goblets: this.artifactsRepository.getGobletArtifacts(),
      circlets: this.artifactsRepository.getCircletArtifacts(),
    };
    this.artifactsRepository.getFlowerArtifacts();
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
