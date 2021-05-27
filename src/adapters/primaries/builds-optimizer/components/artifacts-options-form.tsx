import { ChangeEvent, ReactElement } from 'react';
import { createStyles, withStyles, WithStyles, Box } from '@material-ui/core';
import FormSelect from '../../shared/form-select';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';

const styles = createStyles({
  levelSubsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  levelSelect: {
    width: 100,
  },
  fourSubsLabel: {
    paddingLeft: 12,
  },
});

interface ArtifactsOptionsFormProps extends WithStyles<typeof styles> {
  minLevel: number;
  hasFourSubs: boolean;
  onMinLevelChange: (minLevel: number) => void;
  onHasFourSubsChange: (hasFourSubs: boolean) => void;
}

function ArtifactsOptionsForm(props: ArtifactsOptionsFormProps): ReactElement {
  const levels = Array.from(Array(21), (_, i) => i);
  const { minLevel, hasFourSubs, classes } = props;
  const handleMinLevelChange = (value: number): void => {
    props.onMinLevelChange(value);
  };

  const handleFourSubsChange = (event: ChangeEvent<HTMLInputElement>): void => {
    props.onHasFourSubsChange(event.target.checked);
  };

  return (
    <div>
      <div className={classes.levelSubsContainer}>
        <Box className={classes.levelSelect}>
          <FormSelect label="Artifacts level" options={levels} selectedValue={minLevel} onChange={handleMinLevelChange}></FormSelect>
        </Box>
        <Box>
          <InputLabel htmlFor="four-subs" className={classes.fourSubsLabel}>
            4 subs stats only
          </InputLabel>
          <Switch id="four-subs" checked={hasFourSubs} onChange={handleFourSubsChange} name="forSubs" color="primary" />
        </Box>
      </div>
    </div>
  );
}

export default withStyles(styles)(ArtifactsOptionsForm);
