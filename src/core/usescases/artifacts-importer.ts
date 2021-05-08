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
import { ArtifactMapper } from '../domain/mappers/artifact-mapper';

export interface JsonImportResults {
  artifacts: ArtifactData[];
  inError: number;
}

export class ArtifactsImporter {
  private readonly allFramesRetrieve: Subject<void> = new Subject();

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

  public getArtifactsFromJson(artifactsJson: string): JsonImportResults {
    const initialImportInfos = { artifacts: [], inError: 0 };
    try {
      const artifactsData: ArtifactData[] = JSON.parse(artifactsJson);
      if (!Array.isArray(artifactsData)) {
        return initialImportInfos;
      }

      return artifactsData.reduce((jsonImportInfos: JsonImportResults, artifactData: ArtifactData) => {
        try {
          ArtifactMapper.mapDataToArtifact(artifactData);
          jsonImportInfos.artifacts.push(artifactData);
        } catch (_) {
          jsonImportInfos.inError++;
        }
        return jsonImportInfos;
      }, initialImportInfos);
    } catch (_) {
      return initialImportInfos;
    }
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
