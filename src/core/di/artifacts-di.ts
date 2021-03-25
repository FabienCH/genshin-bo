import { OcrWorkerMock } from '../../test/artifacts-ocr.worker-mock';
import { InMemoryArtifactsRepository } from '../adapters/secondaries/in-memory-artifacts-repository';
import { ArtifactsRepository } from '../domain/artifacts-repository';
import { AllArtifactsData } from '../domain/models/artifact-data';
import { ArtifactsOcrWorker, OcrWorker } from '../domain/worker/artifacts-ocr.worker-mock';
import { ArtifactsHandler } from '../usescases/artifacts-handler';
import { ArtifactsImporter } from '../usescases/artifacts-importer';

export abstract class ArtifactsDI {
  public static artifactsHandler: ArtifactsHandler;

  private static artifactsRepository: ArtifactsRepository;
  private static ocrWorker: OcrWorker;
  private static artifactsImporter: ArtifactsImporter;

  public static registerRepository(artifactsData?: AllArtifactsData): void {
    ArtifactsDI.artifactsRepository = new InMemoryArtifactsRepository(artifactsData);
    ArtifactsDI.artifactsHandler = new ArtifactsHandler();
  }

  public static registerOcrWorker(): void {
    if (!ArtifactsDI.ocrWorker) {
      switch (process.env.NODE_ENV) {
        case 'test':
          ArtifactsDI.ocrWorker = new OcrWorkerMock();
          break;
        default:
          ArtifactsDI.ocrWorker = new ArtifactsOcrWorker();
      }
    }
    ArtifactsDI.artifactsImporter = new ArtifactsImporter();
  }

  public static getRepository(): ArtifactsRepository {
    if (ArtifactsDI.artifactsRepository) {
      return ArtifactsDI.artifactsRepository;
    }
    throw new Error('Artifacts repository is not registered.');
  }

  public static getOcrWorker(): OcrWorker {
    if (ArtifactsDI.ocrWorker) {
      return ArtifactsDI.ocrWorker;
    }
    throw new Error('Artifacts OCR worker is not registered.');
  }

  public static getArtifactsImporter(): ArtifactsImporter {
    if (ArtifactsDI.ocrWorker && ArtifactsDI.artifactsImporter) {
      return ArtifactsDI.artifactsImporter;
    }
    throw new Error('Artifacts OCR worker is not registered.');
  }
}
