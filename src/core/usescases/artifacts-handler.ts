import { ArtifactMapper } from '../domain/mappers/artifact-mapper';
import { Artifact } from '../domain/entities/artifact';
import { ArtifactView } from '../domain/models/artifact-view';
import { isArtifactsStateInitialized, selectAllArtifacts, selectArtifactById } from '../adapters/redux/artifacts/artifacts-selectors';
import { addOneArtifactAction } from '../adapters/redux/artifacts/artifacts-action';
import { appStore } from '../adapters/redux/store';
import { ArtifactData } from '../domain/models/artifact-data';
import { loadArtifacts } from '../adapters/redux/artifacts/artifacts-middleware';

export class ArtifactsHandler {
  constructor() {
    if (!isArtifactsStateInitialized()) {
      appStore.dispatch(loadArtifacts());
    }
  }

  public getAll(): ArtifactView[] {
    return selectAllArtifacts().map((artifact) => ArtifactMapper.mapDataToView(artifact));
  }

  public getById(id: string): Artifact {
    const artifact = selectArtifactById(id);
    if (!artifact) {
      throw new Error(`artifact with id ${id} not found`);
    }
    return ArtifactMapper.mapDataToArtifact(artifact);
  }

  public addOne(artifactData: ArtifactData): void {
    ArtifactMapper.mapDataToArtifact(artifactData);
    appStore.dispatch(addOneArtifactAction(artifactData));
  }
}
