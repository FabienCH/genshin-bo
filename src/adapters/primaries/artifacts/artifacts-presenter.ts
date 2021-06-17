import { ArtifactsDI } from '../../../di/artifacts-di';
import { ArtifactValidationError } from '../../../domain/artifacts/artifact-validation-error';
import { ArtifactMapper } from '../../../domain/artifacts/mappers/artifact-mapper';
import { ArtifactView } from '../../../domain/artifacts/models/artifact-view';
import { ArtifactsExporter } from '../../../usescases/artifacts/artifacts-exporter';
import { ArtifactsHandler } from '../../../usescases/artifacts/artifacts-handler';
import { ArtifactsImporter, JsonImportResults } from '../../../usescases/artifacts/artifacts-importer';
import { VideoValidator } from '../../../usescases/artifacts/video-validator';
import { ImportInfos } from '../../redux/artifacts/artifacts-reducer';
import { isArtifactsImportRunning, importInfos, selectAllArtifacts } from '../../redux/artifacts/artifacts-selectors';
import { Presenter } from '../presenter';

export interface ArtifactsContainerState {
  overrideCurrentArtifacts: boolean;
  fixOcrErrors: boolean;
  nbOfThreads: number;
  nbThreadsOptions: number[];
  video?: File;
  jsonImportResults?: JsonImportResults;
  errorMessage?: string;
}

export interface ArtifactsContainerSelectors {
  artifacts: ArtifactView[];
  isImportRunning: boolean;
  importInfos: ImportInfos;
  canExportArtifact: boolean;
}

export class ArtifactsPresenter extends Presenter<ArtifactsContainerState, ArtifactsContainerSelectors> {
  constructor(
    private artifactsHandler: ArtifactsHandler,
    private artifactsImporter: ArtifactsImporter,
    private artifactsExporter: ArtifactsExporter,
    private videoValidator: VideoValidator,
  ) {
    super(
      {
        overrideCurrentArtifacts: false,
        fixOcrErrors: false,
        nbOfThreads: ArtifactsDI.getOcrWorkerHandler().getMaxWorkers(),
        nbThreadsOptions: Array.from(Array(ArtifactsDI.getOcrWorkerHandler().getMaxWorkers()), (_, i) => i + 1),
      },
      () => ({
        artifacts: ArtifactsPresenter.getArtifactsView(),
        isImportRunning: isArtifactsImportRunning(),
        importInfos: importInfos(),
        canExportArtifact: selectAllArtifacts().length > 0 && !isArtifactsImportRunning(),
      }),
    );
  }

  public async videoFileChange(video: File): Promise<void> {
    if (await this.videoValidator.isVideoValid(video)) {
      this.updateState({ video });
    } else {
      this.updateState({ errorMessage: this.videoValidator.getError() });
    }
  }

  public nbThreadsChange(nbOfThreads: number): void {
    this.updateState({ nbOfThreads });
  }

  public importArtifactsFromVideo(): void {
    const { video, nbOfThreads, overrideCurrentArtifacts, fixOcrErrors } = this.state;
    if (video) {
      this.artifactsImporter.importFromVideo(video, nbOfThreads, overrideCurrentArtifacts, fixOcrErrors);
    }
  }

  public cancelImport(): void {
    this.artifactsImporter.cancelImport();
  }

  public overrideArtifactsChange(checked: boolean): void {
    this.updateState({ overrideCurrentArtifacts: checked });
  }

  public fixOcrErrorsChange(checked: boolean): void {
    this.updateState({ fixOcrErrors: checked });
  }

  public async jsonFileChange(jsonFile: File): Promise<void> {
    const jsonImportResults = await this.artifactsImporter.getArtifactsFromJson(jsonFile);
    if (jsonImportResults.artifacts.length > 0) {
      this.updateState({ jsonImportResults });
    }

    if (jsonImportResults.fileError) {
      this.updateState({ errorMessage: jsonImportResults.fileError });
    }
  }

  public exportArtifacts(): void {
    this.artifactsExporter.exportAsJsonFile(selectAllArtifacts(), isArtifactsImportRunning());
  }

  public handleAlertClose(): void {
    this.updateState({ errorMessage: undefined });
  }

  public handleDialogClose(): void {
    this.updateState({ jsonImportResults: undefined });
  }

  public handleImportFromJson(): void {
    if (this.state.jsonImportResults) {
      this.artifactsHandler.addManyFromJson(this.state.jsonImportResults.artifacts);
    }
    this.handleDialogClose();
  }

  private static getArtifactsView(): ArtifactView[] {
    return selectAllArtifacts()
      .map((artifactData) => ArtifactMapper.mapDataToView(artifactData))
      .filter(ArtifactsPresenter.isArtifactView);
  }

  private static isArtifactView(artifact: ArtifactView | ArtifactValidationError): artifact is ArtifactView {
    return !(artifact instanceof ArtifactValidationError);
  }
}
