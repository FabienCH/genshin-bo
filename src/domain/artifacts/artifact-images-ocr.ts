import Jimp from 'jimp';
import { ArtifactsDI } from '../../di/artifacts-di';
import { OcrWorkerHandler } from './artifact-ocr-worker-handler';
import { ArtifactData } from './models/artifact-data';
import { OcrResultsParser } from './ocr-results-parser';
import { ArtifactMapper } from './mappers/artifact-mapper';
import { ArtifactValidationError } from './artifact-validation-error';

export class ArtifactImageOcr {
  private previousImage!: Jimp;
  private ocrWorker: OcrWorkerHandler;
  private ocrResultsParser: OcrResultsParser;
  private recognizingImagesCount!: number;
  private lastImageProcessed!: boolean;
  private cancelImport!: boolean;

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

  public async initializeOcr(nbOfWorkers: number): Promise<void> {
    this.recognizingImagesCount = 0;
    this.lastImageProcessed = false;
    this.cancelImport = false;

    await this.ocrWorker.initialize('genshin', nbOfWorkers, {
      cacheMethod: 'none',
      langPath: '.',
    });
  }

  public async runArtifactOcrFromImage(
    imageData: {
      frame: string;
      isLast: boolean;
    },
    fixOcrErrors: boolean,
  ): Promise<{ artifact?: ArtifactData; inError: boolean; isDone: boolean }> {
    this.recognizingImagesCount++;
    const imageForOcr = await this.getImageForOcr(imageData.frame);
    const artifact = imageForOcr ? await this.runOcrRecognize(imageForOcr, fixOcrErrors) : undefined;
    const isDone = this.areAllImagesProcessed(imageData.isLast) || this.cancelImport;
    if (isDone) {
      this.ocrWorker.terminate();
    }

    return { artifact, inError: !!imageForOcr && !artifact, isDone };
  }

  public cancelOcr(): void {
    this.cancelImport = true;
  }

  private async getImageForOcr(image: string): Promise<Buffer | undefined> {
    if (!image) {
      return;
    }

    const jimpImage = await Jimp.create(image);
    const imageForDiff = jimpImage.threshold({ max: 150 }).invert().threshold({ max: 115 });
    if (!this.previousImage || Jimp.diff(imageForDiff, this.previousImage, 0.01).percent > 0.002) {
      this.previousImage = imageForDiff;
      const imageForOcr = await this.transformForOcr(await Jimp.create(image));
      return await imageForOcr.getBufferAsync(Jimp.MIME_PNG);
    }
  }

  private async runOcrRecognize(imageForOcr: Buffer, fixOcrErrors: boolean): Promise<ArtifactData | undefined> {
    const ocrResults = await this.ocrWorker.recognize(imageForOcr);
    const parsedOcrResults = this.ocrResultsParser.parseToArtifactData(ocrResults, fixOcrErrors);
    const artifactData = ArtifactMapper.mapOcrDataToArtifactData(parsedOcrResults, fixOcrErrors);

    if (!(artifactData instanceof ArtifactValidationError)) {
      return artifactData;
    }

    console.error('error while parsing artifact', artifactData.getMessages());
  }

  private areAllImagesProcessed(isLast: boolean): boolean {
    this.recognizingImagesCount--;
    if (isLast) {
      this.lastImageProcessed = true;
    }

    return this.lastImageProcessed && this.recognizingImagesCount === 0;
  }

  private async transformForOcr(image: Jimp): Promise<Jimp> {
    const height = image.getHeight();
    const width = image.getWidth();
    if (height < 836 || height > 840 || width < 486 || width > 490) {
      image.resize(488, 838);
    }

    const mainStatType = await Jimp.create(image);
    mainStatType.crop(23, 151, 240, 27).scale(1.2).threshold({ max: 140 }).invert().threshold({ max: 115 });

    const mainStatValue = await Jimp.create(image);
    mainStatValue.crop(23, 179, 220, 50).scale(0.7).threshold({ max: 180 }).invert().threshold({ max: 75 });

    const top = await Jimp.create(image);
    top
      .crop(0, 0, 500, 280)
      .threshold({ max: 160 })
      .invert()
      .threshold({ max: 95 })
      .composite(this.topOverlay1, 188, 166)
      .composite(this.topOverlay2, 0, 218);

    const level = await Jimp.create(image);
    level.crop(29, 309, 53, 25).invert().threshold({ max: 130 });

    const imageWithSetBlack = this.setNameGreenToBlack(image);

    return imageWithSetBlack
      .normalize()
      .threshold({ max: 150 })
      .invert()
      .threshold({ max: 115 })
      .invert()
      .composite(top, 0, 0)
      .composite(this.artifactOverlay, 263, 58)
      .composite(this.mainStatOverlay, 22, 150)
      .composite(mainStatType, 23, 133)
      .composite(this.mainValueOverlay, 22, 178)
      .composite(mainStatValue, 23, 179)
      .composite(this.levelOverlay, 27, 307)
      .composite(level, 44, 313)
      .composite(this.bottomOverlay, 13, 555);
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
