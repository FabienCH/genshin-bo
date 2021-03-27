import { Canvas, createCanvas } from 'canvas';

export class VideoToFrames {
  public static getFrames(videoFile: File, fps: number): Promise<string[]> {
    return new Promise((resolve: (base64Images: string[]) => void) => {
      const video = document.createElement('video');
      video.preload = 'auto';
      const base64Images: string[] = [];

      video.addEventListener('loadeddata', async () => {
        const canvas: Canvas = createCanvas(video.videoWidth, video.videoHeight);
        const duration = video.duration;
        const totalFrames = duration * fps;
        const timeInterval = duration / totalFrames;

        for (let time = 0; time < duration; time += timeInterval) {
          const frame = await VideoToFrames.getVideoFrame(video, canvas, time);
          base64Images.push(frame);
        }
        resolve(base64Images);
      });

      video.src = URL.createObjectURL(videoFile);
      video.load();
    });
  }

  private static getVideoFrame(video: HTMLVideoElement, canvas: Canvas, time: number): Promise<string> {
    return new Promise((resolve: (frame: string) => void) => {
      const eventCallback = () => {
        video.removeEventListener('seeked', eventCallback);
        resolve(this.getFrame(video, canvas));
      };
      video.addEventListener('seeked', eventCallback);
      video.currentTime = time;
    });
  }

  private static getFrame(video: HTMLVideoElement, canvas: Canvas): string {
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;
    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
    return canvas.toDataURL();
  }
}
