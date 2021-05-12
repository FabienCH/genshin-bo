import { Component, ReactElement } from 'react';
import { ArtifactsDI } from '../../../di/artifacts-di';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { ArtifactView } from '../../../domain/models/artifact-view';
import { Container, createStyles, WithStyles, withStyles } from '@material-ui/core';
import ArtifactsImport from './components/artifacts-import';
import ArtifactsImportGuide from './components/artifacts-import-guide';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ArtifactsImporter, JsonImportResults } from '../../../usescases/artifacts-importer';
import { connect } from 'react-redux';
import { ImportInfos } from '../../redux/artifacts/artifacts-reducer';
import ArtifactsImportExportButtons from './components/artifacts-import-export-buttons';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import ArtifactsJsonImport from './components/artifacts-json-import';

const styles = createStyles({
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  artifactsCount: { marginBottom: 5 },
});

type State = {
  artifactsImporter: ArtifactsImporter;
  overrideCurrentArtifacts: boolean;
  nbOfThreads: number;
  maxNbOfWorkers: number;
  video?: File;
  jsonImportResults?: JsonImportResults;
  jsonFileErrorMessage?: string;
};

interface ArtifactsContainerProps extends WithStyles<typeof styles> {
  artifacts: ArtifactView[];
  isImportRunning: boolean;
  importInfos: ImportInfos;
  canExportArtifact: boolean;
}

class ArtifactsContainer extends Component<ArtifactsContainerProps, State> {
  constructor(props: ArtifactsContainerProps) {
    super(props);
    this.state = {
      artifactsImporter: ArtifactsDI.getArtifactsImporter(),
      overrideCurrentArtifacts: false,
      nbOfThreads: ArtifactsDI.getArtifactsImporter().getMaxWorkers(),
      maxNbOfWorkers: ArtifactsDI.getArtifactsImporter().getMaxWorkers(),
    };
    this.videoFileChange = this.videoFileChange.bind(this);
    this.nbThreadsChange = this.nbThreadsChange.bind(this);
    this.importArtifactsFromVideo = this.importArtifactsFromVideo.bind(this);
    this.cancelImport = this.cancelImport.bind(this);
    this.overrideArtifactsChange = this.overrideArtifactsChange.bind(this);
    this.jsonFileChange = this.jsonFileChange.bind(this);
    this.exportArtifacts = this.exportArtifacts.bind(this);
    this.onGridReady = this.onGridReady.bind(this);
    this.handleJsonFileAlertClose = this.handleJsonFileAlertClose.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
    this.handleImportFromJson = this.handleImportFromJson.bind(this);
  }

  videoFileChange(video: File): void {
    this.setState((state) => ({
      ...state,
      video,
    }));
  }

  nbThreadsChange(nbOfThreads: number): void {
    this.setState((state) => ({
      ...state,
      nbOfThreads,
    }));
  }

  importArtifactsFromVideo(): void {
    if (this.state.video) {
      this.state.artifactsImporter.importFromVideo(this.state.video, this.state.nbOfThreads, this.state.overrideCurrentArtifacts);
    }
  }

  cancelImport(): void {
    this.state.artifactsImporter.cancelImport();
  }

  overrideArtifactsChange(checked: boolean): void {
    this.setState((state) => ({
      ...state,
      overrideCurrentArtifacts: checked,
    }));
  }

  async jsonFileChange(jsonFile: File): Promise<void> {
    const jsonImportResults = await this.state.artifactsImporter.getArtifactsFromJson(jsonFile);
    if (jsonImportResults.artifacts.length > 0) {
      this.setState((state) => ({
        ...state,
        jsonImportResults,
      }));
    }

    if (jsonImportResults.fileError) {
      this.setState((state) => ({
        ...state,
        jsonFileErrorMessage: jsonImportResults.fileError,
      }));
    }
  }

  exportArtifacts(): void {
    ArtifactsDI.getArtifactsExporter().exportAsJsonFile();
  }

  onGridReady(params: GridReadyEvent): void {
    params.api.sizeColumnsToFit();
  }

  handleJsonFileAlertClose(): void {
    this.setState((state) => ({
      ...state,
      jsonFileErrorMessage: undefined,
    }));
  }

  handleDialogClose(): void {
    this.setState((state) => ({
      ...state,
      jsonImportResults: undefined,
    }));
  }

