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
import { isArtifactsImportRunning } from '../adapters/redux/artifacts/artifacts-selectors';

export class ArtifactsImporter {
  private readonly lastImagePast: Subject<void> = new Subject();

  public async importFromVideo(video: File, overrideCurrentArtifacts = false): Promise<void> {
    appStore.dispatch(importArtifactsFromVideoAction());
    await ArtifactsDI.getArtifactImageOcr().initializeOcr();

    if (overrideCurrentArtifacts) {
      appStore.dispatch(deleteAllArtifactsAction());
    }

    VideoToFrames.getFrames(video, 10)
      .pipe(takeUntil(this.lastImagePast))
      .subscribe((frameData) => {
        appStore.dispatch(runOcrOnImageAction(frameData));
        if (frameData.isLast) {
          this.lastImagePast.next();
        }
      });
  }

  public isImportRunning(): boolean {
    return isArtifactsImportRunning();
  }

  public cancelImport(): void {
    VideoToFrames.cancel();
    ArtifactsDI.getArtifactImageOcr().cancelOcr();
  }
}
