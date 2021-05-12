import { isArtifactsImportRunning, selectAllArtifacts } from '../adapters/redux/artifacts/artifacts-selectors';

export class ArtifactsExporter {
  public exportAsJsonFile(): void {
    const artifacts = selectAllArtifacts();
    const blob = new Blob([JSON.stringify(artifacts)], { type: 'application/json' });
    this.downloadFile(blob);
  }

  public canExportArtifacts(): boolean {
    return selectAllArtifacts().length > 0 && !isArtifactsImportRunning();
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
