import { Subject, from, Observable } from 'rxjs';
import { StatsComputation } from './stats-computation';
import { BuildFilter, SetFilter } from './build-filter';
import { Artifact } from './entities/artifact';
import { CharacterStatsValues } from './models/character-statistics';
import { MainStatsValues } from './models/main-statistics';
import { Build } from './models/build';
import { v4 as uuidv4 } from 'uuid';
import { ArtifactsFilter, ArtifactsFilters } from '../usescases/artifacts-filter';
import { ArtifactMapper } from './mappers/artifact-mapper';
import { ArtifactData } from './models/artifact-data';

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
  private lastBuildsEmitPercent!: number;
  private lastBuildsEmitTimestamp!: number;

  constructor() {
    this.statsComputation = new StatsComputation();
  }

  public computeBuilds(
    artifacts: ArtifactData[],
    baseStats: CharacterStatsValues,
    characterBonusStat: MainStatsValues,
    artifactsFilters: ArtifactsFilters,
    statsFilter: Partial<CharacterStatsValues>,
  ): void {
    const setFilter = {
      setNames: artifactsFilters.currentSets,
      pieces: artifactsFilters.setPieces,
    };

    this.setAllArtifacts(artifactsFilters, artifacts);
    this.baseStats = baseStats;
    this.characterBonusStat = characterBonusStat;
    this.setFilter = setFilter;
    this.statsFilter = statsFilter;
    this.builds = [];
    this.artifactsPerBuild = this.allArtifacts.length - 1;
    this.lastBuildsEmitPercent = 0;
    this.lastBuildsEmitTimestamp = Date.now();
    this.initBuildsProgressCounters();

    this.iterateOverAllBuilds([], 0);
    this.emitNewBuildsSub();
  }

  public getBuildsCombinations(artifactsFilters: ArtifactsFilters, artifacts: ArtifactData[]): number {
    this.setAllArtifacts(artifactsFilters, artifacts);
    return this.getTotalBuilds();
  }

  public getNewBuilds(): Observable<BuildsResults> {
    return from(this.newBuildsSub);
  }

  private iterateOverAllBuilds(artifacts: Artifact[], i: number): void {
    this.allArtifacts[i].every((artifact: Artifact) => {
      const artifactsToCompute = [...artifacts];
      artifactsToCompute.push(artifact);
      if (i === this.artifactsPerBuild) {
        this.buildsComputed++;
        if (BuildFilter.setFilterMatch(this.setFilter, artifactsToCompute)) {
          this.computeBuildStats(artifactsToCompute);
        }
        this.emitNewBuildsIfNeeded();
        return true;
      }

      this.iterateOverAllBuilds(artifactsToCompute, i + 1);
      return this.buildsMatchingFilters < BuildsComputation.buildsLimit;
    });
  }

  private computeBuildStats(artifactsToCompute: Artifact[]) {
    const buildStats = this.statsComputation.computeStats({ ...this.baseStats }, this.characterBonusStat, artifactsToCompute);
    if (BuildFilter.filterBuilds(this.statsFilter, buildStats)) {
      const artifactIds = artifactsToCompute.map((artifact) => artifact.id);
      this.builds.push({ id: uuidv4(), stats: buildStats, artifactIds });
      this.buildsMatchingFilters++;
    }
  }

  private setAllArtifacts(artifactsFilters: ArtifactsFilters, artifacts: ArtifactData[]): void {
    const { mainsStats, minArtifactLevel, focusStats } = artifactsFilters;

    const allArtifacts = ArtifactMapper.mapAllDataToAllArtifactsByType(artifacts);
    this.allArtifacts = Object.values(ArtifactsFilter.filterArtifacts(allArtifacts, mainsStats, minArtifactLevel, focusStats));
  }

  private initBuildsProgressCounters(): void {
    this.buildsComputed = 0;
    this.buildsMatchingFilters = 0;
    this.totalBuilds = this.getTotalBuilds();

    if (this.totalBuilds > Math.pow(10, 10)) {
      throw new Error('total builds combinations can not be higher than 10 billions');
    }
  }

  private getTotalBuilds(): number {
    if (!this.allArtifacts) {
      return 0;
    }
    return this.allArtifacts.reduce((numberOfBuilds, artifacts) => {
      numberOfBuilds *= artifacts.length;
      return numberOfBuilds;
    }, 1);
  }

  private emitNewBuildsIfNeeded(): void {
    const currentPercent = (this.buildsComputed * 100) / this.totalBuilds;
    const now = Date.now();
    const timeSinceLastEmit = now - this.lastBuildsEmitTimestamp;
    const percentDiffMoreThan2 = currentPercent - this.lastBuildsEmitPercent > 2;
    if ((percentDiffMoreThan2 && timeSinceLastEmit > 100) || timeSinceLastEmit > 1000) {
      this.lastBuildsEmitTimestamp = now;
      this.lastBuildsEmitPercent = currentPercent;
      this.emitNewBuildsSub();
    }
  }

  private emitNewBuildsSub(): void {
    this.newBuildsSub.next({
      builds: this.builds,
      progress: { computed: this.buildsComputed, total: this.totalBuilds },
    });
    this.builds = [];
  }
}
