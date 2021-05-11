export function mockBlobText(file: File): void {
  Blob.prototype.text = async (): Promise<string> => {
    return new Promise((resolve: (text: string) => void, reject: (error: string) => void) => {
      const reader = new FileReader();
      try {
        reader.onload = (_) => {
          resolve(`${reader.result}`);
        };
        reader.readAsText(file);
      } catch (e) {
        reject(e);
      }
    });
  };
}
