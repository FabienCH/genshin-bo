import { Artifact } from '../domain/entities/artifact';
import { CircletArtifact, CircletMainStatType } from '../domain/entities/circlet-artifact';
import { FlowerArtifact } from '../domain/entities/flower-artifact';
import { GobletArtifact, GobletMainStatType } from '../domain/entities/goblet-artifact';
import { PlumeArtifact } from '../domain/entities/plume-artifact';
import { SandsArtifact, SandsMainStatType } from '../domain/entities/sands-artifact';
import { ArtifactTypes } from '../domain/models/artifact-types';
import { PossibleMainStats } from '../domain/models/main-statistics';
import { SetNames } from '../domain/models/sets-with-effects';
import { SubStats } from '../domain/models/sub-statistics';

export class ArtifactsHandler {
  private artifacts: Artifact[] = [];
  public add(id: string, type: ArtifactTypes, set: SetNames, subStats: SubStats, level: number, mainStatType?: PossibleMainStats): void {
    this.artifacts = [...this.artifacts, new Artifact(id, type, set, subStats, level, mainStatType)];
  }

  public addFlowerArtifact(id: string, set: SetNames, subStats: SubStats, level: number): void {
    this.artifacts = [...this.artifacts, new FlowerArtifact(id, set, subStats, level)];
  }

  public addPlumeArtifact(id: string, set: SetNames, subStats: SubStats, level: number): void {
    this.artifacts = [...this.artifacts, new PlumeArtifact(id, set, subStats, level)];
  }

  public addSandsArtifact(id: string, set: SetNames, subStats: SubStats, level: number, mainStatType: SandsMainStatType): void {
    this.artifacts = [...this.artifacts, new SandsArtifact(id, set, subStats, level, mainStatType)];
  }

  public addGobletArtifact(id: string, set: SetNames, subStats: SubStats, level: number, mainStatType: GobletMainStatType): void {
    this.artifacts = [...this.artifacts, new GobletArtifact(id, set, subStats, level, mainStatType)];
  }

  public addCircletArtifact(id: string, set: SetNames, subStats: SubStats, level: number, mainStatType: CircletMainStatType): void {
    this.artifacts = [...this.artifacts, new CircletArtifact(id, set, subStats, level, mainStatType)];
  }

  public getAll(): Artifact[] {
    return this.artifacts;
  }
}
