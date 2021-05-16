export function mockHTMLVideoElement(width: number, height: number): void {
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
