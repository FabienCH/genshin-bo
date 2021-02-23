import { Component, ReactElement } from 'react';
import { ArtifactsDI } from '../../../di/artifacts-di';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import { ArtifactView } from '../../../domain/models/artifact-view';

type State = {
  artifacts: ArtifactView[];
};

class ArtifactsContainer extends Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = { artifacts: [] };
  }

  componentDidMount(): void {
    const artifacts = ArtifactsDI.artifactsHandler.getAll();
    this.setState({ artifacts });
  }

  render(): ReactElement {
    const columnDefs = [
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
    const gridWidth = this.state.artifacts.length > 13 ? 1119 : 1102;
    return (
      <section>
        <h2>All Artifacts</h2>
        <div style={{ height: 700, width: gridWidth }} className="ag-theme-material">
          <AgGridReact rowData={this.state.artifacts} columnDefs={columnDefs}>
            <AgGridColumn field="set" checkboxSelection={true}></AgGridColumn>
            <AgGridColumn field="level"></AgGridColumn>
            <AgGridColumn field="mainStat"></AgGridColumn>
            <AgGridColumn field="subStat1"></AgGridColumn>
            <AgGridColumn field="subStat2"></AgGridColumn>
            <AgGridColumn field="subStat3"></AgGridColumn>
            <AgGridColumn field="subStat4"></AgGridColumn>
          </AgGridReact>
        </div>
      </section>
    );
  }
}

export default ArtifactsContainer;
