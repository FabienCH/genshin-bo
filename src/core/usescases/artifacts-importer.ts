import { ArtifactImageOcr } from '../domain/artifact-image-ocr';
import { OcrData, VideoToFrames } from '../domain/video-to-frames.bck';
import { Observable } from 'rxjs';

export class ArtifactsImporter {
  private readonly artifactImageOcr: ArtifactImageOcr;

  constructor() {
    this.artifactImageOcr = new ArtifactImageOcr();
  }

  public async importFromVideo(video: File): Promise<OcrData> {
    return await VideoToFrames.getFrames(video, 10);
  }

  public importFromImages(images: string[]): void {
    this.artifactImageOcr.runArtifactsOcrFromImages(images);
  }

  public getOcrResults(): Observable<string[][]> {
    return this.artifactImageOcr.getOcrResults();
  }
}
