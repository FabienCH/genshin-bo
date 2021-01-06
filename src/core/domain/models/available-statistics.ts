import { PossibleMainStats } from './main-statistics';
import { SetStats } from './set-statistics';
import { PossibleSubStats } from './sub-statistics';

export type AllPossibleStats = keyof typeof PossibleMainStats | keyof typeof PossibleSubStats | keyof typeof SetStats;

export const possibleBuildStats = { ...PossibleMainStats, ...PossibleSubStats, ...SetStats };

export type BuildStatisticsValues = Partial<{ [key in AllPossibleStats]: number }>;
