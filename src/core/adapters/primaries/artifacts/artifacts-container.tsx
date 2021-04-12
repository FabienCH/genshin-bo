import { Component, ReactElement } from 'react';
import { ArtifactsDI } from '../../../di/artifacts-di';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { ArtifactView } from '../../../domain/models/artifact-view';
import { Container } from '@material-ui/core';
import ArtifactsImport from './artifacts-import';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { ArtifactsImporter } from '../../../usescases/artifacts-importer';
import { connect } from 'react-redux';
import { ImportInfos } from '../../redux/artifacts/artifacts-reducer';

type State = {
  artifactsImporter: ArtifactsImporter;
  overrideCurrentArtifacts: boolean;
  video?: File;
};

type ArtifactsContainerProps = { artifacts: ArtifactView[]; isImportRunning: boolean; importInfos: ImportInfos };

class ArtifactsContainer extends Component<ArtifactsContainerProps, State> {
  constructor(props: ArtifactsContainerProps) {
    super(props);
    this.state = { artifactsImporter: ArtifactsDI.getArtifactsImporter(), overrideCurrentArtifacts: false };
    this.videoFileChange = this.videoFileChange.bind(this);
    this.importArtifacts = this.importArtifacts.bind(this);
    this.cancelImport = this.cancelImport.bind(this);
    this.overrideArtifactsChange = this.overrideArtifactsChange.bind(this);
    this.onGridReady = this.onGridReady.bind(this);
  }

  videoFileChange(video: File): void {
    this.setState((state) => ({
      ...state,
      video,
    }));
  }

  importArtifacts(): void {
    if (this.state.video) {
      this.state.artifactsImporter.importFromVideo(this.state.video, this.state.overrideCurrentArtifacts);
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

  onGridReady(params: GridReadyEvent): void {
    params.api.sizeColumnsToFit();
  }

  render(): ReactElement {
    const { artifacts, isImportRunning, importInfos } = this.props;

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
    const gridWidth = artifacts.length > 13 ? 1269 : 1252;
    return (
      <section>
        <h2>Import Artifacts</h2>
        <ArtifactsImport
          video={this.state.video}
          isImportRunning={isImportRunning}
          importInfos={importInfos}
          handleFileChange={this.videoFileChange}
          importArtifacts={this.importArtifacts}
          cancelImport={this.cancelImport}
          handleOverrideArtifactsChange={this.overrideArtifactsChange}
        ></ArtifactsImport>
        <Container style={{ height: 750, width: gridWidth }} className="ag-theme-material">
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
  };
};

export default connect(mapStateToProps)(ArtifactsContainer);
