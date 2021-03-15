import { Artifact } from './entities/artifact';
import { CharacterStatsValues, CharacterStats } from './models/character-statistics';
import { SetNames } from './models/sets-with-effects';

export abstract class BuildFilter {
  public static filterBuilds(statsFilter: Partial<CharacterStatsValues>, buildStats: CharacterStatsValues): boolean {
    const getStatValue = (statValue: number | undefined): number => (!statValue || isNaN(statValue) ? 0 : statValue);

    return (
      !statsFilter ||
      Object.keys(statsFilter).every(
        (statName) => getStatValue(buildStats[statName as CharacterStats]) >= getStatValue(statsFilter[statName as CharacterStats]),
      )
    );
  }

  public static setFilterMatch(
    setFilter: {
      setNames: SetNames[];
      pieces: 2 | 4;
    },
    artifactsToCompute: Artifact[],
  ): boolean {
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
