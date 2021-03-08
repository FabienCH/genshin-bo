import { CharacterStatsValues, CharacterStats } from '../domain/models/character-statistics';

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
}