  handleImportFromJson(): void {
    if (this.state.jsonImportResults) {
      ArtifactsDI.artifactsHandler.addManyFromJson(this.state.jsonImportResults.artifacts);
    }
    this.handleDialogClose();
  }

  render(): ReactElement {
    const { artifacts, isImportRunning, importInfos, canExportArtifact, classes } = this.props;
    const nbThreadsOptions = Array.from(Array(this.state.maxNbOfWorkers), (_, i) => i + 1);

    const defaultColDef: ColDef = {
      resizable: true,
      sortable: true,
      lockVisible: true,
    };

    const columnDefs: ColDef[] = [
      {
        field: 'type',
        width: 100,
      },
      {
        field: 'level',
        width: 80,
      },
      {
        field: 'set',
        width: 170,
      },
      {
        field: 'mainStat',
        width: 170,
      },
      {
        headerName: 'Sub Stat 1',
        field: 'subStat1',
        width: 170,
      },
      {
        headerName: 'Sub Stat 2',
        field: 'subStat2',
        width: 170,
      },
      {
        headerName: 'Sub Stat 3',
        field: 'subStat3',
        width: 170,
      },
      {
        headerName: 'Sub Stat 4',
        field: 'subStat4',
        width: 170,
      },
    ];

    return (
      <section>
        <h2>Import Artifacts</h2>
        <ArtifactsImportGuide></ArtifactsImportGuide>
        <ArtifactsImport
          video={this.state.video}
          isImportRunning={isImportRunning}
          importInfos={importInfos}
          nbThreadsOptions={nbThreadsOptions}
          nbOfThreads={this.state.nbOfThreads}
          fileChanged={this.videoFileChange}
          nbThreadsChanged={this.nbThreadsChange}
          importArtifacts={this.importArtifactsFromVideo}
          cancelImport={this.cancelImport}
          overrideArtifactsChanged={this.overrideArtifactsChange}
        ></ArtifactsImport>
        <Container>
          <div className={classes.actionsContainer}>
            <ArtifactsImportExportButtons
              canImportArtifact={!isImportRunning}
              canExportArtifact={canExportArtifact}
              jsonFileChange={this.jsonFileChange}
              exportArtifacts={this.exportArtifacts}
            ></ArtifactsImportExportButtons>
            <span className={classes.artifactsCount}>artifacts: {artifacts.length}</span>
          </div>
          <div style={{ height: 750, width: '100%' }} className="ag-theme-material">
            <AgGridReact rowData={artifacts} defaultColDef={defaultColDef} columnDefs={columnDefs} onGridReady={this.onGridReady}>
              <AgGridColumn field="type"></AgGridColumn>
              <AgGridColumn field="level"></AgGridColumn>
              <AgGridColumn field="set"></AgGridColumn>
              <AgGridColumn field="mainStat"></AgGridColumn>
              <AgGridColumn field="subStat1"></AgGridColumn>
              <AgGridColumn field="subStat2"></AgGridColumn>
              <AgGridColumn field="subStat3"></AgGridColumn>
              <AgGridColumn field="subStat4"></AgGridColumn>
            </AgGridReact>
          </div>
        </Container>
        <Snackbar open={!!this.state.jsonFileErrorMessage} autoHideDuration={5000} onClose={this.handleJsonFileAlertClose}>
          <Alert onClose={this.handleJsonFileAlertClose} severity="error">
            {this.state.jsonFileErrorMessage} Please import a previously exported JSON file.
          </Alert>
        </Snackbar>
        <Dialog
          data-testid="json-import-modal"
          open={!!this.state.jsonImportResults}
          maxWidth="sm"
          onClose={this.handleDialogClose}
          aria-labelledby="json-import-modal"
        >
          {this.state.jsonImportResults ? (
            <ArtifactsJsonImport
              importResults={this.state.jsonImportResults}
              onClose={this.handleDialogClose}
              onImport={this.handleImportFromJson}
            ></ArtifactsJsonImport>
          ) : null}
        </Dialog>
      </section>
    );
  }
}

const mapStateToProps = () => {
  return {
    artifacts: ArtifactsDI.artifactsHandler.getAll(),
    isImportRunning: ArtifactsDI.getArtifactsImporter().isImportRunning(),
    importInfos: ArtifactsDI.getArtifactsImporter().geImportInfos(),
    canExportArtifact: ArtifactsDI.getArtifactsExporter().canExportArtifacts(),
  };
};

export default connect(mapStateToProps)(withStyles(styles)(ArtifactsContainer));
