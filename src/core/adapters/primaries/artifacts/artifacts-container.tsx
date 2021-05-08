import { Component, ReactElement } from 'react';
import { ArtifactsDI } from '../../../di/artifacts-di';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { ArtifactView } from '../../../domain/models/artifact-view';
import { Container, createStyles, withStyles, WithStyles } from '@material-ui/core';
import ArtifactsImport from './components/artifacts-import';
import ArtifactsImportGuide from './components/artifacts-import-guide';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ArtifactsImporter } from '../../../usescases/artifacts-importer';
import { connect } from 'react-redux';
import { ImportInfos } from '../../redux/artifacts/artifacts-reducer';
import Button from '@material-ui/core/Button';
import GetAppIcon from '@material-ui/icons/GetApp';

const styles = createStyles({
  exportButton: {
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  getAppIcon: {
    marginRight: 5,
  },
});

type State = {
  artifactsImporter: ArtifactsImporter;
  overrideCurrentArtifacts: boolean;
  nbOfThreads: number;
  maxNbOfWorkers: number;
  video?: File;
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
    this.importArtifacts = this.importArtifacts.bind(this);
    this.cancelImport = this.cancelImport.bind(this);
    this.overrideArtifactsChange = this.overrideArtifactsChange.bind(this);
    this.exportArtifacts = this.exportArtifacts.bind(this);
    this.onGridReady = this.onGridReady.bind(this);
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

  importArtifacts(): void {
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

  exportArtifacts(): void {
    ArtifactsDI.getArtifactsExporter().exportAsJsonFile();
  }

  onGridReady(params: GridReadyEvent): void {
    params.api.sizeColumnsToFit();
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
          importArtifacts={this.importArtifacts}
          cancelImport={this.cancelImport}
          overrideArtifactsChanged={this.overrideArtifactsChange}
        ></ArtifactsImport>
        <Container>
          <div className={classes.exportButton}>
            <Button color="primary" disabled={!canExportArtifact} onClick={this.exportArtifacts}>
              <GetAppIcon className={classes.getAppIcon}></GetAppIcon>Export Artifacts
            </Button>
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
