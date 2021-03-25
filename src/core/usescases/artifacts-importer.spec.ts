import { artifactsOcrImagesMock } from '../../test/artifacts-ocr-images.mock';
import { ocrResultsMock } from '../../test/ocr-results-mock';
import { ArtifactsDI } from '../di/artifacts-di';
import { OcrWorker } from '../domain/worker/artifacts-ocr.worker-mock';
import { ArtifactsImporter } from './artifacts-importer';
import artifact0 from '../../test/artifact0.png';

fdescribe('ArtifactsImporter.importFromVideo', () => {
  let artifactsImporter: ArtifactsImporter;
  let ocrWorker: OcrWorker;
  beforeEach(() => {
    ArtifactsDI.registerOcrWorker();
    artifactsImporter = ArtifactsDI.getArtifactsImporter();
    ocrWorker = ArtifactsDI.getOcrWorker();
  });

  it('should give lines contained in an artifact image from pd', async () => {
    const ocrWorkerSpy = jest.spyOn(ocrWorker, 'recognize');
    const importResults = await artifactsImporter.importFromImage(artifact0);

    expect(ocrWorkerSpy).toHaveBeenCalledWith(artifactsOcrImagesMock[0]);
    expect(importResults).toEqual(ocrResultsMock[0]);
  });
});
