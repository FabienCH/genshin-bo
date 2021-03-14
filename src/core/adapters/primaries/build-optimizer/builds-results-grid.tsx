import { ReactElement, useRef } from 'react';
import { Container } from '@material-ui/core';
import { CharacterStatsValues } from '../../../domain/models/character-statistics';
import { AgGridColumn } from 'ag-grid-react/lib/agGridColumn';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { ColDef, GridApi, GridReadyEvent, RowNode } from 'ag-grid-community';
import { BuildFilter } from '../../../domain/build-filter';

interface BuildsResultsGridProps {
  builds: CharacterStatsValues[];
  buildFilters: Partial<CharacterStatsValues>;
  columnDefs: ColDef[];
}

function BuildsResultsGrid(props: BuildsResultsGridProps): ReactElement {
  const { builds, columnDefs } = props;
  const gridApi = useRef<GridApi | undefined>();
  const refBuildFilters = useRef<Partial<CharacterStatsValues>>(props.buildFilters);

  const defaultColDef = { resizable: true, sortable: true };

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
        rowData={builds}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        onGridReady={onGridReady}
        onGridColumnsChanged={externalFilterChanged}
        isExternalFilterPresent={isExternalFilterPresent}
        doesExternalFilterPass={doesExternalFilterPass}
      >
        <AgGridColumn field="hp" checkboxSelection={true}></AgGridColumn>
        <AgGridColumn field="atk"></AgGridColumn>
        <AgGridColumn field="def"></AgGridColumn>
        <AgGridColumn field="critRate"></AgGridColumn>
        <AgGridColumn field="critDmg"></AgGridColumn>
        <AgGridColumn field="energyRecharge"></AgGridColumn>
      </AgGridReact>
    </Container>
  );
}

export default BuildsResultsGrid;
