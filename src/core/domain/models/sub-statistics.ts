export enum PossibleSubStats {
  flatHp = 'flatHp',
  percentHp = 'percentHp',
  flatAtk = 'flatAtk',
  percentAtk = 'percentAtk',
  flatDef = 'flatDef',
  percentDef = 'percentDef',
  elementalMastery = 'elementalMastery',
  energyRecharge = 'energyRecharge',
  critRate = 'critRate',
  critDmg = 'critDmg',
}

export type PossibleSubStatTypes = keyof typeof PossibleSubStats;

export type SubStatsValues = Partial<{ [key in PossibleSubStats]: number }>;
