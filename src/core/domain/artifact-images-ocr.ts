import Jimp from 'jimp';
import { ArtifactsDI } from '../di/artifacts-di';
import { OcrWorkerHandler } from './artifact-ocr-worker-handler';
import { ArtifactData } from './models/artifact-data';
import { OcrResultsParser } from './ocr-results-parser';
import { ArtifactMapper } from './mappers/artifact-mapper';

export class ArtifactImageOcr {
  private previousImage!: Jimp;
  private ocrWorker: OcrWorkerHandler;
  private ocrResultsParser: OcrResultsParser;
  private processingImagesCount!: number;
  private lastImageProcessed!: boolean;

  private readonly artifactOverlay: Jimp = new Jimp(225, 290, '#ffffff');
  private readonly topOverlay1: Jimp = new Jimp(120, 145, '#ffffff');
  private readonly topOverlay2: Jimp = new Jimp(460, 67, '#ffffff');
  private readonly mainStatOverlay: Jimp = new Jimp(242, 29, '#ffffff');
  private readonly mainValueOverlay: Jimp = new Jimp(202, 52, '#ffffff');
  private readonly levelOverlay: Jimp = new Jimp(60, 30, '#ffffff');
  private readonly bottomOverlay: Jimp = new Jimp(475, 230, '#ffffff');

  constructor() {
    this.ocrWorker = ArtifactsDI.getOcrWorkerHandler();
    this.ocrResultsParser = new OcrResultsParser();
  }

  public async initializeOcr(): Promise<void> {
    this.processingImagesCount = 0;
    this.lastImageProcessed = false;
    await this.ocrWorker.initialize('genshin', {
      cacheMethod: 'none',
      langPath: '.',
    });
  }

  public async runArtifactOcrFromImage(imageData: {
    frame: string;
    isLast: boolean;
  }): Promise<{ artifact?: ArtifactData; isDone: boolean }> {
    this.processingImagesCount++;
    let artifact: ArtifactData | undefined;
    const imageForOcr = await this.getImageForOcr(imageData.frame);
    if (imageForOcr.length) {
      artifact = await this.runOcrRecognize(imageForOcr);
    }
    const isDone = this.areAllImagesProcessed(imageData.isLast);
    if (isDone) {
      this.ocrWorker.terminate();
    }
    return { artifact, isDone };
  }

  private async getImageForOcr(image: string): Promise<Buffer> {
    if (!image) {
      return Buffer.from([]);
    }
    const jimpImage = await Jimp.create(image);
    const framesForOcr = await this.transformForOcr(jimpImage);

    if (!this.previousImage || Jimp.diff(framesForOcr, this.previousImage, 0.01).percent > 0.003) {
      this.previousImage = framesForOcr;

      return await framesForOcr.getBufferAsync(Jimp.MIME_PNG);
    }
    return Buffer.from([]);
  }

  private async runOcrRecognize(imageForOcr: Buffer): Promise<ArtifactData | undefined> {
    const ocrResults = await this.ocrWorker.recognize(imageForOcr);

    const parsedOcrResults = this.ocrResultsParser.parseToArtifactData(ocrResults);
    try {
      return ArtifactMapper.mapOcrDataToArtifactData(parsedOcrResults);
    } catch (error) {
      console.log('error while parsing artifact', error.message);
      return undefined;
    }
  }

  private areAllImagesProcessed(isLast: boolean): boolean {
    this.processingImagesCount--;
    if (isLast) {
      this.lastImageProcessed = true;
    }

    return this.lastImageProcessed && this.processingImagesCount === 0;
  }

  private async transformForOcr(image: Jimp): Promise<Jimp> {
    const height = image.getHeight();
    const width = image.getWidth();
    if (height < 850 || height > 854 || width < 498 || width > 502) {
      image.resize(500, 852);
    }

    const mainStatType = await Jimp.create(image);
    mainStatType.crop(30, 158, 240, 27).scale(1.2).threshold({ max: 140 }).invert().threshold({ max: 115 });

    const mainStatValue = await Jimp.create(image);
    mainStatValue.crop(30, 186, 220, 50).scale(0.7).threshold({ max: 180 }).invert().threshold({ max: 75 });

    const top = await Jimp.create(image);
    top
      .crop(7, 7, 500, 280)
      .threshold({ max: 140 })
      .invert()
      .threshold({ max: 115 })
      .composite(this.topOverlay1, 195, 173)
      .composite(this.topOverlay2, 7, 225);

    const level = await Jimp.create(image);
    level.crop(36, 316, 53, 25).invert().threshold({ max: 130 });

    const imageWithSetBlack = this.setNameGreenToBlack(image);

    return imageWithSetBlack
      .normalize()
      .threshold({ max: 135 })
      .invert()
      .threshold({ max: 120 })
      .invert()
      .composite(top, 7, 7)
      .composite(this.artifactOverlay, 270, 65)
      .composite(this.mainStatOverlay, 29, 157)
      .composite(mainStatType, 30, 140)
      .composite(this.mainValueOverlay, 29, 185)
      .composite(mainStatValue, 30, 186)
      .composite(this.levelOverlay, 34, 314)
      .composite(level, 51, 320)
      .composite(this.bottomOverlay, 20, 562)
      .crop(7, 7, image.getWidth() - 14, image.getHeight() - 14);
  }

  private setNameGreenToBlack(image: Jimp): Jimp {
    const targetColor = { r: 95, g: 178, b: 90, a: 255 };
    const replaceColor = { r: 0, g: 0, b: 0, a: 255 };
    const colorDistance = (c1: { r: number; g: number; b: number; a: number }, c2: { r: number; g: number; b: number; a: number }) =>
      Math.sqrt(Math.pow(c1.r - c2.r, 2) + Math.pow(c1.g - c2.g, 2) + Math.pow(c1.b - c2.b, 2) + Math.pow(c1.a - c2.a, 2));
    const threshold = 80;

    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (_, __, idx) => {
      const thisColor = {
        r: image.bitmap.data[idx + 0],
        g: image.bitmap.data[idx + 1],
        b: image.bitmap.data[idx + 2],
        a: image.bitmap.data[idx + 3],
      };
      if (colorDistance(targetColor, thisColor) <= threshold) {
        image.bitmap.data[idx + 0] = replaceColor.r;
        image.bitmap.data[idx + 1] = replaceColor.g;
        image.bitmap.data[idx + 2] = replaceColor.b;
        image.bitmap.data[idx + 3] = replaceColor.a;
      }
    });
    return image;
  }
}
