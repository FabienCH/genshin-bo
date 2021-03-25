import { artifactsOcrImagesMock } from '../../test/artifacts-ocr-images.mock';
import { ocrResultsMock } from '../../test/ocr-results-mock';
import { ArtifactsDI } from '../di/artifacts-di';
import { OcrWorker } from '../domain/worker/artifacts-ocr.worker-mock';
import { ArtifactsImporter } from './artifacts-importer';
import artifact0 from '../../test/artifact0.png';
import artifact0bis from '../../test/artifact0bis.png';
import artifact1 from '../../test/artifact1.png';
import { skip } from 'rxjs/operators';

fdescribe('ArtifactsImporter.importFromVideo', () => {
  let artifactsImporter: ArtifactsImporter;
  let ocrWorker: OcrWorker;
  beforeEach(() => {
    ArtifactsDI.registerOcrWorker();
    artifactsImporter = ArtifactsDI.getArtifactsImporter();
    ocrWorker = ArtifactsDI.getOcrWorker();
  });

  it('should give lines contained in each artifacts images', (done) => {
    const ocrWorkerSpy = jest.spyOn(ocrWorker, 'recognize');

    artifactsImporter
      .getOcrResults()
      .pipe(skip(2))
      .subscribe((ocrResults) => {
        expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[0]);
        expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[1]);
        expect(ocrResults).toEqual(ocrResultsMock);
        done();
      });

    artifactsImporter.importFromImages([artifact0, artifact1]);
  });
});
