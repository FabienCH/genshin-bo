import { ArtifactData } from './models/artifact-data';

export interface ArtifactsRepository {
  getAll(): ArtifactData[];
  addOne(artifactData: ArtifactData): void;
}
