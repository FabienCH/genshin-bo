import { Fragment, ReactElement } from 'react';
import { Container, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { CharacterStatsValues, CharacterStatTypes } from '../../../../domain/models/character-statistics';
import InfoIcon from '@material-ui/icons/Info';
import BuildsResultsGrid from '../components/builds-results-grid';
import { Build } from '../../../../domain/models/build';
import { ColDef } from 'ag-grid-community';
import ArtifactPopover from '../components/artifact-popover';
import React from 'react';
import { ArtifactMapper } from '../../../../domain/mappers/artifact-mapper';
import { ArtifactData } from '../../../../domain/models/artifact-data';
import { ArtifactView } from '../../../../domain/models/artifact-view';
import WarningMessage from '../../shared/warning-message';

const styles = createStyles({
  infoContainer: {
    display: 'flex',
    marginTop: 0,
    alignItems: 'center',
  },
  infoIcon: {
    float: 'left',
    marginRight: 10,
  },
});

interface BuildsResultsContainerProps extends WithStyles<typeof styles> {
  builds: Build[];
  isBuildsLimitReached: boolean;
  buildFilters: Partial<CharacterStatsValues>;
}

function BuildsResultsContainer(props: BuildsResultsContainerProps): ReactElement {
  const { builds, isBuildsLimitReached, buildFilters, classes } = props;

  const [anchorEl, setAnchorEl] = React.useState<SVGSVGElement | null>(null);
  const [currentArtifact, setCurrentArtifact] = React.useState<ArtifactView | null>(null);

  const handlePopoverOpen = (artifactData: ArtifactData, event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
    setCurrentArtifact(ArtifactMapper.mapDataToView(artifactData));
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setCurrentArtifact(null);
  };

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
        {isBuildsLimitReached ? (
          <WarningMessage message="You have reached the limit of 1000 builds, please use more restrictive filters."></WarningMessage>
        ) : null}
        <BuildsResultsGrid
          builds={builds}
          buildFilters={buildFilters}
          columnDefs={columnDefs}
          onMouseEnterArtifact={handlePopoverOpen}
          onMouseLeaveArtifact={handlePopoverClose}
        ></BuildsResultsGrid>
      </Container>
      <ArtifactPopover artifact={currentArtifact} anchorEl={anchorEl}></ArtifactPopover>
    </Fragment>
  );
}

export default withStyles(styles)(BuildsResultsContainer);
