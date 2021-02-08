import { PossibleMainStats } from './main-statistics';
import { ArtifactData } from './artifact-data';

export type CircletMainStatType =
  | PossibleMainStats.percentAtk
  | PossibleMainStats.percentDef
  | PossibleMainStats.percentHp
  | PossibleMainStats.elementalMastery
  | PossibleMainStats.critRate
  | PossibleMainStats.cryoDmg
  | PossibleMainStats.healingBonus;

export interface CircletArtifactData extends ArtifactData {
  mainStatType: CircletMainStatType;
}
