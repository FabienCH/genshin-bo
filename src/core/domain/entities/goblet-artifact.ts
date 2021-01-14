import { MainStat, PossibleMainStats } from '../models/main-statistics';
import { SetNames } from '../models/sets-with-effects';
import { SubStats } from '../models/sub-statistics';
import { Artifact } from './artifact';

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

export class GobletArtifact extends Artifact {
  public mainStat: MainStat;
  constructor(id: string, set: SetNames, subStats: SubStats, level: number, mainStatType: GobletMainStatType) {
    super(id, set, subStats, level, mainStatType);
  }
}
