import { PossibleMainStats } from './main-statistics';
import { ArtifactData } from './artifact-data';

export type SandsMainStatType =
  | PossibleMainStats.percentAtk
  | PossibleMainStats.percentDef
  | PossibleMainStats.percentHp
  | PossibleMainStats.elementalMastery
  | PossibleMainStats.energyRecharge;

export interface SandsArtifactData extends ArtifactData {
  mainStatType: SandsMainStatType;
}
