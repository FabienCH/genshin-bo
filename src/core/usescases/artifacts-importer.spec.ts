import { artifactsOcrImagesMock } from '../../test/artifacts-ocr-images-mock';
import { ArtifactsDI } from '../di/artifacts-di';
import { OcrWorkerHandler } from '../domain/artifact-ocr-worker-handler';
import { ArtifactsImporter } from './artifacts-importer';
import artifact0 from '../../test/artifact0.jpg';
import artifact0bis from '../../test/artifact0bis.jpg';
import artifact1 from '../../test/artifact1.jpg';
import { skip } from 'rxjs/operators';
import { ocrArtifactDataMock } from '../../test/imported-artifacts-data-mock';

describe('ArtifactsImporter.importFromVideo', () => {
  let artifactsImporter: ArtifactsImporter;
  let ocrWorkerHandler: OcrWorkerHandler;
  let ocrWorkerSpy: jest.SpyInstance;

  beforeEach(() => {
    ArtifactsDI.registerOcrWorker();
    artifactsImporter = ArtifactsDI.getArtifactsImporter();
    ocrWorkerHandler = ArtifactsDI.getOcrWorkerHandler();
    ocrWorkerSpy = jest.spyOn(ocrWorkerHandler, 'recognize');
  });

  it('should give lines contained in each artifacts images', (done) => {
    artifactsImporter
      .getOcrResults()
      .pipe(skip(2))
      .subscribe((ocrResults) => {
        expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[0]);
        expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[1]);
        expect(ocrResults).toEqual(ocrArtifactDataMock);
        done();
      });

    artifactsImporter.importFromImages([artifact0, artifact1]);
  });

  it('should filter duplicated artifacts images', (done) => {
    artifactsImporter
      .getOcrResults()
      .pipe(skip(1))
      .subscribe((ocrResults) => {
        expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[0]);
        expect(ocrResults).toEqual([ocrArtifactDataMock[0]]);
        done();
      });

    artifactsImporter.importFromImages([artifact0, artifact0bis]);
  });
});
