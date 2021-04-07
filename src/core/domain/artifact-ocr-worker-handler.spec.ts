/**
 * @jest-environment node
 */

import { artifactsOcrImagesMock } from '../../test/artifacts-ocr-images-mock';
import { ArtifactOcrWorkerHandler } from '../domain/artifact-ocr-worker-handler';

describe('ArtifactOcrWorkerHandler', () => {
  let ocrWorkerHandler: ArtifactOcrWorkerHandler;

  beforeEach(() => {
    ocrWorkerHandler = new ArtifactOcrWorkerHandler();
  });

  it('should initialize tesseract lang and run recognize without error', async () => {
    await ocrWorkerHandler.initialize('eng', {
      cacheMethod: 'readOnly',
    });
    const ocrResults = await ocrWorkerHandler.recognize(artifactsOcrImagesMock[0]);
    expect(ocrResults.length).toEqual(11);
  }, 15000);

  afterEach(() => {
    ocrWorkerHandler.terminate();
  });
});
