export class VideoValidator {
  private errorMessage?: string;

  public async isVideoValid(videoFile: File): Promise<boolean> {
    return this.validateType(videoFile) && (await this.validateRatio(videoFile));
  }

  public getError(): string | undefined {
    return this.errorMessage;
  }

  private validateType(videoFile: File): boolean {
    const extension = videoFile.name.substring(videoFile.name.lastIndexOf('.') + 1);
    const isTypeValid = extension === 'mp4' && videoFile.type === 'video/mp4';
    this.errorMessage = isTypeValid ? undefined : 'Invalid file format. Please import an mp4 video.';

    return extension === 'mp4' && videoFile.type === 'video/mp4';
  }

  private async validateRatio(videoFile: File): Promise<boolean> {
    return new Promise((resolve: (isValid: boolean) => void) => {
      const video = document.createElement('video');
      video.preload = 'auto';

      video.addEventListener('loadeddata', async () => {
        const videoRatio = video.videoWidth / video.videoHeight;
        const isRatioValid = videoRatio > 0.56 && videoRatio < 0.6;
        this.errorMessage = isRatioValid
          ? undefined
          : 'Invalid video ratio (width / height), it should be between 0.56 and 0.60. Please checkout the artifacts import guide.';

        resolve(isRatioValid);
      });

      video.src = URL.createObjectURL(videoFile);
      video.load();
    });
  }
}
