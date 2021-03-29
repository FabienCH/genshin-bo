import { ArtifactImagesOcr } from '../domain/artifact-images-ocr';
import { Observable } from 'rxjs';
import { VideoToFrames } from '../domain/mappers/video-to-frames';

export class ArtifactsImporter {
  private readonly artifactImageOcr: ArtifactImagesOcr;

  constructor() {
    this.artifactImageOcr = new ArtifactImagesOcr();
  }

  public async importFromVideo(video: File): Promise<void> {
    const frames = await VideoToFrames.getFrames(video, 10);
    this.artifactImageOcr.runArtifactsOcrFromImages(frames);
  }

  public importFromImages(images: string[]): void {
    this.artifactImageOcr.runArtifactsOcrFromImages(images);
  }

  public getOcrResults(): Observable<string[][]> {
    return this.artifactImageOcr.getOcrResults();
  }
}
