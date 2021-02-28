import React, { ReactElement } from 'react';
import { Container, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { ArtifactStatsTypes } from '../../../domain/models/main-statistics';
import ArtifactsMainSelects from './artifacts-main-selects';
import { CircletMainStatWithPlaceholder } from '../../../domain/models/circlet-artifact-data';
import { SandsMainStatWithPlaceholder } from '../../../domain/models/sands-artifact-data';
import { GobletMainStatWithPlaceholder } from '../../../domain/models/goblet-artifact-data';
import ArtifactsOptionsForm from './artifacts-options-form';

const styles = createStyles({
  container: {
    display: 'flex',
  },
});

interface ArtifactsFormProps extends WithStyles<typeof styles> {
  focusStats: ArtifactStatsTypes[];
  minLevel: number;
  sandsMain: SandsMainStatWithPlaceholder;
  gobletMain: GobletMainStatWithPlaceholder;
  circletMain: CircletMainStatWithPlaceholder;
  onFocusStatsChange: (focusStats: ArtifactStatsTypes[]) => void;
  onMinLevelChange: (minLevel: number) => void;
  onSandsMainChange: (sandsMain: SandsMainStatWithPlaceholder) => void;
  onGobletMainChange: (gobletMain: GobletMainStatWithPlaceholder) => void;
  onCircletMainChange: (circletMain: CircletMainStatWithPlaceholder) => void;
}

function ArtifactsForm(props: ArtifactsFormProps): ReactElement {
  const { focusStats, minLevel, sandsMain, gobletMain, circletMain, classes } = props;

  const handleFocusStatsChange = (focusStats: ArtifactStatsTypes[]): void => {
    props.onFocusStatsChange(focusStats);
  };

  const handleMinLevelChange = (value: number): void => {
    props.onMinLevelChange(value);
  };

  const handleSandsMainChange = (value: SandsMainStatWithPlaceholder): void => {
    props.onSandsMainChange(value);
  };
  const handleGobletMainChange = (value: GobletMainStatWithPlaceholder): void => {
    props.onGobletMainChange(value);
  };
  const handleCircletMainChange = (value: CircletMainStatWithPlaceholder): void => {
    props.onCircletMainChange(value);
  };

  return (
    <Container className={classes.container} fixed>
      <ArtifactsMainSelects
        sandsMain={sandsMain}
        gobletMain={gobletMain}
        circletMain={circletMain}
        onSandsMainChange={handleSandsMainChange}
        onGobletMainChange={handleGobletMainChange}
        onCircletMainChange={handleCircletMainChange}
      ></ArtifactsMainSelects>
      <ArtifactsOptionsForm
        focusStats={focusStats}
        minLevel={minLevel}
        onFocusStatsChange={handleFocusStatsChange}
        onMinLevelChange={handleMinLevelChange}
      ></ArtifactsOptionsForm>
    </Container>
  );
}

export default withStyles(styles)(ArtifactsForm);
