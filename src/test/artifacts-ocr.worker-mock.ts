import { OcrWorker } from '../core/domain/worker/artifacts-ocr.worker-mock';
import { ocrResultsMock } from './ocr-results-mock';

/* eslint-disable @typescript-eslint/no-empty-function */
export class OcrWorkerMock implements OcrWorker {
  private mockImgId = 0;
  initialize(_: string): void {}
  recognize(_: Buffer): Promise<string[]> {
    const ocrResults = ocrResultsMock[this.mockImgId];
    if (ocrResultsMock[this.mockImgId + 1]) {
      this.mockImgId++;
    } else {
      this.mockImgId = 0;
    }
    return new Promise((resolve, _) => {
      resolve(ocrResults);
    });
  }

  public terminate(): void {
    this.mockImgId = 0;
  }
}
