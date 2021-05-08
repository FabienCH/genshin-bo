import { isArtifactsImportRunning, selectAllArtifacts } from '../adapters/redux/artifacts/artifacts-selectors';
import { ArtifactsRepository } from '../domain/artifacts-repository';

export class ArtifactsExporter {
  constructor(private readonly artifactsRepository: ArtifactsRepository) {}

  public exportAsJsonFile(): void {
    const artifacts = this.artifactsRepository.getAll();
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
