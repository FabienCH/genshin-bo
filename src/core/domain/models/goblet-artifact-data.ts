import { PossibleMainStats } from './main-statistics';
import { ArtifactData } from './artifact-data';

export type GobletMainStatType =
  | PossibleMainStats.percentAtk
  | PossibleMainStats.percentDef
  | PossibleMainStats.percentHp
  | PossibleMainStats.elementalMastery
  | PossibleMainStats.anemoDmg
  | PossibleMainStats.cryoDmg
  | PossibleMainStats.dendroDmg
  | PossibleMainStats.electroDmg
  | PossibleMainStats.geoDmg
  | PossibleMainStats.hydroDmg
  | PossibleMainStats.pyroDmg
  | PossibleMainStats.physicalDmg;

export interface GobletArtifactData extends ArtifactData {
  mainStatType: GobletMainStatType;
}
