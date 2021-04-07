import { artifactsOcrImagesMock } from '../../test/artifacts-ocr-images-mock';
import { ArtifactsDI } from '../di/artifacts-di';
import { OcrWorkerHandler } from '../domain/artifact-ocr-worker-handler';
import { ArtifactsImporter } from './artifacts-importer';
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

describe('ArtifactsImporter.importFromVideo', () => {
  const artifactsStateChangesSub: Subject<ArtifactData[]> = new Subject();
  let appStoreUnsubscribe: Unsubscribe;
  let artifactsImporter: ArtifactsImporter;
  let ocrWorkerHandler: OcrWorkerHandler;
  let ocrWorkerSpy: jest.SpyInstance;

  beforeEach(() => {
    appStoreUnsubscribe = appStore.subscribe(() => {
      artifactsStateChangesSub.next(selectAllArtifacts());
    });
    ArtifactsDI.registerOcrWorker();
    ArtifactsDI.registerRepository();
    artifactsImporter = ArtifactsDI.getArtifactsImporter();
    ocrWorkerHandler = ArtifactsDI.getOcrWorkerHandler();
    ocrWorkerSpy = jest.spyOn(ocrWorkerHandler, 'recognize');
  });

  it('should update stored artifacts with artifacts contained in each  images', (done) => {
    artifactsStateChangesSub.pipe(skip(3), take(1)).subscribe((artifactsData) => {
      expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[0]);
      expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[1]);
      expect(getArtifactsWithoutId(artifactsData)).toEqual(importedArtifactDataMock);
      done();
    });

    artifactsImporter.importFromImages([artifact0, artifact1]);
  });

  it('should filter duplicated artifacts images', (done) => {
    artifactsStateChangesSub.pipe(skip(2), take(1)).subscribe((artifactsData) => {
      expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[0]);
      expect(getArtifactsWithoutId(artifactsData)).toEqual([importedArtifactDataMock[0]]);
      done();
    });

    artifactsImporter.importFromImages([artifact0, artifact0bis]);
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
