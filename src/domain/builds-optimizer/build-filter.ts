import { Artifact } from '../artifacts/entities/artifact';
import { SetNames } from '../artifacts/models/sets-with-effects';
import { CharacterStatsValues, CharacterStats } from './models/character-statistics';

export interface SetFilter {
  setNames: SetNames[];
  pieces: 2 | 4;
}

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

  public static setFilterMatch(setFilter: SetFilter, artifactsToCompute: Artifact[]): boolean {
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
