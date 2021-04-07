import { BehaviorSubject, from, Observable } from 'rxjs';
import { StatsComputation } from './stats-computation';
import { BuildFilter, SetFilter } from './build-filter';
import { Artifact } from './entities/artifact';
import { CharacterStatsValues } from './models/character-statistics';
import { MainStatsValues } from './models/main-statistics';
import { Build } from './models/build';
import { v4 as uuidv4 } from 'uuid';

export class BuildsComputation {
  private statsComputation: StatsComputation;
  private buildsSub: BehaviorSubject<Build[]> = new BehaviorSubject<Build[]>([]);
  private builds!: Build[];
  private allArtifacts!: Artifact[][];
  private baseStats!: CharacterStatsValues;
  private characterBonusStat!: MainStatsValues;
  private setFilter!: SetFilter;
  private statsFilter!: Partial<CharacterStatsValues>;
  private artifactsPerBuild!: number;

  constructor() {
    this.statsComputation = new StatsComputation();
  }

  public computeBuilds(
    allArtifacts: Artifact[][],
    baseStats: CharacterStatsValues,
    characterBonusStat: MainStatsValues,
    setFilter: SetFilter,
    statsFilter: Partial<CharacterStatsValues>,
  ): void {
    this.allArtifacts = allArtifacts;
    this.baseStats = baseStats;
    this.characterBonusStat = characterBonusStat;
    this.setFilter = setFilter;
    this.statsFilter = statsFilter;
    this.builds = [];
    this.artifactsPerBuild = allArtifacts.length - 1;

    this.iterateOverAllBuilds([], 0);
    this.emitBuildsSub();
  }

  public getBuilds(): Observable<Build[]> {
    return from(this.buildsSub);
  }

  private iterateOverAllBuilds(artifacts: Artifact[], i: number): void {
    this.allArtifacts[i].forEach((artifact: Artifact) => {
      const artifactsToCompute = [...artifacts];
      artifactsToCompute.push(artifact);
      if (i === this.artifactsPerBuild) {
        if (BuildFilter.setFilterMatch(this.setFilter, artifactsToCompute)) {
          this.computeBuildStats(artifactsToCompute);
        }

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
      if (this.builds.length > 10) {
        this.emitBuildsSub();
      }
    }
  }

  private emitBuildsSub(): void {
    this.buildsSub.next(this.builds);
    this.builds = [];
  }
}
