import { Artifact } from '../domain/entities/artifact';
import { FlowerArtifact } from '../domain/entities/flower-artifact';
import { PlumeArtifact } from '../domain/entities/plume-artifact';
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

  public getAll(): Artifact[] {
    return this.artifacts;
  }
}
