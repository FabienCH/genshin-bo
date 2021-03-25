import { createWorker, Worker } from 'tesseract.js';

export interface OcrWorker {
  initialize(lang: string): void;
  recognize(image: Buffer): Promise<string[]>;
  terminate(): void;
}

export class ArtifactsOcrWorker implements OcrWorker {
  private tesseractWorker: Worker;

  constructor() {
    this.tesseractWorker = createWorker({
      cacheMethod: 'none',
      langPath: './',
      logger: (m) => console.log(m),
    });
  }

  public async initialize(lang: string): Promise<void> {
    await this.tesseractWorker.load();
    await this.tesseractWorker.loadLanguage(lang);
    await this.tesseractWorker.initialize(lang);
  }

  public async recognize(image: Buffer): Promise<string[]> {
    this.tesseractWorker.recognize(image);
    const { data } = await this.tesseractWorker.recognize(image);
    return data.lines.map((line) => line.text);
  }

  public terminate(): void {
    this.tesseractWorker.terminate();
  }
}
