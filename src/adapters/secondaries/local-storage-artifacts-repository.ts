import { ArtifactsRepository } from '../../domain/artifacts/artifacts-repository';
import { ArtifactData } from '../../domain/artifacts/models/artifact-data';

export class LocalStorageArtifactsRepository implements ArtifactsRepository {
  private readonly artifactsKey = 'artifacts';
  private artifactsData!: ArtifactData[];

  constructor() {
    this.setArtifactsData();
  }

  public getAll(): ArtifactData[] {
    this.setArtifactsData();
    return this.artifactsData;
  }

  public addOne(artifactData: ArtifactData): void {
    this.artifactsData = [...this.artifactsData, artifactData];
    this.saveArtifacts();
  }

  public addMany(artifactsData: ArtifactData[]): void {
    this.artifactsData = [...this.artifactsData, ...artifactsData];
    this.saveArtifacts();
  }

  public deleteAll(): void {
    this.artifactsData = [];
    this.saveArtifacts();
  }

  private setArtifactsData(): void {
    const storedArtifactsData = localStorage.getItem(this.artifactsKey);
    this.artifactsData = storedArtifactsData ? JSON.parse(storedArtifactsData) : [];
  }

  private saveArtifacts(): void {
    localStorage.setItem(this.artifactsKey, JSON.stringify(this.artifactsData));
  }
}
