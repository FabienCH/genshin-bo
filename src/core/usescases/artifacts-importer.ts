import { deleteAllArtifactsAction, runOcrOnImageAction } from '../adapters/redux/artifacts/artifacts-action';
import { appStore } from '../adapters/redux/store';
import { ArtifactsDI } from '../di/artifacts-di';
import { VideoToFrames } from '../domain/mappers/video-to-frames';

export class ArtifactsImporter {
  public async importFromVideo(video: File): Promise<void> {
    await ArtifactsDI.getOcrWorkerHandler().initialize('genshin', {
      cacheMethod: 'none',
      langPath: '.',
    });
    appStore.dispatch(deleteAllArtifactsAction());

    VideoToFrames.getFrames(video, 10).subscribe((frame) => {
      appStore.dispatch(runOcrOnImageAction(frame));
    });
  }
}
