import { Subject, from, Observable } from 'rxjs';
import { StatsComputation } from './stats-computation';
import { BuildFilter, SetFilter } from './build-filter';
import { Artifact } from './entities/artifact';
import { CharacterStatsValues } from './models/character-statistics';
import { ArtifactsMainStats, ArtifactStatsTypes, MainStatsValues } from './models/main-statistics';
import { Build } from './models/build';
import { v4 as uuidv4 } from 'uuid';
import { ArtifactsFilter } from '../usescases/artifacts-filter';
import { ArtifactMapper } from './mappers/artifact-mapper';
import { ArtifactData } from './models/artifact-data';
import { SetNames } from './models/sets-with-effects';

export interface BuildsComputationProgress {
  computed: number;
  total: number;
}

export interface BuildsResults {
  builds: Build[];
  progress: BuildsComputationProgress;
}

export class BuildsComputation {
  public static buildsLimit = 1000;

  private statsComputation: StatsComputation;
  private newBuildsSub: Subject<BuildsResults> = new Subject<BuildsResults>();
  private builds!: Build[];
  private allArtifacts!: Artifact[][];
  private baseStats!: CharacterStatsValues;
  private characterBonusStat!: MainStatsValues;
  private setFilter!: SetFilter;
  private statsFilter!: Partial<CharacterStatsValues>;
  private artifactsPerBuild!: number;
  private buildsComputed!: number;
  private buildsMatchingFilters!: number;
  private totalBuilds!: number;

  constructor() {
    this.statsComputation = new StatsComputation();
  }

  public computeBuilds(
    artifacts: ArtifactData[],
    baseStats: CharacterStatsValues,
    characterBonusStat: MainStatsValues,
    artifactsFilters: {
      currentSets: SetNames[];
      setPieces: 2 | 4;
      mainsStats: ArtifactsMainStats;
      focusStats: ArtifactStatsTypes[];
      minArtifactLevel: number;
    },
    statsFilter: Partial<CharacterStatsValues>,
  ): void {
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

    const allArtifacts = ArtifactMapper.mapAllDataToAllArtifactsByType(artifacts);
    this.allArtifacts = Object.values(ArtifactsFilter.filterArtifacts(allArtifacts, mainStats, minArtifactLevel, focusStats));
    this.baseStats = baseStats;
    this.characterBonusStat = characterBonusStat;
    this.setFilter = setFilter;
    this.statsFilter = statsFilter;
    this.builds = [];
    this.artifactsPerBuild = this.allArtifacts.length - 1;
    this.initBuildsProgressCounters();

    this.iterateOverAllBuilds([], 0);
    this.emitBuildsSub();
  }

  public getNewBuilds(): Observable<BuildsResults> {
    return from(this.newBuildsSub);
  }

  private iterateOverAllBuilds(artifacts: Artifact[], i: number): void {
    this.allArtifacts[i].forEach((artifact: Artifact) => {
      const artifactsToCompute = [...artifacts];
      artifactsToCompute.push(artifact);
      if (i === this.artifactsPerBuild) {
        this.buildsComputed++;
        if (BuildFilter.setFilterMatch(this.setFilter, artifactsToCompute)) {
          this.computeBuildStats(artifactsToCompute);
        }

        return;
      }
      if (this.buildsMatchingFilters >= BuildsComputation.buildsLimit) {
        return;
      }
      this.iterateOverAllBuilds(artifactsToCompute, i + 1);
    });
  }

  private computeBuildStats(artifactsToCompute: Artifact[]) {
    const buildStats = this.statsComputation.computeStats({ ...this.baseStats }, this.characterBonusStat, artifactsToCompute);
    if (BuildFilter.filterBuilds(this.statsFilter, buildStats)) {
      const artifactIds = artifactsToCompute.map((artifact) => artifact.id);
      this.builds.push({ id: uuidv4(), stats: buildStats, artifactIds });
      this.buildsMatchingFilters++;

      if (this.builds.length > 50) {
        this.emitBuildsSub();
      }
    }
  }

  private getTotalSetFilterPieces(setFilter: SetFilter) {
    const setNames = setFilter ? setFilter.setNames : [];
    const totalSetFilterPieces = setNames.reduce((totalPieces) => {
      totalPieces += setFilter.pieces;
      return totalPieces;
    }, 0);
    return totalSetFilterPieces;
  }

  private initBuildsProgressCounters(): void {
    this.buildsComputed = 0;
    this.buildsMatchingFilters = 0;

    if (!this.allArtifacts) {
      this.totalBuilds = 0;
    }
    this.totalBuilds = this.allArtifacts.reduce((numberOfBuilds, artifacts) => {
      numberOfBuilds *= artifacts.length;
      return numberOfBuilds;
    }, 1);
  }

  private emitBuildsSub(): void {
    this.newBuildsSub.next({
      builds: this.builds,
      progress: { computed: this.buildsComputed, total: this.totalBuilds },
    });
    this.builds = [];
  }
}
