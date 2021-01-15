import { PossibleSubStatTypes, SubStatsValues } from './sub-statistics';

export enum PossibleMainStats {
  flatHp = 'flatHp',
  percentHp = 'percentHp',
  flatAtk = 'flatAtk',
  percentAtk = 'percentAtk',
  percentDef = 'percentDef',
  elementalMastery = 'elementalMastery',
  energyRecharge = 'energyRecharge',
  pyroDmg = 'pyroDmg',
  hydroDmg = 'hydroDmg',
  dendroDmg = 'dendroDmg',
  electroDmg = 'electroDmg',
  anemoDmg = 'anemoDmg',
  cryoDmg = 'cryoDmg',
  geoDmg = 'geoDmg',
  physicalDmg = 'physicalDmg',
  critRate = 'critRate',
  critDmg = 'critDmg',
  healingBonus = 'healingBonus',
}

export type PossibleMainStatTypes = keyof typeof PossibleMainStats;

export interface MainStat {
  [statName: string]: number;
}

export type MainStatsValues = Partial<{ [key in PossibleMainStats]: number }>;

export type ArtifactStatsValues = MainStatsValues & SubStatsValues;

export type ArtifactStatsTypes = PossibleMainStatTypes | PossibleSubStatTypes;
