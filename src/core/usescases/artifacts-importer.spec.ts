import { artifactsOcrImagesMock } from '../../test/artifacts-ocr-images-mock';
import { ArtifactsDI } from '../di/artifacts-di';
import { OcrWorkerHandler } from '../domain/artifact-ocr-worker-handler';
import artifact0 from '../../test/artifact0.jpg';
import artifact0bis from '../../test/artifact0bis.jpg';
import artifact1 from '../../test/artifact1.jpg';
import { importedArtifactDataMock } from '../../test/imported-artifacts-data-mock';
import { isArtifactsImportRunning, selectAllArtifacts } from '../adapters/redux/artifacts/artifacts-selectors';
import { appStore } from '../adapters/redux/store';
import { Subject, interval } from 'rxjs';
import { skip, take, map } from 'rxjs/operators';
import { ArtifactData } from '../domain/models/artifact-data';
import { Unsubscribe } from '@reduxjs/toolkit';
import { VideoToFrames } from '../domain/mappers/video-to-frames';
import { from } from 'rxjs';
import { ArtifactsImporter } from './artifacts-importer';

describe('ArtifactsImporter', () => {
  const artifactsStateChangesSub: Subject<ArtifactData[]> = new Subject();
  let appStoreUnsubscribe: Unsubscribe;
  let ocrWorkerHandler: OcrWorkerHandler;
  let artifactsImporter: ArtifactsImporter;
  let ocrWorkerSpy: jest.SpyInstance;
  let videoToFramesSpy: jest.SpyInstance;

  beforeEach(() => {
    appStoreUnsubscribe = appStore.subscribe(() => {
      artifactsStateChangesSub.next(selectAllArtifacts());
    });
    ArtifactsDI.registerOcrWorker();
    ArtifactsDI.registerRepository();
    ocrWorkerHandler = ArtifactsDI.getOcrWorkerHandler();
    artifactsImporter = new ArtifactsImporter();
    ocrWorkerSpy = jest.spyOn(ocrWorkerHandler, 'recognize');
    videoToFramesSpy = jest.spyOn(VideoToFrames, 'getFrames');
  });

  describe('importFromVideo', () => {
    it('should add artifacts contained in each images to stored artifacts', (done) => {
      videoToFramesSpy.mockReturnValue(
        from([
          { frame: artifact0, isLast: false },
          { frame: artifact1, isLast: true },
        ]),
      );

      artifactsStateChangesSub.pipe(skip(3), take(1)).subscribe((artifactsData) => {
        expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[0]);
        expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[1]);

        const expectedArtifactsData = artifactsData.filter((_, index) => index >= artifactsData.length - 2);
        expect(getArtifactsWithoutId(expectedArtifactsData)).toEqual(importedArtifactDataMock);
        done();
      });

      artifactsImporter.importFromVideo(new File([], 'filename'));
    });

    it('should override stored artifact with artifacts contained in each images', (done) => {
      videoToFramesSpy.mockReturnValue(
        from([
          { frame: artifact0, isLast: false },
          { frame: artifact1, isLast: true },
        ]),
      );

      artifactsStateChangesSub.pipe(skip(4), take(1)).subscribe((artifactsData) => {
        expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[0]);
        expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[1]);
        expect(getArtifactsWithoutId(artifactsData)).toEqual(importedArtifactDataMock);
        done();
      });

      artifactsImporter.importFromVideo(new File([], 'filename'), true);
    });

    it('should filter duplicated artifacts images and add artifacts', (done) => {
      videoToFramesSpy.mockReturnValue(
        from([
          { frame: artifact0, isLast: false },
          { frame: artifact0bis, isLast: true },
        ]),
      );

      artifactsStateChangesSub.pipe(skip(4), take(1)).subscribe((artifactsData) => {
        expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[0]);
        expect(getArtifactsWithoutId(artifactsData)).toEqual([importedArtifactDataMock[0]]);
        done();
      });

      artifactsImporter.importFromVideo(new File([], 'filename'), true);
    });
  });

  describe('isImportRunning', () => {
    it('should update importRunning state when import is running', (done) => {
      const frames = [
        { frame: artifact0, isLast: false },
        { frame: artifact0bis, isLast: false },
        { frame: artifact1, isLast: true },
      ];
      videoToFramesSpy.mockReturnValue(interval(10).pipe(map((val) => frames[val])));

      let changeCount1 = 0;
      artifactsStateChangesSub.pipe(take(7)).subscribe(() => {
        const shouldImportRunning = changeCount1 < 6;
        expect(isArtifactsImportRunning()).toBe(shouldImportRunning);
        if (!shouldImportRunning) {
          done();
        }
        changeCount1++;
      });

      artifactsImporter.importFromVideo(new File([], 'filename'));
    });
  });

  describe('cancelImport', () => {
    it('should stop artifacts import', (done) => {
      let changeCount2 = 0;
      const frames = [artifact0, artifact0bis, artifact1];
      videoToFramesSpy.mockReturnValue(interval(10).pipe(map((val) => ({ frame: frames[val], isLast: changeCount2 >= 1 }))));

      artifactsStateChangesSub.pipe(take(4)).subscribe(() => {
        if (changeCount2 === 1) {
          artifactsImporter.cancelImport();
        }
        const shouldImportRunning = changeCount2 < 3;

        expect(isArtifactsImportRunning()).toBe(shouldImportRunning);
        if (!shouldImportRunning) {
          done();
        }
        changeCount2++;
      });

      artifactsImporter.importFromVideo(new File([], 'filename'));
    });
  });

  afterEach(() => {
    appStoreUnsubscribe();
  });
});

function getArtifactsWithoutId(artifactsData: ArtifactData[]) {
  return artifactsData.map((artifactItem) => {
    const { id, ...artifact } = artifactItem;
    return artifact;
  });
}
