import { ArtifactsRepository } from '../domain/artifacts-repository';
import { Artifact } from '../domain/entities/artifact';
import { CircletArtifact } from '../domain/entities/circlet-artifact';
import { FlowerArtifact } from '../domain/entities/flower-artifact';
import { GobletArtifact } from '../domain/entities/goblet-artifact';
import { PlumeArtifact } from '../domain/entities/plume-artifact';
import { SandsArtifact } from '../domain/entities/sands-artifact';
import { CircletMainStatType } from '../domain/models/circlet-artifact-data';
import { GobletMainStatType } from '../domain/models/goblet-artifact-data';
import { SandsMainStatType } from '../domain/models/sands-artifact-data';
import { SetNames } from '../domain/models/sets-with-effects';
import { SubStatsValues } from '../domain/models/sub-statistics';

export class ArtifactsHandler {
  private artifacts: Artifact[] = [];

  constructor(private readonly artifactsRepository: ArtifactsRepository) {}

  public getAll(): Artifact[] {
    return this.artifactsRepository.getAll();
  }

  public getById(id: string): Artifact {
    const artifact = this.artifacts.find((storedArtifact) => storedArtifact.id === id);
    if (!artifact) {
      throw new Error(`artifact with id ${id} not found`);
    }
    return artifact;
  }

  public addFlowerArtifact(id: string, set: SetNames, subStats: SubStatsValues, level: number): void {
    this.artifacts = [...this.artifacts, new FlowerArtifact(id, set, subStats, level)];
  }

  public addPlumeArtifact(id: string, set: SetNames, subStats: SubStatsValues, level: number): void {
    this.artifacts = [...this.artifacts, new PlumeArtifact(id, set, subStats, level)];
  }

  public addSandsArtifact(id: string, set: SetNames, subStats: SubStatsValues, level: number, mainStatType: SandsMainStatType): void {
    this.artifacts = [...this.artifacts, new SandsArtifact(id, set, subStats, level, mainStatType)];
  }

  public addGobletArtifact(id: string, set: SetNames, subStats: SubStatsValues, level: number, mainStatType: GobletMainStatType): void {
    this.artifacts = [...this.artifacts, new GobletArtifact(id, set, subStats, level, mainStatType)];
  }

  public addCircletArtifact(id: string, set: SetNames, subStats: SubStatsValues, level: number, mainStatType: CircletMainStatType): void {
    this.artifacts = [...this.artifacts, new CircletArtifact(id, set, subStats, level, mainStatType)];
  }
}
