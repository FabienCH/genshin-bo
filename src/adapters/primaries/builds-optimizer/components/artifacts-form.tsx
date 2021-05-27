import { ReactElement } from 'react';
import { Container, createStyles, withStyles, WithStyles } from '@material-ui/core';
import ArtifactsMainSelects from './artifacts-main-selects';
import ArtifactsOptionsForm from './artifacts-options-form';
import ArtifactsFocusStats from './artifacts-focus-stats';
import { ArtifactStatsTypes, ArtifactsMainStats } from '../../../../domain/artifacts/models/main-statistics';
import FormSelect from '../../shared/form-select';

const styles = createStyles({
  title: {
    marginTop: 0,
    marginBottom: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  left: {
    display: 'flex',
    flex: '60%',
    flexDirection: 'column',
    maxWidth: 600,
    marginTop: 10,
    marginRight: 30,
  },
  right: {
    display: 'flex',
    flexDirection: 'column',
  },
  levelUpSelect: {
    maxWidth: 100,
  },
});

interface ArtifactsFormProps extends WithStyles<typeof styles> {
  focusStats: ArtifactStatsTypes[];
  minLevel: number;
  mainsStats: ArtifactsMainStats;
  hasFourSubs: boolean;
  artifactLevelUp?: 16 | 20;
  onFocusStatsChange: (focusStats: ArtifactStatsTypes[]) => void;
  onMinLevelChange: (minLevel: number) => void;
  onMainsStatsChange: (mainsStats: ArtifactsMainStats) => void;
  onHasFourSubsChange: (hasFourSubs: boolean) => void;
  onArtifactLevelUpChange: (artifactLevelUp?: 16 | 20) => void;
}

function ArtifactsForm(props: ArtifactsFormProps): ReactElement {
  const { focusStats, minLevel, mainsStats, hasFourSubs, artifactLevelUp, classes } = props;

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

  const handleArtifactLevelUp = (artifactLevelUp?: 16 | 20): void => {
    props.onArtifactLevelUpChange(artifactLevelUp);
  };

  return (
    <Container>
      <h4 className={classes.title}>Artifacts Filters</h4>
      <div className={classes.container}>
        <div className={classes.left}>
          <ArtifactsOptionsForm
            minLevel={minLevel}
            hasFourSubs={hasFourSubs}
            onMinLevelChange={handleMinLevelChange}
            onHasFourSubsChange={handleHasFourSubsChange}
          ></ArtifactsOptionsForm>
          <ArtifactsMainSelects mainsStats={mainsStats} onMainsStatsChange={handleMainsStatsChange}></ArtifactsMainSelects>
        </div>
        <div className={classes.right}>
          <ArtifactsFocusStats focusStats={focusStats} onFocusStatsChange={handleFocusStatsChange}></ArtifactsFocusStats>
        </div>
      </div>

      <h4>Artifacts Options</h4>
      <div>
        <label>Level up lower artifacts to</label>
        <FormSelect
          selectClassName={classes.levelUpSelect}
          label="(main stat only)"
          options={[16, 20]}
          selectedValue={artifactLevelUp}
          isOptional={true}
          onChange={handleArtifactLevelUp}
        ></FormSelect>
      </div>
    </Container>
  );
}

export default withStyles(styles)(ArtifactsForm);
