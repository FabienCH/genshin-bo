import { ArtifactData } from './models/artifact-data';
import { CircletArtifactData } from './models/circlet-artifact-data';
import { GobletArtifactData } from './models/goblet-artifact-data';
import { SandsArtifactData } from './models/sands-artifact-data';

export interface ArtifactsRepository {
  getAll(): ArtifactData[];
  getFlowerArtifacts(): ArtifactData[];
  getPlumeArtifacts(): ArtifactData[];
  getSandsArtifacts(): SandsArtifactData[];
  getGobletArtifacts(): GobletArtifactData[];
  getCircletArtifacts(): CircletArtifactData[];
}
