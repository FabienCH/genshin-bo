import { Fragment, ReactElement } from 'react';
import { Container, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { CharacterStatsValues, CharacterStatTypes } from '../../../../domain/builds-optimizer/models/character-statistics';
import InfoIcon from '@material-ui/icons/Info';
import BuildsResultsGrid from '../components/builds-results-grid';
import { Build } from '../../../../domain/builds-optimizer/models/build';
import { ColDef } from 'ag-grid-community';
import ArtifactPopover from '../components/artifact-popover';
import React from 'react';
import WarningMessage from '../../shared/warning-message';
import { ArtifactsDI } from '../../../../di/artifacts-di';
import { ArtifactView } from '../../../../domain/artifacts/models/artifact-view';

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
  initialBuilds: Build[];
  newBuilds: Build[];
  isBuildsLimitReached: boolean;
  buildFilters: Partial<CharacterStatsValues>;
}

function BuildsResultsContainer(props: BuildsResultsContainerProps): ReactElement {
  const { initialBuilds, newBuilds, isBuildsLimitReached, buildFilters, classes } = props;

  const [anchorEl, setAnchorEl] = React.useState<SVGSVGElement | null>(null);
  const [currentArtifact, setCurrentArtifact] = React.useState<ArtifactView | null>(null);

  const handlePopoverOpen = (artifactId: string, event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
    const artifact = ArtifactsDI.artifactsHandler.getById(artifactId);
    if (!(artifact instanceof Error)) {
      setCurrentArtifact(artifact);
    }
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
    setCurrentArtifact(null);
  };

  let columnDefs: ColDef[] = [
    {
      field: 'buildArtifactsParams',
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
          Add values to build filters to display more columns (0 if you don't want to filter builds).
        </p>
        {isBuildsLimitReached ? (
          <WarningMessage message="You have reached the limit of 1000 builds, please use more restrictive filters."></WarningMessage>
        ) : null}
        <BuildsResultsGrid
          initialBuilds={initialBuilds}
          newBuilds={newBuilds}
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
