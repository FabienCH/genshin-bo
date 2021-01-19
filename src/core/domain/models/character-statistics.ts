import { PossibleMainStats } from './main-statistics';
import { PossibleSubStats } from './sub-statistics';

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

export type CharacterStatsPerLevel = {
  [PossibleCharacterStats.hp]: number;
  [PossibleCharacterStats.atk]: number;
  [PossibleCharacterStats.def]: number;
};

export type CharacterStatTypes = keyof typeof PossibleCharacterStats;

export type CharacterStatsValues = Partial<{ [key in PossibleCharacterStats]: number }>;

export const possibleBuildStats = { ...PossibleCharacterStats, ...PossibleMainStats, ...PossibleSubStats, ...PossibleSubStats };

export type AllBuildStatTypes = keyof typeof possibleBuildStats;
