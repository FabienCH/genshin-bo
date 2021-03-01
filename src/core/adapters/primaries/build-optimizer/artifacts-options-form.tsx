import React, { ChangeEvent, ReactElement } from 'react';
import {
  createStyles,
  withStyles,
  WithStyles,
  InputLabel,
  Select,
  Input,
  Chip,
  useTheme,
  MenuItem,
  Theme,
  Tooltip,
  Box,
} from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { artifactStats, ArtifactStatsTypes } from '../../../domain/models/main-statistics';
import { StringFormatter } from '../../../domain/mappers/string-formatter';
import FormSelect from '../shared/form-select';
import HelpIcon from '@material-ui/icons/Help';

const styles = createStyles({
  levelSelect: {
    width: 100,
  },
  focusStatsLabel: {
    marginBottom: 5,
  },
  helpIcon: {
    fontSize: '1rem',
    marginLeft: 3,
  },
  formControl: {
    width: 350,
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
});

const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 250,
    },
  },
};

const getStyles = (stat: ArtifactStatsTypes, focusStats: ArtifactStatsTypes[], theme: Theme) => {
  return {
    fontWeight: focusStats.indexOf(stat) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium,
  };
};

interface ArtifactsOptionsFormProps extends WithStyles<typeof styles> {
  focusStats: ArtifactStatsTypes[];
  minLevel: number;
  onFocusStatsChange: (focusStats: ArtifactStatsTypes[]) => void;
  onMinLevelChange: (minLevel: number) => void;
}

function ArtifactsOptionsForm(props: ArtifactsOptionsFormProps): ReactElement {
  const levels = Array.from(Array(20), (_, i) => i + 1);
  const theme = useTheme();
  const { focusStats, minLevel, classes } = props;

  const handleFocusStatsChange = (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ): void => {
    props.onFocusStatsChange(event.target.value as ArtifactStatsTypes[]);
  };

  const handleMinLevelChange = (value: number): void => {
    props.onMinLevelChange(value);
  };

  const tooltip =
    'Choose between 1 and 5 stats that are important for your character. This will filter artifacts by using those that have at least one of the selected stats (in main or subs stats).';

  return (
    <div>
      <Box className={classes.levelSelect}>
        <FormSelect label="Artifacts level" data={levels} selectedValue={minLevel} onChange={handleMinLevelChange}></FormSelect>
      </Box>
      <Tooltip title={tooltip} placement="top-start" interactive>
        <InputLabel id="focus-stats-label" className={classes.focusStatsLabel} shrink={false}>
          Focus stats
          <sup>
            <HelpIcon className={classes.helpIcon} />
          </sup>
        </InputLabel>
      </Tooltip>
      <FormControl className={classes.formControl}>
        <Select
          labelId="focus-stats-label"
          id="focus-stats"
          multiple
          value={focusStats}
          onChange={handleFocusStatsChange}
          input={<Input id="select-focus-stats" />}
          renderValue={(selected) => (
            <div className={classes.chips}>
              {(selected as ArtifactStatsTypes[]).map((value) => (
                <Chip key={value} label={StringFormatter.formatStringWithUpperCase(value)} className={classes.chip} />
              ))}
            </div>
          )}
          MenuProps={MenuProps}
        >
          {artifactStats.map((stat) => (
            <MenuItem key={stat} value={stat} style={getStyles(stat, focusStats, theme)}>
              {StringFormatter.formatStringWithUpperCase(stat)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default withStyles(styles)(ArtifactsOptionsForm);
