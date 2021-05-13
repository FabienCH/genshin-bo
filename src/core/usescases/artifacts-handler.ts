import { ArtifactMapper } from '../domain/mappers/artifact-mapper';
import { ArtifactView } from '../domain/models/artifact-view';
import { isArtifactsStateInitialized, selectAllArtifacts, selectArtifactById } from '../adapters/redux/artifacts/artifacts-selectors';
import {
  addManyArtifactAction,
  addOneArtifactAction,
  deleteAllArtifactsAction,
  loadArtifactsActions,
} from '../adapters/redux/artifacts/artifacts-action';
import { appStore } from '../adapters/redux/store';
import { ArtifactData } from '../domain/models/artifact-data';
import { ArtifactValidator } from '../domain/artifacts-validator';
import { ArtifactValidationError } from '../domain/artifact-validation-error';

export class ArtifactsHandler {
  constructor(private readonly artifactValidator: ArtifactValidator = new ArtifactValidator()) {
    if (!isArtifactsStateInitialized()) {
      appStore.dispatch(loadArtifactsActions());
    }
  }

  public getAll(): ArtifactView[] {
    return selectAllArtifacts()
      .map((artifactData) => ArtifactMapper.mapDataToView(artifactData))
      .filter(this.isArtifactView);
  }

  public getById(id: string): ArtifactView | Error {
    const artifact = selectArtifactById(id);
    if (!artifact) {
      return new Error(`artifact with id ${id} not found`);
    }
    return ArtifactMapper.mapDataToView(artifact);
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

  private isArtifactView(artifact: ArtifactView | ArtifactValidationError): artifact is ArtifactView {
    return !(artifact instanceof ArtifactValidationError);
  }
}
