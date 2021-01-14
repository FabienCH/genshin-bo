import { PossibleMainStats, PossibleMainStatTypes } from './main-statistics';
import { SetStats } from './set-statistics';
import { PossibleSubStats } from './sub-statistics';

export type AllPossibleStats = PossibleMainStatTypes | keyof typeof PossibleSubStats | keyof typeof SetStats;

export const possibleBuildStats = { ...PossibleMainStats, ...PossibleSubStats, ...SetStats };

export type BuildStatisticsValues = Partial<{ [key in AllPossibleStats]: number }>;
