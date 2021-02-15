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

    const allBuilds: CharacterStatsValues[] = [];
    const allArtifacts = Object.values(artifacts);
    const weapon = character.weapon;
    const baseStats: CharacterStatsValues = { ...character.stats, atk: character.stats.atk + weapon.atk };
    const characterBonusKey = character.bonusStat ? Object.keys(character.bonusStat)[0] : character.bonusStat;
    const characterBonusStats: MainStatsValues =
      characterBonusKey === Object.keys(weapon.bonusStat)[0]
        ? {
            [characterBonusKey]: this.statsComputation.addStats([
              character.bonusStat[characterBonusKey],
              weapon.bonusStat[characterBonusKey],
            ]),
          }
        : { ...character.bonusStat, ...weapon.bonusStat };
    const max = allArtifacts.length - 1;

    const addArtifactsToCompute = (artifacts: Artifact[], i: number) => {
      allArtifacts[i].forEach((artifact: Artifact) => {
        const artifactsToCompute = [...artifacts];
        artifactsToCompute.push(artifact);
        if (i === max) {
          if (this.setFilterMatch(setFilter, artifactsToCompute)) {
            const buildStats = this.statsComputation.computeStats({ ...baseStats }, characterBonusStats, artifactsToCompute);
            if (this.statFilterMatch(statsFilter, buildStats)) {
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

  private setFilterMatch(setFilter: SetFilter, artifactsToCompute: Artifact[]): boolean {
    const setMatchingFilterCount = (): number => {
      const setsMatchingPieces = setFilter.setNames.filter((setName) => {
        const artifactsMatchingSetName = artifactsToCompute.filter((artifact) => artifact.set === setName);
        return artifactsMatchingSetName.length >= setFilter.pieces;
      });
      return setsMatchingPieces.length;
    };

    return !setFilter || setMatchingFilterCount() >= setFilter.setNames.length;
  }

  private statFilterMatch(statsFilter: { [statName: string]: number }, buildStats: CharacterStatsValues): boolean {
    return !statsFilter || Object.keys(statsFilter).every((statName: CharacterStats) => buildStats[statName] >= statsFilter[statName]);
  }
}
