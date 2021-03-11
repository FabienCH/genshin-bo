import { InMemoryArtifactsRepository } from '../adapters/secondaries/in-memory-artifacts-repository';
import { ArtifactsRepository } from '../domain/artifacts-repository';
import { AllArtifactsData } from '../domain/models/artifact-data';
import { ArtifactsHandler } from '../usescases/artifacts-handler';

export abstract class ArtifactsDI {
  public static artifactsHandler: ArtifactsHandler = new ArtifactsHandler();

  private static artifactsRepository: ArtifactsRepository;

  public static registerRepository(artifactsData?: AllArtifactsData): void {
    ArtifactsDI.artifactsRepository = new InMemoryArtifactsRepository(artifactsData);
  }

  public static getRepository(): ArtifactsRepository {
    if (ArtifactsDI.artifactsRepository) {
      return ArtifactsDI.artifactsRepository;
    }
    throw new Error('Artifacts repository is not registered.');
  }
}
