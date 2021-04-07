import { OcrWorkerHandlerMock } from '../../test/artifacts-ocr-worker-mock';
import { InMemoryArtifactsRepository } from '../adapters/secondaries/in-memory-artifacts-repository';
import { ArtifactsRepository } from '../domain/artifacts-repository';
import { AllArtifactsData } from '../domain/models/artifact-data';
import { ArtifactOcrWorkerHandler, OcrWorkerHandler } from '../domain/artifact-ocr-worker-handler';
import { ArtifactsHandler } from '../usescases/artifacts-handler';
import { ArtifactsImporter } from '../usescases/artifacts-importer';
import { LocalStorageArtifactsRepository } from '../adapters/secondaries/local-storage-artifacts-repository';

export abstract class ArtifactsDI {
  public static artifactsHandler: ArtifactsHandler;

  private static artifactsRepository: ArtifactsRepository;
  private static ocrWorkerHandler: OcrWorkerHandler;
  private static artifactsImporter: ArtifactsImporter;

  public static registerRepository(artifactsData?: AllArtifactsData): void {
    ArtifactsDI.artifactsRepository = new InMemoryArtifactsRepository(artifactsData);
    switch (process.env.NODE_ENV) {
      case 'test':
        ArtifactsDI.artifactsRepository = new InMemoryArtifactsRepository(artifactsData);
        break;
      default:
        ArtifactsDI.artifactsRepository = new LocalStorageArtifactsRepository();
    }
    ArtifactsDI.artifactsHandler = new ArtifactsHandler();
  }

  public static registerOcrWorker(): void {
    if (!ArtifactsDI.ocrWorkerHandler) {
      switch (process.env.NODE_ENV) {
        case 'test':
          ArtifactsDI.ocrWorkerHandler = new OcrWorkerHandlerMock();
          break;
        default:
          ArtifactsDI.ocrWorkerHandler = new ArtifactOcrWorkerHandler();
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

  public static getOcrWorkerHandler(): OcrWorkerHandler {
    if (ArtifactsDI.ocrWorkerHandler) {
      return ArtifactsDI.ocrWorkerHandler;
    }
    throw new Error('Artifacts OCR worker is not registered.');
  }

  public static getArtifactsImporter(): ArtifactsImporter {
    if (ArtifactsDI.ocrWorkerHandler && ArtifactsDI.artifactsImporter) {
      return ArtifactsDI.artifactsImporter;
    }
    throw new Error('Artifacts OCR worker is not registered.');
  }
}
