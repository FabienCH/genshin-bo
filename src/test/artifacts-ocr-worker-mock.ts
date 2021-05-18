import { OcrWorkerHandler } from '../domain/artifacts/artifact-ocr-worker-handler';
import { ocrResultsMock } from './ocr-results-mock';

/* eslint-disable @typescript-eslint/no-empty-function */
export class OcrWorkerHandlerMock implements OcrWorkerHandler {
  private mockImgId = 0;

  public initialize(_: string): void {}

  public recognize(_: Buffer): Promise<string[]> {
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

  public getMaxWorkers(): number {
    return 1;
  }

  public terminate(): void {
    this.mockImgId = 0;
  }
}
