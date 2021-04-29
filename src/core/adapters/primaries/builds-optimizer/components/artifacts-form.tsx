import { ReactElement } from 'react';
import { Container, createStyles, withStyles, WithStyles } from '@material-ui/core';
import { ArtifactsMainStats, ArtifactStatsTypes } from '../../../../domain/models/main-statistics';
import ArtifactsMainSelects from './artifacts-main-selects';
import ArtifactsOptionsForm from './artifacts-options-form';

const styles = createStyles({
  title: { marginTop: 0 },
  content: {
    display: 'flex',
  },
});

interface ArtifactsFormProps extends WithStyles<typeof styles> {
  focusStats: ArtifactStatsTypes[];
  minLevel: number;
  mainsStats: ArtifactsMainStats;
  onFocusStatsChange: (focusStats: ArtifactStatsTypes[]) => void;
  onMinLevelChange: (minLevel: number) => void;
  onMainsStatsChange: (mainsStats: ArtifactsMainStats) => void;
}

function ArtifactsForm(props: ArtifactsFormProps): ReactElement {
  const { focusStats, minLevel, mainsStats, classes } = props;

  const handleFocusStatsChange = (focusStats: ArtifactStatsTypes[]): void => {
    props.onFocusStatsChange(focusStats);
  };

  const handleMinLevelChange = (value: number): void => {
    props.onMinLevelChange(value);
  };

  const handleMainsStatsChange = (mainsStats: ArtifactsMainStats): void => {
    props.onMainsStatsChange(mainsStats);
  };

  return (
    <Container>
      <h4 className={classes.title}>Artifacts Filters</h4>
      <div className={classes.content}>
        <ArtifactsMainSelects mainsStats={mainsStats} onMainsStatsChange={handleMainsStatsChange}></ArtifactsMainSelects>
        <ArtifactsOptionsForm
          focusStats={focusStats}
          minLevel={minLevel}
          onFocusStatsChange={handleFocusStatsChange}
          onMinLevelChange={handleMinLevelChange}
        ></ArtifactsOptionsForm>
      </div>
    </Container>
  );
}

export default withStyles(styles)(ArtifactsForm);
