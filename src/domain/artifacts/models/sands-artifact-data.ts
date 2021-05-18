import { MainStats } from './main-statistics';
import { ArtifactData } from './artifact-data';

export type SandsMainStatType =
  | MainStats.percentAtk
  | MainStats.percentDef
  | MainStats.percentHp
  | MainStats.elementalMastery
  | MainStats.energyRecharge;

export const sandsMainStats: SandsMainStatType[] = [
  MainStats.percentAtk,
  MainStats.percentDef,
  MainStats.percentHp,
  MainStats.elementalMastery,
  MainStats.energyRecharge,
];

export interface SandsArtifactData extends ArtifactData {
  mainStatType: SandsMainStatType;
}
