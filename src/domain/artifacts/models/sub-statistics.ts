export enum SubStats {
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

export type SubStatTypes = keyof typeof SubStats;

export type SubStatsValues = Partial<{ [key in SubStats]: number }>;
