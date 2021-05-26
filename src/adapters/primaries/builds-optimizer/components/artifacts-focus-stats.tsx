import { ChangeEvent, Fragment, ReactElement } from 'react';
import { createStyles, withStyles, WithStyles, Select, Input, Chip, useTheme, MenuItem, Theme } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import { StringFormatter } from '../../../../domain/mappers/string-formatter';
import HelpIconTooltip from '../../shared/help-icon-tooltip';
import InputLabel from '@material-ui/core/InputLabel';
import { ArtifactStatsTypes, artifactStats } from '../../../../domain/artifacts/models/main-statistics';

const styles = createStyles({
  focusStatsLabel: {
    marginBottom: 5,
  },

  formControl: {
    minWidth: 200,
    maxWidth: 380,
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
  onFocusStatsChange: (focusStats: ArtifactStatsTypes[]) => void;
}

function ArtifactsOptionsForm(props: ArtifactsOptionsFormProps): ReactElement {
  const theme = useTheme();
  const { focusStats, classes } = props;

  const handleFocusStatsChange = (
    event: ChangeEvent<{
      name?: string | undefined;
      value: unknown;
    }>,
  ): void => {
    props.onFocusStatsChange(event.target.value as ArtifactStatsTypes[]);
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
    <Fragment>
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
    </Fragment>
  );
}

export default withStyles(styles)(ArtifactsOptionsForm);
