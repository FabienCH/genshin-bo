import { VideoValidator } from './video-validator';

describe('VideoValidator', () => {
  let videoValidation: VideoValidator;

  beforeEach(() => {
    videoValidation = new VideoValidator();
    window.URL.createObjectURL = () => '';
  });

  describe('isVideoValid', () => {
    it('a mp4 video should be valid', async () => {
      mockHTMLVideoElement(570, 1000);
      const file = new File([], 'filename.mp4', { type: 'video/mp4' });

      expect(await videoValidation.isVideoValid(file)).toBeTruthy();
    });

    it('an mkv video should not be valid', async () => {
      mockHTMLVideoElement(570, 1000);
      const file = new File([], 'filename.mkv', { type: 'video/x-matroska' });

      expect(await videoValidation.isVideoValid(file)).toBeFalsy();
      expect(videoValidation.getError()).toEqual('Invalid file format. Please import an mp4 video.');
    });

    it('an mp4 video with width/height ratio less than 0.56 should not be valid', async () => {
      mockHTMLVideoElement(559, 1000);
      const file = new File([], 'filename.mp4', { type: 'video/mp4' });

      expect(await videoValidation.isVideoValid(file)).toBeFalsy();
      expect(videoValidation.getError()).toEqual(
        'Invalid video ratio (width / height), it should be between 0.56 and 0.60. Please checkout the artifacts import guide.',
      );
    });

    it('an mp4 video with width/height ratio more than 0.60 should not be valid', async () => {
      mockHTMLVideoElement(601, 1000);
      const file = new File([], 'filename.mp4', { type: 'video/mp4' });

      expect(await videoValidation.isVideoValid(file)).toBeFalsy();
      expect(videoValidation.getError()).toEqual(
        'Invalid video ratio (width / height), it should be between 0.56 and 0.60. Please checkout the artifacts import guide.',
      );
    });
  });
});

function mockHTMLVideoElement(width: number, height: number) {
  Object.defineProperty(HTMLVideoElement.prototype, 'videoWidth', {
    configurable: true,
    value: width,
  });
  Object.defineProperty(HTMLVideoElement.prototype, 'videoHeight', {
    configurable: true,
    value: height,
  });

  Object.defineProperty(HTMLVideoElement.prototype, 'load', {
    configurable: true,
    get() {
      return () => {
        this.dispatchEvent(new Event('loadeddata'));
      };
    },
  });
}
