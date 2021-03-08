import { ReactElement, useRef } from 'react';
import { Container } from '@material-ui/core';
import { CharacterStatsValues, CharacterStatTypes } from '../../../domain/models/character-statistics';
import { AgGridColumn } from 'ag-grid-react/lib/agGridColumn';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { GridApi, GridReadyEvent, RowNode } from 'ag-grid-community';
import { BuildFilter } from '../../../usescases/build-filter';

interface BuildsResultsProps {
  builds: CharacterStatsValues[];
  buildFilters: Partial<CharacterStatsValues>;
  additionalStatsToDisplay: CharacterStatTypes[];
}

function BuildsResults(props: BuildsResultsProps): ReactElement {
  const { builds, additionalStatsToDisplay } = props;
  const gridApi = useRef<GridApi | undefined>();
  const refBuildFilters = useRef<Partial<CharacterStatsValues>>(props.buildFilters);

  const defaultColDef = { resizable: true, sortable: true };
  let columnDefs = [
    {
      field: 'hp',
      width: 100,
    },
    {
      field: 'atk',
      width: 100,
    },
    {
      field: 'def',
      width: 100,
    },
    {
      field: 'critRate',
      width: 120,
    },
    {
      field: 'critDmg',
      width: 120,
    },
    {
      field: 'energyRecharge',
      width: 150,
    },
  ];

  columnDefs = [
    ...columnDefs,
    ...additionalStatsToDisplay
      .filter((additionalStat) => !columnDefs.find((col) => col.field === additionalStat))
      .map((additionalStat) => ({
        field: additionalStat,
        width: 150,
      })),
  ];

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

export default BuildsResults;
