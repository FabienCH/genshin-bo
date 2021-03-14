import { ArtifactsMainStats } from '../adapters/primaries/build-optimizer/build-optimizer-container';
import { loadArtifacts } from '../adapters/redux/artifacts/artifacts-middleware';
import { isArtifactsStateInitialized, selectAllArtifacts } from '../adapters/redux/artifacts/artifacts-selectors';
import { appStore } from '../adapters/redux/store';
import { BuildsComputation } from '../domain/builds-computation';
import { Artifact } from '../domain/entities/artifact';
import { ArtifactMapper } from '../domain/mappers/artifact-mapper';
import { Character } from '../domain/models/character';
import { CharacterStatsValues } from '../domain/models/character-statistics';
import { ArtifactStatsTypes } from '../domain/models/main-statistics';
import { SetNames } from '../domain/models/sets-with-effects';
import { ArtifactsFilter } from './artifacts-filter';

interface SetFilter {
  setNames: SetNames[];
  pieces: 2 | 4;
}

export class BuildOptimizer {
  private readonly buildsComputation: BuildsComputation;

  private allBuilds!: CharacterStatsValues[];
  private allArtifacts!: Artifact[][];

  constructor() {
    if (!isArtifactsStateInitialized()) {
      appStore.dispatch(loadArtifacts());
    }
    this.buildsComputation = new BuildsComputation();
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
    const setFilter = {
      setNames: artifactsFilters.currentSets,
      pieces: artifactsFilters.setPieces,
    };
    const totalSetFilterPieces = this.getTotalSetFilterPieces(setFilter);
    if (totalSetFilterPieces > 5) {
      throw new Error('total pieces can not be higher than 5');
    }

    const { mainsStats, minArtifactLevel, focusStats } = artifactsFilters;
    const mainStats = {
      sandsMain: mainsStats.sandsMain,
      gobletMain: mainsStats.gobletMain,
      circletMain: mainsStats.circletMain,
    };

    const allArtifacts = ArtifactMapper.mapAllDataToAllArtifactsByType(selectAllArtifacts());
    this.allArtifacts = Object.values(ArtifactsFilter.filterArtifacts(allArtifacts, mainStats, minArtifactLevel, focusStats));
    return this.buildsComputation.computeBuilds(this.allArtifacts, character, setFilter, statsFilter);
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
}
