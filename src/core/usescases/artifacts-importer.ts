import {
  deleteAllArtifactsAction,
  importArtifactsFromVideoAction,
  runOcrOnImageAction,
} from '../adapters/redux/artifacts/artifacts-action';
import { appStore } from '../adapters/redux/store';
import { ArtifactsDI } from '../di/artifacts-di';
import { VideoToFrames } from '../domain/mappers/video-to-frames';
import { Subject, interval } from 'rxjs';
import { takeUntil, delay, filter, take } from 'rxjs/operators';
import { importInfos, isArtifactsImportRunning } from '../adapters/redux/artifacts/artifacts-selectors';
import { ImportInfos } from '../adapters/redux/artifacts/artifacts-reducer';

export class ArtifactsImporter {
  private readonly allFramesRetrieve: Subject<void> = new Subject();
  private readonly rerunImport: Subject<void> = new Subject();
  private readonly tenImports: Subject<void> = new Subject();
  private nbOfImports!: number;

  public async importFromVideo(video: File, nbOfWorkers: number, overrideCurrentArtifacts = false): Promise<void> {
    this.nbOfImports = 0;
    this.allFramesRetrieve.pipe(takeUntil(this.tenImports)).subscribe(() => {
      interval(1000)
        .pipe(
          filter(() => !this.isImportRunning()),
          take(1),
        )
        .subscribe(() => {
          this.nbOfImports++;
          console.log('this.nbOfImports', this.nbOfImports);
          if (this.nbOfImports === 10) {
            this.tenImports.next();
          }
          this.rerunImport.next();
        });
    });

    await this.runImport(nbOfWorkers, overrideCurrentArtifacts, video);

    const delayValue = 10000;

    this.rerunImport.pipe(delay(delayValue), takeUntil(this.tenImports)).subscribe(async () => {
      await this.runImport(nbOfWorkers, overrideCurrentArtifacts, video);
    });
  }

  private async runImport(nbOfWorkers: number, overrideCurrentArtifacts: boolean, video: File) {
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
          console.log('this.allFramesRetrieve.next();');

          this.allFramesRetrieve.next();
        }
      });
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
