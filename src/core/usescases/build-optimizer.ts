import { Artifact } from '../domain/entities/artifact';
import { AllArtifacts } from '../domain/models/all-artifacts';
import { Character } from '../domain/models/character';
import { CharacterStatsValues, CharacterStats } from '../domain/models/character-statistics';
import { MainStatsValues } from '../domain/models/main-statistics';
import { SetNames } from '../domain/models/sets-with-effects';
import { StatsComputation } from '../domain/stats-computation';

export class BuildOptimizer {
  private readonly statsComputation: StatsComputation;

  constructor() {
    this.statsComputation = new StatsComputation();
  }

  public computeBuildsStats(
    character: Character,
    artifacts: AllArtifacts,
    setFilter?: { setNames: SetNames[]; pieces: 2 | 4 },
    statsFilter?: { [statName: string]: number },
  ): CharacterStatsValues[] {
    if (
      setFilter &&
      setFilter.setNames.reduce((totalPieces) => {
        totalPieces += setFilter.pieces;
        return totalPieces;
      }, 0) > 5
    ) {
      throw new Error('total pieces can not be higher than 5');
    }

    const allBuilds: CharacterStatsValues[] = [];
    const allArtifacts = Object.values(artifacts);
    const weapon = character.weapon;
    const baseStats: CharacterStatsValues = { ...character.stats, atk: character.stats.atk + weapon.atk };
    const characterBonusKey = character.bonusStat ? Object.keys(character.bonusStat)[0] : character.bonusStat;
    const characterBonusStat: MainStatsValues =
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
          if (
            !setFilter ||
            setFilter.setNames.filter(
              (setName) => artifactsToCompute.filter((artifact) => artifact.set === setName).length >= setFilter.pieces,
            ).length >= setFilter.setNames.length
          ) {
            const buildStats = this.statsComputation.computeStats({ ...baseStats }, characterBonusStat, artifactsToCompute);
            if (
              !statsFilter ||
              Object.keys(statsFilter).every((statName: CharacterStats) => buildStats[statName] >= statsFilter[statName])
            ) {
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
}
