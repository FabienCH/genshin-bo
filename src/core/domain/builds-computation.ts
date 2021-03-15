import { BehaviorSubject, from, Observable } from 'rxjs';
import { StatsComputation } from './stats-computation';
import { BuildFilter } from './build-filter';
import { Artifact } from './entities/artifact';
import { CharacterStatsValues } from './models/character-statistics';
import { MainStatsValues } from './models/main-statistics';
import { SetNames } from './models/sets-with-effects';

export class BuildsComputation {
  private statsComputation: StatsComputation;
  private buildsSub: BehaviorSubject<CharacterStatsValues[]> = new BehaviorSubject<CharacterStatsValues[]>([]);
  private builds!: CharacterStatsValues[];
  private allArtifacts!: Artifact[][];
  private baseStats!: CharacterStatsValues;
  private characterBonusStat!: MainStatsValues;
  private setFilter!: {
    setNames: SetNames[];
    pieces: 2 | 4;
  };
  private statsFilter!: Partial<CharacterStatsValues>;
  private artifactsPerBuilds!: number;

  constructor() {
    this.statsComputation = new StatsComputation();
  }
  public computeBuilds(
    allArtifacts: Artifact[][],
    baseStats: CharacterStatsValues,
    characterBonusStat: MainStatsValues,
    setFilter: {
      setNames: SetNames[];
      pieces: 2 | 4;
    },
    statsFilter: Partial<CharacterStatsValues>,
  ): void {
    this.allArtifacts = allArtifacts;
    this.baseStats = baseStats;
    this.characterBonusStat = characterBonusStat;
    this.setFilter = setFilter;
    this.statsFilter = statsFilter;
    this.builds = [];
    this.artifactsPerBuilds = allArtifacts.length - 1;

    this.iterateOverAllBuilds([], 0);
    this.emitBuildsSub();
  }

  public getBuilds(): Observable<CharacterStatsValues[]> {
    return from(this.buildsSub);
  }

  private iterateOverAllBuilds(artifacts: Artifact[], i: number): void {
    this.allArtifacts[i].forEach((artifact: Artifact) => {
      const artifactsToCompute = [...artifacts];
      artifactsToCompute.push(artifact);
      if (i === this.artifactsPerBuilds) {
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
      this.builds.push(buildStats);
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
