import { ArtifactData } from '../../domain/artifacts/models/artifact-data';

export class ArtifactsExporter {
  public exportAsJsonFile(artifacts: ArtifactData[], isArtifactsImportRunning: boolean): void {
    if (artifacts.length === 0 || isArtifactsImportRunning) {
      throw new Error(`can't export ${isArtifactsImportRunning ? 'when import is running' : 'if there is no artifact'}.`);
    }
    const blob = new Blob([JSON.stringify(artifacts)], { type: 'application/json' });
    this.downloadFile(blob);
  }

  private downloadFile(blob: Blob): void {
    const objectUrl = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = objectUrl;
    a.download = 'artifacts.json';
    a.click();
    a.remove();
  }
}
