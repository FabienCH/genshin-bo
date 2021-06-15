import { Component, ReactElement } from 'react';
import { ArtifactsDI } from '../../../di/artifacts-di';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { Container, createStyles, WithStyles, withStyles } from '@material-ui/core';
import ArtifactsImport from './components/artifacts-import';
import ArtifactsImportGuide from './components/artifacts-import-guide';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { connect } from 'react-redux';
import ArtifactsImportExportButtons from './components/artifacts-import-export-buttons';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Dialog from '@material-ui/core/Dialog';
import ArtifactsJsonImport from './components/artifacts-json-import';
import { ArtifactsContainerState, ArtifactsContainerVM, ArtifactsPresenter } from './artifacts-presenter';

const styles = createStyles({
  actionsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  artifactsCount: { marginBottom: 5 },
});

const artifactsPresenter = new ArtifactsPresenter(
  ArtifactsDI.getArtifactsHandler(),
  ArtifactsDI.getArtifactsImporter(),
  ArtifactsDI.getArtifactsExporter(),
  ArtifactsDI.getVideoValidator(),
);

type ArtifactsContainerProps = ArtifactsContainerVM & WithStyles<typeof styles>;

class ArtifactsContainer extends Component<ArtifactsContainerProps, ArtifactsContainerState> {
  private artifactsPresenter: ArtifactsPresenter;

  constructor(props: ArtifactsContainerProps) {
    super(props);
    this.artifactsPresenter = artifactsPresenter;
    this.state = this.artifactsPresenter.getInitialState();
    this.onGridReady = this.onGridReady.bind(this);
  }

  componentDidMount() {
    this.artifactsPresenter.onStateUpdated((newState) => {
      this.setState((state) => ({
        ...state,
        ...newState,
      }));
    });
  }

  onGridReady(params: GridReadyEvent): void {
    params.api.sizeColumnsToFit();
  }

  render(): ReactElement {
    const { artifacts, isImportRunning, importInfos, canExportArtifact, classes } = this.props;

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
          nbThreadsOptions={this.state.nbThreadsOptions}
          nbOfThreads={this.state.nbOfThreads}
          fileChanged={this.artifactsPresenter.videoFileChange.bind(this.artifactsPresenter)}
          nbThreadsChanged={this.artifactsPresenter.nbThreadsChange.bind(this.artifactsPresenter)}
          importArtifacts={this.artifactsPresenter.importArtifactsFromVideo.bind(this.artifactsPresenter)}
          cancelImport={this.artifactsPresenter.cancelImport.bind(this.artifactsPresenter)}
          overrideArtifactsChanged={this.artifactsPresenter.overrideArtifactsChange.bind(this.artifactsPresenter)}
          fixOcrErrorsChanged={this.artifactsPresenter.fixOcrErrorsChange.bind(this.artifactsPresenter)}
        ></ArtifactsImport>
        <Container>
          <div className={classes.actionsContainer}>
            <ArtifactsImportExportButtons
              canImportArtifact={!isImportRunning}
              canExportArtifact={canExportArtifact}
              jsonFileChange={this.artifactsPresenter.jsonFileChange.bind(this.artifactsPresenter)}
              exportArtifacts={this.artifactsPresenter.exportArtifacts.bind(this.artifactsPresenter)}
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
        <Snackbar open={!!this.state.errorMessage} autoHideDuration={7000} onClose={this.artifactsPresenter.handleAlertClose}>
          <Alert onClose={this.artifactsPresenter.handleAlertClose.bind(this.artifactsPresenter)} severity="error">
            {this.state.errorMessage}
          </Alert>
        </Snackbar>
        <Dialog
          data-testid="json-import-modal"
          open={!!this.state.jsonImportResults}
          maxWidth="sm"
          onClose={this.artifactsPresenter.handleDialogClose.bind(this.artifactsPresenter)}
          aria-labelledby="json-import-modal"
        >
          {this.state.jsonImportResults ? (
            <ArtifactsJsonImport
              importResults={this.state.jsonImportResults}
              onClose={this.artifactsPresenter.handleDialogClose.bind(this.artifactsPresenter)}
              onImport={this.artifactsPresenter.handleImportFromJson.bind(this.artifactsPresenter)}
            ></ArtifactsJsonImport>
          ) : null}
        </Dialog>
      </section>
    );
  }
}

const mapStateToProps = () => artifactsPresenter.getViewModel();

export default connect(mapStateToProps)(withStyles(styles)(ArtifactsContainer));
