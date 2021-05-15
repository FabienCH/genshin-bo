export enum SetStats {
  percentAtk = 'percentAtk',
  percentHp = 'percentHp',
  elementalMastery = 'elementalMastery',
  healingBonus = 'healingBonus',
  pyroDmg = 'pyroDmg',
  hydroDmg = 'hydroDmg',
  dendroDmg = 'dendroDmg',
  electroDmg = 'electroDmg',
  anemoDmg = 'anemoDmg',
  cryoDmg = 'cryoDmg',
  geoDmg = 'geoDmg',
  physicalDmg = 'physicalDmg',
  powerfulShield = 'powerfulShield',
  pyroRes = 'pyroRes',
  hydroRes = 'hydroRes',
  dendroRes = 'dendroRes',
  electroRes = 'electroRes',
  anemoRes = 'anemoRes',
  cryoRes = 'cryoRes',
  geoRes = 'geoRes',
}

export type SetStatTypes = keyof typeof SetStats;

export type SetStatsValues = Partial<{ [key in SetStats]: number }>;
