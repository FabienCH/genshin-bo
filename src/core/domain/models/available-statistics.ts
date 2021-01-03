import { PossibleMainStats } from './main-statistics';
import { PossibleSubStats } from './sub-statistics';

type AllPossibleStats = keyof typeof PossibleMainStats | keyof typeof PossibleSubStats;

export const possibleBuildStats = { ...PossibleMainStats, ...PossibleSubStats };

export type BuildStatisticsValues = Partial<{ [key in AllPossibleStats]: number }>;
