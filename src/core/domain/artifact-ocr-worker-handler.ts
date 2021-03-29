import { createWorker, Worker, WorkerOptions } from 'tesseract.js';

export interface OcrWorkerHandler {
  initialize(lang: string, options?: Partial<WorkerOptions>): void;
  recognize(image: Buffer): Promise<string[]>;
  terminate(): void;
}

export class ArtifactOcrWorkerHandler implements OcrWorkerHandler {
  private tesseractWorker!: Worker;

  public async initialize(lang: string, options?: Partial<WorkerOptions>): Promise<void> {
    this.tesseractWorker = createWorker(options);
    await this.tesseractWorker.load();
    await this.tesseractWorker.loadLanguage(lang);
    await this.tesseractWorker.initialize(lang);
  }

  public async recognize(image: Buffer): Promise<string[]> {
    const { data } = await this.tesseractWorker.recognize(image);
    return data.lines.map((line) => line.text);
  }

  public terminate(): void {
    this.tesseractWorker.terminate();
  }
}
