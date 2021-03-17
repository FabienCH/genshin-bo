import { Fragment, ReactElement } from 'react';
import { Container, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { CharacterStatsValues, CharacterStatTypes } from '../../../domain/models/character-statistics';
import InfoIcon from '@material-ui/icons/Info';
import BuildsResultsGrid from './builds-results-grid';
import { Build } from '../../../domain/models/build';
import { ColDef } from 'ag-grid-community';

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

interface BuildsResultsContainerProps extends WithStyles<typeof styles> {
  builds: Build[];
  buildFilters: Partial<CharacterStatsValues>;
}

function BuildsResultsContainer(props: BuildsResultsContainerProps): ReactElement {
  const { builds, buildFilters, classes } = props;

  let columnDefs: ColDef[] = [
    {
      field: 'artifactIds',
      headerName: 'Artifacts',
      cellRenderer: 'buildArtifactsCellRenderer',
      width: 150,
      minWidth: 140,
    },
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
    ...Object.keys(buildFilters)
      .filter((key) => buildFilters[key as CharacterStatTypes] != null && !columnDefs.find((col) => col.field === key))
      .map((additionalStat) => ({
        field: additionalStat,
        width: 150,
      })),
  ];

  return (
    <Fragment>
      <h3>Builds Results</h3>
      <Container>
        <p className={classes.infoContainer}>
          <InfoIcon className={classes.infoIcon}></InfoIcon>
          Add values to build filters (0 if you don't want to filter builds) to display more columns.
          <br />
          Only statistics are calculated for now, so 4 pieces set effects are ignored.
        </p>
        <BuildsResultsGrid builds={builds} buildFilters={buildFilters} columnDefs={columnDefs}></BuildsResultsGrid>
      </Container>
    </Fragment>
  );
}

export default withStyles(styles)(BuildsResultsContainer);
