import { MainStat, PossibleMainStats } from '../models/main-statistics';
import { SetNames } from '../models/sets-with-effects';
import { SubStats } from '../models/sub-statistics';
import { Artifact } from './artifact';

export type CircletMainStatType =
  | PossibleMainStats.percentAtk
  | PossibleMainStats.percentDef
  | PossibleMainStats.percentHp
  | PossibleMainStats.elementalMastery
  | PossibleMainStats.critRate
  | PossibleMainStats.cryoDmg
  | PossibleMainStats.healingBonus;

export class CircletArtifact extends Artifact {
  public mainStat: MainStat;
  constructor(id: string, set: SetNames, subStats: SubStats, level: number, mainStatType: CircletMainStatType) {
    super(id, set, subStats, level, mainStatType);
  }
}
