import { ReactElement, useRef, useState } from 'react';
import { Container, createStyles, WithStyles, withStyles } from '@material-ui/core';
import { CharacterStatsValues } from '../../../../domain/models/character-statistics';
import { AgGridColumn } from 'ag-grid-react/lib/agGridColumn';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { ColDef, GridApi, GridReadyEvent, RowNode } from 'ag-grid-community';
import { BuildFilter } from '../../../../domain/build-filter';
import { BuildArtifactsCellRenderer } from './build-artifacts-cell-renderer';
import { Build } from '../../../../domain/models/build';
import React from 'react';

const styles = createStyles({
  gridHeader: {
    '&.ag-header-cell': {
      paddingLeft: 10,
      paddingRight: 10,
    },
  },
  buildsCount: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
});

interface BuildsResultsGridProps extends WithStyles<typeof styles> {
  initialBuilds: Build[];
  newBuilds: Build[];
  buildFilters: Partial<CharacterStatsValues>;
  columnDefs: ColDef[];
  onMouseEnterArtifact: (artifactId: string, event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  onMouseLeaveArtifact: () => void;
}

function BuildsResultsGrid(props: BuildsResultsGridProps): ReactElement {
  const { columnDefs, classes, onMouseEnterArtifact, onMouseLeaveArtifact } = props;
  const gridApi = useRef<GridApi | undefined>();
  const refBuildFilters = useRef<Partial<CharacterStatsValues>>(props.buildFilters);
  const [newBuilds, setNewBuilds] = useState(props.newBuilds);
  const [initialBuilds, setInitialBuilds] = useState(props.initialBuilds);

  const getRowData = (builds: Build[]) => builds.map((build) => ({ ...build.stats, buildArtifactsParams: build.buildArtifactsParams }));

  React.useEffect(() => {
    if (props.initialBuilds.length === 0 && props.newBuilds.length === 0) {
      setInitialBuilds(props.initialBuilds);
      gridApi.current?.setRowData([]);
    }
    if (props.newBuilds !== newBuilds) {
      setNewBuilds(props.newBuilds);
      const rowData = getRowData(props.newBuilds);
      gridApi.current?.applyTransaction({ add: rowData });
    }
  }, [initialBuilds, newBuilds, props.initialBuilds, props.newBuilds]);

  const rowData = getRowData(initialBuilds);
  const defaultColDef: ColDef = {
    resizable: true,
    sortable: true,
    cellStyle: { padding: '0 10px' },
    headerClass: classes.gridHeader,
    valueFormatter: (params) => (params.value != null ? params.value : 0),
  };

  refBuildFilters.current = props.buildFilters;
  gridApi.current?.onFilterChanged();
  gridApi.current?.sizeColumnsToFit();

  const externalFilterChanged = () => {
    gridApi.current?.onFilterChanged();
    gridApi.current?.sizeColumnsToFit();
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

  const buildsCount = gridApi.current ? gridApi.current.getDisplayedRowCount() : 0;

  return (
    <Container style={{ height: 750, width: '100%' }} className="ag-theme-material">
      <span className={classes.buildsCount}>builds: {buildsCount}</span>
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
        <AgGridColumn field="buildArtifactsParams"></AgGridColumn>
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
