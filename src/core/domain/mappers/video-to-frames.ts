import { Canvas, createCanvas } from 'canvas';
import { Subject, Observable, from } from 'rxjs';

export interface FrameData {
  frame: string;
  isLast: boolean;
}

export abstract class VideoToFrames {
  private static readonly frameSub: Subject<FrameData> = new Subject<FrameData>();

  public static getFrames(videoFile: File, fps: number): Observable<FrameData> {
    const video = document.createElement('video');
    video.preload = 'auto';

    video.addEventListener('loadeddata', async () => {
      const canvas: Canvas = createCanvas(video.videoWidth, video.videoHeight);
      const duration = video.duration;
      const totalFrames = duration * fps;
      const timeInterval = duration / totalFrames;

      for (let time = 0; time < duration; time += timeInterval) {
        const frame = await VideoToFrames.getVideoFrame(video, canvas, time);
        VideoToFrames.frameSub.next({ frame, isLast: time + timeInterval >= duration });
      }
    });

    video.src = URL.createObjectURL(videoFile);
    video.load();
    return from(VideoToFrames.frameSub);
  }

  private static getVideoFrame(video: HTMLVideoElement, canvas: Canvas, time: number): Promise<string> {
    return new Promise((resolve: (frame: string) => void) => {
      const eventCallback = () => {
        video.removeEventListener('seeked', eventCallback);
        resolve(VideoToFrames.getFrame(video, canvas));
      };
      video.addEventListener('seeked', eventCallback);
      video.currentTime = time;
    });
  }

  private static getFrame(video: HTMLVideoElement, canvas: Canvas): string {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    return canvas.toDataURL('image/jpeg');
  }
}
