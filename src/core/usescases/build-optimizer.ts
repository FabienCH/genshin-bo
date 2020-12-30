import { Artifact } from '../domain/entities/artifact';

export class BuildOptimizer {
  public computeBuildStats(artifact1: Artifact, artifact2: Artifact): { hp?: number; atk?: number; def?: number } {
    if (artifact1.def || artifact2.def) {
      return { hp: artifact1.hp + artifact2.hp, atk: artifact1.atk + artifact2.atk, def: artifact1.def + artifact2.def };
    }
    if (artifact1.atk || artifact2.atk) {
      return { hp: artifact1.hp + artifact2.hp, atk: artifact1.atk + artifact2.atk };
    }

    return { hp: artifact1.hp + artifact2.hp };
  }
}
