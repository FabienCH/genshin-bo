import { MainStats } from './main-statistics';
import { ArtifactData } from './artifact-data';

export type CircletMainStatType =
  | MainStats.percentAtk
  | MainStats.percentDef
  | MainStats.percentHp
  | MainStats.elementalMastery
  | MainStats.critRate
  | MainStats.cryoDmg
  | MainStats.healingBonus;

export interface CircletArtifactData extends ArtifactData {
  mainStatType: CircletMainStatType;
}
