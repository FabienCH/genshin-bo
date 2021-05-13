import { artifactsOcrImagesMock } from '../../test/artifacts-ocr-images-mock';
import { ArtifactsDI } from '../di/artifacts-di';
import { OcrWorkerHandler } from '../domain/artifact-ocr-worker-handler';
import artifact0 from '../../test/artifact0.jpg';
import artifact0bis from '../../test/artifact0bis.jpg';
import artifact1 from '../../test/artifact1.jpg';
import artifactWithError from '../../test/artifact-error.jpg';
import { importedArtifactDataMock } from '../../test/imported-artifacts-data-mock';
import { selectAllArtifacts } from '../adapters/redux/artifacts/artifacts-selectors';
import { appStore } from '../adapters/redux/store';
import { ArtifactData } from '../domain/models/artifact-data';
import { Unsubscribe } from '@reduxjs/toolkit';
import { VideoToFrames } from '../domain/mappers/video-to-frames';
import { Subject, from, interval } from 'rxjs';
import { skip, take, map, filter } from 'rxjs/operators';
import { ArtifactsImporter } from './artifacts-importer';
import {
  artifactsJsonData,
  artifactsJsonString,
  invalidArtifactsJsonData,
  invalidArtifactsJsonString,
  malformedArtifactsArrayJsonString,
  notArtifactsArrayJsonString,
} from '../../test/artifacts-from-json';
import { mockBlobText } from '../../test/blob-text-mock';

describe('ArtifactsImporter', () => {
  const artifactsStateChangesSub: Subject<ArtifactData[]> = new Subject();
  let appStoreUnsubscribe: Unsubscribe;
  let ocrWorkerHandler: OcrWorkerHandler;
  let artifactsImporter: ArtifactsImporter;
  let ocrWorkerSpy: jest.SpyInstance;
  let videoToFramesSpy: jest.SpyInstance;

  beforeEach(() => {
    ArtifactsDI.registerOcrWorker();
    ArtifactsDI.registerRepository();
    ocrWorkerHandler = ArtifactsDI.getOcrWorkerHandler();
    artifactsImporter = new ArtifactsImporter();
    ocrWorkerSpy = jest.spyOn(ocrWorkerHandler, 'recognize');
    videoToFramesSpy = jest.spyOn(VideoToFrames, 'getFrames');
    appStoreUnsubscribe = appStore.subscribe(() => {
      artifactsStateChangesSub.next(selectAllArtifacts());
    });
  });

  describe('importFromVideo', () => {
    it('should add artifacts contained in each images to stored artifacts', (done) => {
      videoToFramesSpy.mockReturnValue(
        from([
          { frame: artifact0, isLast: false },
          { frame: artifact1, isLast: true },
        ]),
      );

      artifactsStateChangesSub
        .pipe(
          filter((artifactsData) => artifactsData.length === 16),
          take(1),
        )
        .subscribe((artifactsData) => {
          expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[0]);
          expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[1]);

          const expectedArtifactsData = artifactsData.filter((_, index) => index >= artifactsData.length - 2);
          expect(getArtifactsWithoutId(expectedArtifactsData)).toEqual(importedArtifactDataMock);
          done();
        });

      artifactsImporter.importFromVideo(new File([], 'filename'), 1);
    });

    it('should override stored artifact with artifacts contained in each images', (done) => {
      videoToFramesSpy.mockReturnValue(
        from([
          { frame: artifact0, isLast: false },
          { frame: artifact1, isLast: true },
        ]),
      );

      artifactsStateChangesSub
        .pipe(
          filter((artifactsData) => artifactsData.length === 2),
          take(1),
        )
        .subscribe((artifactsData) => {
          expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[0]);
          expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[1]);
          expect(getArtifactsWithoutId(artifactsData)).toEqual(importedArtifactDataMock);
          done();
        });

      artifactsImporter.importFromVideo(new File([], 'filename'), 1, true);
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

      artifactsImporter.importFromVideo(new File([], 'filename'), 1, true);
    });
  });

  describe('getArtifactsFromJson', () => {
    const setFile = (jsonString: string): File => new File([jsonString], 'filename.json', { type: 'application/json' });

    it('should get 14 found artifacts and 0 in error from the json file', async () => {
      const file = setFile(artifactsJsonString);
      mockBlobText(file);

      expect(await artifactsImporter.getArtifactsFromJson(file)).toEqual({
        artifacts: artifactsJsonData,
        artifactsInError: 0,
      });
    });

    it('should get 12 found artifacts and 2 in error from invalid json file', async () => {
      const file = setFile(invalidArtifactsJsonString);
      mockBlobText(file);

      expect(await artifactsImporter.getArtifactsFromJson(file)).toEqual({
        artifacts: invalidArtifactsJsonData,
        artifactsInError: 2,
      });
    });

    it('should get 0 found artifacts and 0 in error from malformed json file', async () => {
      const file = setFile(malformedArtifactsArrayJsonString);
      mockBlobText(file);
      expect(await artifactsImporter.getArtifactsFromJson(file)).toEqual({
        artifacts: [],
        artifactsInError: 0,
        fileError: 'JSON file not properly formatted.',
      });
    });

    it('should get 0 found artifacts and 0 in error from json file that does not contains an array', async () => {
      const file = setFile(notArtifactsArrayJsonString);
      mockBlobText(file);
      expect(await artifactsImporter.getArtifactsFromJson(file)).toEqual({
        artifacts: [],
        artifactsInError: 0,
        fileError: 'JSON file not properly formatted.',
      });
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

      let changeCount = 0;
      artifactsStateChangesSub.pipe(take(7)).subscribe(() => {
        const shouldImportRunning = changeCount < 6;
        expect(artifactsImporter.isImportRunning()).toBe(shouldImportRunning);
        if (!shouldImportRunning) {
          done();
        }
        changeCount++;
      });

      artifactsImporter.importFromVideo(new File([], 'filename'), 1);
    });
  });

  describe('cancelImport', () => {
    it('should stop artifacts import', (done) => {
      let changeCount = 0;
      const frames = [artifact0, artifact0bis, artifact1];
      videoToFramesSpy.mockReturnValue(interval(10).pipe(map((val) => ({ frame: frames[val], isLast: changeCount >= 1 }))));

      artifactsStateChangesSub.pipe(take(4)).subscribe(() => {
        if (changeCount === 1) {
          artifactsImporter.cancelImport();
        }
        const shouldImportRunning = changeCount < 3;

        expect(artifactsImporter.isImportRunning()).toBe(shouldImportRunning);
        if (!shouldImportRunning) {
          done();
        }
        changeCount++;
      });

      artifactsImporter.importFromVideo(new File([], 'filename'), 1);
    });
  });

  describe('geImportInfos', () => {
    it('should update the import informations (number of frames and artifacts)', (done) => {
      const frames = [
        { frame: artifact0, isLast: false },
        { frame: artifact0bis, isLast: false },
        { frame: artifact1, isLast: false },
        { frame: artifactWithError, isLast: true },
      ];
      videoToFramesSpy.mockReturnValue(interval(10).pipe(map((val) => frames[val])));

      artifactsStateChangesSub.pipe(skip(9), take(1)).subscribe(() => {
        expect(artifactsImporter.geImportInfos()).toEqual({ foundFrames: 4, importedArtifacts: 2, artifactsInError: 1 });
        done();
      });

      artifactsImporter.importFromVideo(new File([], 'filename'), 1);
    }, 10000);
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
