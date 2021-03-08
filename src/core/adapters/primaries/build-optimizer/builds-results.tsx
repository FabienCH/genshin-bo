import { ReactElement, useRef } from 'react';
import { Container, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { CharacterStatsValues, CharacterStatTypes } from '../../../domain/models/character-statistics';
import { AgGridColumn } from 'ag-grid-react/lib/agGridColumn';
import { AgGridReact } from 'ag-grid-react/lib/agGridReact';
import { GridApi, GridReadyEvent, RowNode } from 'ag-grid-community';
import { BuildFilter } from '../../../usescases/build-filter';
import InfoIcon from '@material-ui/icons/Info';

const styles = createStyles({
  infoIcon: {
    float: 'left',
    marginRight: 10,
  },
  infoContainer: {
    display: 'flex',
    margin: 0,
    alignItems: 'center',
  },
});

interface BuildsResultsProps extends WithStyles<typeof styles> {
  builds: CharacterStatsValues[];
  buildFilters: Partial<CharacterStatsValues>;
  additionalStatsToDisplay: CharacterStatTypes[];
}

function BuildsResults(props: BuildsResultsProps): ReactElement {
  const { builds, additionalStatsToDisplay, classes } = props;
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
    <Container>
      <p className={classes.infoContainer}>
        <InfoIcon className={classes.infoIcon}></InfoIcon>
        Add values to build filters (0 if you don't want to filter builds) to display more columns.
        <br />
        Only statistics are calculated for now, so 4 pieces set effects are ignored.
      </p>
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
    </Container>
  );
}

export default withStyles(styles)(BuildsResults);
