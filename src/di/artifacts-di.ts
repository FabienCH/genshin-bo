import { OcrWorkerHandlerMock } from '../test/artifacts-ocr-worker-mock';
import { InMemoryArtifactsRepository } from '../adapters/secondaries/artifacts/in-memory-artifacts-repository';
import { ArtifactsRepository } from '../domain/artifacts/ports/repositories/artifacts-repository';
import { AllArtifactsData } from '../domain/artifacts/models/artifact-data';
import { ArtifactOcrWorkersHandler, OcrWorkerHandler } from '../domain/artifacts/artifact-ocr-worker-handler';
import { ArtifactsHandler } from '../usescases/artifacts/artifacts-handler';
import { ArtifactsImporter } from '../usescases/artifacts/artifacts-importer';
import { LocalStorageArtifactsRepository } from '../adapters/secondaries/artifacts/local-storage-artifacts-repository';
import { ArtifactImageOcr } from '../domain/artifacts/artifact-images-ocr';
import { ArtifactsExporter } from '../usescases/artifacts/artifacts-exporter';
import { ArtifactValidator } from '../domain/artifacts/artifacts-validator';
import { VideoValidator } from '../usescases/artifacts/video-validator';

export abstract class ArtifactsDI {
  private static artifactsRepository: ArtifactsRepository;
  private static ocrWorkerHandler: OcrWorkerHandler;
  private static artifactsImporter: ArtifactsImporter;
  private static artifactImageOcr: ArtifactImageOcr;

  public static registerRepository(artifactsData?: AllArtifactsData): void {
    switch (process.env.NODE_ENV) {
      case 'test':
        ArtifactsDI.artifactsRepository = new InMemoryArtifactsRepository(artifactsData);
        break;
      default:
        ArtifactsDI.artifactsRepository = new LocalStorageArtifactsRepository();
    }
  }

  public static registerOcrWorker(): void {
    if (!ArtifactsDI.ocrWorkerHandler) {
      switch (process.env.NODE_ENV) {
        case 'test':
          ArtifactsDI.ocrWorkerHandler = new OcrWorkerHandlerMock();
          break;
        default:
          ArtifactsDI.ocrWorkerHandler = new ArtifactOcrWorkersHandler();
      }
    }
    ArtifactsDI.artifactsImporter = new ArtifactsImporter(new ArtifactValidator());
    ArtifactsDI.artifactImageOcr = new ArtifactImageOcr();
  }

  public static getRepository(): ArtifactsRepository {
    if (ArtifactsDI.artifactsRepository) {
      return ArtifactsDI.artifactsRepository;
    }
    throw new Error('Artifacts repository is not registered.');
  }

  public static getArtifactsHandler(artifactsData?: AllArtifactsData): ArtifactsHandler {
    ArtifactsDI.registerRepository(artifactsData);
    return new ArtifactsHandler(new ArtifactValidator());
  }

  public static getOcrWorkerHandler(): OcrWorkerHandler {
    if (ArtifactsDI.ocrWorkerHandler) {
      return ArtifactsDI.ocrWorkerHandler;
    }
    throw new Error('Artifacts OCR worker is not registered.');
  }

  public static getArtifactsImporter(): ArtifactsImporter {
    if (!ArtifactsDI.ocrWorkerHandler) {
      ArtifactsDI.registerOcrWorker();
    }
    return ArtifactsDI.artifactsImporter;
  }

  public static getArtifactImageOcr(): ArtifactImageOcr {
    if (!ArtifactsDI.ocrWorkerHandler) {
      ArtifactsDI.registerOcrWorker();
    }
    return ArtifactsDI.artifactImageOcr;
  }

  public static getArtifactsExporter(): ArtifactsExporter {
    return new ArtifactsExporter();
  }

  public static getVideoValidator(): VideoValidator {
    return new VideoValidator();
  }
}
