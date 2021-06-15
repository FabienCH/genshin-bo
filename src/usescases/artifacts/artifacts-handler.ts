import { ArtifactMapper } from '../../domain/artifacts/mappers/artifact-mapper';
import { isArtifactsStateInitialized, selectArtifactById } from '../../adapters/redux/artifacts/artifacts-selectors';
import {
  addManyArtifactAction,
  addOneArtifactAction,
  deleteAllArtifactsAction,
  loadArtifactsActions,
} from '../../adapters/redux/artifacts/artifacts-action';
import { appStore } from '../../adapters/redux/store';
import { ArtifactValidator } from '../../domain/artifacts/artifacts-validator';
import { ArtifactValidationError } from '../../domain/artifacts/artifact-validation-error';
import { ArtifactData } from '../../domain/artifacts/models/artifact-data';
import { ArtifactView } from '../../domain/artifacts/models/artifact-view';
import { artifactLevelUp } from '../../adapters/redux/builds/builds-selectors';

export class ArtifactsHandler {
  constructor(private readonly artifactValidator: ArtifactValidator) {
    if (!isArtifactsStateInitialized()) {
      appStore.dispatch(loadArtifactsActions());
    }
  }

  public getById(id: string): ArtifactView | Error {
    const artifact = selectArtifactById(id);
    if (!artifact) {
      return new Error(`artifact with id ${id} not found`);
    }
    return ArtifactMapper.mapDataToView(artifact, artifactLevelUp());
  }

  public addOne(artifactData: ArtifactData): void | ArtifactValidationError {
    if (!this.artifactValidator.isArtifactValid(artifactData)) {
      return this.artifactValidator.getErrors();
    }
    appStore.dispatch(addOneArtifactAction(artifactData));
  }

  public addManyFromJson(artifactsData: ArtifactData[]): void | number {
    const artifactsInError = artifactsData.filter((artifactData) => !this.artifactValidator.isArtifactValid(artifactData));
    if (artifactsInError.length > 0) {
      return artifactsInError.length;
    }
    appStore.dispatch(deleteAllArtifactsAction());
    appStore.dispatch(addManyArtifactAction(artifactsData));
  }
}
