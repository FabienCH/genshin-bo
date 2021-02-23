import { InMemoryArtifactsRepository } from '../adapters/secondaries/in-memory-artifacts-repository';
import { ArtifactsHandler } from '../usescases/artifacts-handler';

export const ArtifactsDI = {
  artifactsHandler: new ArtifactsHandler(new InMemoryArtifactsRepository()),
};
