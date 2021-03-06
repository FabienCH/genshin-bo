import { createScheduler, createWorker, WorkerOptions, Scheduler, RecognizeResult } from 'tesseract.js';

export interface OcrWorkerHandler {
  initialize(lang: string, nbOfWorkers: number, options?: Partial<WorkerOptions>): void;
  recognize(image: Buffer): Promise<string[]>;
  getMaxWorkers(): number;
  terminate(): void;
}

export class ArtifactOcrWorkersHandler implements OcrWorkerHandler {
  private tesseractScheduler!: Scheduler;
  private readonly maxWorkers: number = navigator.hardwareConcurrency - 1;

  public async initialize(lang: string, nbOfWorkers: number, options?: Partial<WorkerOptions>): Promise<void> {
    this.tesseractScheduler = createScheduler();
    for (let i = 0; i < nbOfWorkers; i++) {
      const worker = createWorker(options);
      await worker.load();
      await worker.loadLanguage(lang);
      await worker.initialize(lang);
      this.tesseractScheduler.addWorker(worker);
    }
  }

  public async recognize(image: Buffer): Promise<string[]> {
    const { data } = (await this.tesseractScheduler.addJob('recognize', image)) as RecognizeResult;
    return data.lines.map((line) => line.text);
  }

  public getMaxWorkers(): number {
    return this.maxWorkers;
  }

  public terminate(): void {
    this.tesseractScheduler.terminate();
  }
}
