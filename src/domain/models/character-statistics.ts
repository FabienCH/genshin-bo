import { MainStats } from '../artifacts/models/main-statistics';
import { SetStats } from '../artifacts/models/set-statistics';
import { SubStats } from '../artifacts/models/sub-statistics';

export enum CharacterStats {
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
  [CharacterStats.hp]: number;
  [CharacterStats.atk]: number;
  [CharacterStats.def]: number;
};

export type CharacterStatTypes = keyof typeof CharacterStats;

export type CharacterStatsValues = CharacterStatsPerLevel & Partial<{ [key in CharacterStats]: number }>;

export const allBuildStats = { ...CharacterStats, ...MainStats, ...SubStats, ...SetStats };

export type AllBuildStatTypes = keyof typeof allBuildStats;
