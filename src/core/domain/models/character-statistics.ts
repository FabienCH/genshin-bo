export enum PossibleCharacterStats {
  hp = 'hp',
  atk = 'atk',
  def = 'def',
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
  pyroRes = 'pyroRes',
  hydroRes = 'hydroRes',
  dendroRes = 'dendroRes',
  electroRes = 'electroRes',
  anemoRes = 'anemoRes',
  cryoRes = 'cryoRes',
  geoRes = 'geoRes',
  healingBonus = 'healingBonus',
  powerfulShield = 'powerfulShield',
}

export type CharacterStatTypes = keyof typeof PossibleCharacterStats;

export type CharacterStatsValues = Partial<{ [key in PossibleCharacterStats]: number }>;
