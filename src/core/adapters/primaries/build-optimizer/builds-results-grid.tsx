import { ReactElement, useRef } from 'react';
import { Container, createStyles, WithStyles, withStyles } from '@material-ui/core';
import { CharacterStatsValues } from '../../../domain/models/character-statistics';
import { AgGridColumn } from 'ag-grid-react/lib/agGridColumn';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { ColDef, GridApi, GridReadyEvent, RowNode } from 'ag-grid-community';
import { BuildFilter } from '../../../domain/build-filter';
import { BuildArtifactsCellRenderer } from './build-artifacts-cell-renderer';
import { Build } from '../../../domain/models/build';
import { ArtifactData } from '../../../domain/models/artifact-data';

const styles = createStyles({
  gridHeader: {
    '&.ag-header-cell': {
      paddingLeft: 10,
      paddingRight: 10,
    },
  },
});

interface BuildsResultsGridProps extends WithStyles<typeof styles> {
  builds: Build[];
  buildFilters: Partial<CharacterStatsValues>;
  columnDefs: ColDef[];
  onMouseEnterArtifact: (artifactData: ArtifactData, event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  onMouseLeaveArtifact: () => void;
}

function BuildsResultsGrid(props: BuildsResultsGridProps): ReactElement {
  const { builds, columnDefs, classes, onMouseEnterArtifact, onMouseLeaveArtifact } = props;
  const gridApi = useRef<GridApi | undefined>();
  const refBuildFilters = useRef<Partial<CharacterStatsValues>>(props.buildFilters);

  const rowData = builds.map((build) => ({ ...build.stats, artifactIds: build.artifactIds }));
  const defaultColDef = { resizable: true, sortable: true, cellStyle: { padding: '0 10px' }, headerClass: classes.gridHeader };

  refBuildFilters.current = props.buildFilters;

  if (gridApi.current) {
    gridApi.current.onFilterChanged();
    gridApi.current.sizeColumnsToFit();
  }

  const externalFilterChanged = () => {
    if (gridApi.current) {
      gridApi.current.onFilterChanged();
      gridApi.current.sizeColumnsToFit();
    }
  };

  const isExternalFilterPresent = () => {
    return !!refBuildFilters.current && gridApi.current;
  };

  const onGridReady = (params: GridReadyEvent) => {
    gridApi.current = params.api;
    gridApi.current.onFilterChanged();
    gridApi.current.sizeColumnsToFit();
  };

  const doesExternalFilterPass = (node: RowNode) => BuildFilter.filterBuilds(refBuildFilters.current, node.data);

  return (
    <Container style={{ height: 750, width: '100%' }} className="ag-theme-material">
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        frameworkComponents={{
          buildArtifactsCellRenderer: BuildArtifactsCellRenderer,
        }}
        context={{
          onMouseEnterArtifact,
          onMouseLeaveArtifact,
        }}
        onGridReady={onGridReady}
        onGridColumnsChanged={externalFilterChanged}
        isExternalFilterPresent={isExternalFilterPresent}
        doesExternalFilterPass={doesExternalFilterPass}
      >
        <AgGridColumn field="artifactIds"></AgGridColumn>
        <AgGridColumn field="hp"></AgGridColumn>
        <AgGridColumn field="atk"></AgGridColumn>
        <AgGridColumn field="def"></AgGridColumn>
        <AgGridColumn field="critRate"></AgGridColumn>
        <AgGridColumn field="critDmg"></AgGridColumn>
        <AgGridColumn field="energyRecharge"></AgGridColumn>
      </AgGridReact>
    </Container>
  );
}

export default withStyles(styles)(BuildsResultsGrid);
