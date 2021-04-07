import { importArtifactsFromImagesAction } from '../adapters/redux/artifacts/artifacts-action';
import { appStore } from '../adapters/redux/store';
import { VideoToFrames } from '../domain/mappers/video-to-frames';

export class ArtifactsImporter {
  public async importFromVideo(video: File): Promise<void> {
    const frames = await VideoToFrames.getFrames(video, 10);
    this.importFromImages(frames);
  }

  public importFromImages(images: string[]): void {
    appStore.dispatch(importArtifactsFromImagesAction(images));
  }
}
