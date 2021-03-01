import { MainStats } from './main-statistics';
import { ArtifactData } from './artifact-data';
import { formPlaceholder, FormPlaceholder } from './form-placeholder';

export type SandsMainStatType =
  | MainStats.percentAtk
  | MainStats.percentDef
  | MainStats.percentHp
  | MainStats.elementalMastery
  | MainStats.energyRecharge;

export type SandsMainStatWithPlaceholder = FormPlaceholder | SandsMainStatType;
export const sandsMainStatsWithPlaceholder: SandsMainStatWithPlaceholder[] = [
  formPlaceholder,
  MainStats.percentAtk,
  MainStats.percentDef,
  MainStats.percentHp,
  MainStats.elementalMastery,
  MainStats.energyRecharge,
];

export interface SandsArtifactData extends ArtifactData {
  mainStatType: SandsMainStatType;
}
