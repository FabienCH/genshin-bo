import { MainStats } from './main-statistics';
import { ArtifactData } from './artifact-data';

export type GobletMainStatType =
  | MainStats.percentAtk
  | MainStats.percentDef
  | MainStats.percentHp
  | MainStats.elementalMastery
  | MainStats.anemoDmg
  | MainStats.cryoDmg
  | MainStats.dendroDmg
  | MainStats.electroDmg
  | MainStats.geoDmg
  | MainStats.hydroDmg
  | MainStats.pyroDmg
  | MainStats.physicalDmg;

export interface GobletArtifactData extends ArtifactData {
  mainStatType: GobletMainStatType;
}
