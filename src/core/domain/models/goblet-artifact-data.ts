import { MainStats } from './main-statistics';
import { ArtifactData } from './artifact-data';
import { formPlaceholder, FormPlaceholder } from './form-placeholder';

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

export type GobletMainStatWithPlaceholder = FormPlaceholder | GobletMainStatType;
export const gobletMainStatWithPlaceholder: GobletMainStatWithPlaceholder[] = [
  formPlaceholder,
  MainStats.percentAtk,
  MainStats.percentDef,
  MainStats.percentHp,
  MainStats.elementalMastery,
  MainStats.anemoDmg,
  MainStats.cryoDmg,
  MainStats.dendroDmg,
  MainStats.electroDmg,
  MainStats.geoDmg,
  MainStats.hydroDmg,
  MainStats.pyroDmg,
  MainStats.physicalDmg,
];

export interface GobletArtifactData extends ArtifactData {
  mainStatType: GobletMainStatType;
}
