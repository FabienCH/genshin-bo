import {
  deleteAllArtifactsAction,
  importArtifactsFromVideoAction,
  runOcrOnImageAction,
} from '../adapters/redux/artifacts/artifacts-action';
import { appStore } from '../adapters/redux/store';
import { ArtifactsDI } from '../di/artifacts-di';
import { VideoToFrames } from '../domain/mappers/video-to-frames';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { importInfos, isArtifactsImportRunning } from '../adapters/redux/artifacts/artifacts-selectors';
import { ImportInfos } from '../adapters/redux/artifacts/artifacts-reducer';
import { ArtifactData } from '../domain/models/artifact-data';
import { ArtifactValidator } from '../domain/artifacts-validator';

export interface JsonImportResults {
  artifacts: ArtifactData[];
  artifactsInError: number;
  fileError?: string;
}

export class ArtifactsImporter {
  private readonly allFramesRetrieve: Subject<void> = new Subject();
  private readonly artifactValidator: ArtifactValidator = new ArtifactValidator();

  public async importFromVideo(video: File, nbOfWorkers: number, overrideCurrentArtifacts = false): Promise<void> {
    appStore.dispatch(importArtifactsFromVideoAction());
    await ArtifactsDI.getArtifactImageOcr().initializeOcr(nbOfWorkers);

    if (overrideCurrentArtifacts) {
      appStore.dispatch(deleteAllArtifactsAction());
    }

    VideoToFrames.getFrames(video, 10)
      .pipe(takeUntil(this.allFramesRetrieve))
      .subscribe((frameData) => {
        appStore.dispatch(runOcrOnImageAction(frameData));
        if (frameData.isLast) {
          this.allFramesRetrieve.next();
        }
      });
  }

  public async getArtifactsFromJson(jsonFile: File): Promise<JsonImportResults> {
    const extension = jsonFile.name.substring(jsonFile.name.lastIndexOf('.') + 1);
    const initialImportResults: JsonImportResults = { artifacts: [], artifactsInError: 0 };
    const noArtifactMessage = 'Could not fin any artifacts.';
    const resultsWithErrorMessage = (jsonImportResults: JsonImportResults, errorMessage: string): JsonImportResults => ({
      ...jsonImportResults,
      fileError: errorMessage,
    });

    if (extension === 'json' && jsonFile.type === 'application/json') {
      try {
        const artifactsData: ArtifactData[] = JSON.parse(await jsonFile.text());
        if (!Array.isArray(artifactsData)) {
          return resultsWithErrorMessage(initialImportResults, noArtifactMessage);
        }
        return this.getImportResults(artifactsData, initialImportResults);
      } catch (_) {
        return resultsWithErrorMessage(initialImportResults, noArtifactMessage);
      }
    } else {
      return resultsWithErrorMessage(initialImportResults, 'Invalid file format.');
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

  public getMaxWorkers(): number {
    return ArtifactsDI.getOcrWorkerHandler().getMaxWorkers();
  }

  public isImportRunning(): boolean {
    return isArtifactsImportRunning();
  }

  public geImportInfos(): ImportInfos {
    return importInfos();
  }

  public cancelImport(): void {
    VideoToFrames.cancel();
    ArtifactsDI.getArtifactImageOcr().cancelOcr();
  }
}
