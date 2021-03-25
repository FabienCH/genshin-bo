import Jimp from 'jimp';
import { ArtifactsDI } from '../di/artifacts-di';
import { OcrWorker } from './worker/artifacts-ocr.worker-mock';
import { BehaviorSubject, Observable, from } from 'rxjs';

export class ArtifactImageOcr {
  private lastImage!: Jimp;
  private ocrWorker: OcrWorker;
  private ocrResultsSub: BehaviorSubject<string[][]> = new BehaviorSubject<string[][]>([]);

  private readonly artifactOverlay: Jimp = new Jimp(225, 290, '#ffffff');
  private readonly topOverlay1: Jimp = new Jimp(120, 145, '#ffffff');
  private readonly topOverlay2: Jimp = new Jimp(460, 67, '#ffffff');
  private readonly mainOverlay: Jimp = new Jimp(242, 29, '#ffffff');
  private readonly levelOverlay: Jimp = new Jimp(60, 30, '#ffffff');
  private readonly bottomOverlay: Jimp = new Jimp(475, 230, '#ffffff');

  constructor() {
    this.ocrWorker = ArtifactsDI.getOcrWorker();
  }

  public runArtifactsOcrFromImages(images: string[]): void {
    return images.forEach((image) =>
      this.getArtifactOcrResults(image).then((ocrResults) => {
        this.ocrResultsSub.next([...this.ocrResultsSub.value, ocrResults]);
      }),
    );
  }

  public getOcrResults(): Observable<string[][]> {
    return from(this.ocrResultsSub);
  }

  private async getArtifactOcrResults(image: string): Promise<string[]> {
    const jimpImage = await Jimp.create(image);

    if (!this.lastImage || Jimp.diff(jimpImage, this.lastImage).percent > 0.05) {
      this.lastImage = await Jimp.create(image);
      const framesForOcr = await this.transformForOcr(jimpImage);

      return await this.ocrWorker.recognize(await framesForOcr.getBufferAsync(Jimp.MIME_PNG));
    }
    return await [];
  }

  private async transformForOcr(image: Jimp): Promise<Jimp> {
    const height = image.getHeight();
    const width = image.getWidth();
    if (height < 850 || height > 854 || width < 498 || width > 502) {
      image.resize(500, 852);
    }
    const mainStatType = await Jimp.create(image);
    mainStatType.crop(30, 158, 240, 27).scale(1.2).threshold({ max: 130 }).invert().threshold({ max: 125 });

    const top = await Jimp.create(image);
    top
      .crop(7, 7, 500, 280)
      .threshold({ max: 150 })
      .invert()
      .threshold({ max: 105 })
      .composite(this.topOverlay1, 195, 173)
      .composite(this.topOverlay2, 7, 225);

    const level = await Jimp.create(image);
    level.crop(36, 316, 53, 25).invert().threshold({ max: 140 });

    const imageWithSetBlack = this.setNameGreenToBlack(image);

    const frameForOcr = imageWithSetBlack
      .normalize()
      .threshold({ max: 155 })
      .invert()
      .threshold({ max: 60 })
      .invert()
      .composite(top, 7, 7)
      .composite(this.artifactOverlay, 270, 65)
      .composite(this.mainOverlay, 29, 157)
      .composite(mainStatType, 30, 140)
      .composite(this.levelOverlay, 34, 314)
      .composite(level, 51, 320)
      .composite(this.bottomOverlay, 20, 562);

    return frameForOcr;
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
