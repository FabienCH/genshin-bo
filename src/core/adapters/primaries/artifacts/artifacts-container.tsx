import { Component, ReactElement } from 'react';
import { ArtifactsDI } from '../../../di/artifacts-di';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { ArtifactView } from '../../../domain/models/artifact-view';
import { Container } from '@material-ui/core';
import ArtifactsImport from './artifacts-import';
import { ColDef } from 'ag-grid-community';
import { ArtifactsImporter } from '../../../usescases/artifacts-importer';

type State = {
  artifactsImporter: ArtifactsImporter;
  artifacts: ArtifactView[];
  video?: File;
};

class ArtifactsContainer extends Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = { artifactsImporter: ArtifactsDI.getArtifactsImporter(), artifacts: [] };
    this.videoFileChange = this.videoFileChange.bind(this);
    this.importArtifacts = this.importArtifacts.bind(this);
  }

  componentDidMount(): void {
    const artifacts = ArtifactsDI.artifactsHandler.getAll();
    this.setState({ artifacts });
  }

  videoFileChange(video: File): void {
    this.setState((state) => ({
      ...state,
      video,
    }));
  }

  importArtifacts(): void {
    if (this.state.video) {
      this.state.artifactsImporter.importFromVideo(this.state.video);
    }
  }

  render(): ReactElement {
    const defaultColDef: ColDef = {
      resizable: true,
      sortable: true,
    };

    const columnDefs: ColDef[] = [
      {
        field: 'set',
        width: 170,
      },
      {
        field: 'level',
        width: 80,
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
    const gridWidth = this.state.artifacts.length > 13 ? 1169 : 1152;
    return (
      <section>
        <h2>Import Artifacts</h2>
        <ArtifactsImport
          video={this.state.video}
          handleFileChange={this.videoFileChange}
          importArtifacts={this.importArtifacts}
        ></ArtifactsImport>
        <Container style={{ height: 750, width: gridWidth }} className="ag-theme-material">
          <AgGridReact rowData={this.state.artifacts} defaultColDef={defaultColDef} columnDefs={columnDefs}>
            <AgGridColumn field="set" checkboxSelection={true}></AgGridColumn>
            <AgGridColumn field="level"></AgGridColumn>
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

export default ArtifactsContainer;
