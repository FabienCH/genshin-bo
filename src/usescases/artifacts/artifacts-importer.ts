import {
  deleteAllArtifactsAction,
  importArtifactsFromVideoAction,
  runOcrOnImageAction,
} from '../../adapters/redux/artifacts/artifacts-action';
import { appStore } from '../../adapters/redux/store';
import { ArtifactsDI } from '../../di/artifacts-di';
import { VideoToFrames } from '../../domain/artifacts/mappers/video-to-frames';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArtifactValidator } from '../../domain/artifacts/artifacts-validator';
import { ArtifactData } from '../../domain/artifacts/models/artifact-data';

export interface JsonImportResults {
  artifacts: ArtifactData[];
  artifactsInError: number;
  fileError?: string;
}

export class ArtifactsImporter {
  private readonly allFramesRetrieve: Subject<void> = new Subject();

  constructor(private readonly artifactValidator: ArtifactValidator) {}

  public async importFromVideo(video: File, nbOfWorkers: number, overrideCurrentArtifacts = false, fixOcrErrors = false): Promise<void> {
    appStore.dispatch(importArtifactsFromVideoAction());
    await ArtifactsDI.getArtifactImageOcr().initializeOcr(nbOfWorkers);

    if (overrideCurrentArtifacts) {
      appStore.dispatch(deleteAllArtifactsAction());
    }

    VideoToFrames.getFrames(video, 10)
      .pipe(takeUntil(this.allFramesRetrieve))
      .subscribe((frameData) => {
        appStore.dispatch(runOcrOnImageAction({ frameData, fixOcrErrors }));
        if (frameData.isLast) {
          this.allFramesRetrieve.next();
        }
      });
  }

  public async getArtifactsFromJson(jsonFile: File): Promise<JsonImportResults> {
    const extension = jsonFile.name.substring(jsonFile.name.lastIndexOf('.') + 1);
    const initialImportResults: JsonImportResults = { artifacts: [], artifactsInError: 0 };
    const suffixMessage = 'Please import a previously exported JSON file.';
    const malformedJsonMessage = `JSON file not properly formatted. ${suffixMessage}`;
    const resultsWithErrorMessage = (jsonImportResults: JsonImportResults, errorMessage: string): JsonImportResults => ({
      ...jsonImportResults,
      fileError: errorMessage,
    });

    if (extension === 'json' && jsonFile.type === 'application/json') {
      const artifactsData: ArtifactData[] = await this.parseJsonFile(jsonFile);
      return artifactsData.length
        ? this.getImportResults(artifactsData, initialImportResults)
        : resultsWithErrorMessage(initialImportResults, malformedJsonMessage);
    } else {
      return resultsWithErrorMessage(initialImportResults, `Invalid file format. ${suffixMessage}`);
    }
  }

  public cancelImport(): void {
    VideoToFrames.cancel();
    ArtifactsDI.getArtifactImageOcr().cancelOcr();
  }

  private async parseJsonFile(jsonFile: File): Promise<ArtifactData[]> {
    try {
      const artifactsData: ArtifactData[] = JSON.parse(await jsonFile.text());
      if (!Array.isArray(artifactsData)) {
        return [];
      }
      return artifactsData;
    } catch (_) {
      return [];
    }
  }

  private getImportResults(
    artifactsData: ArtifactData[],
    initialImportInfos: JsonImportResults,
  ): JsonImportResults | PromiseLike<JsonImportResults> {
    return artifactsData.reduce((jsonImportInfos: JsonImportResults, artifactData: ArtifactData) => {
      if (this.artifactValidator.isArtifactValid(artifactData)) {
        jsonImportInfos.artifacts.push(artifactData);
      } else {
        jsonImportInfos.artifactsInError++;
      }
      return jsonImportInfos;
    }, initialImportInfos);
  }
}
