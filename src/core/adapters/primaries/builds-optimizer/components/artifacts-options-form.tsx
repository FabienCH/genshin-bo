import { ChangeEvent, ReactElement } from 'react';
import { createStyles, withStyles, WithStyles, InputLabel, Select, Input, Chip, useTheme, MenuItem, Theme, Box } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { artifactStats, ArtifactStatsTypes } from '../../../../domain/models/main-statistics';
import { StringFormatter } from '../../../../domain/mappers/string-formatter';
import FormSelect from '../../shared/form-select';
import HelpIconTooltip from '../../shared/help-icon-tooltip';

const styles = createStyles({
  levelSelect: {
    width: 100,
  },
  focusStatsLabel: {
    marginBottom: 5,
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
  const levels = Array.from(Array(21), (_, i) => i);
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

  const tooltip = (
    <div>
      You should leave this empty if you don't have too much builds results.
      <br />
      Choose between 2 and 5 stats that are important for your character (the more the better). This will filter artifacts by using those
      that have at least one of the selected stats (in main or subs stats).
    </div>
  );
  return (
    <div>
      <Box className={classes.levelSelect}>
        <FormSelect label="Artifacts level" options={levels} selectedValue={minLevel} onChange={handleMinLevelChange}></FormSelect>
      </Box>
      <InputLabel id="focus-stats-label" className={classes.focusStatsLabel} shrink={false}>
        Focus stats
        <HelpIconTooltip tooltipText={tooltip}></HelpIconTooltip>
      </InputLabel>
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
