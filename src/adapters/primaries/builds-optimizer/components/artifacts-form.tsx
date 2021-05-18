import { ReactElement } from 'react';
import { Container, createStyles, withStyles, WithStyles } from '@material-ui/core';
import ArtifactsMainSelects from './artifacts-main-selects';
import ArtifactsOptionsForm from './artifacts-options-form';
import { ArtifactStatsTypes, ArtifactsMainStats } from '../../../../domain/artifacts/models/main-statistics';

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
  hasFourSubs: boolean;
  onFocusStatsChange: (focusStats: ArtifactStatsTypes[]) => void;
  onMinLevelChange: (minLevel: number) => void;
  onMainsStatsChange: (mainsStats: ArtifactsMainStats) => void;
  onHasFourSubsChange: (hasFourSubs: boolean) => void;
}

function ArtifactsForm(props: ArtifactsFormProps): ReactElement {
  const { focusStats, minLevel, mainsStats, hasFourSubs, classes } = props;

  const handleFocusStatsChange = (focusStats: ArtifactStatsTypes[]): void => {
    props.onFocusStatsChange(focusStats);
  };

  const handleMinLevelChange = (value: number): void => {
    props.onMinLevelChange(value);
  };

  const handleMainsStatsChange = (mainsStats: ArtifactsMainStats): void => {
    props.onMainsStatsChange(mainsStats);
  };

  const handleHasFourSubsChange = (hasFourSubs: boolean): void => {
    props.onHasFourSubsChange(hasFourSubs);
  };

  return (
    <Container>
      <h4 className={classes.title}>Artifacts Filters</h4>
      <div className={classes.content}>
        <ArtifactsMainSelects mainsStats={mainsStats} onMainsStatsChange={handleMainsStatsChange}></ArtifactsMainSelects>
        <ArtifactsOptionsForm
          focusStats={focusStats}
          minLevel={minLevel}
          hasFourSubs={hasFourSubs}
          onFocusStatsChange={handleFocusStatsChange}
          onMinLevelChange={handleMinLevelChange}
          onHasFourSubsChange={handleHasFourSubsChange}
        ></ArtifactsOptionsForm>
      </div>
    </Container>
  );
}

export default withStyles(styles)(ArtifactsForm);
