import { Artifact } from './entities/artifact';
import { CircletArtifact } from './entities/circlet-artifact';
import { FlowerArtifact } from './entities/flower-artifact';
import { GobletArtifact } from './entities/goblet-artifact';
import { PlumeArtifact } from './entities/plume-artifact';
import { SandsArtifact } from './entities/sands-artifact';

export interface ArtifactsRepository {
  getAll(): Artifact[];
  getFlowerArtifacts(): FlowerArtifact[];
  getPlumeArtifacts(): PlumeArtifact[];
  getSandsArtifacts(): SandsArtifact[];
  getGobletArtifacts(): GobletArtifact[];
  getCircletArtifacts(): CircletArtifact[];
}
