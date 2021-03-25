import { ArtifactImageOcr } from '../domain/artifact-image-ocr';
import { OcrData, VideoToFrames } from '../domain/video-to-frames.bck';

export class ArtifactsImporter {
  private readonly artifactImageOcr: ArtifactImageOcr;

  constructor() {
    this.artifactImageOcr = new ArtifactImageOcr();
  }

  public async importFromVideo(video: File): Promise<OcrData> {
    return await VideoToFrames.getFrames(video, 10);
  }

  public async importFromImage(image: string): Promise<string[]> {
    return await this.artifactImageOcr.getArtifactFromImage(image);
  }
}
