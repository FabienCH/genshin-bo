/**
 * @jest-environment node
 */

import { artifactsOcrImagesMock } from '../../test/artifacts-ocr-images-mock';
import { ArtifactOcrWorkersHandler } from '../domain/artifact-ocr-worker-handler';

describe('ArtifactOcrWorkerHandler', () => {
  let ocrWorkerHandler: ArtifactOcrWorkersHandler;

  beforeEach(() => {
    Object.defineProperty(global, 'navigator', {
      value: { hardwareConcurrency: 2 },
    });
    ocrWorkerHandler = new ArtifactOcrWorkersHandler();
  });

  it('should initialize tesseract lang and run recognize without error', async () => {
    await ocrWorkerHandler.initialize('eng', 1, {
      cacheMethod: 'readOnly',
    });
    const ocrResults = await ocrWorkerHandler.recognize(artifactsOcrImagesMock[0]);
    expect(ocrResults.length).toEqual(11);
  }, 15000);

  afterEach(() => {
    ocrWorkerHandler.terminate();
  });
});
