import { MainStats } from './main-statistics';
import { ArtifactData } from './artifact-data';
import { formPlaceholder, FormPlaceholder } from './form-placeholder';

export type CircletMainStatType =
  | MainStats.percentAtk
  | MainStats.percentDef
  | MainStats.percentHp
  | MainStats.elementalMastery
  | MainStats.critRate
  | MainStats.critDmg
  | MainStats.healingBonus;

export type CircletMainStatWithPlaceholder = FormPlaceholder | CircletMainStatType;
export const circletMainStatsWithPlaceholder: CircletMainStatWithPlaceholder[] = [
  formPlaceholder,
  MainStats.percentAtk,
  MainStats.percentDef,
  MainStats.percentHp,
  MainStats.elementalMastery,
  MainStats.critRate,
  MainStats.critDmg,
  MainStats.healingBonus,
];

export interface CircletArtifactData extends ArtifactData {
  mainStatType: CircletMainStatType;
}
