import { SubStatTypes, SubStatsValues } from './sub-statistics';

export enum MainStats {
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

export type MainStatTypes = keyof typeof MainStats;

export interface MainStat {
  [statName: string]: number;
}

export type MainStatsValues = Partial<{ [key in MainStats]: number }>;

export type ArtifactStatsValues = MainStatsValues & SubStatsValues;

export type ArtifactStatsTypes = MainStatTypes | SubStatTypes;
