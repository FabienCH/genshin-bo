import { artifactsOcrImagesMock } from '../../test/artifacts-ocr-images-mock';
import { ArtifactsDI } from '../di/artifacts-di';
import { OcrWorkerHandler } from '../domain/artifact-ocr-worker-handler';
import artifact0 from '../../test/artifact0.jpg';
import artifact0bis from '../../test/artifact0bis.jpg';
import artifact1 from '../../test/artifact1.jpg';
import { importedArtifactDataMock } from '../../test/imported-artifacts-data-mock';
import { selectAllArtifacts } from '../adapters/redux/artifacts/artifacts-selectors';
import { appStore } from '../adapters/redux/store';
import { Subject } from 'rxjs';
import { skip, take } from 'rxjs/operators';
import { ArtifactData } from '../domain/models/artifact-data';
import { Unsubscribe } from '@reduxjs/toolkit';
import { VideoToFrames } from '../domain/mappers/video-to-frames';
import { from } from 'rxjs';
import { ArtifactsImporter } from './artifacts-importer';

describe('ArtifactsImporter.importFromVideo', () => {
  const artifactsStateChangesSub: Subject<ArtifactData[]> = new Subject();
  let appStoreUnsubscribe: Unsubscribe;
  let ocrWorkerHandler: OcrWorkerHandler;
  let artifactsImporter: ArtifactsImporter;
  let ocrWorkerSpy: jest.SpyInstance;
  let videoToFrames: jest.SpyInstance;

  beforeEach(() => {
    appStoreUnsubscribe = appStore.subscribe(() => {
      artifactsStateChangesSub.next(selectAllArtifacts());
    });
    ArtifactsDI.registerOcrWorker();
    ArtifactsDI.registerRepository();
    ocrWorkerHandler = ArtifactsDI.getOcrWorkerHandler();
    artifactsImporter = new ArtifactsImporter();
    ocrWorkerSpy = jest.spyOn(ocrWorkerHandler, 'recognize');
    videoToFrames = jest.spyOn(VideoToFrames, 'getFrames');
  });

  it('should add artifacts contained in each images to stored artifacts', (done) => {
    videoToFrames.mockReturnValue(
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

  it('should override stored artifact with  artifacts contained in each images', (done) => {
    videoToFrames.mockReturnValue(
      from([
        { frame: artifact0, isLast: false },
        { frame: artifact1, isLast: true },
      ]),
    );

    artifactsStateChangesSub.pipe(skip(3), take(1)).subscribe((artifactsData) => {
      expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[0]);
      expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[1]);
      expect(getArtifactsWithoutId(artifactsData)).toEqual(importedArtifactDataMock);
      done();
    });

    artifactsImporter.importFromVideo(new File([], 'filename'), true);
  });

  it('should filter duplicated artifacts images and add artifacts', (done) => {
    videoToFrames.mockReturnValue(
      from([
        { frame: artifact0, isLast: false },
        { frame: artifact0bis, isLast: true },
      ]),
    );

    artifactsStateChangesSub.pipe(skip(2), take(1)).subscribe((artifactsData) => {
      expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[0]);
      expect(getArtifactsWithoutId(artifactsData)).toEqual([importedArtifactDataMock[0]]);
      done();
    });

    artifactsImporter.importFromVideo(new File([], 'filename'), true);
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
